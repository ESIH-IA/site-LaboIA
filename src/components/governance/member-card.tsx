"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";

import type { Person } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

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
  return (lastSpace > 120 ? clipped.slice(0, lastSpace) : clipped).trim() + "…";
}

function hasLinks(links: Person["links"] | undefined) {
  if (!links) return false;
  return Boolean(links.linkedin || links.scholar || links.orcid || links.website);
}

export function MemberCard({ person }: { person: Person }) {
  const dialogId = useId();
  const [open, setOpen] = useState(false);

  const imageUrl = useMemo(() => {
    return person.photo ? urlForImage(person.photo).width(512).height(512).fit("crop").url() : null;
  }, [person.photo]);

  const initials = useMemo(() => initialsFromName(person.name), [person.name]);
  const longBio = person.longBio?.trim() ?? "";
  const preview = longBio ? truncate(longBio, 320) : "";
  const showReadMore = longBio.length > preview.length;
  const showAnyLinks = hasLinks(person.links);

  return (
    <>
      <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-accent/30 hover:shadow-md">
        <div className="flex items-start gap-4">
          <div
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface-muted ring-1 ring-border"
            aria-hidden="true"
          >
            {imageUrl ? (
              <Image src={imageUrl} alt={person.name} fill sizes="56px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
                {initials}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="text-base font-semibold text-foreground">{person.name}</div>
            {person.roleTitle ? <div className="mt-1 text-sm text-muted">{person.roleTitle}</div> : null}
            {person.affiliation ? <div className="mt-1 text-sm text-muted">{person.affiliation}</div> : null}
          </div>
        </div>

        {longBio ? (
          <div className="mt-4 text-sm text-muted">
            <p>{preview}</p>
            {showReadMore ? (
              <button
                type="button"
                className="mt-3 inline-flex font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-controls={dialogId}
              >
                Lire la suite
              </button>
            ) : null}
          </div>
        ) : null}
      </article>

      {open ? (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Bio de ${person.name}`}
          id={dialogId}
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-auto mt-16 w-[min(48rem,calc(100%-2rem))] rounded-2xl border border-border bg-surface p-6 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-lg font-semibold text-foreground">{person.name}</div>
                {person.roleTitle ? <div className="mt-1 text-sm text-muted">{person.roleTitle}</div> : null}
                {person.affiliation ? <div className="mt-1 text-sm text-muted">{person.affiliation}</div> : null}
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-muted transition hover:bg-surface-muted hover:text-foreground"
                aria-label="Fermer"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {longBio ? <p className="mt-4 whitespace-pre-wrap text-sm text-muted">{longBio}</p> : null}

            {showAnyLinks ? (
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                {person.links?.linkedin ? (
                  <a
                    href={person.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                  >
                    LinkedIn
                  </a>
                ) : null}
                {person.links?.scholar ? (
                  <a
                    href={person.links.scholar}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                  >
                    Google Scholar
                  </a>
                ) : null}
                {person.links?.orcid ? (
                  <a
                    href={person.links.orcid}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                  >
                    ORCID
                  </a>
                ) : null}
                {person.links?.website ? (
                  <a
                    href={person.links.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                  >
                    Site web
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
