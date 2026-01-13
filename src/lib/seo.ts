import type { Metadata } from "next";

import { getSiteSettings } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

export const siteUrl = getSiteUrl();

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  locale: Locale;
  alternates?: {
    fr?: string;
    en?: string;
  };
};

export async function buildMetadata({
  title,
  description,
  path,
  alternates,
  locale,
}: MetadataInput): Promise<Metadata> {
  const site = await getSiteSettings(locale);
  const fullTitle = title ? `${title} | ${site.shortName}` : site.name;
  const resolvedDescription = description || site.description;
  const url = path ? new URL(path, siteUrl).toString() : siteUrl;
  const banner = site.banner;

  const metadata: Metadata = {
    title: fullTitle,
    description: resolvedDescription,
    openGraph: {
      type: "website",
      title: fullTitle,
      description: resolvedDescription,
      siteName: site.shortName,
      url,
      images: banner?.url
        ? [
            {
              url: banner.url,
              width: banner.width,
              height: banner.height,
              alt: banner.alt ?? site.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: resolvedDescription,
      images: banner?.url ? [banner.url] : undefined,
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
