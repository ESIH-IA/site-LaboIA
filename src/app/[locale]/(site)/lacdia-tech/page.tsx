import type { Metadata } from "next";

import EditablePageView from "@/components/content/editable-page-view";
import { getFormSettings } from "@/lib/cms";
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
    { slug: "lacdia-tech", locale },
    null,
  );

  return buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    seo: page?.seo,
    path: localizedPath("/lacdia-tech", locale),
    alternates: {
      fr: localizedPath("/lacdia-tech", "fr"),
      en: localizedPath("/lacdia-tech", "en"),
    },
  });
}

export default async function LaCDIATechPage() {
  const locale = await getServerLocale();
  const [page, forms] = await Promise.all([
    sanityFetch<InstitutionalPage | null>(institutionalPageBySlugQuery, { slug: "lacdia-tech", locale }, null),
    getFormSettings(locale),
  ]);

  return <EditablePageView page={page} forms={forms} />;
}
