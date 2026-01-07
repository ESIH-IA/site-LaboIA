import type { PersonCard as PersonCardModel } from "@/lib/team/getTeamPageData";
import { PersonCard } from "@/components/team/PersonCard";

type Tone = "research" | "associate";

function toneClasses(tone: Tone) {
  if (tone === "associate") {
    return {
      shell: "bg-gradient-to-b from-violet-500/10 to-surface",
      kicker: "text-violet-700",
      accent: "bg-violet-600/10 text-violet-800 border-violet-500/20",
    };
  }
  return {
    shell: "bg-gradient-to-b from-accent/10 to-surface",
    kicker: "text-accent",
    accent: "bg-accent/10 text-accent border-accent/20",
  };
}

export function PeopleSection({
  title,
  members,
  emptyText,
  readMoreLabel,
  badgeLabel,
  tone,
}: {
  title: string;
  members: PersonCardModel[];
  emptyText: string;
  readMoreLabel: string;
  badgeLabel?: string | null;
  tone: Tone;
}) {
  const styles = toneClasses(tone);
  return (
    <section className="mt-12 rounded-3xl border border-border p-6 shadow-sm md:p-8">
      <div className={["rounded-2xl border border-border p-5", styles.shell].join(" ")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
          {badgeLabel ? (
            <span
              className={[
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]",
                styles.accent,
              ].join(" ")}
            >
              {badgeLabel}
            </span>
          ) : (
            <span className={["text-xs font-semibold uppercase tracking-[0.18em]", styles.kicker].join(" ")}>
              {tone === "research" ? "Recherche" : "Contributeurs"}
            </span>
          )}
        </div>
      </div>
      {members.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-muted">
          {emptyText}
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              readMoreLabel={readMoreLabel}
              badgeLabel={badgeLabel}
              tone={tone}
            />
          ))}
        </div>
      )}
    </section>
  );
}
