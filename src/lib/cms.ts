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

function copyFor(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        nav: {
          home: "Home",
          about: "About",
          research: "Research",
          lacdiaTech: "LaCDIA Tech",
          news: "News",
          team: "Team",
          collaborate: "Collaborate",
          contact: "Contact",
          partnerships: "Partnerships",
          publications: "Publications",
          training: "Training",
          resources: "Resources",
          solutions: "AI Solutions",
          legalNotice: "Legal Notice",
          privacy: "Privacy Policy",
          cookies: "Cookie Policy",
          newsletter: "Newsletter",
        },
        site: {
          description:
            "Research and innovation laboratory in AI and data science: projects, publications, partnerships, transfer and training.",
          tagline: "AI and data science research laboratory",
          footerContactTitle: "Contact",
          footerContactText: "Collaboration, projects, supervision.",
          footerContactCtaLabel: "Write to the lab",
          footerLanguageNote: "Languages: French and English.",
        },
        home: {
          heroBadge: "AI - Research - Innovation",
          introEyebrow: "LaCDIA",
          introTitle: "Research and innovation laboratory in AI and data science.",
          introBody:
            "We conduct applied and fundamental research, and we also support partners and institutions in designing solutions based on artificial intelligence, data science and intelligent systems.",
          highlightsTitle: "What we do",
          highlightsIntro:
            "Applied and fundamental research areas that place AI at the service of local needs and global challenges.",
          kpisTitle: "Key indicators",
          kpisIntro: "Quantitative data on our research and innovation activities.",
          featuredProjectsTitle: "Featured projects",
          featuredProjectsIntro:
            "Concrete initiatives that demonstrate the power of AI and data science in service of communities.",
          featuredProjectsCtaLabel: "Browse all projects",
          publicationsTitle: "Recent publications",
          publicationsIntro:
            "Articles, reports and communications documenting our scientific progress.",
          partnersTitle: "Partners and collaborations",
          partnersIntro:
            "We work with academic, public and private institutions to accelerate the impact of research.",
          partnersBadge: "Need to collaborate? Contact us.",
          collaborateTitle: "Collaborate with the laboratory",
          collaborateBody:
            "Institutional partnerships, internships, funding or applied projects: let's build impact solutions together.",
          eventLabel: "Upcoming event",
          eventTitle: "AI and Data seminar for public services",
          eventDate: "Thursday, April 25 at 10:00 AM",
          eventLocation: "ESIH Campus, Port-au-Prince",
          eventCtaLabel: "View program",
        },
        solutions: {
          heroBadge: "AI services and solutions",
          heroPrimary: "Propose a project",
          heroSecondary: "View use cases",
          approachTitle: "Our approach",
          approachIntro: "A scientific approach that is rigorous and impact-oriented.",
          approachSteps: ["Diagnosis", "Modeling", "Deployment"],
          solutionsTitle: "AI solutions",
          solutionsIntro:
            "Concrete solutions to analyze, automate, decide and make information accessible.",
          useCasesTitle: "Use cases",
          useCasesIntro: "Concrete projects and impact pathways.",
          flowTitle: "Applied AI flow",
          flowDescription: "Field data -> Knowledge -> AI models -> Decision",
          servicesTitle: "Services offered",
          servicesIntro: "Full support, from idea to deployment.",
          sectorsTitle: "Application sectors",
          sectorsIntro:
            "Solutions adaptable to any sector that works with data and documents.",
          projectsTitle: "Ongoing projects",
          projectsIntro: "Our applied research and innovation projects.",
        },
      };
    default:
      return {
        nav: {
          home: "Accueil",
          about: "À propos",
          research: "Recherche",
          lacdiaTech: "LaCDIA Tech",
          news: "Actualités",
          team: "Équipe",
          collaborate: "Collaborer",
          contact: "Contact",
          partnerships: "Partenariats",
          publications: "Publications",
          training: "Formation",
          resources: "Ressources",
          solutions: "Solutions IA",
          legalNotice: "Mentions légales",
          privacy: "Politique de confidentialité",
          cookies: "Politique cookies",
          newsletter: "Newsletter",
        },
        site: {
          description:
            "Laboratoire de recherche et d'innovation en IA et science des données : projets, publications, partenariats, transfert et formation.",
          tagline: "Laboratoire de recherche en IA et science des données",
          footerContactTitle: "Contact",
          footerContactText: "Collaboration, projets, encadrement.",
          footerContactCtaLabel: "Écrire au laboratoire",
          footerLanguageNote: "Langues : français et anglais.",
        },
        home: {
          heroBadge: "Intelligence Artificielle - Recherche - Innovation",
          introEyebrow: localSite.shortName,
          introTitle: localHero.description ?? localSite.description,
          introBody:
            "Nous menons des travaux de recherche appliquée et fondamentale, et nous accompagnons également des partenaires et des institutions dans la conception de solutions fondées sur l'intelligence artificielle, la science des données et les systèmes intelligents.",
          highlightsTitle: "Ce que nous faisons",
          highlightsIntro:
            "Des axes de recherche appliquée et fondamentale qui valorisent l'IA au service des besoins locaux et des enjeux globaux.",
          kpisTitle: "Indicateurs clés",
          kpisIntro: "Données quantitatives sur nos activités de recherche et d'innovation.",
          featuredProjectsTitle: "Projets à la une",
          featuredProjectsIntro:
            "Des initiatives concrètes qui démontrent la puissance de l'IA et de la science des données au service des communautés.",
          featuredProjectsCtaLabel: "Découvrir tous les projets",
          publicationsTitle: "Publications récentes",
          publicationsIntro:
            "Articles, rapports et communications qui documentent nos avancées scientifiques.",
          partnersTitle: "Partenaires et collaborations",
          partnersIntro:
            "Nous travaillons avec des institutions académiques, publiques et privées pour accélérer l'impact de la recherche.",
          partnersBadge: "Besoin de collaborer ? Contactez-nous.",
          collaborateTitle: "Collaborer avec le laboratoire",
          collaborateBody:
            "Partenariats institutionnels, stages, financements ou projets appliqués : construisons ensemble des solutions d'impact.",
          eventLabel: localEvent.label,
          eventTitle: localEvent.title,
          eventDate: localEvent.date,
          eventLocation: localEvent.location,
          eventCtaLabel: localEvent.ctaLabel,
        },
        solutions: {
          heroBadge: "Services et Solutions IA",
          heroPrimary: "Proposer un projet",
          heroSecondary: "Voir les cas d'usage",
          approachTitle: "Notre approche",
          approachIntro: "Une démarche scientifique, rigoureuse et orientée impact.",
          approachSteps: ["Diagnostic", "Modélisation", "Déploiement"],
          solutionsTitle: "Solutions IA",
          solutionsIntro:
            "Des solutions concrètes pour analyser, automatiser, décider et rendre l'information accessible.",
          useCasesTitle: "Cas d'usage",
          useCasesIntro: "Projets concrets et parcours d'impact.",
          flowTitle: "Flux IA applique",
          flowDescription:
            "Données terrain -> Connaissances -> Modèles IA -> Décision",
          servicesTitle: "Services proposés",
          servicesIntro: "Un accompagnement complet, de l'idée au déploiement.",
          sectorsTitle: "Secteurs d'application",
          sectorsIntro:
            "Des solutions adaptables à tous les secteurs disposant de données et de documents.",
          projectsTitle: "Projets en cours",
          projectsIntro: "Nos projets de recherche appliquée et d'innovation.",
        },
      };
  }
}

