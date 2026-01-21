export function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Blog</h1>

      {/* Two-column layout: sidebar left, content right */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - stacked on mobile, left column on desktop */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-neutral-800 rounded-lg p-4">
            <p className="text-neutral-400 text-sm">Sidebar placeholder</p>
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
