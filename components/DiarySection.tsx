import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    slug: "first-burn",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKCI_1NW9gyQvvZ7I7kk940Rgg4jCgsUcwQDzvYfwR6HKBkc_xJ8U76mfN8aZWXbT8KHZ2R4acWtyLUt59K0FwRSBhiTMD12pHKKssLCQCBixHkd0uNv6xx6hz766COUI6muoaviAiYmI0-3FK1N4Hv9HwtTqZ9KKVQWBgz0qiLI49_-jplixy832dySum_B_NYDvNfCA4itb_Bf7T3JB7AZuLEnYZjrmRhIAWb7RPflb44-retl_TfPVY9yJ5p9hJFL7bwDnmXcQ",
    alt: "Керамика после первого обжига, расстановка в печи",
    category: "Процесс",
    title: "Первый обжиг: что важно не упустить",
    excerpt:
      "Подготовка к бисерному обжигу, расстановка в печи и почему температура подъёма влияет на результат.",
  },
  {
    slug: "clay-choice",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Wwmkkl62kGIKXDPRcx78zz0q6hvAqhyaVBleDpZwnWnmEoGDwRN5IzwEX26fIF9CVX8srHlpuFWWyyG5zv31Va6ip-kkrlL54qeBVb_SeubTFYoxRXTqHUaspoMae1djAZRkSbvAXqUUUmGkXK5rhZObNiwU1TDGJH3dfETChpquZLuF1zTiTlaesUgZwjGlj_vkdAFvIfJaXW7RMYm2qvM_imHFlJHtueyK0ikAQPs-qmoK_GWfT0Gs1m9iXmyMx3DHV425E5U",
    alt: "Роспись керамики кистями и пигментами в студии",
    category: "Творчество",
    title: "Рисование кистями и пигментами",
    excerpt:
      "Как рисовать кистями и пигментами, какие инструменты использовать и как это влияет на результат. ",
  },
  {
    slug: "glazing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEcKSfVsH7iGB-mhi7w7JAKeYKnvJHyHkiu7hhvFQY9t4V9OcwOHYHaOaG5V570RL4eOESCIRWecXf8FlKDpKSlWDcUUjNrK1wiK-RN8maFl35EpaE8415OQsRN98U7H8O4BZFEJ_NVD5gzEt-fRk7Iw08E3tAN3qX7TPwk-8DWXJcfNADEiaW2LjnmcfAD1qoXqiB6jvo5RmSSxCRSeRFRSowy4EzsPGjHjtv4b9vfWKtHhzRREP6xBVQx1tVOSMmiEwtNN6womg",
    alt: "Студия керамики, как добраться",
    category: "Студия",
    title: "Как добраться",
    excerpt: "Как проехать до нашей студии",
  },
  {
    slug: "rituals",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM-HgxXPcEg8h62pk-CuR7vg8jsiUiyDhWTZmXFInrQwEg9P5gXXGSYtpEmQ3d5rUh7HO0UcYe3plkB8PoyvtWzhHyezz_g5y3qQh5LcNZQD7eNmdSccjc-QjDQ6vFO-sIxwAPEQTbYIAPTYJ4eMk8AkPm4INgQ9bY0dNSv4M2ZVUs4JQvvVX7K5pz2pYn4tqgn6vfpWhfovCDZD2NZ85VmQOJb51uR69JWAdkCteAQM4HoTizQb1oIWhTGzqsQY6dgaS4VAaUcE4",
    alt: "Мастер керамики за творческой работой",
    category: "Мастер",
    title: "Все об авторе",
    excerpt:
      "Рассказываем о нашем авторе, творческий путь, образование, опыт работы, достижения и планы.",
  },
];

export default function DiarySection() {
  return (
    <section
      id="diary"
      className="bg-stone-100 border-t border-stone-200 py-12 md:py-14"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6 md:mb-8">
          <span className="section-label-wrap">
            <span className="section-label inline-flex items-center gap-1.5">
              Дневник
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary shrink-0"
                aria-hidden
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M8 7h8" />
                <path d="M8 11h8" />
              </svg>
            </span>
          </span>
          <h2 className="section-title text-3xl md:text-4xl mb-4">Статьи</h2>
          <p className="section-subtitle max-w-lg">
            Процесс, студия и мысли о керамике — короткие заметки и полезные
            тексты.
          </p>
        </div>
        <div className="max-w-4xl">
          <ul className="space-y-0 divide-y divide-stone-200/80">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`#${article.slug}`}
                  className="group flex gap-4 md:gap-6 py-5 md:py-6 text-left transition-colors hover:bg-stone-100/60 -mx-2 px-2 rounded-lg"
                >
                  <div className="relative shrink-0 w-24 h-16 md:w-28 md:h-[5.25rem] rounded-lg overflow-hidden bg-stone-200">
                    <Image
                      src={article.image}
                      alt={article.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="112px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-primary font-semibold">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl text-stone-800 mt-0.5 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-stone-500 text-sm mt-1 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <span className="shrink-0 self-center text-stone-300 group-hover:text-primary transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Ссылка на архив: внизу списка, не отвлекает от заголовка */}
          <p className="mt-6">
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-primary transition-colors"
            >
              Читать все записи
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
