import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="relative h-[500px] w-full overflow-hidden rounded-xl bg-cover bg-center flex items-center justify-center p-8">
        <Image
          src="/images/hero.png"
          alt="Artisan potter working with clay on a wheel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
        <div className="relative z-10 max-w-2xl text-center flex flex-col items-center gap-6">
          <h1 className="text-white text-3xl md:text-6xl font-black leading-tight">
            Ceramic•Loop
          </h1>
          <h3 className="text-white text-2xl md:text-2xl font-black leading-tight">
            Керамика Санкт-Петербурга
            <p className="text-white/90 text-sm md:text-sm font-light">
              Керамические изделия, созданные с душой и теплом в нашей студии.
            </p>
          </h3>

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
