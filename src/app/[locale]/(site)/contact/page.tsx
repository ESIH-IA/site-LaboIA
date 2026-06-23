import type { Metadata } from "next";
import ContactCollaborateTabs from "@/components/forms/contact-collaborate-tabs";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getFormSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return await buildMetadata({
    locale,
    title: locale === "en" ? "Contact & Collaboration" : "Contact & Collaboration",
    description: locale === "en"
      ? "Write to us or propose a collaboration with LaCDIA."
      : "Écrivez-nous ou proposez une collaboration avec le LaCDIA.",
    path: localizedPath("/contact", locale),
    alternates: {
      fr: localizedPath("/contact", "fr"),
      en: localizedPath("/contact", "en"),
    },
  });
}

const content = {
  fr: {
    badge: "Travaillons ensemble",
    title: "Contactez le LaCDIA",
    subtitle: "Une question, une idée de collaboration ou simplement envie d'en savoir plus ? Utilisez le formulaire ou retrouvez-nous directement.",
    infoTitle: "Informations de contact",
    emailLabel: "E-mail général",
    email: "contact@lacdia.org",
    locationLabel: "Localisation",
    location: "Haïti · Caraïbes",
    hoursLabel: "Réponse estimée",
    hours: "Sous 3 à 5 jours ouvrés",
    followLabel: "Suivez-nous",
    collabNote: "Vous souhaitez proposer un partenariat ou une collaboration de recherche ? Utilisez l'onglet « Collaboration ».",
  },
  en: {
    badge: "Let's work together",
    title: "Contact LaCDIA",
    subtitle: "A question, a collaboration idea, or just want to learn more? Use the form or reach us directly.",
    infoTitle: "Contact information",
    emailLabel: "General email",
    email: "contact@lacdia.org",
    locationLabel: "Location",
    location: "Haiti · Caribbean",
    hoursLabel: "Estimated response",
    hours: "Within 3 to 5 business days",
    followLabel: "Follow us",
    collabNote: "Want to propose a partnership or research collaboration? Use the 'Collaboration' tab.",
  },
};

export default async function Page() {
  const locale = await getServerLocale();
  const forms = await getFormSettings(locale);
  const tx = content[locale] ?? content.fr;

  return (
    <main style={{ background: "var(--labo-bg)", minHeight: "100vh" }}>
      {/* Hero compact */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(108,99,255,0.1) 0%, transparent 60%)," +
              "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,212,170,0.07) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", maxWidth: "64rem" }}>
          <div
            className="hero-badge"
            style={{ display: "inline-flex", marginBottom: "1.25rem" }}
          >
            <span className="hero-badge-text">{tx.badge}</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: "#f0f4ff",
              marginBottom: "1rem",
            }}
          >
            {tx.title}
          </h1>
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.3vw, 1.075rem)",
              color: "#8892b0",
              lineHeight: 1.8,
              maxWidth: "52ch",
              margin: 0,
            }}
          >
            {tx.subtitle}
          </p>
        </div>
      </section>

      {/* Contenu principal : info + formulaire */}
      <section style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
        <div className="container contact-layout" style={{ maxWidth: "64rem" }}>
          {/* Colonne gauche — infos */}
          <aside>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#f0f4ff",
                  margin: 0,
                }}
              >
                {tx.infoTitle}
              </h2>

              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  ),
                  label: tx.emailLabel,
                  value: tx.email,
                  href: `mailto:${tx.email}`,
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  ),
                  label: tx.locationLabel,
                  value: tx.location,
                  href: null,
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  ),
                  label: tx.hoursLabel,
                  value: tx.hours,
                  href: null,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(0,212,170,0.1)",
                      border: "1px solid rgba(0,212,170,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00d4aa",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.72rem", color: "#8892b0", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.2rem", fontFamily: "var(--font-mono)" }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} style={{ fontSize: "0.875rem", color: "#f0f4ff", textDecoration: "none" }}>
                        {value}
                      </a>
                    ) : (
                      <p style={{ fontSize: "0.875rem", color: "#f0f4ff", margin: 0 }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* LinkedIn */}
              <div>
                <p style={{ fontSize: "0.72rem", color: "#8892b0", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.75rem", fontFamily: "var(--font-mono)" }}>
                  {tx.followLabel}
                </p>
                <a
                  href="https://www.linkedin.com/company/lacdia"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.8rem",
                    color: "#8892b0",
                    textDecoration: "none",
                    padding: "0.4rem 0.75rem",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
              </div>

              {/* Note collaboration */}
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#8892b0",
                  lineHeight: 1.6,
                  margin: 0,
                  padding: "0.875rem",
                  background: "rgba(108,99,255,0.07)",
                  border: "1px solid rgba(108,99,255,0.15)",
                  borderRadius: 10,
                }}
              >
                {tx.collabNote}
              </p>
            </div>
          </aside>

          {/* Colonne droite — formulaire avec onglets */}
          <div className="contact-form-wrapper">
            <ContactCollaborateTabs forms={forms} locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
