export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          {/* Social links placeholder */}
          <div className="flex gap-4">
            <span className="text-neutral-500 text-sm">LinkedIn</span>
            <span className="text-neutral-500 text-sm">GitHub</span>
            <span className="text-neutral-500 text-sm">Email</span>
          </div>

          {/* Copyright */}
          <p className="text-neutral-500 text-sm">
            Alvaro Cortes &copy; 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
