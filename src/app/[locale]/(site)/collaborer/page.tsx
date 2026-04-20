import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import InstitutionalPageView from "@/components/content/institutional-page-view";
import CollaborateForm from "@/components/forms/collaborate-form";
import { sanityFetch } from "@/lib/sanity/client";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const SLUG = "collaborer";

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
    title: page?.title ?? t("nav.collaborate"),
    description: page?.summary ?? t("common.collaborate"),
    path: localizedPath(`/${SLUG}`, locale),
    alternates: {
      fr: localizedPath(`/${SLUG}`, "fr"),
      en: localizedPath(`/${SLUG}`, "en"),
    },
  });
}

export default async function CollaborerPage() {
  const locale = await getServerLocale();
  const page = await fetchPage(locale);
  const t = await getTranslations();

  return (
    <InstitutionalPageView
      page={page}
      fallbackBadge={t("nav.collaborate")}
      fallbackTitle={t("nav.collaborate")}
      fallbackSummary={t("common.collaborate")}
    >
      <section className="page-hero page-hero-dark">
        <div className="container" style={{ maxWidth: "48rem" }}>
          <h2 className="section-title" style={{ color: "#fff" }}>
            {t("pages.collaborer.formTitle")}
          </h2>
          <CollaborateForm />
        </div>
      </section>
    </InstitutionalPageView>
  );
}
