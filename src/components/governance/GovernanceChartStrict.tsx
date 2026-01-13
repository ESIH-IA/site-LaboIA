"use client";

import type { Person } from "@/data/governance/types";

interface GovernanceChartStrictProps {
  orgSectionTitle?: string;
  orgSectionIntro?: string;
  topPerson: Person;
  coFounders: [Person, Person];
  associateResearchers?: Person[];
}

function PersonCard({
  person,
  borderColor,
  onClick,
}: {
  person: Person;
  borderColor: string;
  level: "top" | "cofounder" | "associate";
  onClick?: () => void;
}) {
  const initials = person.initials;
  const isFuture = person.status === "futur";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col items-center rounded-2xl border-2 bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full",
        borderColor,
        isFuture ? "opacity-60" : "",
      ].join(" ")}
      aria-label={`Voir le profil de ${person.name}`}
    >
      {/* Cercle avec initiales - pas de photo dans l'organigramme */}
      <div
        className={[
          "relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2",
          isFuture ? "bg-surface-muted ring-border" : "bg-primary/10 ring-primary/20",
        ].join(" ")}
      >
        <div
          className={[
            "flex h-full w-full items-center justify-center text-lg font-bold",
            isFuture ? "text-muted" : "text-primary",
          ].join(" ")}
        >
          {initials}
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-base font-semibold text-foreground">
          {person.name}
        </div>
        {person.roleTitle ? (
          <div className="mt-1 text-sm text-muted">{person.roleTitle}</div>
        ) : null}
        {isFuture ? (
          <div className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
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
  coFounders,
  associateResearchers = [],
}: GovernanceChartStrictProps) {
  if (!topPerson || coFounders.length !== 2) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted">
        Configuration invalide : 1 directeur général et exactement 2 co-fondateurs requis.
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-10">
      {/* Desktop layout */}
      <div className="hidden flex-col items-center md:flex">
        {/* Level 1: Top Person */}
        <div className="w-full max-w-xs">
          <PersonCard
            person={topPerson}
            borderColor="border-red-500"
            level="top"
            onClick={() => scrollToProfile(topPerson.id)}
          />
        </div>

        {/* Vertical line from top to level 2 */}
        <svg
          width="2"
          height="48"
          className="my-4"
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
          className="mb-4"
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

        {/* Level 2: Co-Founders */}
        <div className="grid w-full max-w-4xl grid-cols-2 gap-8">
          {coFounders.map((coFounder) => (
            <div key={coFounder.id} className="flex flex-col items-center">
              {/* Vertical line to card */}
              <svg
                width="2"
                height="24"
                className="mb-4"
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
                person={coFounder}
                borderColor="border-blue-500"
                level="cofounder"
                onClick={() => scrollToProfile(coFounder.id)}
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
              className="my-4"
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

            <div className="w-full text-center">
              <div className="mb-6 text-sm font-semibold text-muted">
                Conseil scientifique
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {associateResearchers.map((researcher) => (
                  <PersonCard
                    key={researcher.id}
                    person={researcher}
                    borderColor="border-purple-500"
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
      <div className="flex flex-col gap-6 md:hidden">
        <PersonCard
          person={topPerson}
          borderColor="border-red-500"
          level="top"
          onClick={() => scrollToProfile(topPerson.id)}
        />

        <div className="border-l-2 border-border pl-6">
          <div className="flex flex-col gap-6">
            {coFounders.map((coFounder) => (
              <PersonCard
                key={coFounder.id}
                person={coFounder}
                borderColor="border-blue-500"
                level="cofounder"
                onClick={() => scrollToProfile(coFounder.id)}
              />
            ))}
          </div>
        </div>

        {associateResearchers.length > 0 ? (
          <div className="border-l-2 border-border pl-6">
            <div className="mb-4 text-sm font-semibold text-muted">
              Conseil scientifique
            </div>
            <div className="flex flex-col gap-6">
              {associateResearchers.map((researcher) => (
                <PersonCard
                  key={researcher.id}
                  person={researcher}
                  borderColor="border-purple-500"
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
