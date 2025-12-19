const partners = [
  "ESIH",
  "Université",
  "Ministères",
  "ONG",
  "Industrie",
  "Startups",
];

export default function Partners() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">
              Partenaires & collaborations
            </h2>
            <p className="mt-2 text-neutral-600">
              Nous travaillons avec des institutions académiques, publiques et privées pour
              accélérer l’impact de la recherche.
            </p>
          </div>
          <button className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-400">
            Devenir partenaire
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner}
              className="rounded-xl border border-dashed border-neutral-200 bg-white p-6 text-center text-sm font-medium text-neutral-700"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
