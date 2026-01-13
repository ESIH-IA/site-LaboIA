
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_API_TOKEN ?? process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  throw new Error("Missing SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID");
}
if (!dataset) {
  throw new Error("Missing SANITY_DATASET or NEXT_PUBLIC_SANITY_DATASET");
}
if (!token) {
  throw new Error("Missing SANITY_API_TOKEN (write token required)");
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const assetCache = new Map();
const makeKey = () => randomUUID();
const withKey = (item) => ({ _key: makeKey(), ...item });
const withKeys = (items) => items.map(withKey);

function localeString(value) {
  if (!value) return undefined;
  return { fr: value, en: value };
}

function localeText(value) {
  if (!value) return undefined;
  return { fr: value, en: value };
}

function localeBlock(blocks) {
  if (!blocks || blocks.length === 0) return undefined;
  return { fr: blocks, en: blocks };
}

function block(text, options = {}) {
  return {
    _key: makeKey(),
    _type: "block",
    style: options.style ?? "normal",
    markDefs: [],
    children: [{ _type: "span", text, marks: [] }],
    ...(options.listItem ? { listItem: options.listItem, level: options.level ?? 1 } : {}),
  };
}

async function uploadImageFromPublic(src) {
  if (!src) return null;
  const clean = src.startsWith("/") ? src.slice(1) : src;
  const filePath = path.join(process.cwd(), "public", clean);
  if (!fs.existsSync(filePath)) return null;

  if (assetCache.has(filePath)) return assetCache.get(filePath);

  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  assetCache.set(filePath, asset._id);
  return asset._id;
}

async function seed() {
  const logoAssetId = await uploadImageFromPublic("/logo/logo-site.svg");
  const bannerAssetId = await uploadImageFromPublic("/banner/banner-website.png");

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    name: "Laboratoire Carib\u00e9en des Sciences des Donn\u00e9es et de l'Intelligence Artificielle",
    shortName: "LaCDIA",
    description:
      "Laboratoire de recherche et d'innovation en IA et science des donn\u00e9es : projets, publications, partenariats, transfert et formation.",
    tagline: "Laboratoire de recherche en IA & science des donn\u00e9es",
    taglineIntl: localeString("Laboratoire de recherche en IA & science des donn\u00e9es"),
    logo: logoAssetId
      ? {
          image: { _type: "image", asset: { _type: "reference", _ref: logoAssetId } },
          alt: "Logo du laboratoire",
        }
      : undefined,
    banner: bannerAssetId
      ? {
          image: { _type: "image", asset: { _type: "reference", _ref: bannerAssetId } },
          alt: "Banni\u00e8re du laboratoire",
        }
      : undefined,
    footerContactTitle: "Contact",
    footerContactTitleIntl: localeString("Contact"),
    footerContactText: "Collaboration, projets, encadrement.",
    footerContactTextIntl: localeText("Collaboration, projets, encadrement."),
    footerContactCtaLabel: "\u00c9crire au laboratoire",
    footerContactCtaLabelIntl: localeString("\u00c9crire au laboratoire"),
    footerContactCtaHref: "/contact",
    footerLanguageNote: "Langues : fran\u00e7ais (d\u00e9faut), anglais.",
    footerLanguageNoteIntl: localeString("Langues : fran\u00e7ais (d\u00e9faut), anglais."),
  };

  const navigation = {
    _id: "navigation",
    _type: "navigation",
    mainNav: withKeys([
      { _type: "navItem", label: "Accueil", labelIntl: localeString("Accueil"), href: "/" },
      {
        _type: "navItem",
        label: "Services et Solutions IA",
        labelIntl: localeString("Services et Solutions IA"),
        href: "/solutions",
      },
      { _type: "navItem", label: "Actualit\u00e9s", labelIntl: localeString("Actualit\u00e9s"), href: "/actualites" },
      { _type: "navItem", label: "\u00c9quipe", labelIntl: localeString("\u00c9quipe"), href: "/equipe" },
      { _type: "navItem", label: "Collaborer", labelIntl: localeString("Collaborer"), href: "/collaborer" },
      { _type: "navItem", label: "Contact", labelIntl: localeString("Contact"), href: "/contact" },
    ]),
    footerNav: withKeys([
      {
        _type: "navItem",
        label: "Mentions l\u00e9gales",
        labelIntl: localeString("Mentions l\u00e9gales"),
        href: "/mentions-legales",
      },
      {
        _type: "navItem",
        label: "Politique de confidentialit\u00e9",
        labelIntl: localeString("Politique de confidentialit\u00e9"),
        href: "/confidentialite",
      },
      {
        _type: "navItem",
        label: "Politique cookies",
        labelIntl: localeString("Politique cookies"),
        href: "/cookies",
      },
      {
        _type: "navItem",
        label: "Newsletter",
        labelIntl: localeString("Newsletter"),
        href: "/newsletter",
      },
    ]),
  };

  const homePage = {
    _id: "homePage",
    _type: "homePage",
    heroBadge: localeString("Intelligence Artificielle - Recherche - Innovation"),
    heroTitle: localeString("LaCDIA"),
    heroSubtitle: localeText(
      "Nous menons des recherches en intelligence artificielle et science des donn\u00e9es pour l'agriculture, les services publics, la sant\u00e9 et l'innovation.",
    ),
    heroDescription: localeText(
      "Nous menons des recherches en intelligence artificielle et science des donn\u00e9es pour l'agriculture, les services publics, la sant\u00e9 et l'innovation.",
    ),
    heroActions: withKeys([
      { _type: "linkAction", label: "Collaborer avec le laboratoire", href: "/collaborer", variant: "primary" },
      { _type: "linkAction", label: "Explorer nos projets", href: "/projets", variant: "secondary" },
      { _type: "linkAction", label: "Voir les actualites", href: "/actualites", variant: "tertiary" },
    ]),
    introEyebrow: localeString("LaCDIA"),
    introTitle: localeString("Laboratoire de recherche et d'innovation en IA et science des donn\u00e9es."),
    introBody: localeText(
      "Nous menons des travaux de recherche appliqu\u00e9e et fondamentale, et nous accompagnons \u00e9galement des partenaires et des institutions dans la conception de solutions fond\u00e9es sur l'intelligence artificielle, la science des donn\u00e9es et les syst\u00e8mes intelligents.",
    ),
    introActions: withKeys([
      { _type: "linkAction", label: "Collaborer avec le laboratoire", href: "/collaborer", variant: "primary" },
      { _type: "linkAction", label: "Explorer nos projets", href: "/projets", variant: "secondary" },
      { _type: "linkAction", label: "Voir les actualites", href: "/actualites", variant: "tertiary" },
    ]),
    highlightsTitle: localeString("Ce que nous faisons"),
    highlightsIntro: localeText(
      "Des axes de recherche appliqu\u00e9e et fondamentale qui valorisent l'IA au service des besoins locaux et des enjeux globaux.",
    ),
    highlights: withKeys([
      {
        _type: "highlightItem",
        title: "Agriculture intelligente",
        titleIntl: localeString("Agriculture intelligente"),
        description:
          "Syst\u00e8mes de pr\u00e9diction des rendements, monitoring des cultures et alertes pr\u00e9coces bas\u00e9es sur la donn\u00e9e.",
        descriptionIntl: localeText(
          "Syst\u00e8mes de pr\u00e9diction des rendements, monitoring des cultures et alertes pr\u00e9coces bas\u00e9es sur la donn\u00e9e.",
        ),
      },
      {
        _type: "highlightItem",
        title: "Services publics & gouvernance",
        titleIntl: localeString("Services publics & gouvernance"),
        description:
          "Optimisation des services essentiels, observatoires de donn\u00e9es et aide \u00e0 la d\u00e9cision.",
        descriptionIntl: localeText(
          "Optimisation des services essentiels, observatoires de donn\u00e9es et aide \u00e0 la d\u00e9cision.",
        ),
      },
      {
        _type: "highlightItem",
        title: "Sant\u00e9 & environnement",
        titleIntl: localeString("Sant\u00e9 & environnement"),
        description:
          "Analyse de donn\u00e9es \u00e9pid\u00e9miologiques, d\u00e9tection de risques et mod\u00e9lisation de sc\u00e9narios.",
        descriptionIntl: localeText(
          "Analyse de donn\u00e9es \u00e9pid\u00e9miologiques, d\u00e9tection de risques et mod\u00e9lisation de sc\u00e9narios.",
        ),
      },
    ]),
    kpisTitle: localeString("Indicateurs cles"),
    kpisIntro: localeText("Donn\u00e9es quantitatives sur nos activit\u00e9s de recherche et d'innovation"),
    featuredProjectsTitle: localeString("Projets \u00e0 la une"),
    featuredProjectsIntro: localeText(
      "Des initiatives concr\u00e8tes qui d\u00e9montrent la puissance de l'IA et de la science des donn\u00e9es au service des communaut\u00e9s.",
    ),
    featuredProjectsCtaLabel: localeString("Decouvrir tous les projets"),
    featuredProjectsCtaHref: "/projets",
    publicationsTitle: localeString("Publications r\u00e9centes"),
    publicationsIntro: localeText("Articles, rapports et communications qui documentent nos avanc\u00e9es scientifiques."),
    partnersTitle: localeString("Partenaires & collaborations"),
    partnersIntro: localeText(
      "Nous travaillons avec des institutions acad\u00e9miques, publiques et priv\u00e9es pour acc\u00e9l\u00e9rer l'impact de la recherche.",
    ),
    partnersBadge: localeString("Besoin de collaborer ? Contactez-nous."),
    collaborateTitle: localeString("Collaborer avec le laboratoire"),
    collaborateBody: localeText(
      "Partenariats institutionnels, stages, financements ou projets appliques : construisons ensemble des solutions d'impact.",
    ),
    collaborateActions: withKeys([
      { _type: "linkAction", label: "Proposer un partenariat", href: "/collaborer", variant: "primary" },
      { _type: "linkAction", label: "Candidater a un stage", href: "/collaborer", variant: "secondary" },
    ]),
    eventBanner: {
      enabled: true,
      label: localeString("Evenement a venir"),
      title: localeString("S\u00e9minaire IA & donn\u00e9es pour les services publics"),
      date: localeString("Jeudi 25 avril a 10h00"),
      location: localeString("Campus ESIH, Port-au-Prince"),
      ctaLabel: localeString("Voir le programme"),
      ctaHref: "/actualites",
    },
  };
  const kpis = [
    {
      _id: "kpi-projects",
      _type: "kpi",
      key: "projects",
      label: "Projets",
      labelIntl: localeString("Projets"),
      value: "?",
      note: "En cours de consolidation",
      noteIntl: localeText("En cours de consolidation"),
      status: "draft",
    },
    {
      _id: "kpi-publications",
      _type: "kpi",
      key: "publications",
      label: "Publications",
      labelIntl: localeString("Publications"),
      value: "?",
      note: "Mise a jour prochainement",
      noteIntl: localeText("Mise a jour prochainement"),
      status: "draft",
    },
    {
      _id: "kpi-partners",
      _type: "kpi",
      key: "partners",
      label: "Partenaires / Clients",
      labelIntl: localeString("Partenaires / Clients"),
      value: "2+",
      note: "Liste evolutive",
      noteIntl: localeText("Liste evolutive"),
      status: "draft",
    },
    {
      _id: "kpi-students",
      _type: "kpi",
      key: "students",
      label: "Etudiants impliques",
      labelIntl: localeString("Etudiants impliques"),
      value: "30+",
      note: "Selon activites en cours",
      noteIntl: localeText("Selon activites en cours"),
      status: "draft",
    },
  ];

  const kpiSettings = {
    _id: "kpiSettings",
    _type: "kpiSettings",
    lastUpdated: "2025-12-30",
    lastUpdatedIntl: localeString("2025-12-30"),
    disclaimer: "Certains indicateurs sont provisoires et seront confirmes apres consolidation interne.",
    disclaimerIntl: localeString(
      "Certains indicateurs sont provisoires et seront confirmes apres consolidation interne.",
    ),
  };

  const partners = [
    {
      _id: "partner-infosnation",
      _type: "partner",
      status: "published",
      name: "InfosNation",
      nameIntl: localeString("InfosNation"),
      slug: { current: "infosnation" },
      slugIntl: { fr: { current: "infosnation" }, en: { current: "infosnation" } },
      partnerType: "media",
      shortDescription:
        "Plateforme mediatique independante engagee pour un journalisme rigoureux et la valorisation des savoirs.",
      shortDescriptionIntl: localeText(
        "Plateforme mediatique independante engagee pour un journalisme rigoureux et la valorisation des savoirs.",
      ),
      website: "https://infosnation.com",
      tags: ["M\u00e9diation scientifique", "Partenariat \u00e9ditorial", "Sciences & Soci\u00e9t\u00e9"],
      featured: true,
    },
  ];

  const members = [
    {
      _id: "member-livenson-nicolas",
      _type: "member",
      status: "published",
      fullName: "Livenson Nicolas",
      slug: { current: "livenson-nicolas" },
      slugIntl: { fr: { current: "livenson-nicolas" }, en: { current: "livenson-nicolas" } },
      role: "Etudiant(e) stagiaire",
      bio:
        "Travaux sur un tuteur num\u00e9rique intelligent bas\u00e9 sur une architecture RAG multi-agents, appliqu\u00e9e \u00e0 l'accompagnement des producteurs de mangues en Ha\u00efti.",
      bioIntl: localeText(
        "Travaux sur un tuteur num\u00e9rique intelligent bas\u00e9 sur une architecture RAG multi-agents, appliqu\u00e9e \u00e0 l'accompagnement des producteurs de mangues en Ha\u00efti.",
      ),
      links: {
        website:
          "https://infosnation.com/un-tuteur-numerique-intelligent-pour-accompagner-les-producteurs-de-mangues-en-haiti/?amp=1",
      },
    },
    {
      _id: "member-aishael-picard",
      _type: "member",
      status: "published",
      fullName: "Aishael Donata Laury Picard",
      slug: { current: "aishael-picard" },
      slugIntl: { fr: { current: "aishael-picard" }, en: { current: "aishael-picard" } },
      role: "Etudiant(e) stagiaire",
      bio:
        "Travaux sur la vision par ordinateur pour la d\u00e9tection de maladies du manguier (feuilles et fruits), int\u00e9gr\u00e9s \u00e0 un syst\u00e8me d'aide \u00e0 la d\u00e9cision dans le cadre de Deep Farm.",
      bioIntl: localeText(
        "Travaux sur la vision par ordinateur pour la d\u00e9tection de maladies du manguier (feuilles et fruits), int\u00e9gr\u00e9s \u00e0 un syst\u00e8me d'aide \u00e0 la d\u00e9cision dans le cadre de Deep Farm.",
      ),
      links: {
        website:
          "https://infosnation.com/quand-lintelligence-artificielle-vient-au-secours-des-manguiers-haitiens/?amp=1",
      },
    },
  ];

  const projects = [
    {
      _id: "project-deep-farm",
      _type: "project",
      status: "published",
      title: "DEEP FARM : Intelligence Artificielle et Agriculture Durable",
      titleIntl: localeString("DEEP FARM : Intelligence Artificielle et Agriculture Durable"),
      slug: { current: "deep-farm" },
      slugIntl: { fr: { current: "deep-farm" }, en: { current: "deep-farm" } },
      projectType: "Hybride",
      startDate: "2023-01-01",
      summary:
        "Projet international visant \u00e0 renforcer les comp\u00e9tences en agriculture num\u00e9rique (IA & Big Data).",
      summaryIntl: localeText(
        "Projet international visant \u00e0 renforcer les comp\u00e9tences en agriculture num\u00e9rique (IA & Big Data).",
      ),
      shortDescription:
        "Projet international visant \u00e0 renforcer les comp\u00e9tences en agriculture num\u00e9rique (IA & Big Data).",
      shortDescriptionIntl: localeText(
        "Projet international visant \u00e0 renforcer les comp\u00e9tences en agriculture num\u00e9rique (IA & Big Data).",
      ),
      statusLabel: "En cours",
      tags: ["Agriculture num\u00e9rique", "IA", "Big Data", "Erasmus+", "CBHE"],
      featured: true,
      objectives: [
        block(
          "Deep Farm est une initiative internationale structur\u00e9e autour de la transformation num\u00e9rique de l'agriculture, avec un accent sur l'IA et la donn\u00e9e.",
        ),
      ],
      members: [
        { _key: makeKey(), _type: "reference", _ref: "member-livenson-nicolas" },
        { _key: makeKey(), _type: "reference", _ref: "member-aishael-picard" },
      ],
      partners: [{ _key: makeKey(), _type: "reference", _ref: "partner-infosnation" }],
    },
  ];

  const news = [
    {
      _id: "news-infosnation-espace-sciences-societe",
      _type: "news",
      status: "published",
      title: 'InfosNation lance "Espace Sciences et Soci\u00e9t\u00e9"',
      titleIntl: localeString('InfosNation lance "Espace Sciences et Soci\u00e9t\u00e9"'),
      slug: { current: "infosnation-espace-sciences-societe" },
      slugIntl: { fr: { current: "infosnation-espace-sciences-societe" }, en: { current: "infosnation-espace-sciences-societe" } },
      date: "2025-10-30",
      category: "Partenariat",
      summary:
        "InfosNation structure un espace \u00e9ditorial d\u00e9di\u00e9 \u00e0 la m\u00e9diation scientifique, au dialogue science-soci\u00e9t\u00e9 et \u00e0 la d\u00e9cision publique \u00e9clair\u00e9e.",
      summaryIntl: localeText(
        "InfosNation structure un espace \u00e9ditorial d\u00e9di\u00e9 \u00e0 la m\u00e9diation scientifique, au dialogue science-soci\u00e9t\u00e9 et \u00e0 la d\u00e9cision publique \u00e9clair\u00e9e.",
      ),
      sourceUrl: "https://infosnation.com/lancement-de-la-rubrique-espace-sciences-et-societe-dinfosnation/",
      featured: true,
    },
    {
      _id: "news-livenson-tuteur-numerique-rag",
      _type: "news",
      status: "published",
      title: "Un tuteur num\u00e9rique intelligent pour accompagner les producteurs de mangues en Ha\u00efti",
      titleIntl: localeString(
        "Un tuteur num\u00e9rique intelligent pour accompagner les producteurs de mangues en Ha\u00efti",
      ),
      slug: { current: "livenson-tuteur-numerique-rag" },
      slugIntl: { fr: { current: "livenson-tuteur-numerique-rag" }, en: { current: "livenson-tuteur-numerique-rag" } },
      date: "2025-12-25",
      category: "Publication",
      summary:
        "Pr\u00e9sentation d'un tuteur num\u00e9rique fond\u00e9 sur une architecture RAG multi-agents, visant des recommandations agronomiques contextualis\u00e9es.",
      summaryIntl: localeText(
        "Pr\u00e9sentation d'un tuteur num\u00e9rique fond\u00e9 sur une architecture RAG multi-agents, visant des recommandations agronomiques contextualis\u00e9es.",
      ),
      sourceUrl:
        "https://infosnation.com/un-tuteur-numerique-intelligent-pour-accompagner-les-producteurs-de-mangues-en-haiti/",
      featured: true,
    },
    {
      _id: "news-aishael-ia-manguiers",
      _type: "news",
      status: "published",
      title: "Quand l'intelligence artificielle vient au secours des manguiers haitiens",
      titleIntl: localeString(
        "Quand l'intelligence artificielle vient au secours des manguiers haitiens",
      ),
      slug: { current: "aishael-ia-manguiers" },
      slugIntl: { fr: { current: "aishael-ia-manguiers" }, en: { current: "aishael-ia-manguiers" } },
      date: "2025-12-25",
      category: "Publication",
      summary:
        "D\u00e9veloppement de mod\u00e8les de vision par ordinateur pour d\u00e9tecter des pathologies sur feuilles et fruits de manguier.",
      summaryIntl: localeText(
        "D\u00e9veloppement de mod\u00e8les de vision par ordinateur pour d\u00e9tecter des pathologies sur feuilles et fruits de manguier.",
      ),
      sourceUrl:
        "https://infosnation.com/quand-lintelligence-artificielle-vient-au-secours-des-manguiers-haitiens/",
      featured: true,
    },
    {
      _id: "news-soutenance-master-2-ia-decembre-2025",
      _type: "news",
      status: "published",
      title: "Soutenance de Master 2 en Intelligence Artificielle - Decembre 2025",
      titleIntl: localeString("Soutenance de Master 2 en Intelligence Artificielle - Decembre 2025"),
      slug: { current: "soutenance-master-2-ia-decembre-2025" },
      slugIntl: { fr: { current: "soutenance-master-2-ia-decembre-2025" }, en: { current: "soutenance-master-2-ia-decembre-2025" } },
      date: "2025-12-23",
      category: "Soutenance",
      summary:
        "Soutenance de Master 2 en Intelligence Artificielle portant sur des travaux de recherche appliqu\u00e9e men\u00e9s dans le cadre du projet Deep Farm.",
      summaryIntl: localeText(
        "Soutenance de Master 2 en Intelligence Artificielle portant sur des travaux de recherche appliqu\u00e9e men\u00e9s dans le cadre du projet Deep Farm.",
      ),
      featured: false,
    },
  ];
  const aiSolutions = [
    {
      _id: "aiSolution-analyse-prediction",
      _type: "aiSolution",
      title: "Analyse & Pr\u00e9diction",
      titleIntl: localeString("Analyse & Pr\u00e9diction"),
      shortDescription:
        "Analyse les donn\u00e9es pass\u00e9es pour d\u00e9tecter des tendances, pr\u00e9voir des situations futures et identifier des anomalies.",
      shortDescriptionIntl: localeText(
        "Analyse les donn\u00e9es pass\u00e9es pour d\u00e9tecter des tendances, pr\u00e9voir des situations futures et identifier des anomalies.",
      ),
      benefits: [
        "Anticipation des \u00e9v\u00e9nements et des besoins",
        "R\u00e9duction des risques et des pertes",
        "D\u00e9cisions bas\u00e9es sur des donn\u00e9es r\u00e9elles",
      ],
      examples: [
        "Agriculture : d\u00e9tection de maladies sur plantes, feuilles et fruits",
        "Commerce : pr\u00e9vision des ventes et planification des promotions",
        "Banque : d\u00e9tection de fraudes et transactions anormales",
      ],
      icon: "chart",
      order: 1,
    },
    {
      _id: "aiSolution-chatbots",
      _type: "aiSolution",
      title: "Chatbots intelligents",
      titleIntl: localeString("Chatbots intelligents"),
      shortDescription:
        "Permet aux utilisateurs de poser des questions en langage naturel et d'obtenir des r\u00e9ponses imm\u00e9diates.",
      shortDescriptionIntl: localeText(
        "Permet aux utilisateurs de poser des questions en langage naturel et d'obtenir des r\u00e9ponses imm\u00e9diates.",
      ),
      benefits: [
        "Gain de temps imm\u00e9diat",
        "Am\u00e9lioration de l'exp\u00e9rience utilisateur",
        "Support continu, 24/7",
      ],
      examples: ["Sites web institutionnels ou commerciaux", "Service client", "Orientation des usagers"],
      icon: "chat",
      order: 2,
    },
    {
      _id: "aiSolution-rag",
      _type: "aiSolution",
      title: "Acc\u00e8s intelligent aux documents",
      titleIntl: localeString("Acc\u00e8s intelligent aux documents"),
      shortDescription:
        "Utilise l'intelligence artificielle pour interroger des documents internes ou priv\u00e9s comme si l'on discutait avec un expert.",
      shortDescriptionIntl: localeText(
        "Utilise l'intelligence artificielle pour interroger des documents internes ou priv\u00e9s comme si l'on discutait avec un expert.",
      ),
      benefits: [
        "Fin des recherches longues et manuelles",
        "D\u00e9mocratisation de l'acc\u00e8s \u00e0 l'information",
        "Valorisation de la connaissance interne",
      ],
      examples: [
        "Banques et administrations : circulaires, r\u00e8glements, proc\u00e9dures",
        "ONG : rapports, directives, archives",
        "Cabinets juridiques : lois, jurisprudence, dossiers",
      ],
      icon: "document",
      order: 3,
    },
    {
      _id: "aiSolution-multi-agents",
      _type: "aiSolution",
      title: "Coordination d'assistants intelligents",
      titleIntl: localeString("Coordination d'assistants intelligents"),
      shortDescription:
        "Coordonne plusieurs assistants intelligents, chacun sp\u00e9cialis\u00e9, pour r\u00e9soudre des probl\u00e8mes complexes.",
      shortDescriptionIntl: localeText(
        "Coordonne plusieurs assistants intelligents, chacun sp\u00e9cialis\u00e9, pour r\u00e9soudre des probl\u00e8mes complexes.",
      ),
      benefits: [
        "Vision multi-expertise",
        "Meilleure gestion de la complexit\u00e9",
        "Recommandations plus fiables",
      ],
      examples: [
        "Analyse financi\u00e8re ou juridique",
        "Aide \u00e0 la d\u00e9cision strat\u00e9gique",
        "Processus complexes",
      ],
      icon: "network",
      order: 4,
    },
    {
      _id: "aiSolution-automation",
      _type: "aiSolution",
      title: "Automatisation intelligente",
      titleIntl: localeString("Automatisation intelligente"),
      shortDescription:
        "Automatise des t\u00e2ches r\u00e9p\u00e9titives ou chronophages tout en int\u00e9grant un contr\u00f4le humain pour les actions critiques.",
      shortDescriptionIntl: localeText(
        "Automatise des t\u00e2ches r\u00e9p\u00e9titives ou chronophages tout en int\u00e9grant un contr\u00f4le humain pour les actions critiques.",
      ),
      benefits: [
        "Gain de temps op\u00e9rationnel",
        "R\u00e9duction des erreurs humaines",
        "Processus plus fiables",
      ],
      examples: ["Traitement automatique de demandes", "G\u00e9n\u00e9ration de rapports", "Validation assist\u00e9e"],
      icon: "automation",
      order: 5,
    },
    {
      _id: "aiSolution-fine-tuning",
      _type: "aiSolution",
      title: "IA personnalis\u00e9e",
      titleIntl: localeString("IA personnalis\u00e9e"),
      shortDescription:
        "Adapte l'intelligence artificielle \u00e0 vos documents, votre vocabulaire et votre contexte m\u00e9tier.",
      shortDescriptionIntl: localeText(
        "Adapte l'intelligence artificielle \u00e0 vos documents, votre vocabulaire et votre contexte m\u00e9tier.",
      ),
      benefits: [
        "R\u00e9ponses plus pr\u00e9cises",
        "Meilleure compr\u00e9hension du langage m\u00e9tier",
        "Moins d'erreurs",
      ],
      examples: [],
      icon: "settings",
      order: 6,
    },
  ];

  const useCases = [
    {
      _id: "useCase-multi-agents-agriculture",
      _type: "useCase",
      title: "Coordination d'assistants intelligents pour l'agriculture",
      titleIntl: localeString("Coordination d'assistants intelligents pour l'agriculture"),
      context: "Aide \u00e0 la prise de d\u00e9cision agricole dans des conditions r\u00e9elles.",
      contextIntl: localeText("Aide \u00e0 la prise de d\u00e9cision agricole dans des conditions r\u00e9elles."),
      solution:
        "\u00c9quipe d'assistants analysant les donn\u00e9es terrain et les observations pour proposer des recommandations.",
      solutionIntl: localeText(
        "\u00c9quipe d'assistants analysant les donn\u00e9es terrain et les observations pour proposer des recommandations.",
      ),
      benefits: [
        "Meilleures d\u00e9cisions agricoles",
        "R\u00e9duction des pertes",
        "Adaptation au contexte local",
      ],
      order: 1,
    },
    {
      _id: "useCase-detection-maladies",
      _type: "useCase",
      title: "D\u00e9tection de maladies sur feuilles et fruits",
      titleIntl: localeString("D\u00e9tection de maladies sur feuilles et fruits"),
      context: "Identification rapide des maladies pour agir avant la propagation.",
      contextIntl: localeText("Identification rapide des maladies pour agir avant la propagation."),
      solution: "Outil d'analyse d'images int\u00e9gr\u00e9 dans une application d\u00e9di\u00e9e.",
      solutionIntl: localeText("Outil d'analyse d'images int\u00e9gr\u00e9 dans une application d\u00e9di\u00e9e."),
      benefits: ["Diagnostic rapide", "Pr\u00e9vention", "Support aux producteurs"],
      order: 2,
    },
    {
      _id: "useCase-generation-rapports",
      _type: "useCase",
      title: "G\u00e9n\u00e9ration automatique de rapports",
      titleIntl: localeString("G\u00e9n\u00e9ration automatique de rapports"),
      context: "Production de rapports structur\u00e9s \u00e0 partir de notes de consultation simples.",
      contextIntl: localeText("Production de rapports structur\u00e9s \u00e0 partir de notes de consultation simples."),
      solution: "Syst\u00e8me intelligent transformant des notes libres en rapports standardis\u00e9s.",
      solutionIntl: localeText("Syst\u00e8me intelligent transformant des notes libres en rapports standardis\u00e9s."),
      benefits: ["Gain de temps", "Qualit\u00e9 homog\u00e8ne", "Moins d'erreurs"],
      order: 3,
    },
  ];

  const sectors = [
    { _id: "sector-finance", _type: "sector", name: "Banques et institutions financi\u00e8res", nameIntl: localeString("Banques et institutions financi\u00e8res"), icon: "bank", order: 1 },
    { _id: "sector-commerce", _type: "sector", name: "Commerce et retail", nameIntl: localeString("Commerce et retail"), icon: "shop", order: 2 },
    { _id: "sector-agriculture", _type: "sector", name: "Agriculture", nameIntl: localeString("Agriculture"), icon: "plant", order: 3 },
    { _id: "sector-ngo", _type: "sector", name: "ONG et organisations internationales", nameIntl: localeString("ONG et organisations internationales"), icon: "globe", order: 4 },
    { _id: "sector-health", _type: "sector", name: "Sant\u00e9", nameIntl: localeString("Sant\u00e9"), icon: "health", order: 5 },
    { _id: "sector-public", _type: "sector", name: "Secteur public", nameIntl: localeString("Secteur public"), icon: "government", order: 6 },
    { _id: "sector-industry", _type: "sector", name: "Industrie", nameIntl: localeString("Industrie"), icon: "factory", order: 7 },
    { _id: "sector-education", _type: "sector", name: "Education", nameIntl: localeString("Education"), icon: "book", order: 8 },
  ];

  const solutionsPage = {
    _id: "solutionsPage",
    _type: "solutionsPage",
    heroBadge: localeString("Services & Solutions IA"),
    heroTitle: localeString("Recherche appliqu\u00e9e et transfert en intelligence artificielle"),
    heroSubtitle: localeText(
      "Le LaCDIA developpe des methodes et prototypes IA, puis les transfere vers des cas d'usage reels en collaboration avec ses partenaires.",
    ),
    heroDescription: localeText(
      "Nos solutions s'appuient sur des axes de recherche, des projets interdisciplinaires et une validation scientifique rigoureuse.",
    ),
    heroPrimaryCta: { _type: "linkAction", label: "Proposer un projet", href: "/contact", variant: "primary" },
    heroSecondaryCta: { _type: "linkAction", label: "Voir les cas d'usage", href: "#cas-usage", variant: "secondary" },
    approachTitle: localeString("Notre approche"),
    approachIntro: localeText("Une demarche scientifique, rigoureuse et orientee impact."),
    approachSteps: withKeys([
      {
        title: "Diagnostic",
        titleIntl: localeString("Diagnostic"),
        description: "Qualification des donn\u00e9es, besoins m\u00e9tier et contraintes terrain.",
        descriptionIntl: localeText(
          "Qualification des donn\u00e9es, besoins m\u00e9tier et contraintes terrain.",
        ),
      },
      { title: "Modelisation", titleIntl: localeString("Modelisation"), description: "Conception IA, prototypage rapide et validation scientifique.", descriptionIntl: localeText("Conception IA, prototypage rapide et validation scientifique.") },
      { title: "Deploiement", titleIntl: localeString("Deploiement"), description: "Integration, accompagnement et mesure d'impact.", descriptionIntl: localeText("Integration, accompagnement et mesure d'impact.") },
    ]),
    solutionsTitle: localeString("Solutions IA"),
    solutionsIntro: localeText(
      "Des solutions concretes pour analyser, automatiser, decider et rendre l'information accessible.",
    ),
    solutions: aiSolutions.map((item) => ({ _key: makeKey(), _type: "reference", _ref: item._id })),
    useCasesTitle: localeString("Cas d'usage"),
    useCasesIntro: localeText("Projets concrets et parcours d'impact."),
    featuredUseCase: { _type: "reference", _ref: useCases[0]._id },
    flowTitle: localeString("Flux IA applique"),
    flowDescription: localeText(
      "Donn\u00e9es terrain -> Connaissances -> Mod\u00e8les IA -> D\u00e9cision",
    ),
    flowSteps: ["Collecte", "Analyse", "Recommandation", "Suivi terrain"],
    servicesTitle: localeString("Services proposes"),
    servicesIntro: localeText("Un accompagnement complet, de l'idee au deploiement."),
    services: [
      "Conseil scientifique",
      "D\u00e9veloppement IA",
      "Data engineering",
      "Syst\u00e8mes d'aide \u00e0 la d\u00e9cision",
      "MLOps et deploiement",
    ],
    sectorsTitle: localeString("Secteurs d'application"),
    sectorsIntro: localeText(
      "Des solutions adaptables \u00e0 tous les secteurs disposant de donn\u00e9es et de documents.",
    ),
    sectors: sectors.map((item) => ({ _key: makeKey(), _type: "reference", _ref: item._id })),
    projectsTitle: localeString("Projets en cours"),
    projectsIntro: localeText("Nos projets de recherche appliqu\u00e9e et d'innovation."),
  };
  const people = [
    {
      _id: "person-patrick-attie",
      _type: "person",
      name: "Patrick Attie",
      slug: { current: "patrick-attie" },
      roleTitle: "Gouvernance institutionnelle",
      roleCategory: "gouvernance",
      shortBio:
        "Co-fondateur du laboratoire LaCDIA. Directeur g\u00e9n\u00e9ral de l'ESIH depuis 2004.",
      affiliation: "ESIH - \u00c9cole Sup\u00e9rieure d'Infotronique d'Ha\u00efti",
      longBio:
        "Co-fondateur du laboratoire LaCDIA et Directeur g\u00e9n\u00e9ral de l'ESIH. Pilote la gouvernance institutionnelle du laboratoire.",
      expertise: ["Gouvernance institutionnelle", "Direction strategique", "Innovation pedagogique"],
      links: { email: "p.attie@esih.edu" },
      governanceGroup: "gouvernance",
      order: 1,
    },
    {
      _id: "person-aishael-picard",
      _type: "person",
      name: "Aishael Donata Laury Picard",
      slug: { current: "aishael-picard" },
      roleTitle: "Direction scientifique - Apprentissage automatique",
      roleCategory: "direction",
      shortBio: "Co-fondatrice du laboratoire LaCDIA. Docteure en sciences des donn\u00e9es.",
      affiliation: "LaCDIA",
      longBio: "Co-fondatrice du laboratoire LaCDIA. Pilote les activites scientifiques en apprentissage automatique.",
      expertise: ["Direction scientifique", "Machine Learning", "Data Science"],
      links: { email: "aishael.picard@lacdia.org" },
      governanceGroup: "direction",
      order: 2,
    },
    {
      _id: "person-livenson-nicolas",
      _type: "person",
      name: "Livenson Nicolas",
      slug: { current: "livenson-nicolas" },
      roleTitle: "Direction scientifique - Intelligence artificielle",
      roleCategory: "direction",
      shortBio: "Co-fondateur du laboratoire LaCDIA. Specialiste des systemes multi-agents.",
      affiliation: "LaCDIA - ESTIA",
      longBio: "Co-fondateur du laboratoire LaCDIA. Supervise les projets de recherche appliqu\u00e9e.",
      expertise: ["Intelligence artificielle", "Deep Learning", "Computer Vision"],
      links: { email: "livenson.nicolas@lacdia.org", linkedin: "https://linkedin.com/in/livenson-nicolas" },
      governanceGroup: "direction",
      order: 3,
    },
    {
      _id: "person-benedique-paul",
      _type: "person",
      name: "Dr. Benedique Paul",
      slug: { current: "benedique-paul" },
      roleTitle: "Chercheur associe",
      roleCategory: "conseil",
      shortBio: "Membre du conseil scientifique. Expert en agronomie tropicale.",
      affiliation: "FSAE/UniQ - Universite Quisqueya",
      longBio: "Membre du conseil scientifique. Collabore avec LaCDIA sur des initiatives de recherche appliqu\u00e9e.",
      expertise: ["Agronomie tropicale", "Syst\u00e8mes agricoles durables", "\u00c9conomie rurale"],
      links: { email: "b.paul@uniq.edu" },
      governanceGroup: "comite_scientifique",
      order: 4,
    },
    {
      _id: "person-serge-mranda",
      _type: "person",
      name: "Serge MRANDA",
      slug: { current: "serge-mranda" },
      roleTitle: "Conseiller scientifique international",
      roleCategory: "conseil",
      shortBio: "Conseiller scientifique international du laboratoire.",
      affiliation: "A determiner",
      longBio: "Conseiller scientifique international. Participe aux orientations de recherche du laboratoire.",
      expertise: ["A venir"],
      links: { email: "" },
      governanceGroup: "comite_scientifique",
      order: 5,
    },
  ];

  const governanceChart = {
    _id: "governanceChartStrict",
    _type: "governanceChartStrict",
    status: "published",
    title: "Gouvernance LaCDIA",
    titleIntl: localeString("Gouvernance LaCDIA"),
    slug: { current: "gouvernance-lacdia" },
    slugIntl: { fr: { current: "gouvernance-lacdia" }, en: { current: "gouvernance-lacdia" } },
    orgSectionTitle: "Co-fondateurs du laboratoire",
    orgSectionTitleIntl: localeString("Co-fondateurs du laboratoire"),
    orgSectionIntro: [
      block(
        "Le laboratoire a \u00e9t\u00e9 co-fond\u00e9 par des acteurs acad\u00e9miques et scientifiques. Sa gouvernance institutionnelle est assur\u00e9e par l'ESIH.",
      ),
    ],
    orgSectionIntroIntl: localeBlock([
      block(
        "Le laboratoire a \u00e9t\u00e9 co-fond\u00e9 par des acteurs acad\u00e9miques et scientifiques. Sa gouvernance institutionnelle est assur\u00e9e par l'ESIH.",
      ),
    ]),
    topPerson: { _type: "reference", _ref: "person-patrick-attie" },
    coFounders: [
      { _key: makeKey(), _type: "reference", _ref: "person-livenson-nicolas" },
      { _key: makeKey(), _type: "reference", _ref: "person-aishael-picard" },
    ],
    associateResearchers: [
      { _key: makeKey(), _type: "reference", _ref: "person-benedique-paul" },
      { _key: makeKey(), _type: "reference", _ref: "person-serge-mranda" },
    ],
    membersSectionTitle: "Membres & Profils detailles",
    membersSectionTitleIntl: localeString("Membres & Profils detailles"),
    membersSectionIntro: [
      block(
        "L'equipe de LaCDIA reunit des experts en intelligence artificielle, data science et agronomie.",
      ),
    ],
    membersSectionIntroIntl: localeBlock([
      block(
        "L'equipe de LaCDIA reunit des experts en intelligence artificielle, data science et agronomie.",
      ),
    ]),
    membersToShow: [
      { _key: makeKey(), _type: "reference", _ref: "person-patrick-attie" },
      { _key: makeKey(), _type: "reference", _ref: "person-livenson-nicolas" },
      { _key: makeKey(), _type: "reference", _ref: "person-aishael-picard" },
      { _key: makeKey(), _type: "reference", _ref: "person-benedique-paul" },
      { _key: makeKey(), _type: "reference", _ref: "person-serge-mranda" },
    ],
  };

  const governancePage = {
    _id: "governancePage",
    _type: "governancePage",
    status: "published",
    title: "\u00c9quipe & Gouvernance",
    titleIntl: localeString("\u00c9quipe & Gouvernance"),
    slug: { current: "gouvernance" },
    slugIntl: { fr: { current: "gouvernance" }, en: { current: "gouvernance" } },
    intro: [
      block(
        "Decouvrez la structure organisationnelle et l'equipe qui pilote LaCDIA dans sa mission de recherche et d'innovation.",
      ),
    ],
    introIntl: localeBlock([
      block(
        "Decouvrez la structure organisationnelle et l'equipe qui pilote LaCDIA dans sa mission de recherche et d'innovation.",
      ),
    ]),
    showOrgChart: true,
    orgChartSectionTitle: "Co-fondateurs du laboratoire",
    orgChartSectionTitleIntl: localeString("Co-fondateurs du laboratoire"),
    orgChartSectionIntro: [
      block(
        "Le laboratoire a \u00e9t\u00e9 co-fond\u00e9 par des acteurs acad\u00e9miques et scientifiques. Sa gouvernance institutionnelle est assur\u00e9e par l'ESIH.",
      ),
    ],
    orgChartSectionIntroIntl: localeBlock([
      block(
        "Le laboratoire a \u00e9t\u00e9 co-fond\u00e9 par des acteurs acad\u00e9miques et scientifiques. Sa gouvernance institutionnelle est assur\u00e9e par l'ESIH.",
      ),
    ]),
    showMembers: true,
    membersSectionTitle: "Membres & Profils detailles",
    membersSectionTitleIntl: localeString("Membres & Profils detailles"),
    membersSectionIntro: [
      block(
        "L'equipe de LaCDIA reunit des experts en intelligence artificielle, data science et agronomie.",
      ),
    ],
    membersSectionIntroIntl: localeBlock([
      block(
        "L'equipe de LaCDIA reunit des experts en intelligence artificielle, data science et agronomie.",
      ),
    ]),
    membersGroupsToShow: ["direction", "gouvernance", "comite_scientifique"],
    membersOrder: "orderAsc",
    governanceChartStrict: { _type: "reference", _ref: "governanceChartStrict" },
  };

  const institutionalPages = [
    {
      _id: "page-actualites",
      _type: "institutionalPage",
      status: "published",
      title: "Actualit\u00e9s",
      titleIntl: localeString("Actualit\u00e9s"),
      slug: { current: "actualites" },
      slugIntl: { fr: { current: "actualites" }, en: { current: "actualites" } },
      summary: "Suivez les actualit\u00e9s, projets et \u00e9v\u00e9nements du laboratoire.",
      summaryIntl: localeText("Suivez les actualit\u00e9s, projets et \u00e9v\u00e9nements du laboratoire."),
      content: [block("Retrouvez les actualites et annonces officielles de LaCDIA.")],
      contentIntl: localeBlock([block("Retrouvez les actualites et annonces officielles de LaCDIA.")]),
    },
    {
      _id: "page-collaborer",
      _type: "institutionalPage",
      status: "published",
      title: "Collaborer",
      titleIntl: localeString("Collaborer"),
      slug: { current: "collaborer" },
      slugIntl: { fr: { current: "collaborer" }, en: { current: "collaborer" } },
      summary: "Partenariats institutionnels, projets, stages et collaborations.",
      summaryIntl: localeText("Partenariats institutionnels, projets, stages et collaborations."),
      content: [block("Expliquez votre projet et contactez le laboratoire pour initier une collaboration.")],
      contentIntl: localeBlock([block("Expliquez votre projet et contactez le laboratoire pour initier une collaboration.")]),
    },
    {
      _id: "page-contact",
      _type: "institutionalPage",
      status: "published",
      title: "Contact",
      titleIntl: localeString("Contact"),
      slug: { current: "contact" },
      slugIntl: { fr: { current: "contact" }, en: { current: "contact" } },
      summary: "Ecrivez au laboratoire pour toute demande.",
      summaryIntl: localeText("Ecrivez au laboratoire pour toute demande."),
      content: [block("Utilisez le formulaire pour contacter l'equipe du laboratoire.")],
      contentIntl: localeBlock([block("Utilisez le formulaire pour contacter l'equipe du laboratoire.")]),
    },
    {
      _id: "page-mentions-legales",
      _type: "institutionalPage",
      status: "published",
      title: "Mentions l\u00e9gales",
      titleIntl: localeString("Mentions l\u00e9gales"),
      slug: { current: "mentions-legales" },
      slugIntl: { fr: { current: "mentions-legales" }, en: { current: "mentions-legales" } },
      summary: "Informations l\u00e9gales et mentions obligatoires.",
      summaryIntl: localeText("Informations l\u00e9gales et mentions obligatoires."),
      content: [block("Renseignez les mentions l\u00e9gales du site ici.")],
      contentIntl: localeBlock([block("Renseignez les mentions l\u00e9gales du site ici.")]),
    },
    {
      _id: "page-newsletter",
      _type: "institutionalPage",
      status: "published",
      title: "Newsletter",
      titleIntl: localeString("Newsletter"),
      slug: { current: "newsletter" },
      slugIntl: { fr: { current: "newsletter" }, en: { current: "newsletter" } },
      summary: "Inscrivez-vous pour recevoir les actualites.",
      summaryIntl: localeText("Inscrivez-vous pour recevoir les actualites."),
      content: [block("Inscrivez-vous pour recevoir les actualites du laboratoire.")],
      contentIntl: localeBlock([block("Inscrivez-vous pour recevoir les actualites du laboratoire.")]),
    },
    {
      _id: "page-ressources",
      _type: "institutionalPage",
      status: "published",
      title: "Ressources",
      titleIntl: localeString("Ressources"),
      slug: { current: "ressources" },
      slugIntl: { fr: { current: "ressources" }, en: { current: "ressources" } },
      summary: "Documents, rapports et ressources utiles.",
      summaryIntl: localeText("Documents, rapports et ressources utiles."),
      content: [block("Listez ici les ressources publiques disponibles.")],
      contentIntl: localeBlock([block("Listez ici les ressources publiques disponibles.")]),
    },
    {
      _id: "page-recherche",
      _type: "institutionalPage",
      status: "published",
      title: "Recherche",
      titleIntl: localeString("Recherche"),
      slug: { current: "recherche" },
      slugIntl: { fr: { current: "recherche" }, en: { current: "recherche" } },
      summary: "Axes de recherche, projets et publications scientifiques.",
      summaryIntl: localeText("Axes de recherche, projets et publications scientifiques."),
      content: [block("Decouvrez les axes de recherche et les projets scientifiques du laboratoire.")],
      contentIntl: localeBlock([block("Decouvrez les axes de recherche et les projets scientifiques du laboratoire.")]),
    },
    {
      _id: "page-formation",
      _type: "institutionalPage",
      status: "published",
      title: "Formation",
      titleIntl: localeString("Formation"),
      slug: { current: "formation" },
      slugIntl: { fr: { current: "formation" }, en: { current: "formation" } },
      summary: "Programmes, ateliers et formations proposes par le laboratoire.",
      summaryIntl: localeText("Programmes, ateliers et formations proposes par le laboratoire."),
      content: [block("Renseignez ici les programmes de formation et les parcours pedagogiques.")],
      contentIntl: localeBlock([block("Renseignez ici les programmes de formation et les parcours pedagogiques.")]),
    },
    {
      _id: "page-confidentialite",
      _type: "institutionalPage",
      status: "published",
      title: "Politique de confidentialit\u00e9",
      titleIntl: localeString("Politique de confidentialit\u00e9"),
      slug: { current: "confidentialite" },
      slugIntl: { fr: { current: "confidentialite" }, en: { current: "confidentialite" } },
      summary: "Politique de confidentialit\u00e9 et gestion des donn\u00e9es.",
      summaryIntl: localeText("Politique de confidentialit\u00e9 et gestion des donn\u00e9es."),
      content: [block("D\u00e9taillez ici la politique de confidentialit\u00e9.")],
      contentIntl: localeBlock([block("D\u00e9taillez ici la politique de confidentialit\u00e9.")]),
    },
    {
      _id: "page-publications",
      _type: "institutionalPage",
      status: "published",
      title: "Publications",
      titleIntl: localeString("Publications"),
      slug: { current: "publications" },
      slugIntl: { fr: { current: "publications" }, en: { current: "publications" } },
      summary: "Publications scientifiques et rapports.",
      summaryIntl: localeText("Publications scientifiques et rapports."),
      content: [block("Consultez ici les publications scientifiques du laboratoire.")],
      contentIntl: localeBlock([block("Consultez ici les publications scientifiques du laboratoire.")]),
    },
    {
      _id: "page-cookies",
      _type: "institutionalPage",
      status: "published",
      title: "Politique cookies",
      titleIntl: localeString("Politique cookies"),
      slug: { current: "cookies" },
      slugIntl: { fr: { current: "cookies" }, en: { current: "cookies" } },
      summary: "Informations sur l'usage des cookies.",
      summaryIntl: localeText("Informations sur l'usage des cookies."),
      content: [block("Detaillez ici la politique d'utilisation des cookies.")],
      contentIntl: localeBlock([block("Detaillez ici la politique d'utilisation des cookies.")]),
    },
    {
      _id: "page-axes-recherche",
      _type: "institutionalPage",
      status: "published",
      title: "Axes de recherche",
      titleIntl: localeString("Axes de recherche"),
      slug: { current: "axes-recherche" },
      slugIntl: { fr: { current: "axes-recherche" }, en: { current: "axes-recherche" } },
      summary: "Principaux axes de recherche du laboratoire.",
      summaryIntl: localeText("Principaux axes de recherche du laboratoire."),
      content: [block("Liste des axes de recherche et des equipes associees.")],
      contentIntl: localeBlock([block("Liste des axes de recherche et des equipes associees.")]),
    },
    {
      _id: "page-publications-axes",
      _type: "institutionalPage",
      status: "published",
      title: "Publications par axe",
      titleIntl: localeString("Publications par axe"),
      slug: { current: "publications-axes" },
      slugIntl: { fr: { current: "publications-axes" }, en: { current: "publications-axes" } },
      summary: "Parcourez les publications par axe de recherche.",
      summaryIntl: localeText("Parcourez les publications par axe de recherche."),
      content: [block("Selectionnez un axe pour consulter les publications associees.")],
      contentIntl: localeBlock([block("Selectionnez un axe pour consulter les publications associees.")]),
    },
  ];

  const researchAxis = {
    _id: "axis-ia-appliquee",
    _type: "researchAxis",
    status: "published",
    title: "IA appliqu\u00e9e",
    titleIntl: localeString("IA appliqu\u00e9e"),
    slug: { current: "ia-appliquee" },
    slugIntl: { fr: { current: "ia-appliquee" }, en: { current: "ia-appliquee" } },
    summary: "Applications de l'IA aux probl\u00e8mes concrets (agriculture, sant\u00e9, services).",
    summaryIntl: localeText(
      "Applications de l'IA aux probl\u00e8mes concrets (agriculture, sant\u00e9, services).",
    ),
    content: [block("Cet axe couvre les projets d'IA appliqu\u00e9e et les collaborations terrain.")],
    contentIntl: localeBlock([
      block("Cet axe couvre les projets d'IA appliqu\u00e9e et les collaborations terrain."),
    ]),
  };

  const publication = {
    _id: "publication-exemple",
    _type: "publication",
    status: "published",
    title: "Publication exemple",
    titleIntl: localeString("Publication exemple"),
    slug: { current: "publication-exemple" },
    slugIntl: { fr: { current: "publication-exemple" }, en: { current: "publication-exemple" } },
    publicationType: "Article",
    date: "2025-12-15",
    summary: "Exemple de publication scientifique du laboratoire.",
    summaryIntl: localeText("Exemple de publication scientifique du laboratoire."),
    axes: [{ _key: makeKey(), _type: "reference", _ref: "axis-ia-appliquee" }],
    projects: [{ _key: makeKey(), _type: "reference", _ref: "project-deep-farm" }],
    authors: [
      { _key: makeKey(), _type: "reference", _ref: "member-livenson-nicolas" },
      { _key: makeKey(), _type: "reference", _ref: "member-aishael-picard" },
    ],
  };

  const documents = [
    siteSettings,
    navigation,
    homePage,
    kpiSettings,
    ...kpis,
    ...partners,
    ...members,
    ...projects,
    ...news,
    ...aiSolutions,
    ...useCases,
    ...sectors,
    solutionsPage,
    ...people,
    governanceChart,
    governancePage,
    ...institutionalPages,
    researchAxis,
    publication,
  ];

  for (const doc of documents) {
    await client.createOrReplace(doc);
    process.stdout.write(`Seeded ${doc._type} (${doc._id})\n`);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
