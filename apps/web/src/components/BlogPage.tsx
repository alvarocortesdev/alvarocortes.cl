import { useState, useMemo } from 'react'
import { BlogListing } from './BlogListing'
import { BlogSidebar } from './BlogSidebar'
import { usePosts } from '../hooks/usePosts'
import type { Post } from '../hooks/usePosts'
import { useTranslation } from '../i18n/useTranslation'

export interface BlogFilters {
  search: string
  date: { year: number; month: number; day: number } | null
  tag: string | null
  category: string | null
}

function filterPosts(posts: Post[], filters: BlogFilters): Post[] {
  return posts.filter(post => {
    // Search filter
    if (filters.search) {
      const term = filters.search.toLowerCase()
      const matches =
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
      if (!matches) return false
    }

    // Date filter
    if (filters.date) {
      const postDate = new Date(post.published_at || post.created_at)
      if (
        postDate.getFullYear() !== filters.date.year ||
        postDate.getMonth() !== filters.date.month ||
        postDate.getDate() !== filters.date.day
      ) {
        return false
      }
    }

    // Tag filter
    if (filters.tag) {
      if (!post.tags.includes(filters.tag)) return false
    }

    // Category filter
    if (filters.category) {
      if (post.category !== filters.category) return false
    }

    return true
  })
}

export function BlogPage() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    date: null,
    tag: null,
    category: null,
  })
  const [currentPage, setCurrentPage] = useState(1)

  const { data: posts = [], isLoading, error } = usePosts()

  const filteredPosts = useMemo(() => filterPosts(posts, filters), [posts, filters])

  const updateFilter = <K extends keyof BlogFilters>(key: K, value: BlogFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">{t('blog.title')}</h1>
        {/* Mobile toggle button - BLOG-03 */}
        <button
          className="md:hidden p-2 text-neutral-300 hover:text-white transition-colors duration-200"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Two-column layout: sidebar left, content right */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - hidden on mobile unless toggled, sticky on desktop - BLOG-02, BLOG-03 */}
        <aside className={`w-full md:w-64 shrink-0 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <div className="md:sticky md:top-24 bg-[var(--bg-card)] rounded-lg p-4">
            <BlogSidebar
              posts={posts}
              filters={filters}
              onFilterChange={updateFilter}
            />
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1">
          <BlogListing
            posts={filteredPosts}
            isLoading={isLoading}
            error={error}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  )
}
