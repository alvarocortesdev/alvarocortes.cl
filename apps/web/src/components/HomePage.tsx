import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { Banner } from './Banner'
import { Bio } from './Bio'
import { Timeline } from './Timeline'
import { TechStacks } from './TechStacks'
import { ProjectsBento } from './ProjectsBento'

function RevealSection({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}

export function HomePage() {
  useEffect(() => {
    if (window.location.hash === '#portfolio') {
      setTimeout(() => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  return (
    <>
      {/* Above the fold — staggered delays */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
      >
        <Banner />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      >
        <Bio />
      </motion.div>

      {/* Portfolio sections — scroll reveal */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <RevealSection id="portfolio" className="mb-24 md:mb-28 scroll-mt-20">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Mi Trayectoria
          </h2>
          <Timeline />
        </RevealSection>

        <RevealSection className="mb-24 md:mb-28">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Tech Stack
          </h2>
          <TechStacks />
        </RevealSection>

        <RevealSection className="mb-24 md:mb-28">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Proyectos
          </h2>
          <ProjectsBento />
        </RevealSection>
      </div>
    </>
  )
}
