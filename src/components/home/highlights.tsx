const highlights = [
  {
    title: "Recherche fondamentale",
    description:
      "Nouveaux modèles d'apprentissage, architectures frugales et méthodes explicables adaptées aux contraintes locales.",
  },
  {
    title: "Recherche appliquée",
    description:
      "Solutions IA pour l'agriculture, la santé, les services publics et la gestion des risques.",
  },
  {
    title: "Open science & data",
    description:
      "Production de datasets, outils open source et diffusion de la connaissance scientifique.",
  },
];

export default function Highlights() {
  return (
    <section className="bg-neutral-100/60">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Ce que nous faisons
          </h2>
          <p className="mt-3 text-neutral-600">
            Des axes de recherche appliquée et fondamentale qui valorisent l’IA au service
            des besoins locaux et des enjeux globaux.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-neutral-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
