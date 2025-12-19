const kpis = [
  { label: "Projets actifs", value: "12" },
  { label: "Publications", value: "48" },
  { label: "Partenaires", value: "18" },
  { label: "Étudiants impliqués", value: "60+" },
];

export default function Kpis() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="text-3xl font-semibold text-neutral-900">
              {item.value}
            </div>
            <div className="mt-2 text-sm text-neutral-600">{item.label}</div>
            <div className="mt-4 h-1 w-10 rounded-full bg-emerald-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
