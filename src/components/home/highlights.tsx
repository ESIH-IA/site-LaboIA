import { Brain, Eye, ShieldCheck, HeartPulse, Leaf, BarChart3 } from "lucide-react";

type HighlightItem = {
  title: string;
  description: string;
};

type HighlightsProps = {
  title?: string;
  intro?: string;
  items?: HighlightItem[];
};

const AXES = [
  { icon: <Brain size={22} strokeWidth={1.6} aria-hidden />,      num: "01", color: "var(--color-teal)" },
  { icon: <Eye size={22} strokeWidth={1.6} aria-hidden />,        num: "02", color: "#7C3AED" },
  { icon: <ShieldCheck size={22} strokeWidth={1.6} aria-hidden />, num: "03", color: "var(--color-teal)" },
  { icon: <HeartPulse size={22} strokeWidth={1.6} aria-hidden />, num: "04", color: "#7C3AED" },
  { icon: <Leaf size={22} strokeWidth={1.6} aria-hidden />,       num: "05", color: "var(--color-teal)" },
  { icon: <BarChart3 size={22} strokeWidth={1.6} aria-hidden />,  num: "06", color: "#7C3AED" },
];

const fallbackItems: HighlightItem[] = [
  {
    title: "Méthodes fondamentales en IA",
    description:
      "Apprentissage avec peu de données, transfert de connaissances, auto-supervision et modèles robustes adaptés aux environnements à ressources limitées.",
  },
  {
    title: "Vision par ordinateur & données complexes",
    description:
      "Analyse d'images, de documents et de données multimodales — agriculture, santé, environnement, créole haïtien.",
  },
  {
    title: "IA robuste, explicable & responsable",
    description:
      "Explicabilité des modèles, équité algorithmique, réduction des biais et audit des systèmes d'IA de confiance.",
  },
  {
    title: "IA pour la santé",
    description:
      "Analyse d'images médicales, aide au dépistage, surveillance épidémiologique et outils d'information sanitaire en créole haïtien.",
  },
  {
    title: "IA pour l'agriculture & l'environnement",
    description:
      "Détection des maladies des cultures, recommandation agronomique, images satellitaires et systèmes d'alerte précoce climatique.",
  },
  {
    title: "IA pour les systèmes socio-économiques",
    description:
      "Aide à la décision, automatisation documentaire, transformation numérique des institutions et outils éducatifs en créole haïtien.",
  },
];

export default function Highlights({ title, intro, items }: HighlightsProps) {
  const list = items?.length ? items : fallbackItems;

  return (
    <section
      id="axes-de-recherche"
      style={{ background: "var(--color-bg-light)", padding: "clamp(4rem,8vw,7rem) 0" }}
    >
      <div className="container">
        {/* En-tête 2 colonnes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "end",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <div className="section-label">Axes de recherche</div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--color-text-dark)",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {title ?? "Six axes structurants"}
            </h2>
          </div>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-body)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {intro ??
              "Des axes de recherche appliquée et fondamentale organisés autour d'une thématique transversale : l'IA et la science des données pour le développement durable d'Haïti et de la Caraïbe."}
          </p>
        </div>

        {/* Grille 3×2 égales */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {list.slice(0, 6).map((item, i) => {
            const ax = AXES[i];
            return (
              <article key={item.title} className="axe-card-light">
                <span className="axe-number-bg">{ax.num}</span>

                <div
                  className="axe-icon-box"
                  style={{
                    background: `${ax.color}1A`,
                    border: `1px solid ${ax.color}33`,
                    color: ax.color,
                  }}
                >
                  {ax.icon}
                </div>

                <h3 className="axe-title-dark">{item.title}</h3>
                <p className="axe-desc-body">{item.description}</p>
              </article>
            );
          })}
        </div>

        {/* Thématique transversale */}
        <div className="axe-transversal">
          <div className="axe-transversal-bar" />
          <div>
            <div className="axe-transversal-label">Thématique transversale</div>
            <p className="axe-transversal-text">
              Intelligence artificielle et sciences de données pour le développement durable d'Haïti et de la Caraïbe
            </p>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          #axes-de-recherche [style*="repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; }
          #axes-de-recherche [style*="repeat(3"] > article:last-child { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          #axes-de-recherche [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
          #axes-de-recherche [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          #axes-de-recherche [style*="repeat(3"] > article:last-child { grid-column: 1; }
        }
      `}</style>
    </section>
  );
}
