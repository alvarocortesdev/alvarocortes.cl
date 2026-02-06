import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getBlogCategory,
  createBlogCategory,
  updateBlogCategory,
  type BlogCategoryInsert,
} from '../lib/blogCategories'

export function BlogCategoryForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState('')
  const [nameEn, setNameEn] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && id) {
      const loadCategory = async () => {
        try {
          const category = await getBlogCategory(id)
          setName(category.name)
          setNameEn(category.name_en || '')
        } catch (err) {
          toast.error('Failed to load category')
          console.error(err)
          navigate('/blog-categories')
        } finally {
          setLoading(false)
        }
      }
      loadCategory()
    }
  }, [id, isEditing, navigate])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Category name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      toast.error('Please fix validation errors')
      return
    }

    setSaving(true)

    try {
      const categoryData: BlogCategoryInsert = {
        name: name.trim(),
        name_en: nameEn.trim() || null,
        display_order: 0,
      }

      if (isEditing && id) {
        await updateBlogCategory(id, {
          name: categoryData.name,
          name_en: categoryData.name_en,
        })
        toast.success('Category updated')
      } else {
        await createBlogCategory(categoryData)
        toast.success('Category created')
      }

      navigate('/blog-categories')
    } catch (err) {
      toast.error(isEditing ? 'Failed to update category' : 'Failed to create category')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-neutral-400">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blog-categories"
          className="text-neutral-400 hover:text-white text-sm mb-2 inline-block"
        >
          ← Back to Blog Categories
        </Link>

        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Blog Category' : 'Create Blog Category'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Nombre (Español)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Desarrollo, Diseño, DevOps"
              className={`w-full bg-neutral-800 border ${
                errors.name ? 'border-red-500' : 'border-neutral-700'
              } rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500`}
            />
            {errors.name && (
              <div className="text-xs text-red-400 mt-1">{errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Name (English)
            </label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g., Development, Design, DevOps (optional)"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            <div className="text-xs text-neutral-500 mt-1">
              Optional. If not set, Spanish name will be used for English version.
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded"
            >
              {saving ? 'Saving...' : isEditing ? 'Update Category' : 'Create Category'}
            </button>
            <Link
              to="/blog-categories"
              className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-2 rounded inline-block"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
