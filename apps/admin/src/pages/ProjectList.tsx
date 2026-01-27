import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { supabase } from '@/lib/supabase'
import { ConfirmModal } from '@/components/ConfirmModal'
import { deleteImage } from '@/lib/storage'
import type { Tables } from '@alvarocortes/shared'

type Project = Tables<'projects'>
type SortField = 'name' | 'featured' | 'created_at' | 'display_order'
type SortOrder = 'asc' | 'desc'

// Extract Cloudinary publicId from image URL
function extractCloudinaryId(url: string | null): string | null {
  if (!url) return null
  const regex = /res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\/([^.]+)/
  const match = regex.exec(url)
  return match?.[1] || null
}

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<SortField>('display_order')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; project: Project | null }>({
    isOpen: false,
    project: null,
  })

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching projects:', error)
      toast.error('Failed to load projects')
    } else {
      setProjects(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleFeaturedToggle = async (project: Project) => {
    const newFeatured = !project.featured
    const { error } = await supabase
      .from('projects')
      .update({ featured: newFeatured, updated_at: new Date().toISOString() })
      .eq('id', project.id)

    if (error) {
      toast.error('Failed to update featured status')
    } else {
      toast.success(newFeatured ? 'Project featured' : 'Project unfeatured')
      fetchProjects()
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal.project) return

    const project = deleteModal.project

    // Delete image from Cloudinary if exists
    const imageId = extractCloudinaryId(project.image_url)
    if (imageId) {
      try {
        await deleteImage(imageId)
      } catch (error) {
        console.error('Failed to delete image:', error)
      }
    }

    // Delete the project
    const { error } = await supabase.from('projects').delete().eq('id', project.id)

    if (error) {
      toast.error('Failed to delete project')
    } else {
      toast.success('Project deleted')
      fetchProjects()
    }

    setDeleteModal({ isOpen: false, project: null })
  }

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      let aVal: string | number | boolean = a[sortField]
      let bVal: string | number | boolean = b[sortField]

      if (sortField === 'created_at') {
        aVal = new Date(aVal as string).getTime()
        bVal = new Date(bVal as string).getTime()
      }

      if (sortField === 'featured') {
        aVal = aVal ? 1 : 0
        bVal = bVal ? 1 : 0
      }

      if (aVal === null) return 1
      if (bVal === null) return -1

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [projects, sortField, sortOrder])

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
            <h1 className="text-xl font-bold text-white">Projects</h1>
          </div>
          <Link
            to="/projects/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            New Project
          </Link>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        {loading ? (
          <p className="text-neutral-400">Loading...</p>
        ) : sortedProjects.length === 0 ? (
          <p className="text-neutral-400">No projects yet. Create your first project!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-neutral-400 border-b border-neutral-800">
                  <SortHeader field="name">Name</SortHeader>
                  <SortHeader field="featured">Featured</SortHeader>
                  <th className="pb-3">Tech Stack</th>
                  <SortHeader field="display_order">Order</SortHeader>
                  <SortHeader field="created_at">Created</SortHeader>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((project) => (
                  <tr key={project.id} className="border-b border-neutral-800">
                    <td className="py-4 text-white">{project.name}</td>
                    <td className="py-4">
                      {project.featured ? (
                        <span className="text-yellow-400" title="Featured">★</span>
                      ) : (
                        <span className="text-neutral-600">☆</span>
                      )}
                    </td>
                    <td className="py-4 text-neutral-400">
                      {project.tech_stack?.length || 0} techs
                    </td>
                    <td className="py-4 text-neutral-400">{project.display_order}</td>
                    <td className="py-4 text-neutral-400">
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/projects/${project.id}/edit`}
                          className="px-3 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 text-white rounded"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleFeaturedToggle(project)}
                          className={`px-3 py-1 text-sm rounded ${
                            project.featured
                              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                              : 'bg-neutral-600 hover:bg-neutral-500 text-white'
                          }`}
                        >
                          {project.featured ? 'Unfeature' : 'Feature'}
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, project })}
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
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteModal.project?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, project: null })}
      />
    </div>
  )
}
