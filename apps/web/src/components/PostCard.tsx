import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { localized } from '../i18n/useTranslation'

interface PostCardProps {
  slug: string
  title: string
  title_en?: string | null
  excerpt: string
  excerpt_en?: string | null
  published_at: string | null
  created_at: string
  tags: string[]
  [key: string]: unknown
}

export function PostCard(props: PostCardProps) {
  const { slug, published_at, created_at, tags } = props
  const { lang } = useLanguage()
  const locale = lang === 'en' ? 'en-US' : 'es-CL'
  const formattedDate = new Date(published_at || created_at).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const displayTitle = localized(props, 'title', lang)
  const displayExcerpt = localized(props, 'excerpt', lang)

  return (
    <article className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-750 transition-colors">
      <Link to={`/blog/${slug}`} className="block">
        <h2 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
          {displayTitle}
        </h2>
      </Link>
      <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{displayExcerpt}</p>
      <div className="flex items-center justify-between">
        <time className="text-neutral-500 text-xs">{formattedDate}</time>
        <div className="flex gap-2">
          {tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-neutral-700 rounded text-xs text-neutral-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
