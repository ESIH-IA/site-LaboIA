import { kpiMeta, kpis } from "@/content/kpis";

const statusLabels = {
  draft: "Données provisoires",
  confirmed: "Données validées",
} as const;

export default function Kpis() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
          >
            <div className="text-3xl font-semibold text-neutral-900">
              {item.value}
            </div>
            <div className="mt-2 text-sm text-neutral-600">{item.label}</div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-600">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  item.status === "confirmed" ? "bg-emerald-500" : "bg-amber-400"
                }`}
                aria-hidden
              />
              {statusLabels[item.status]}
            </div>
            {item.note ? (
              <p className="mt-3 text-xs text-neutral-500">{item.note}</p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 pb-4 text-xs text-neutral-500">
        <span className="font-medium text-neutral-700">Dernière mise à jour :</span>
        <span>{kpiMeta.lastUpdated}</span>
        <span aria-hidden="true">•</span>
        <span>{kpiMeta.disclaimer}</span>
      </div>
    </section>
  );
}
