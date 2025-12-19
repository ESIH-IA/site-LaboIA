const publications = [
  {
    title: "Détection d'anomalies climatiques en milieu tropical",
    source: "Journal of Climate Analytics, 2024",
  },
  {
    title: "IA frugale pour la gestion des services publics",
    source: "Revue Data & Gouvernance, 2023",
  },
  {
    title: "Modèles prédictifs pour la sécurité alimentaire",
    source: "Conférence AI4Good, 2023",
  },
];

export default function PublicationsPreview() {
  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Publications récentes</h2>
            <p className="mt-2 text-white/70">
              Articles, rapports et communications qui documentent nos avancées scientifiques.
            </p>
          </div>
          <button className="rounded-full border border-white/40 px-4 py-2 text-sm font-medium text-white transition hover:border-white/70">
            Voir toutes les publications
          </button>
        </div>

        <div className="mt-8 grid gap-4">
          {publications.map((publication) => (
            <div
              key={publication.title}
              className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-base font-semibold">{publication.title}</h3>
              <p className="text-sm text-white/60">{publication.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
