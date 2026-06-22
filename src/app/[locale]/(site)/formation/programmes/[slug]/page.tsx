import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { programBySlugQuery } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

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
  const { slug } = await params;
  const locale = await getServerLocale();
  const program = await sanityFetch<ProgramDetail | null>(
    programBySlugQuery,
    { slug, locale },
    null,
  );

  const frSlug = program?.slugIntl?.fr?.current ?? slug;
  const enSlug = program?.slugIntl?.en?.current ?? slug;

  return await buildMetadata({
    locale,
    title: program?.title,
    description: program?.summary,
    path: localizedPath(`/formation/programmes/${slug}`, locale),
    alternates: {
      fr: localizedPath(`/formation/programmes/${frSlug}`, "fr"),
      en: localizedPath(`/formation/programmes/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const program = await sanityFetch<ProgramDetail | null>(
    programBySlugQuery,
    { slug, locale },
    null,
  );

  if (!program) {
    notFound();
  }

  return (
    <article className="container" style={{maxWidth:'56rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <Link
        href="/formation"
        className="btn-link"
        aria-label="formation"
      >
        {"<"}
      </Link>
      <h1 className="section-title" style={{marginTop:'1rem'}}>{program.title}</h1>
      {program.summary ? <p className="section-subtitle" style={{fontSize:'1.125rem'}}>{program.summary}</p> : null}
      <div style={{marginTop:'1.5rem'}}>
        <PortableTextRenderer value={program.content} />
      </div>

      {program.members?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
            {program.members.map((member) => (
              <li key={member._id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.75rem'}}>
                {member.slug?.current ? (
                  <Link
                    href={`/equipe/${member.slug.current}`}
                    className="btn-link"
                  >
                    {member.fullName}
                  </Link>
                ) : (
                  <span style={{fontWeight:500}}>{member.fullName}</span>
                )}
                {member.role ? <span style={{fontSize:'0.75rem', textTransform:'uppercase', color:'var(--muted)'}}>{member.role}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

