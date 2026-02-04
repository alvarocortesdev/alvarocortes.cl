import { motion } from "framer-motion"
import { useTechCategories, type TechCategory, type Technology } from "../hooks/useTechCategories"
import { useState } from "react"
import { useTranslation, localized } from "../i18n/useTranslation"
import { useLanguage } from "../context/LanguageContext"

function TechIcon({ tech }: { tech: Technology }) {
  const [hasError, setHasError] = useState(false)
  const isCustomUrl = tech.icon.startsWith('http')

  if (hasError) {
    return (
      <span className="text-neutral-400 text-sm">{tech.name}</span>
    )
  }

  const iconSrc = isCustomUrl
    ? tech.icon
    : `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tech.icon}.svg`

  return (
    <div className="flex items-center gap-2">
      <img
        src={iconSrc}
        alt={tech.name}
        className="w-5 h-5 invert"
        onError={() => setHasError(true)}
      />
      <span className="text-neutral-300 text-sm">{tech.name}</span>
    </div>
  )
}

function TechCard({ category, index, lang }: { category: TechCategory; index: number; lang: 'es' | 'en' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-neutral-800 rounded-lg p-5"
    >
      {/* Category Title */}
      <h3 className="text-lg font-bold text-white mb-4">
        {localized(category, 'name', lang)}
      </h3>

      {/* Technologies List */}
      <div className="flex flex-col gap-3">
        {category.technologies.map((tech) => (
          <TechIcon key={tech.name} tech={tech} />
        ))}
      </div>
    </motion.div>
  )
}

export function TechStacks() {
  const { data: categories = [], isLoading, error } = useTechCategories()
  const { t } = useTranslation()
  const { lang } = useLanguage()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="h-64 bg-neutral-800/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="text-red-400 p-6 rounded-lg bg-red-900/20 border border-red-800"
      >
        <p className="font-medium">{t('tech.errorLoad')}</p>
      </motion.div>
    )
  }

  if (categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="text-neutral-400 text-center py-8 bg-neutral-800/30 rounded-lg"
      >
        {t('tech.empty')}
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <TechCard key={category.id} category={category} index={index} lang={lang} />
      ))}
    </div>
  )
}
