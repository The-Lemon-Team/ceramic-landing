import type { Core } from "@strapi/strapi";

const SEED_DATA = {
  products: [
    {
      title: "Тарелки",
      slug: "plates",
      price: 3500,
      description:
        "Авторская керамика из студии. Ручная работа, ограниченная серия.",
      category: "ГАЛЕРЕЯ",
      finish: "—",
      dimensions: "—",
      mainImage: "/images/productsImages/plates/photo_2026-02-15_17-36-29.jpg",
      images: [
        "/images/productsImages/plates/photo_2026-02-15_17-36-29.jpg",
        "/images/productsImages/plates/photo_2026-02-15_17-36-31.jpg",
        "/images/productsImages/plates/photo_2026-02-15_17-36-36.jpg",
      ],
      thumbnail: "/images/productsImages/plates/photo_2026-02-15_17-36-29.jpg",
    },
    {
      title: "Плитка",
      slug: "plitka",
      price: 4200,
      description:
        "Авторская керамика из студии. Ручная работа, ограниченная серия.",
      category: "ГАЛЕРЕЯ",
      finish: "—",
      dimensions: "—",
      mainImage: "/images/productsImages/plitka/photo_2026-02-15_17-13-22.jpg",
      images: [
        "/images/productsImages/plitka/photo_2026-02-15_17-13-22.jpg",
        "/images/productsImages/plitka/photo_2026-02-15_17-32-13.jpg",
        "/images/productsImages/plitka/photo_2026-02-15_17-33-14.jpg",
        "/images/productsImages/plitka/photo_2026-02-15_17-33-30.jpg",
      ],
      thumbnail: "/images/productsImages/plitka/photo_2026-02-15_17-13-22.jpg",
    },
    {
      title: "Гранат",
      slug: "pomegranate",
      price: 2800,
      description:
        "Авторская керамика из студии. Ручная работа, ограниченная серия.",
      category: "ГАЛЕРЕЯ",
      finish: "—",
      dimensions: "—",
      mainImage:
        "/images/productsImages/pomegranate/photo_2026-02-15_17-10-41.jpg",
      images: [
        "/images/productsImages/pomegranate/photo_2026-02-15_17-10-41.jpg",
        "/images/productsImages/pomegranate/photo_2026-02-15_17-10-42.jpg",
        "/images/productsImages/pomegranate/photo_2026-02-15_17-10-43.jpg",
        "/images/productsImages/pomegranate/photo_2026-02-15_17-29-38.jpg",
      ],
      thumbnail:
        "/images/productsImages/pomegranate/photo_2026-02-15_17-10-41.jpg",
    },
  ],
  artsThemes: [
    {
      title: "Чёрные наброски",
      slug: "black-sketches",
      description:
        "Серия графических набросков тушью и карандашом. Идеи форм и фактур, которые потом находят отражение в керамике.",
      cover: "/images/arts/black-sketches/photo_2026-02-15_20-00-11.jpg",
      media: [
        {
          type: "image",
          src: "/images/arts/black-sketches/photo_2026-02-15_20-00-11.jpg",
          alt: "Чёрные наброски 1",
        },
        {
          type: "image",
          src: "/images/arts/black-sketches/photo_2026-02-15_20-00-12.jpg",
          alt: "Чёрные наброски 2",
        },
        {
          type: "image",
          src: "/images/arts/black-sketches/photo_2026-02-15_20-00-13 (2).jpg",
          alt: "Чёрные наброски 3",
        },
        {
          type: "image",
          src: "/images/arts/black-sketches/photo_2026-02-15_20-00-13.jpg",
          alt: "Чёрные наброски 4",
        },
        {
          type: "image",
          src: "/images/arts/black-sketches/photo_2026-02-15_20-00-14 (2).jpg",
          alt: "Чёрные наброски 5",
        },
        {
          type: "image",
          src: "/images/arts/black-sketches/photo_2026-02-15_20-00-14.jpg",
          alt: "Чёрные наброски 6",
        },
        {
          type: "image",
          src: "/images/arts/black-sketches/photo_2026-02-15_20-00-15.jpg",
          alt: "Чёрные наброски 7",
        },
        {
          type: "image",
          src: "/images/arts/black-sketches/photo_2026-02-15_20-00-16 (2).jpg",
          alt: "Чёрные наброски 8",
        },
        {
          type: "image",
          src: "/images/arts/black-sketches/photo_2026-02-15_20-00-16.jpg",
          alt: "Чёрные наброски 9",
        },
      ],
    },
    {
      title: "Гранат",
      slug: "pomegranate",
      description:
        "Работа с глазурью и цветом — от эскиза до обжига. В этой серии много снято на видео: процесс важнее результата.",
      cover: "/images/arts/pomegranate/photo_2026-02-15_20-01-17.jpg",
      media: [
        {
          type: "image",
          src: "/images/arts/pomegranate/photo_2026-02-15_20-01-17.jpg",
          alt: "Гранат 1",
        },
        {
          type: "image",
          src: "/images/arts/pomegranate/photo_2026-02-15_20-01-19 (2).jpg",
          alt: "Гранат 2",
        },
        {
          type: "image",
          src: "/images/arts/pomegranate/photo_2026-02-15_20-01-19.jpg",
          alt: "Гранат 3",
        },
        {
          type: "image",
          src: "/images/arts/pomegranate/photo_2026-02-15_20-01-20.jpg",
          alt: "Гранат 4",
        },
        {
          type: "image",
          src: "/images/arts/pomegranate/photo_2026-02-15_20-01-21 (2).jpg",
          alt: "Гранат 5",
        },
        {
          type: "image",
          src: "/images/arts/pomegranate/photo_2026-02-15_20-01-21.jpg",
          alt: "Гранат 6",
        },
        {
          type: "image",
          src: "/images/arts/pomegranate/photo_2026-02-15_20-01-22.jpg",
          alt: "Гранат 7",
        },
        {
          type: "image",
          src: "/images/arts/pomegranate/photo_2026-02-15_20-01-23.jpg",
          alt: "Гранат 8",
        },
        {
          type: "video",
          src: "/images/arts/pomegranate/video_2026-02-15_20-01-28.mp4",
          poster: "/images/arts/pomegranate/photo_2026-02-15_20-01-23.jpg",
        },
      ],
    },
    {
      title: "Стих",
      slug: "verse",
      description:
        "Текст и керамика в одном пространстве — ручная надпись на поверхности, эскизы к будущим сериям.",
      cover: "/images/arts/verse/photo_2026-02-15_19-59-10 (2).jpg",
      media: [
        {
          type: "image",
          src: "/images/arts/verse/photo_2026-02-15_19-59-10 (2).jpg",
          alt: "Стих 1",
        },
        {
          type: "image",
          src: "/images/arts/verse/photo_2026-02-15_19-59-10.jpg",
          alt: "Стих 2",
        },
        {
          type: "image",
          src: "/images/arts/verse/photo_2026-02-15_19-59-11 (2).jpg",
          alt: "Стих 3",
        },
        {
          type: "image",
          src: "/images/arts/verse/photo_2026-02-15_19-59-11.jpg",
          alt: "Стих 4",
        },
        {
          type: "image",
          src: "/images/arts/verse/photo_2026-02-15_19-59-12.jpg",
          alt: "Стих 5",
        },
      ],
    },
    {
      title: "Инь и Ян",
      slug: "yin-yang",
      description:
        "Баланс контрастов: чёрное и белое, матовое и глянцевое. Серия с процессом в видео — от формы до финального обжига.",
      cover: "/images/arts/yin-yang/photo_2026-02-15_20-02-12.jpg",
      media: [
        {
          type: "image",
          src: "/images/arts/yin-yang/photo_2026-02-15_20-02-12.jpg",
          alt: "Инь и Ян 1",
        },
        {
          type: "image",
          src: "/images/arts/yin-yang/photo_2026-02-15_20-02-13.jpg",
          alt: "Инь и Ян 2",
        },
        {
          type: "image",
          src: "/images/arts/yin-yang/photo_2026-02-15_20-02-14.jpg",
          alt: "Инь и Ян 3",
        },
        {
          type: "image",
          src: "/images/arts/yin-yang/photo_2026-02-15_20-02-15 (2).jpg",
          alt: "Инь и Ян 4",
        },
        {
          type: "image",
          src: "/images/arts/yin-yang/photo_2026-02-15_20-02-15.jpg",
          alt: "Инь и Ян 5",
        },
        {
          type: "image",
          src: "/images/arts/yin-yang/photo_2026-02-15_20-02-16 (2).jpg",
          alt: "Инь и Ян 6",
        },
        {
          type: "image",
          src: "/images/arts/yin-yang/photo_2026-02-15_20-02-16.jpg",
          alt: "Инь и Ян 7",
        },
        {
          type: "image",
          src: "/images/arts/yin-yang/photo_2026-02-15_20-02-17.jpg",
          alt: "Инь и Ян 8",
        },
        {
          type: "image",
          src: "/images/arts/yin-yang/photo_2026-02-15_20-02-18.jpg",
          alt: "Инь и Ян 9",
        },
        {
          type: "video",
          src: "/images/arts/yin-yang/video_2026-02-15_20-02-18.mp4",
          poster: "/images/arts/yin-yang/photo_2026-02-15_20-02-18.jpg",
        },
      ],
    },
  ],
  telegramPosts: [
    {
      category: "Update",
      image: "/images/telegramImages/photo-1.jpg",
      text: "В мастерской сейчас так❤️: тишина после творчества, готовые работы на полке ждут своих хозяев, а за окном холодная метель и манят домашние огни🥺",
      timestamp: "2 часа назад",
    },
    {
      category: "Update",
      image: "/images/telegramImages/photo-2.jpg",
      text: "❤️Совсем скоро весенние праздники❤️\n\nА значит, отличный повод дарить что-то особенное интерьерное📍\n\nТарелочки с росписью — гранат, лимон, ботаника — каждая уникальна и расписана вручную.\n#керамика #ручнаяработа \n\nЭти тарелочки уже готовы 💌\nЗабронировать можно прямо в сообщениях💌",
      timestamp: "Вчера",
    },
    {
      category: "Update",
      image: "/images/telegramImages/photo-3.jpg",
      text: 'Пара преподавателей говорили мне: «Рисуй так, как надо, как сказали!»\n\n​Говорили: «У тебя штриховка — "солома", твои работы видно за версту, можешь даже не подписывать. Много теней, рефлексов — перебор!»\n\n​А я стояла и думала: а пусть эту штриховку даже с космоса видно будет🌟',
      timestamp: "22 ноя",
    },
    {
      category: "Announcement",
      text: "Теперь доступна доставка по всему миру для наших праздничных коллекций!",
      timestamp: "20 ноя",
      telegramUrl: "#",
    },
  ],
  aboutAuthor: {
    sectionTitle: "Об авторе",
    sectionLabel: "Мастер",
    authorName: "Альжанова Ольга",
    bio: "Всем здравствуйте💜 Меня зовут Оля и я рыбка 98 года рождения😊\n\nПозже, с удовольствием расскажу вам про себя, что бы познакомиться. Как закончила Псковский политехнический колледж с двумя 📕 дипломами по направлению ДПИ художник-оформитель и педагогическое, где изучила много дисциплин, выполняя всё сразу на практике, познавая различные материалы их виды и свойства, (всегда отдавала предпочтение росписи, батику и работе за🖼️).\n\nПоведаю, что керамика — это магия, которая не покидает меня с колледжа. И вот спустя годы, она снова появилась в жизни.\n📺🧡❤️💎📕😊",
    photo: "/images/about-photo.jpg",
    photoAlt: "Ольга Альжанова с керамической миской в студии",
    quote: "Искусство — это след человеческой жизни.",
    closingText: "С любовью и намерением,",
    signature: "Olya Alzhanova",
  },
  directions: {
    title: "Как добраться",
    address: "Санкт-Петербург, Васильевский остров",
  },
  siteConfig: {
    siteName: "Ceramic Loop | Петля Керамики",
    heroSubTitle: "Керамика Санкт-Петербурга",
    heroMotto:
      "Керамические изделия, созданные с душой и теплом в нашей студии.",
    heroCtaHref: "#studio",
    heroCtaLabel: "Смотреть изделия",
  },
  navItems: [
    { href: "#about", label: "О нас", sortOrder: 0 },
    { href: "#studio", label: "Студия", sortOrder: 1 },
    { href: "#master-classes", label: "Мастер-классы", sortOrder: 2 },
    { href: "#news", label: "Наша лента", sortOrder: 3 },
    { href: "#ceramics", label: "Каталог", sortOrder: 4 },
    { href: "#contacts", label: "Контакты", sortOrder: 5 },
  ],
};

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const productCount = await strapi
        .documents("api::product.product")
        .count({});
      if (productCount > 0) {
        return;
      }

      for (const p of SEED_DATA.products) {
        await strapi.documents("api::product.product").create({ data: p });
      }
      for (const a of SEED_DATA.artsThemes) {
        await strapi
          .documents("api::arts-theme.arts-theme")
          .create({ data: a as never });
      }
      for (const t of SEED_DATA.telegramPosts) {
        await strapi
          .documents("api::telegram-post.telegram-post")
          .create({ data: t as never });
      }

      const aboutAuthorExists = await strapi
        .documents("api::about-author.about-author")
        .findFirst();
      if (!aboutAuthorExists) {
        await strapi
          .documents("api::about-author.about-author")
          .create({ data: SEED_DATA.aboutAuthor });
      }

      const directionsExists = await strapi
        .documents("api::directions.direction")
        .findFirst();
      if (!directionsExists) {
        await strapi
          .documents("api::directions.direction")
          .create({ data: SEED_DATA.directions });
      }

      const siteConfigExists = await strapi
        .documents("api::site-config.site-config")
        .findFirst();
      if (!siteConfigExists) {
        await strapi
          .documents("api::site-config.site-config")
          .create({ data: SEED_DATA.siteConfig });
      }

      for (const n of SEED_DATA.navItems) {
        await strapi.documents("api::nav-item.nav-item").create({ data: n });
      }

      console.log("Seed data loaded successfully");
    } catch (err) {
      console.error("Bootstrap seed error:", err);
    }
  },
};
