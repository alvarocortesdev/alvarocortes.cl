import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function Dashboard() {
  const { user, signOut } = useAuth()

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/posts"
            className="bg-neutral-800 hover:bg-neutral-700 p-6 rounded-lg transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Blog Posts</h3>
            <p className="text-neutral-400 text-sm">Create and manage blog articles</p>
          </Link>

          <div className="bg-neutral-800/50 p-6 rounded-lg opacity-50 cursor-not-allowed">
            <h3 className="text-lg font-semibold text-white mb-2">Projects</h3>
            <p className="text-neutral-400 text-sm">Coming in Phase 16</p>
          </div>

          <div className="bg-neutral-800/50 p-6 rounded-lg opacity-50 cursor-not-allowed">
            <h3 className="text-lg font-semibold text-white mb-2">Timeline</h3>
            <p className="text-neutral-400 text-sm">Coming in Phase 17</p>
          </div>

          <div className="bg-neutral-800/50 p-6 rounded-lg opacity-50 cursor-not-allowed">
            <h3 className="text-lg font-semibold text-white mb-2">Tech Stacks</h3>
            <p className="text-neutral-400 text-sm">Coming in Phase 17</p>
          </div>
        </div>
      </main>
    </div>
  )
}
