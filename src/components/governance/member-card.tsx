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
      accent: "from-slate-500 to-slate-600",
      badgeBg: "rgba(100,116,139,0.15)",
      badgeBorder: "rgba(100,116,139,0.3)",
      badgeColor: "#94a3b8",
    },
    direction: {
      gradient: "bg-linear-to-br from-cyan-500 to-teal-600",
      accent: "from-cyan-500 to-teal-500",
      badgeBg: "rgba(0,212,170,0.12)",
      badgeBorder: "rgba(0,212,170,0.25)",
      badgeColor: "#00d4aa",
    },
    recherche: {
      gradient: "bg-linear-to-br from-teal-500 to-teal-700",
      accent: "from-teal-500 to-cyan-500",
      badgeBg: "rgba(20,184,166,0.12)",
      badgeBorder: "rgba(20,184,166,0.25)",
      badgeColor: "#2dd4bf",
    },
    conseil: {
      gradient: "bg-linear-to-br from-violet-600 to-violet-700",
      accent: "from-violet-500 to-cyan-500",
      badgeBg: "rgba(108,99,255,0.12)",
      badgeBorder: "rgba(108,99,255,0.25)",
      badgeColor: "#a78bfa",
    },
  } as const;

  const colors = categoryColors[category];

  return (
    <>
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer scroll-mt-24"
        style={{
          background: "var(--labo-surface)",
          border: "1px solid var(--labo-border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        }}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,170,0.3)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,212,170,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--labo-border)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
        }}
        aria-label={`Voir le profil complet de ${person.name}`}
        id={`profile-${person._id}`}
      >
        {/* Accent bar top */}
        <div className={`absolute left-0 right-0 top-0 h-1 bg-linear-to-r ${colors.accent}`} />

        {/* Photo zone */}
        <div className={["relative h-36 flex items-center justify-center", colors.gradient].join(" ")}>
          {imageUrl ? (
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-white/30 shadow-2xl">
              <Image src={imageUrl} alt={person.name} fill sizes="112px" className="object-cover" />
            </div>
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-4 ring-white/30 shadow-2xl">
              <span className="text-4xl font-bold text-white">{initials}</span>
            </div>
          )}
        </div>

        {/* Content zone */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              {person.name}
            </h3>
            {person.roleTitle ? (
              <p className="text-sm font-medium" style={{ color: "var(--labo-text-muted)" }}>
                {person.roleTitle}
              </p>
            ) : null}
            {person.affiliation ? (
              <p className="mt-1 text-xs italic" style={{ color: "rgba(136,146,176,0.6)" }}>
                {person.affiliation}
              </p>
            ) : null}
          </div>

          {person.expertise && person.expertise.length > 0 ? (
            <div className="mb-4">
              <div className="mb-2 label-eyebrow" style={{ color: "rgba(136,146,176,0.55)" }}>
                Expertise
              </div>
              <div className="flex flex-wrap gap-2">
                {person.expertise.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: colors.badgeBg,
                      border: `1px solid ${colors.badgeBorder}`,
                      color: colors.badgeColor,
                    }}
                  >
                    {item}
                  </span>
                ))}
                {person.expertise.length > 3 ? (
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "rgba(136,146,176,0.08)",
                      border: "1px solid rgba(136,146,176,0.15)",
                      color: "rgba(136,146,176,0.6)",
                    }}
                  >
                    +{person.expertise.length - 3}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}

          {preview ? (
            <div className="mb-4 text-sm leading-relaxed line-clamp-3" style={{ color: "var(--labo-text-muted)" }}>
              {preview}
            </div>
          ) : null}

          {person.contribution ? (
            <div
              className="mb-4 rounded-xl p-4 text-sm"
              style={{
                background: "rgba(0,212,170,0.04)",
                border: "1px solid rgba(0,212,170,0.1)",
              }}
            >
              <div className="mb-1 label-eyebrow" style={{ color: "rgba(136,146,176,0.55)" }}>
                Contribution
              </div>
              <p className="italic line-clamp-2 leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
                {person.contribution}
              </p>
            </div>
          ) : null}

          <div
            className="mt-auto flex flex-col gap-3 pt-4"
            style={{ borderTop: "1px solid var(--labo-border)" }}
          >
            {person.links?.email ? (
              <a
                href={`mailto:${person.links.email}`}
                className={`btn-primary-labo`}
                style={{ fontSize: "0.85rem" }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Contact
              </a>
            ) : null}
            <span
              className="text-xs font-medium text-center transition-colors"
              style={{ color: "rgba(136,146,176,0.45)" }}
            >
              Cliquez pour en savoir plus &gt;
            </span>
          </div>
        </div>
      </article>

      {open ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          style={{ background: "rgba(10,15,28,0.92)", backdropFilter: "blur(8px)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`Bio de ${person.name}`}
          id={dialogId}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
            style={{ background: "var(--labo-surface)", border: "1px solid var(--labo-border)" }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div
              className="relative overflow-hidden px-8 py-6"
              style={{ borderBottom: "1px solid var(--labo-border)" }}
            >
              <div className={`absolute left-0 right-0 top-0 h-1 bg-linear-to-r ${colors.accent}`} />
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
                  >
                    {person.name}
                  </h3>
                  {person.roleTitle ? (
                    <p className="text-base mb-1" style={{ color: "var(--labo-text-muted)" }}>
                      {person.roleTitle}
                    </p>
                  ) : null}
                  {person.affiliation ? (
                    <p className="text-sm italic" style={{ color: "rgba(136,146,176,0.6)" }}>
                      {person.affiliation}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
                  style={{
                    border: "1px solid var(--labo-border)",
                    background: "transparent",
                    color: "var(--labo-text-muted)",
                  }}
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
                  <div className="mb-3 label-eyebrow" style={{ color: "rgba(136,146,176,0.55)" }}>
                    Domaines d&apos;expertise
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {person.expertise.map((item, idx) => (
                      <span
                        key={idx}
                        className="rounded-full px-3 py-1.5 text-sm font-semibold"
                        style={{
                          background: colors.badgeBg,
                          border: `1px solid ${colors.badgeBorder}`,
                          color: colors.badgeColor,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {longBio ? (
                <div className="mb-6">
                  <div className="mb-3 label-eyebrow" style={{ color: "rgba(136,146,176,0.55)" }}>
                    Biographie
                  </div>
                  <p
                    className="whitespace-pre-wrap text-base leading-relaxed"
                    style={{ color: "var(--labo-text-muted)" }}
                  >
                    {longBio}
                  </p>
                </div>
              ) : null}

              {person.contribution ? (
                <div
                  className="mb-6 rounded-xl p-5"
                  style={{
                    background: "rgba(0,212,170,0.04)",
                    border: "1px solid rgba(0,212,170,0.1)",
                  }}
                >
                  <div className="mb-2 label-eyebrow" style={{ color: "rgba(136,146,176,0.55)" }}>
                    Contribution
                  </div>
                  <p className="text-base italic leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
                    {person.contribution}
                  </p>
                </div>
              ) : null}

              {showAnyLinks ? (
                <div className="flex flex-wrap gap-3">
                  {person.links?.email ? (
                    <a
                      href={`mailto:${person.links.email}`}
                      className={`btn-primary-labo`}
                      style={{ fontSize: "0.85rem" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                      className="btn-secondary-labo"
                      style={{ fontSize: "0.85rem" }}
                    >
                      LinkedIn
                    </a>
                  ) : null}
                  {person.links?.scholar ? (
                    <a
                      href={person.links.scholar}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary-labo"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Google Scholar
                    </a>
                  ) : null}
                  {person.links?.orcid ? (
                    <a
                      href={person.links.orcid}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary-labo"
                      style={{ fontSize: "0.85rem" }}
                    >
                      ORCID
                    </a>
                  ) : null}
                  {person.links?.website ? (
                    <a
                      href={person.links.website}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary-labo"
                      style={{ fontSize: "0.85rem" }}
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