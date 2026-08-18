import type {
  ProjectListItem,
} from "@/lib/sanity/types";

// Pas de lien : il n'y a plus de page de detail /projets/[slug] sur ce site
// (perimetre reduit a Accueil/Solutions/Actualites/Contact).
export function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <div className="simple-card" style={{ display: "block" }}>
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
    </div>
  );
}
