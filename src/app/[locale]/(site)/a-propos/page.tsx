import type { Metadata } from "next";

import EditablePageView from "@/components/content/editable-page-view";
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
    { slug: "a-propos", locale },
    null,
  );

  return buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    seo: page?.seo,
    path: localizedPath("/a-propos", locale),
    alternates: {
      fr: localizedPath("/a-propos", "fr"),
      en: localizedPath("/a-propos", "en"),
    },
  });
}

export default async function AboutPage() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "a-propos", locale },
    null,
  );

  return <EditablePageView page={page} />;
}
