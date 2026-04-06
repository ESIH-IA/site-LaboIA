"use client";

import { MemberCard } from "@/components/governance/member-card";
import type { Person } from "@/lib/sanity/types";

type PersonCategory = "gouvernance" | "direction" | "recherche" | "conseil";

const categoryLabels: Record<PersonCategory, string> = {
  gouvernance: "Gouvernance institutionnelle",
  direction: "Direction scientifique",
  recherche: "Recherche",
  conseil: "Conseil scientifique",
};

const categoryOrder: PersonCategory[] = [
  "gouvernance",
  "direction",
  "recherche",
  "conseil",
];

function getCategory(person: Person): PersonCategory {
  const roleCategory = person.roleCategory as PersonCategory | undefined;
  if (roleCategory) return roleCategory;
  if (person.governanceGroup === "comite_scientifique") return "conseil";
  if (person.governanceGroup === "direction") return "direction";
  if (person.governanceGroup === "gouvernance") return "gouvernance";
  if (person.teamGroup === "research") return "recherche";
  return "gouvernance";
}

export function MembersGrid({
  title,
  intro,
  members,
}: {
  title: string;
  intro?: string;
  members: Person[];
}) {
  const membersByCategory = members.reduce(
    (acc, person) => {
      const cat = getCategory(person);
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(person);
      return acc;
    },
    {} as Record<PersonCategory, Person[]>,
  );

  Object.values(membersByCategory).forEach((group) => {
    group.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  });

  return (
    <section className="members-grid-section">
      <div className="members-grid-header">
        <h2 className="members-grid-title">{title}</h2>
        {intro ? (
          <div className="members-grid-intro">
            <p>{intro}</p>
          </div>
        ) : null}
      </div>

      {members.length === 0 ? (
        <div className="empty-state">
          Aucun membre configure pour cette section.
        </div>
      ) : (
        <div className="members-grid-content">
          <div className="members-grid-categories">
            {categoryOrder.map((category) => {
              const categoryMembers = membersByCategory[category];
              if (!categoryMembers || categoryMembers.length === 0) return null;

              return (
                <div key={category} className="members-category">
                  <h3 className="members-category-title">
                    {categoryLabels[category]}
                  </h3>
                  <div className="members-category-grid">
                    {categoryMembers.map((person) => (
                      <MemberCard key={person._id} person={person} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
