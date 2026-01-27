import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { supabase } from '@/lib/supabase'
import { ConfirmModal } from '@/components/ConfirmModal'
import { deleteImage } from '@/lib/storage'
import type { Tables } from '@alvarocortes/shared'

type Post = Tables<'posts'>
type SortField = 'title' | 'status' | 'category' | 'created_at'
type SortOrder = 'asc' | 'desc'
type TabFilter = 'all' | 'archived'

// Extract Cloudinary publicIds from HTML content
function extractCloudinaryIds(html: string | null): string[] {
  if (!html) return []
  const regex = /res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\/([^.]+)/g
  const ids: string[] = []
  let match
  while ((match = regex.exec(html)) !== null) {
    if (match[1]) ids.push(match[1])
  }
  return ids
}

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [activeTab, setActiveTab] = useState<TabFilter>('all')
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; post: Post | null }>({
    isOpen: false,
    post: null,
  })

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
      toast.error('Failed to load posts')
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handlePublishToggle = async (post: Post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    const { error } = await supabase
      .from('posts')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', post.id)

    if (error) {
      toast.error('Failed to update post status')
    } else {
      toast.success(newStatus === 'published' ? 'Post published' : 'Post unpublished')
      fetchPosts()
    }
  }

  const handleArchive = async (post: Post) => {
    const { error } = await supabase
      .from('posts')
      .update({ status: 'archived', updated_at: new Date().toISOString() })
      .eq('id', post.id)

    if (error) {
      toast.error('Failed to archive post')
    } else {
      toast.success('Post archived')
      fetchPosts()
    }
  }

  const handleUnarchive = async (post: Post) => {
    const { error } = await supabase
      .from('posts')
      .update({ status: 'draft', updated_at: new Date().toISOString() })
      .eq('id', post.id)

    if (error) {
      toast.error('Failed to unarchive post')
    } else {
      toast.success('Post restored to draft')
      fetchPosts()
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal.post) return

    const post = deleteModal.post

    // Delete images from Cloudinary first
    const imageIds = extractCloudinaryIds(post.content || '')
    if (imageIds.length > 0) {
      try {
        await Promise.all(imageIds.map((id) => deleteImage(id)))
      } catch (error) {
        console.error('Failed to delete some images:', error)
      }
    }

    // Delete the post
    const { error } = await supabase.from('posts').delete().eq('id', post.id)

    if (error) {
      toast.error('Failed to delete post')
    } else {
      toast.success('Post deleted')
      fetchPosts()
    }

    setDeleteModal({ isOpen: false, post: null })
  }

  const sortedPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
      if (activeTab === 'archived') return post.status === 'archived'
      return post.status !== 'archived'
    })

    return [...filtered].sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]

      if (sortField === 'created_at') {
        aVal = new Date(aVal as string).getTime() as unknown as string
        bVal = new Date(bVal as string).getTime() as unknown as string
      }

      if (aVal === null) return 1
      if (bVal === null) return -1

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [posts, sortField, sortOrder, activeTab])

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      className="pb-3 cursor-pointer hover:text-white transition-colors"
      onClick={() => handleSort(field)}
    >
      <span className="flex items-center gap-1">
        {children}
        {sortField === field && (
          <span className="text-blue-400">{sortOrder === 'asc' ? '↑' : '↓'}</span>
        )}
      </span>
    </th>
  )

  return (
    <div className="min-h-screen bg-neutral-900">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-neutral-400 hover:text-white">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-white">Blog Posts</h1>
          </div>
          <Link
            to="/posts/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            New Post
          </Link>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-neutral-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'archived'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Archived
          </button>
        </div>

        {loading ? (
          <p className="text-neutral-400">Loading...</p>
        ) : sortedPosts.length === 0 ? (
          <p className="text-neutral-400">
            {activeTab === 'archived' ? 'No archived posts.' : 'No posts yet. Create your first post!'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-neutral-400 border-b border-neutral-800">
                  <SortHeader field="title">Title</SortHeader>
                  <SortHeader field="status">Status</SortHeader>
                  <SortHeader field="category">Category</SortHeader>
                  <SortHeader field="created_at">Created</SortHeader>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedPosts.map((post) => (
                  <tr key={post.id} className="border-b border-neutral-800">
                    <td className="py-4 text-white">{post.title}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          post.status === 'published'
                            ? 'bg-green-900 text-green-300'
                            : post.status === 'draft'
                              ? 'bg-yellow-900 text-yellow-300'
                              : post.status === 'archived'
                                ? 'bg-neutral-700 text-neutral-400'
                                : 'bg-neutral-700 text-neutral-300'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 text-neutral-400">{post.category}</td>
                    <td className="py-4 text-neutral-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/posts/${post.id}/edit`}
                          className="px-3 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 text-white rounded"
                        >
                          Edit
                        </Link>
                        {activeTab === 'archived' ? (
                          <button
                            onClick={() => handleUnarchive(post)}
                            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                          >
                            Restore
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handlePublishToggle(post)}
                              className={`px-3 py-1 text-sm rounded ${
                                post.status === 'published'
                                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                  : 'bg-green-600 hover:bg-green-700 text-white'
                              }`}
                            >
                              {post.status === 'published' ? 'Unpublish' : 'Publish'}
                            </button>
                            {post.status === 'published' && (
                              <button
                                onClick={() => handleArchive(post)}
                                className="px-3 py-1 text-sm bg-neutral-600 hover:bg-neutral-500 text-white rounded"
                              >
                                Archive
                              </button>
                            )}
                          </>
                        )}
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, post })}
                          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Post"
        message={`Are you sure you want to delete "${deleteModal.post?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, post: null })}
      />
    </div>
  )
}
