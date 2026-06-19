import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return await buildMetadata({
    locale,
    title: "Politique de gestion des cookies",
    description: "Politique de gestion des cookies du site lacdia.org — quels cookies nous utilisons et pourquoi.",
    path: localizedPath("/cookies", locale),
    alternates: {
      fr: localizedPath("/cookies", "fr"),
      en: localizedPath("/cookies", "en"),
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

type CookieRow = {
  name: string;
  type: string;
  purpose: string;
  duration: string;
};

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto mt-4 rounded-xl" style={{ border: "1px solid var(--labo-border)" }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)" }}>
            {["Nom", "Type", "Finalité", "Durée"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-medium"
                style={{ color: "var(--labo-text)", borderBottom: "1px solid var(--labo-border)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.name}
              style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}
            >
              <td
                className="px-4 py-3 font-mono"
                style={{ color: "var(--labo-accent-teal)", borderBottom: "1px solid var(--labo-border)" }}
              >
                {row.name}
              </td>
              <td
                className="px-4 py-3"
                style={{ color: "var(--labo-text-muted)", borderBottom: "1px solid var(--labo-border)" }}
              >
                {row.type}
              </td>
              <td
                className="px-4 py-3"
                style={{ color: "var(--labo-text-muted)", borderBottom: "1px solid var(--labo-border)" }}
              >
                {row.purpose}
              </td>
              <td
                className="px-4 py-3"
                style={{ color: "var(--labo-text-muted)", borderBottom: "1px solid var(--labo-border)" }}
              >
                {row.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cookieRows: CookieRow[] = [
  {
    name: "lacdia_locale",
    type: "Fonctionnel",
    purpose: "Mémoriser la langue choisie (FR ou EN)",
    duration: "1 an",
  },
  {
    name: "__Host-next-auth.*",
    type: "Session",
    purpose: "Gestion de session Next.js (sécurité)",
    duration: "Session",
  },
  {
    name: "__cf_bm",
    type: "Technique",
    purpose: "Protection anti-bot Cloudflare (hébergeur Vercel)",
    duration: "30 min",
  },
];

export default async function CookiesPage() {
  return (
    <main style={{ background: "var(--labo-bg)" }}>
      <section className="section-padding">
        <div className="container-site" style={{ maxWidth: "800px" }}>
          {/* En-tête */}
          <div className="mb-14">
            <div className="label-eyebrow mb-4" style={{ color: "var(--labo-text-muted)" }}>
              Cookies et traceurs
            </div>
            <h1
              className="text-display-lg"
              style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              Gestion des cookies
            </h1>
            <p className="mt-4 text-sm" style={{ color: "var(--labo-text-muted)" }}>
              Dernière mise à jour : juin 2026
            </p>
          </div>

          <div
            className="rounded-2xl p-8 md:p-12"
            style={{ background: "var(--labo-surface)", border: "1px solid var(--labo-border)" }}
          >
            <Section title="Qu'est-ce qu'un cookie ?">
              <p>
                Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web.
                Il permet au site de mémoriser des informations entre deux visites ou de faire fonctionner
                certaines fonctionnalités.
              </p>
            </Section>

            <Section title="Cookies utilisés sur ce site">
              <p>
                Le site <strong style={{ color: "var(--labo-text)" }}>lacdia.org</strong> utilise
                uniquement des cookies <strong style={{ color: "var(--labo-text)" }}>strictement nécessaires</strong> à
                son fonctionnement. Nous n'utilisons aucun cookie publicitaire ni de profilage.
              </p>
              <CookieTable rows={cookieRows} />
            </Section>

            <Section title="Pas de cookies tiers à des fins publicitaires">
              <p>
                LaCDIA n'intègre aucun outil de mesure d'audience tiers (Google Analytics, Matomo, Hotjar, etc.)
                ni aucun pixel de suivi (Meta, LinkedIn, etc.).
              </p>
              <p>
                Si cela venait à changer, cette politique serait mise à jour et un bandeau de consentement
                explicite vous serait présenté.
              </p>
            </Section>

            <Section title="Votre contrôle sur les cookies">
              <p>
                Vous pouvez configurer votre navigateur pour bloquer ou supprimer les cookies. Voici les
                liens vers les instructions des principaux navigateurs :
              </p>
              <ul className="list-disc list-inside space-y-1.5 mt-2">
                <li>Google Chrome : paramètres → Confidentialité et sécurité → Cookies</li>
                <li>Mozilla Firefox : paramètres → Vie privée et sécurité</li>
                <li>Safari : préférences → Confidentialité</li>
                <li>Microsoft Edge : paramètres → Cookies et autorisations du site</li>
              </ul>
              <p className="mt-3">
                Notez que le blocage du cookie <span style={{ color: "var(--labo-accent-teal)", fontFamily: "monospace" }}>lacdia_locale</span> désactivera
                la mémorisation de votre langue préférée.
              </p>
            </Section>

            <Section title="Modifications">
              <p>
                Cette politique peut être mise à jour en fonction de l'évolution du site. La date de révision
                est affichée en haut de page.
              </p>
            </Section>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--labo-border)" }}>
              <p className="text-xs" style={{ color: "var(--labo-text-muted)" }}>
                Voir aussi :{" "}
                <a href="/mentions-legales" style={{ color: "var(--labo-accent-teal)" }}>Mentions légales</a>
                {" · "}
                <a href="/confidentialite" style={{ color: "var(--labo-accent-teal)" }}>Politique de confidentialité</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}