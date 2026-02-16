import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 bg-pattern-charlie-brown overflow-hidden"
    >
      {/* Градиенты для мягкого перехода между секциями */}
      <div
        className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none z-[1]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-[1]"
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-12 items-center">
          <div className="relative w-fit max-w-[308px] md:max-w-[352px] mx-auto md:mx-0">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
            {/* <div className="absolute -bottom-20 -right-20 z-0 w-48 h-48 bg-stone-200 rounded-full opacity-30"></div> */}
            <div
              className="relative rounded-2xl overflow-hidden border-[10px] border-stone-50 shadow-xl"
              style={{ aspectRatio: "3/5" }}
            >
              <Image
                src="/images/about-photo.jpg"
                alt="Ольга Альжанова с керамической миской в студии"
                width={352}
                height={587}
                className="w-full aspect-[3/5] object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -left-10 bg-primary p-4 text-white rounded-lg shadow-xl hidden lg:block">
              <p className="font-serif text-xl italic">
                &quot;Искусство — это след человеческой жизни.&quot;
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl bg-white/75  px-6 py-8 md:px-10 md:py-10 border border-white/60 shadow-sm">
              <span className="section-label-wrap">
                <span className="section-label text-stone-500 inline-flex items-center gap-1.5">
                  Мастер
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-stone-600 shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </span>
              <h2 className="section-title mb-6">Альжанова Ольга</h2>
              <div className="space-y-5 text-stone-600 text-[1.0625rem] leading-relaxed">
                <p>
                  Всем здравствуйте💜 Меня зовут Оля и я рыбка 98 года
                  рождения😊
                </p>
                <p>
                  Позже, с удовольствием расскажу вам про себя, что бы
                  познакомиться. Как закончила Псковский политехнический колледж
                  с двумя 📕 дипломами по направлению ДПИ художник-оформитель и
                  педагогическое, где изучила много дисциплин, выполняя всё
                  сразу на практике, познавая различные материалы их виды и
                  свойства, (всегда отдавала предпочтение росписи, батику и
                  работе за🖼️).
                </p>
                <p>
                  Поведаю, что керамика — это магия, которая не покидает меня с
                  колледжа. И вот спустя годы, она снова появилась в жизни.
                  <br />
                  📺🧡❤️💎📕😊
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-stone-100">
                <p className="text-stone-400 text-sm mb-2">
                  С любовью и намерением,
                </p>
                <p className="font-script text-4xl text-stone-800">
                  Olya Alzhanova
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
