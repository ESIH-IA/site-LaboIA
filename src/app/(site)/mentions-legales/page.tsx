import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return await buildMetadata({
    locale,
    title: "Mentions légales",
    description: "Mentions légales du laboratoire LaCDIA — Laboratoire Caribéen des Sciences des Données et de l'Intelligence Artificielle.",
    path: localizedPath("/mentions-legales", locale),
    alternates: {
      fr: localizedPath("/mentions-legales", "fr"),
      en: localizedPath("/mentions-legales", "en"),
    },
  });
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
        {children}
      </div>
    </div>
  );
}

export default async function MentionsLegalesPage() {
  return (
    <main style={{ background: "var(--labo-bg)" }}>
      <section className="section-padding">
        <div className="container-site" style={{ maxWidth: "800px" }}>
          {/* En-tête */}
          <div className="mb-14">
            <div
              className="label-eyebrow mb-4"
              style={{ color: "var(--labo-text-muted)" }}
            >
              Informations légales
            </div>
            <h1
              className="text-display-lg"
              style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              Mentions légales
            </h1>
            <p className="mt-4 text-sm" style={{ color: "var(--labo-text-muted)" }}>
              Dernière mise à jour : juin 2026
            </p>
          </div>

          <div
            className="rounded-2xl p-8 md:p-12"
            style={{ background: "var(--labo-surface)", border: "1px solid var(--labo-border)" }}
          >
            <Section title="Éditeur du site">
              <p>
                Le site <strong style={{ color: "var(--labo-text)" }}>lacdia.org</strong> est édité par le{" "}
                <strong style={{ color: "var(--labo-text)" }}>
                  Laboratoire Caribéen des Sciences des Données et de l'Intelligence Artificielle
                </strong>{" "}
                (LaCDIA), unité de recherche appliquée rattachée à l'École Supérieure d'Infotronique d'Haïti (ESIH).
              </p>
              <p>
                <strong style={{ color: "var(--labo-text)" }}>Adresse :</strong> 29 2nd Lane, Port-au-Prince, Haïti
              </p>
              <p>
                <strong style={{ color: "var(--labo-text)" }}>Email :</strong>{" "}
                <a
                  href="mailto:contact@lacdia.org"
                  style={{ color: "var(--labo-accent-teal)" }}
                >
                  contact@lacdia.org
                </a>
              </p>
            </Section>

            <Section title="Directeurs de la publication">
              <p>
                La direction scientifique du laboratoire assure conjointement la responsabilité éditoriale du site.
              </p>
              <p>
                Directeurs scientifiques :{" "}
                <strong style={{ color: "var(--labo-text)" }}>Livenson Nicolas</strong> et{" "}
                <strong style={{ color: "var(--labo-text)" }}>Aïshael Donata Laury Picard</strong>
              </p>
              <p>
                Directeur général de l'ESIH :{" "}
                <strong style={{ color: "var(--labo-text)" }}>Patrick Attié</strong>
              </p>
            </Section>

            <Section title="Hébergement">
              <p>
                Ce site est hébergé par <strong style={{ color: "var(--labo-text)" }}>Vercel Inc.</strong>, dont le siège social est situé au 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.
              </p>
              <p>
                Site web : <span style={{ color: "var(--labo-text)" }}>vercel.com</span>
              </p>
            </Section>

            <Section title="Propriété intellectuelle">
              <p>
                L'ensemble du contenu de ce site — textes, images, logos, infographies, code source et éléments graphiques — est la propriété exclusive de LaCDIA ou de ses partenaires, sauf mention contraire.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication ou transmission, totale ou partielle, sans l'autorisation écrite préalable de LaCDIA, est interdite.
              </p>
              <p>
                Les demandes d'autorisation ou de collaboration académique peuvent être adressées à{" "}
                <a
                  href="mailto:contact@lacdia.org"
                  style={{ color: "var(--labo-accent-teal)" }}
                >
                  contact@lacdia.org
                </a>
                .
              </p>
            </Section>

            <Section title="Données personnelles">
              <p>
                Le traitement des données personnelles collectées via ce site est décrit dans notre{" "}
                <a
                  href="/confidentialite"
                  style={{ color: "var(--labo-accent-teal)" }}
                >
                  Politique de confidentialité
                </a>
                .
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                Ce site utilise des cookies techniques nécessaires à son fonctionnement. La gestion de ces cookies est décrite dans notre{" "}
                <a
                  href="/cookies"
                  style={{ color: "var(--labo-accent-teal)" }}
                >
                  Politique de gestion des cookies
                </a>
                .
              </p>
            </Section>

            <Section title="Limitation de responsabilité">
              <p>
                LaCDIA s'efforce d'assurer l'exactitude et la mise à jour des informations publiées sur ce site. Toutefois, le laboratoire ne peut garantir l'exhaustivité ou l'absence d'erreurs dans les contenus proposés.
              </p>
              <p>
                Les liens hypertextes présents sur le site vers des ressources externes n'engagent pas la responsabilité de LaCDIA quant au contenu de ces sites tiers.
              </p>
            </Section>

            <Section title="Droit applicable">
              <p>
                Le présent site et ces mentions légales sont soumis au droit haïtien. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents de Port-au-Prince seront seuls compétents.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </main>
  );
}