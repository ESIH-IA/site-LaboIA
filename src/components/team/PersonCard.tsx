"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { PersonCard as PersonCardModel } from "@/lib/team/getTeamPageData";
import { PersonModal } from "@/components/team/PersonModal";

function initials(name: string) {
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
  return (lastSpace > 140 ? clipped.slice(0, lastSpace) : clipped).trim() + "…";
}

export function PersonCard({
  person,
  readMoreLabel,
  badgeLabel,
  tone,
}: {
  person: PersonCardModel;
  readMoreLabel: string;
  badgeLabel?: string | null;
  tone: "research" | "associate";
}) {
  const [open, setOpen] = useState(false);
  const preview = useMemo(() => truncate(person.longBio ?? "", 300), [person.longBio]);
  const canReadMore = (person.longBio ?? "").length > preview.length;

  return (
    <>
      <article
        id={`person-${person.id}`}
        tabIndex={-1}
        className={["person-card", tone === "associate" ? "person-card--associate" : "person-card--research"].join(" ")}
      >
        <div
          className={["person-card-accent", tone === "associate" ? "person-card-accent--associate" : "person-card-accent--research"].join(" ")}
          aria-hidden="true"
        />
        <div className="person-card-top">
          <div
            className="person-avatar"
            aria-hidden="true"
          >
            {person.photoUrl ? (
              <Image src={person.photoUrl} alt={person.fullName} fill sizes="56px" style={{objectFit:'cover'}} />
            ) : (
              <div className="person-avatar-fallback">
                {initials(person.fullName)}
              </div>
            )}
          </div>

          <div className="person-card-info">
            <div className="person-card-name-row">
              <div className="person-card-name">{person.fullName}</div>
              {badgeLabel ? (
                <span
                  className={tone === "associate" ? "person-badge--associate" : "person-badge--research"}
                >
                  {badgeLabel}
                </span>
              ) : null}
            </div>
            <div className="person-card-role">{person.roleTitle}</div>
            {person.affiliation ? <div className="person-card-affiliation">{person.affiliation}</div> : null}
          </div>
        </div>

        {person.expertise.length > 0 ? (
          <div className="person-card-tags">
            {person.expertise.slice(0, 6).map((tag) => (
              <span
                key={`${person.id}-${tag}`}
                className="tag-expertise"
              >
                {tag}
              </span>
            ))}
            {person.expertise.length > 6 ? (
              <span style={{padding:'0 0.25rem', fontSize:'0.75rem', fontWeight:500, color:'var(--muted)'}}>+{person.expertise.length - 6}</span>
            ) : null}
          </div>
        ) : null}

        {person.longBio ? (
          <div className="person-card-bio">
            <p>{preview}</p>
            {canReadMore ? (
              <button
                type="button"
                className="person-card-readmore"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
              >
                {readMoreLabel}
              </button>
            ) : null}
          </div>
        ) : null}
      </article>

      <PersonModal
        open={open}
        onClose={() => setOpen(false)}
        person={person}
        readMoreLabel={readMoreLabel}
        badgeLabel={badgeLabel}
        tone={tone}
      />
    </>
  );
}
