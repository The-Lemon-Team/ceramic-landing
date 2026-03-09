import Image from "next/image";

interface HeroProps {
  title: string;
  subTitle: string;
  motto: string;
}

export default function Hero({ title, subTitle, motto }: HeroProps) {
  const headingBase = "text-white font-serif leading-tight";
  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden">
      <Image
        src="/images/hero.png"
        alt={`Студия ${title}`}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[85vh] flex items-center justify-center">
        <div className="max-w-2xl text-center flex flex-col items-center gap-6">
          <h1 className={`${headingBase} text-3xl md:text-6xl font-semibold`}>
            {title}
          </h1>
          <h2 className={`${headingBase} text-xl md:text-2xl font-medium`}>
            {subTitle}
          </h2>
          <p className="text-white/90 text-sm md:text-base font-sans font-light">
            {motto}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/#ceramics"
              className="w-full sm:w-auto text-center bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition-transform"
            >
              Каталог
            </a>
            <a
              href="/#master-classes"
              className="w-full sm:w-auto text-center bg-white/20 text-white px-8 py-3 rounded-lg font-bold text-lg border border-white/40 hover:bg-white/30 transition-colors"
            >
              Мастер-классы
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
