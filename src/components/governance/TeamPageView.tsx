import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { MembersGrid } from "@/components/governance/members-grid";
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

type Copy = {
  eyebrow: string;
  leadCta: string;
  directoryCta: string;
  stats: {
    leadership: string;
    profiles: string;
    expertise: string;
  };
  structure: {
    governance: string;
    direction: string;
    council: string;
  };
  structureBody: {
    governance: string;
    direction: string;
    council: (count: number) => string;
  };
  leadershipBadge: {
    gouvernance: string;
    direction: string;
  };
  upcoming: string;
  bioFallback: string;
  contact: string;
  website: string;
};

const copyByLocale: Record<Locale, Copy> = {
  fr: {
    eyebrow: "Gouvernance, recherche et exécution scientifique",
    leadCta: "Voir la structure",
    directoryCta: "Explorer les profils",
    stats: {
      leadership: "pilotage",
      profiles: "profils visibles",
      expertise: "domaines d'expertise",
    },
    structure: {
      governance: "Gouvernance institutionnelle",
      direction: "Direction scientifique",
      council: "Conseil scientifique",
    },
    structureBody: {
      governance:
        "Assure l'ancrage institutionnel, la cohérence stratégique et le développement des partenariats du laboratoire.",
      direction:
        "Cadre les orientations de recherche, la qualité méthodologique et la livraison des travaux scientifiques.",
      council: (count) =>
        `${count} profil${count > 1 ? "s" : ""} mobilisé${count > 1 ? "s" : ""} pour renforcer l'expertise, la revue scientifique et l'ouverture collaborative.`,
    },
    leadershipBadge: {
      gouvernance: "Direction institutionnelle",
      direction: "Direction scientifique",
    },
    upcoming: "À venir",
    bioFallback: "Profil en cours de consolidation.",
    contact: "Contacter",
    website: "Site web",
  },
  en: {
    eyebrow: "Governance, research and scientific delivery",
    leadCta: "View structure",
    directoryCta: "Browse profiles",
    stats: {
      leadership: "leadership roles",
      profiles: "visible profiles",
      expertise: "expertise areas",
    },
    structure: {
      governance: "Institutional governance",
      direction: "Scientific leadership",
      council: "Scientific council",
    },
    structureBody: {
      governance:
        "Provides institutional anchoring, strategic alignment and partnership development for the lab.",
      direction:
        "Frames research priorities, methodological rigor and the delivery of scientific work.",
      council: (count) =>
        `${count} profile${count > 1 ? "s" : ""} engaged to reinforce expertise, scientific review and collaborative reach.`,
    },
    leadershipBadge: {
      gouvernance: "Institutional lead",
      direction: "Scientific lead",
    },
    upcoming: "Upcoming",
    bioFallback: "Profile details are being consolidated.",
    contact: "Contact",
    website: "Website",
  },
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
  return `${(lastSpace > 120 ? chunk.slice(0, lastSpace) : chunk).trim()}…`;
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

function TeamFeatureCard({
  person,
  badge,
  copy,
  locale,
}: {
  person: GovernanceProfile;
  badge: string;
  copy: Copy;
  locale: Locale;
}) {
  const preview = summarize(person.shortBio ?? person.longBio, 220) || copy.bioFallback;
  const accentClass = categoryToneClass[person.category];
  const contactHref = person.links?.email
    ? `mailto:${person.links.email}`
    : `/${locale}/contact?profile=${encodeURIComponent(person.name)}`;

  return (
    <article id={`profile-${person.id}`} className={["team-feature-card", accentClass].join(" ")}>
      <div className="team-feature-card-top">
        <div className="team-feature-card-badges">
          <span className="team-feature-badge">{badge}</span>
          {person.status === "futur" ? (
            <span className="team-feature-badge team-feature-badge--muted">{copy.upcoming}</span>
          ) : null}
        </div>

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
        <p className="team-feature-card-summary">{preview}</p>

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
          <a className="team-feature-link team-feature-link--primary" href={contactHref}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {copy.contact}
          </a>
          {person.links?.website ? (
            <a
              className="team-feature-link"
              href={person.links.website}
              target="_blank"
              rel="noreferrer"
            >
              {copy.website}
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
  const copy = copyByLocale[locale] ?? copyByLocale.fr;
  const leadershipProfiles = topPerson ? [topPerson, ...scientificDirectors] : [...scientificDirectors];
  const featuredIds = new Set(leadershipProfiles.map((person) => person.id));
  const uniqueVisibleProfiles = uniqueProfiles([
    leadershipProfiles,
    associateResearchers,
    members,
  ]);
  const uniqueExpertiseCount = new Set(
    uniqueVisibleProfiles.flatMap((person) => person.expertise.map((item) => item.toLowerCase())),
  ).size;
  const leadershipCount = leadershipProfiles.length;
  const directoryMembers = members.filter((person) => !featuredIds.has(person.id));

  return (
    <main className="team-page">
      <section className="team-hero">
        <div className="team-hero-orb team-hero-orb--amber" aria-hidden="true" />
        <div className="team-hero-orb team-hero-orb--emerald" aria-hidden="true" />
        <div className="container team-hero-grid">
          <div className="team-hero-copy">
            <span className="team-eyebrow">{copy.eyebrow}</span>
            <h1 className="team-title">{title}</h1>
            {intro ? <div className="team-intro">{intro}</div> : null}

            <div className="team-actions">
              <Link href="#leadership" className="team-action team-action--primary">
                {copy.leadCta}
              </Link>
              <Link href="#directory" className="team-action team-action--secondary">
                {copy.directoryCta}
              </Link>
            </div>
          </div>

          <aside className="team-metrics" aria-label="Team metrics">
            <div className="team-metric-card">
              <div className="team-metric-value">{leadershipCount}</div>
              <div className="team-metric-label">{copy.stats.leadership}</div>
            </div>
            <div className="team-metric-card">
              <div className="team-metric-value">{uniqueVisibleProfiles.length}</div>
              <div className="team-metric-label">{copy.stats.profiles}</div>
            </div>
            <div className="team-metric-card">
              <div className="team-metric-value">{uniqueExpertiseCount}</div>
              <div className="team-metric-label">{copy.stats.expertise}</div>
            </div>
          </aside>
        </div>
      </section>

      <section id="leadership" className="team-section">
        <div className="container team-section-shell">
          <div className="team-section-header">
            <div>
              <h2 className="team-section-title">{leadershipTitle}</h2>
              {leadershipIntro ? <div className="team-section-body">{leadershipIntro}</div> : null}
            </div>
          </div>

          <div className="team-structure-grid">
            <article className="team-structure-card team-structure-card--gouvernance">
              <span className="team-structure-label">{copy.structure.governance}</span>
              <p>{copy.structureBody.governance}</p>
            </article>
            <article className="team-structure-card team-structure-card--direction">
              <span className="team-structure-label">{copy.structure.direction}</span>
              <p>{copy.structureBody.direction}</p>
            </article>
            <article className="team-structure-card team-structure-card--conseil">
              <span className="team-structure-label">{copy.structure.council}</span>
              <p>{copy.structureBody.council(associateResearchers.length)}</p>
            </article>
          </div>

          {leadershipProfiles.length > 0 ? (
            <div className="team-leadership-grid">
              {leadershipProfiles.map((person) => (
                <TeamFeatureCard
                  key={person.id}
                  person={person}
                  badge={
                    person.category === "gouvernance"
                      ? copy.leadershipBadge.gouvernance
                      : copy.leadershipBadge.direction
                  }
                  copy={copy}
                  locale={locale}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {directoryMembers.length > 0 ? (
        <section className="team-section team-section--directory">
          <div className="container team-section-shell">
            <MembersGrid
              locale={locale}
              title={directoryTitle}
              intro={directoryIntro}
              members={directoryMembers}
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}
