import Link from "next/link";

import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import { ProjectCard, PublicationCard } from "@/components/cards/cards";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import {
  institutionalPageBySlugQuery,
  publicationListQuery,
  projectListQuery,
  researchAxisListQuery,
} from "@/lib/sanity/queries";
import type {
  InstitutionalPage,
  PublicationListItem,
  ProjectListItem,
  ResearchAxisListItem,
} from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "recherche", locale },
    null,
  );

  return buildMetadata({
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/recherche", locale),
    alternates: {
      fr: localizedPath("/recherche", "fr"),
      en: localizedPath("/recherche", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "recherche", locale },
    null,
  );
  const axes = await sanityFetch<ResearchAxisListItem[]>(researchAxisListQuery, { locale }, []);
  const projects = await sanityFetch<ProjectListItem[]>(projectListQuery, { locale }, []);
  const publications = await sanityFetch<PublicationListItem[]>(publicationListQuery, { locale }, []);

  const researchProjects = projects.filter((project) => project.projectType === "research");

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
      {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-neutral-900">Axes de recherche</h2>
          <Link
            href="/recherche/axes"
            className="text-sm font-semibold text-neutral-900 underline underline-offset-4"
          >
            Voir tous les axes
          </Link>
        </div>
        {axes.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {axes.slice(0, 4).map((axis) => (
              <article
                key={axis._id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-neutral-900">{axis.title}</h3>
                {axis.summary ? <p className="mt-2 text-sm text-neutral-700">{axis.summary}</p> : null}
                <Link
                  href={`/recherche/axes/${axis.slug.current}`}
                  className="mt-3 inline-flex text-sm font-semibold text-neutral-900 underline underline-offset-4"
                >
                  Explorer l{"'"}axe
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-xl font-semibold text-neutral-900">Recherche avancee</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Explorez les publications, projets et membres avec une recherche plein texte.
        </p>
        <Link
          href="/recherche/explorer"
          className="mt-4 inline-flex text-sm font-semibold text-neutral-900 underline underline-offset-4"
        >
          Lancer la recherche
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Projets de recherche</h2>
        {researchProjects.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {researchProjects.slice(0, 4).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Publications liees</h2>
        {publications.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-6">
            {publications.slice(0, 4).map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
            ))}
          </div>
        )}
      </div>
      {!page ? (
        <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
          Contenu en cours de publication.
        </div>
      ) : null}
    </section>
  );
}
