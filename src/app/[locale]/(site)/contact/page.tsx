import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import InstitutionalPageView from "@/components/content/institutional-page-view";
import ContactForm from "@/components/forms/contact-form";
import { sanityFetch } from "@/lib/sanity/client";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const SLUG = "contact";

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
    title: page?.title ?? t("nav.contact"),
    description: page?.summary ?? t("common.contactUs"),
    path: localizedPath(`/${SLUG}`, locale),
    alternates: {
      fr: localizedPath(`/${SLUG}`, "fr"),
      en: localizedPath(`/${SLUG}`, "en"),
    },
  });
}

export default async function ContactPage() {
  const locale = await getServerLocale();
  const page = await fetchPage(locale);
  const t = await getTranslations();

  return (
    <InstitutionalPageView
      page={page}
      fallbackBadge={t("nav.contact")}
      fallbackTitle={t("nav.contact")}
      fallbackSummary={t("common.contactUs")}
    >
      <section className="section section-white">
        <div className="container" style={{ maxWidth: "48rem" }}>
          <ContactForm />
        </div>
      </section>
    </InstitutionalPageView>
  );
}
