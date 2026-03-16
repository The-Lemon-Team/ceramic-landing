import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  titleRu: string;
  titleEn: string;
  subTitle: string;
  motto: string;
}

export default function Hero({ titleRu, titleEn, subTitle, motto }: HeroProps) {
  const headingBase = "text-white font-serif leading-tight";
  return (
    <section className="relative isolate w-full min-h-[100dvh] overflow-hidden bg-black pt-[var(--header-height)]">
      <Image
        src="/images/hero.png"
        alt={`Студия ${titleRu}`}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70"
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[calc(100dvh-var(--header-height))] flex items-center justify-center -mt-[12vh]">
        <div className="max-w-2xl text-center flex flex-col items-center gap-5">
          <h1
            className={`${headingBase} text-5xl sm:text-4xl md:text-6xl font-semibold drop-shadow-sm`}
          >
            <span className="block">{titleEn}</span>
            <span className="block mt-2">{titleRu}</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <h2
              className={`${headingBase} text-xl sm:text-2xl md:text-2xl font-medium drop-shadow-sm`}
            >
              {subTitle}
            </h2>
            <p className="text-white/90 text-sm sm:text-base font-sans font-light max-w-[42ch]">
              {motto}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/#ceramics"
              className="w-full sm:w-auto text-center bg-primary text-white px-6 py-2.5 text-base sm:px-8 sm:py-3 sm:text-lg rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-black/20"
            >
              Каталог
            </Link>
            <Link
              href="/#master-classes"
              className="w-full sm:w-auto text-center bg-white/15 text-white px-6 py-2.5 text-base sm:px-8 sm:py-3 sm:text-lg rounded-xl font-bold border border-white/30 hover:bg-white/25 transition-colors backdrop-blur-sm"
            >
              Мастер-классы
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
