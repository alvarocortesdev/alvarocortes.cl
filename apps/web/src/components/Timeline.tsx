import { motion } from "framer-motion"
import { useTimelines, type TimelineEntry } from "../hooks/useTimelines"
import { useTranslation, localized, localizedPeriod } from "../i18n/useTranslation"
import { useLanguage } from "../context/LanguageContext"

function TimelineCard({ entry, index, isLast, t, lang }: { entry: TimelineEntry; index: number; isLast: boolean; t: (key: import('../i18n/translations').TranslationKey) => string; lang: 'es' | 'en' }) {
  const isWork = entry.type === "work"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative w-full md:w-72 md:flex-shrink-0"
    >
      {/* Mobile timeline connector - vertical line on left */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:hidden">
        {/* Dot */}
        <div
          className={`
            absolute left-3 top-6 w-2.5 h-2.5 rounded-full z-10
            ${isWork ? "bg-blue-500" : "bg-green-500"}
          `}
        />
        {/* Vertical line */}
        {!isLast && (
          <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-neutral-700" />
        )}
      </div>

      {/* Card with left padding for timeline on mobile */}
      <div
        className={`
          bg-neutral-800 rounded-lg p-4 md:p-5 h-full
          border-l-4 ml-8 md:ml-0
          ${isWork ? "border-blue-500" : "border-green-500"}
        `}
      >
        {/* Type Badge */}
        <span
          className={`
            inline-block px-2 py-0.5 rounded text-xs font-medium mb-2
            ${isWork
              ? "bg-blue-500/20 text-blue-400"
              : "bg-green-500/20 text-green-400"
            }
          `}
        >
          {isWork ? t('timeline.work') : t('timeline.studies')}
        </span>

        {/* Period */}
        <div className="text-2xl font-bold text-white mb-2">
          {localizedPeriod(entry.period, lang)}
        </div>

        {/* Title */}
        <div className="text-neutral-200 font-medium mb-1">
          {localized(entry, 'title', lang)}
        </div>

        {/* Organization */}
        <div className="text-neutral-400 text-sm">
          {entry.organization}
        </div>
      </div>
    </motion.div>
  )
}

export function Timeline() {
  const { data: entries = [], isLoading, error } = useTimelines()
  const { t } = useTranslation()
  const { lang } = useLanguage()

  if (isLoading) {
    return (
      <div className="relative">
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="w-full md:w-72 md:flex-shrink-0 h-40 bg-neutral-800/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
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
        <p className="font-medium">{t('timeline.errorLoad')}</p>
      </motion.div>
    )
  }

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="text-neutral-400 text-center py-8 bg-neutral-800/30 rounded-lg"
      >
        {t('timeline.empty')}
      </motion.div>
    )
  }

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        className="
          md:overflow-x-auto md:pb-4
          md:[scrollbar-width:thin]
          md:[scrollbar-color:theme(colors.neutral.600)_transparent]
        "
      >
        {/* Flex container: vertical on mobile, horizontal on desktop */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:min-w-max">
          {entries.map((entry, index) => (
            <TimelineCard
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === entries.length - 1}
              t={t}
              lang={lang}
            />
          ))}
        </div>
      </div>

      {/* Desktop scroll affordance - gradient fade on right */}
      <div
        className="
          hidden md:block
          absolute right-0 top-0 bottom-4 w-16
          bg-gradient-to-l from-neutral-900 to-transparent
          pointer-events-none
        "
      />
    </div>
  )
}
