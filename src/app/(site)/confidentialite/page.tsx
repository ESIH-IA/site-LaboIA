import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return await buildMetadata({
    locale,
    title: "Politique de confidentialité",
    description: "Politique de confidentialité du laboratoire LaCDIA — comment nous collectons et utilisons vos données personnelles.",
    path: localizedPath("/confidentialite", locale),
    alternates: {
      fr: localizedPath("/confidentialite", "fr"),
      en: localizedPath("/confidentialite", "en"),
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

export default async function ConfidentialitePage() {
  return (
    <main style={{ background: "var(--labo-bg)" }}>
      <section className="section-padding">
        <div className="container-site" style={{ maxWidth: "800px" }}>
          {/* En-tête */}
          <div className="mb-14">
            <div className="label-eyebrow mb-4" style={{ color: "var(--labo-text-muted)" }}>
              Données personnelles
            </div>
            <h1
              className="text-display-lg"
              style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              Politique de confidentialité
            </h1>
            <p className="mt-4 text-sm" style={{ color: "var(--labo-text-muted)" }}>
              Dernière mise à jour : juin 2026
            </p>
          </div>

          <div
            className="rounded-2xl p-8 md:p-12"
            style={{ background: "var(--labo-surface)", border: "1px solid var(--labo-border)" }}
          >
            <Section title="Introduction">
              <p>
                Le laboratoire LaCDIA (Laboratoire Caribéen des Sciences des Données et de l'Intelligence Artificielle),
                rattaché à l'ESIH (École Supérieure d'Infotronique d'Haïti), s'engage à protéger la vie privée
                des visiteurs de son site et des personnes qui le contactent.
              </p>
              <p>
                La présente politique décrit les données que nous collectons, comment nous les utilisons,
                et vos droits à leur égard.
              </p>
            </Section>

            <Section title="Données collectées">
              <p>Nous collectons uniquement les données que vous nous transmettez volontairement :</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2">
                <li>
                  <strong style={{ color: "var(--labo-text)" }}>Formulaire de contact</strong> : nom, adresse e-mail,
                  objet et message de votre demande.
                </li>
                <li>
                  <strong style={{ color: "var(--labo-text)" }}>Formulaire de collaboration</strong> : nom,
                  organisation, domaine d'activité et description du projet.
                </li>
                <li>
                  <strong style={{ color: "var(--labo-text)" }}>Newsletter</strong> : adresse e-mail uniquement.
                </li>
              </ul>
              <p className="mt-3">
                Nous ne collectons pas de données de navigation à des fins publicitaires. Le site n'utilise pas de
                traqueurs tiers (Google Analytics, Meta Pixel, etc.).
              </p>
            </Section>

            <Section title="Finalités du traitement">
              <p>Les données collectées sont utilisées exclusivement pour :</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2">
                <li>Répondre à vos demandes de contact ou de collaboration.</li>
                <li>Vous envoyer les communications auxquelles vous avez souscrit (newsletter).</li>
                <li>Améliorer le contenu et les services du laboratoire.</li>
              </ul>
            </Section>

            <Section title="Base légale du traitement">
              <p>
                Le traitement de vos données repose sur votre <strong style={{ color: "var(--labo-text)" }}>consentement explicite</strong>,
                matérialisé par votre action volontaire de remplir et soumettre un formulaire.
              </p>
              <p>
                Conformément aux bonnes pratiques de protection des données personnelles et dans l'esprit du
                Règlement Général sur la Protection des Données (RGPD) applicable en Europe, LaCDIA applique
                les mêmes principes à l'ensemble de ses contacts internationaux.
              </p>
            </Section>

            <Section title="Durée de conservation">
              <ul className="list-disc list-inside space-y-1.5">
                <li>Demandes de contact : 12 mois à compter de la dernière interaction.</li>
                <li>Abonnements newsletter : jusqu'à désinscription de votre part.</li>
                <li>Données de collaboration : durée du projet + 24 mois.</li>
              </ul>
            </Section>

            <Section title="Partage des données">
              <p>
                Vos données ne sont <strong style={{ color: "var(--labo-text)" }}>jamais vendues</strong> à des tiers.
                Elles peuvent être partagées uniquement avec :
              </p>
              <ul className="list-disc list-inside space-y-1.5 mt-2">
                <li>
                  Les prestataires techniques assurant l'hébergement du site (Vercel Inc., États-Unis),
                  dans le cadre de clauses contractuelles garantissant la protection des données.
                </li>
                <li>
                  Les membres de l'équipe LaCDIA concernés par votre demande.
                </li>
              </ul>
            </Section>

            <Section title="Vos droits">
              <p>Vous disposez des droits suivants concernant vos données personnelles :</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2">
                <li>Droit d'accès : connaître les données que nous détenons sur vous.</li>
                <li>Droit de rectification : corriger des données inexactes.</li>
                <li>Droit à l'effacement : demander la suppression de vos données.</li>
                <li>Droit d'opposition : vous opposer à un traitement spécifique.</li>
                <li>Droit à la portabilité : recevoir vos données dans un format lisible.</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous à{" "}
                <a href="mailto:contact@lacdia.org" style={{ color: "var(--labo-accent-teal)" }}>
                  contact@lacdia.org
                </a>
                .
              </p>
            </Section>

            <Section title="Sécurité">
              <p>
                Nous mettons en œuvre des mesures techniques appropriées pour protéger vos données contre
                tout accès non autorisé, perte ou divulgation : communications chiffrées (HTTPS), accès
                restreint aux données, et hébergement sécurisé.
              </p>
            </Section>

            <Section title="Modifications">
              <p>
                Cette politique peut être mise à jour. La date de dernière révision est indiquée en haut de
                page. En cas de modification substantielle, nous en informerons les abonnés à notre newsletter.
              </p>
            </Section>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--labo-border)" }}>
              <p className="text-xs" style={{ color: "var(--labo-text-muted)" }}>
                Voir aussi :{" "}
                <a href="/mentions-legales" style={{ color: "var(--labo-accent-teal)" }}>Mentions légales</a>
                {" · "}
                <a href="/cookies" style={{ color: "var(--labo-accent-teal)" }}>Gestion des cookies</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}