import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePost } from '../hooks/usePost'
import { sanitizeHtml } from '../lib/sanitize'
import { ShareButtons } from './ShareButtons'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation, localized } from '../i18n/useTranslation'
import type { TranslationKey } from '../i18n/translations'

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, isLoading, error } = usePost(slug || '')
  const { lang } = useLanguage()
  const { t } = useTranslation()
  const locale = lang === 'en' ? 'en-US' : 'es-CL'

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="max-w-3xl mx-auto px-6 py-8"
      >
        <div className="h-4 w-20 bg-neutral-800 rounded mb-6 animate-pulse" />
        <div className="h-10 w-3/4 bg-neutral-800 rounded mb-4 animate-pulse" />
        <div className="h-4 w-1/2 bg-neutral-800/50 rounded mb-8 animate-pulse" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-neutral-800/30 rounded animate-pulse" />
          ))}
        </div>
      </motion.div>
    )
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-white mb-4">{t('post.notFound')}</h1>
        <Link to="/blog" className="text-blue-400 hover:text-blue-300">
          &larr; {t('post.backToBlog')}
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(post.published_at || post.created_at).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const currentUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://alvarocortes.vercel.app/blog/${post.slug}`

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="max-w-3xl mx-auto px-6 py-8"
    >
      {/* Back link */}
      <Link to="/blog" className="text-blue-400 hover:text-blue-300 text-sm mb-6 inline-block">
        &larr; {t('post.backToBlog')}
      </Link>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{localized(post, 'title', lang)}</h1>

      {/* Metadata - POST-02 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 mb-6">
        <time>{formattedDate}</time>
        <span>&bull;</span>
        <span>{post.author}</span>
        <span>&bull;</span>
        <span className="text-blue-400">{t(`category.${post.category}` as TranslationKey)}</span>
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
          prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-code:text-blue-300 prose-code:bg-neutral-800 prose-code:px-1 prose-code:rounded
          prose-ul:text-neutral-300 prose-li:text-neutral-300"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(localized(post, 'content', lang)) }}
      />

      {/* Share buttons - POST-04 */}
      <div className="border-t border-neutral-700 pt-6">
        <ShareButtons title={localized(post, 'title', lang)} url={currentUrl} />
      </div>
    </motion.article>
  )
}
