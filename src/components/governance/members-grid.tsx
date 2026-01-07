"use client";

import type { PortableTextBlock } from "@portabletext/types";
import { useMemo, useState } from "react";

import PortableTextRenderer from "@/components/content/portable-text";
import { MemberCard } from "@/components/governance/member-card";
import type { Person } from "@/lib/sanity/types";

function groupLabel(group: Person["governanceGroup"]) {
  switch (group) {
    case "direction":
      return "Direction";
    case "gouvernance":
      return "Gouvernance";
    case "comite_scientifique":
      return "Comité scientifique";
    default:
      return null;
  }
}

export function MembersGrid({
  title,
  intro,
  members,
}: {
  title: string;
  intro?: PortableTextBlock[];
  members: Person[];
}) {
  const [activeGroup, setActiveGroup] = useState<Person["governanceGroup"] | "all">("all");

  const groups = useMemo(() => {
    const values = new Set<Person["governanceGroup"]>();
    for (const person of members) if (person.governanceGroup) values.add(person.governanceGroup);
    return Array.from(values);
  }, [members]);

  const filtered = useMemo(() => {
    if (activeGroup === "all") return members;
    return members.filter((person) => person.governanceGroup === activeGroup);
  }, [activeGroup, members]);

  return (
    <section className="mt-12">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        {intro && intro.length > 0 ? (
          <div className="mt-4">
            <PortableTextRenderer value={intro} />
          </div>
        ) : null}
      </div>

      {groups.length > 1 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveGroup("all")}
            className={[
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              activeGroup === "all"
                ? "border-accent/30 bg-accent/10 text-foreground"
                : "border-border bg-surface text-muted hover:border-accent/30 hover:text-foreground",
            ].join(" ")}
          >
            Tous
          </button>
          {groups.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setActiveGroup(group)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                activeGroup === group
                  ? "border-accent/30 bg-accent/10 text-foreground"
                  : "border-border bg-surface text-muted hover:border-accent/30 hover:text-foreground",
              ].join(" ")}
            >
              {groupLabel(group) ?? group}
            </button>
          ))}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-muted">
          Aucun membre configuré pour cette section.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((person) => (
            <MemberCard key={person._id} person={person} />
          ))}
        </div>
      )}
    </section>
  );
}
