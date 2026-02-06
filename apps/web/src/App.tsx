import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./components/Layout"
import { HomePage } from "./components/HomePage"
import { NotFoundPage } from "./components/NotFoundPage"

const BlogPage = lazy(() => import("./components/BlogPage").then(m => ({ default: m.BlogPage })))
const PostDetail = lazy(() => import("./components/PostDetail").then(m => ({ default: m.PostDetail })))
const TimelineDemo = lazy(() => import("./pages/TimelineDemo").then(m => ({ default: m.TimelineDemo })))

export function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/portfolio" element={<Navigate to="/#portfolio" replace />} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><PostDetail /></Layout>} />
        <Route path="/timeline-demo" element={<TimelineDemo />} />
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </Suspense>
  )
}
