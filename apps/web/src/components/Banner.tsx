export function Banner() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Photo placeholder */}
          <div className="w-32 h-32 rounded-full bg-neutral-700 flex items-center justify-center text-3xl font-bold text-white mb-8 border-4 border-neutral-600">
            AC
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Alvaro Cortes
          </h1>

          {/* Job Title */}
          <p className="text-xl text-neutral-400">
            Full Stack Developer
          </p>
        </div>
      </div>
    </section>
  )
}
