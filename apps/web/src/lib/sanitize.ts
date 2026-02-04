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

// Hook to convert containerstyle from tiptap-extension-resize-image into inline style
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'IMG') {
    const containerStyle = node.getAttribute('containerstyle')
    if (containerStyle) {
      const safeStyle = filterStyle(containerStyle)
      if (safeStyle) {
        const existing = node.getAttribute('style') || ''
        const merged = existing ? `${existing}; ${safeStyle}; display: block` : `${safeStyle}; display: block`
        node.setAttribute('style', merged)
      }
      node.removeAttribute('containerstyle')
    }
    node.removeAttribute('wrapperstyle')
  }
})

export function sanitizeHtml(dirty: string): string {
  // Ensure empty paragraphs render as visible line breaks
  const processed = dirty.replace(/<p><\/p>/g, '<p><br></p>')

  return DOMPurify.sanitize(processed, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'code', 'pre', 'img', 'iframe'
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'target', 'src', 'alt', 'width', 'height',
      'allow', 'allowfullscreen', 'frameborder', 'class', 'style',
      'containerstyle', 'wrapperstyle'
    ],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: true,
  })
}
