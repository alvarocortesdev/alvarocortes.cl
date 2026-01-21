interface BlogSidebarProps {
  className?: string
}

export function BlogSidebar({ className = '' }: BlogSidebarProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search - SIDE-01 */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Search</h3>
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Calendar placeholder - will be implemented in 10-02 */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Calendar</h3>
        <div className="bg-neutral-700 rounded-lg p-4 text-neutral-400 text-sm">
          Calendar widget
        </div>
      </div>

      {/* Tags placeholder - will be implemented in 10-02 */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Tags</h3>
        <div className="bg-neutral-700 rounded-lg p-4 text-neutral-400 text-sm">
          Tags cloud
        </div>
      </div>

      {/* Categories placeholder - will be implemented in 10-02 */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Categories</h3>
        <div className="bg-neutral-700 rounded-lg p-4 text-neutral-400 text-sm">
          Categories list
        </div>
      </div>
    </div>
  )
}
