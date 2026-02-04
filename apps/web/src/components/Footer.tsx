import { useTranslation } from "../i18n/useTranslation"

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-[var(--bg-footer)] border-t border-[var(--border-subtle)] py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          {/* Social links */}
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/alvarocortesopazo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-faint)] text-sm hover:text-[var(--text-primary)] transition-colors"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/alvarocortesdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-faint)] text-sm hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>

            <a
              href="mailto:contacto@alvarocortes.cl"
              className="text-[var(--text-faint)] text-sm hover:text-[var(--text-primary)] transition-colors"
            >
              Email
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[var(--text-faint)] text-sm">
            {t('footer.copyright')} &copy; 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
