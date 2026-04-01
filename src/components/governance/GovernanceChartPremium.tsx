"use client";

import type { Person } from "@/data/governance/types";

interface GovernanceChartPremiumProps {
  topPerson: Person;
  scientificDirectors: [Person, Person];
  associateResearchers?: Person[];
}

/**
 * Fonction pour scroller vers un profil spécifique
 */
function scrollToProfile(personId: string) {
  const element = document.getElementById(`profile-${personId}`);
  if (element) {
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

/**
 * Carte premium avec deux zones de couleur
 */
function PremiumCard({
  person,
  level,
  onClick,
}: {
  person: Person;
  level: "gouvernance" | "direction" | "conseil";
  onClick?: () => void;
}) {
  const isFuture = person.status === "futur";

  // Palette tech/IA moderne
  const colorSchemes = {
    gouvernance: {
      top: "bg-linear-to-br from-slate-600 to-slate-700",
      topHover: "group-hover:from-slate-500 group-hover:to-slate-600",
      ring: "ring-slate-200",
      shadow: "group-hover:shadow-cyan-500/10",
      text: "gradient-text-cyan",
      accent: "from-slate-500 to-slate-600",
    },
    direction: {
      top: "bg-linear-to-br from-cyan-500 to-teal-600",
      topHover: "group-hover:from-cyan-400 group-hover:to-teal-500",
      ring: "ring-cyan-200",
      shadow: "group-hover:shadow-cyan-500/20",
      text: "gradient-text-cyan",
      accent: "from-cyan-500 to-teal-500",
    },
    conseil: {
      top: "bg-linear-to-br from-violet-600 to-violet-700",
      topHover: "group-hover:from-violet-500 group-hover:to-violet-600",
      ring: "ring-violet-200",
      shadow: "group-hover:shadow-violet-500/15",
      text: "gradient-text-accent",
      accent: "from-violet-500 to-cyan-500",
    },
  };

  const colors = colorSchemes[level];
  const isGouvernance = level === "gouvernance";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl gradient-card-bg border shadow-lg ring-1 transition-smooth",
        "hover:-translate-y-2 hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30",
        colors.ring,
        colors.shadow,
        isFuture ? "opacity-60" : "",
        "w-full",
      ].join(" ")}
      aria-label={`Voir le profil de ${person.name}`}
    >
      {/* Accent Bar Top */}
      <div className={`absolute left-0 right-0 top-0 h-1 bg-linear-to-r ${colors.accent}`} />

      {/* Zone haute — Gradient moderne avec initiales */}
      <div
        className={[
          "relative flex items-center justify-center transition-all duration-500",
          colors.top,
          colors.topHover,
          isGouvernance ? "h-36" : "h-32",
        ].join(" ")}
      >
        {/* Cercle avec initiales */}
        <div
          className={[
            "flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-4 ring-white/40 shadow-2xl",
            isGouvernance ? "h-24 w-24" : "h-20 w-20",
          ].join(" ")}
        >
          <span
            className={[
              "font-bold text-white",
              isGouvernance ? "text-3xl" : "text-2xl",
            ].join(" ")}
          >
            {person.initials}
          </span>
        </div>

        {/* Badge "À venir" en haut à droite */}
        {isFuture ? (
          <div className="absolute right-4 top-4 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-amber-900 shadow-lg">
            À venir
          </div>
        ) : null}
      </div>

      {/* Zone basse — Fond clair avec texte */}
      <div className="flex flex-col items-center bg-white px-6 py-6 text-center">
        <h3
          className={[
            "font-bold text-slate-900 transition-all",
            isGouvernance ? "text-xl mb-3" : "text-lg mb-2",
            `group-hover:${colors.text}`,
          ].join(" ")}
        >
          {person.name}
        </h3>
        {person.roleTitle ? (
          <p className="text-sm font-medium text-slate-600 leading-relaxed">
            {person.roleTitle}
          </p>
        ) : null}
        {person.affiliation ? (
          <p className="mt-1.5 text-xs text-slate-500 italic">
            {person.affiliation}
          </p>
        ) : null}
      </div>
    </button>
  );
}

/**
 * Ligne de connexion SVG
 */
