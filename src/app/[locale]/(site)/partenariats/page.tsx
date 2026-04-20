import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import InstitutionalPageView from "@/components/content/institutional-page-view";
import { sanityFetch } from "@/lib/sanity/client";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const SLUG = "partenariats";

async function fetchPage(locale: string) {
  return await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: SLUG, locale },
    null,
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await fetchPage(locale);
  const t = await getTranslations("partnerships");

  return await buildMetadata({
    locale,
    title: page?.title ?? t("title"),
    description: page?.summary ?? t("subtitle"),
    path: localizedPath(`/${SLUG}`, locale),
    alternates: {
      fr: localizedPath(`/${SLUG}`, "fr"),
      en: localizedPath(`/${SLUG}`, "en"),
    },
  });
}

export default async function PartenariatsPage() {
  const locale = await getServerLocale();
  const page = await fetchPage(locale);
  const t = await getTranslations("partnerships");

  return (
    <InstitutionalPageView
      page={page}
      fallbackBadge={t("title")}
      fallbackTitle={t("title")}
      fallbackSummary={t("subtitle")}
    />
  );
}
