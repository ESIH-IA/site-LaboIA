import { hero as localHero, event as localEvent } from "@/content/home";
import { kpis as localKpis, kpiMeta as localKpiMeta } from "@/content/kpis";
import { mainNav as localMainNav, footerNav as localFooterNav } from "@/content/nav";
import { partners as localPartners } from "@/content/partners";
import { projects as localProjects } from "@/content/projects";
import { articles as localArticles } from "@/content/articles";
import { site as localSite } from "@/content/site";
import { aiSolutions as localSolutions, useCases as localUseCases, sectors as localSectors, heroContent as localSolutionsHero } from "@/data/solutions";
import { getGovernanceData as getLocalGovernanceData } from "@/data/governance";
import type { Locale } from "@/lib/i18n";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import {
  homePageQuery,
  kpiListQuery,
  kpiSettingsQuery,
  navigationQuery,
  newsListQuery,
  partnerListQuery,
  projectListQuery,
  siteSettingsQuery,
  solutionsPageQuery,
  getDefaultGovernanceChartStrict,
  getGovernanceMembers,
  getGovernancePage,
} from "@/lib/sanity/queries";
import type {
  HomePageData,
  KpiItem,
  KpiSettings,
  Navigation,
  NewsListItem,
  PartnerListItem,
  ProjectListItem,
  SiteSettings,
  SolutionsPage,
} from "@/lib/sanity/types";

type HomeDataBundle = {
  home: HomePageData;
  kpis: KpiItem[];
  kpiSettings: KpiSettings;
  featuredProjects: ProjectListItem[];
  featuredNews: NewsListItem[];
  featuredPartners: PartnerListItem[];
};

function fallbackSolutionsPage(): SolutionsPage {
  return {
    _id: "local-solutions",
    heroBadge: "Services & Solutions IA",
    heroTitle: localSolutionsHero.title,
    heroSubtitle: localSolutionsHero.subtitle,
    heroDescription: localSolutionsHero.description,
    heroPrimaryCta: { label: "Proposer un projet", href: "/contact", variant: "primary" },
    heroSecondaryCta: { label: "Voir les cas d'usage", href: "#cas-usage", variant: "secondary" },
    approachTitle: "Notre approche",
    approachIntro: "Une demarche scientifique, rigoureuse et orientee impact.",
    approachSteps: [
      {
        title: "Diagnostic",
        description:
          "Qualification des donn\u00e9es, besoins m\u00e9tier et contraintes terrain.",
      },
      {
        title: "Modelisation",
        description: "Conception IA, prototypage rapide et validation scientifique.",
      },
      {
        title: "Deploiement",
        description: "Integration, accompagnement et mesure d'impact.",
      },
    ],
    solutionsTitle: "Solutions IA",
    solutionsIntro:
      "Des solutions concretes pour analyser, automatiser, decider et rendre l'information accessible.",
    solutions: localSolutions.map((solution, index) => ({
      _id: solution.id,
      title: solution.title,
      shortDescription: solution.shortDescription,
      benefits: [...solution.benefits],
      examples: [...solution.examples],
      icon: solution.icon,
      order: index,
    })),
    useCasesTitle: "Cas d'usage",
    useCasesIntro: "Projets concrets et parcours d'impact.",
    featuredUseCase: localUseCases[0]
      ? {
          _id: localUseCases[0].id,
          title: localUseCases[0].title,
          context: localUseCases[0].context,
          solution: localUseCases[0].solution,
          benefits: [...localUseCases[0].benefits],
        }
      : null,
    flowTitle: "Flux IA applique",
    flowDescription:
      "Donn\u00e9es terrain -> Connaissances -> Mod\u00e8les IA -> D\u00e9cision",
    flowSteps: ["Collecte", "Analyse", "Recommandation", "Suivi terrain"],
    servicesTitle: "Services proposes",
    servicesIntro: "Un accompagnement complet, de l'idee au deploiement.",
    services: [
      "Conseil scientifique",
      "D\u00e9veloppement IA",
      "Data engineering",
      "Syst\u00e8mes d'aide \u00e0 la d\u00e9cision",
      "MLOps et deploiement",
    ],
    sectorsTitle: "Secteurs d'application",
    sectorsIntro:
      "Des solutions adaptables \u00e0 tous les secteurs disposant de donn\u00e9es et de documents.",
    sectors: localSectors.map((sector, index) => ({
      _id: sector.id,
      name: sector.name,
      icon: sector.icon,
      order: index,
    })),
    projectsTitle: "Projets en cours",
    projectsIntro: "Nos projets de recherche appliqu\u00e9e et d'innovation.",
  };
}

