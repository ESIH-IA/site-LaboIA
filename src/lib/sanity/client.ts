import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const sanityConfig = {
  projectId: projectId || "",
  dataset,
  apiVersion: apiVersion || "2024-01-01",
  useCdn: true,
  timeout: 8000,
};

export function getSanityMissingEnv() {
  const missing: string[] = [];

  const hasProjectId = Boolean(process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  if (!hasProjectId) missing.push("NEXT_PUBLIC_SANITY_PROJECT_ID");

  const hasDataset = Boolean(process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET);
  if (!hasDataset) missing.push("NEXT_PUBLIC_SANITY_DATASET");

  const hasApiVersion = Boolean(process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION);
  if (!hasApiVersion) missing.push("NEXT_PUBLIC_SANITY_API_VERSION");

  return missing;
}

export const isSanityConfigured = getSanityMissingEnv().length === 0;

export const sanityClient = isSanityConfigured ? createClient(sanityConfig) : null;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  if (!sanityClient) return fallback;
  try {
    const result = await Promise.race([
      sanityClient.fetch<T>(query, params),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Sanity fetch timeout")), 8000)
      ),
    ]);
    return result;
  } catch (err) {
    console.warn("[sanityFetch] Falling back to local data:", err instanceof Error ? err.message : err);
    return fallback;
  }
}
