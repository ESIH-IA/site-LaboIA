import type { Locale } from "@/lib/i18n";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import {
  formSettingsQuery,
  getDefaultGovernanceChartStrict,
  getGovernanceMembers,
  getGovernancePage,
  homePageQuery,
  kpiListQuery,
  kpiSettingsQuery,
  navigationQuery,
  newsListQuery,
  partnerListQuery,
  projectListQuery,
  researchAxisListQuery,
  siteSettingsQuery,
  solutionsPageQuery,
} from "@/lib/sanity/queries";
import type {
  FormSettings,
  HomePageData,
  KpiItem,
  KpiSettings,
  Navigation,
  NewsListItem,
  PartnerListItem,
  ProjectListItem,
  ResearchAxisListItem,
  SiteSettings,
  SolutionsPage,
} from "@/lib/sanity/types";

type HomeDataBundle = {
  home: HomePageData;
  kpis: KpiItem[];
  kpiSettings: KpiSettings;
  featuredProjects: ProjectListItem[];
  featuredNews: NewsListItem[];
  allNews: NewsListItem[];
  featuredPartners: PartnerListItem[];
  researchAxes: ResearchAxisListItem[];
};

const emptySiteSettings: SiteSettings = {
  _id: "siteSettings-empty",
  name: "",
  shortName: "",
};

const emptyNavigation: Navigation = {
  _id: "navigation-empty",
  mainNav: [],
  footerNav: [],
};

const emptyHome: HomePageData = { _id: "homePage-empty" };
const emptySolutionsPage: SolutionsPage = { _id: "solutionsPage-empty" };

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  if (!isSanityConfigured) return emptySiteSettings;
  return sanityFetch<SiteSettings | null>(siteSettingsQuery, { locale }, null).then(
    (site) => site ?? emptySiteSettings,
  );
}

export async function getNavigation(locale: Locale): Promise<Navigation> {
  if (!isSanityConfigured) return emptyNavigation;
  return sanityFetch<Navigation | null>(navigationQuery, { locale }, null).then(
    (nav) => nav ?? emptyNavigation,
  );
}

export async function getHomeData(locale: Locale): Promise<HomeDataBundle> {
  if (!isSanityConfigured) {
    return {
      home: emptyHome,
      kpis: [],
      kpiSettings: { _id: "kpiSettings-empty" },
      featuredProjects: [],
      featuredNews: [],
      allNews: [],
      featuredPartners: [],
      researchAxes: [],
    };
  }

  const [home, kpis, kpiSettings, projects, news, partners, axes] = await Promise.all([
    sanityFetch<HomePageData | null>(homePageQuery, { locale }, null),
    sanityFetch<KpiItem[]>(kpiListQuery, { locale }, []),
    sanityFetch<KpiSettings | null>(kpiSettingsQuery, { locale }, null),
    sanityFetch<ProjectListItem[]>(projectListQuery, { locale }, []),
    sanityFetch<NewsListItem[]>(newsListQuery, { locale }, []),
    sanityFetch<PartnerListItem[]>(partnerListQuery, { locale }, []),
    sanityFetch<ResearchAxisListItem[]>(researchAxisListQuery, { locale }, []),
  ]);

  return {
    home: home ?? emptyHome,
    kpis,
    kpiSettings: kpiSettings ?? { _id: "kpiSettings-empty" },
    featuredProjects: projects.filter((p) => p.featured),
    featuredNews: news.filter((n) => n.featured),
    allNews: news,
    featuredPartners: partners.filter((p) => p.featured),
    researchAxes: axes,
  };
}

export async function getSolutionsPageData(locale: Locale): Promise<SolutionsPage> {
  if (!isSanityConfigured) return emptySolutionsPage;
  const page = await sanityFetch<SolutionsPage | null>(solutionsPageQuery, { locale }, null);
  return page ?? emptySolutionsPage;
}

export async function getFormSettings(locale: Locale): Promise<FormSettings | null> {
  if (!isSanityConfigured) return null;
  return sanityFetch<FormSettings | null>(formSettingsQuery, { locale }, null);
}

export async function getGovernancePageData(locale: Locale) {
  if (!isSanityConfigured) {
    return { mode: "sanity" as const, page: null, chart: null, members: [] };
  }
  const page = await getGovernancePage(locale);
  if (!page) {
    return { mode: "sanity" as const, page: null, chart: null, members: [] };
  }
  const chart = page.showOrgChart
    ? await getDefaultGovernanceChartStrict(locale)
    : null;
  const members = page.membersGroupsToShow?.length
    ? await getGovernanceMembers(
        page.membersGroupsToShow,
        page.membersOrder ?? "orderAsc",
      )
    : [];
  return { mode: "sanity" as const, page, chart, members };
}
