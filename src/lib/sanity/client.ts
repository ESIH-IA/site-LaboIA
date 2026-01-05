import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityConfig = {
  projectId: projectId || "",
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
};

export const isSanityConfigured = Boolean(projectId);

export const sanityClient = isSanityConfigured ? createClient(sanityConfig) : null;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
) {
  if (!isSanityConfigured) return fallback;
  if (!sanityClient) return fallback;
  return sanityClient.fetch<T>(query, params);
}