function fallbackSiteSettings(): SiteSettings {
  return {
    _id: "local-site",
    name: localSite.name,
    shortName: localSite.shortName,
    description: localSite.description,
    tagline: "Laboratoire de recherche en IA & science des donn\u00e9es",
    footerContactTitle: "Contact",
    footerContactText: "Collaboration, projets, encadrement.",
    footerContactCtaLabel: "\u00c9crire au laboratoire",
    footerContactCtaHref: "/contact",
    footerLanguageNote: "Langues : francais (defaut), anglais.",
    logo: {
      url: localSite.assets.logo.src,
      alt: localSite.assets.logo.alt,
      width: localSite.assets.logo.width,
      height: localSite.assets.logo.height,
    },
    banner: {
      url: localSite.assets.banner.src,
      alt: localSite.assets.banner.alt,
      width: localSite.assets.banner.width,
      height: localSite.assets.banner.height,
    },
  };
}

function fallbackNavigation(): Navigation {
  return {
    _id: "local-nav",
    mainNav: localMainNav.map((item) => ({ label: item.label, href: item.href })),
    footerNav: localFooterNav.map((item) => ({ label: item.label, href: item.href })),
  };
}

function fallbackHome(): HomePageData {
  return {
    _id: "local-home",
    heroBadge: "Intelligence Artificielle - Recherche - Innovation",
    heroActions: localHero.actions?.map((action) => ({
      label: action.label,
      href: action.href,
      variant: action.variant,
    })),
    introEyebrow: localSite.shortName,
    introTitle: localHero.description ?? localSite.description,
    introBody:
      "Nous menons des travaux de recherche appliqu\u00e9e et fondamentale, et nous accompagnons \u00e9galement des partenaires et des institutions dans la conception de solutions fond\u00e9es sur l'intelligence artificielle, la science des donn\u00e9es et les syst\u00e8mes intelligents.",
    introActions: localHero.actions?.map((action) => ({
      label: action.label,
      href: action.href,
      variant: action.variant,
    })),
    highlightsTitle: "Ce que nous faisons",
    highlightsIntro:
      "Des axes de recherche appliqu\u00e9e et fondamentale qui valorisent l'IA au service des besoins locaux et des enjeux globaux.",
    highlights: [
      {
        title: "Agriculture intelligente",
        description:
          "Syst\u00e8mes de pr\u00e9diction des rendements, monitoring des cultures et alertes pr\u00e9coces bas\u00e9es sur la donn\u00e9e.",
      },
      {
        title: "Services publics & gouvernance",
        description:
          "Optimisation des services essentiels, observatoires de donn\u00e9es et aide \u00e0 la d\u00e9cision.",
      },
      {
        title: "Sant\u00e9 & environnement",
        description:
          "Analyse de donn\u00e9es \u00e9pid\u00e9miologiques, d\u00e9tection de risques et mod\u00e9lisation de sc\u00e9narios.",
      },
    ],
    kpisTitle: "Indicateurs cles",
    kpisIntro:
      "Donn\u00e9es quantitatives sur nos activit\u00e9s de recherche et d'innovation",
    featuredProjectsTitle: "Projets \u00e0 la une",
    featuredProjectsIntro:
      "Des initiatives concr\u00e8tes qui d\u00e9montrent la puissance de l'IA et de la science des donn\u00e9es au service des communaut\u00e9s.",
    featuredProjectsCtaLabel: "D\u00e9couvrir tous les projets",
    featuredProjectsCtaHref: "/projets",
    publicationsTitle: "Publications r\u00e9centes",
    publicationsIntro:
      "Articles, rapports et communications qui documentent nos avanc\u00e9es scientifiques.",
    partnersTitle: "Partenaires & collaborations",
    partnersIntro:
      "Nous travaillons avec des institutions acad\u00e9miques, publiques et priv\u00e9es pour acc\u00e9l\u00e9rer l'impact de la recherche.",
    partnersBadge: "Besoin de collaborer ? Contactez-nous.",
    collaborateTitle: "Collaborer avec le laboratoire",
    collaborateBody:
      "Partenariats institutionnels, stages, financements ou projets appliques : construisons ensemble des solutions d'impact.",
    collaborateActions: [
      { label: "Proposer un partenariat", href: "/collaborer", variant: "primary" },
      { label: "Candidater a un stage", href: "/collaborer", variant: "secondary" },
    ],
    eventBanner: {
      enabled: true,
      label: localEvent.label,
      title: localEvent.title,
      date: localEvent.date,
      location: localEvent.location,
      ctaLabel: localEvent.ctaLabel,
      ctaHref: localEvent.ctaHref,
    },
  };
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  if (!isSanityConfigured) return fallbackSiteSettings();
  const site = await sanityFetch<SiteSettings | null>(siteSettingsQuery, { locale }, null);
  return site ?? fallbackSiteSettings();
}

