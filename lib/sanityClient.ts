import { createClient } from "@sanity/client";

function getSanityConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

  if (!projectId || !dataset) return null;

  return { projectId, dataset, apiVersion };
}

export function getSanityClient() {
  const config = getSanityConfig();
  if (!config) return null;

  return createClient({
    ...config,
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
    perspective: "published",
  });
}

export function getSanityWriteClient() {
  const config = getSanityConfig();
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!config || !token) return null;

  return createClient({
    ...config,
    useCdn: false,
    token,
    perspective: "published",
  });
}
