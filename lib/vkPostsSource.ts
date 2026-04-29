import { VkPostImportItem } from "@/types/vk-post";

/**
 * Replace this function with the real VK loader.
 * The sync pipeline expects posts in this normalized shape and handles Sanity upsert.
 */
export async function loadVkPostsForImport(): Promise<VkPostImportItem[]> {
  return [];
}
