import type { KpiItem, KpiSettings } from "@/lib/sanity/types";

type KpisProps = {
  title?: string;
  intro?: string;
  items: KpiItem[];
  meta?: KpiSettings;
};

export default function Kpis({ title, intro, items, meta }: KpisProps) {
  const list = items.length ? items : [
    { _id: "1", key: "chercheurs",   value: "12+", label: "Chercheurs actifs",    note: "Doctorants, postdocs et enseignants-chercheurs", status: "confirmed" as const },
    { _id: "2", key: "projets",      value: "8",   label: "Projets en cours",     note: "Projets de recherche appliquée et fondamentale",  status: "confirmed" as const },
    { _id: "3", key: "partenariats", value: "3",   label: "Partenariats actifs",  note: "Institutions académiques et organisations",       status: "draft" as const },
    { _id: "4", key: "axes",         value: "6",   label: "Axes de recherche",    note: "Thématiques structurant nos travaux",             status: "confirmed" as const },
  ];

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
              Chiffres clés
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
            {meta.lastUpdated && <span>Mise à jour : {meta.lastUpdated}</span>}
            {meta.disclaimer && <span style={{ opacity: 0.6 }}>{meta.disclaimer}</span>}
          </div>
        )}
      </div>
    </section>
  );
}
