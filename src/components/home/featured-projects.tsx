const projects = [
  {
    title: "Observatoire agricole",
    description:
      "Cartographie des cultures, prévisions de rendement et alertes climatiques pour les acteurs du terrain.",
    tag: "Agriculture",
  },
  {
    title: "Plateforme d'analyse des services publics",
    description:
      "Tableaux de bord décisionnels pour améliorer l'accès et la qualité des services essentiels.",
    tag: "Gouvernance",
  },
  {
    title: "Santé communautaire augmentée",
    description:
      "Analyse de données épidémiologiques et systèmes d'alerte précoce pour la santé publique.",
    tag: "Santé",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">
              Projets à la une
            </h2>
            <p className="mt-2 max-w-2xl text-neutral-600">
              Des initiatives concrètes qui démontrent la puissance de l’IA et de la science
              des données au service des communautés.
            </p>
          </div>
          <button className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-400">
            Découvrir tous les projets
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {project.tag}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">
                {project.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
