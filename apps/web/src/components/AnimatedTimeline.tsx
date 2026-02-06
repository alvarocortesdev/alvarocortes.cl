import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useTimelines, type TimelineEntry } from '../hooks/useTimelines'
import { useTranslation, localized, localizedPeriod } from '../i18n/useTranslation'
import { useLanguage } from '../context/LanguageContext'

interface TimelineCardProps {
  entry: TimelineEntry
  t: (key: import('../i18n/translations').TranslationKey) => string
  lang: 'es' | 'en'
}

function TimelineCard({ entry, t, lang }: TimelineCardProps) {
  const isWork = entry.type === 'work'

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
      }}
      className="relative w-full md:w-72 md:flex-shrink-0"
    >
      {/* Mobile timeline connector - vertical line on left */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:hidden">
        {/* Dot */}
        <div
          className={`
            absolute left-3 top-6 w-2.5 h-2.5 rounded-full z-10
            ${isWork ? 'bg-blue-500' : 'bg-green-500'}
          `}
        />
      </div>

      {/* Card with left padding for timeline on mobile */}
      <div
        className={`
          bg-[var(--bg-card)] rounded-lg p-4 md:p-5 h-full
          border-l-4 ml-8 md:ml-0
          ${isWork ? 'border-blue-500' : 'border-green-500'}
        `}
      >
        {/* Type Badge */}
        <span
          className={`
            inline-block px-2 py-0.5 rounded text-xs font-medium mb-2
            ${isWork
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-green-500/20 text-green-400'
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

export function AnimatedTimeline() {
  const { data: entries = [], isLoading, error } = useTimelines()
  const { t } = useTranslation()
  const { lang } = useLanguage()

  const timelineRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const mostRecentRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(timelineRef, { once: true, amount: 0.3 })

  const [isScrolledFromLeft, setIsScrolledFromLeft] = useState(false)

  // Auto-scroll to most recent entry after animations complete
  useEffect(() => {
    if (!isInView || entries.length === 0) return

    const totalAnimationTime = 2.5 + entries.length * 0.15 + 0.1
    const timer = setTimeout(() => {
      mostRecentRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
      })
    }, totalAnimationTime * 1000)

    return () => clearTimeout(timer)
  }, [isInView, entries.length])

  // Track scroll position for left gradient
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setIsScrolledFromLeft(container.scrollLeft > 20)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

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
              className="w-full md:w-72 md:flex-shrink-0 h-40 bg-[var(--bg-card-50)] rounded-lg animate-pulse"
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
        className="text-neutral-400 text-center py-8 bg-[var(--bg-card-30)] rounded-lg"
      >
        {t('timeline.empty')}
      </motion.div>
    )
  }

  const viewBoxWidth = Math.max(1200, entries.length * 150)

  // Container variants for staggered card animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.5,
        staggerDirection: -1, // Animate newest to oldest
      },
    },
  }

  return (
    <div ref={timelineRef} className="relative">
      {/* Desktop SVG Timeline */}
      <div className="hidden md:block relative h-48 mb-8">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox={`0 0 ${viewBoxWidth} 200`}
          preserveAspectRatio="xMinYMid meet"
        >
          {/* Horizontal line */}
          <motion.line
            x1="0"
            y1="30"
            x2={viewBoxWidth}
            y2="30"
            stroke="rgb(115, 115, 115)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          />

          {/* Vertical branches */}
          {entries.map((entry, index) => {
            const positionFromRight = entries.length - 1 - index
            const isUp = positionFromRight % 2 === 0
            const x = index * 150 + 100
            const y1 = 30
            const y2 = isUp ? 120 : -60

            return (
              <motion.line
                key={entry.id}
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke={entry.type === 'work' ? 'rgb(59, 130, 246)' : 'rgb(34, 197, 94)'}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.3, delay: 2.5 + index * 0.15, ease: 'easeOut' }}
              />
            )
          })}
        </svg>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        className="
          md:overflow-x-auto md:pb-4
          md:[scrollbar-width:thin]
          md:[scrollbar-color:theme(colors.neutral.600)_transparent]
        "
      >
        {/* Flex container: vertical on mobile, horizontal on desktop */}
        <motion.div
          className="flex flex-col gap-4 md:flex-row md:gap-6 md:min-w-max"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              ref={index === entries.length - 1 ? mostRecentRef : undefined}
            >
              <TimelineCard
                entry={entry}
                t={t}
                lang={lang}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Left gradient indicator - appears when scrolled */}
      {isScrolledFromLeft && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            hidden md:block
            absolute left-0 top-0 bottom-4 w-16
            bg-gradient-to-r from-neutral-900 to-transparent
            pointer-events-none
          "
        />
      )}

      {/* Right gradient indicator - always visible */}
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
