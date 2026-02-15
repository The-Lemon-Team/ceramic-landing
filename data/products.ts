import { Product } from "@/types/product";

const gallery = (folder: string, files: string[]) =>
  files.map((file) => `/images/gallery/${folder}/${file}`);

export const products: Product[] = [
  {
    id: "plates",
    title: "Тарелки",
    price: 0,
    description:
      "Авторская керамика из студии. Ручная работа, ограниченная серия.",
    category: "ГАЛЕРЕЯ",
    finish: "—",
    dimensions: "—",
    mainImage: "/images/gallery/plates/photo_2026-02-15_17-36-29.jpg",
    images: gallery("plates", [
      "photo_2026-02-15_17-36-29.jpg",
      "photo_2026-02-15_17-36-31.jpg",
      "photo_2026-02-15_17-36-36.jpg",
    ]),
    thumbnail: "/images/gallery/plates/photo_2026-02-15_17-36-29.jpg",
  },
  {
    id: "plitka",
    title: "Плитка",
    price: 0,
    description:
      "Авторская керамика из студии. Ручная работа, ограниченная серия.",
    category: "ГАЛЕРЕЯ",
    finish: "—",
    dimensions: "—",
    mainImage: "/images/gallery/plitka/photo_2026-02-15_17-13-22.jpg",
    images: gallery("plitka", [
      "photo_2026-02-15_17-13-22.jpg",
      "photo_2026-02-15_17-32-13.jpg",
      "photo_2026-02-15_17-33-14.jpg",
      "photo_2026-02-15_17-33-30.jpg",
    ]),
    thumbnail: "/images/gallery/plitka/photo_2026-02-15_17-13-22.jpg",
  },
  {
    id: "pomegranate",
    title: "Гранат",
    price: 0,
    description:
      "Авторская керамика из студии. Ручная работа, ограниченная серия.",
    category: "ГАЛЕРЕЯ",
    finish: "—",
    dimensions: "—",
    mainImage: "/images/gallery/pomegranate/photo_2026-02-15_17-10-41.jpg",
    images: gallery("pomegranate", [
      "photo_2026-02-15_17-10-41.jpg",
      "photo_2026-02-15_17-10-42.jpg",
      "photo_2026-02-15_17-10-43.jpg",
      "photo_2026-02-15_17-29-38.jpg",
    ]),
    thumbnail: "/images/gallery/pomegranate/photo_2026-02-15_17-10-41.jpg",
  },
];
