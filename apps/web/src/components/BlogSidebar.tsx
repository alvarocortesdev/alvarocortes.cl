import { useMemo, useState } from 'react'
import type { Post } from '../hooks/usePosts'
import type { BlogFilters } from './BlogPage'
import { useTranslation, localized } from '../i18n/useTranslation'
import { useLanguage } from '../context/LanguageContext'
import { useBlogCategories } from '../hooks/useBlogCategories'

interface BlogSidebarProps {
  posts: Post[]
  filters: BlogFilters
  onFilterChange: <K extends keyof BlogFilters>(key: K, value: BlogFilters[K]) => void
}

interface CalendarWidgetProps {
  posts: Post[]
  selectedDate: BlogFilters['date']
  onDateSelect: (date: BlogFilters['date']) => void
}

function CalendarWidget({ posts, selectedDate, onDateSelect }: CalendarWidgetProps) {
  const { lang } = useLanguage()
  const locale = lang === 'en' ? 'en-US' : 'es-CL'
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth())

  // Spanish: Monday first (1), English: Sunday first (0)
  const weekStartsOnMonday = lang === 'es'

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfMonthRaw = new Date(viewYear, viewMonth, 1).getDay() // 0=Sunday
  // Adjust for Monday start: Sunday (0) becomes 6, Monday (1) becomes 0, etc.
  const firstDayOfMonth = weekStartsOnMonday
    ? (firstDayOfMonthRaw === 0 ? 6 : firstDayOfMonthRaw - 1)
    : firstDayOfMonthRaw

  const postDaySet = useMemo(() => {
    const days = new Set<number>()
    posts.forEach(post => {
      const d = new Date(post.published_at || post.created_at)
      if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
        days.add(d.getDate())
      }
    })
    return days
  }, [posts, viewYear, viewMonth])

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString(locale, { month: 'long' })

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(y => y - 1)
    } else {
      setViewMonth(m => m - 1)
    }
  }

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(y => y + 1)
    } else {
      setViewMonth(m => m + 1)
    }
  }

  const handleDayClick = (day: number) => {
    if (
      selectedDate &&
      selectedDate.year === viewYear &&
      selectedDate.month === viewMonth &&
      selectedDate.day === day
    ) {
      onDateSelect(null)
    } else {
      onDateSelect({ year: viewYear, month: viewMonth, day })
    }
  }

  // Generate weekday headers based on locale
  const weekdayHeaders = useMemo(() => {
    const headers: string[] = []
    // Start from Monday (Jan 1 2024 is Monday) or Sunday (Dec 31 2023 is Sunday)
    const startDate = weekStartsOnMonday ? new Date(2024, 0, 1) : new Date(2023, 11, 31)
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate)
      d.setDate(startDate.getDate() + i)
      const label = d.toLocaleString(locale, { weekday: 'short' }).replace(/\.$/, '')
      headers.push(label.charAt(0).toUpperCase() + label.slice(1))
    }
    return headers
  }, [locale, weekStartsOnMonday])

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={goToPrevMonth}
          className="text-neutral-400 hover:text-white p-1 transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-sm font-semibold text-white">
          {monthLabel} {viewYear}
        </h3>
        <button
          onClick={goToNextMonth}
          className="text-neutral-400 hover:text-white p-1 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {weekdayHeaders.map((header, i) => (
          <div key={i} className="text-neutral-500 py-1">
            {header}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const hasPost = postDaySet.has(day)
          const isSelected =
            selectedDate &&
            selectedDate.year === viewYear &&
            selectedDate.month === viewMonth &&
            selectedDate.day === day

          return (
            <button
              key={day}
              type="button"
              disabled={!hasPost}
              onClick={() => hasPost && handleDayClick(day)}
              className={`py-1 rounded text-xs transition-colors ${
                isSelected
                  ? 'bg-blue-500 text-white ring-2 ring-blue-400'
                  : hasPost
                    ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-500'
                    : 'text-neutral-400 cursor-default'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function BlogSidebar({ posts, filters, onFilterChange }: BlogSidebarProps) {
  const { t } = useTranslation()
  const { lang } = useLanguage()
  const { data: blogCategories = [] } = useBlogCategories()

  // Count posts per category_id and merge with DB categories
  const categoriesWithCounts = useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach(post => {
      if (post.category_id) {
        counts.set(post.category_id, (counts.get(post.category_id) || 0) + 1)
      }
    })

    // Use DB categories with post counts (by category_id)
    if (blogCategories.length > 0) {
      return blogCategories
        .map(cat => ({
          id: cat.id,
          name: cat.name,
          name_en: cat.name_en,
          count: counts.get(cat.id) || 0,
        }))
        .filter(cat => cat.count > 0)
    }

    // Fallback: derive categories from posts if DB is empty (legacy text-based)
    const textCounts = new Map<string, number>()
    posts.forEach(post => {
      if (post.category) {
        textCounts.set(post.category, (textCounts.get(post.category) || 0) + 1)
      }
    })
    return Array.from(textCounts.entries())
      .map(([name, count]) => ({
        id: name,
        name,
        name_en: null as string | null,
        count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [posts, blogCategories])

  return (
    <div className="space-y-6">
      {/* Search - SIDE-01 */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">{t('blog.search')}</h3>
        <input
          type="text"
          placeholder={t('blog.searchPlaceholder')}
          value={filters.search}
          onChange={e => onFilterChange('search', e.target.value)}
          className="w-full px-3 py-2 bg-[var(--bg-tag)] border border-neutral-600 rounded-lg text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Calendar widget - SIDE-02 */}
      <div>
        <CalendarWidget
          posts={posts}
          selectedDate={filters.date}
          onDateSelect={date => onFilterChange('date', date)}
        />
      </div>

      {/* Categories list - SIDE-03 */}
      {categoriesWithCounts.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">{t('blog.categories')}</h3>
          <ul className="space-y-2">
            {categoriesWithCounts.map(category => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange('category', filters.category === category.id ? null : category.id)
                  }
                  className={`w-full flex justify-between items-center text-sm transition-colors ${
                    filters.category === category.id
                      ? 'text-blue-400 font-medium'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{localized(category, 'name', lang)}</span>
                  <span className="text-neutral-500">({category.count})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
