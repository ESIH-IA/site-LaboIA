import type { Metadata } from "next";

import PortableTextRenderer from "@/components/content/portable-text";
import { MembersGrid } from "@/components/governance/members-grid";
import { OrgChart } from "@/components/governance/org-chart";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { getGovernanceMembers, getGovernancePage, getOrgNodeTree } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await getGovernancePage(locale);

  return buildMetadata({
    title: page?.title,
    description: undefined,
    path: localizedPath("/gouvernance", locale),
    alternates: {
      fr: localizedPath("/gouvernance", "fr"),
      en: localizedPath("/gouvernance", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await getGovernancePage(locale);

  const root =
    page?.showOrgChart && page.orgChart?.rootNodeId
      ? await getOrgNodeTree(page.orgChart.rootNodeId)
      : null;

  const orgTitle = page?.orgChartSectionTitle ?? page?.orgChart?.title ?? null;
  const orgIntro = page?.orgChartSectionIntro ?? null;

  const membersGroups = page?.membersGroupsToShow ?? [
    "direction",
    "gouvernance",
    "comite_scientifique",
  ];
  const membersOrder = page?.membersOrder ?? "nameAsc";
  const members = page?.showMembers ? await getGovernanceMembers(membersGroups, membersOrder) : [];
  const membersTitle = page?.membersSectionTitle ?? "Membres";
  const membersIntro = page?.membersSectionIntro ?? null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        {page?.title ? (
          <h1 className="text-3xl font-semibold text-foreground">{page.title}</h1>
        ) : null}
      </div>

      {page?.intro ? (
        <div className="mt-6">
          <PortableTextRenderer value={page.intro} />
        </div>
      ) : null}

      {page?.showOrgChart && root ? (
        <section className="mt-12">
          {orgTitle ? <h2 className="text-2xl font-semibold text-foreground">{orgTitle}</h2> : null}
          {orgIntro ? (
            <div className="mt-4">
              <PortableTextRenderer value={orgIntro} />
            </div>
          ) : null}
          <OrgChart root={root} />
        </section>
      ) : null}

      {page?.showMembers ? (
        <MembersGrid title={membersTitle} intro={membersIntro ?? undefined} members={members} />
      ) : null}

      {!page ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-muted">
          Contenu en cours de publication.
        </div>
      ) : null}
    </section>
  );
}
