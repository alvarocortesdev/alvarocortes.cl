import { Layout } from "./components/Layout"

export function App() {
  return (
    <Layout>
      {/* Placeholder content - will be replaced by Home page in Phase 4 */}
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Alvaro Cortes</h1>
          <p className="text-neutral-400">Portfolio en construccion</p>
        </div>
      </div>
    </Layout>
  )
}
