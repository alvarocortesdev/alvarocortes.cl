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
  getTimelineEntries,
  deleteTimelineEntry,
  updateTimelineEntryOrders,
  type TimelineEntry,
} from '../lib/timelines'
import { ConfirmModal } from '../components/ConfirmModal'

export function TimelineList() {
  const [entries, setEntries] = useState<TimelineEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    entry?: TimelineEntry
  }>({ isOpen: false })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const data = await getTimelineEntries()
      setEntries(data)
    } catch (err) {
      toast.error('Failed to load timeline entries')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = entries.findIndex(e => e.id === active.id)
    const newIndex = entries.findIndex(e => e.id === over.id)

    const newOrder = arrayMove(entries, oldIndex, newIndex)
    setEntries(newOrder)

    try {
      const updates = newOrder.map((entry, idx) => ({
        id: entry.id,
        display_order: idx,
      }))
      await updateTimelineEntryOrders(updates)
      toast.success('Order updated')
    } catch (err) {
      toast.error('Failed to save order')
      console.error(err)
      fetchEntries()
    }
  }

  const handleDelete = async () => {
    if (!deleteModal.entry) return

    try {
      await deleteTimelineEntry(deleteModal.entry.id)
      toast.success('Timeline entry deleted')
      setDeleteModal({ isOpen: false })
      fetchEntries()
    } catch (err) {
      toast.error('Failed to delete entry')
      console.error(err)
    }
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
            <h1 className="text-2xl font-bold">Timeline Entries</h1>
          </div>
          <Link
            to="/timeline/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Entry
          </Link>
        </div>

        {entries.length === 0 ? (
          <div className="text-neutral-400 text-center py-12">
            No timeline entries yet. Create your first one!
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={entries.map(e => e.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {entries.map(entry => (
                  <TimelineRow
                    key={entry.id}
                    entry={entry}
                    onDelete={() => setDeleteModal({ isOpen: true, entry })}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Timeline Entry"
        message={`Are you sure you want to delete "${deleteModal.entry?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false })}
      />
    </div>
  )
}

function TimelineRow({
  entry,
  onDelete,
}: {
  entry: TimelineEntry
  onDelete: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const typeColor = entry.type === 'work' ? 'text-blue-400' : 'text-green-400'

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-neutral-700 rounded p-4 bg-neutral-900 hover:border-neutral-600 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-neutral-600 hover:text-neutral-400 text-xl"
        >
          ⋮⋮
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white">{entry.title}</div>
          <div className="text-sm text-neutral-400">
            {entry.organization} · <span className={typeColor}>{entry.type}</span> · {entry.period}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/timeline/${entry.id}/edit`}
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
    </div>
  )
}
