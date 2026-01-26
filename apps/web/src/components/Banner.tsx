export function Banner() {
  return (
    <section className="py-12 md:py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Photo placeholder */}
          {/* <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neutral-700 flex items-center justify-center text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 border-4 border-neutral-600">
            AC
          </div> */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 md:mb-8 border-4 border-neutral-600">
            <img
              src="/avatar.jpg"
              alt="Alvaro Cortés"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Alvaro "Pelusa" Cortés
          </h1>

          {/* Job Title */}
          <p className="text-lg md:text-xl text-neutral-400">
            Full Stack Developer
          </p>
        </div>
      </div>
    </section>
  )
}
