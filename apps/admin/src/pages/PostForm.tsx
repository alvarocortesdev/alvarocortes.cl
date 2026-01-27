import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { RichTextEditor } from '@/components/RichTextEditor'
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
  const [category, setCategory] = useState(CATEGORIES[0])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')

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

      if (isEditing && id) {
        await updatePost(id, postData)
      } else {
        await createPost(postData)
      }

      navigate('/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this post?')) return

    try {
      await deletePost(id)
      navigate('/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post')
    }
  }

  const handlePublishToggle = async () => {
    if (!id) return

    try {
      if (status === 'published') {
        await unpublishPost(id)
        setStatus('draft')
      } else {
        await publishPost(id)
        setStatus('published')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
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
        <div className="flex items-center justify-between">
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
                className={`px-4 py-2 rounded-lg ${
                  status === 'published'
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {status === 'published' ? 'Unpublish' : 'Publish'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Type tag and press Enter"
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
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-neutral-300 mb-2">Content</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link
              to="/posts"
              className="px-6 py-2 text-neutral-400 hover:text-white"
            >
              Cancel
            </Link>
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
    </div>
  )
}
