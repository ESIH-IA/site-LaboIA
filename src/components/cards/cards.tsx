import Link from "next/link";

import type {
  MemberListItem,
  ProjectListItem,
  PublicationListItem,
} from "@/lib/sanity/types";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <article className="simple-card">
      <div className="simple-card-meta">
        {project.projectType ? (
          <span className="badge badge-primary">
            {project.projectType}
          </span>
        ) : null}
        {project.startDate ? <span>Since {project.startDate}</span> : null}
      </div>
      <h2 className="simple-card-title">{project.title}</h2>
      {project.summary ? <p className="simple-card-text">{project.summary}</p> : null}
      <div className="simple-card-bottom">
        <Link
          href={`/projets/${project.slug.current}`}
          className="btn-link"
        >
          Voir le projet
        </Link>
      </div>
    </article>
  );
}

export function PublicationCard({ publication }: { publication: PublicationListItem }) {
  return (
    <article className="simple-card">
      <div className="simple-card-meta">
        {publication.publicationType ? (
          <span className="badge badge-accent">
            {publication.publicationType}
          </span>
        ) : null}
        {publication.date ? <span>{publication.date}</span> : null}
      </div>
      <h2 className="simple-card-title" style={{ marginTop: "0.75rem" }}>{publication.title}</h2>
      {publication.summary ? (
        <p className="simple-card-text" style={{ marginTop: "0.5rem" }}>{publication.summary}</p>
      ) : null}
      <Link
        href={`/publications/${publication.slug.current}`}
        className="btn-link"
        style={{ marginTop: "1rem", display: "inline-flex" }}
      >
        Voir la publication
      </Link>
    </article>
  );
}

export function MemberCard({ member }: { member: MemberListItem }) {
  return (
    <article className="simple-card">
      {member.role ? (
        <div className="simple-card-meta">{member.role}</div>
      ) : null}
      <h2 className="simple-card-title" style={{ fontSize: "1.125rem" }}>{member.fullName}</h2>
      {member.bio ? <p className="simple-card-text">{member.bio}</p> : null}
      <div className="simple-card-bottom">
        <Link
          href={`/equipe/${member.slug.current}`}
          className="btn-link"
        >
          Voir le profil
        </Link>
      </div>
    </article>
  );
}
