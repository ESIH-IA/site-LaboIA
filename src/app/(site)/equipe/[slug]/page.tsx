import Link from "next/link";
import { notFound } from "next/navigation";

import { people } from "@/content/people";
import { projects } from "@/content/projects";
import { getArticles } from "@/lib/content-loader";

type PageProps = { params: { slug: string } };

export default function Page({ params }: PageProps) {
  const person = people.find((p) => p.slug === params.slug);
  if (!person) notFound();

  const allArticles = getArticles();
  const relatedProjects = projects.filter((project) =>
    person.related.projects.includes(project.id),
  );
  const relatedArticles = allArticles.filter((article) =>
    person.related.articles.includes(article.id),
  );

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-neutral-900">{person.fullName}</h1>
      <p className="mt-2 text-sm font-semibold text-neutral-600">{person.role}</p>

      <p className="mt-6 text-neutral-700">{person.bio}</p>

      {person.links?.length ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">Liens</h2>
          <ul className="mt-3 space-y-2">
            {person.links.map((l) => (
              <li key={l.url}>
                <Link
                  href={l.url}
                  className="text-neutral-900 underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {relatedProjects.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Projets liés</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projets/${p.id}`}
                className="rounded-2xl border border-neutral-200 bg-white p-5 hover:border-neutral-400"
              >
                <div className="text-sm font-semibold text-neutral-900">{p.title}</div>
                <div className="mt-2 text-sm text-neutral-600">{p.shortDescription}</div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {relatedArticles.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Articles liés</h2>
          <div className="mt-4 grid gap-4">
            {relatedArticles.map((a) => (
              <Link
                key={a.id}
                href={`/actualites/${a.slug}`}
                className="rounded-2xl border border-neutral-200 bg-white p-5 hover:border-neutral-400"
              >
                <div className="text-sm font-semibold text-neutral-900">{a.title}</div>
                <div className="mt-2 text-sm text-neutral-600">{a.summary}</div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}
