import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { programBySlugQuery, programListQuery } from "@/lib/sanity/queries";
import type { ProgramListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: { slug: string } };

type ProgramDetail = {
  _id: string;
  title: string;
  programType?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  content?: PortableTextBlock[];
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  members?: Array<{ _id: string; fullName: string; role?: string; slug?: { current: string } }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getServerLocale();
  const program = await sanityFetch<ProgramDetail | null>(
    programBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  const frSlug = program?.slugIntl?.fr?.current ?? params.slug;
  const enSlug = program?.slugIntl?.en?.current ?? params.slug;

  return buildMetadata({
    title: program?.title,
    description: program?.summary,
    path: localizedPath(`/formation/programmes/${params.slug}`, locale),
    alternates: {
      fr: localizedPath(`/formation/programmes/${frSlug}`, "fr"),
      en: localizedPath(`/formation/programmes/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const locale = await getServerLocale();
  const program = await sanityFetch<ProgramDetail | null>(
    programBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  if (!program) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/formation"
        className="text-sm font-semibold text-neutral-900 underline underline-offset-4"
      >
        Retour a la formation
      </Link>
      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{program.title}</h1>
      {program.summary ? <p className="mt-3 text-lg text-neutral-700">{program.summary}</p> : null}
      <div className="mt-6">
        <PortableTextRenderer value={program.content} />
      </div>

      {program.members?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Encadrement</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {program.members.map((member) => (
              <li key={member._id} className="flex items-center justify-between gap-3">
                {member.slug?.current ? (
                  <Link
                    href={`/equipe/${member.slug.current}`}
                    className="font-medium text-neutral-900 underline underline-offset-4"
                  >
                    {member.fullName}
                  </Link>
                ) : (
                  <span className="font-medium">{member.fullName}</span>
                )}
                {member.role ? <span className="text-xs uppercase text-neutral-500">{member.role}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export async function generateStaticParams() {
  const programs = await sanityFetch<ProgramListItem[]>(programListQuery, { locale: "fr" }, []);
  const slugs = new Set<string>();
  programs.forEach((program) => {
    if (program.slug?.current) slugs.add(program.slug.current);
    if (program.slugIntl?.fr?.current) slugs.add(program.slugIntl.fr.current);
    if (program.slugIntl?.en?.current) slugs.add(program.slugIntl.en.current);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}
