import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Handle the OAuth callback
    const handleCallback = async () => {
      // Check if we have a code in the URL (PKCE flow)
      const url = new URL(window.location.href)
      const code = url.searchParams.get('code')

      // If no code, check if already authenticated
      if (!code) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          navigate('/', { replace: true })
          return
        }
        // No code and no session - redirect to login
        navigate('/login', { replace: true })
        return
      }

      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error) {
        setError(error.message)
        return
      }

      // Redirect to dashboard on success
      navigate('/', { replace: true })
    }

    handleCallback()
  }, [navigate])

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Authentication Error</h1>
          <p className="text-neutral-400 mb-4">{error}</p>
          <a href="/login" className="text-blue-400 hover:underline">
            Try again
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-white">Completing sign in...</div>
    </div>
  )
}
