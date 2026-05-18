import type { Metadata } from "next";

import EditablePageView from "@/components/content/editable-page-view";
import { getFormSettings } from "@/lib/cms";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "newsletter", locale },
    null,
  );

  return buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    seo: page?.seo,
    path: localizedPath("/newsletter", locale),
    alternates: {
      fr: localizedPath("/newsletter", "fr"),
      en: localizedPath("/newsletter", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const [page, forms] = await Promise.all([
    sanityFetch<InstitutionalPage | null>(institutionalPageBySlugQuery, { slug: "newsletter", locale }, null),
    getFormSettings(locale),
  ]);

  return <EditablePageView page={page} forms={forms} />;
}
