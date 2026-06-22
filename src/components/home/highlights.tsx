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
  {
    icon: <Brain size={22} color="#00d4aa" strokeWidth={1.6} aria-hidden />,
    iconBg: "rgba(0,212,170,0.1)",
    iconBorder: "rgba(0,212,170,0.2)",
    numColor: "#00d4aa",
    num: "01",
  },
  {
    icon: <Eye size={22} color="#6c63ff" strokeWidth={1.6} aria-hidden />,
    iconBg: "rgba(108,99,255,0.1)",
    iconBorder: "rgba(108,99,255,0.2)",
    numColor: "#6c63ff",
    num: "02",
  },
  {
    icon: <ShieldCheck size={22} color="#00d4aa" strokeWidth={1.6} aria-hidden />,
    iconBg: "rgba(0,212,170,0.1)",
    iconBorder: "rgba(0,212,170,0.2)",
    numColor: "#00d4aa",
    num: "03",
  },
  {
    icon: <HeartPulse size={22} color="#6c63ff" strokeWidth={1.6} aria-hidden />,
    iconBg: "rgba(108,99,255,0.1)",
    iconBorder: "rgba(108,99,255,0.2)",
    numColor: "#6c63ff",
    num: "04",
  },
  {
    icon: <Leaf size={22} color="#00d4aa" strokeWidth={1.6} aria-hidden />,
    iconBg: "rgba(0,212,170,0.1)",
    iconBorder: "rgba(0,212,170,0.2)",
    numColor: "#00d4aa",
    num: "05",
  },
  {
    icon: <BarChart3 size={22} color="#6c63ff" strokeWidth={1.6} aria-hidden />,
    iconBg: "rgba(108,99,255,0.1)",
    iconBorder: "rgba(108,99,255,0.2)",
    numColor: "#6c63ff",
    num: "06",
  },
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
    <section className="section-labo-surface section-padding" id="axes-de-recherche">
      <div className="container-site">

        {/* En-tête */}
        <div className="max-w-2xl mb-14">
          <div className="badge-teal inline-flex mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa]" />
            Axes de recherche
          </div>
          <h2 className="text-display-lg text-[#f0f4ff]">
            {title ?? "Six axes structurants"}
          </h2>
          <p className="mt-4 text-[#8892b0] leading-relaxed">
            {intro ??
              "Des axes de recherche appliquée et fondamentale organisés autour d'une thématique transversale : l'IA et la science des données pour le développement durable d'Haïti et de la Caraïbe."}
          </p>
        </div>

        {/* Grille 3×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.slice(0, 6).map((item, i) => {
            const ax = AXES[i];
            return (
              <article
                key={item.title}
                className="glass-labo-hover rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: ax.iconBg,
                      border: `1px solid ${ax.iconBorder}`,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {ax.icon}
                  </div>
                  <span
                    className="label-eyebrow"
                    style={{ color: ax.numColor }}
                  >
                    {ax.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#f0f4ff] text-[1rem] leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8892b0] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Thématique transversale */}
        <div
          className="mt-10 rounded-2xl px-6 py-5 flex items-center gap-4"
          style={{
            background: "rgba(0,212,170,0.05)",
            border: "1px solid rgba(0,212,170,0.15)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 40,
              borderRadius: 3,
              background: "linear-gradient(180deg,#00d4aa,#6c63ff)",
              flexShrink: 0,
            }}
          />
          <div>
            <p
              className="text-[0.68rem] uppercase tracking-[0.14em] text-[#00d4aa] mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Thématique transversale
            </p>
            <p className="text-[#f0f4ff] text-sm font-medium leading-snug">
              Intelligence artificielle et sciences de données pour le développement durable d'Haïti et de la Caraïbe
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
