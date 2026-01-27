import { useEffect } from 'react'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  createdAt: string
}

export function PreviewModal({
  isOpen,
  onClose,
  title,
  excerpt,
  content,
  category,
  tags,
  createdAt,
}: PreviewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Sin fecha'

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8"
      onClick={handleBackdropClick}
    >
      <div className="bg-neutral-900 rounded-lg shadow-xl w-full max-w-3xl mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-800/50">
          <span className="text-neutral-400 text-sm">Preview — as seen on alvarocortes.cl/blog</span>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Post preview content - mimics main site styling */}
        <article className="p-6 md:p-8">
          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-neutral-400 mb-4">
            <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-xs">
              {category}
            </span>
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {title || 'Sin título'}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            {excerpt || 'Sin extracto'}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <hr className="border-neutral-800 mb-8" />

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-neutral-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-pink-400 prose-code:bg-neutral-800 prose-code:px-1 prose-code:rounded
              prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-700
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-neutral-800/50 prose-blockquote:py-1
              prose-img:rounded-lg
              prose-ul:list-disc prose-ul:pl-6
              prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-neutral-300"
            dangerouslySetInnerHTML={{ __html: content || '<p class="text-neutral-500">Sin contenido</p>' }}
          />
        </article>
      </div>
    </div>
  )
}
