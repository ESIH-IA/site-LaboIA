import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { memberBySlugQuery, memberListQuery } from "@/lib/sanity/queries";
import type { MemberListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: { slug: string } };

type MemberDetail = {
  _id: string;
  fullName: string;
  role?: string;
  affiliation?: string;
  bio?: string;
  expertise?: string[];
  links?: Array<{ label?: string; url?: string }>;
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  projects?: Array<{ _id: string; title: string; slug?: { current: string }; summary?: string }>;
  publications?: Array<{ _id: string; title: string; slug?: { current: string }; date?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getServerLocale();
  const member = await sanityFetch<MemberDetail | null>(
    memberBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  const frSlug = member?.slugIntl?.fr?.current ?? params.slug;
  const enSlug = member?.slugIntl?.en?.current ?? params.slug;

  return buildMetadata({
    title: member?.fullName,
    description: member?.bio,
    path: localizedPath(`/equipe/${params.slug}`, locale),
    alternates: {
      fr: localizedPath(`/equipe/${frSlug}`, "fr"),
      en: localizedPath(`/equipe/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const locale = await getServerLocale();
  const member = await sanityFetch<MemberDetail | null>(
    memberBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  if (!member) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-neutral-900">{member.fullName}</h1>
      {member.role ? <p className="mt-2 text-sm font-semibold text-neutral-600">{member.role}</p> : null}
      {member.affiliation ? (
        <p className="mt-1 text-sm text-neutral-500">{member.affiliation}</p>
      ) : null}

      {member.bio ? <p className="mt-6 text-neutral-700">{member.bio}</p> : null}

      {member.expertise?.length ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">Domaines</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-neutral-700">
            {member.expertise.map((item) => (
              <span key={item} className="rounded-full bg-neutral-100 px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {member.links?.length ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">Liens</h2>
          <ul className="mt-3 space-y-2">
            {member.links.map((link, index) => (
              <li key={`${link.url ?? "link"}-${index}`}>
                {link.url ? (
                  <Link
                    href={link.url}
                    className="text-neutral-900 underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label ?? link.url}
                  </Link>
                ) : (
                  <span>{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {member.projects?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Projets lies</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {member.projects.map((project) => (
              <Link
                key={project._id}
                href={`/projets/${project.slug?.current ?? ""}`}
                className="rounded-2xl border border-neutral-200 bg-white p-5 hover:border-neutral-400"
              >
                <div className="text-sm font-semibold text-neutral-900">{project.title}</div>
                {project.summary ? (
                  <div className="mt-2 text-sm text-neutral-600">{project.summary}</div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {member.publications?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Publications liees</h2>
          <div className="mt-4 grid gap-4">
            {member.publications.map((publication) => (
              <Link
                key={publication._id}
                href={`/publications/${publication.slug?.current ?? ""}`}
                className="rounded-2xl border border-neutral-200 bg-white p-5 hover:border-neutral-400"
              >
                <div className="text-sm font-semibold text-neutral-900">{publication.title}</div>
                {publication.date ? (
                  <div className="mt-2 text-sm text-neutral-600">{publication.date}</div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export async function generateStaticParams() {
  const members = await sanityFetch<MemberListItem[]>(memberListQuery, { locale: "fr" }, []);
  const slugs = new Set<string>();
  members.forEach((member) => {
    if (member.slug?.current) slugs.add(member.slug.current);
    if (member.slugIntl?.fr?.current) slugs.add(member.slugIntl.fr.current);
    if (member.slugIntl?.en?.current) slugs.add(member.slugIntl.en.current);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}
