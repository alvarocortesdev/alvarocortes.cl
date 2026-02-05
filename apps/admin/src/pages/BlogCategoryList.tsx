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
  getBlogCategories,
  deleteBlogCategory,
  updateBlogCategoryOrders,
  getBlogCategoryPostCount,
  type BlogCategory,
} from '../lib/blogCategories'
import { ConfirmModal } from '../components/ConfirmModal'

export function BlogCategoryList() {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [postCounts, setPostCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    category?: BlogCategory
    postCount?: number
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
      const data = await getBlogCategories()
      setCategories(data)

      // Load post counts for all categories
      const counts: Record<string, number> = {}
      for (const category of data) {
        counts[category.id] = await getBlogCategoryPostCount(category.id)
      }
      setPostCounts(counts)
    } catch (err) {
      toast.error('Failed to load blog categories')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
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
      await updateBlogCategoryOrders(updates)
      toast.success('Category order updated')
    } catch (err) {
      toast.error('Failed to save order')
      console.error(err)
      fetchCategories()
    }
  }

  const handleDelete = async () => {
    if (!deleteModal.category) return

    try {
      await deleteBlogCategory(deleteModal.category.id)
      toast.success('Category deleted')
      setDeleteModal({ isOpen: false })
      fetchCategories()
    } catch (err) {
      toast.error('Failed to delete category')
      console.error(err)
    }
  }

  const openDeleteModal = (category: BlogCategory) => {
    const count = postCounts[category.id] || 0
    setDeleteModal({
      isOpen: true,
      category,
      postCount: count,
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
            <h1 className="text-2xl font-bold">Blog Categories</h1>
          </div>
          <Link
            to="/blog-categories/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Category
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="text-neutral-400 text-center py-12">
            No blog categories yet. Create your first one!
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
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
                    postCount={postCounts[category.id] || 0}
                    onDelete={() => openDeleteModal(category)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Blog Category"
        message={
          deleteModal.category
            ? deleteModal.postCount && deleteModal.postCount > 0
              ? `Cannot delete "${deleteModal.category.name}" because it has ${deleteModal.postCount} post(s). Remove the category from those posts first.`
              : `Are you sure you want to delete "${deleteModal.category.name}"?`
            : ''
        }
        onConfirm={deleteModal.postCount && deleteModal.postCount > 0 ? () => setDeleteModal({ isOpen: false }) : handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false })}
        confirmLabel={deleteModal.postCount && deleteModal.postCount > 0 ? 'OK' : 'Delete'}
        confirmVariant={deleteModal.postCount && deleteModal.postCount > 0 ? 'primary' : 'danger'}
      />
    </div>
  )
}

function CategoryRow({
  category,
  postCount,
  onDelete,
}: {
  category: BlogCategory
  postCount: number
  onDelete: () => void
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
      className="border border-neutral-700 rounded bg-neutral-900 p-4 flex items-center gap-4"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-neutral-600 hover:text-neutral-400 text-xl"
      >
        ⋮⋮
      </div>
      <div className="flex-1">
        <div className="font-semibold text-white">{category.name}</div>
        {category.name_en && (
          <div className="text-sm text-neutral-500">EN: {category.name_en}</div>
        )}
        <div className="text-sm text-neutral-400">{postCount} post(s)</div>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/blog-categories/${category.id}/edit`}
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
  )
}
