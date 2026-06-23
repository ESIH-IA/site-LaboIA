import type { KpiItem, KpiSettings } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n";

type KpisProps = {
  title?: string;
  intro?: string;
  items: KpiItem[];
  meta?: KpiSettings;
  locale?: Locale;
};

const FALLBACK_ITEMS: Record<Locale, KpiItem[]> = {
  fr: [
    { _id: "1", key: "chercheurs",   value: "5+", label: "Chercheurs actifs",   note: "Chercheurs, doctorants et collaborateurs actifs", status: "confirmed" },
    { _id: "2", key: "projets",      value: "0",  label: "Projets en cours",    note: "Projets de recherche en cours de lancement",      status: "confirmed" },
    { _id: "3", key: "partenariats", value: "1",  label: "Partenariats actifs", note: "Partenariat actif en recherche et médiation",     status: "confirmed" },
    { _id: "4", key: "axes",         value: "6",  label: "Axes de recherche",   note: "Thématiques structurant nos travaux",             status: "confirmed" },
  ],
  en: [
    { _id: "1", key: "chercheurs",   value: "5+", label: "Active Researchers",  note: "Researchers, PhD students and active collaborators", status: "confirmed" },
    { _id: "2", key: "projets",      value: "0",  label: "Ongoing Projects",    note: "Research projects currently being launched",         status: "confirmed" },
    { _id: "3", key: "partenariats", value: "1",  label: "Active Partnerships", note: "Active partnership in research and mediation",        status: "confirmed" },
    { _id: "4", key: "axes",         value: "6",  label: "Research Axes",       note: "Themes structuring our work",                        status: "confirmed" },
  ],
};

const SECTION_LABELS: Record<Locale, string> = {
  fr: "Chiffres clés",
  en: "Key figures",
};

export default function Kpis({ title, intro, items, meta, locale = "fr" }: KpisProps) {
  const list = items.length ? items : (FALLBACK_ITEMS[locale] ?? FALLBACK_ITEMS.fr);
  const sectionLabel = SECTION_LABELS[locale] ?? SECTION_LABELS.fr;

  return (
    <section
      className="section-mid section"
      style={{ padding: "clamp(4rem,8vw,7rem) 0" }}
    >
      <div className="container">
        {(title || intro) && (
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 4rem" }}>
            <div className="badge-teal" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
              <span
                style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-teal)", flexShrink: 0 }}
              />
              {sectionLabel}
            </div>
            {title && (
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem,3vw,2.5rem)",
                  fontWeight: 800,
                  color: "var(--color-text-white)",
                  letterSpacing: "-0.02em",
                  margin: "0 0 1rem",
                }}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.7, margin: 0 }}>
                {intro}
              </p>
            )}
          </div>
        )}

        <div className="stats-grid">
          {list.slice(0, 4).map((item) => (
            <div key={item._id} className="stat-card">
              <div className="stat-number">{item.value}</div>
              <div className="stat-label">{item.label}</div>
              {item.note && <p className="stat-desc">{item.note}</p>}
            </div>
          ))}
        </div>

        {(meta?.lastUpdated || meta?.disclaimer) && (
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--color-text-muted)",
            }}
          >
            {meta.lastUpdated && <span>{locale === "en" ? "Updated:" : "Mise à jour :"} {meta.lastUpdated}</span>}
            {meta.disclaimer && <span style={{ opacity: 0.6 }}>{meta.disclaimer}</span>}
          </div>
        )}
      </div>
    </section>
  );
}
