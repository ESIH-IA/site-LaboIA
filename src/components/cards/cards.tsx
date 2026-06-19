import Link from "next/link";

import type {
  MemberListItem,
  ProjectListItem,
  PublicationListItem,
} from "@/lib/sanity/types";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <article
      className="flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300"
      style={{
        background: "var(--labo-surface)",
        border: "1px solid var(--labo-border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,170,0.3)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--labo-border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide">
        {project.projectType ? (
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold"
            style={{
              background: "rgba(0,212,170,0.1)",
              color: "var(--labo-accent-teal)",
            }}
          >
            {project.projectType}
          </span>
        ) : null}
        {project.startDate ? (
          <span style={{ color: "var(--labo-text-muted)" }}>{project.startDate}</span>
        ) : null}
      </div>
      <h2
        className="text-xl font-semibold"
        style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
      >
        {project.title}
      </h2>
      {project.summary ? (
        <p className="text-sm leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
          {project.summary}
        </p>
      ) : null}
      <div className="mt-auto">
        <Link
          href={`/projets/${project.slug.current}`}
          className="text-sm font-semibold underline underline-offset-4 transition-colors"
          style={{ color: "var(--labo-accent-teal)" }}
        >
          Voir le projet
        </Link>
      </div>
    </article>
  );
}

export function PublicationCard({ publication }: { publication: PublicationListItem }) {
  return (
    <article
      className="rounded-2xl p-6 transition-all duration-300"
      style={{
        background: "var(--labo-surface)",
        border: "1px solid var(--labo-border)",
      }}
    >
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide">
        {publication.publicationType ? (
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold"
            style={{
              background: "rgba(108,99,255,0.1)",
              color: "var(--labo-accent-violet)",
            }}
          >
            {publication.publicationType}
          </span>
        ) : null}
        {publication.date ? (
          <span style={{ color: "var(--labo-text-muted)" }}>{publication.date}</span>
        ) : null}
      </div>
      <h2
        className="mt-3 text-xl font-semibold"
        style={{ color: "var(--labo-text)" }}
      >
        {publication.title}
      </h2>
      {publication.summary ? (
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
          {publication.summary}
        </p>
      ) : null}
      <Link
        href={`/publications/${publication.slug.current}`}
        className="mt-4 inline-flex text-sm font-semibold underline underline-offset-4 transition-colors"
        style={{ color: "var(--labo-accent-teal)" }}
      >
        Voir la publication
      </Link>
    </article>
  );
}

export function MemberCard({ member }: { member: MemberListItem }) {
  return (
    <article
      className="flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300"
      style={{
        background: "var(--labo-surface)",
        border: "1px solid var(--labo-border)",
      }}
    >
      {member.role ? (
        <div
          className="text-sm uppercase tracking-wide"
          style={{ color: "var(--labo-text-muted)" }}
        >
          {member.role}
        </div>
      ) : null}
      <h2
        className="text-lg font-semibold"
        style={{ color: "var(--labo-text)" }}
      >
        {member.fullName}
      </h2>
      {member.bio ? (
        <p className="text-sm leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
          {member.bio}
        </p>
      ) : null}
      <div className="mt-auto">
        <Link
          href={`/equipe/${member.slug.current}`}
          className="text-sm font-semibold underline underline-offset-4 transition-colors"
          style={{ color: "var(--labo-accent-teal)" }}
        >
          Voir le profil
        </Link>
      </div>
    </article>
  );
}