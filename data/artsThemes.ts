/**
 * Темы галереи «Зарисовки и арты».
 * Медиа лежат в public/images/arts/<slug>/ (скопируйте из components/images в public/images/arts/).
 * В каждой теме: первое изображение — постер на главной, остальные — в галерее (фото + видео).
 */

export type ArtsMediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export type ArtsTheme = {
  id: string;
  slug: string;
  title: string;
  /** Описание темы — отображается рядом с галереей */
  description: string;
  /** Постер для карточки на главной (первое изображение темы) */
  cover: string;
  /** Все медиа темы: изображения и видео по порядку */
  media: ArtsMediaItem[];
};

const base = "/images/arts";

export const artsThemes: ArtsTheme[] = [
  {
    id: "black-sketches",
    slug: "black-sketches",
    title: "Чёрные наброски",
    description:
      "Серия графических набросков тушью и карандашом. Идеи форм и фактур, которые потом находят отражение в керамике.",
    cover: `${base}/black-sketches/photo_2026-02-15_20-00-11.jpg`,
    media: [
      { type: "image", src: `${base}/black-sketches/photo_2026-02-15_20-00-11.jpg`, alt: "Чёрные наброски 1" },
      { type: "image", src: `${base}/black-sketches/photo_2026-02-15_20-00-12.jpg`, alt: "Чёрные наброски 2" },
      { type: "image", src: `${base}/black-sketches/photo_2026-02-15_20-00-13 (2).jpg`, alt: "Чёрные наброски 3" },
      { type: "image", src: `${base}/black-sketches/photo_2026-02-15_20-00-13.jpg`, alt: "Чёрные наброски 4" },
      { type: "image", src: `${base}/black-sketches/photo_2026-02-15_20-00-14 (2).jpg`, alt: "Чёрные наброски 5" },
      { type: "image", src: `${base}/black-sketches/photo_2026-02-15_20-00-14.jpg`, alt: "Чёрные наброски 6" },
      { type: "image", src: `${base}/black-sketches/photo_2026-02-15_20-00-15.jpg`, alt: "Чёрные наброски 7" },
      { type: "image", src: `${base}/black-sketches/photo_2026-02-15_20-00-16 (2).jpg`, alt: "Чёрные наброски 8" },
      { type: "image", src: `${base}/black-sketches/photo_2026-02-15_20-00-16.jpg`, alt: "Чёрные наброски 9" },
    ],
  },
  {
    id: "pomegranate",
    slug: "pomegranate",
    title: "Гранат",
    description:
      "Работа с глазурью и цветом — от эскиза до обжига. В этой серии много снято на видео: процесс важнее результата.",
    cover: `${base}/pomegranate/photo_2026-02-15_20-01-17.jpg`,
    media: [
      { type: "image", src: `${base}/pomegranate/photo_2026-02-15_20-01-17.jpg`, alt: "Гранат 1" },
      { type: "image", src: `${base}/pomegranate/photo_2026-02-15_20-01-19 (2).jpg`, alt: "Гранат 2" },
      { type: "image", src: `${base}/pomegranate/photo_2026-02-15_20-01-19.jpg`, alt: "Гранат 3" },
      { type: "image", src: `${base}/pomegranate/photo_2026-02-15_20-01-20.jpg`, alt: "Гранат 4" },
      { type: "image", src: `${base}/pomegranate/photo_2026-02-15_20-01-21 (2).jpg`, alt: "Гранат 5" },
      { type: "image", src: `${base}/pomegranate/photo_2026-02-15_20-01-21.jpg`, alt: "Гранат 6" },
      { type: "image", src: `${base}/pomegranate/photo_2026-02-15_20-01-22.jpg`, alt: "Гранат 7" },
      { type: "image", src: `${base}/pomegranate/photo_2026-02-15_20-01-23.jpg`, alt: "Гранат 8" },
      { type: "video", src: `${base}/pomegranate/video_2026-02-15_20-01-28.mp4`, poster: `${base}/pomegranate/photo_2026-02-15_20-01-23.jpg` },
    ],
  },
  {
    id: "verse",
    slug: "verse",
    title: "Стих",
    description:
      "Текст и керамика в одном пространстве — ручная надпись на поверхности, эскизы к будущим сериям.",
    cover: `${base}/verse/photo_2026-02-15_19-59-10 (2).jpg`,
    media: [
      { type: "image", src: `${base}/verse/photo_2026-02-15_19-59-10 (2).jpg`, alt: "Стих 1" },
      { type: "image", src: `${base}/verse/photo_2026-02-15_19-59-10.jpg`, alt: "Стих 2" },
      { type: "image", src: `${base}/verse/photo_2026-02-15_19-59-11 (2).jpg`, alt: "Стих 3" },
      { type: "image", src: `${base}/verse/photo_2026-02-15_19-59-11.jpg`, alt: "Стих 4" },
      { type: "image", src: `${base}/verse/photo_2026-02-15_19-59-12.jpg`, alt: "Стих 5" },
    ],
  },
  {
    id: "yin-yang",
    slug: "yin-yang",
    title: "Инь и Ян",
    description:
      "Баланс контрастов: чёрное и белое, матовое и глянцевое. Серия с процессом в видео — от формы до финального обжига.",
    cover: `${base}/yin-yang/photo_2026-02-15_20-02-12.jpg`,
    media: [
      { type: "image", src: `${base}/yin-yang/photo_2026-02-15_20-02-12.jpg`, alt: "Инь и Ян 1" },
      { type: "image", src: `${base}/yin-yang/photo_2026-02-15_20-02-13.jpg`, alt: "Инь и Ян 2" },
      { type: "image", src: `${base}/yin-yang/photo_2026-02-15_20-02-14.jpg`, alt: "Инь и Ян 3" },
      { type: "image", src: `${base}/yin-yang/photo_2026-02-15_20-02-15 (2).jpg`, alt: "Инь и Ян 4" },
      { type: "image", src: `${base}/yin-yang/photo_2026-02-15_20-02-15.jpg`, alt: "Инь и Ян 5" },
      { type: "image", src: `${base}/yin-yang/photo_2026-02-15_20-02-16 (2).jpg`, alt: "Инь и Ян 6" },
      { type: "image", src: `${base}/yin-yang/photo_2026-02-15_20-02-16.jpg`, alt: "Инь и Ян 7" },
      { type: "image", src: `${base}/yin-yang/photo_2026-02-15_20-02-17.jpg`, alt: "Инь и Ян 8" },
      { type: "image", src: `${base}/yin-yang/photo_2026-02-15_20-02-18.jpg`, alt: "Инь и Ян 9" },
      { type: "video", src: `${base}/yin-yang/video_2026-02-15_20-02-18.mp4`, poster: `${base}/yin-yang/photo_2026-02-15_20-02-18.jpg` },
    ],
  },
];
