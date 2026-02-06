import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useTranslation } from "../i18n/useTranslation"

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <motion.div
      className="min-h-[60vh] flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <p className="text-8xl md:text-9xl font-bold text-[var(--text-faint)]">
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mt-4">
          {t('notFound.title')}
        </h1>
        <p className="text-[var(--text-muted)] mt-2 max-w-md mx-auto">
          {t('notFound.description')}
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('notFound.backHome')}
        </Link>
      </div>
    </motion.div>
  )
}
