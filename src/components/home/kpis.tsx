import type { KpiItem, KpiSettings } from "@/lib/sanity/types";

type KpisProps = {
  title?: string;
  intro?: string;
  items: KpiItem[];
  meta?: KpiSettings;
};

const statusLabels = {
  draft: "Donn\u00e9es provisoires",
  confirmed: "Donn\u00e9es valid\u00e9es",
} as const;

export default function Kpis({ title, intro, items, meta }: KpisProps) {
  return (
    <section className="relative bg-slate-50 py-20">
      {/* Dot pattern subtil */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {title ?? "Indicateurs cl\u00e9s"}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {intro ??
              "Donn\u00e9es quantitatives sur nos activit\u00e9s de recherche et d'innovation"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Gradient top accent */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="text-4xl font-bold gradient-text-cyan">
                {item.value}
              </div>
              <div className="mt-3 text-sm font-medium text-slate-700">{item.label}</div>

              {/* Status badge */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    item.status === "confirmed" ? "bg-emerald-500 animate-glow" : "bg-amber-400"
                  }`}
                  aria-hidden
                />
                <span className="text-slate-600">{statusLabels[item.status]}</span>
              </div>

              {item.note ? (
                <p className="mt-4 text-xs leading-relaxed text-slate-500">{item.note}</p>
              ) : null}
            </div>
          ))}
        </div>

        {meta?.lastUpdated || meta?.disclaimer ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            {meta?.lastUpdated ? (
              <>
                <span className="font-semibold text-slate-700">Derni\u00e8re mise \u00e0 jour :</span>
                <span>{meta.lastUpdated}</span>
              </>
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
