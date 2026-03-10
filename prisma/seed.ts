import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "./index";

import { products as staticProducts } from "../data/products";
import { TELEGRAM_POSTS } from "../data/telegram-posts";
import { artsThemes } from "../data/artsThemes";
import { DIRECTIONS } from "../data/directions";
import { ABOUT_AUTHOR } from "../data/about-author";
import { NAV_ITEMS } from "../data/nav";
import { SITE_NAME, HERO_CONFIG } from "../data/site";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Missing ADMIN_EMAIL/ADMIN_PASSWORD in environment");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
      isActive: true,
    },
    create: {
      email,
      passwordHash,
      isActive: true,
    },
  });

  await prisma.siteConfig.upsert({
    where: { singletonKey: "site-config" },
    update: {
      siteName: SITE_NAME,
      heroSubTitle: HERO_CONFIG.subTitle,
      heroMotto: HERO_CONFIG.motto,
      heroCtaHref: HERO_CONFIG.ctaHref,
      heroCtaLabel: HERO_CONFIG.ctaLabel,
    },
    create: {
      singletonKey: "site-config",
      siteName: SITE_NAME,
      heroSubTitle: HERO_CONFIG.subTitle,
      heroMotto: HERO_CONFIG.motto,
      heroCtaHref: HERO_CONFIG.ctaHref,
      heroCtaLabel: HERO_CONFIG.ctaLabel,
    },
  });

  await prisma.aboutAuthor.upsert({
    where: { singletonKey: "about-author" },
    update: {
      sectionTitle: ABOUT_AUTHOR.sectionTitle,
      sectionLabel: ABOUT_AUTHOR.sectionLabel,
      authorName: ABOUT_AUTHOR.authorName,
      bio: ABOUT_AUTHOR.bio,
      photo: ABOUT_AUTHOR.photo,
      photoAlt: ABOUT_AUTHOR.photoAlt,
      quote: ABOUT_AUTHOR.quote,
      closingText: ABOUT_AUTHOR.closingText,
      signature: ABOUT_AUTHOR.signature,
    },
    create: {
      singletonKey: "about-author",
      sectionTitle: ABOUT_AUTHOR.sectionTitle,
      sectionLabel: ABOUT_AUTHOR.sectionLabel,
      authorName: ABOUT_AUTHOR.authorName,
      bio: ABOUT_AUTHOR.bio,
      photo: ABOUT_AUTHOR.photo,
      photoAlt: ABOUT_AUTHOR.photoAlt,
      quote: ABOUT_AUTHOR.quote,
      closingText: ABOUT_AUTHOR.closingText,
      signature: ABOUT_AUTHOR.signature,
    },
  });

  await prisma.directions.upsert({
    where: { singletonKey: "directions" },
    update: {
      title: DIRECTIONS.title,
      address: DIRECTIONS.address,
      mapUrl: DIRECTIONS.mapUrl,
      text: DIRECTIONS.text,
    },
    create: {
      singletonKey: "directions",
      title: DIRECTIONS.title,
      address: DIRECTIONS.address,
      mapUrl: DIRECTIONS.mapUrl,
      text: DIRECTIONS.text,
    },
  });

  await prisma.navItem.deleteMany({});
  await prisma.navItem.createMany({
    data: NAV_ITEMS.map((n: { href: string; label: string }, idx: number) => ({
      href: n.href,
      label: n.label,
      sortOrder: idx,
    })),
  });

  await prisma.telegramPost.deleteMany({});
  await prisma.telegramPost.createMany({
    data: TELEGRAM_POSTS.map(
      (p: {
        category: string;
        image?: string;
        text: string;
        timestamp: string;
        telegramUrl?: string;
      }) => ({
        category: p.category as never,
        image: p.image,
        text: p.text,
        timestamp: p.timestamp,
        telegramUrl: p.telegramUrl,
      }),
    ),
  });

  await prisma.artsThemeMediaItem.deleteMany({});
  await prisma.artsTheme.deleteMany({});
  for (const t of artsThemes) {
    const theme = await prisma.artsTheme.create({
      data: {
        title: t.title,
        slug: t.slug,
        description: t.description,
        cover: t.cover,
      },
    });

    await prisma.artsThemeMediaItem.createMany({
      data: t.media.map(
        (
          m:
            | { type: "image"; src: string; alt?: string }
            | { type: "video"; src: string; poster?: string },
          idx: number,
        ) => ({
          artsThemeId: theme.id,
          sortOrder: idx,
          type: m.type,
          src: m.src,
          alt: "alt" in m ? m.alt : null,
          poster: "poster" in m ? m.poster : null,
        }),
      ),
    });
  }

  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});

  for (const [idx, p] of staticProducts.entries()) {
    await (prisma.product as any).create({
      data: {
        title: p.title,
        slug: p.id,
        priceKopeks: Math.round(p.price * 100),
        originalPriceKopeks:
          p.originalPrice != null ? Math.round(p.originalPrice * 100) : null,
        discountPercent: p.discountPercent ?? null,
        sortOrder: idx,
        description: p.description,
        category: p.category,
        finish: p.finish,
        dimensions: p.dimensions,
        mainImage: p.mainImage,
        thumbnail: p.thumbnail,
        images: {
          create: (p.images ?? []).map((url: string, idx: number) => ({
            url,
            sortOrder: idx,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
