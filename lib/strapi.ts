import { products as staticProducts } from "@/data/products";
import { artsThemes as staticArtsThemes } from "@/data/artsThemes";
import { TELEGRAM_POSTS } from "@/data/telegram-posts";
import { DIRECTIONS } from "@/data/directions";
import { SITE_NAME, HERO_CONFIG } from "@/data/site";
import { NAV_ITEMS } from "@/data/nav";
import { ABOUT_AUTHOR } from "@/data/about-author";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export type StrapiResponse<T> = {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

async function fetchApi<T>(
  path: string,
  options?: RequestInit
): Promise<StrapiResponse<T> | null> {
  const url = `${STRAPI_URL}/api${path}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/** Возвращает статические данные, если запрос к Strapi не удался */
function fallbackToStatic<T>(cmsData: T | null, staticData: T): T {
  return cmsData ?? staticData;
}

export async function getProducts(): Promise<
  Array<{
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    finish: string;
    dimensions: string;
    mainImage: string;
    images: string[];
    thumbnail: string;
  }>
> {
  const res = await fetchApi<
    Array<{
      documentId: string;
      slug: string;
      title: string;
      price: number;
      description: string;
      category: string;
      finish: string;
      dimensions: string;
      mainImage: string;
      images: string[];
      thumbnail: string;
    }>
  >("/products");
  if (!res?.data) return fallbackToStatic(null, staticProducts);
  const data = Array.isArray(res.data) ? res.data : [res.data];
  if (data.length === 0) return staticProducts;
  return data.map((p) => {
    const images =
      Array.isArray(p.images) && p.images.length > 0
        ? p.images
        : p.mainImage
        ? [p.mainImage]
        : [];
    return {
      id: p.slug,
      title: p.title,
      price: Number(p.price),
      description: p.description,
      category: p.category,
      finish: p.finish,
      dimensions: p.dimensions,
      mainImage: p.mainImage || images[0] || "",
      images,
      thumbnail: p.thumbnail || p.mainImage || images[0] || "",
    };
  });
}

export type ArtsMediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export async function getArtsThemes() {
  const res = await fetchApi<
    Array<{
      documentId: string;
      slug: string;
      title: string;
      description: string;
      cover: string;
      media: Array<{
        type: string;
        src: string;
        alt?: string;
        poster?: string;
      }>;
    }>
  >("/arts-themes?populate=*");
  if (!res?.data) return fallbackToStatic(null, staticArtsThemes);
  const data = Array.isArray(res.data) ? res.data : [res.data];
  if (data.length === 0) return staticArtsThemes;
  return data.map((a) => ({
    id: a.slug,
    slug: a.slug,
    title: a.title,
    description: a.description,
    cover: a.cover,
    media: (a.media || []).map((m) =>
      m.type === "video"
        ? ({
            type: "video" as const,
            src: m.src,
            poster: m.poster,
          } as ArtsMediaItem)
        : ({ type: "image" as const, src: m.src, alt: m.alt } as ArtsMediaItem)
    ),
  }));
}

export async function getTelegramPosts() {
  const res = await fetchApi<
    Array<{
      documentId: string;
      category: string;
      image?: string;
      text: string;
      timestamp: string;
      telegramUrl?: string;
    }>
  >("/telegram-posts");
  if (!res?.data) return fallbackToStatic(null, TELEGRAM_POSTS);
  const data = Array.isArray(res.data) ? res.data : [res.data];
  if (data.length === 0) return TELEGRAM_POSTS;
  return data.map((p) => ({
    id: p.documentId,
    category: p.category as "Update" | "Workshop" | "Process" | "Announcement",
    image: p.image,
    text: p.text,
    timestamp: p.timestamp,
    telegramUrl: p.telegramUrl,
  }));
}

export async function getDirections() {
  const res = await fetchApi<{
    title: string;
    address: string;
    mapUrl: string;
    text: string;
  }>("/directions");
  if (!res?.data) return fallbackToStatic(null, DIRECTIONS);
  const d = res.data as Record<string, unknown>;
  return {
    title: (d?.title as string) || "Как добраться",
    address: (d?.address as string) || "",
    mapUrl: (d?.mapUrl as string) || "",
    text: (d?.text as string) || "",
  };
}

export async function getSiteConfig() {
  const res = await fetchApi<{
    siteName: string;
    heroSubTitle: string;
    heroMotto: string;
    heroCtaHref: string;
    heroCtaLabel: string;
  }>("/site-config");
  if (!res?.data)
    return fallbackToStatic(null, {
      siteName: SITE_NAME,
      heroSubTitle: HERO_CONFIG.subTitle,
      heroMotto: HERO_CONFIG.motto,
      heroCtaHref: HERO_CONFIG.ctaHref,
      heroCtaLabel: HERO_CONFIG.ctaLabel,
    });
  const d = res.data as Record<string, unknown>;
  return {
    siteName: (d?.siteName as string) || "Ceramic•Loop",
    heroSubTitle: (d?.heroSubTitle as string) || "Керамика Санкт-Петербурга",
    heroMotto:
      (d?.heroMotto as string) ||
      "Керамические изделия, созданные с душой и теплом в нашей студии.",
    heroCtaHref: (d?.heroCtaHref as string) || "#studio",
    heroCtaLabel: (d?.heroCtaLabel as string) || "Просмотреть коллекцию",
  };
}

export type AboutAuthorData = {
  sectionTitle: string;
  sectionLabel: string;
  authorName: string;
  bio: string;
  photo: string;
  photoAlt: string;
  quote: string;
  closingText: string;
  signature: string;
};

export async function getAboutAuthor(): Promise<AboutAuthorData> {
  const res = await fetchApi<{
    sectionTitle?: string;
    sectionLabel?: string;
    authorName?: string;
    bio?: string;
    photo?: string;
    photoAlt?: string;
    quote?: string;
    closingText?: string;
    signature?: string;
  }>("/about-author");
  if (!res?.data) return fallbackToStatic(null, { ...ABOUT_AUTHOR });
  const d = res.data as Record<string, unknown>;
  return {
    sectionTitle: (d?.sectionTitle as string) || ABOUT_AUTHOR.sectionTitle,
    sectionLabel: (d?.sectionLabel as string) || ABOUT_AUTHOR.sectionLabel,
    authorName: (d?.authorName as string) || ABOUT_AUTHOR.authorName,
    bio: (d?.bio as string) || ABOUT_AUTHOR.bio,
    photo: (d?.photo as string) || ABOUT_AUTHOR.photo,
    photoAlt: (d?.photoAlt as string) || ABOUT_AUTHOR.photoAlt,
    quote: (d?.quote as string) || ABOUT_AUTHOR.quote,
    closingText: (d?.closingText as string) || ABOUT_AUTHOR.closingText,
    signature: (d?.signature as string) || ABOUT_AUTHOR.signature,
  };
}

export async function getNavItems() {
  const res = await fetchApi<
    Array<{
      href: string;
      label: string;
      sortOrder?: number;
    }>
  >("/nav-items?sort[0]=sortOrder:asc");
  const staticNav = NAV_ITEMS.map((n) => ({ href: n.href, label: n.label }));
  if (!res?.data) return fallbackToStatic(null, staticNav);
  const data = Array.isArray(res.data) ? res.data : [res.data];
  if (data.length === 0) return staticNav;
  return data.map((n) => ({ href: n.href, label: n.label }));
}
