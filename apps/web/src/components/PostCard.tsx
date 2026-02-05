import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { localized } from '../i18n/useTranslation'
import { useBlogCategories } from '../hooks/useBlogCategories'

interface PostCardProps {
  slug: string
  title: string
  title_en?: string | null
  excerpt: string
  excerpt_en?: string | null
  published_at: string | null
  created_at: string
  category: string
  category_id: string | null
  [key: string]: unknown
}

export function PostCard(props: PostCardProps) {
  const { slug, published_at, created_at, category, category_id } = props
  const { lang } = useLanguage()
  const { data: blogCategories = [] } = useBlogCategories()
  const locale = lang === 'en' ? 'en-US' : 'es-CL'
  const formattedDate = new Date(published_at || created_at).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const displayTitle = localized(props, 'title', lang)
  const displayExcerpt = localized(props, 'excerpt', lang)

  // Get localized category name from blog_categories (by category_id)
  const categoryData = category_id ? blogCategories.find(c => c.id === category_id) : null
  const displayCategory = categoryData ? localized(categoryData, 'name', lang) : category

  return (
    <article className="bg-[var(--bg-card)] rounded-lg p-6 hover:bg-[var(--bg-card-hover)] transition-colors">
      <Link to={`/blog/${slug}`} className="block">
        <h2 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
          {displayTitle}
        </h2>
      </Link>
      <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{displayExcerpt}</p>
      <div className="flex items-center justify-between">
        <time className="text-neutral-500 text-xs">{formattedDate}</time>
        <span className="px-2 py-0.5 bg-[var(--bg-tag)] rounded text-xs text-neutral-300">
          {displayCategory}
        </span>
      </div>
    </article>
  )
}
