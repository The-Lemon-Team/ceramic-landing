import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="/images/hero.png"
        alt="Мастер за гончарным кругом"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"
        aria-hidden
      />
      {/* Centered content in same container as other sections */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[85vh] flex items-center justify-center">
        <div className="max-w-2xl text-center flex flex-col items-center gap-6">
          <h1 className="text-white text-3xl md:text-6xl font-serif font-semibold leading-tight">
            Ceramic•Loop
          </h1>
          <h2 className="text-white text-xl md:text-2xl font-serif font-medium leading-tight">
            Керамика Санкт-Петербурга
          </h2>
          <p className="text-white/90 text-sm md:text-base font-sans font-light">
            Керамические изделия, созданные с душой и теплом в нашей студии.
          </p>
          <a
            href="#"
            className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition-transform"
          >
            Просмотреть коллекцию
          </a>
        </div>
      </div>
    </section>
  );
}
