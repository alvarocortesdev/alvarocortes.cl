import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [showFooter, setShowFooter] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      if (documentHeight - scrollPosition < 100) {
        setShowFooter(true)
      }
    }

    const initialCheck = setTimeout(() => {
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      if (documentHeight <= windowHeight + 100) {
        setShowFooter(true)
      }
    }, 200)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(initialCheck)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {children}
      </main>

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
