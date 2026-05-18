import type { Metadata } from "next";

import EditablePageView from "@/components/content/editable-page-view";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/client";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "departement-scientifique", locale },
    null,
  );

  return buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    seo: page?.seo,
    path: localizedPath("/recherche/departement-scientifique", locale),
    alternates: {
      fr: localizedPath("/recherche/departement-scientifique", "fr"),
      en: localizedPath("/recherche/departement-scientifique", "en"),
    },
  });
}

export default async function DepartementScientifiquePage() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "departement-scientifique", locale },
    null,
  );

  return <EditablePageView page={page} />;
}
