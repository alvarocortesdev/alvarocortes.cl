import avatar from "@/assets/avatar.webp"

import { useState, useId } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import { useTranslation } from "../i18n/useTranslation"

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const maskId = useId()

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title="Toggles light & dark"
      aria-label={theme}
      aria-live="polite"
    >
      <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <mask className="moon" id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle className="sun" cx="12" cy="12" r="6" mask={`url(#${maskId})`} fill="currentColor" />
        <g className="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  )
}

function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      className="w-8 h-8 rounded-full border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 flex items-center justify-center"
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {lang === 'es' ? 'EN' : 'ES'}
    </button>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#portfolio')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-header)] border-b border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo/Name - Left side */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-[var(--border-subtle)] hover:opacity-80 transition">
            <img
              src={avatar}
              alt="Alvaro Cortes"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-base md:text-lg font-semibold text-[var(--text-primary)]">
            Alvaro Cortés
          </span>
        </div>

        {/* Desktop Navigation - Right side */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium"
          >
            {t('nav.home')}
          </Link>
          <a
            href="#portfolio"
            onClick={handlePortfolioClick}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium"
          >
            {t('nav.portfolio')}
          </a>
          <Link
            to="/blog"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium"
          >
            {t('nav.blog')}
          </Link>
          <LanguageToggle />
          <ThemeToggle />
        </nav>

        {/* Mobile: lang toggle + theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-[var(--bg-header)] border-t border-[var(--border-subtle)] px-6 py-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium"
          >
            {t('nav.home')}
          </Link>
          <a
            href="#portfolio"
            onClick={handlePortfolioClick}
            className="block py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium"
          >
            {t('nav.portfolio')}
          </a>
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium"
          >
            {t('nav.blog')}
          </Link>
        </nav>
      )}
    </header>
  )
}
