import type { SanityClient } from "@sanity/client";
import { getSanityWriteClient } from "@/lib/sanityClient";
import { loadVkPostsForImport } from "@/lib/vkPostsSource";
import {
  VkPostImportImage,
  VkPostImportItem,
  VkPostSyncResult,
} from "@/types/vk-post";

function toDocumentId(sourceId: string) {
  return `vkPost.${sourceId.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
}

function toKey(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function withoutUndefined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined),
  );
}

function toImageField(assetId?: string) {
  if (!assetId) return undefined;

  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
  };
}

function getFilenameFromUrl(url: string, fallback: string) {
  try {
    const pathname = new URL(url).pathname;
    const filename = pathname.split("/").filter(Boolean).at(-1);

    return filename || fallback;
  } catch {
    return fallback;
  }
}

async function uploadImageAsset(
  client: SanityClient,
  url: string,
  fallbackFilename: string,
) {
  const response = await fetch(url);

  if (!response.ok) return undefined;

  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: getFilenameFromUrl(url, fallbackFilename),
    contentType: response.headers.get("content-type") ?? undefined,
  });

  return asset._id;
}

async function resolveAssetId(
  client: SanityClient,
  image: VkPostImportImage,
  fallbackFilename: string,
) {
  if (image.assetId) return image.assetId;
  if (!image.originalUrl) return undefined;

  return uploadImageAsset(client, image.originalUrl, fallbackFilename);
}

async function toPostImages(
  client: SanityClient,
  images: VkPostImportImage[] | undefined,
) {
  return Promise.all(
    (images ?? []).map(async (image, index) =>
      withoutUndefined({
        _key: image.id ? toKey(image.id) : `image-${index}`,
        _type: "vkPostImage",
        image: toImageField(
          await resolveAssetId(client, image, `vk-post-image-${index}.jpg`),
        ),
        originalUrl: image.originalUrl,
        alt: image.alt,
      }),
    ),
  );
}

async function toCommunityAvatar(
  client: SanityClient,
  post: VkPostImportItem,
) {
  const assetId =
    post.communityAvatarAssetId ||
    (post.communityAvatarUrl
      ? await uploadImageAsset(client, post.communityAvatarUrl, "vk-avatar.jpg")
      : undefined);

  return toImageField(assetId);
}

function isImportablePost(post: VkPostImportItem) {
  return Boolean(
    post.sourceId &&
      post.communityName &&
      post.communityUrl &&
      post.postUrl &&
      post.text &&
      post.publishedAt,
  );
}

function formatError(error: unknown) {
  return error instanceof Error ? error.message : "Unknown VK sync error.";
}

export async function syncVkPosts(): Promise<VkPostSyncResult> {
  const client = getSanityWriteClient();

  if (!client) {
    return {
      ok: false,
      imported: 0,
      skipped: 0,
      message:
        "Sanity write client is not configured. Check NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN.",
    };
  }

  let posts: VkPostImportItem[];

  try {
    posts = await loadVkPostsForImport();
  } catch (error) {
    return {
      ok: false,
      imported: 0,
      skipped: 0,
      message: formatError(error),
    };
  }

  let imported = 0;
  let skipped = 0;

  for (const post of posts) {
    if (!isImportablePost(post)) {
      skipped += 1;
      continue;
    }

    const id = toDocumentId(post.sourceId);
    const now = new Date().toISOString();
    const [communityAvatar, images] = await Promise.all([
      toCommunityAvatar(client, post),
      toPostImages(client, post.images),
    ]);

    await client.createIfNotExists({
      _id: id,
      _type: "vkPost",
      sourceId: post.sourceId,
      isVisible: true,
    });

    await client
      .patch(id)
      .set(
        withoutUndefined({
          sourceId: post.sourceId,
          ownerId: post.ownerId,
          communityName: post.communityName,
          communityAvatar,
          communityAvatarUrl: post.communityAvatarUrl,
          communityUrl: post.communityUrl,
          postUrl: post.postUrl,
          text: post.text,
          publishedAt: post.publishedAt,
          images,
          stats: post.stats,
          importedAt: now,
          rawJson: post.rawJson,
        }),
      )
      .setIfMissing({ isVisible: true })
      .commit();

    imported += 1;
  }

  return {
    ok: true,
    imported,
    skipped,
    message: posts.length === 0 ? "VK returned no posts." : "VK posts synced.",
  };
}
