import type { Metadata } from "next";

import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export const siteUrl = getSiteUrl();

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  alternates?: {
    fr?: string;
    en?: string;
  };
};

export function buildMetadata({ title, description, path, alternates }: MetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.shortName}` : site.name;
  const resolvedDescription = description || site.description;
  const url = path ? new URL(path, siteUrl).toString() : siteUrl;

  const metadata: Metadata = {
    title: fullTitle,
    description: resolvedDescription,
    openGraph: {
      type: "website",
      title: fullTitle,
      description: resolvedDescription,
      siteName: site.shortName,
      url,
      images: [
        {
          url: site.assets.banner.src,
          width: site.assets.banner.width,
          height: site.assets.banner.height,
          alt: site.assets.banner.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: resolvedDescription,
      images: [site.assets.banner.src],
    },
  };

  if (alternates?.fr || alternates?.en) {
    metadata.alternates = {
      languages: {
        ...(alternates.fr ? { fr: alternates.fr } : {}),
        ...(alternates.en ? { en: alternates.en } : {}),
      },
    };
  }

  return metadata;
}