function fallbackSolutionsPage(locale: Locale): SolutionsPage {
  const copy = copyFor(locale).solutions;
  return {
    _id: "local-solutions",
    heroBadge: copy.heroBadge,
    heroTitle: localSolutionsHero.title,
    heroSubtitle: localSolutionsHero.subtitle,
    heroDescription: localSolutionsHero.description,
    heroPrimaryCta: { label: copy.heroPrimary, href: "/contact", variant: "primary" },
    heroSecondaryCta: { label: copy.heroSecondary, href: "#cas-usage", variant: "secondary" },
    approachTitle: copy.approachTitle,
    approachIntro: copy.approachIntro,
    approachSteps: [
      {
        title: copy.approachSteps[0],
        description:
          "Qualification des données, besoins métier et contraintes terrain.",
      },
      {
        title: copy.approachSteps[1],
        description: "Conception IA, prototypage rapide et validation scientifique.",
      },
      {
        title: copy.approachSteps[2],
        description: "Intégration, accompagnement et mesure d'impact.",
      },
    ],
    solutionsTitle: copy.solutionsTitle,
    solutionsIntro: copy.solutionsIntro,
    solutions: localSolutions.map((solution, index) => ({
      _id: solution.id,
      title: solution.title,
      shortDescription: solution.shortDescription,
      benefits: [...solution.benefits],
      examples: [...solution.examples],
      icon: solution.icon,
      order: index,
    })),
    useCasesTitle: copy.useCasesTitle,
    useCasesIntro: copy.useCasesIntro,
    featuredUseCase: localUseCases[0]
      ? {
          _id: localUseCases[0].id,
          title: localUseCases[0].title,
          context: localUseCases[0].context,
          solution: localUseCases[0].solution,
          benefits: [...localUseCases[0].benefits],
        }
      : null,
    flowTitle: copy.flowTitle,
    flowDescription: copy.flowDescription,
    flowSteps: locale === "en" ? ["Collection", "Analysis", "Recommendation", "Field follow-up"] : ["Collecte", "Analyse", "Recommandation", "Suivi terrain"],
    servicesTitle: copy.servicesTitle,
    servicesIntro: copy.servicesIntro,
    services: [
      locale === "en" ? "Scientific consulting" : "Conseil scientifique",
      locale === "en" ? "AI development" : "Développement IA",
      "Data engineering",
      locale === "en" ? "Decision support systems" : "Systèmes d'aide à la décision",
      locale === "en" ? "MLOps and deployment" : "MLOps et deploiement",
    ],
    sectorsTitle: copy.sectorsTitle,
    sectorsIntro: copy.sectorsIntro,
    sectors: localSectors.map((sector, index) => ({
      _id: sector.id,
      name: sector.name,
      icon: sector.icon,
      order: index,
    })),
    projectsTitle: copy.projectsTitle,
    projectsIntro: copy.projectsIntro,
  };
}

