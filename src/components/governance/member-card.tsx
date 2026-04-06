"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";

import type { Person } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

type PersonCategory = "gouvernance" | "direction" | "recherche" | "conseil";

function initialsFromName(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function truncate(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  const clipped = text.slice(0, maxChars);
  const lastSpace = clipped.lastIndexOf(" ");
  return (lastSpace > 120 ? clipped.slice(0, lastSpace) : clipped).trim() + "...";
}

function hasLinks(links: Person["links"] | undefined) {
  if (!links) return false;
  return Boolean(links.linkedin || links.scholar || links.orcid || links.website || links.email);
}

function getCategory(person: Person): PersonCategory {
  const roleCategory = person.roleCategory as PersonCategory | undefined;
  if (roleCategory) return roleCategory;
  if (person.governanceGroup === "comite_scientifique") return "conseil";
  if (person.governanceGroup === "direction") return "direction";
  if (person.governanceGroup === "gouvernance") return "gouvernance";
  if (person.teamGroup === "research") return "recherche";
  return "gouvernance";
}

const categoryAccentColors: Record<PersonCategory, { from: string; to: string }> = {
  gouvernance: { from: "#64748b", to: "#475569" },
  direction: { from: "#06b6d4", to: "#14b8a6" },
  recherche: { from: "#14b8a6", to: "#06b6d4" },
  conseil: { from: "#8b5cf6", to: "#06b6d4" },
};

const categoryBadgeStyles: Record<PersonCategory, { borderColor: string; background: string; color: string }> = {
  gouvernance: { borderColor: "#cbd5e1", background: "rgba(248,250,252,0.5)", color: "#334155" },
  direction: { borderColor: "#a5f3fc", background: "rgba(236,254,255,0.5)", color: "#0e7490" },
  recherche: { borderColor: "#99f6e4", background: "rgba(240,253,250,0.5)", color: "#0f766e" },
  conseil: { borderColor: "#c4b5fd", background: "rgba(245,243,255,0.5)", color: "#6d28d9" },
};

export function MemberCard({ person }: { person: Person }) {
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const category = getCategory(person);

  const imageUrl = useMemo(() => {
    if (!person.photo) return null;
    return urlForImage(person.photo).width(400).height(400).fit("crop").url();
  }, [person.photo]);

  const initials = initialsFromName(person.name);
  const shortBio = person.shortBio?.trim() ?? "";
  const longBio = person.longBio?.trim() ?? "";
  const preview = shortBio || (longBio ? truncate(longBio, 200) : "");
  const showAnyLinks = hasLinks(person.links);

  const accent = categoryAccentColors[category];
  const accentGradient = `linear-gradient(to right, ${accent.from}, ${accent.to})`;
  const badgeStyle = categoryBadgeStyles[category];

  return (
    <>
      <article
        id={`profile-${person._id}`}
        className="member-card"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`Voir le profil complet de ${person.name}`}
      >
        {/* Accent Bar Top */}
        <div className={`member-card-accent member-card-accent--${category}`} />

        {/* Zone haute - Photo/Initiales */}
        <div className={`member-card-photo member-card-photo--${category}`}>
          {imageUrl ? (
            <div className="member-card-photo-circle">
              <Image src={imageUrl} alt={person.name} fill sizes="112px" style={{objectFit:'cover'}} />
            </div>
          ) : (
            <div className="member-card-initials-circle">
              <span className="member-card-initials">{initials}</span>
            </div>
          )}
        </div>

        {/* Zone basse - Contenu */}
        <div className="member-card-body">
          <div style={{marginBottom:'1rem'}}>
            <h3 className="member-card-name">
              {person.name}
            </h3>
            {person.roleTitle ? <p className="member-card-role">{person.roleTitle}</p> : null}
            {person.affiliation ? <p className="member-card-affiliation">{person.affiliation}</p> : null}
          </div>

          {person.expertise && person.expertise.length > 0 ? (
            <div className="member-card-expertise">
              <div className="member-card-expertise-title">Expertise</div>
              <div className="member-card-expertise-tags">
                {person.expertise.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="member-card-expertise-tag"
                    style={{
                      borderColor: badgeStyle.borderColor,
                      background: badgeStyle.background,
                      color: badgeStyle.color,
                    }}
                  >
                    {item}
                  </span>
                ))}
                {person.expertise.length > 3 ? (
                  <span className="member-card-expertise-count">
                    +{person.expertise.length - 3}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}

          {preview ? (
            <div className="member-card-preview" style={{display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
              <p>{preview}</p>
            </div>
          ) : null}

          {person.contribution ? (
            <div className="member-card-contribution">
              <div className="member-card-contribution-title">Contribution</div>
              <p style={{fontStyle:'italic'}}>{person.contribution}</p>
            </div>
          ) : null}

          <div className="member-card-footer">
            {person.links?.email ? (
              <a
                href={`mailto:${person.links.email}`}
                className="member-card-email"
                style={{background: accentGradient}}
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Contact
              </a>
            ) : null}
            <span className="member-card-hint">
              Cliquez pour en savoir plus &gt;
            </span>
          </div>
        </div>
      </article>

      {open ? (
        <div
          className="member-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Bio de ${person.name}`}
          id={dialogId}
          onClick={() => setOpen(false)}
        >
          <div
            className="member-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="member-modal-header">
              <div className={`member-modal-accent member-card-accent--${category}`} />
              <div className="member-modal-header-row">
                <div style={{minWidth:0, flex:1}}>
                  <h3 className="member-modal-name">{person.name}</h3>
                  {person.roleTitle ? <p className="member-modal-role">{person.roleTitle}</p> : null}
                  {person.affiliation ? <p className="member-modal-affiliation">{person.affiliation}</p> : null}
                </div>
                <button
                  type="button"
                  className="member-modal-close"
                  aria-label="Fermer"
                  onClick={() => setOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="member-modal-content">
              {person.expertise && person.expertise.length > 0 ? (
                <div className="member-modal-section">
                  <div className="member-modal-section-title">
                    Domaines d&apos;expertise
                  </div>
                  <div className="member-card-expertise-tags">
                    {person.expertise.map((item, idx) => (
                      <span
                        key={idx}
                        className="member-card-expertise-tag"
                        style={{
                          borderColor: badgeStyle.borderColor,
                          background: badgeStyle.background,
                          color: badgeStyle.color,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {longBio ? (
                <div className="member-modal-section">
                  <div className="member-modal-section-title">Biographie</div>
                  <p className="member-modal-bio">{longBio}</p>
                </div>
              ) : null}

              {person.contribution ? (
                <div className="member-modal-contribution">
                  <div className="member-modal-section-title">Contribution</div>
                  <p style={{fontStyle:'italic'}}>{person.contribution}</p>
                </div>
              ) : null}

              {showAnyLinks ? (
                <div className="member-modal-links">
                  {person.links?.email ? (
                    <a
                      href={`mailto:${person.links.email}`}
                      className="member-modal-link-primary"
                      style={{background: accentGradient}}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Email
                    </a>
                  ) : null}
                  {person.links?.linkedin ? (
                    <a
                      href={person.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="member-modal-link-secondary"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                  {person.links?.scholar ? (
                    <a
                      href={person.links.scholar}
                      target="_blank"
                      rel="noreferrer"
                      className="member-modal-link-secondary"
                    >
                      Google Scholar
                    </a>
                  ) : null}
                  {person.links?.orcid ? (
                    <a
                      href={person.links.orcid}
                      target="_blank"
                      rel="noreferrer"
                      className="member-modal-link-secondary"
                    >
                      ORCID
                    </a>
                  ) : null}
                  {person.links?.website ? (
                    <a
                      href={person.links.website}
                      target="_blank"
                      rel="noreferrer"
                      className="member-modal-link-secondary"
                    >
                      Site web
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
