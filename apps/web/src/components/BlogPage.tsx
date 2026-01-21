import { useState } from 'react'
import { BlogSidebar } from './BlogSidebar'

export function BlogPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Blog</h1>
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
          <div className="md:sticky md:top-24 bg-neutral-800 rounded-lg p-4">
            <BlogSidebar />
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1">
          <div className="bg-neutral-800 rounded-lg p-6">
            <p className="text-neutral-400">Blog posts will appear here</p>
          </div>
        </main>
      </div>
    </div>
  )
}
