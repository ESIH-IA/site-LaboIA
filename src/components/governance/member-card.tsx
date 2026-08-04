"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import type { GovernanceProfile, GovernanceProfileCategory } from "@/components/governance/types";
import type { Locale } from "@/lib/i18n";

function initialsFromName(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function truncate(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  const clipped = text.slice(0, maxChars);
  const lastSpace = clipped.lastIndexOf(" ");
  return (lastSpace > 120 ? clipped.slice(0, lastSpace) : clipped).trim() + "...";
}

function hasLinks(links: GovernanceProfile["links"] | undefined) {
  if (!links) return false;
  return Boolean(links.linkedin || links.scholar || links.orcid || links.website || links.email);
}

const categoryAccentColors: Record<GovernanceProfileCategory, { from: string; to: string }> = {
  gouvernance: { from: "#d94056", to: "#a52a3e" },
  direction: { from: "#7c3cb0", to: "#562779" },
  recherche: { from: "#5284c9", to: "#3a5f93" },
  conseil: { from: "#c5427b", to: "#8e2d58" },
};

const categoryBadgeStyles: Record<GovernanceProfileCategory, { borderColor: string; background: string; color: string }> = {
  gouvernance: { borderColor: "rgba(217, 64, 86, 0.28)", background: "rgba(217, 64, 86, 0.10)", color: "#a52a3e" },
  direction: { borderColor: "rgba(124, 60, 176, 0.28)", background: "rgba(124, 60, 176, 0.10)", color: "#562779" },
  recherche: { borderColor: "rgba(82, 132, 201, 0.28)", background: "rgba(82, 132, 201, 0.10)", color: "#3a5f93" },
  conseil: { borderColor: "rgba(197, 66, 123, 0.28)", background: "rgba(197, 66, 123, 0.10)", color: "#8e2d58" },
};

export function MemberCard({ person, locale }: { person: GovernanceProfile; locale: Locale }) {
  const t = useTranslations("governance");
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const category = person.category;
  const imageUrl = useMemo(() => person.photoUrl ?? null, [person.photoUrl]);

  const initials = initialsFromName(person.name);
  const shortBio = person.shortBio?.trim() ?? "";
  const longBio = person.longBio?.trim() ?? "";
  const preview = shortBio || (longBio ? truncate(longBio, 220) : "");
  const showAnyLinks = hasLinks(person.links);

  const accent = categoryAccentColors[category];
  const accentGradient = `linear-gradient(to right, ${accent.from}, ${accent.to})`;
  const badgeStyle = categoryBadgeStyles[category];
  const contactHref = person.links?.email
    ? `mailto:${person.links.email}`
    : `/${locale}/contact?profile=${encodeURIComponent(person.name)}`;
  const categoryLabel = t(`categories.${category}`);
  const upcomingLabel = t("upcoming");
  const expertiseLabel = t("expertise");
  const contributionLabel = t("contribution");
  const contactLabel = t("contact");
  const modalTitle = t("modalTitle");
  const modalExpertiseTitle = t("modalExpertiseTitle");
  const learnMoreLabel = t("learnMore");
  const closeLabel = t("close");

  return (
    <>
      <article
        id={`profile-${person.id}`}
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
        aria-label={t("viewProfileOf", { name: person.name })}
      >
        <div className={`member-card-accent member-card-accent--${category}`} />

        <div className="member-card-body">
          <div className="member-card-topline">
            <span
              className="member-card-category"
              style={{
                borderColor: badgeStyle.borderColor,
                background: badgeStyle.background,
                color: badgeStyle.color,
              }}
            >
              {categoryLabel}
            </span>
            {person.status === "futur" ? (
              <span className="member-card-status">{upcomingLabel}</span>
            ) : null}
          </div>

          <div className="member-card-identity">
            <div className={`member-card-photo member-card-photo--${category}`}>
              {imageUrl ? (
                <div className="member-card-photo-circle">
                  <Image src={imageUrl} alt={person.name} fill sizes="84px" style={{ objectFit: "cover" }} />
                </div>
              ) : (
                <div className="member-card-initials-circle">
                  <span className="member-card-initials">{initials}</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="member-card-name">{person.name}</h3>
              {person.roleTitle ? <p className="member-card-role">{person.roleTitle}</p> : null}
              {person.affiliation ? <p className="member-card-affiliation">{person.affiliation}</p> : null}
            </div>
          </div>

          {person.expertise.length > 0 ? (
            <div className="member-card-expertise">
              <div className="member-card-expertise-title">{expertiseLabel}</div>
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
                  <span className="member-card-expertise-count">+{person.expertise.length - 3}</span>
                ) : null}
              </div>
            </div>
          ) : null}

          {preview ? (
            <div
              className="member-card-preview"
              style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              <p>{preview}</p>
            </div>
          ) : null}

          {person.contribution ? (
            <div className="member-card-contribution">
              <div className="member-card-contribution-title">{contributionLabel}</div>
              <p>{person.contribution}</p>
            </div>
          ) : null}

          <div className="member-card-footer">
            <a
              href={contactHref}
              className="member-card-email"
              style={{ background: accentGradient }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {contactLabel}
            </a>
            <span className="member-card-hint">{learnMoreLabel}</span>
          </div>
        </div>
      </article>

      {open ? (
        <div
          className="member-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${modalTitle} — ${person.name}`}
          id={dialogId}
          onClick={() => setOpen(false)}
        >
          <div className="member-modal" onClick={(event) => event.stopPropagation()}>
            <div className="member-modal-header">
              <div className={`member-modal-accent member-card-accent--${category}`} />
              <div className="member-modal-header-row">
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h3 className="member-modal-name">{person.name}</h3>
                  {person.roleTitle ? <p className="member-modal-role">{person.roleTitle}</p> : null}
                  {person.affiliation ? <p className="member-modal-affiliation">{person.affiliation}</p> : null}
                </div>
                <button type="button" className="member-modal-close" aria-label={closeLabel} onClick={() => setOpen(false)}>
                  {closeLabel}
                </button>
              </div>
            </div>

            <div className="member-modal-content">
              {person.expertise.length > 0 ? (
                <div className="member-modal-section">
                  <div className="member-modal-section-title">{modalExpertiseTitle}</div>
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
                  <div className="member-modal-section-title">{modalTitle}</div>
                  <p className="member-modal-bio">{longBio}</p>
                </div>
              ) : null}

              {person.contribution ? (
                <div className="member-modal-contribution">
                  <div className="member-modal-section-title">{contributionLabel}</div>
                  <p>{person.contribution}</p>
                </div>
              ) : null}

              {showAnyLinks ? (
                <div className="member-modal-links">
                  {person.links?.email ? (
                    <a href={`mailto:${person.links.email}`} className="member-modal-link-primary" style={{ background: accentGradient }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {contactLabel}
                    </a>
                  ) : null}
                  {person.links?.linkedin ? (
                    <a href={person.links.linkedin} target="_blank" rel="noreferrer" className="member-modal-link-secondary">
                      LinkedIn
                    </a>
                  ) : null}
                  {person.links?.scholar ? (
                    <a href={person.links.scholar} target="_blank" rel="noreferrer" className="member-modal-link-secondary">
                      Google Scholar
                    </a>
                  ) : null}
                  {person.links?.orcid ? (
                    <a href={person.links.orcid} target="_blank" rel="noreferrer" className="member-modal-link-secondary">
                      ORCID
                    </a>
                  ) : null}
                  {person.links?.website ? (
                    <a href={person.links.website} target="_blank" rel="noreferrer" className="member-modal-link-secondary">
                      {t("website")}
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
