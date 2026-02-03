import DOMPurify from 'dompurify'

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'code', 'pre', 'img', 'iframe'
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'target', 'src', 'alt', 'width', 'height',
      'allow', 'allowfullscreen', 'frameborder', 'class'
    ],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: true,
  })
}
