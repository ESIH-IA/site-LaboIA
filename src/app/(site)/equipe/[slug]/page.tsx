import Link from "next/link";

import { ContentBlocks } from "@/components/content/blocks";
import { getArticles, getPeople, getPersonBySlug, getProjects } from "@/lib/content-loader";

type Params = { params: { slug: string } };

export default function PersonPage({ params }: Params) {
  const person = getPersonBySlug(params.slug);
  const projects = getProjects();
  const articles = getArticles();

  const relatedProjects = projects.filter((project) => person.related.projects.includes(project.id));
  const relatedArticles = articles.filter((article) => person.related.articles.includes(article.id));

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{person.role}</p>
      <h1 className="mt-3 text-3xl font-semibold text-neutral-900">{person.fullName}</h1>
      <p className="mt-3 text-lg text-neutral-700">{person.bio}</p>

      {person.links?.length ? (
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-neutral-900">
          {person.links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <span aria-hidden>↗</span>
            </Link>
          ))}
        </div>
      ) : null}

      {person?.longBioBlocks?.length ? (
        <div className="mt-8 space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <ContentBlocks blocks={person.longBioBlocks} />
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Projets liés</h2>
          {relatedProjects.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-600">Contenu en cours de publication.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-neutral-800">
              {relatedProjects.map((project) => (
                <li key={project.id} className="flex items-center justify-between gap-3">
                  <Link
                    href={`/projets/${project.slug}`}
                    className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                  >
                    {project.title}
                  </Link>
                  <span className="text-xs uppercase text-neutral-500">{project.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Publications / retombées</h2>
          {relatedArticles.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-600">Contenu en cours de publication.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-neutral-800">
              {relatedArticles.map((article) => (
                <li key={article.id} className="flex items-center justify-between gap-3">
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                  >
                    {article.title}
                  </Link>
                  <span className="text-xs uppercase text-neutral-500">{article.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return getPeople().map((person) => ({ slug: person.slug }));
}
