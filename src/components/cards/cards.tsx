import Link from "next/link";

import type {
  MemberListItem,
  ProjectListItem,
  PublicationListItem,
} from "@/lib/sanity/types";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <Link href={`/projets/${project.slug.current}`} className="simple-card" style={{ display: "block", color: "inherit", textDecoration: "none" }}>
      <div className="simple-card-meta">
        {project.projectType ? (
          <span className="badge badge-primary">
            {project.projectType}
          </span>
        ) : null}
        {project.startDate ? <span>{project.startDate}</span> : null}
      </div>
      <h2 className="simple-card-title">{project.title}</h2>
      {project.summary ? <p className="simple-card-text">{project.summary}</p> : null}
    </Link>
  );
}

export function PublicationCard({ publication }: { publication: PublicationListItem }) {
  return (
    <Link href={`/publications/${publication.slug.current}`} className="simple-card" style={{ display: "block", color: "inherit", textDecoration: "none" }}>
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
    </Link>
  );
}

export function MemberCard({ member }: { member: MemberListItem }) {
  return (
    <Link href={`/equipe/${member.slug.current}`} className="simple-card" style={{ display: "block", color: "inherit", textDecoration: "none" }}>
      {member.role ? (
        <div className="simple-card-meta">{member.role}</div>
      ) : null}
      <h2 className="simple-card-title" style={{ fontSize: "1.125rem" }}>{member.fullName}</h2>
      {member.bio ? <p className="simple-card-text">{member.bio}</p> : null}
    </Link>
  );
}
