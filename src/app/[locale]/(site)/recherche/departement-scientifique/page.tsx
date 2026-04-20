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

const SLUG = "departement-scientifique";
const PATH = "/recherche/departement-scientifique";

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
  const t = await getTranslations();

  return await buildMetadata({
    locale,
    title: page?.title ?? t("research.title"),
    description: page?.summary ?? t("pages.departementScientifique.fallbackSummary"),
    path: localizedPath(PATH, locale),
    alternates: {
      fr: localizedPath(PATH, "fr"),
      en: localizedPath(PATH, "en"),
    },
  });
}

export default async function DepartementScientifiquePage() {
  const locale = await getServerLocale();
  const page = await fetchPage(locale);
  const t = await getTranslations();

  return (
    <InstitutionalPageView
      page={page}
      fallbackBadge={t("research.badge")}
      fallbackTitle={t("research.title")}
      fallbackSummary={t("pages.departementScientifique.fallbackSummary")}
    />
  );
}