export async function getNavigation(locale: Locale): Promise<Navigation> {
  if (!isSanityConfigured) return fallbackNavigation();
  const nav = await sanityFetch<Navigation | null>(navigationQuery, { locale }, null);
  return nav ?? fallbackNavigation();
}

export async function getHomeData(locale: Locale): Promise<HomeDataBundle> {
  if (!isSanityConfigured) {
    return {
      home: fallbackHome(),
      kpis: localKpis.map((item) => ({
        _id: item.key,
        key: item.key,
        label: item.label,
        value: item.value,
        note: item.note,
        status: item.status,
      })),
      kpiSettings: {
        _id: "local-kpi-settings",
        lastUpdated: localKpiMeta.lastUpdated,
        disclaimer: localKpiMeta.disclaimer,
      },
      featuredProjects: localProjects
        .filter((project) => project.featured)
        .map((project) => ({
          _id: project.id,
          title: project.title,
          slug: { current: project.slug },
          projectType: project.type,
          summary: project.shortDescription,
          shortDescription: project.shortDescription,
          statusLabel: project.status,
          tags: [...project.tags],
          featured: Boolean(project.featured),
        })),
      featuredNews: localArticles
        .filter((article) => article.featured)
        .map((article) => ({
          _id: article.id,
          title: article.title,
          slug: { current: article.id },
          date: article.date,
          category: article.category,
          summary: article.summary,
          sourceUrl: article.sourceUrl,
          featured: article.featured,
        })),
      featuredPartners: localPartners
        .filter((partner) => partner.featured)
        .map((partner) => ({
          _id: partner.id,
          name: partner.name,
          slug: { current: partner.id },
          partnerType: partner.type,
          shortDescription: partner.shortDescription,
          website: partner.website,
          tags: partner.tags ? [...partner.tags] : [],
          featured: partner.featured,
        })),
    };
  }

  const [home, kpis, kpiSettings, projects, news, partners] = await Promise.all([
    sanityFetch<HomePageData | null>(homePageQuery, { locale }, null),
    sanityFetch<KpiItem[]>(kpiListQuery, { locale }, []),
    sanityFetch<KpiSettings | null>(kpiSettingsQuery, { locale }, null),
    sanityFetch<ProjectListItem[]>(projectListQuery, { locale }, []),
    sanityFetch<NewsListItem[]>(newsListQuery, { locale }, []),
    sanityFetch<PartnerListItem[]>(partnerListQuery, { locale }, []),
  ]);

  return {
    home: home ?? fallbackHome(),
    kpis,
    kpiSettings: kpiSettings ?? { _id: "kpi-settings" },
    featuredProjects: projects.filter((project) => project.featured),
    featuredNews: news.filter((item) => item.featured),
    featuredPartners: partners.filter((partner) => partner.featured),
  };
}

export async function getSolutionsPageData(locale: Locale): Promise<SolutionsPage> {
  if (!isSanityConfigured) {
    return fallbackSolutionsPage();
  }

  const page = await sanityFetch<SolutionsPage | null>(solutionsPageQuery, { locale }, null);
  return page ?? fallbackSolutionsPage();
}

export async function getGovernancePageData(locale: Locale) {
  if (!isSanityConfigured) {
    return { mode: "local" as const, data: await getLocalGovernanceData() };
  }

  const page = await getGovernancePage(locale);
  if (!page) {
    return { mode: "local" as const, data: await getLocalGovernanceData() };
  }

  const chart = page.showOrgChart ? await getDefaultGovernanceChartStrict(locale) : null;

  const members = page.membersGroupsToShow?.length
    ? await getGovernanceMembers(page.membersGroupsToShow, page.membersOrder ?? "orderAsc")
    : [];

  return {
    mode: "sanity" as const,
    page,
    chart,
    members,
  };
}
