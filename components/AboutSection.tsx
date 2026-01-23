import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-stone-200 rounded-full opacity-30"></div>
            <div
              className="relative rounded-2xl overflow-hidden border-[12px] border-stone-50 shadow-xl "
              style={{ aspectRatio: "3/5" }}
            >
              <Image
                src="/images/about-photo.jpg"
                alt="Ольга Альжанова с керамической миской в студии"
                width={500}
                height={625}
                className="w-full aspect-[3/5] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary p-6 text-white rounded-lg shadow-xl hidden lg:block">
              <p className="font-serif text-2xl italic">
                &quot;Art is the trace of a human life.&quot;
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-4 block">
              Мастер:
            </span>
            <h2 className="text-5xl md:text-6xl font-serif mb-8">
              Альжанова Ольга
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                Всем здравствуйте💜 Меня зовут Оля и я рыбка 98 года рождения😊
              </p>
              <p>
                Позже, с удовольствием расскажу вам про себя, что бы
                познакомиться. Как закончила Псковский политехнический колледж с
                двумя 📕 дипломами по направлению ДПИ художник-оформитель и
                педагогическое, где изучила много дисциплин, выполняя всё сразу
                на практике, познавая различные материалы их виды и свойства,
                (всегда отдавала предпочтение росписи, батику и работе за🖼️).
              </p>
              <p>
                Поведаю, что керамика — это магия, которая не покидает меня с
                колледжа. И вот спустя годы, она снова появилась в жизни.
                <br />
                📺🧡❤️💎📕😊
              </p>
            </div>
            <div className="mt-10 pt-10 border-t border-stone-100">
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
    </section>
  );
}
