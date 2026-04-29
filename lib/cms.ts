import { products as staticProducts } from "@/data/products";
import { artsThemes as staticArtsThemes } from "@/data/artsThemes";
import { TELEGRAM_POSTS } from "@/data/telegram-posts";
import { VK_POSTS } from "@/data/vk-posts";
import { DIRECTIONS } from "@/data/directions";
import { HERO_CONFIG, HERO_TITLE } from "@/data/site";
import { NAV_ITEMS } from "@/data/nav";
import { ABOUT_AUTHOR } from "@/data/about-author";
import { getSanityClient } from "@/lib/sanityClient";
import { VkPost } from "@/types/vk-post";
import groq from "groq";

function fallbackToStatic<T>(cmsData: T | null, staticData: T): T {
  return cmsData ?? staticData;
}

function formatVkTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  })
    .format(date)
    .replace(".", "");
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

export async function getVkPosts(): Promise<VkPost[]> {
  const data = await sanityFetch<
    Array<{
      _id: string;
      sourceId?: string;
      ownerId?: string;
      communityName?: string;
      communityAvatar?: string;
      communityUrl?: string;
      postUrl?: string;
      text?: string;
      publishedAt?: string;
      images?: Array<{
        _key?: string;
        src?: string;
        alt?: string;
      }>;
      stats?: {
        likes?: number;
        comments?: number;
        reposts?: number;
        views?: number;
      };
    }>
  >(
    groq`*[_type == "vkPost" && coalesce(isVisible, true) == true] | order(publishedAt desc) {
      _id,
      sourceId,
      ownerId,
      communityName,
      "communityAvatar": communityAvatar.asset->url,
      communityUrl,
      postUrl,
      text,
      publishedAt,
      "images": images[]{
        _key,
        "src": image.asset->url,
        alt
      },
      stats
    }`,
  );

  if (!data || data.length === 0) return fallbackToStatic(null, VK_POSTS);

  return data
    .map((p) => {
      const publishedAt = p.publishedAt ?? "";

      return {
        id: p._id,
        sourceId: p.sourceId ?? p._id,
        ownerId: p.ownerId ?? undefined,
        communityName: p.communityName ?? "Ceramic Loop",
        communityAvatar: p.communityAvatar ?? undefined,
        communityUrl: p.communityUrl ?? "https://vk.ru/ceramic.loop",
        postUrl: p.postUrl ?? "https://vk.ru/ceramic.loop",
        text: p.text ?? "",
        publishedAt,
        timestamp: formatVkTimestamp(publishedAt),
        images: (p.images ?? [])
          .map((image, index) => ({
            id: image._key ?? `${p._id}-image-${index}`,
            src: image.src ?? "",
            alt: image.alt ?? p.text ?? "",
          }))
          .filter((image) => Boolean(image.src)),
        stats: p.stats,
      };
    })
    .filter((p) => Boolean(p.sourceId) && Boolean(p.text));
}

export async function getDirections() {
  const d = await sanityFetch<{
    title?: string;
    address?: string;
    mapUrl?: string;
    hint?: string;
    parking?: string;
    yandexMapsUrl?: string;
    googleMapsUrl?: string;
  }>(
    groq`*[_type == "directions"][0] {
      title,
      address,
      mapUrl,
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
    titleRu?: string;
    titleEn?: string;
    heroSubTitle?: string;
    heroMotto?: string;
    heroCtaHref?: string;
    heroCtaLabel?: string;
    masterClassesText?: string;
    telegramUrl?: string;
    instagramUrl?: string;
    vkUrl?: string;
  }>(
    groq`*[_type == "siteConfig"][0] {
      titleRu,
      titleEn,
      heroSubTitle,
      heroMotto,
      heroCtaHref,
      heroCtaLabel,
      masterClassesText,
      telegramUrl,
      instagramUrl,
      vkUrl
    }`,
  );

  if (!d)
    return fallbackToStatic(null, {
      titleRu: HERO_TITLE.ru,
      titleEn: HERO_TITLE.en,
      heroSubTitle: HERO_CONFIG.subTitle,
      heroMotto: HERO_CONFIG.motto,
      heroCtaHref: HERO_CONFIG.ctaHref,
      heroCtaLabel: HERO_CONFIG.ctaLabel,
      masterClassesText:
        "Если вы в Петербурге — приходите в студию. Не просто купить\nкерамику, а сделать её своими руками под руководством Мастера.\nСопричастность, эмоции и память на всю жизнь.",
      telegramUrl: "https://t.me/ceramic_loop",
      instagramUrl: "",
      vkUrl: "https://vk.ru/ceramic.loop",
    });

  return {
    titleRu: d.titleRu || HERO_TITLE.ru,
    titleEn: d.titleEn || HERO_TITLE.en,
    heroSubTitle: d.heroSubTitle || "Керамика Санкт-Петербурга",
    heroMotto:
      d.heroMotto ||
      "Керамические изделия, созданные с душой и теплом в нашей студии.",
    heroCtaHref: d.heroCtaHref || "#studio",
    heroCtaLabel: d.heroCtaLabel || "Просмотреть коллекцию",
    masterClassesText:
      d.masterClassesText ||
      "Если вы в Петербурге — приходите в студию. Не просто купить\nкерамику, а сделать её своими руками под руководством Мастера.\nСопричастность, эмоции и память на всю жизнь.",
    telegramUrl: d.telegramUrl || "https://t.me/ceramic_loop",
    instagramUrl: d.instagramUrl || "",
    vkUrl: d.vkUrl || "https://vk.ru/ceramic.loop",
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

export type StudioGalleryPhoto = {
  src: string;
  alt: string;
};

export type StudioSectionData = {
  title?: string;
  description?: string;
  gallery: StudioGalleryPhoto[];
};

export async function getStudioSection(): Promise<StudioSectionData | null> {
  const d = await sanityFetch<{
    title?: string;
    description?: string;
    gallery?: Array<{ src?: string; alt?: string }>;
  }>(
    groq`*[_type == "studioSection" && _id == "studioSection"][0] {
      title,
      description,
      "gallery": gallery[]{
        "src": asset->url,
        "alt": coalesce(alt, "")
      }
    }`,
  );

  if (!d) return null;

  const gallery = Array.isArray(d.gallery)
    ? d.gallery
        .map((p) => ({ src: p.src ?? "", alt: p.alt ?? "" }))
        .filter((p) => Boolean(p.src))
    : [];

  return {
    title: d.title ?? undefined,
    description: d.description ?? undefined,
    gallery,
  };
}
