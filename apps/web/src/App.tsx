import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { HomePage } from "./components/HomePage"
import { PortfolioPage } from "./components/PortfolioPage"
import { BlogPage } from "./components/BlogPage"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/portfolio" element={<Layout><PortfolioPage /></Layout>} />
      <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
    </Routes>
  )
}
