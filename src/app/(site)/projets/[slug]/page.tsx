import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentBlocks } from "@/components/content/blocks";
import {
  getPartners,
  getPeople,
  getProjects,
  getProjectBySlug,
} from "@/lib/content-loader";

type PageProps = { params: { slug: string } };

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const partners = getPartners();
  const people = getPeople();

  return (
    <article className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
        <span className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">
          {project.type}
        </span>
        <span>{project.status}</span>
        <span aria-hidden="true">•</span>
        <span>Début {project.yearStart}</span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{project.title}</h1>
      <p className="mt-3 text-lg text-neutral-700">{project.shortDescription}</p>

      {project.tags?.length ? (
        <div className="mt-6 flex flex-wrap gap-2 text-sm text-neutral-700">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-800">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-8 space-y-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        {/* IMPORTANT : ContentBlocks doit accepter les blocks projets.
           Si ton ContentBlocks est typé sur ContentBlock (articles) uniquement,
           il faut harmoniser les types (voir note ci-dessous). */}
        <ContentBlocks blocks={project.overviewBlocks} />
      </div>

      {project.portals?.length ? (
        <div className="mt-10 space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">Ressources officielles</h2>
          <div className="flex flex-wrap gap-3 text-sm text-neutral-800">
            {project.portals.map((portal) => (
              <Link
                key={portal.url}
                href={portal.url}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                {portal.label}
                <span aria-hidden>↗</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Partenaires liés</h2>

          {project.related.partners.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-600">Contenu en cours de publication.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-neutral-800">
              {project.related.partners.map((partnerId) => {
                const partner = partners.find((p) => p.id === partnerId);
                if (!partner) return null;

                return (
                  <li key={partner.id} className="flex items-center justify-between gap-3">
                    <span className="font-medium">{partner.name}</span>
                    <span className="text-xs uppercase text-neutral-500">{partner.type}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Équipe impliquée</h2>

          {project.related.people.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-600">Contenu en cours de publication.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-neutral-800">
              {project.related.people.map((personId) => {
                const person = people.find((member) => member.id === personId);
                if (!person) return null;

                return (
                  <li key={person.id} className="flex items-center justify-between gap-3">
                    <Link
                      href={`/equipe/${person.slug}`}
                      className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                    >
                      {person.fullName}
                    </Link>
                    <span className="text-xs uppercase text-neutral-500">{person.role}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}
