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
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={person.fullName}
      onClick={onClose}
    >
      <div
        className="mx-auto mt-16 w-[min(48rem,calc(100%-2rem))] rounded-2xl border border-border bg-surface p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-lg font-semibold text-foreground">{person.fullName}</div>
                {badgeLabel ? (
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-[11px] font-semibold",
                      tone === "associate"
                        ? "bg-violet-600/10 text-violet-800"
                        : "bg-accent/10 text-accent",
                    ].join(" ")}
                  >
                    {badgeLabel}
                  </span>
                ) : null}
              </div>
            <div className="mt-1 text-sm text-muted">{person.roleTitle}</div>
            {person.affiliation ? <div className="mt-1 text-sm text-muted">{person.affiliation}</div> : null}
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-muted transition hover:bg-surface-muted hover:text-foreground"
            aria-label="Close"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {person.expertise.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {person.expertise.map((tag) => (
              <span
                key={`${person.id}-${tag}`}
                className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {person.longBio ? (
          <p className="mt-5 whitespace-pre-wrap text-sm text-muted">{person.longBio}</p>
        ) : (
          <p className="mt-5 text-sm text-muted">{readMoreLabel}</p>
        )}

        {hasLinks ? (
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
            {links.linkedin ? (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                LinkedIn
              </a>
            ) : null}
            {links.orcid ? (
              <a
                href={links.orcid}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                ORCID
              </a>
            ) : null}
            {links.scholar ? (
              <a
                href={links.scholar}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                Scholar
              </a>
            ) : null}
            {links.website ? (
              <a
                href={links.website}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
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
