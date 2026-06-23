import type { Metadata } from "next";
import EditablePageView from "@/components/content/editable-page-view";
import ContactForm from "@/components/forms/contact-form";
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
    { slug: "contact", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title ?? (locale === "en" ? "Contact" : "Contact"),
    description: page?.summary,
    seo: page?.seo,
    path: localizedPath("/contact", locale),
    alternates: {
      fr: localizedPath("/contact", "fr"),
      en: localizedPath("/contact", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "contact", locale },
    null,
  );
  const forms = await getFormSettings(locale);

  if (!page) {
    const isEn = locale === "en";
    return (
      <main>
        <section className="page-hero page-hero-dark">
          <div className="section-pattern grid-pattern pattern-40" />
          <div className="container" style={{ position: "relative", maxWidth: "48rem" }}>
            <div className="hero-badge" style={{ display: "inline-flex", marginBottom: "1.5rem" }}>
              <span className="hero-badge-text">{isEn ? "Get in touch" : "Nous contacter"}</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--color-text-white)",
                marginBottom: "1.25rem",
                maxWidth: "22ch",
              }}
            >
              {isEn ? "Write to us" : "Écrivez-nous"}
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
                color: "var(--color-text-light)",
                lineHeight: 1.75,
                maxWidth: "48ch",
                margin: 0,
              }}
            >
              {isEn
                ? "Our team will get back to you as soon as possible. Whether you have a question, a collaboration proposal, or simply want to learn more about LaCDIA."
                : "Notre équipe vous répondra dans les meilleurs délais. Que vous ayez une question, une proposition de collaboration ou simplement envie d'en savoir plus sur LaCDIA."}
            </p>
          </div>
        </section>

        <section className="section section-white">
          <div className="container" style={{ maxWidth: "48rem" }}>
            <ContactForm copy={forms?.contact} locale={locale} />
          </div>
        </section>
      </main>
    );
  }

  return <EditablePageView page={page} forms={forms} locale={locale} />;
}
