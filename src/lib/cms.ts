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
        description: "Qualification des donnees, besoins metier et contraintes terrain.",
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
    flowDescription: "Donnees terrain -> Connaissances -> Modeles IA -> Decision",
    flowSteps: ["Collecte", "Analyse", "Recommandation", "Suivi terrain"],
    servicesTitle: "Services proposes",
    servicesIntro: "Un accompagnement complet, de l'idee au deploiement.",
    services: [
      "Conseil scientifique",
      "Developpement IA",
      "Data engineering",
      "Systemes d'aide a la decision",
      "MLOps et deploiement",
    ],
    sectorsTitle: "Secteurs d'application",
    sectorsIntro: "Des solutions adaptables a tous les secteurs disposant de donnees et de documents.",
    sectors: localSectors.map((sector, index) => ({
      _id: sector.id,
      name: sector.name,
      icon: sector.icon,
      order: index,
    })),
    projectsTitle: "Projets en cours",
    projectsIntro: "Nos projets de recherche appliquee et d'innovation.",
  };
}

function fallbackSiteSettings(): SiteSettings {
  return {
    _id: "local-site",
    name: localSite.name,
    shortName: localSite.shortName,
    description: localSite.description,
    tagline: "Laboratoire de recherche en IA & science des donnees",
    footerContactTitle: "Contact",
    footerContactText: "Collaboration, projets, encadrement.",
    footerContactCtaLabel: "Ecrire au laboratoire",
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
      "Nous menons des travaux de recherche appliquee et fondamentale, et nous accompagnons egalement des partenaires et des institutions dans la conception de solutions fondees sur l'intelligence artificielle, la science des donnees et les systemes intelligents.",
    introActions: localHero.actions?.map((action) => ({
      label: action.label,
      href: action.href,
      variant: action.variant,
    })),
    highlightsTitle: "Ce que nous faisons",
    highlightsIntro:
      "Des axes de recherche appliquee et fondamentale qui valorisent l'IA au service des besoins locaux et des enjeux globaux.",
    highlights: [
      {
        title: "Agriculture intelligente",
        description:
          "Systemes de prediction des rendements, monitoring des cultures et alertes precoces bases sur la donnee.",
      },
      {
        title: "Services publics & gouvernance",
        description:
          "Optimisation des services essentiels, observatoires de donnees et aide a la decision.",
      },
      {
        title: "Sante & environnement",
        description:
          "Analyse de donnees epidemiologiques, detection de risques et modelisation de scenarios.",
      },
    ],
    kpisTitle: "Indicateurs cles",
    kpisIntro: "Donnees quantitatives sur nos activites de recherche et d'innovation",
    featuredProjectsTitle: "Projets a la une",
    featuredProjectsIntro:
      "Des initiatives concretes qui demontrent la puissance de l'IA et de la science des donnees au service des communautes.",
    featuredProjectsCtaLabel: "Decouvrir tous les projets",
    featuredProjectsCtaHref: "/projets",
    publicationsTitle: "Publications recentes",
    publicationsIntro: "Articles, rapports et communications qui documentent nos avancees scientifiques.",
    partnersTitle: "Partenaires & collaborations",
    partnersIntro:
      "Nous travaillons avec des institutions academiques, publiques et privees pour accelerer l'impact de la recherche.",
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
