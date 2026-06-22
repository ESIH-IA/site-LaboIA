"use client";

import { MemberCard } from "@/components/governance/member-card";
import type { GovernanceProfile } from "@/components/governance/types";
import type { Locale } from "@/lib/i18n";

export function MembersGrid({
  locale,
  title,
  intro,
  members,
}: {
  locale: Locale;
  title: string;
  intro?: string;
  members: GovernanceProfile[];
}) {
  const emptyLabel =
    locale === "en"
      ? "No profiles are configured for this section."
      : "Aucun profil n'est configuré pour cette section.";

  const orderedMembers = [...members].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <section id="directory" className="members-grid-section">
      <div className="members-grid-header">
        <h2 className="members-grid-title">{title}</h2>
        {intro ? (
          <div className="members-grid-intro">
            <p>{intro}</p>
          </div>
        ) : null}
      </div>

      {members.length === 0 ? (
        <div className="empty-state">{emptyLabel}</div>
      ) : (
        <div className="members-grid-content">
          <div className="members-category-grid members-category-grid--flat">
            {orderedMembers.map((person) => (
              <MemberCard key={person.id} person={person} locale={locale} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
