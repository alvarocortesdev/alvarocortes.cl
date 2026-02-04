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

// Hook to sanitize style attributes — only allow safe CSS properties
DOMPurify.addHook('uponSanitizeAttribute', (_node, data) => {
  if (data.attrName === 'style') {
    const clean = data.attrValue
      .split(';')
      .map(s => s.trim())
      .filter(s => {
        const prop = s.split(':')[0]?.trim().toLowerCase()
        return prop && SAFE_STYLE_PROPERTIES.has(prop)
      })
      .join('; ')
    data.attrValue = clean
    if (!clean) {
      data.keepAttr = false
    }
  }
})

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
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
