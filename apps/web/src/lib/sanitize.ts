import DOMPurify from 'dompurify'

const SAFE_STYLE_PROPERTIES = new Set([
  'text-align',
  'width',
  'height',
  'max-width',
  'float',
  'margin',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin-bottom',
  'display',
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

// Hook to sanitize style attributes — only allow safe CSS properties
DOMPurify.addHook('uponSanitizeAttribute', (_node, data) => {
  if (data.attrName === 'style') {
    const clean = filterStyle(data.attrValue)
    data.attrValue = clean
    if (!clean) {
      data.keepAttr = false
    }
  }
})

/**
 * Pre-process HTML before sanitization:
 * 1. Convert empty <p></p> to <p><br></p> so blank lines are visible
 * 2. Convert tiptap-extension-resize-image's containerStyle attribute
 *    into a standard style attribute so alignment/width are preserved
 */
function preprocessHtml(html: string): string {
  // Empty paragraphs → visible line breaks
  let result = html.replace(/<p><\/p>/g, '<p><br></p>')

  // Convert containerStyle on <img> tags to inline style
  result = result.replace(/<img([^>]*)>/gi, (_match, attrs: string) => {
    // Extract containerStyle value (case-insensitive)
    const csMatch = attrs.match(/containerStyle="([^"]*)"/i)
    const containerStyleValue = csMatch ? csMatch[1] : ''

    // Remove containerStyle and wrapperStyle from attributes
    let cleanAttrs = attrs
      .replace(/\s*containerStyle="[^"]*"/i, '')
      .replace(/\s*wrapperStyle="[^"]*"/i, '')

    if (containerStyleValue) {
      const safe = filterStyle(containerStyleValue)
      if (safe) {
        const styleWithBlock = `${safe}; display: block`
        // Merge with existing style if present
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

export function sanitizeHtml(dirty: string): string {
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
