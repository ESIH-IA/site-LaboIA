import Hero from "@/components/home/hero";
import Intro from "@/components/home/intro";
import Kpis from "@/components/home/kpis";
import Highlights from "@/components/home/highlights";
import PublicationsPreview from "@/components/home/publications-preview";
import Partners from "@/components/home/partners";
import CollaborateCta from "@/components/home/collaborate-cta";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { getHomeData, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

type ActionVariant = "primary" | "secondary" | "tertiary";

type CmsAction = {
  label: string;
  href: string;
  variant?: string;
};

const allowedVariants = new Set<ActionVariant>(["primary", "secondary", "tertiary"]);

function normalizeActions(actions?: CmsAction[]) {
  if (!actions) return [];
  return actions.map((action) => ({
    ...action,
    variant: allowedVariants.has(action.variant as ActionVariant)
      ? (action.variant as ActionVariant)
      : undefined,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return await buildMetadata({
    locale,
    path: localizedPath("/", locale),
    alternates: {
      fr: localizedPath("/", "fr"),
      en: localizedPath("/", "en"),
    },
  });
}

export default async function Home() {
  const locale = await getServerLocale();
  const [site, homeData] = await Promise.all([getSiteSettings(locale), getHomeData(locale)]);
  const { home, kpis, kpiSettings, featuredNews, featuredPartners } = homeData;

  const publications = featuredNews.map((item) => ({
    _id: item._id,
    title: item.title,
    category: item.category,
    date: item.date,
    summary: item.summary,
    sourceUrl: item.sourceUrl,
  }));

  const partners = featuredPartners.map((partner) => ({
    _id: partner._id,
    name: partner.name,
    type: partner.partnerType,
    shortDescription: partner.shortDescription,
    website: partner.website,
    tags: partner.tags,
  }));

  return (
    <>
      <Hero banner={site.banner} />
      <Intro
        eyebrow={home.introEyebrow ?? site.shortName}
        badge={home.heroBadge}
        title={home.introTitle ?? site.description}
        body={home.introBody}
        actions={normalizeActions(home.introActions)}
      />
      <Kpis title={home.kpisTitle} intro={home.kpisIntro} items={kpis} meta={kpiSettings} />
      <Highlights title={home.highlightsTitle} intro={home.highlightsIntro} items={home.highlights ?? []} />
      <PublicationsPreview
        title={home.publicationsTitle}
        intro={home.publicationsIntro}
        items={publications}
      />
      <Partners
        title={home.partnersTitle}
        intro={home.partnersIntro}
        badge={home.partnersBadge}
        items={partners}
      />
      <CollaborateCta
        title={home.collaborateTitle}
        body={home.collaborateBody}
        actions={normalizeActions(home.collaborateActions)}
      />
    </>
  );
}
