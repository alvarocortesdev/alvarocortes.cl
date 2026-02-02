import { Routes, Route } from 'react-router-dom'
import { Login } from '@/pages/Login'
import { AuthCallback } from '@/pages/AuthCallback'
import { Dashboard } from '@/pages/Dashboard'
import { PostList } from '@/pages/PostList'
import { PostForm } from '@/pages/PostForm'
import { ProjectList } from '@/pages/ProjectList'
import { ProjectForm } from '@/pages/ProjectForm'
import { TimelineList } from '@/pages/TimelineList'
import { TimelineForm } from '@/pages/TimelineForm'
import { TechCategoryList } from '@/pages/TechCategoryList'
import { TechCategoryForm } from '@/pages/TechCategoryForm'
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
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/new"
        element={
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id/edit"
        element={
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timeline"
        element={
          <ProtectedRoute>
            <TimelineList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timeline/new"
        element={
          <ProtectedRoute>
            <TimelineForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timeline/:id/edit"
        element={
          <ProtectedRoute>
            <TimelineForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tech-categories"
        element={
          <ProtectedRoute>
            <TechCategoryList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tech-categories/new"
        element={
          <ProtectedRoute>
            <TechCategoryForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tech-categories/:id/edit"
        element={
          <ProtectedRoute>
            <TechCategoryForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
