import { Routes, Route } from 'react-router-dom'
import { Login } from '@/pages/Login'
import { AuthCallback } from '@/pages/AuthCallback'
import { Dashboard } from '@/pages/Dashboard'
import { PostList } from '@/pages/PostList'
import { PostForm } from '@/pages/PostForm'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <PostList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/new"
        element={
          <ProtectedRoute>
            <PostForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/:id/edit"
        element={
          <ProtectedRoute>
            <PostForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
