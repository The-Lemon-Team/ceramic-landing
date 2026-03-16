import Image from "next/image";

type Props = {
  text?: string;
};

export default function MasterClassesSection({ text }: Props) {
  const resolvedText =
    text ||
    "Если вы в Петербурге — приходите в студию. Не просто купить керамику, а сделать её своими руками под руководством Мастера. Сопричастность, эмоции и память на всю жизнь.";

  return (
    <section
      id="master-classes"
      className="py-20 px-6 bg-pattern-charlie-brown overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Левая колонка — текст */}
          <div className="flex flex-col justify-center">
            <div className="rounded-[5px] bg-white/50 dark:bg-white/5 px-6 py-8 md:px-10 md:py-10 border border-white/40 dark:border-white/10 shadow-sm">
              <span className="section-label-wrap">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-300 inline-flex items-center gap-1.5">
                  Мастер-классы
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M12 14l9-5-9-5-9 5 9 5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-stone-50 mb-4">
                Мастер-классы
              </h2>
              <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300 mb-8">
                {resolvedText}
              </p>
              <a
                href="https://t.me/ceramic_loop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md bg-primary text-white hover:bg-orange-600 transition-colors"
              >
                Записаться на мастер-класс
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Правая колонка — изображение */}
          <div className="relative w-full h-[360px] rounded-2xl overflow-hidden shadow-xl border border-stone-100 dark:border-white/10">
            <Image
              src="/images/masterclass.jpg"
              alt="Мастер-класс по керамике в студии"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
