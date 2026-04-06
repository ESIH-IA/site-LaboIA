"use client";

import { useEffect } from "react";

import type { PersonCard } from "@/lib/team/getTeamPageData";

export function PersonModal({
  open,
  onClose,
  person,
  readMoreLabel,
  badgeLabel,
  tone,
}: {
  open: boolean;
  onClose: () => void;
  person: PersonCard;
  readMoreLabel: string;
  badgeLabel?: string | null;
  tone: "research" | "associate";
}) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const links = person.links ?? {};
  const hasLinks = Boolean(links.linkedin || links.orcid || links.scholar || links.website);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={person.fullName}
      onClick={onClose}
    >
      <div
        className="modal-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{minWidth:0}}>
              <div className="person-card-name-row">
                <div className="modal-name">{person.fullName}</div>
                {badgeLabel ? (
                  <span
                    className={tone === "associate" ? "person-badge--associate" : "person-badge--research"}
                  >
                    {badgeLabel}
                  </span>
                ) : null}
              </div>
            <div className="modal-role">{person.roleTitle}</div>
            {person.affiliation ? <div className="modal-role">{person.affiliation}</div> : null}
          </div>
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {person.expertise.length > 0 ? (
          <div className="modal-tags">
            {person.expertise.map((tag) => (
              <span
                key={`${person.id}-${tag}`}
                className="tag-expertise"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {person.longBio ? (
          <p className="modal-bio">{person.longBio}</p>
        ) : (
          <p className="modal-bio">{readMoreLabel}</p>
        )}

        {hasLinks ? (
          <div className="modal-links">
            {links.linkedin ? (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="modal-link"
              >
                LinkedIn
              </a>
            ) : null}
            {links.orcid ? (
              <a
                href={links.orcid}
                target="_blank"
                rel="noreferrer"
                className="modal-link"
              >
                ORCID
              </a>
            ) : null}
            {links.scholar ? (
              <a
                href={links.scholar}
                target="_blank"
                rel="noreferrer"
                className="modal-link"
              >
                Scholar
              </a>
            ) : null}
            {links.website ? (
              <a
                href={links.website}
                target="_blank"
                rel="noreferrer"
                className="modal-link"
              >
                Website
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
