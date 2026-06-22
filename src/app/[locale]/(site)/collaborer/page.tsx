import type { Metadata } from "next";
import EditablePageView from "@/components/content/editable-page-view";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";
import { getFormSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "collaborer", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    seo: page?.seo,
    path: localizedPath("/collaborer", locale),
    alternates: {
      fr: localizedPath("/collaborer", "fr"),
      en: localizedPath("/collaborer", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "collaborer", locale },
    null,
  );
  const forms = await getFormSettings(locale);

  return <EditablePageView page={page} forms={forms} />;
}
