
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
    name: "Laboratoire Caribeen des Sciences des Donnees et de l'Intelligence Artificielle",
    shortName: "LaCDIA",
    description:
      "Laboratoire de recherche et d'innovation en IA et science des donnees : projets, publications, partenariats, transfert et formation.",
    tagline: "Laboratoire de recherche en IA & science des donnees",
    taglineIntl: localeString("Laboratoire de recherche en IA & science des donnees"),
    logo: logoAssetId
      ? {
          image: { _type: "image", asset: { _type: "reference", _ref: logoAssetId } },
          alt: "Logo du laboratoire",
        }
      : undefined,
    banner: bannerAssetId
      ? {
          image: { _type: "image", asset: { _type: "reference", _ref: bannerAssetId } },
          alt: "Banniere du laboratoire",
        }
      : undefined,
    footerContactTitle: "Contact",
    footerContactTitleIntl: localeString("Contact"),
    footerContactText: "Collaboration, projets, encadrement.",
    footerContactTextIntl: localeText("Collaboration, projets, encadrement."),
    footerContactCtaLabel: "Ecrire au laboratoire",
    footerContactCtaLabelIntl: localeString("Ecrire au laboratoire"),
    footerContactCtaHref: "/contact",
    footerLanguageNote: "Langues : francais (defaut), anglais.",
    footerLanguageNoteIntl: localeString("Langues : francais (defaut), anglais."),
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
      { _type: "navItem", label: "Actualites", labelIntl: localeString("Actualites"), href: "/actualites" },
      { _type: "navItem", label: "Equipe", labelIntl: localeString("Equipe"), href: "/equipe" },
      { _type: "navItem", label: "Collaborer", labelIntl: localeString("Collaborer"), href: "/collaborer" },
      { _type: "navItem", label: "Contact", labelIntl: localeString("Contact"), href: "/contact" },
    ]),
    footerNav: withKeys([
      {
        _type: "navItem",
        label: "Mentions legales",
        labelIntl: localeString("Mentions legales"),
        href: "/mentions-legales",
      },
      {
        _type: "navItem",
        label: "Politique de confidentialite",
        labelIntl: localeString("Politique de confidentialite"),
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
      "Nous menons des recherches en intelligence artificielle et science des donnees pour l'agriculture, les services publics, la sante et l'innovation.",
    ),
    heroDescription: localeText(
      "Nous menons des recherches en intelligence artificielle et science des donnees pour l'agriculture, les services publics, la sante et l'innovation.",
    ),
    heroActions: withKeys([
      { _type: "linkAction", label: "Collaborer avec le laboratoire", href: "/collaborer", variant: "primary" },
      { _type: "linkAction", label: "Explorer nos projets", href: "/projets", variant: "secondary" },
      { _type: "linkAction", label: "Voir les actualites", href: "/actualites", variant: "tertiary" },
    ]),
    introEyebrow: localeString("LaCDIA"),
    introTitle: localeString("Laboratoire de recherche et d'innovation en IA et science des donnees."),
    introBody: localeText(
      "Nous menons des travaux de recherche appliquee et fondamentale, et nous accompagnons egalement des partenaires et des institutions dans la conception de solutions fondees sur l'intelligence artificielle, la science des donnees et les systemes intelligents.",
    ),
    introActions: withKeys([
      { _type: "linkAction", label: "Collaborer avec le laboratoire", href: "/collaborer", variant: "primary" },
      { _type: "linkAction", label: "Explorer nos projets", href: "/projets", variant: "secondary" },
      { _type: "linkAction", label: "Voir les actualites", href: "/actualites", variant: "tertiary" },
    ]),
    highlightsTitle: localeString("Ce que nous faisons"),
    highlightsIntro: localeText(
      "Des axes de recherche appliquee et fondamentale qui valorisent l'IA au service des besoins locaux et des enjeux globaux.",
    ),
    highlights: withKeys([
      {
        _type: "highlightItem",
        title: "Agriculture intelligente",
        titleIntl: localeString("Agriculture intelligente"),
        description:
          "Systemes de prediction des rendements, monitoring des cultures et alertes precoces bases sur la donnee.",
        descriptionIntl: localeText(
          "Systemes de prediction des rendements, monitoring des cultures et alertes precoces bases sur la donnee.",
        ),
      },
      {
        _type: "highlightItem",
        title: "Services publics & gouvernance",
        titleIntl: localeString("Services publics & gouvernance"),
        description:
          "Optimisation des services essentiels, observatoires de donnees et aide a la decision.",
        descriptionIntl: localeText(
          "Optimisation des services essentiels, observatoires de donnees et aide a la decision.",
        ),
      },
      {
        _type: "highlightItem",
        title: "Sante & environnement",
        titleIntl: localeString("Sante & environnement"),
        description:
          "Analyse de donnees epidemiologiques, detection de risques et modelisation de scenarios.",
        descriptionIntl: localeText(
          "Analyse de donnees epidemiologiques, detection de risques et modelisation de scenarios.",
        ),
      },
    ]),
    kpisTitle: localeString("Indicateurs cles"),
    kpisIntro: localeText("Donnees quantitatives sur nos activites de recherche et d'innovation"),
    featuredProjectsTitle: localeString("Projets a la une"),
    featuredProjectsIntro: localeText(
      "Des initiatives concretes qui demontrent la puissance de l'IA et de la science des donnees au service des communautes.",
    ),
    featuredProjectsCtaLabel: localeString("Decouvrir tous les projets"),
    featuredProjectsCtaHref: "/projets",
    publicationsTitle: localeString("Publications recentes"),
    publicationsIntro: localeText("Articles, rapports et communications qui documentent nos avancees scientifiques."),
    partnersTitle: localeString("Partenaires & collaborations"),
    partnersIntro: localeText(
      "Nous travaillons avec des institutions academiques, publiques et privees pour accelerer l'impact de la recherche.",
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
      title: localeString("Seminaire IA & donnees pour les services publics"),
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
      tags: ["Mediation scientifique", "Partenariat editorial", "Sciences & Societe"],
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
        "Travaux sur un tuteur numerique intelligent base sur une architecture RAG multi-agents, appliquee a l'accompagnement des producteurs de mangues en Haiti.",
      bioIntl: localeText(
        "Travaux sur un tuteur numerique intelligent base sur une architecture RAG multi-agents, appliquee a l'accompagnement des producteurs de mangues en Haiti.",
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
        "Travaux sur la vision par ordinateur pour la detection de maladies du manguier (feuilles et fruits), integres a un systeme d'aide a la decision dans le cadre de Deep Farm.",
      bioIntl: localeText(
        "Travaux sur la vision par ordinateur pour la detection de maladies du manguier (feuilles et fruits), integres a un systeme d'aide a la decision dans le cadre de Deep Farm.",
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
        "Projet international visant a renforcer les competences en agriculture numerique (IA & Big Data).",
      summaryIntl: localeText(
        "Projet international visant a renforcer les competences en agriculture numerique (IA & Big Data).",
      ),
      shortDescription:
        "Projet international visant a renforcer les competences en agriculture numerique (IA & Big Data).",
      shortDescriptionIntl: localeText(
        "Projet international visant a renforcer les competences en agriculture numerique (IA & Big Data).",
      ),
      statusLabel: "En cours",
      tags: ["Agriculture numerique", "IA", "Big Data", "Erasmus+", "CBHE"],
      featured: true,
      objectives: [
        block(
          "Deep Farm est une initiative internationale structuree autour de la transformation numerique de l'agriculture, avec un accent sur l'IA et la donnee.",
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
      title: 'InfosNation lance "Espace Sciences et Societe"',
      titleIntl: localeString('InfosNation lance "Espace Sciences et Societe"'),
      slug: { current: "infosnation-espace-sciences-societe" },
      slugIntl: { fr: { current: "infosnation-espace-sciences-societe" }, en: { current: "infosnation-espace-sciences-societe" } },
      date: "2025-10-30",
      category: "Partenariat",
      summary:
        "InfosNation structure un espace editorial dedie a la mediation scientifique, au dialogue science-societe et a la decision publique eclairee.",
      summaryIntl: localeText(
        "InfosNation structure un espace editorial dedie a la mediation scientifique, au dialogue science-societe et a la decision publique eclairee.",
      ),
      sourceUrl: "https://infosnation.com/lancement-de-la-rubrique-espace-sciences-et-societe-dinfosnation/",
      featured: true,
    },
    {
      _id: "news-livenson-tuteur-numerique-rag",
      _type: "news",
      status: "published",
      title: "Un tuteur numerique intelligent pour accompagner les producteurs de mangues en Haiti",
      titleIntl: localeString(
        "Un tuteur numerique intelligent pour accompagner les producteurs de mangues en Haiti",
      ),
      slug: { current: "livenson-tuteur-numerique-rag" },
      slugIntl: { fr: { current: "livenson-tuteur-numerique-rag" }, en: { current: "livenson-tuteur-numerique-rag" } },
      date: "2025-12-25",
      category: "Publication",
      summary:
        "Presentation d'un tuteur numerique fonde sur une architecture RAG multi-agents, visant des recommandations agronomiques contextualisees.",
      summaryIntl: localeText(
        "Presentation d'un tuteur numerique fonde sur une architecture RAG multi-agents, visant des recommandations agronomiques contextualisees.",
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
        "Developpement de modeles de vision par ordinateur pour detecter des pathologies sur feuilles et fruits de manguier.",
      summaryIntl: localeText(
        "Developpement de modeles de vision par ordinateur pour detecter des pathologies sur feuilles et fruits de manguier.",
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
        "Soutenance de Master 2 en Intelligence Artificielle portant sur des travaux de recherche appliquee menes dans le cadre du projet Deep Farm.",
      summaryIntl: localeText(
        "Soutenance de Master 2 en Intelligence Artificielle portant sur des travaux de recherche appliquee menes dans le cadre du projet Deep Farm.",
      ),
      featured: false,
    },
  ];
  const aiSolutions = [
    {
      _id: "aiSolution-analyse-prediction",
      _type: "aiSolution",
      title: "Analyse & Prediction",
      titleIntl: localeString("Analyse & Prediction"),
      shortDescription:
        "Analyse les donnees passees pour detecter des tendances, prevoir des situations futures et identifier des anomalies.",
      shortDescriptionIntl: localeText(
        "Analyse les donnees passees pour detecter des tendances, prevoir des situations futures et identifier des anomalies.",
      ),
      benefits: [
        "Anticipation des evenements et des besoins",
        "Reduction des risques et des pertes",
        "Decisions basees sur des donnees reelles",
      ],
      examples: [
        "Agriculture : detection de maladies sur plantes, feuilles et fruits",
        "Commerce : prevision des ventes et planification des promotions",
        "Banque : detection de fraudes et transactions anormales",
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
        "Permet aux utilisateurs de poser des questions en langage naturel et d'obtenir des reponses immediates.",
      shortDescriptionIntl: localeText(
        "Permet aux utilisateurs de poser des questions en langage naturel et d'obtenir des reponses immediates.",
      ),
      benefits: ["Gain de temps immediat", "Amelioration de l'experience utilisateur", "Support continu, 24/7"],
      examples: ["Sites web institutionnels ou commerciaux", "Service client", "Orientation des usagers"],
      icon: "chat",
      order: 2,
    },
    {
      _id: "aiSolution-rag",
      _type: "aiSolution",
      title: "Acces intelligent aux documents",
      titleIntl: localeString("Acces intelligent aux documents"),
      shortDescription:
        "Utilise l'intelligence artificielle pour interroger des documents internes ou prives comme si l'on discutait avec un expert.",
      shortDescriptionIntl: localeText(
        "Utilise l'intelligence artificielle pour interroger des documents internes ou prives comme si l'on discutait avec un expert.",
      ),
      benefits: [
        "Fin des recherches longues et manuelles",
        "Democratisation de l'acces a l'information",
        "Valorisation de la connaissance interne",
      ],
      examples: [
        "Banques et administrations : circulaires, reglements, procedures",
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
        "Coordonne plusieurs assistants intelligents, chacun specialise, pour resoudre des problemes complexes.",
      shortDescriptionIntl: localeText(
        "Coordonne plusieurs assistants intelligents, chacun specialise, pour resoudre des problemes complexes.",
      ),
      benefits: ["Vision multi-expertise", "Meilleure gestion de la complexite", "Recommandations plus fiables"],
      examples: ["Analyse financiere ou juridique", "Aide a la decision strategique", "Processus complexes"],
      icon: "network",
      order: 4,
    },
    {
      _id: "aiSolution-automation",
      _type: "aiSolution",
      title: "Automatisation intelligente",
      titleIntl: localeString("Automatisation intelligente"),
      shortDescription:
        "Automatise des taches repetitives ou chronophages tout en integrant un controle humain pour les actions critiques.",
      shortDescriptionIntl: localeText(
        "Automatise des taches repetitives ou chronophages tout en integrant un controle humain pour les actions critiques.",
      ),
      benefits: ["Gain de temps operationnel", "Reduction des erreurs humaines", "Processus plus fiables"],
      examples: ["Traitement automatique de demandes", "Generation de rapports", "Validation assistee"],
      icon: "automation",
      order: 5,
    },
    {
      _id: "aiSolution-fine-tuning",
      _type: "aiSolution",
      title: "IA personnalisee",
      titleIntl: localeString("IA personnalisee"),
      shortDescription:
        "Adapte l'intelligence artificielle a vos documents, votre vocabulaire et votre contexte metier.",
      shortDescriptionIntl: localeText(
        "Adapte l'intelligence artificielle a vos documents, votre vocabulaire et votre contexte metier.",
      ),
      benefits: ["Reponses plus precises", "Meilleure comprehension du langage metier", "Moins d'erreurs"],
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
      context: "Aide a la prise de decision agricole dans des conditions reelles.",
      contextIntl: localeText("Aide a la prise de decision agricole dans des conditions reelles."),
      solution:
        "Equipe d'assistants analysant les donnees terrain et les observations pour proposer des recommandations.",
      solutionIntl: localeText(
        "Equipe d'assistants analysant les donnees terrain et les observations pour proposer des recommandations.",
      ),
      benefits: ["Meilleures decisions agricoles", "Reduction des pertes", "Adaptation au contexte local"],
      order: 1,
    },
    {
      _id: "useCase-detection-maladies",
      _type: "useCase",
      title: "Detection de maladies sur feuilles et fruits",
      titleIntl: localeString("Detection de maladies sur feuilles et fruits"),
      context: "Identification rapide des maladies pour agir avant la propagation.",
      contextIntl: localeText("Identification rapide des maladies pour agir avant la propagation."),
      solution: "Outil d'analyse d'images integre dans une application dediee.",
      solutionIntl: localeText("Outil d'analyse d'images integre dans une application dediee."),
      benefits: ["Diagnostic rapide", "Prevention", "Support aux producteurs"],
      order: 2,
    },
    {
      _id: "useCase-generation-rapports",
      _type: "useCase",
      title: "Generation automatique de rapports",
      titleIntl: localeString("Generation automatique de rapports"),
      context: "Production de rapports structures a partir de notes de consultation simples.",
      contextIntl: localeText("Production de rapports structures a partir de notes de consultation simples."),
      solution: "Systeme intelligent transformant des notes libres en rapports standardises.",
      solutionIntl: localeText("Systeme intelligent transformant des notes libres en rapports standardises."),
      benefits: ["Gain de temps", "Qualite homogene", "Moins d'erreurs"],
      order: 3,
    },
  ];

  const sectors = [
    { _id: "sector-finance", _type: "sector", name: "Banques et institutions financieres", nameIntl: localeString("Banques et institutions financieres"), icon: "bank", order: 1 },
    { _id: "sector-commerce", _type: "sector", name: "Commerce et retail", nameIntl: localeString("Commerce et retail"), icon: "shop", order: 2 },
    { _id: "sector-agriculture", _type: "sector", name: "Agriculture", nameIntl: localeString("Agriculture"), icon: "plant", order: 3 },
    { _id: "sector-ngo", _type: "sector", name: "ONG et organisations internationales", nameIntl: localeString("ONG et organisations internationales"), icon: "globe", order: 4 },
    { _id: "sector-health", _type: "sector", name: "Sante", nameIntl: localeString("Sante"), icon: "health", order: 5 },
    { _id: "sector-public", _type: "sector", name: "Secteur public", nameIntl: localeString("Secteur public"), icon: "government", order: 6 },
    { _id: "sector-industry", _type: "sector", name: "Industrie", nameIntl: localeString("Industrie"), icon: "factory", order: 7 },
    { _id: "sector-education", _type: "sector", name: "Education", nameIntl: localeString("Education"), icon: "book", order: 8 },
  ];

  const solutionsPage = {
    _id: "solutionsPage",
    _type: "solutionsPage",
    heroBadge: localeString("Services & Solutions IA"),
    heroTitle: localeString("Recherche appliquee et transfert en intelligence artificielle"),
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
      { title: "Diagnostic", titleIntl: localeString("Diagnostic"), description: "Qualification des donnees, besoins metier et contraintes terrain.", descriptionIntl: localeText("Qualification des donnees, besoins metier et contraintes terrain.") },
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
    flowDescription: localeText("Donnees terrain -> Connaissances -> Modeles IA -> Decision"),
    flowSteps: ["Collecte", "Analyse", "Recommandation", "Suivi terrain"],
    servicesTitle: localeString("Services proposes"),
    servicesIntro: localeText("Un accompagnement complet, de l'idee au deploiement."),
    services: [
      "Conseil scientifique",
      "Developpement IA",
      "Data engineering",
      "Systemes d'aide a la decision",
      "MLOps et deploiement",
    ],
    sectorsTitle: localeString("Secteurs d'application"),
    sectorsIntro: localeText("Des solutions adaptables a tous les secteurs disposant de donnees et de documents."),
    sectors: sectors.map((item) => ({ _key: makeKey(), _type: "reference", _ref: item._id })),
    projectsTitle: localeString("Projets en cours"),
    projectsIntro: localeText("Nos projets de recherche appliquee et d'innovation."),
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
        "Co-fondateur du laboratoire LaCDIA. Directeur general de l'ESIH depuis 2004.",
      affiliation: "ESIH - Ecole Superieure d'Infotronique d'Haiti",
      longBio:
        "Co-fondateur du laboratoire LaCDIA et Directeur general de l'ESIH. Pilote la gouvernance institutionnelle du laboratoire.",
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
      shortBio: "Co-fondatrice du laboratoire LaCDIA. Docteure en sciences des donnees.",
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
      longBio: "Co-fondateur du laboratoire LaCDIA. Supervise les projets de recherche appliquee.",
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
      longBio: "Membre du conseil scientifique. Collabore avec LaCDIA sur des initiatives de recherche appliquee.",
      expertise: ["Agronomie tropicale", "Systemes agricoles durables", "Economie rurale"],
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
        "Le laboratoire a ete co-fonde par des acteurs academiques et scientifiques. Sa gouvernance institutionnelle est assuree par l'ESIH.",
      ),
    ],
    orgSectionIntroIntl: localeBlock([
      block(
        "Le laboratoire a ete co-fonde par des acteurs academiques et scientifiques. Sa gouvernance institutionnelle est assuree par l'ESIH.",
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
    title: "Equipe & Gouvernance",
    titleIntl: localeString("Equipe & Gouvernance"),
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
        "Le laboratoire a ete co-fonde par des acteurs academiques et scientifiques. Sa gouvernance institutionnelle est assuree par l'ESIH.",
      ),
    ],
    orgChartSectionIntroIntl: localeBlock([
      block(
        "Le laboratoire a ete co-fonde par des acteurs academiques et scientifiques. Sa gouvernance institutionnelle est assuree par l'ESIH.",
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
      title: "Actualites",
      titleIntl: localeString("Actualites"),
      slug: { current: "actualites" },
      slugIntl: { fr: { current: "actualites" }, en: { current: "actualites" } },
      summary: "Suivez les actualites, projets et evenements du laboratoire.",
      summaryIntl: localeText("Suivez les actualites, projets et evenements du laboratoire."),
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
      title: "Mentions legales",
      titleIntl: localeString("Mentions legales"),
      slug: { current: "mentions-legales" },
      slugIntl: { fr: { current: "mentions-legales" }, en: { current: "mentions-legales" } },
      summary: "Informations legales et mentions obligatoires.",
      summaryIntl: localeText("Informations legales et mentions obligatoires."),
      content: [block("Renseignez les mentions legales du site ici.")],
      contentIntl: localeBlock([block("Renseignez les mentions legales du site ici.")]),
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
      title: "Politique de confidentialite",
      titleIntl: localeString("Politique de confidentialite"),
      slug: { current: "confidentialite" },
      slugIntl: { fr: { current: "confidentialite" }, en: { current: "confidentialite" } },
      summary: "Politique de confidentialite et gestion des donnees.",
      summaryIntl: localeText("Politique de confidentialite et gestion des donnees."),
      content: [block("Detaillez ici la politique de confidentialite.")],
      contentIntl: localeBlock([block("Detaillez ici la politique de confidentialite.")]),
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
    title: "IA appliquee",
    titleIntl: localeString("IA appliquee"),
    slug: { current: "ia-appliquee" },
    slugIntl: { fr: { current: "ia-appliquee" }, en: { current: "ia-appliquee" } },
    summary: "Applications de l'IA aux problemes concrets (agriculture, sante, services).",
    summaryIntl: localeText(
      "Applications de l'IA aux problemes concrets (agriculture, sante, services).",
    ),
    content: [block("Cet axe couvre les projets d'IA appliquee et les collaborations terrain.")],
    contentIntl: localeBlock([
      block("Cet axe couvre les projets d'IA appliquee et les collaborations terrain."),
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
