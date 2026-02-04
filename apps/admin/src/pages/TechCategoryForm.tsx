import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getTechCategory,
  createTechCategory,
  updateTechCategory,
  type TechCategoryInsert,
} from '../lib/techCategories'
import {
  getTechnologiesByCategory,
  createTechnology,
  deleteTechnology,
  type Technology,
  type TechnologyInsert,
} from '../lib/technologies'
import { IconPicker } from '../components/IconPicker'

export function TechCategoryForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  const [categoryName, setCategoryName] = useState('')
  const [technologies, setTechnologies] = useState<Technology[]>([])

  // New technology being added
  const [newTechName, setNewTechName] = useState('')
  const [newTechIcon, setNewTechIcon] = useState('')
  const [adding, setAdding] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && id) {
      loadCategory(id)
    }
  }, [id, isEditing])

  const loadCategory = async (categoryId: string) => {
    try {
      const category = await getTechCategory(categoryId)
      setCategoryName(category.name)

      const techs = await getTechnologiesByCategory(categoryId)
      setTechnologies(techs)
    } catch (err) {
      toast.error('Failed to load category')
      console.error(err)
      navigate('/tech-categories')
    } finally {
      setLoading(false)
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!categoryName.trim()) {
      newErrors.categoryName = 'Category name is required'
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
      const categoryData: TechCategoryInsert = {
        name: categoryName.trim(),
        display_order: 0,
      }

      if (isEditing && id) {
        await updateTechCategory(id, { name: categoryData.name })
        toast.success('Category updated')
      } else {
        const newCategory = await createTechCategory(categoryData)
        toast.success('Category created')
        navigate(`/tech-categories/${newCategory.id}/edit`)
        return
      }

      navigate('/tech-categories')
    } catch (err) {
      toast.error(isEditing ? 'Failed to update category' : 'Failed to create category')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleAddTechnology = async () => {
    if (!newTechName.trim() || !newTechIcon.trim()) {
      toast.error('Technology name and icon are required')
      return
    }

    if (!id) {
      toast.error('Save category first before adding technologies')
      return
    }

    setAdding(true)

    try {
      const techData: TechnologyInsert = {
        category_id: id,
        name: newTechName.trim(),
        icon: newTechIcon.trim(),
        display_order: technologies.length,
      }

      const newTech = await createTechnology(techData)
      setTechnologies([...technologies, newTech])
      setNewTechName('')
      setNewTechIcon('')
      toast.success('Technology added')
    } catch (err) {
      toast.error('Failed to add technology')
      console.error(err)
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteTechnology = async (techId: string) => {
    try {
      await deleteTechnology(techId)
      setTechnologies(technologies.filter(t => t.id !== techId))
      toast.success('Technology deleted')
    } catch (err) {
      toast.error('Failed to delete technology')
      console.error(err)
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
          to="/tech-categories"
          className="text-neutral-400 hover:text-white text-sm mb-2 inline-block"
        >
          ← Back to Tech Categories
        </Link>

        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Tech Category' : 'Create Tech Category'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Frontend, Backend, DevOps"
              className={`w-full bg-neutral-800 border ${
                errors.categoryName ? 'border-red-500' : 'border-neutral-700'
              } rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500`}
            />
            {errors.categoryName && (
              <div className="text-xs text-red-400 mt-1">{errors.categoryName}</div>
            )}
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
              to="/tech-categories"
              className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-2 rounded inline-block"
            >
              Cancel
            </Link>
          </div>
        </form>

        {isEditing && (
          <div className="mt-12 pt-8 border-t border-neutral-700">
            <h2 className="text-xl font-bold mb-4">Technologies</h2>

            <div className="space-y-4">
              {technologies.map(tech => {
                const isCustomUrl = tech.icon.startsWith('http')
                return (
                  <div
                    key={tech.id}
                    className="flex items-center gap-3 p-3 bg-neutral-900 rounded border border-neutral-700"
                  >
                    <div className="w-8 h-8 bg-white rounded p-1 flex-shrink-0">
                      <img
                        src={
                          isCustomUrl
                            ? tech.icon
                            : `https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/${tech.icon}.svg`
                        }
                        alt={tech.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 text-white">{tech.name}</div>
                    <button
                      onClick={() => handleDeleteTechnology(tech.id)}
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-neutral-900 rounded border border-neutral-700 space-y-4">
              <h3 className="font-medium text-white">Add Technology</h3>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Technology Name
                </label>
                <input
                  type="text"
                  value={newTechName}
                  onChange={(e) => setNewTechName(e.target.value)}
                  placeholder="e.g., React, TypeScript, Docker"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <IconPicker
                label="Icon"
                value={newTechIcon}
                onChange={setNewTechIcon}
              />

              <button
                type="button"
                onClick={handleAddTechnology}
                disabled={adding}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded"
              >
                {adding ? 'Adding...' : 'Add Technology'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
