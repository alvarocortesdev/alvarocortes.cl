import { useAuth } from '@/contexts/AuthContext'

export function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-neutral-900">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between">
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

      <main className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome</h2>
        <p className="text-neutral-400">
          You are logged in as {user?.user_metadata?.full_name || user?.email}.
        </p>
        <p className="text-neutral-500 text-sm mt-2">
          User ID: {user?.id}
        </p>
        <p className="text-neutral-500 text-sm mt-4">
          Phase 15 will add blog management here.
        </p>
      </main>
    </div>
  )
}
