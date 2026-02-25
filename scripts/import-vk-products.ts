/**
 * Скрипт импорта товаров из VK Market в локальные данные.
 *
 * Использование:
 *   1. Создайте .env с VK_ACCESS_TOKEN и VK_GROUP_ID (или скопируйте из .env.example)
 *   2. npx tsx scripts/import-vk-products.ts
 *
 * Результат: обновляет data/products.ts и скачивает изображения в public/images/productsImages/
 */

import { readFileSync } from "fs";
import * as fs from "fs/promises";
import * as path from "path";

const VK_API_VERSION = "5.199";

type VKMarketItem = {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  price?: {
    amount: string;
    currency?: { name: string; title: string };
    text?: string;
  };
  thumb_photo?: string;
  photos?: Array<{
    id: number;
    sizes?: Array<{ type: string; url: string; width: number; height: number }>;
    photo_604?: string;
    photo_807?: string;
    photo_1280?: string;
    photo_2560?: string;
  }>;
};

type VKMarketResponse = {
  response?: {
    count: number;
    items: VKMarketItem[];
  };
  error?: { error_msg: string; error_code: number };
};

type Product = {
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
};

function loadEnv(): { token: string; groupId: string } {
  const envPath = path.join(process.cwd(), ".env");
  try {
    const content = readFileSync(envPath, "utf-8");
    const vars: Record<string, string> = {};
    for (const line of content.split("\n")) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) vars[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    }
    const token = vars.VK_ACCESS_TOKEN || process.env.VK_ACCESS_TOKEN || "";
    const groupId =
      vars.VK_GROUP_ID || process.env.VK_GROUP_ID || "235876916";
    return { token, groupId };
  } catch {
    return {
      token: process.env.VK_ACCESS_TOKEN || "",
      groupId: process.env.VK_GROUP_ID || "235876916",
    };
  }
}

function slugify(title: string, id: number): string {
  const cyrillic: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  let slug = title
    .toLowerCase()
    .split("")
    .map((c) => cyrillic[c] ?? (/\w/.test(c) ? c : "-"))
    .join("");
  slug = slug.replace(/-+/g, "-").replace(/^-|-$/g, "") || `vk-${id}`;
  return slug;
}

function getPhotoUrl(photo: VKMarketItem["photos"][0]): string | null {
  if (!photo) return null;
  if (photo.photo_2560) return photo.photo_2560;
  if (photo.photo_1280) return photo.photo_1280;
  if (photo.photo_807) return photo.photo_807;
  if (photo.photo_604) return photo.photo_604;
  if (photo.sizes?.length) {
    const bySize = ["w", "z", "y", "r", "q", "p", "o", "x", "m", "s"];
    for (const t of bySize) {
      const s = photo.sizes.find((x) => x.type === t);
      if (s?.url) return s.url;
    }
    return photo.sizes[photo.sizes.length - 1]?.url ?? null;
  }
  return null;
}

function getPhotoUrls(item: VKMarketItem): string[] {
  const urls: string[] = [];
  if (item.thumb_photo) urls.push(item.thumb_photo);
  if (item.photos?.length) {
    for (const p of item.photos) {
      const u = getPhotoUrl(p);
      if (u && !urls.includes(u)) urls.push(u);
    }
  }
  return urls.length ? urls : item.thumb_photo ? [item.thumb_photo] : [];
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  const dir = path.dirname(destPath);
  await fs.mkdir(dir, { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(destPath, buf);
}

async function fetchVKMarket(
  token: string,
  groupId: string
): Promise<VKMarketItem[]> {
  const ownerId = groupId.startsWith("-") ? groupId : `-${groupId}`;
  const url = `https://api.vk.com/method/market.get?owner_id=${ownerId}&extended=1&access_token=${token}&v=${VK_API_VERSION}`;
  const res = await fetch(url);
  const json: VKMarketResponse = await res.json();
  if (json.error) {
    throw new Error(`VK API: ${json.error.error_msg} (code ${json.error.error_code})`);
  }
  if (!json.response?.items) return [];
  return json.response.items;
}

async function main(): Promise<void> {
  const { token, groupId } = loadEnv();
  if (!token) {
    console.error("Ошибка: VK_ACCESS_TOKEN не задан. Добавьте его в .env");
    process.exit(1);
  }

  console.log("Загрузка товаров из VK Market...");
  const items = await fetchVKMarket(token, groupId);
  console.log(`Получено товаров: ${items.length}`);

  const publicDir = path.join(process.cwd(), "public", "images", "productsImages");
  await fs.mkdir(publicDir, { recursive: true });

  const products: Product[] = [];

  for (const item of items) {
    const slug = slugify(item.title, item.id);
    const priceAmount = item.price?.amount
      ? parseInt(item.price.amount, 10)
      : 0;
    const photoUrls = getPhotoUrls(item);

    const imagePaths: string[] = [];
    const ext = ".jpg";

    for (let i = 0; i < photoUrls.length; i++) {
      const fileName = `${slug}-${i}${ext}`;
      const destPath = path.join(publicDir, slug, fileName);
      try {
        await downloadImage(photoUrls[i], destPath);
        imagePaths.push(`/images/productsImages/${slug}/${fileName}`);
      } catch (e) {
        console.warn(`Не удалось скачать фото ${i + 1} для "${item.title}":`, e);
      }
    }

    const mainImage =
      imagePaths[0] ||
      (item.thumb_photo ? item.thumb_photo : "");

    products.push({
      id: slug,
      title: item.title,
      price: priceAmount,
      description: item.description || "",
      category: "ГАЛЕРЕЯ",
      finish: "—",
      dimensions: "—",
      mainImage,
      images: imagePaths.length ? imagePaths : mainImage ? [mainImage] : [],
      thumbnail: imagePaths[0] || mainImage,
    });
  }

  const productsTs = `import { Product } from "@/types/product";

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

  const dataPath = path.join(process.cwd(), "data", "products.ts");
  await fs.writeFile(dataPath, productsTs, "utf-8");
  console.log(`Готово: данные записаны в data/products.ts (${products.length} товаров)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
