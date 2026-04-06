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
  const isGouvernance = level === "gouvernance";

  const accentGradient =
    level === "gouvernance"
      ? "linear-gradient(to right, #64748b, #475569)"
      : level === "direction"
        ? "linear-gradient(to right, #06b6d4, #14b8a6)"
        : "linear-gradient(to right, #8b5cf6, #06b6d4)";

  return (
    <button
      type="button"
      onClick={onClick}
      className={["premium-card", isFuture ? "premium-card-opacity" : ""].join(" ")}
      aria-label={`Voir le profil de ${person.name}`}
    >
      {/* Accent Bar Top */}
      <div className="premium-card-accent" style={{background: accentGradient}} />

      {/* Zone haute — Gradient moderne avec initiales */}
      <div className={`premium-card-top premium-card-top--${level}`}>
        {/* Cercle avec initiales */}
        <div className={`premium-card-avatar ${isGouvernance ? "premium-card-avatar--lg" : "premium-card-avatar--md"}`}>
          <span className={`premium-card-initials ${isGouvernance ? "premium-card-initials--lg" : "premium-card-initials--md"}`}>
            {person.initials}
          </span>
        </div>

        {/* Badge "À venir" en haut à droite */}
        {isFuture ? (
          <div className="premium-card-future-badge">
            À venir
          </div>
        ) : null}
      </div>

      {/* Zone basse — Fond clair avec texte */}
      <div className="premium-card-bottom">
        <h3 className={`premium-card-name ${isGouvernance ? "premium-card-name--lg" : "premium-card-name--md"}`}>
          {person.name}
        </h3>
        {person.roleTitle ? (
          <p className="premium-card-role">
            {person.roleTitle}
          </p>
        ) : null}
        {person.affiliation ? (
          <p className="premium-card-affiliation">
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
      <div className="empty-state">
        <p>
          Configuration invalide : 1 directeur institutionnel et exactement 2 directeurs scientifiques requis.
        </p>
      </div>
    );
  }

  return (
    <div className="gov-chart">
      {/* Desktop layout */}
      <div className="gov-chart-desktop">
        {/* Niveau 1 : Gouvernance institutionnelle — Carte dominante centrée */}
        <div className="gov-level-1">
          <div style={{width:'100%', maxWidth:'24rem'}}>
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
        <div className="gov-level-2">
          <div className="gov-level-2-grid">
            {scientificDirectors.map((director) => (
              <div key={director.id} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                {/* Ligne verticale vers la carte */}
                <ConnectionLine orientation="vertical" length={32} />
                <div style={{marginTop:'1.5rem', width:'100%', maxWidth:'20rem'}}>
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
          <div className="gov-level-3">
            {/* Ligne de séparation moderne */}
            <div className="gov-separator">
              <div className="gov-separator-line" />
              <span className="gov-separator-label">
                Conseil scientifique
              </span>
              <div className="gov-separator-line" />
            </div>

            {/* Cartes conseil — Centré avec espacement large */}
            <div className="gov-level-3-grid">
              {associateResearchers.map((researcher) => (
                <div key={researcher.id} style={{width:'100%', maxWidth:'18rem'}}>
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
      <div className="gov-chart-mobile">
        <PremiumCard
          person={topPerson}
          level="gouvernance"
          onClick={() => scrollToProfile(topPerson.id)}
        />

        <div className="gov-mobile-indent">
          <div className="gov-mobile-indent-inner">
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
          <div style={{marginTop:'2rem'}}>
            <div className="gov-separator">
              <div className="gov-separator-line" />
              <span className="gov-separator-label">
                Conseil scientifique
              </span>
              <div className="gov-separator-line" />
            </div>
            <div className="gov-mobile-indent-inner">
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
