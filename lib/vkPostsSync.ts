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

function toPostImages(images: VkPostImportImage[] | undefined) {
  return (images ?? []).map((image, index) =>
    withoutUndefined({
      _key: image.id ? toKey(image.id) : `image-${index}`,
      _type: "vkPostImage",
      image: toImageField(image.assetId),
      originalUrl: image.originalUrl,
      alt: image.alt,
    }),
  );
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

  const posts = await loadVkPostsForImport();
  let imported = 0;
  let skipped = 0;

  for (const post of posts) {
    if (!isImportablePost(post)) {
      skipped += 1;
      continue;
    }

    const id = toDocumentId(post.sourceId);
    const now = new Date().toISOString();

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
          communityAvatar: toImageField(post.communityAvatarAssetId),
          communityAvatarUrl: post.communityAvatarUrl,
          communityUrl: post.communityUrl,
          postUrl: post.postUrl,
          text: post.text,
          publishedAt: post.publishedAt,
          images: toPostImages(post.images),
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
    message:
      posts.length === 0
        ? "VK loader returned no posts. Add the real loader in lib/vkPostsSource.ts."
        : "VK posts synced.",
  };
}
