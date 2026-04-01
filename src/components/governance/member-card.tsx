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

  const categoryColors = {
    gouvernance: {
      gradient: "bg-linear-to-br from-slate-600 to-slate-700",
      ring: "ring-slate-200",
      text: "gradient-text-cyan",
      badge: "border-slate-300 bg-slate-50/50 text-slate-700",
      accent: "from-slate-500 to-slate-600",
    },
    direction: {
      gradient: "bg-linear-to-br from-cyan-500 to-teal-600",
      ring: "ring-cyan-200",
      text: "gradient-text-cyan",
      badge: "border-cyan-200 bg-cyan-50/50 text-cyan-700",
      accent: "from-cyan-500 to-teal-500",
    },
    recherche: {
      gradient: "bg-linear-to-br from-teal-500 to-teal-700",
      ring: "ring-teal-200",
      text: "gradient-text-cyan",
      badge: "border-teal-200 bg-teal-50/50 text-teal-700",
      accent: "from-teal-500 to-cyan-500",
    },
    conseil: {
      gradient: "bg-linear-to-br from-violet-600 to-violet-700",
      ring: "ring-violet-200",
      text: "gradient-text-accent",
      badge: "border-violet-200 bg-violet-50/50 text-violet-700",
      accent: "from-violet-500 to-cyan-500",
    },
  } as const;

  const colors = categoryColors[category];

  return (
    <>
      <article
        id={`profile-${person._id}`}
        className={[
          "group relative flex h-full flex-col overflow-hidden rounded-2xl gradient-card-bg border shadow-lg ring-1 transition-smooth",
          "hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 scroll-mt-24 cursor-pointer",
          colors.ring,
        ].join(" ")}
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
        <div className={`absolute left-0 right-0 top-0 h-1 bg-linear-to-r ${colors.accent}`} />

        {/* Zone haute - Photo/Initiales */}
        <div className={["relative h-36 flex items-center justify-center transition-all duration-500", colors.gradient].join(" ")}>
          {imageUrl ? (
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-white/40 shadow-2xl">
              <Image src={imageUrl} alt={person.name} fill sizes="112px" className="object-cover" />
            </div>
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-4 ring-white/40 shadow-2xl">
              <span className="text-4xl font-bold text-white">{initials}</span>
            </div>
          )}
        </div>

        {/* Zone basse - Contenu */}
        <div className="flex flex-1 flex-col bg-white p-6">
          <div className="mb-4">
            <h3 className={["text-xl font-bold text-slate-900 mb-2 transition-all", `group-hover:${colors.text}`].join(" ")}>
              {person.name}
            </h3>
            {person.roleTitle ? <p className="mt-2 text-sm font-medium text-slate-600">{person.roleTitle}</p> : null}
            {person.affiliation ? <p className="mt-1 text-xs text-slate-500 italic">{person.affiliation}</p> : null}
          </div>

          {person.expertise && person.expertise.length > 0 ? (
            <div className="mb-4">
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Expertise</div>
              <div className="flex flex-wrap gap-2">
                {person.expertise.slice(0, 3).map((item, idx) => (
                  <span key={idx} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${colors.badge}`}>
                    {item}
                  </span>
                ))}
                {person.expertise.length > 3 ? (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
                    +{person.expertise.length - 3}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}

          {preview ? (
            <div className="mb-4 text-sm text-slate-600 leading-relaxed">
              <p className="line-clamp-3">{preview}</p>
            </div>
          ) : null}

          {person.contribution ? (
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Contribution</div>
              <p className="text-slate-600 italic line-clamp-2 leading-relaxed">{person.contribution}</p>
            </div>
          ) : null}

          <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-slate-200">
            {person.links?.email ? (
              <a
                href={`mailto:${person.links.email}`}
                className={[
                  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition-all",
                  `bg-linear-to-r ${colors.accent}`,
                  "hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20",
                ].join(" ")}
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Contact
              </a>
            ) : null}
            <span className="text-xs font-medium text-center text-slate-400 group-hover:text-cyan-600 transition-colors">
              Cliquez pour en savoir plus &gt;
            </span>
          </div>
        </div>
      </article>

      {open ? (
        <div
          className="fixed inset-0 z-60 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Bio de ${person.name}`}
          id={dialogId}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="relative overflow-hidden border-b border-slate-200 bg-linear-to-br from-slate-50 to-white px-8 py-6">
              <div className={`absolute left-0 right-0 top-0 h-1 bg-linear-to-r ${colors.accent}`} />
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{person.name}</h3>
                  {person.roleTitle ? <p className="text-base text-slate-600 mb-1">{person.roleTitle}</p> : null}
                  {person.affiliation ? <p className="text-sm text-slate-500 italic">{person.affiliation}</p> : null}
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                  aria-label="Fermer"
                  onClick={() => setOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[calc(90vh-120px)] overflow-y-auto px-8 py-6">
              {person.expertise && person.expertise.length > 0 ? (
                <div className="mb-6">
                  <div className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
                    Domaines d&apos;expertise
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {person.expertise.map((item, idx) => (
                      <span key={idx} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${colors.badge}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {longBio ? (
                <div className="mb-6">
                  <div className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Biographie</div>
                  <p className="whitespace-pre-wrap text-base text-slate-700 leading-relaxed">{longBio}</p>
                </div>
              ) : null}

              {person.contribution ? (
                <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                  <div className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500">Contribution</div>
                  <p className="text-base text-slate-700 italic leading-relaxed">{person.contribution}</p>
                </div>
              ) : null}

              {showAnyLinks ? (
                <div className="flex flex-wrap gap-3">
                  {person.links?.email ? (
                    <a
                      href={`mailto:${person.links.email}`}
                      className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition-all bg-linear-to-r ${colors.accent} hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20`}
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
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                  {person.links?.scholar ? (
                    <a
                      href={person.links.scholar}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                    >
                      Google Scholar
                    </a>
                  ) : null}
                  {person.links?.orcid ? (
                    <a
                      href={person.links.orcid}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                    >
                      ORCID
                    </a>
                  ) : null}
                  {person.links?.website ? (
                    <a
                      href={person.links.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
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
