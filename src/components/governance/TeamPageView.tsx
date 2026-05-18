import Image from "next/image";
import type { ReactNode } from "react";

import type { GovernanceProfile, GovernanceProfileCategory } from "@/components/governance/types";
import type { Locale } from "@/lib/i18n";

type TeamPageViewProps = {
  locale: Locale;
  title: string;
  intro?: ReactNode;
  leadershipTitle: string;
  leadershipIntro?: ReactNode;
  directoryTitle: string;
  directoryIntro?: string;
  topPerson: GovernanceProfile | null;
  scientificDirectors: GovernanceProfile[];
  associateResearchers: GovernanceProfile[];
  members: GovernanceProfile[];
};

const categoryToneClass: Record<GovernanceProfileCategory, string> = {
  gouvernance: "team-feature-card--gouvernance",
  direction: "team-feature-card--direction",
  recherche: "team-feature-card--recherche",
  conseil: "team-feature-card--conseil",
};

function initialsFromName(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function summarize(text: string | undefined, limit: number) {
  if (!text) return "";
  if (text.length <= limit) return text;
  const chunk = text.slice(0, limit);
  const lastSpace = chunk.lastIndexOf(" ");
  return `${(lastSpace > 120 ? chunk.slice(0, lastSpace) : chunk).trim()}...`;
}

function uniqueProfiles(groups: Array<GovernanceProfile[]>) {
  const map = new Map<string, GovernanceProfile>();
  for (const group of groups) {
    for (const person of group) {
      map.set(person.id, person);
    }
  }
  return [...map.values()];
}

function PersonCard({ person, locale }: { person: GovernanceProfile; locale: Locale }) {
  const preview = summarize(person.shortBio ?? person.longBio, 220);
  const accentClass = categoryToneClass[person.category];
  const contactHref = person.links?.email
    ? `mailto:${person.links.email}`
    : `/${locale}/contact?profile=${encodeURIComponent(person.name)}`;

  return (
    <article id={`profile-${person.id}`} className={["team-feature-card", accentClass].join(" ")}>
      <div className="team-feature-card-top">
        <div className="team-feature-card-header">
          <div className="team-feature-avatar" aria-hidden="true">
            {person.photoUrl ? (
              <Image src={person.photoUrl} alt={person.name} fill sizes="88px" style={{ objectFit: "cover" }} />
            ) : (
              <span className="team-feature-avatar-fallback">{initialsFromName(person.name)}</span>
            )}
          </div>

          <div className="team-feature-card-copy">
            <h3 className="team-feature-card-name">{person.name}</h3>
            {person.roleTitle ? <p className="team-feature-card-role">{person.roleTitle}</p> : null}
            {person.affiliation ? <p className="team-feature-card-affiliation">{person.affiliation}</p> : null}
          </div>
        </div>
      </div>

      <div className="team-feature-card-body">
        {preview ? <p className="team-feature-card-summary">{preview}</p> : null}

        {person.expertise.length > 0 ? (
          <div className="team-feature-card-tags">
            {person.expertise.slice(0, 4).map((item) => (
              <span key={`${person.id}-${item}`} className="team-feature-chip">
                {item}
              </span>
            ))}
          </div>
        ) : null}

        <div className="team-feature-card-links">
          <a className="team-feature-link team-feature-link--primary" href={contactHref} aria-label={person.name}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          {person.links?.website ? (
            <a className="team-feature-link" href={person.links.website} target="_blank" rel="noreferrer" aria-label={person.name}>
              {">"}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function TeamPageView({
  locale,
  title,
  intro,
  leadershipTitle,
  leadershipIntro,
  directoryTitle,
  directoryIntro,
  topPerson,
  scientificDirectors,
  associateResearchers,
  members,
}: TeamPageViewProps) {
  const leadershipProfiles = topPerson ? [topPerson, ...scientificDirectors] : [...scientificDirectors];
  const featuredIds = new Set(leadershipProfiles.map((person) => person.id));
  const directoryMembers = members.filter((person) => !featuredIds.has(person.id));
  const visibleDirectory = uniqueProfiles([associateResearchers, directoryMembers]);

  return (
    <main className="team-page">
      <section className="team-hero">
        <div className="team-hero-orb team-hero-orb--amber" aria-hidden="true" />
        <div className="team-hero-orb team-hero-orb--emerald" aria-hidden="true" />
        <div className="container team-hero-grid">
          <div className="team-hero-copy">
            <h1 className="team-title">{title}</h1>
            {intro ? <div className="team-intro">{intro}</div> : null}
          </div>
        </div>
      </section>

      {leadershipProfiles.length > 0 ? (
        <section id="leadership" className="team-section">
          <div className="container team-section-shell">
            <div className="team-section-header">
              <div>
                <h2 className="team-section-title">{leadershipTitle}</h2>
                {leadershipIntro ? <div className="team-section-body">{leadershipIntro}</div> : null}
              </div>
            </div>

            <div className="team-leadership-grid">
              {leadershipProfiles.map((person) => (
                <PersonCard key={person.id} person={person} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {visibleDirectory.length > 0 ? (
        <section className="team-section team-section--directory">
          <div className="container team-section-shell">
            <div className="team-section-header">
              <div>
                <h2 className="team-section-title">{directoryTitle}</h2>
                {directoryIntro ? <p className="team-section-body">{directoryIntro}</p> : null}
              </div>
            </div>

            <div className="team-leadership-grid">
              {visibleDirectory.map((person) => (
                <PersonCard key={person.id} person={person} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
