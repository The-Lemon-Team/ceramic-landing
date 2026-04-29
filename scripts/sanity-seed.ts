import "dotenv/config";

import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

import { products } from "@/data/products";
import { artsThemes, type ArtsMediaItem } from "@/data/artsThemes";
import { TELEGRAM_POSTS } from "@/data/telegram-posts";
import { VK_POSTS } from "@/data/vk-posts";
import { DIRECTIONS } from "@/data/directions";
import { ABOUT_AUTHOR } from "@/data/about-author";
import { NAV_ITEMS } from "@/data/nav";
import { HERO_CONFIG, HERO_TITLE } from "@/data/site";

type SanitySlug = { _type: "slug"; current: string };

function slug(current: string): SanitySlug {
  return { _type: "slug", current };
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeNdjson(filePath: string, docs: unknown[]) {
  const lines = docs.map((d) => JSON.stringify(d)).join("\n") + "\n";
  fs.writeFileSync(filePath, lines, "utf8");
}

const MASTER_CLASSES_TEXT =
  "Если вы в Петербурге — приходите в студию. Не просто купить\nкерамику, а сделать её своими руками под руководством Мастера.\nСопричастность, эмоции и память на всю жизнь.";

type Mode = "ndjson" | "api";

function parseArg(name: string): string | null {
  const arg = process.argv.slice(2).find((x) => x.startsWith(`--${name}=`));
  if (!arg) return null;
  return arg.slice(`--${name}=`.length);
}

function isImageExt(ext: string): boolean {
  const e = ext.toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(e);
}

function buildBasenameIndex(dir: string) {
  const index = new Map<string, string[]>();
  const stack = [dir];

  while (stack.length) {
    const current = stack.pop();
    if (!current) break;

    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
        continue;
      }
      const base = entry.name.toLowerCase();
      const arr = index.get(base) ?? [];
      arr.push(abs);
      index.set(base, arr);
    }
  }

  return index;
}

function resolvePublicFile(
  index: Map<string, string[]>,
  originalPathOrUrl: string,
): string | null {
  const base = path.basename(originalPathOrUrl).toLowerCase();
  const candidates = index.get(base);
  if (!candidates?.length) return null;
  return candidates[0] ?? null;
}

function makeSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset || !token) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

