interface BlogSidebarProps {
  className?: string
}

// Sample data (hardcoded for now)
const postDates = [5, 12, 18, 25]
const tags = ['React', 'TypeScript', 'Tailwind', 'Vite', 'Frontend', 'Backend', 'DevOps', 'Testing']
const categories = [
  { name: 'Development', count: 5 },
  { name: 'Design', count: 3 },
  { name: 'Career', count: 2 },
  { name: 'Tutorials', count: 4 },
]

function CalendarWidget() {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  return (
    <div className="grid grid-cols-7 gap-1 text-center text-xs">
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
        <div key={day} className="text-neutral-500 py-1">{day}</div>
      ))}
      {/* Empty cells for days before first of month */}
      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}
      {/* Day numbers */}
      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1
        const hasPost = postDates.includes(day)
        return (
          <div
            key={day}
            className={`py-1 rounded ${hasPost ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-500' : 'text-neutral-400'}`}
          >
            {day}
          </div>
        )
      })}
    </div>
  )
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

      {/* Calendar widget - SIDE-02 */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">
          {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
        </h3>
        <CalendarWidget />
      </div>

      {/* Tags cloud - SIDE-03 */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-xs text-neutral-300 hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Categories list - SIDE-04 */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.name}>
              <button className="w-full flex justify-between items-center text-sm text-neutral-300 hover:text-white transition-colors">
                <span>{category.name}</span>
                <span className="text-neutral-500">({category.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
