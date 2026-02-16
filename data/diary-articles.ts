export type DiaryArticle = {
  slug: string;
  image: string;
  alt: string;
  category: string;
  title: string;
  excerpt: string;
};

export const DIARY_ARTICLES: DiaryArticle[] = [
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
