import { Link } from 'react-router-dom'

interface PostCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
}

export function PostCard({ slug, title, excerpt, date, tags }: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-750 transition-colors">
      <Link to={`/blog/${slug}`} className="block">
        <h2 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
          {title}
        </h2>
      </Link>
      <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{excerpt}</p>
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
