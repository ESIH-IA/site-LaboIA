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

const SLUG = "a-propos";

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
  const t = await getTranslations("about");

  return await buildMetadata({
    locale,
    title: page?.title ?? t("title"),
    description: page?.summary,
    path: localizedPath(`/${SLUG}`, locale),
    alternates: {
      fr: localizedPath(`/${SLUG}`, "fr"),
      en: localizedPath(`/${SLUG}`, "en"),
    },
  });
}

export default async function AboutPage() {
  const locale = await getServerLocale();
  const page = await fetchPage(locale);
  const t = await getTranslations("about");

  return (
    <InstitutionalPageView
      page={page}
      fallbackTitle={t("title")}
      fallbackBadge={t("badge")}
      fallbackSummary={t("fullName")}
    />
  );
}