function ConnectionLine({
  orientation = "vertical",
  length = 48,
}: {
  orientation?: "vertical" | "horizontal";
  length?: number;
}) {
  return (
    <svg
      width={orientation === "horizontal" ? length : 2}
      height={orientation === "horizontal" ? 2 : length}
      className="shrink-0"
      aria-hidden="true"
    >
      <line
        x1={orientation === "horizontal" ? 0 : 1}
        y1={orientation === "horizontal" ? 1 : 0}
        x2={orientation === "horizontal" ? length : 1}
        y2={orientation === "horizontal" ? 1 : length}
        stroke="#cbd5e0"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export function GovernanceChartPremium({
  topPerson,
  scientificDirectors,
  associateResearchers = [],
}: GovernanceChartPremiumProps) {
  if (!topPerson || scientificDirectors.length !== 2) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-base text-slate-600">
          Configuration invalide : 1 directeur institutionnel et exactement 2 directeurs scientifiques requis.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-16">
      {/* Desktop layout */}
      <div className="hidden flex-col items-center md:flex w-full">
        {/* Niveau 1 : Gouvernance institutionnelle — Carte dominante centrée */}
        <div className="flex justify-center w-full mb-12">
          <div className="w-full max-w-sm">
            <PremiumCard
              person={topPerson}
              level="gouvernance"
              onClick={() => scrollToProfile(topPerson.id)}
            />
          </div>
        </div>

        {/* Connexion verticale */}
        <ConnectionLine orientation="vertical" length={48} />

        {/* Ligne horizontale pour niveau 2 */}
        <ConnectionLine orientation="horizontal" length={400} />

        {/* Niveau 2 : Direction scientifique — Deux cartes équilibrées centrées */}
        <div className="flex justify-center w-full mt-8 mb-16">
          <div className="grid grid-cols-2 gap-16 max-w-4xl">
            {scientificDirectors.map((director) => (
              <div key={director.id} className="flex flex-col items-center">
                {/* Ligne verticale vers la carte */}
                <ConnectionLine orientation="vertical" length={32} />
                <div className="mt-6 w-full max-w-xs">
                  <PremiumCard
                    person={director}
                    level="direction"
                    onClick={() => scrollToProfile(director.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Niveau 3 : Conseil scientifique — Style tech moderne */}
        {associateResearchers.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            {/* Ligne de séparation moderne */}
            <div className="mb-16 flex items-center justify-center gap-4">
              <div className="h-1 w-24 rounded-full bg-linear-to-r from-transparent via-violet-400 to-transparent opacity-60" />
              <span className="rounded-full border border-violet-200 bg-violet-50/50 px-6 py-2 text-sm font-bold uppercase tracking-wider text-violet-700">
                Conseil scientifique
              </span>
              <div className="h-1 w-24 rounded-full bg-linear-to-r from-transparent via-violet-400 to-transparent opacity-60" />
            </div>

            {/* Cartes conseil — Centré avec espacement large */}
            <div className="flex justify-center gap-12 max-w-5xl">
              {associateResearchers.map((researcher) => (
                <div key={researcher.id} className="w-full max-w-72">
                  <PremiumCard
                    person={researcher}
                    level="conseil"
                    onClick={() => scrollToProfile(researcher.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-8 md:hidden">
        <PremiumCard
          person={topPerson}
          level="gouvernance"
          onClick={() => scrollToProfile(topPerson.id)}
        />

        <div className="border-l-2 border-dashed border-slate-300 pl-6">
          <div className="flex flex-col gap-8">
            {scientificDirectors.map((director) => (
              <PremiumCard
                key={director.id}
                person={director}
                level="direction"
                onClick={() => scrollToProfile(director.id)}
              />
            ))}
          </div>
        </div>

        {associateResearchers.length > 0 ? (
          <div className="mt-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-1 flex-1 rounded-full bg-linear-to-r from-transparent via-violet-300 to-violet-300" />
              <span className="rounded-full border border-violet-200 bg-violet-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
                Conseil scientifique
              </span>
              <div className="h-1 flex-1 rounded-full bg-linear-to-r from-violet-300 via-violet-300 to-transparent" />
            </div>
            <div className="flex flex-col gap-8">
              {associateResearchers.map((researcher) => (
                <PremiumCard
                  key={researcher.id}
                  person={researcher}
                  level="conseil"
                  onClick={() => scrollToProfile(researcher.id)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
