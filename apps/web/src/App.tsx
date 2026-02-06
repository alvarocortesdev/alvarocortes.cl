import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./components/Layout"
import { HomePage } from "./components/HomePage"
import { BlogPage } from "./components/BlogPage"
import { PostDetail } from "./components/PostDetail"
import { TimelineDemo } from "./pages/TimelineDemo"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/portfolio" element={<Navigate to="/#portfolio" replace />} />
      <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:slug" element={<Layout><PostDetail /></Layout>} />
      <Route path="/timeline-demo" element={<TimelineDemo />} />
    </Routes>
  )
}
