import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { getPosts } from '@/lib/posts'
import { getProjects } from '@/lib/projects'
import { getTimelineEntries } from '@/lib/timelines'
import { getTechCategories } from '@/lib/techCategories'

export function Dashboard() {
  const { user, signOut } = useAuth()
  const [postsCount, setPostsCount] = useState<number>(0)
  const [projectsCount, setProjectsCount] = useState<number>(0)
  const [timelineCount, setTimelineCount] = useState<number>(0)
  const [techCategoriesCount, setTechCategoriesCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [posts, projects, timeline, categories] = await Promise.all([
          getPosts(),
          getProjects(),
          getTimelineEntries(),
          getTechCategories(),
        ])

        setPostsCount(posts.length)
        setProjectsCount(projects.length)
        setTimelineCount(timeline.length)
        setTechCategoriesCount(categories.length)
      } catch (error) {
        console.error('Failed to fetch counts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-900">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 text-sm">
              {user?.email || user?.user_metadata?.user_name}
            </span>
            <button
              onClick={signOut}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Content Management</h2>

        {loading ? (
          <div className="text-neutral-400 text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/posts"
              className="block p-6 bg-neutral-900 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">Blog Posts</h3>
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-neutral-400 text-sm mb-4">
                Create and manage blog articles
              </p>
              <div className="text-neutral-500 text-sm">
                {postsCount} {postsCount === 1 ? 'post' : 'posts'}
              </div>
            </Link>

            <Link
              to="/projects"
              className="block p-6 bg-neutral-900 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">Projects</h3>
                <span className="text-2xl">💼</span>
              </div>
              <p className="text-neutral-400 text-sm mb-4">
                Manage portfolio projects
              </p>
              <div className="text-neutral-500 text-sm">
                {projectsCount} {projectsCount === 1 ? 'project' : 'projects'}
              </div>
            </Link>

            <Link
              to="/timeline"
              className="block p-6 bg-neutral-900 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">Timeline</h3>
                <span className="text-2xl">📅</span>
              </div>
              <p className="text-neutral-400 text-sm mb-4">
                Manage work and studies timeline entries
              </p>
              <div className="text-neutral-500 text-sm">
                {timelineCount} {timelineCount === 1 ? 'entry' : 'entries'}
              </div>
            </Link>

            <Link
              to="/tech-categories"
              className="block p-6 bg-neutral-900 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">Tech Categories</h3>
                <span className="text-2xl">🛠️</span>
              </div>
              <p className="text-neutral-400 text-sm mb-4">
                Manage technology categories and icons
              </p>
              <div className="text-neutral-500 text-sm">
                {techCategoriesCount} {techCategoriesCount === 1 ? 'category' : 'categories'}
              </div>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
