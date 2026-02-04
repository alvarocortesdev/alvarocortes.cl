import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

const SAFE_STYLE_PROPERTIES = new Set([
  'text-align', 'width', 'height', 'max-width', 'float',
  'margin', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'display',
])

function filterStyle(raw: string): string {
  return raw
    .split(';')
    .map(s => s.trim())
    .filter(s => {
      const prop = s.split(':')[0]?.trim().toLowerCase()
      return prop && SAFE_STYLE_PROPERTIES.has(prop)
    })
    .join('; ')
}

DOMPurify.addHook('uponSanitizeAttribute', (_node, data) => {
  if (data.attrName === 'style') {
    const clean = filterStyle(data.attrValue)
    data.attrValue = clean
    if (!clean) data.keepAttr = false
  }
})

function preprocessHtml(html: string): string {
  let result = html.replace(/<p><\/p>/g, '<p><br></p>')

  result = result.replace(/<img([^>]*)>/gi, (_match, attrs: string) => {
    const csMatch = attrs.match(/containerStyle="([^"]*)"/i)
    const containerStyleValue = csMatch ? csMatch[1] : ''

    let cleanAttrs = attrs
      .replace(/\s*containerStyle="[^"]*"/i, '')
      .replace(/\s*wrapperStyle="[^"]*"/i, '')

    if (containerStyleValue) {
      const safe = filterStyle(containerStyleValue)
      if (safe) {
        const styleWithBlock = `${safe}; display: block`
        const existingMatch = cleanAttrs.match(/style="([^"]*)"/)
        if (existingMatch) {
          cleanAttrs = cleanAttrs.replace(
            /style="[^"]*/,
            `style="${existingMatch[1]}; ${styleWithBlock}`
          )
        } else {
          cleanAttrs += ` style="${styleWithBlock}"`
        }
      }
    }

    return `<img${cleanAttrs}>`
  })

  return result
}

function sanitizePreviewHtml(dirty: string): string {
  return DOMPurify.sanitize(preprocessHtml(dirty), {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'code', 'pre', 'img', 'iframe'
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'target', 'src', 'alt', 'width', 'height',
      'allow', 'allowfullscreen', 'frameborder', 'class', 'style'
    ],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: true,
  })
}

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  titleEn?: string
  excerpt: string
  excerptEn?: string
  content: string
  contentEn?: string
  category: string
  tags: string[]
  createdAt: string
}

export function PreviewModal({
  isOpen,
  onClose,
  title,
  titleEn,
  excerpt,
  excerptEn,
  content,
  contentEn,
  category,
  tags,
  createdAt,
}: PreviewModalProps) {
  const [previewLang, setPreviewLang] = useState<'es' | 'en'>('es')

  const displayTitle = previewLang === 'en' && titleEn ? titleEn : title
  const displayExcerpt = previewLang === 'en' && excerptEn ? excerptEn : excerpt
  const displayContent = previewLang === 'en' && contentEn ? contentEn : content
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
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 text-sm">Preview</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setPreviewLang('es')}
                className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                  previewLang === 'es'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setPreviewLang('en')}
                className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                  previewLang === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                EN
              </button>
            </div>
          </div>
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
            {displayTitle || 'Sin título'}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            {displayExcerpt || 'Sin extracto'}
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
              prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-pink-400 prose-code:bg-neutral-800 prose-code:px-1 prose-code:rounded
              prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-700
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-neutral-800/50 prose-blockquote:py-1
              prose-img:rounded-lg
              prose-ul:list-disc prose-ul:pl-6
              prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-neutral-300"
            dangerouslySetInnerHTML={{ __html: sanitizePreviewHtml(displayContent || '<p class="text-neutral-500">Sin contenido</p>') }}
          />
        </article>
      </div>
    </div>
  )
}
