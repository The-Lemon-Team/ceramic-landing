import { products as staticProducts } from "@/data/products";
import { artsThemes as staticArtsThemes } from "@/data/artsThemes";
import { TELEGRAM_POSTS } from "@/data/telegram-posts";
import { DIRECTIONS } from "@/data/directions";
import { SITE_NAME, HERO_CONFIG } from "@/data/site";
import { NAV_ITEMS } from "@/data/nav";
import { ABOUT_AUTHOR } from "@/data/about-author";
import { getSanityClient } from "@/lib/sanityClient";
import groq from "groq";

/** Возвращает статические данные, если запрос к Strapi не удался */
function fallbackToStatic<T>(cmsData: T | null, staticData: T): T {
  return cmsData ?? staticData;
}

async function sanityFetch<T>(query: string, params?: Record<string, unknown>) {
  const client = getSanityClient();
  if (!client) return null;
  try {
    return (await client.fetch(query, params)) as T;
  } catch {
    return null;
  }
}

export async function getProducts(): Promise<
  Array<{
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    description: string;
    category: string;
    finish: string;
    dimensions: string;
    mainImage: string;
    images: string[];
    thumbnail: string;
  }>
> {
  const data = await sanityFetch<
    Array<{
      title?: string;
      slug?: { current?: string } | string;
      price?: number;
      originalPrice?: number;
      discountPercent?: number;
      description?: string;
      category?: string;
      finish?: string;
      dimensions?: string;
      mainImage?: string;
      thumbnail?: string;
      images?: string[];
    }>
  >(
    groq`*[_type == "product"] | order(coalesce(sortOrder, 0) asc, _updatedAt desc) {
      title,
      slug,
      price,
      originalPrice,
      discountPercent,
      description,
      category,
      finish,
      dimensions,
      mainImage,
      thumbnail,
      images
    }`,
  );

  if (!data || data.length === 0) return fallbackToStatic(null, staticProducts);

  return data
    .map((p) => {
      const slug =
        typeof p.slug === "string" ? p.slug : (p.slug?.current ?? "");
      const images = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
      const mainImage = p.mainImage || images[0] || "";
      const thumbnail = p.thumbnail || p.mainImage || images[0] || "";

      return {
        id: slug,
        title: p.title ?? "",
        price: Number(p.price ?? 0),
        originalPrice:
          p.originalPrice != null ? Number(p.originalPrice) : undefined,
        discountPercent: p.discountPercent ?? undefined,
        description: p.description ?? "",
        category: p.category ?? "",
        finish: p.finish ?? "",
        dimensions: p.dimensions ?? "",
        mainImage,
        images: images.length > 0 ? images : mainImage ? [mainImage] : [],
        thumbnail,
      };
    })
    .filter((p) => Boolean(p.id));
}

export type ArtsMediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export async function getArtsThemes() {
  const data = await sanityFetch<
    Array<{
      title?: string;
      slug?: { current?: string } | string;
      description?: string;
      cover?: string;
      media?: Array<{
        type?: "image" | "video";
        src?: string;
        alt?: string;
        poster?: string;
      }>;
    }>
  >(
    groq`*[_type == "artsTheme"] | order(_updatedAt desc) {
      title,
      slug,
      description,
      cover,
      media
    }`,
  );

  if (!data || data.length === 0)
    return fallbackToStatic(null, staticArtsThemes);

  return data
    .map((a) => {
      const slug =
        typeof a.slug === "string" ? a.slug : (a.slug?.current ?? "");
      return {
        id: slug,
        slug,
        title: a.title ?? "",
        description: a.description ?? "",
        cover: a.cover ?? "",
        media: (a.media ?? [])
          .map((m) => {
            if (m.type === "video") {
              return {
                type: "video" as const,
                src: m.src ?? "",
                poster: m.poster ?? undefined,
              } as ArtsMediaItem;
            }
            return {
              type: "image" as const,
              src: m.src ?? "",
              alt: m.alt ?? undefined,
            } as ArtsMediaItem;
          })
          .filter((m) => Boolean(m.src)),
      };
    })
    .filter((a) => Boolean(a.id));
}

export async function getTelegramPosts() {
  const data = await sanityFetch<
    Array<{
      _id: string;
      category?: "Update" | "Workshop" | "Process" | "Announcement";
      image?: string;
      text?: string;
      timestamp?: string;
      telegramUrl?: string;
    }>
  >(
    groq`*[_type == "telegramPost"] | order(_createdAt desc) {
      _id,
      category,
      image,
      text,
      timestamp,
      telegramUrl
    }`,
  );

  if (!data || data.length === 0) return fallbackToStatic(null, TELEGRAM_POSTS);

  return data.map((p) => ({
    id: p._id,
    category: (p.category ?? "Update") as
      | "Update"
      | "Workshop"
      | "Process"
      | "Announcement",
    image: p.image ?? undefined,
    text: p.text ?? "",
    timestamp: p.timestamp ?? "",
    telegramUrl: p.telegramUrl ?? undefined,
  }));
}

