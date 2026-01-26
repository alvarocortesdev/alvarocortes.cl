export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          {/* Social links */}
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/alvarocortesopazo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 text-sm hover:text-neutral-200 transition-colors"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/alvarocortesdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 text-sm hover:text-neutral-200 transition-colors"
            >
              GitHub
            </a>

            <a
              href="mailto:contacto@alvarocortes.cl"
              className="text-neutral-500 text-sm hover:text-neutral-200 transition-colors"
            >
              Email
            </a>
          </div>

          {/* Copyright */}
          <p className="text-neutral-500 text-sm">
            Alvaro Cortés Opazo &copy; 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
