import { products as staticProducts } from "@/data/products";
import { artsThemes as staticArtsThemes } from "@/data/artsThemes";
import { TELEGRAM_POSTS } from "@/data/telegram-posts";
import { DIRECTIONS } from "@/data/directions";
import { SITE_NAME, HERO_CONFIG } from "@/data/site";
import { NAV_ITEMS } from "@/data/nav";
import { ABOUT_AUTHOR } from "@/data/about-author";
import { prisma } from "@/prisma";

/** Возвращает статические данные, если запрос к Strapi не удался */
function fallbackToStatic<T>(cmsData: T | null, staticData: T): T {
  return cmsData ?? staticData;
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
  try {
    const data = (await (prisma.product as any).findMany({
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    })) as any[];

    if (data.length === 0) return staticProducts;

    return data.map((p) => {
      const imagesFromRelation = (p.images ?? []).map((i: any) => i.url);
      const images =
        imagesFromRelation.length > 0
          ? imagesFromRelation
          : p.mainImage
            ? [p.mainImage]
            : [];

      return {
        id: p.slug,
        title: p.title,
        price: Number(p.priceKopeks) / 100,
        originalPrice:
          p.originalPriceKopeks != null
            ? Number(p.originalPriceKopeks) / 100
            : undefined,
        discountPercent: p.discountPercent ?? undefined,
        description: p.description,
        category: p.category,
        finish: p.finish,
        dimensions: p.dimensions,
        mainImage: p.mainImage || images[0] || "",
        images,
        thumbnail: p.thumbnail || p.mainImage || images[0] || "",
      };
    });
  } catch {
    return fallbackToStatic(null, staticProducts);
  }
}

export type ArtsMediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export async function getArtsThemes() {
  try {
    const data = await prisma.artsTheme.findMany({
      include: {
        media: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

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
              poster: m.poster ?? undefined,
            } as ArtsMediaItem)
          : ({
              type: "image" as const,
              src: m.src,
              alt: m.alt ?? undefined,
            } as ArtsMediaItem),
      ),
    }));
  } catch {
    return fallbackToStatic(null, staticArtsThemes);
  }
}

export async function getTelegramPosts() {
  try {
    const data = await prisma.telegramPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (data.length === 0) return TELEGRAM_POSTS;

    return data.map((p) => ({
      id: p.id,
      category: p.category as
        | "Update"
        | "Workshop"
        | "Process"
        | "Announcement",
      image: p.image ?? undefined,
      text: p.text,
      timestamp: p.timestamp,
      telegramUrl: p.telegramUrl ?? undefined,
    }));
  } catch {
    return fallbackToStatic(null, TELEGRAM_POSTS);
  }
}

export async function getDirections() {
  try {
    const d = await prisma.directions.findUnique({
      where: {
        singletonKey: "directions",
      },
    });

    if (!d) return fallbackToStatic(null, DIRECTIONS);

    const fallback = DIRECTIONS as Record<string, unknown>;

    return {
      title: d.title || "Как добраться",
      address: d.address || "",
      mapUrl: d.mapUrl || "",
      text: d.text || "",
      hint: (fallback?.hint as string) || "",
      parking: (fallback?.parking as string) || "",
      yandexMapsUrl: (fallback?.yandexMapsUrl as string) || "",
      googleMapsUrl: (fallback?.googleMapsUrl as string) || "",
    };
  } catch {
    return fallbackToStatic(null, DIRECTIONS);
  }
}

export async function getSiteConfig() {
  try {
    const d = await prisma.siteConfig.findUnique({
      where: {
        singletonKey: "site-config",
      },
    });

    if (!d)
      return fallbackToStatic(null, {
        siteName: SITE_NAME,
        heroSubTitle: HERO_CONFIG.subTitle,
        heroMotto: HERO_CONFIG.motto,
        heroCtaHref: HERO_CONFIG.ctaHref,
        heroCtaLabel: HERO_CONFIG.ctaLabel,
      });

    return {
      siteName: d.siteName || "Ceramic•Loop",
      heroSubTitle: d.heroSubTitle || "Керамика Санкт-Петербурга",
      heroMotto:
        d.heroMotto ||
        "Керамические изделия, созданные с душой и теплом в нашей студии.",
      heroCtaHref: d.heroCtaHref || "#studio",
      heroCtaLabel: d.heroCtaLabel || "Просмотреть коллекцию",
    };
  } catch {
    return fallbackToStatic(null, {
      siteName: SITE_NAME,
      heroSubTitle: HERO_CONFIG.subTitle,
      heroMotto: HERO_CONFIG.motto,
      heroCtaHref: HERO_CONFIG.ctaHref,
      heroCtaLabel: HERO_CONFIG.ctaLabel,
    });
  }
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
  try {
    const d = await prisma.aboutAuthor.findUnique({
      where: {
        singletonKey: "about-author",
      },
    });

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
  } catch {
    return fallbackToStatic(null, { ...ABOUT_AUTHOR });
  }
}

export async function getNavItems() {
  const staticNav = NAV_ITEMS.map((n) => ({ href: n.href, label: n.label }));
  try {
    const data = await prisma.navItem.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    if (data.length === 0) return staticNav;
    return data.map((n) => ({ href: n.href, label: n.label }));
  } catch {
    return fallbackToStatic(null, staticNav);
  }
}
