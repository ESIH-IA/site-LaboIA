import type { Metadata } from "next";

import PortableTextRenderer from "@/components/content/portable-text";
import { OrgChart } from "@/components/team/OrgChart";
import { PeopleSection } from "@/components/team/PeopleSection";
import { localizedPath } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";
import { getTeamPageData } from "@/lib/team/getTeamPageData";
import { buildMetadata } from "@/lib/seo";

function isPortableText(value: unknown): value is import("@portabletext/types").PortableTextBlock[] {
  return Array.isArray(value);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const data = await getTeamPageData(locale);

  return buildMetadata({
    title: data.page.title,
    description: undefined,
    path: localizedPath("/equipe", locale),
    alternates: {
      fr: localizedPath("/equipe", "fr"),
      en: localizedPath("/equipe", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const data = await getTeamPageData(locale);

  const intro = data.page.intro;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-surface to-accent/10 p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            LaCDIA
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-foreground md:text-4xl">
            {data.page.title}
          </h1>
          {intro ? (
            <div className="mt-6">
              {isPortableText(intro) ? (
                <PortableTextRenderer value={intro} />
              ) : (
                <p className="text-sm text-muted">{String(intro)}</p>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <section className="mt-12">
        <div className="rounded-3xl border border-border bg-gradient-to-b from-orange-500/10 to-surface p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-foreground">Organigramme</h2>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Hiérarchie & responsabilités
            </div>
          </div>
          <OrgChart nodes={data.orgChartNodes} />
        </div>
      </section>

      <PeopleSection
        title={data.page.researchSectionTitle}
        members={data.researchMembers}
        emptyText={data.page.emptyResearchText}
        readMoreLabel={data.page.readMoreLabel}
        tone="research"
      />

      <PeopleSection
        title={data.page.associatesSectionTitle}
        members={data.associateMembers}
        emptyText={data.page.emptyAssociatesText}
        readMoreLabel={data.page.readMoreLabel}
        badgeLabel={data.page.associateBadgeLabel}
        tone="associate"
      />
    </section>
  );
}
