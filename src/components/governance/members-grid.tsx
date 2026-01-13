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
    <section className="mt-16 flex flex-col items-center">
      <div className="max-w-3xl text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
        {intro ? (
          <div className="text-muted">
            <p>{intro}</p>
          </div>
        ) : null}
      </div>

      {members.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-muted">
          Aucun membre configure pour cette section.
        </div>
      ) : (
        <div className="w-full space-y-16">
          {categoryOrder.map((category) => {
            const categoryMembers = membersByCategory[category];
            if (!categoryMembers || categoryMembers.length === 0) return null;

            return (
              <div key={category} className="flex flex-col items-center">
                <h3 className="mb-8 text-xl font-semibold text-foreground uppercase tracking-wide">
                  {categoryLabels[category]}
                </h3>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                  {categoryMembers.map((person) => (
                    <MemberCard key={person._id} person={person} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
