import { AnimatedTimeline } from '../components/AnimatedTimeline'

export function TimelineDemo() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Simplified Navbar - logo only, no links */}
      <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <span className="text-xl font-bold">Alvaro Cortes</span>
        </div>
      </header>

      {/* Hero Section - placeholder to force scroll */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Timeline Demo
          </h1>
          <p className="text-neutral-400 text-lg mb-8">
            Scroll down to see the animated timeline
          </p>
          <div className="animate-bounce text-neutral-500">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Work Experience</h2>
          <AnimatedTimeline />
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-32" />
    </div>
  )
}
