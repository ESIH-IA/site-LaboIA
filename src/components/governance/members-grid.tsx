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
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
        >
          {title}
        </h2>
        {intro ? (
          <p style={{ color: "var(--labo-text-muted)" }}>{intro}</p>
        ) : null}
      </div>

      {members.length === 0 ? (
        <div
          className="mt-8 rounded-xl p-6 text-sm"
          style={{
            border: "1px dashed var(--labo-border)",
            background: "var(--labo-surface)",
            color: "var(--labo-text-muted)",
          }}
        >
          Aucun membre configure pour cette section.
        </div>
      ) : (
        <div className="w-full space-y-16">
          {categoryOrder.map((category) => {
            const categoryMembers = membersByCategory[category];
            if (!categoryMembers || categoryMembers.length === 0) return null;

            return (
              <div key={category} className="flex flex-col items-center">
                <h3
                  className="mb-8 text-sm font-semibold uppercase tracking-widest"
                  style={{
                    color: "rgba(136,146,176,0.55)",
                    fontFamily: "var(--font-mono, monospace)",
                    letterSpacing: "0.18em",
                  }}
                >
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