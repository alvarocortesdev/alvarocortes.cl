import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type SensorDescriptor,
  type SensorOptions,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  getTechCategories,
  deleteTechCategory,
  updateTechCategoryOrders,
  type TechCategory,
} from '../lib/techCategories'
import {
  getTechnologiesByCategory,
  deleteTechnology,
  updateTechnologyOrders,
  type Technology,
} from '../lib/technologies'
import { ConfirmModal } from '../components/ConfirmModal'

export function TechCategoryList() {
  const [categories, setCategories] = useState<TechCategory[]>([])
  const [technologiesByCategory, setTechnologiesByCategory] = useState<
    Record<string, Technology[]>
  >({})
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    category?: TechCategory
    techCount?: number
  }>({ isOpen: false })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await getTechCategories()
      setCategories(data)

      // Load technologies for all categories
      const techData: Record<string, Technology[]> = {}
      for (const category of data) {
        const techs = await getTechnologiesByCategory(category.id)
        techData[category.id] = techs
      }
      setTechnologiesByCategory(techData)
    } catch (err) {
      toast.error('Failed to load tech categories')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = categories.findIndex(c => c.id === active.id)
    const newIndex = categories.findIndex(c => c.id === over.id)

    const newOrder = arrayMove(categories, oldIndex, newIndex)
    setCategories(newOrder)

    try {
      const updates = newOrder.map((cat, idx) => ({
        id: cat.id,
        display_order: idx,
      }))
      await updateTechCategoryOrders(updates)
      toast.success('Category order updated')
    } catch (err) {
      toast.error('Failed to save order')
      console.error(err)
      fetchCategories()
    }
  }

  const handleTechnologyDragEnd = async (categoryId: string, event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const techs = technologiesByCategory[categoryId] || []
    const oldIndex = techs.findIndex(t => t.id === active.id)
    const newIndex = techs.findIndex(t => t.id === over.id)

    const newOrder = arrayMove(techs, oldIndex, newIndex)
    setTechnologiesByCategory({
      ...technologiesByCategory,
      [categoryId]: newOrder,
    })

    try {
      const updates = newOrder.map((tech, idx) => ({
        id: tech.id,
        display_order: idx,
      }))
      await updateTechnologyOrders(updates)
      toast.success('Technology order updated')
    } catch (err) {
      toast.error('Failed to save order')
      console.error(err)
      fetchCategories()
    }
  }

  const handleDeleteCategory = async () => {
    if (!deleteModal.category) return

    try {
      await deleteTechCategory(deleteModal.category.id)
      toast.success('Category deleted')
      setDeleteModal({ isOpen: false })
      fetchCategories()
    } catch (err) {
      toast.error('Failed to delete category')
      console.error(err)
    }
  }

  const openDeleteModal = async (category: TechCategory) => {
    const techs = technologiesByCategory[category.id] || []
    setDeleteModal({
      isOpen: true,
      category,
      techCount: techs.length,
    })
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-neutral-400">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              to="/"
              className="text-neutral-400 hover:text-white text-sm mb-2 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold">Tech Categories</h1>
          </div>
          <Link
            to="/tech-categories/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Category
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="text-neutral-400 text-center py-12">
            No tech categories yet. Create your first one!
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleCategoryDragEnd}
          >
            <SortableContext
              items={categories.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {categories.map(category => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    technologies={technologiesByCategory[category.id] || []}
                    isExpanded={expandedCategories.has(category.id)}
                    onToggle={() => toggleCategory(category.id)}
                    onDelete={() => openDeleteModal(category)}
                    onTechDragEnd={(event) => handleTechnologyDragEnd(category.id, event)}
                    onDeleteTech={async (techId) => {
                      try {
                        await deleteTechnology(techId)
                        toast.success('Technology deleted')
                        fetchCategories()
                      } catch {
                        toast.error('Failed to delete technology')
                      }
                    }}
                    sensors={sensors}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Tech Category"
        message={
          deleteModal.category
            ? `Are you sure you want to delete "${deleteModal.category.name}"? This will also delete ${deleteModal.techCount} technology/ies.`
            : ''
        }
        onConfirm={handleDeleteCategory}
        onCancel={() => setDeleteModal({ isOpen: false })}
      />
    </div>
  )
}

function CategoryRow({
  category,
  technologies,
  isExpanded,
  onToggle,
  onDelete,
  onTechDragEnd,
  onDeleteTech,
  sensors,
}: {
  category: TechCategory
  technologies: Technology[]
  isExpanded: boolean
  onToggle: () => void
  onDelete: () => void
  onTechDragEnd: (event: DragEndEvent) => void
  onDeleteTech: (id: string) => void
  sensors: SensorDescriptor<SensorOptions>[]
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-neutral-700 rounded bg-neutral-900"
    >
      <div className="p-4 flex items-center gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-neutral-600 hover:text-neutral-400 text-xl"
        >
          ⋮⋮
        </div>
        <button
          onClick={onToggle}
          className="text-neutral-400 hover:text-white"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
        <div className="flex-1">
          <div className="font-semibold text-white">{category.name}</div>
          <div className="text-sm text-neutral-400">{technologies.length} technologies</div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/tech-categories/${category.id}/edit`}
            className="px-3 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 text-white rounded"
          >
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {isExpanded && technologies.length > 0 && (
        <div className="border-t border-neutral-700 p-4 bg-neutral-950">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onTechDragEnd}
          >
            <SortableContext
              items={technologies.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1">
                {technologies.map(tech => (
                  <TechnologyRow
                    key={tech.id}
                    technology={tech}
                    onDelete={() => onDeleteTech(tech.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  )
}

function TechnologyRow({
  technology,
  onDelete,
}: {
  technology: Technology
  onDelete: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: technology.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const isCustomUrl = technology.icon.startsWith('http')

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-2 bg-neutral-900 rounded hover:bg-neutral-800"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-neutral-600 hover:text-neutral-400"
      >
        ⋮
      </div>
      <div className="w-6 h-6 bg-white rounded p-0.5 flex-shrink-0">
        <img
          src={
            isCustomUrl
              ? technology.icon
              : `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${technology.icon}.svg`
          }
          alt={technology.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 text-sm text-white">{technology.name}</div>
      <button
        onClick={onDelete}
        className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
      >
        Delete
      </button>
    </div>
  )
}
