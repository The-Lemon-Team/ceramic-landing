export interface VkPostImage {
  id: string;
  src: string;
  alt?: string;
}

export interface VkPostStats {
  likes?: number;
  comments?: number;
  reposts?: number;
  views?: number;
}

export interface VkPost {
  id: string;
  sourceId: string;
  ownerId?: string;
  communityName: string;
  communityAvatar?: string;
  communityUrl: string;
  postUrl: string;
  text: string;
  publishedAt: string;
  timestamp: string;
  images: VkPostImage[];
  stats?: VkPostStats;
}

export interface VkPostImportImage {
  id?: string;
  assetId?: string;
  originalUrl?: string;
  alt?: string;
}

export interface VkPostImportItem {
  sourceId: string;
  ownerId?: string;
  communityName: string;
  communityAvatarAssetId?: string;
  communityAvatarUrl?: string;
  communityUrl: string;
  postUrl: string;
  text: string;
  publishedAt: string;
  images?: VkPostImportImage[];
  stats?: VkPostStats;
  rawJson?: string;
}

export interface VkPostSyncResult {
  ok: boolean;
  imported: number;
  skipped: number;
  message: string;
}
