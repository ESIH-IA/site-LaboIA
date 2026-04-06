"use client";

import type { Person } from "@/data/governance/types";

interface GovernanceChartStrictProps {
  orgSectionTitle?: string;
  orgSectionIntro?: string;
  topPerson: Person;
  scientificDirectors: [Person, Person];
  associateResearchers?: Person[];
}

function PersonCard({
  person,
  color,
  onClick,
}: {
  person: Person;
  color: "red" | "blue" | "purple";
  level: "top" | "director" | "associate";
  onClick?: () => void;
}) {
  const initials = person.initials;
  const isFuture = person.status === "futur";

  return (
    <button
      type="button"
      onClick={onClick}
      className={["strict-card", `strict-card--${color}`].join(" ")}
      style={isFuture ? {opacity: 0.6} : undefined}
      aria-label={`Voir le profil de ${person.name}`}
    >
      {/* Cercle avec initiales - pas de photo dans l'organigramme */}
      <div
        className={["strict-card-avatar", isFuture ? "strict-card-avatar--future" : "strict-card-avatar--active"].join(" ")}
      >
        <div
          className={["strict-card-initials", isFuture ? "strict-card-initials--future" : "strict-card-initials--active"].join(" ")}
        >
          {initials}
        </div>
      </div>

      <div className="strict-card-info">
        <div className="strict-card-name">
          {person.name}
        </div>
        {person.roleTitle ? (
          <div className="strict-card-role">{person.roleTitle}</div>
        ) : null}
        {isFuture ? (
          <div className="strict-card-future-badge">
            À venir
          </div>
        ) : null}
      </div>
    </button>
  );
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

export function GovernanceChartStrict({
  topPerson,
  scientificDirectors,
  associateResearchers = [],
}: GovernanceChartStrictProps) {
  if (!topPerson || scientificDirectors.length !== 2) {
    return (
      <div className="empty-state">
        Configuration invalide : 1 directeur institutionnel et exactement 2 directeurs scientifiques requis.
      </div>
    );
  }

  return (
    <div className="strict-chart">
      {/* Desktop layout */}
      <div className="strict-chart-desktop">
        {/* Level 1: Top Person */}
        <div style={{width:'100%', maxWidth:'20rem'}}>
          <PersonCard
            person={topPerson}
            color="red"
            level="top"
            onClick={() => scrollToProfile(topPerson.id)}
          />
        </div>

        {/* Vertical line from top to level 2 */}
        <svg
          width="2"
          height="48"
          className="strict-chart-connector"
          aria-hidden="true"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="48"
            stroke="#cbd5e0"
            strokeWidth="2"
          />
        </svg>

        {/* Horizontal line for level 2 */}
        <svg
          width="400"
          height="2"
          className="strict-chart-connector"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="1"
            x2="400"
            y2="1"
            stroke="#cbd5e0"
            strokeWidth="2"
          />
        </svg>

        {/* Level 2: Scientific Directors */}
        <div className="strict-chart-level2">
          {scientificDirectors.map((director) => (
            <div key={director.id} className="strict-chart-level2-item">
              {/* Vertical line to card */}
              <svg
                width="2"
                height="24"
                className="strict-chart-connector"
                aria-hidden="true"
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="24"
                  stroke="#cbd5e0"
                  strokeWidth="2"
                />
              </svg>
              <PersonCard
                person={director}
                color="blue"
                level="director"
                onClick={() => scrollToProfile(director.id)}
              />
            </div>
          ))}
        </div>

        {/* Level 3: Associate Researchers */}
        {associateResearchers.length > 0 ? (
          <>
            {/* Vertical line from level 2 to level 3 */}
            <svg
              width="2"
              height="48"
              className="strict-chart-connector"
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="48"
                stroke="#cbd5e0"
                strokeWidth="2"
              />
            </svg>

            <div className="strict-chart-level3">
              <div className="strict-chart-level3-title">
                Conseil scientifique
              </div>
              <div className="strict-chart-level3-grid">
                {associateResearchers.map((researcher) => (
                  <PersonCard
                    key={researcher.id}
                    person={researcher}
                    color="purple"
                    level="associate"
                    onClick={() => scrollToProfile(researcher.id)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Mobile layout */}
      <div className="strict-chart-mobile">
        <PersonCard
          person={topPerson}
          color="red"
          level="top"
          onClick={() => scrollToProfile(topPerson.id)}
        />

        <div className="strict-mobile-indent">
          <div className="strict-mobile-indent-inner">
            {scientificDirectors.map((director) => (
              <PersonCard
                key={director.id}
                person={director}
                color="blue"
                level="director"
                onClick={() => scrollToProfile(director.id)}
              />
            ))}
          </div>
        </div>

        {associateResearchers.length > 0 ? (
          <div className="strict-mobile-indent">
            <div className="strict-mobile-level3-title">
              Conseil scientifique
            </div>
            <div className="strict-mobile-indent-inner">
              {associateResearchers.map((researcher) => (
                <PersonCard
                  key={researcher.id}
                  person={researcher}
                  color="purple"
                  level="associate"
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
