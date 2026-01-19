export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo/Name - Left side */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-bold text-white">
            AC
          </div>
          <span className="text-lg font-semibold text-white">Alvaro Cortes</span>
        </div>

        {/* Navigation - Right side */}
        <nav>
          <a
            href="#"
            className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Inicio
          </a>
        </nav>
      </div>
    </header>
  )
}
