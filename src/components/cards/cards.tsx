import Link from "next/link";

import type {
  MemberListItem,
  ProjectListItem,
  PublicationListItem,
} from "@/lib/sanity/types";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted">
        {project.projectType ? (
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
            {project.projectType}
          </span>
        ) : null}
        {project.startDate ? <span>Since {project.startDate}</span> : null}
      </div>
      <h2 className="text-xl font-semibold text-foreground">{project.title}</h2>
      {project.summary ? <p className="text-sm text-muted">{project.summary}</p> : null}
      <div className="mt-auto">
        <Link
          href={`/projets/${project.slug.current}`}
          className="text-sm font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
        >
          Voir le projet
        </Link>
      </div>
    </article>
  );
}

export function PublicationCard({ publication }: { publication: PublicationListItem }) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-muted">
        {publication.publicationType ? (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
            {publication.publicationType}
          </span>
        ) : null}
        {publication.date ? <span>{publication.date}</span> : null}
      </div>
      <h2 className="mt-3 text-xl font-semibold text-foreground">{publication.title}</h2>
      {publication.summary ? (
        <p className="mt-2 text-sm text-muted">{publication.summary}</p>
      ) : null}
      <Link
        href={`/publications/${publication.slug.current}`}
        className="mt-4 inline-flex text-sm font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
      >
        Voir la publication
      </Link>
    </article>
  );
}

export function MemberCard({ member }: { member: MemberListItem }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md">
      {member.role ? (
        <div className="text-sm uppercase tracking-wide text-muted">{member.role}</div>
      ) : null}
      <h2 className="text-lg font-semibold text-foreground">{member.fullName}</h2>
      {member.bio ? <p className="text-sm text-muted">{member.bio}</p> : null}
      <div className="mt-auto">
        <Link
          href={`/equipe/${member.slug.current}`}
          className="text-sm font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
        >
          Voir le profil
        </Link>
      </div>
    </article>
  );
}
