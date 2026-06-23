import type { Metadata } from "next";
import ContactCollaborateTabs from "@/components/forms/contact-collaborate-tabs";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";
import { getFormSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

const pageMeta: Record<string, { title: string; description: string }> = {
  fr: {
    title: "Contact & Collaboration",
    description: "Écrivez-nous ou proposez une collaboration avec le LaCDIA.",
  },
  en: {
    title: "Contact & Collaboration",
    description: "Write to us or propose a collaboration with LaCDIA.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "contact", locale },
    null,
  );
  const fallback = pageMeta[locale] ?? pageMeta.fr;

  return await buildMetadata({
    locale,
    title: page?.title ?? fallback.title,
    description: page?.summary ?? fallback.description,
    seo: page?.seo,
    path: localizedPath("/contact", locale),
    alternates: {
      fr: localizedPath("/contact", "fr"),
      en: localizedPath("/contact", "en"),
    },
  });
}

const heroContent: Record<string, { badge: string; title: string; intro: string }> = {
  fr: {
    badge: "Travaillons ensemble",
    title: "Contactez le LaCDIA",
    intro: "Vous souhaitez nous écrire, poser une question ou proposer une collaboration de recherche ? Utilisez le formulaire ci-dessous.",
  },
  en: {
    badge: "Let's work together",
    title: "Contact LaCDIA",
    intro: "Want to write to us, ask a question or propose a research collaboration? Use the form below.",
  },
};

export default async function Page() {
  const locale = await getServerLocale();
  const forms = await getFormSettings(locale);
  const hero = heroContent[locale] ?? heroContent.fr;

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero-dark">
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="container" style={{ position: "relative", maxWidth: "52rem" }}>
          <div className="hero-badge" style={{ display: "inline-flex", marginBottom: "1.5rem" }}>
            <span className="hero-badge-text">{hero.badge}</span>
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
            {hero.title}
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
              color: "var(--color-text-light)",
              lineHeight: 1.75,
              maxWidth: "52ch",
              margin: 0,
            }}
          >
            {hero.intro}
          </p>
        </div>
      </section>

      {/* Formulaires avec onglets */}
      <section className="section section-white">
        <div className="container" style={{ maxWidth: "52rem" }}>
          <ContactCollaborateTabs forms={forms} locale={locale} />
        </div>
      </section>
    </main>
  );
}
