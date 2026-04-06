type HighlightItem = {
  title: string;
  description: string;
};

type HighlightsProps = {
  title?: string;
  intro?: string;
  items?: HighlightItem[];
};

const fallbackItems: HighlightItem[] = [
  {
    title: "Agriculture intelligente",
    description:
      "Systèmes de prédiction des rendements, monitoring des cultures et alertes précoces basées sur la donnée.",
  },
  {
    title: "Services publics & gouvernance",
    description:
      "Optimisation des services essentiels, observatoires de données et aide à la décision.",
  },
  {
    title: "Santé & environnement",
    description:
      "Analyse de données épidémiologiques, détection de risques et modélisation de scénarios.",
  },
];

export default function Highlights({ title, intro, items }: HighlightsProps) {
  const list = items?.length ? items : fallbackItems;

  return (
    <section className="highlights section">
      {/* Subtle background pattern */}
      <div className="section-pattern dot-pattern pattern-30" />

      <div className="section-inner" style={{ position: "relative", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="section-header">
          <h2 className="section-title">
            {title ?? "Ce que nous faisons"}
          </h2>
          <p className="section-subtitle" style={{ marginTop: "1rem" }}>
            {intro ??
              "Des axes de recherche appliquée et fondamentale qui valorisent l'IA au service des besoins locaux et des enjeux globaux."}
          </p>
        </div>
        <div className="card-grid card-grid-3" style={{ marginTop: "3rem" }}>
          {list.map((item, index) => (
            <article
              key={item.title}
              className="highlights-card card-hover"
            >
              {/* Top accent gradient */}
              <div className="card-accent-top" />

              {/* Number badge */}
              <div className="highlights-number">
                <span>
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
