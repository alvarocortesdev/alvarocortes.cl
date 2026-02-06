import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getTimelineEntry,
  createTimelineEntry,
  updateTimelineEntry,
  type TimelineEntryInsert,
} from '../lib/timelines'
import { DateInput } from '../components/DateInput'
import { RichTextEditor } from '../components/RichTextEditor'

export function TimelineForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  const [period, setPeriod] = useState('')
  const [title, setTitle] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [organization, setOrganization] = useState('')
  const [type, setType] = useState<'work' | 'studies'>('work')
  const [description, setDescription] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [descriptionLang, setDescriptionLang] = useState<'es' | 'en'>('es')

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && id) {
      const loadEntry = async () => {
        try {
          const entry = await getTimelineEntry(id)
          setPeriod(entry.period)
          setTitle(entry.title)
          setTitleEn((entry as Record<string, unknown>).title_en as string || '')
          setOrganization(entry.organization)
          setType(entry.type)
          setDescription(entry.description || '')
          setDescriptionEn((entry as Record<string, unknown>).description_en as string || '')
        } catch (err) {
          toast.error('Failed to load timeline entry')
          console.error(err)
          navigate('/timeline')
        } finally {
          setLoading(false)
        }
      }
      loadEntry()
    }
  }, [id, isEditing, navigate])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!period.trim()) {
      newErrors.period = 'Date is required'
    }
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!organization.trim()) {
      newErrors.organization = 'Organization is required'
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
      const entryData: TimelineEntryInsert = {
        period: period.trim(),
        title: title.trim(),
        organization: organization.trim(),
        type,
        description: description.trim() || null,
        display_order: 0,
      }
      ;(entryData as Record<string, unknown>).title_en = titleEn.trim() || null
      ;(entryData as Record<string, unknown>).description_en = descriptionEn.trim() || null

      if (isEditing && id) {
        await updateTimelineEntry(id, entryData)
        toast.success('Timeline entry updated')
      } else {
        await createTimelineEntry(entryData)
        toast.success('Timeline entry created')
      }

      navigate('/timeline')
    } catch (err) {
      toast.error(isEditing ? 'Failed to update entry' : 'Failed to create entry')
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
          to="/timeline"
          className="text-neutral-400 hover:text-white text-sm mb-2 inline-block"
        >
          ← Back to Timeline
        </Link>

        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Timeline Entry' : 'Create Timeline Entry'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <DateInput
            label="Date"
            value={period}
            onChange={setPeriod}
            error={errors.period}
          />

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Título (Español)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Full Stack Developer"
              className={`w-full bg-neutral-800 border ${
                errors.title ? 'border-red-500' : 'border-neutral-700'
              } rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500`}
            />
            {errors.title && (
              <div className="text-xs text-red-400 mt-1">{errors.title}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Title (English)
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g., Full Stack Developer (optional)"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Organization
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g., Acme Corp"
              className={`w-full bg-neutral-800 border ${
                errors.organization ? 'border-red-500' : 'border-neutral-700'
              } rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500`}
            />
            {errors.organization && (
              <div className="text-xs text-red-400 mt-1">{errors.organization}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="work"
                  checked={type === 'work'}
                  onChange={() => setType('work')}
                  className="text-blue-600"
                />
                <span className="text-blue-400">Work</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="studies"
                  checked={type === 'studies'}
                  onChange={() => setType('studies')}
                  className="text-green-600"
                />
                <span className="text-green-400">Studies</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Description (optional)
            </label>
            <div className="flex gap-1 mb-2">
              <button
                type="button"
                onClick={() => setDescriptionLang('es')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  descriptionLang === 'es'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                Español
              </button>
              <button
                type="button"
                onClick={() => setDescriptionLang('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  descriptionLang === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                English
              </button>
            </div>
            {descriptionLang === 'es' ? (
              <RichTextEditor
                content={description}
                onChange={setDescription}
              />
            ) : (
              <RichTextEditor
                content={descriptionEn}
                onChange={setDescriptionEn}
              />
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded"
            >
              {saving ? 'Saving...' : isEditing ? 'Update Entry' : 'Create Entry'}
            </button>
            <Link
              to="/timeline"
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
