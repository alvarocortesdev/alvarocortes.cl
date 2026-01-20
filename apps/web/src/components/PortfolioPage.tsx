import { Timeline } from './Timeline'
import { TechStacks } from './TechStacks'

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Portfolio
        </h1>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Mi Trayectoria
          </h2>
          <Timeline />
        </section>

        {/* Tech Stacks Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Tech Stack
          </h2>
          <TechStacks />
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          {/* Projects goes here */}
        </section>
      </div>
    </div>
  )
}
