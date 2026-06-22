import { Building2, Globe, Users, GraduationCap } from "lucide-react";

const roles = [
  {
    icon: <Building2 size={22} color="#6c63ff" strokeWidth={1.8} aria-hidden />,
    iconBg: "rgba(108,99,255,0.15)",
    iconBorder: "rgba(108,99,255,0.3)",
    title: "Direction & ancrage institutionnel",
    badgeColor: "#6c63ff",
    badgeBg: "rgba(108,99,255,0.1)",
    badgeBorder: "rgba(108,99,255,0.25)",
    badgeLabel: "1 directeur",
    description:
      "Direction institutionnelle assurant la cohérence scientifique, l'inscription dans l'ESIH et le développement des capacités du laboratoire.",
    tags: [],
  },
  {
    icon: <Globe size={22} color="#00d4aa" strokeWidth={1.8} aria-hidden />,
    iconBg: "rgba(0,212,170,0.12)",
    iconBorder: "rgba(0,212,170,0.28)",
    title: "Chercheurs associés à l'international",
    badgeColor: "#00d4aa",
    badgeBg: "rgba(0,212,170,0.1)",
    badgeBorder: "rgba(0,212,170,0.25)",
    badgeLabel: "2 chercheurs",
    description:
      "Expertises mobilisées depuis Nice et Bruxelles pour le rayonnement international du laboratoire.",
    tags: ["Big Data", "NO-SQL", "IoT", "Systèmes mobiques", "Innovation", "Prospective", "Systèmes complexes", "Décision"],
  },
  {
    icon: <Users size={22} color="#00d4aa" strokeWidth={1.8} aria-hidden />,
    iconBg: "rgba(0,212,170,0.12)",
    iconBorder: "rgba(0,212,170,0.28)",
    title: "Chercheurs associés en Haïti",
    badgeColor: "#00d4aa",
    badgeBg: "rgba(0,212,170,0.1)",
    badgeBorder: "rgba(0,212,170,0.25)",
    badgeLabel: "3 chercheurs",
    description:
      "Expertises complémentaires couvrant l'environnement, l'économie institutionnelle et l'agriculture intelligente.",
    tags: ["Changement climatique", "Écohydrologie", "Risque environnemental", "Économie institutionnelle", "Entrepreneuriat agricole", "Gouvernance", "Agriculture & IA", "Agroécologie"],
  },
  {
    icon: <GraduationCap size={22} color="#6c63ff" strokeWidth={1.8} aria-hidden />,
    iconBg: "rgba(108,99,255,0.15)",
    iconBorder: "rgba(108,99,255,0.3)",
    title: "Jeunes chercheurs en formation",
    badgeColor: "#6c63ff",
    badgeBg: "rgba(108,99,255,0.1)",
    badgeBorder: "rgba(108,99,255,0.25)",
    badgeLabel: "2 jeunes pros",
    description:
      "Diplômés de niveau Master, engagés dans la vie professionnelle et contribuant activement aux projets et expérimentations du laboratoire.",
    tags: ["Intelligence artificielle", "Apprentissage automatique", "Systèmes multi-agents", "Agriculture numérique"],
  },
];

const stats = [
  { value: "9",  label: "Membres mobilisés" },
  { value: "5",  label: "Chercheurs associés" },
  { value: "2",  label: "Espaces de collaboration" },
  { value: "M2", label: "Niveau des jeunes diplômés" },
];

export default function Community() {
  return (
    <section className="section-labo-surface section-padding" id="notre-communaute">
      <div className="container-site">

        {/* En-tête */}
        <div className="mb-16 max-w-2xl">
          <div className="badge-violet inline-flex mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6c63ff]" aria-hidden />
            &nbsp;COMMUNAUTÉ
          </div>
          <h2 className="text-display-lg text-[#f0f4ff]">
            Une équipe scientifique ancrée en Haïti et ouverte sur le monde
          </h2>
          <p className="mt-4 text-[#8892b0] leading-relaxed max-w-xl">
            LaCDIA réunit progressivement des compétences scientifiques, techniques et
            institutionnelles engagées dans le développement d'une recherche en intelligence
            artificielle et en science des données adaptée aux réalités haïtiennes et caribéennes.
          </p>
        </div>

        {/* Grille 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {roles.map((r) => (
            <div
              key={r.title}
              className="glass-labo-hover rounded-2xl p-6 flex flex-col gap-4"
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: r.iconBg,
                  border: `1px solid ${r.iconBorder}`,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {r.icon}
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-[#f0f4ff] mb-1.5">
                  {r.title}
                </h3>
                <span
                  className="inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.12em] rounded-full px-3 py-0.5 mb-3"
                  style={{
                    color: r.badgeColor,
                    background: r.badgeBg,
                    border: `1px solid ${r.badgeBorder}`,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {r.badgeLabel}
                </span>
                <p className="text-sm text-[#8892b0] leading-relaxed">
                  {r.description}
                </p>
                {r.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Barre de stats */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 overflow-hidden rounded-2xl border"
          style={{
            background: "rgba(255,255,255,0.07)",
            borderColor: "rgba(255,255,255,0.08)",
            gap: 1,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(17,24,39,0.8)",
                padding: "28px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: 8,
                  background: "linear-gradient(135deg,#00d4aa,#6c63ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#8892b0",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Note institutionnelle */}
        <p
          className="mt-6 text-center"
          style={{
            fontSize: "0.78rem",
            color: "rgba(136,146,176,0.6)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.05em",
          }}
        >
          Les rattachements individuels et les responsabilités scientifiques sont établis
          conformément aux procédures institutionnelles de LaCDIA.
        </p>

      </div>
    </section>
  );
}
