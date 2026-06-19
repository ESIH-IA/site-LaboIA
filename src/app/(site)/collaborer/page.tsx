import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import CollaborateForm from "@/components/forms/collaborate-form";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

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

  const channels = [
    {
      id: "partenariat",
      label: "01",
      title: "Partenariat institutionnel",
      description: "Institutions, entreprises ou organisations souhaitant co-construire un projet de recherche ou financer une initiative.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "stage",
      label: "02",
      title: "Stage & encadrement",
      description: "Étudiants en master ou doctorat cherchant un encadrement ou une collaboration académique dans le domaine de l'IA et de la data science.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "projet",
      label: "03",
      title: "Proposer un projet",
      description: "Porteurs de projets appliqués, startups ou organisations souhaitant bénéficier d'une expertise en IA pour résoudre un problème concret.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <main style={{ background: "var(--tech-bg)", color: "var(--tech-text)" }}>
      {/* Hero creme */}
      <section className="relative overflow-hidden section-padding-sm gradient-tech-hero">
        <div className="container-site">
          <div className="badge-dark inline-flex mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00b894]" />
            Collaborer
          </div>
          <h1
            className="text-display-xl max-w-3xl"
            style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
          >
            {page?.title ?? "Construisons ensemble."}
          </h1>
          {page?.summary && (
            <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
              {page.summary}
            </p>
          )}
        </div>
      </section>

      {page?.content && (
        <section className="section-tech-surface section-padding-sm">
          <div className="container-site">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      )}

      {/* 3 canaux */}
      <section className="section-tech section-padding">
        <div className="container-site">
          <div className="max-w-xl mb-14">
            <div className="badge-dark inline-flex mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00b894]" />
              Modalités
            </div>
            <h2
              className="text-display-md"
              style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              Trois façons de collaborer avec nous
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {channels.map((ch) => (
              <div key={ch.id} className="card-tech rounded-2xl p-6 flex flex-col gap-4">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,184,148,0.1)", border: "1px solid rgba(0,184,148,0.2)", color: "var(--tech-accent-teal)" }}
                >
                  {ch.icon}
                </div>
                <div>
                  <div className="label-eyebrow mb-2" style={{ color: "var(--tech-accent-teal)" }}>{ch.label}</div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}>
                    {ch.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
                    {ch.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Processus 3 etapes */}
          <div
            className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
            style={{ background: "var(--labo-bg)", color: "var(--labo-text)" }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #00d4aa, transparent)" }}
              aria-hidden="true"
            />
            <div className="label-eyebrow text-[#00d4aa] mb-8">Processus</div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { n: "01", title: "Premier contact", desc: "Envoyez-nous une description de votre projet ou de votre besoin via le formulaire ci-dessous." },
                { n: "02", title: "Échange exploratoire", desc: "Nous vous contactons sous 5 jours ouvrables pour un premier échange afin de qualifier la collaboration." },
                { n: "03", title: "Formalisation", desc: "Signature d'une convention, lettre d'intention ou contrat adapté au type de collaboration." },
              ].map((step) => (
                <div key={step.n} className="flex flex-col gap-3">
                  <div className="label-eyebrow text-[#00d4aa]">{step.n}</div>
                  <h3 className="font-semibold text-[#f0f4ff]" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#8892b0] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="section-tech section-padding-sm">
        <div className="container-site">
          <div className="label-eyebrow mb-6" style={{ color: "var(--tech-text-muted)" }}>Formulaire de contact</div>
          <CollaborateForm />
        </div>
      </section>
    </main>
  );
}