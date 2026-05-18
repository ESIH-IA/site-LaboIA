import type { KpiItem, KpiSettings } from "@/lib/sanity/types";

type KpisProps = {
  title?: string;
  intro?: string;
  items: KpiItem[];
  meta?: KpiSettings;
};

export default async function Kpis({ title, intro, items, meta }: KpisProps) {
  if (!title && !intro && items.length === 0) return null;

  return (
    <section className="kpis">
      {/* Dot pattern subtil */}
      <div className="section-pattern dot-pattern pattern-30" />

      <div className="section-inner" style={{ position: "relative" }}>
        <div className="section-header-centered" style={{ marginBottom: "3rem" }}>
          {title ? <h2 className="section-title">{title}</h2> : null}
          {intro ? <p className="section-subtitle">{intro}</p> : null}
        </div>

        <div className="card-grid card-grid-sm-2 card-grid-4">
          {items.map((item, idx) => (
            <div
              key={item._id}
              className="kpi-card card-hover"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Gradient top accent */}
              <div className="kpi-accent" />

              <div className="kpi-value">
                {item.value}
              </div>
              <div className="kpi-label">{item.label}</div>

              <span
                className={`kpi-status-dot ${
                  item.status === "confirmed" ? "kpi-status-dot--confirmed" : "kpi-status-dot--draft"
                }`}
                aria-hidden
              />

              {item.note ? (
                <p className="kpi-note">{item.note}</p>
              ) : null}
            </div>
          ))}
        </div>

        {meta?.lastUpdated || meta?.disclaimer ? (
          <div className="kpi-meta">
            {meta?.lastUpdated ? (
              <span>{meta.lastUpdated}</span>
            ) : null}
            {meta?.disclaimer ? (
              <>
                <span aria-hidden="true">-</span>
                <span>{meta.disclaimer}</span>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
