import { useParams, Link } from 'react-router-dom'
import { getPostBySlug } from '../data/posts'
import { ShareButtons } from './ShareButtons'

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
        <Link to="/blog" className="text-blue-400 hover:text-blue-300">
          &larr; Back to blog
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(post.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const currentUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://alvarocortes.vercel.app/blog/${post.slug}`

  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      {/* Back link */}
      <Link to="/blog" className="text-blue-400 hover:text-blue-300 text-sm mb-6 inline-block">
        &larr; Back to blog
      </Link>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>

      {/* Metadata - POST-02 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 mb-6">
        <time>{formattedDate}</time>
        <span>&bull;</span>
        <span>{post.author}</span>
        <span>&bull;</span>
        <span className="text-blue-400">{post.category}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-neutral-700 rounded-full text-xs text-neutral-300">
            {tag}
          </span>
        ))}
      </div>

      {/* Content - POST-01 */}
      <div
        className="prose prose-invert prose-neutral max-w-none mb-8
          prose-headings:text-white prose-headings:font-semibold
          prose-p:text-neutral-300 prose-p:leading-relaxed
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-code:text-blue-300 prose-code:bg-neutral-800 prose-code:px-1 prose-code:rounded
          prose-ul:text-neutral-300 prose-li:text-neutral-300"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Share buttons - POST-04 */}
      <div className="border-t border-neutral-700 pt-6">
        <ShareButtons title={post.title} url={currentUrl} />
      </div>
    </article>
  )
}