function fallbackSiteSettings(locale: Locale): SiteSettings {
  const copy = copyFor(locale).site;
  return {
    _id: "local-site",
    name: localSite.name,
    shortName: localSite.shortName,
    description: copy.description,
    tagline: copy.tagline,
    footerContactTitle: copy.footerContactTitle,
    footerContactText: copy.footerContactText,
    footerContactCtaLabel: copy.footerContactCtaLabel,
    footerContactCtaHref: "/contact",
    footerLanguageNote: copy.footerLanguageNote,
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

function fallbackNavigation(locale: Locale): Navigation {
  const copy = copyFor(locale).nav;
  const mainLabels: Record<string, string> = {
    "/": copy.home,
    "/a-propos": copy.about,
    "/recherche/departement-scientifique": copy.research,
    "/lacdia-tech": copy.lacdiaTech,
    "/actualites": copy.news,
    "/equipe": copy.team,
    "/collaborer": copy.collaborate,
  };
  return {
    _id: "local-nav",
    mainNav: localMainNav.map((item) => ({
      label: mainLabels[item.href] ?? String(item.label),
      href: item.href,
    })),
    footerNav: [],
  };
}

function fallbackHome(locale: Locale): HomePageData {
  const copy = copyFor(locale).home;
  type LocalHeroAction = {
    label: string;
    href: string;
    variant?: string;
  };
  const actionLabelOverrides: Record<Locale, Record<string, string>> = {
    fr: {},
    en: {
      "/a-propos": "Discover the laboratory",
      "/recherche/departement-scientifique": "Our research axes",
      "/lacdia-tech": "LaCDIA Tech — Services",
    },
  };

  function translateActionLabel(action: LocalHeroAction) {
    return actionLabelOverrides[locale][action.href] ?? action.label;
  }

  return {
    _id: "local-home",
    heroBadge: copy.heroBadge,
    heroActions: localHero.actions?.map((action: LocalHeroAction) => ({
      label: translateActionLabel(action),
      href: action.href,
      variant: action.variant,
    })),
    introEyebrow: copy.introEyebrow,
    introTitle: copy.introTitle,
    introBody: copy.introBody,
    introActions: localHero.actions?.map((action: LocalHeroAction) => ({
      label: translateActionLabel(action),
      href: action.href,
      variant: action.variant,
    })),
    highlightsTitle: copy.highlightsTitle,
    highlightsIntro: copy.highlightsIntro,
    highlights: [
      {
        title:
          locale === "en" ? "Smart agriculture" : "Agriculture intelligente",
        description:
          locale === "en"
            ? "Yield prediction systems, crop monitoring and data-driven early warnings."
            : "Systèmes de prédiction des rendements, monitoring des cultures et alertes précoces basées sur la donnée.",
      },
      {
        title:
          locale === "en"
            ? "Public services and governance"
            : "Services publics et gouvernance",
        description:
          locale === "en"
            ? "Optimizing essential services, data observatories and decision support."
            : "Optimisation des services essentiels, observatoires de données et aide à la décision.",
      },
      {
        title:
          locale === "en" ? "Health and environment" : "Santé et environnement",
        description:
          locale === "en"
            ? "Epidemiological data analysis, risk detection and scenario modeling."
            : "Analyse de données épidémiologiques, détection de risques et modélisation de scénarios.",
      },
    ],
    kpisTitle: copy.kpisTitle,
    kpisIntro: copy.kpisIntro,
    featuredProjectsTitle: copy.featuredProjectsTitle,
    featuredProjectsIntro: copy.featuredProjectsIntro,
    featuredProjectsCtaLabel: copy.featuredProjectsCtaLabel,
    featuredProjectsCtaHref: "/projets",
    publicationsTitle: copy.publicationsTitle,
    publicationsIntro: copy.publicationsIntro,
    partnersTitle: copy.partnersTitle,
    partnersIntro: copy.partnersIntro,
    partnersBadge: copy.partnersBadge,
    collaborateTitle: copy.collaborateTitle,
    collaborateBody: copy.collaborateBody,
    collaborateActions: [
      {
        label:
          locale === "en" ? "Propose a partnership" : "Proposer un partenariat",
        href: "/collaborer",
        variant: "primary",
      },
      {
        label:
          locale === "en" ? "Apply for an internship" : "Candidater à un stage",
        href: "/collaborer",
        variant: "secondary",
      },
    ],
    eventBanner: {
      enabled: true,
      label: copy.eventLabel,
      title: copy.eventTitle,
      date: copy.eventDate,
      location: copy.eventLocation,
      ctaLabel: copy.eventCtaLabel,
      ctaHref: localEvent.ctaHref,
    },
  };
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  if (!isSanityConfigured) return fallbackSiteSettings(locale);
  const site = await sanityFetch<SiteSettings | null>(siteSettingsQuery, { locale }, null);
  return site ?? fallbackSiteSettings(locale);
}

export async function getNavigation(locale: Locale): Promise<Navigation> {
  if (!isSanityConfigured) return fallbackNavigation(locale);
  const nav = await sanityFetch<Navigation | null>(navigationQuery, { locale }, null);
  return nav ?? fallbackNavigation(locale);
}

export async function getHomeData(locale: Locale): Promise<HomeDataBundle> {
  if (!isSanityConfigured) {
    return {
      home: fallbackHome(locale),
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
    home: home ?? fallbackHome(locale),
    kpis,
    kpiSettings: kpiSettings ?? { _id: "kpi-settings" },
    featuredProjects: projects.filter((project) => project.featured),
    featuredNews: news.filter((item) => item.featured),
    featuredPartners: partners.filter((partner) => partner.featured),
  };
}

export async function getSolutionsPageData(locale: Locale): Promise<SolutionsPage> {
  if (!isSanityConfigured) {
    return fallbackSolutionsPage(locale);
  }

  const page = await sanityFetch<SolutionsPage | null>(solutionsPageQuery, { locale }, null);
  return page ?? fallbackSolutionsPage(locale);
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