async function main() {
  const mode = (parseArg("mode") as Mode | null) ?? "ndjson";
  const outArg = parseArg("out");
  const outPath = outArg
    ? outArg
    : path.join(process.cwd(), "scripts", "sanity-seed.ndjson");

  const publicDir = path.join(process.cwd(), "public");
  const publicIndex = fs.existsSync(publicDir)
    ? buildBasenameIndex(publicDir)
    : new Map<string, string[]>();

  if (mode === "ndjson") {
    ensureDir(path.dirname(outPath));

    const docs: unknown[] = [];

    // Singletons
    docs.push({
      _id: "siteConfig",
      _type: "siteConfig",
      titleRu: HERO_TITLE.ru,
      titleEn: HERO_TITLE.en,
      heroSubTitle: HERO_CONFIG.subTitle,
      heroMotto: HERO_CONFIG.motto,
      heroCtaHref: HERO_CONFIG.ctaHref,
      heroCtaLabel: HERO_CONFIG.ctaLabel,
      masterClassesText: MASTER_CLASSES_TEXT,
      telegramUrl: "https://t.me/ceramic_loop",
      instagramUrl: "",
      vkUrl: "https://vk.ru/ceramic.loop",
    });

    docs.push({
      _id: "aboutAuthor",
      _type: "aboutAuthor",
      ...ABOUT_AUTHOR,
    });

    docs.push({
      _id: "directions",
      _type: "directions",
      ...DIRECTIONS,
    });

    // Collections
    for (const p of products) {
      docs.push({
        _id: `product.${p.id}`,
        _type: "product",
        title: p.title,
        slug: slug(p.id),
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        discountPercent: p.discountPercent ?? null,
        description: p.description,
        category: p.category,
        finish: p.finish,
        dimensions: p.dimensions,
        mainImage: p.mainImage,
        images: p.images,
        thumbnail: p.thumbnail,
      });
    }

    for (const t of artsThemes) {
      docs.push({
        _id: `artsTheme.${t.slug}`,
        _type: "artsTheme",
        title: t.title,
        slug: slug(t.slug),
        description: t.description,
        cover: t.cover,
        media: t.media.map((m: ArtsMediaItem) => ({
          type: m.type,
          src: m.src,
          ...(m.type === "image" ? { alt: m.alt ?? null } : {}),
          ...(m.type === "video" ? { poster: m.poster ?? null } : {}),
        })),
      });
    }

    for (const p of TELEGRAM_POSTS) {
      docs.push({
        _id: `telegramPost.${p.id}`,
        _type: "telegramPost",
        category: p.category,
        image: p.image ?? null,
        text: p.text,
        timestamp: p.timestamp,
        telegramUrl: p.telegramUrl ?? null,
      });
    }

    for (const p of VK_POSTS) {
      docs.push({
        _id: `vkPost.${p.sourceId}`,
        _type: "vkPost",
        sourceId: p.sourceId,
        ownerId: p.ownerId ?? null,
        communityName: p.communityName,
        communityAvatarUrl: p.communityAvatar ?? null,
        communityUrl: p.communityUrl,
        postUrl: p.postUrl,
        text: p.text,
        publishedAt: p.publishedAt,
        images: p.images.map((image) => ({
          _type: "vkPostImage",
          originalUrl: image.src,
          alt: image.alt ?? null,
        })),
        stats: p.stats ?? null,
        isVisible: true,
      });
    }

    NAV_ITEMS.forEach((n: { href: string; label: string }, idx: number) => {
      docs.push({
        _id: `navItem.${idx}`,
        _type: "navItem",
        href: n.href,
        label: n.label,
        sortOrder: idx,
      });
    });

    writeNdjson(outPath, docs);

    // eslint-disable-next-line no-console
    console.log(`Sanity seed written: ${outPath}`);
    // eslint-disable-next-line no-console
    console.log(`Documents: ${docs.length}`);
    return;
  }

  const client = makeSanityClient();
  if (!client) {
    throw new Error(
      "Missing env vars. Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN",
    );
  }

  const sanityClient = client;

  const uploadCache = new Map<string, string>();

  async function uploadAsset(absPath: string, kind: "image" | "file") {
    const cached = uploadCache.get(absPath);
    if (cached) return cached;

    const filename = path.basename(absPath);
    const stream = fs.createReadStream(absPath);
    const asset = await sanityClient.assets.upload(kind, stream, { filename });
    uploadCache.set(absPath, asset._id);
    return asset._id;
  }

  async function toImageField(original: string | null | undefined) {
    if (!original) return null;
    const resolved = resolvePublicFile(publicIndex, original);
    if (!resolved) return null;
    const ext = path.extname(resolved);
    if (!isImageExt(ext)) return null;
    const assetId = await uploadAsset(resolved, "image");
    return { _type: "image", asset: { _type: "reference", _ref: assetId } };
  }

  async function toFileField(original: string | null | undefined) {
    if (!original) return null;
    const resolved = resolvePublicFile(publicIndex, original);
    if (!resolved) return null;
    const assetId = await uploadAsset(resolved, "file");
    return { _type: "file", asset: { _type: "reference", _ref: assetId } };
  }

  const docs: any[] = [];

  docs.push({
    _id: "siteConfig",
    _type: "siteConfig",
    titleRu: HERO_TITLE.ru,
    titleEn: HERO_TITLE.en,
    heroSubTitle: HERO_CONFIG.subTitle,
    heroMotto: HERO_CONFIG.motto,
    heroCtaHref: HERO_CONFIG.ctaHref,
    heroCtaLabel: HERO_CONFIG.ctaLabel,
    masterClassesText: MASTER_CLASSES_TEXT,
  });

  docs.push({
    _id: "aboutAuthor",
    _type: "aboutAuthor",
    sectionTitle: ABOUT_AUTHOR.sectionTitle,
    sectionLabel: ABOUT_AUTHOR.sectionLabel,
    authorName: ABOUT_AUTHOR.authorName,
    bio: ABOUT_AUTHOR.bio,
    photo: await toImageField(ABOUT_AUTHOR.photo),
    photoAlt: ABOUT_AUTHOR.photoAlt,
    quote: ABOUT_AUTHOR.quote,
    closingText: ABOUT_AUTHOR.closingText,
    signature: ABOUT_AUTHOR.signature,
  });

  docs.push({
    _id: "directions",
    _type: "directions",
    ...DIRECTIONS,
  });

  for (const p of products) {
    const productImages = (
      await Promise.all(p.images.map((img) => toImageField(img)))
    ).filter(Boolean);

    docs.push({
      _id: `product.${p.id}`,
      _type: "product",
      title: p.title,
      slug: slug(p.id),
      price: p.price,
      originalPrice: p.originalPrice ?? null,
      discountPercent: p.discountPercent ?? null,
      description: p.description,
      category: p.category,
      finish: p.finish,
      dimensions: p.dimensions,
      mainImage: await toImageField(p.mainImage),
      images: productImages,
      thumbnail: await toImageField(p.thumbnail),
    });
  }

  for (const t of artsThemes) {
    const media = [] as any[];
    for (const m of t.media) {
      if (m.type === "image") {
        media.push({
          _type: "artsThemeImage",
          image: await toImageField(m.src),
          alt: m.alt ?? null,
        });
      } else {
        media.push({
          _type: "artsThemeVideo",
          video: await toFileField(m.src),
          poster: await toImageField(m.poster ?? null),
        });
      }
    }

    docs.push({
      _id: `artsTheme.${t.slug}`,
      _type: "artsTheme",
      title: t.title,
      slug: slug(t.slug),
      description: t.description,
      cover: await toImageField(t.cover),
      media,
    });
  }

  for (const p of TELEGRAM_POSTS) {
    docs.push({
      _id: `telegramPost.${p.id}`,
      _type: "telegramPost",
      category: p.category,
      image: await toImageField(p.image ?? null),
      text: p.text,
      timestamp: p.timestamp,
      telegramUrl: p.telegramUrl ?? null,
    });
  }

  for (const p of VK_POSTS) {
    docs.push({
      _id: `vkPost.${p.sourceId}`,
      _type: "vkPost",
      sourceId: p.sourceId,
      ownerId: p.ownerId ?? null,
      communityName: p.communityName,
      communityAvatar: await toImageField(p.communityAvatar ?? null),
      communityAvatarUrl: p.communityAvatar ?? null,
      communityUrl: p.communityUrl,
      postUrl: p.postUrl,
      text: p.text,
      publishedAt: p.publishedAt,
      images: (
        await Promise.all(
          p.images.map(async (image) => ({
            _type: "vkPostImage",
            image: await toImageField(image.src),
            originalUrl: image.src,
            alt: image.alt ?? null,
          })),
        )
      ).filter((image) => image.image || image.originalUrl),
      stats: p.stats ?? null,
      isVisible: true,
    });
  }

  NAV_ITEMS.forEach((n: { href: string; label: string }, idx: number) => {
    docs.push({
      _id: `navItem.${idx}`,
      _type: "navItem",
      href: n.href,
      label: n.label,
      sortOrder: idx,
    });
  });

  const tx = sanityClient.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();

  // eslint-disable-next-line no-console
  console.log("Sanity API seed complete");
  // eslint-disable-next-line no-console
  console.log(`Documents: ${docs.length}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
