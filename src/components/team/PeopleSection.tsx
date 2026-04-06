import type { PersonCard as PersonCardModel } from "@/lib/team/getTeamPageData";
import { PersonCard } from "@/components/team/PersonCard";

type Tone = "research" | "associate";

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
  return (
    <section className="people-section">
      <div className={["people-section-header", tone === "associate" ? "people-section-header--associate" : "people-section-header--research"].join(" ")}>
        <div className="people-section-header-row">
          <h2 className="people-section-title">{title}</h2>
          {badgeLabel ? (
            <span
              className={["people-section-badge", tone === "associate" ? "people-section-badge--associate" : "people-section-badge--research"].join(" ")}
            >
              {badgeLabel}
            </span>
          ) : (
            <span className={["people-section-kicker", tone === "associate" ? "people-section-kicker--associate" : "people-section-kicker--research"].join(" ")}>
              {tone === "research" ? "Recherche" : "Contributeurs"}
            </span>
          )}
        </div>
      </div>
      {members.length === 0 ? (
        <div className="people-section-empty">
          {emptyText}
        </div>
      ) : (
        <div className="people-section-grid">
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
