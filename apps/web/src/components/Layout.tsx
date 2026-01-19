import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  // State for progressive loading
  const [contentReady, setContentReady] = useState(false)
  const [showFooter, setShowFooter] = useState(false)

  // Ref for scroll detection
  const mainRef = useRef<HTMLElement>(null)

  // LOAD-02: Content fades in after brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true)
    }, 150) // ~150ms delay for smooth perception

    return () => clearTimeout(timer)
  }, [])

  // LOAD-03 & LAYOUT-04: Footer reveals on scroll to bottom
  useEffect(() => {
    if (!contentReady) return

    const handleScroll = () => {
      // Check if near bottom of page (within 100px)
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const nearBottom = documentHeight - scrollPosition < 100

      if (nearBottom) {
        setShowFooter(true)
      }
    }

    // Initial check in case content is short enough to show footer immediately
    // Delay slightly to allow layout to settle
    const initialCheck = setTimeout(() => {
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      // If content fits in viewport (no scrolling needed), show footer
      if (documentHeight <= windowHeight + 100) {
        setShowFooter(true)
      }
    }, 200)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(initialCheck)
    }
  }, [contentReady])

  return (
    <div className="min-h-screen flex flex-col">
      {/* LOAD-01: Header renders immediately */}
      <Header />

      {/* Main content with fade-in animation */}
      <motion.main
        ref={mainRef}
        className="flex-1 pt-16" // pt-16 accounts for fixed header height
        initial={{ opacity: 0 }}
        animate={{ opacity: contentReady ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.main>

      {/* Footer with scroll reveal */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
