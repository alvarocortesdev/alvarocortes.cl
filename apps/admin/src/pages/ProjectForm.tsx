import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConfirmModal, MultiActionModal } from '@/components/ConfirmModal'
import { uploadImage, deleteImage } from '@/lib/storage'
import {
  getProject,
  createProject,
  updateProject,
  deleteProject,
  type ProjectInsert,
} from '@/lib/projects'

// Extract Cloudinary publicId from URL
function extractCloudinaryId(url: string | null): string | null {
  if (!url) return null
  const regex = /res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\/([^.]+)/
  const match = regex.exec(url)
  return match?.[1] ?? null
}

export function ProjectForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state (matching database schema)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')
  const [techStack, setTechStack] = useState<string[]>([])
  const [techInput, setTechInput] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [repoUrl, setRepoUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [featured, setFeatured] = useState(false)
  const [displayOrder, setDisplayOrder] = useState(0)

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Track original image for cleanup on edit
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null)

  // Modal state
  const [deleteModal, setDeleteModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)

  // Load existing project when editing
  useEffect(() => {
    if (isEditing && id) {
      getProject(id)
        .then((project) => {
          setName(project.name)
          setDescription(project.description)
          setDetails(project.details || '')
          setTechStack(project.tech_stack || [])
          setImageUrl(project.image_url)
          setOriginalImageUrl(project.image_url)
          setImagePreview(project.image_url)
          setRepoUrl(project.repo_url || '')
          setLiveUrl(project.live_url || '')
          setFeatured(project.featured)
          setDisplayOrder(project.display_order)
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id, isEditing])

  // Clean up blob URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Clean up previous blob URL if exists
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveImage = () => {
    // Clean up blob URL if exists
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview)
    }
    setImageFile(null)
    setImagePreview(null)
    setImageUrl(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      let finalImageUrl = imageUrl

      // Upload new image if selected
      if (imageFile) {
        setUploadingImage(true)
        try {
          const result = await uploadImage(imageFile)
          finalImageUrl = result.url

          // If editing and had previous image, delete it
          if (isEditing && originalImageUrl && originalImageUrl !== finalImageUrl) {
            const oldImageId = extractCloudinaryId(originalImageUrl)
            if (oldImageId) {
              await deleteImage(oldImageId).catch((err) =>
                console.warn('Failed to delete old image:', err)
              )
            }
          }
        } finally {
          setUploadingImage(false)
        }
      } else if (!imagePreview && originalImageUrl) {
        // Image was removed - delete from Cloudinary
        const oldImageId = extractCloudinaryId(originalImageUrl)
        if (oldImageId) {
          await deleteImage(oldImageId).catch((err) =>
            console.warn('Failed to delete old image:', err)
          )
        }
        finalImageUrl = null
      }

      const projectData: ProjectInsert = {
        name,
        description,
        details: details || '',
        tech_stack: techStack,
        image_url: finalImageUrl,
        repo_url: repoUrl || null,
        live_url: liveUrl || null,
        featured,
        display_order: displayOrder,
      }

      if (isEditing && id) {
        await updateProject(id, projectData)
        toast.success('Project updated')
      } else {
        await createProject(projectData)
        toast.success('Project created')
      }

      navigate('/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project')
      toast.error('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return

    try {
      // Delete image from Cloudinary first if exists
      if (originalImageUrl) {
        const imageId = extractCloudinaryId(originalImageUrl)
        if (imageId) {
          await deleteImage(imageId).catch((err) =>
            console.warn('Failed to delete image:', err)
          )
        }
      }

      await deleteProject(id)
      toast.success('Project deleted')
      navigate('/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project')
      toast.error('Failed to delete project')
    }
    setDeleteModal(false)
  }

  const addTech = () => {
    const tech = techInput.trim()
    if (tech && !techStack.includes(tech)) {
      setTechStack([...techStack, tech])
    }
    setTechInput('')
  }

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      addTech()
    }
  }

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech))
  }

  const handleCancelClick = () => {
    // Check if there are unsaved changes
    if (name || description || details || techStack.length > 0 || imageFile) {
      setCancelModal(true)
    } else {
      navigate('/projects')
    }
  }

  const handleSaveAndLeave = async () => {
    setCancelModal(false)
    // Trigger form submission
    const form = document.querySelector('form')
    if (form) {
      form.requestSubmit()
    }
  }

  const handleDiscardAndLeave = () => {
    setCancelModal(false)
    navigate('/projects')
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
            <Link to="/projects" className="text-neutral-400 hover:text-white">
              &larr; Back to Projects
            </Link>
            <h1 className="text-xl font-bold text-white">
              {isEditing ? 'Edit Project' : 'New Project'}
            </h1>
          </div>
          {isEditing && (
            <button
              type="button"
              onClick={() => setDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Delete
            </button>
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
          {/* Name */}
          <div>
            <label className="block text-neutral-300 mb-2">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Project name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-neutral-300 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={2}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Brief description for listing pages"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-neutral-300 mb-2">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Longer description with more details (optional)"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-neutral-300 mb-2">Thumbnail Image</label>
            {imagePreview && (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-xs max-h-48 rounded-lg border border-neutral-700 object-cover"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <label className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg cursor-pointer text-sm">
                {imagePreview ? 'Change Image' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove Image
                </button>
              )}
              {uploadingImage && (
                <span className="text-neutral-400 text-sm">Uploading...</span>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-neutral-300 mb-2">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Type tech name and press Enter or Tab (e.g., React, TypeScript)"
              />
              <button
                type="button"
                onClick={addTech}
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="hover:text-white"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 mb-2">Repository URL</label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div>
              <label className="block text-neutral-300 mb-2">Live URL</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded border-neutral-600 bg-neutral-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-neutral-900"
            />
            <label htmlFor="featured" className="text-neutral-300 cursor-pointer">
              Featured Project
            </label>
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-neutral-300 mb-2">Display Order</label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              className="w-32 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              min="0"
            />
            <p className="text-neutral-500 text-sm mt-1">
              Lower numbers appear first. Use to manually order projects.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={handleCancelClick}
              disabled={saving}
              className="px-5 py-2 text-neutral-400 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg"
            >
              {saving ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal}
        title="Delete Project"
        message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
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
          { label: 'Save Project', variant: 'primary', onClick: handleSaveAndLeave },
          { label: 'Discard Changes', variant: 'danger', onClick: handleDiscardAndLeave },
          { label: 'Continue Editing', variant: 'secondary', onClick: () => setCancelModal(false) },
        ]}
        onClose={() => setCancelModal(false)}
      />
    </div>
  )
}
