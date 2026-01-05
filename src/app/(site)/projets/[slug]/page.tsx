import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { projectBySlugQuery, projectListQuery } from "@/lib/sanity/queries";
import type { ProjectListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: { slug: string } };

type ProjectDetail = {
  _id: string;
  title: string;
  slug: { current: string };
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  projectType?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  objectives?: PortableTextBlock[];
  methods?: PortableTextBlock[];
  results?: PortableTextBlock[];
  members?: Array<{ _id: string; fullName: string; role?: string; slug?: { current: string } }>;
  partners?: Array<{ _id: string; name: string; partnerType?: string; slug?: { current: string } }>;
  publications?: Array<{ _id: string; title: string; slug?: { current: string } }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getServerLocale();
  const project = await sanityFetch<ProjectDetail | null>(
    projectBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  const frSlug = project?.slugIntl?.fr?.current ?? params.slug;
  const enSlug = project?.slugIntl?.en?.current ?? params.slug;

  return buildMetadata({
    title: project?.title,
    description: project?.summary,
    path: localizedPath(`/projets/${params.slug}`, locale),
    alternates: {
      fr: localizedPath(`/projets/${frSlug}`, "fr"),
      en: localizedPath(`/projets/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const locale = await getServerLocale();
  const project = await sanityFetch<ProjectDetail | null>(
    projectBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
        {project.projectType ? (
          <span className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">
            {project.projectType}
          </span>
        ) : null}
        {project.startDate ? <span>Start {project.startDate}</span> : null}
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{project.title}</h1>
      {project.summary ? <p className="mt-3 text-lg text-neutral-700">{project.summary}</p> : null}

      {(project.objectives || project.methods || project.results) && (
        <div className="mt-8 space-y-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          {project.objectives ? (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Objectifs</h2>
              <div className="mt-3">
                <PortableTextRenderer value={project.objectives} />
              </div>
            </div>
          ) : null}
          {project.methods ? (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Methodes</h2>
              <div className="mt-3">
                <PortableTextRenderer value={project.methods} />
              </div>
            </div>
          ) : null}
          {project.results ? (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Resultats</h2>
              <div className="mt-3">
                <PortableTextRenderer value={project.results} />
              </div>
            </div>
          ) : null}
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Partners</h2>
          {!project.partners?.length ? (
            <p className="mt-2 text-sm text-neutral-600">Contenu en cours de publication.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-neutral-800">
              {project.partners.map((partner) => (
                <li key={partner._id} className="flex items-center justify-between gap-3">
                  <span className="font-medium">{partner.name}</span>
                  {partner.partnerType ? (
                    <span className="text-xs uppercase text-neutral-500">{partner.partnerType}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Equipe impliquee</h2>
          {!project.members?.length ? (
            <p className="mt-2 text-sm text-neutral-600">Contenu en cours de publication.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-neutral-800">
              {project.members.map((member) => (
                <li key={member._id} className="flex items-center justify-between gap-3">
                  {member.slug?.current ? (
                    <Link
                      href={`/equipe/${member.slug.current}`}
                      className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                    >
                      {member.fullName}
                    </Link>
                  ) : (
                    <span className="font-medium">{member.fullName}</span>
                  )}
                  {member.role ? (
                    <span className="text-xs uppercase text-neutral-500">{member.role}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {project.publications?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Publications liees</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {project.publications.map((publication) => (
              <li key={publication._id}>
                {publication.slug?.current ? (
                  <Link
                    href={`/publications/${publication.slug.current}`}
                    className="font-medium text-neutral-900 underline underline-offset-4"
                  >
                    {publication.title}
                  </Link>
                ) : (
                  <span className="font-medium">{publication.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export async function generateStaticParams() {
  const projects = await sanityFetch<ProjectListItem[]>(projectListQuery, { locale: "fr" }, []);
  const slugs = new Set<string>();
  projects.forEach((project) => {
    if (project.slug?.current) slugs.add(project.slug.current);
    if (project.slugIntl?.fr?.current) slugs.add(project.slugIntl.fr.current);
    if (project.slugIntl?.en?.current) slugs.add(project.slugIntl.en.current);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}
