import { Brain, Eye, ShieldCheck, HeartPulse, Leaf, BarChart3 } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type HighlightItem = {
  title: string;
  description: string;
};

type HighlightsProps = {
  title?: string;
  intro?: string;
  items?: HighlightItem[];
  locale?: Locale;
};

const AXES_META = [
  { icon: Brain,       num: "01", color: "#00d4aa", bg: "rgba(0,212,170,0.1)",   border: "rgba(0,212,170,0.2)" },
  { icon: Eye,         num: "02", color: "#6c63ff", bg: "rgba(108,99,255,0.1)",  border: "rgba(108,99,255,0.2)" },
  { icon: ShieldCheck, num: "03", color: "#00d4aa", bg: "rgba(0,212,170,0.1)",   border: "rgba(0,212,170,0.2)" },
  { icon: HeartPulse,  num: "04", color: "#6c63ff", bg: "rgba(108,99,255,0.1)",  border: "rgba(108,99,255,0.2)" },
  { icon: Leaf,        num: "05", color: "#00d4aa", bg: "rgba(0,212,170,0.1)",   border: "rgba(0,212,170,0.2)" },
  { icon: BarChart3,   num: "06", color: "#6c63ff", bg: "rgba(108,99,255,0.1)",  border: "rgba(108,99,255,0.2)" },
];

const FALLBACK: Record<Locale, { sectionLabel: string; sectionTitle: string; sectionIntro: string; transversalLabel: string; transversalText: string; axes: HighlightItem[] }> = {
  fr: {
    sectionLabel: "Axes de recherche",
    sectionTitle: "Six axes structurants",
    sectionIntro: "Des axes de recherche appliquée et fondamentale organisés autour d'une thématique transversale : l'IA et la science des données pour le développement durable d'Haïti et de la Caraïbe.",
    transversalLabel: "Thématique transversale",
    transversalText: "Intelligence artificielle et sciences des données pour le développement durable d'Haïti et de la Caraïbe",
    axes: [
      {
        title: "Méthodes fondamentales en IA et apprentissage automatique",
        description: "Développement de méthodes adaptées aux données rares, bruitées ou hétérogènes, apprentissage auto-supervisé, transfert d'apprentissage, robustesse et IA frugale.",
      },
      {
        title: "Vision par ordinateur et analyse de données complexes",
        description: "Analyse d'images, de documents et de données multimodales, notamment pour l'agriculture, la santé, l'environnement et le traitement de documents en créole et en français.",
      },
      {
        title: "IA robuste, explicable et responsable",
        description: "Explicabilité des modèles, équité algorithmique, détection et réduction des biais, robustesse, audit des systèmes d'IA et évaluation de leurs limites.",
      },
      {
        title: "IA pour la santé",
        description: "Analyse d'images médicales, aide au dépistage et à la décision clinique, surveillance épidémiologique, assistants documentaires et interfaces sanitaires en créole haïtien.",
      },
      {
        title: "IA pour l'agriculture numérique et la résilience environnementale",
        description: "Détection des maladies des cultures, recommandations agronomiques, analyse d'images satellitaires, systèmes d'alerte précoce et adaptation au changement climatique.",
      },
      {
        title: "IA pour les systèmes socio-économiques, éducatifs et institutionnels",
        description: "Aide à la décision, transformation numérique, automatisation documentaire, traitement du créole haïtien et développement d'outils pour l'éducation, l'administration publique et l'économie.",
      },
    ],
  },
  en: {
    sectionLabel: "Research Axes",
    sectionTitle: "Six structuring axes",
    sectionIntro: "Applied and fundamental research axes organized around a transversal theme: AI and data science for the sustainable development of Haiti and the Caribbean.",
    transversalLabel: "Transversal theme",
    transversalText: "Artificial intelligence and data science for the sustainable development of Haiti and the Caribbean",
    axes: [
      {
        title: "Fundamental AI Methods and Machine Learning",
        description: "Developing methods suited to scarce, noisy or heterogeneous data, self-supervised learning, transfer learning, robustness and frugal AI.",
      },
      {
        title: "Computer Vision and Complex Data Analysis",
        description: "Image, document and multimodal data analysis, particularly for agriculture, health, environment and document processing in Haitian Creole and French.",
      },
      {
        title: "Robust, Explainable and Responsible AI",
        description: "Model explainability, algorithmic fairness, bias detection and mitigation, robustness, AI system auditing and evaluation of limitations.",
      },
      {
        title: "AI for Healthcare",
        description: "Medical image analysis, screening and clinical decision support, epidemiological surveillance, documentary assistants and health interfaces in Haitian Creole.",
      },
      {
        title: "AI for Digital Agriculture and Environmental Resilience",
        description: "Crop disease detection, agronomic recommendations, satellite image analysis, early warning systems and climate change adaptation.",
      },
      {
        title: "AI for Socioeconomic, Educational and Institutional Systems",
        description: "Decision support, digital transformation, document automation, Haitian Creole processing and tool development for education, public administration and the economy.",
      },
    ],
  },
};

export default function Highlights({ title, intro, items, locale = "fr" }: HighlightsProps) {
  const fb = FALLBACK[locale] ?? FALLBACK.fr;
  const list = items?.length === 6 ? items : fb.axes;

  return (
    <section
      id="axes-de-recherche"
      style={{ background: "var(--color-bg-light)", padding: "clamp(4rem,8vw,7rem) 0" }}
    >
      <div className="container">

        {/* En-tête */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <p className="section-label">{fb.sectionLabel}</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "var(--color-text-dark)",
                margin: 0,
              }}
            >
              {title ?? fb.sectionTitle}
            </h2>
          </div>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-body)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {intro ?? fb.sectionIntro}
          </p>
        </div>

        {/* Grille 3×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.slice(0, 6).map((item, i) => {
            const ax = AXES_META[i];
            const Icon = ax.icon;
            return (
              <article
                key={i}
                className="axe-card-light"
                style={{ position: "relative" }}
              >
                <span className="axe-number-bg">{ax.num}</span>
                <div
                  className="axe-icon-box"
                  style={{ background: ax.bg, border: `1px solid ${ax.border}`, color: ax.color }}
                >
                  <Icon size={22} strokeWidth={1.6} aria-hidden />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--color-text-dark)",
                    marginBottom: "0.6rem",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-body)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Thématique transversale */}
        <div className="axe-transversal mt-8">
          <div className="axe-transversal-bar" />
          <div>
            <p className="axe-transversal-label">{fb.transversalLabel}</p>
            <p className="axe-transversal-text">{fb.transversalText}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
