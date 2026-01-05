import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import { MemberCard } from "@/components/cards/cards";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery, memberListQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage, MemberListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "equipe", locale },
    null,
  );

  return buildMetadata({
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/equipe", locale),
    alternates: {
      fr: localizedPath("/equipe", "fr"),
      en: localizedPath("/equipe", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "equipe", locale },
    null,
  );
  const members = await sanityFetch<MemberListItem[]>(memberListQuery, { locale }, []);

  const groups = [
    {
      key: "research",
      title: "Chercheurs et enseignants-chercheurs",
      roles: ["researcher", "teacher-researcher"],
    },
    { key: "doctoral", title: "Doctorants et etudiants", roles: ["doctoral", "student"] },
    { key: "alumni", title: "Alumni", roles: ["alumni"] },
    { key: "staff", title: "Coordination et staff", roles: ["staff"] },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
        {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      </div>
      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      {members.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
          Contenu en cours de publication.
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {groups.map((group) => {
            const grouped = members.filter((member) => group.roles.includes(member.role ?? ""));
            if (grouped.length === 0) return null;

            return (
              <div key={group.key}>
                <h2 className="text-xl font-semibold text-neutral-900">{group.title}</h2>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped.map((member) => (
                    <MemberCard key={member._id} member={member} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
