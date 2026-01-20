import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo/Name - Left side */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-700 flex items-center justify-center text-xs md:text-sm font-bold text-white">
            AC
          </div>
          <span className="text-base md:text-lg font-semibold text-white">Alvaro Cortes</span>
        </div>

        {/* Desktop Navigation - Right side */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Inicio
          </Link>
          <Link
            to="/portfolio"
            className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Portfolio
          </Link>
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden p-2 text-neutral-300 hover:text-white transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {/* Hamburger icon - 3 horizontal lines */}
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 bg-current transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile navigation dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-neutral-900 border-t border-neutral-800 px-6 py-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-neutral-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Inicio
          </Link>
          <Link
            to="/portfolio"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-neutral-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Portfolio
          </Link>
        </nav>
      )}
    </header>
  )
}