export async function getDirections() {
  const d = await sanityFetch<{
    title?: string;
    address?: string;
    mapUrl?: string;
    text?: string;
    hint?: string;
    parking?: string;
    yandexMapsUrl?: string;
    googleMapsUrl?: string;
  }>(
    groq`*[_type == "directions"][0] {
      title,
      address,
      mapUrl,
      text,
      hint,
      parking,
      yandexMapsUrl,
      googleMapsUrl
    }`,
  );

  if (!d) return fallbackToStatic(null, DIRECTIONS);

  const fallback = DIRECTIONS as Record<string, unknown>;
  return {
    title: d.title || "Как добраться",
    address: d.address || "",
    mapUrl: d.mapUrl || "",
    text: d.text || "",
    hint: (d.hint as string) || (fallback?.hint as string) || "",
    parking: (d.parking as string) || (fallback?.parking as string) || "",
    yandexMapsUrl:
      (d.yandexMapsUrl as string) || (fallback?.yandexMapsUrl as string) || "",
    googleMapsUrl:
      (d.googleMapsUrl as string) || (fallback?.googleMapsUrl as string) || "",
  };
}

export async function getSiteConfig() {
  const d = await sanityFetch<{
    siteName?: string;
    heroSubTitle?: string;
    heroMotto?: string;
    heroCtaHref?: string;
    heroCtaLabel?: string;
    masterClassesText?: string;
  }>(
    groq`*[_type == "siteConfig"][0] {
      siteName,
      heroSubTitle,
      heroMotto,
      heroCtaHref,
      heroCtaLabel,
      masterClassesText
    }`,
  );

  if (!d)
    return fallbackToStatic(null, {
      siteName: SITE_NAME,
      heroSubTitle: HERO_CONFIG.subTitle,
      heroMotto: HERO_CONFIG.motto,
      heroCtaHref: HERO_CONFIG.ctaHref,
      heroCtaLabel: HERO_CONFIG.ctaLabel,
      masterClassesText:
        "Если вы в Петербурге — приходите в студию. Не просто купить\nкерамику, а сделать её своими руками под руководством Мастера.\nСопричастность, эмоции и память на всю жизнь.",
    });

  return {
    siteName: d.siteName || "Ceramic•Loop",
    heroSubTitle: d.heroSubTitle || "Керамика Санкт-Петербурга",
    heroMotto:
      d.heroMotto ||
      "Керамические изделия, созданные с душой и теплом в нашей студии.",
    heroCtaHref: d.heroCtaHref || "#studio",
    heroCtaLabel: d.heroCtaLabel || "Просмотреть коллекцию",
    masterClassesText:
      d.masterClassesText ||
      "Если вы в Петербурге — приходите в студию. Не просто купить\nкерамику, а сделать её своими руками под руководством Мастера.\nСопричастность, эмоции и память на всю жизнь.",
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
  const d = await sanityFetch<Partial<AboutAuthorData>>(
    groq`*[_type == "aboutAuthor"][0] {
      sectionTitle,
      sectionLabel,
      authorName,
      bio,
      photo,
      photoAlt,
      quote,
      closingText,
      signature
    }`,
  );

  if (!d) return fallbackToStatic(null, { ...ABOUT_AUTHOR });

  return {
    sectionTitle: d.sectionTitle || ABOUT_AUTHOR.sectionTitle,
    sectionLabel: d.sectionLabel || ABOUT_AUTHOR.sectionLabel,
    authorName: d.authorName || ABOUT_AUTHOR.authorName,
    bio: d.bio || ABOUT_AUTHOR.bio,
    photo: d.photo || ABOUT_AUTHOR.photo,
    photoAlt: d.photoAlt || ABOUT_AUTHOR.photoAlt,
    quote: d.quote || ABOUT_AUTHOR.quote,
    closingText: d.closingText || ABOUT_AUTHOR.closingText,
    signature: d.signature || ABOUT_AUTHOR.signature,
  };
}

export async function getNavItems() {
  const staticNav = NAV_ITEMS.map((n) => ({ href: n.href, label: n.label }));
  const data = await sanityFetch<Array<{ href?: string; label?: string }>>(
    groq`*[_type == "navItem"] | order(coalesce(sortOrder, 0) asc) {
      href,
      label
    }`,
  );

  if (!data || data.length === 0) return fallbackToStatic(null, staticNav);
  return data
    .map((n) => ({ href: n.href ?? "", label: n.label ?? "" }))
    .filter((n) => Boolean(n.href) && Boolean(n.label));
}
