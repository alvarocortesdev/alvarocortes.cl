import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RichTextEditor } from '@/components/RichTextEditor'
import { ConfirmModal, MultiActionModal } from '@/components/ConfirmModal'
import { deleteImage } from '@/lib/storage'
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  publishPost,
  unpublishPost,
  generateSlug,
  CATEGORIES,
  type PostInsert,
} from '@/lib/posts'

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

export function PostForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0] ?? 'Development')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [createdAt, setCreatedAt] = useState('')

  // Modal state
  const [deleteModal, setDeleteModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)

  // Auto-generate slug from title (only for new posts)
  useEffect(() => {
    if (!isEditing && title) {
      setSlug(generateSlug(title))
    }
  }, [title, isEditing])

  // Load existing post when editing
  useEffect(() => {
    if (isEditing && id) {
      getPost(id)
        .then((post) => {
          setTitle(post.title)
          setSlug(post.slug)
          setExcerpt(post.excerpt)
          setContent(post.content)
          setCategory(post.category)
          setTags(post.tags || [])
          setStatus(post.status === 'published' ? 'published' : 'draft')
          setCreatedAt(post.created_at.slice(0, 16)) // Format for datetime-local input
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id, isEditing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const postData: PostInsert = {
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        status,
      }

      // Include created_at if editing and changed
      if (isEditing && createdAt) {
        ;(postData as Record<string, unknown>).created_at = new Date(createdAt).toISOString()
      }

      if (isEditing && id) {
        await updatePost(id, postData)
        toast.success('Post updated')
      } else {
        await createPost(postData)
        toast.success('Post created')
      }

      navigate('/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post')
      toast.error('Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return

    try {
      // Delete images from Cloudinary first
      const imageIds = extractCloudinaryIds(content)
      if (imageIds.length > 0) {
        await Promise.all(imageIds.map((imgId) => deleteImage(imgId)))
      }

      await deletePost(id)
      toast.success('Post deleted')
      navigate('/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post')
      toast.error('Failed to delete post')
    }
    setDeleteModal(false)
  }

  const handlePublishToggle = async () => {
    if (!id) return

    try {
      if (status === 'published') {
        await unpublishPost(id)
        setStatus('draft')
        toast.success('Post unpublished')
      } else {
        await publishPost(id)
        setStatus('published')
        toast.success('Post published')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
      toast.error('Failed to update status')
    }
  }

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
    setTagInput('')
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      addTag()
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleCancelClick = () => {
    // Check if there are unsaved changes
    if (title || excerpt || content) {
      setCancelModal(true)
    } else {
      navigate('/posts')
    }
  }

  const handleSaveDraft = async () => {
    setCancelModal(false)
    setStatus('draft')
    // Trigger form submission
    const form = document.querySelector('form')
    if (form) {
      form.requestSubmit()
    }
  }

  const handleDiscardAndLeave = () => {
    setCancelModal(false)
    navigate('/posts')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <p className="text-neutral-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/posts" className="text-neutral-400 hover:text-white">
              ← Back to Posts
            </Link>
            <h1 className="text-xl font-bold text-white">
              {isEditing ? 'Edit Post' : 'New Post'}
            </h1>
          </div>
          {isEditing && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePublishToggle}
                className={`px-4 py-2 rounded-lg text-sm ${
                  status === 'published'
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {status === 'published' ? 'Unpublish' : 'Publish'}
              </button>
              <button
                type="button"
                onClick={() => setDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        {error && (
          <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-neutral-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Post title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-neutral-300 mb-2">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="post-url-slug"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-neutral-300 mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={2}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Brief description for listing pages"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-neutral-300 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-neutral-300 mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Type tag and press Enter or Tab"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Created At (only for editing) */}
          {isEditing && (
            <div>
              <label className="block text-neutral-300 mb-2">Publication Date</label>
              <input
                type="datetime-local"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
              <p className="text-neutral-500 text-sm mt-1">
                Change this to reorder the post in the blog listing
              </p>
            </div>
          )}

          {/* Content */}
          <div>
            <label className="block text-neutral-300 mb-2">Content</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-6 py-2 text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg"
            >
              {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal}
        title="Delete Post"
        message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal(false)}
      />

      {/* Cancel Confirmation Modal */}
      <MultiActionModal
        isOpen={cancelModal}
        title="Unsaved Changes"
        message="You have unsaved changes. What would you like to do?"
        actions={[
          { label: 'Save as Draft', variant: 'primary', onClick: handleSaveDraft },
          { label: 'Discard Changes', variant: 'danger', onClick: handleDiscardAndLeave },
          { label: 'Continue Editing', variant: 'secondary', onClick: () => setCancelModal(false) },
        ]}
        onClose={() => setCancelModal(false)}
      />
    </div>
  )
}
