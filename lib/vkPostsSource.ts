import { VkPostImportImage, VkPostImportItem } from "@/types/vk-post";

interface VkApiError {
  error_code: number;
  error_msg: string;
}

interface VkApiResponse<T> {
  response?: T;
  error?: VkApiError;
}

interface VkWallGetResponse {
  items: VkWallPost[];
}

interface VkWallPost {
  id: number;
  owner_id: number;
  from_id?: number;
  date: number;
  text?: string;
  attachments?: VkAttachment[];
  comments?: { count?: number };
  likes?: { count?: number };
  reposts?: { count?: number };
  views?: { count?: number };
}

interface VkAttachment {
  type: string;
  photo?: {
    id: number;
    owner_id: number;
    access_key?: string;
    sizes?: VkPhotoSize[];
    text?: string;
  };
}

interface VkPhotoSize {
  url: string;
  width?: number;
  height?: number;
}

const VK_API_URL = "https://api.vk.com/method";
const DEFAULT_COMMUNITY_NAME = "Ceramic Loop";
const DEFAULT_VK_API_VERSION = "5.199";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} env var for VK posts import.`);
  }

  return value;
}

async function callVkApi<T>(
  method: string,
  params: Record<string, string>,
): Promise<T> {
  const accessToken = requireEnv("VK_ACCESS_TOKEN");
  const apiVersion = process.env.VK_API_VERSION || DEFAULT_VK_API_VERSION;
  const body = new URLSearchParams({
    ...params,
    access_token: accessToken,
    v: apiVersion,
  });

  const response = await fetch(`${VK_API_URL}/${method}`, {
    method: "POST",
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`VK API request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as VkApiResponse<T>;

  if (payload.error) {
    throw new Error(
      `VK API error ${payload.error.error_code}: ${payload.error.error_msg}`,
    );
  }

  if (!payload.response) {
    throw new Error("VK API returned an empty response.");
  }

  return payload.response;
}

function getWallParams() {
  const count = process.env.VK_POSTS_COUNT || "10";
  const ownerId = process.env.VK_OWNER_ID;
  const domain = process.env.VK_DOMAIN;

  if (!ownerId && !domain) {
    throw new Error("Missing VK_OWNER_ID or VK_DOMAIN env var for VK import.");
  }

  return {
    count,
    filter: "owner",
    ...(ownerId ? { owner_id: ownerId } : { domain: domain as string }),
  };
}

function getCommunityUrl(ownerId: number) {
  if (process.env.VK_COMMUNITY_URL) return process.env.VK_COMMUNITY_URL;
  if (process.env.VK_DOMAIN) return `https://vk.ru/${process.env.VK_DOMAIN}`;

  return `https://vk.ru/public${Math.abs(ownerId)}`;
}

function getPostUrl(ownerId: number, postId: number) {
  return `${getCommunityUrl(ownerId)}?w=wall${ownerId}_${postId}`;
}

function getLargestPhotoUrl(sizes: VkPhotoSize[] | undefined) {
  return [...(sizes ?? [])]
    .sort(
      (a, b) =>
        (b.width ?? 0) * (b.height ?? 0) -
        (a.width ?? 0) * (a.height ?? 0),
    )
    .at(0)?.url;
}

function getPostImages(post: VkWallPost): VkPostImportImage[] {
  return (post.attachments ?? []).flatMap((attachment, index) => {
    if (attachment.type !== "photo" || !attachment.photo) return [];

    const photo = attachment.photo;
    const originalUrl = getLargestPhotoUrl(photo.sizes);

    if (!originalUrl) return [];

    return {
      id: `${photo.owner_id}_${photo.id}_${index}`,
      originalUrl,
      alt: photo.text || post.text || DEFAULT_COMMUNITY_NAME,
    };
  });
}

function normalizePost(post: VkWallPost): VkPostImportItem {
  const sourceId = `${post.owner_id}_${post.id}`;
  const communityName = process.env.VK_COMMUNITY_NAME || DEFAULT_COMMUNITY_NAME;

  return {
    sourceId,
    ownerId: String(post.owner_id),
    communityName,
    communityAvatarUrl: process.env.VK_COMMUNITY_AVATAR_URL,
    communityUrl: getCommunityUrl(post.owner_id),
    postUrl: getPostUrl(post.owner_id, post.id),
    text: post.text?.trim() ?? "",
    publishedAt: new Date(post.date * 1000).toISOString(),
    images: getPostImages(post),
    stats: {
      likes: post.likes?.count,
      comments: post.comments?.count,
      reposts: post.reposts?.count,
      views: post.views?.count,
    },
    rawJson: JSON.stringify(post),
  };
}

export async function loadVkPostsForImport(): Promise<VkPostImportItem[]> {
  const data = await callVkApi<VkWallGetResponse>("wall.get", getWallParams());

  return data.items.map(normalizePost);
}
