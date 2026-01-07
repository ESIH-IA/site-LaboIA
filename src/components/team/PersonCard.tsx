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
  const accent =
    tone === "associate"
      ? "hover:border-violet-500/30 hover:shadow-violet-500/10"
      : "hover:border-accent/30 hover:shadow-accent/10";

  return (
    <>
      <article
        className={[
          "relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:shadow-md",
          accent,
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-x-0 top-0 h-1 rounded-t-2xl",
            tone === "associate" ? "bg-violet-500/60" : "bg-accent/60",
          ].join(" ")}
          aria-hidden="true"
        />
        <div className="flex items-start gap-4">
          <div
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface-muted ring-1 ring-border"
            aria-hidden="true"
          >
            {person.photoUrl ? (
              <Image src={person.photoUrl} alt={person.fullName} fill sizes="56px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
                {initials(person.fullName)}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-base font-semibold text-foreground">{person.fullName}</div>
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
        </div>

        {person.expertise.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {person.expertise.slice(0, 6).map((tag) => (
              <span
                key={`${person.id}-${tag}`}
                className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted"
              >
                {tag}
              </span>
            ))}
            {person.expertise.length > 6 ? (
              <span className="px-1 text-xs font-medium text-muted">+{person.expertise.length - 6}</span>
            ) : null}
          </div>
        ) : null}

        {person.longBio ? (
          <div className="mt-4 text-sm text-muted">
            <p>{preview}</p>
            {canReadMore ? (
              <button
                type="button"
                className="mt-3 inline-flex font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
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
