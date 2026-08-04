
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

function seo(title, description) {
  return {
    title: localeString(title),
    description: localeText(description),
  };
}

function action(label, href, variant = "primary") {
  return {
    _type: "linkAction",
    label,
    labelIntl: localeString(label),
    href,
    variant,
  };
}

function card({ icon, title, description, label, href, items = [] }) {
  return {
    _type: "pageCard",
    icon,
    title,
    titleIntl: localeString(title),
    description,
    descriptionIntl: localeText(description),
    label,
    labelIntl: localeString(label),
    href,
    items,
  };
}

function section({
  variant = "white",
  layout = "content",
  anchor,
  eyebrow,
  title,
  intro,
  body = [],
  cards = [],
  actions = [],
  tableHeaders = [],
  tableRows = [],
  formType,
}) {
  return withKey({
    _type: "pageSection",
    variant,
    layout,
    anchor,
    eyebrow: localeString(eyebrow),
    title: localeString(title),
    intro: localeText(intro),
    body,
    bodyIntl: localeBlock(body),
    cards: withKeys(cards),
    actions: withKeys(actions),
    tableHeaders,
    tableRows: withKeys(tableRows.map((cells) => ({ _type: "tableRow", cells }))),
    formType,
  });
}

function formCopy({
  title,
  subtitle,
  fullNameLabel,
  fullNamePlaceholder,
  emailLabel,
  emailPlaceholder,
  organizationLabel,
  organizationPlaceholder,
  subjectLabel,
  subjectPlaceholder,
  messageLabel,
  messagePlaceholder,
  consentText,
  privacyLabel,
  privacyHref,
  submitLabel,
  loadingLabel,
  successMessage,
  errorMessage,
}) {
  return {
    title: localeString(title),
    subtitle: localeText(subtitle),
    fullNameLabel: localeString(fullNameLabel),
    fullNamePlaceholder: localeString(fullNamePlaceholder),
    emailLabel: localeString(emailLabel),
    emailPlaceholder: localeString(emailPlaceholder),
    organizationLabel: localeString(organizationLabel),
    organizationPlaceholder: localeString(organizationPlaceholder),
    subjectLabel: localeString(subjectLabel),
    subjectPlaceholder: localeString(subjectPlaceholder),
    messageLabel: localeString(messageLabel),
    messagePlaceholder: localeString(messagePlaceholder),
    consentText: localeText(consentText),
    privacyLabel: localeString(privacyLabel),
    privacyHref,
    submitLabel: localeString(submitLabel),
    loadingLabel: localeString(loadingLabel),
    successMessage: localeText(successMessage),
    errorMessage: localeText(errorMessage),
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
    footerCopyrightText: "Copyright {year} {shortName}. Tous droits reserves.",
    footerCopyrightTextIntl: localeString("Copyright {year} {shortName}. Tous droits reserves."),
    cookieTitle: "Gestion des cookies",
    cookieTitleIntl: localeString("Gestion des cookies"),
    cookieMessage:
      "Nous utilisons des cookies pour mesurer l'audience et ameliorer l'experience du site.",
    cookieMessageIntl: localeText(
      "Nous utilisons des cookies pour mesurer l'audience et ameliorer l'experience du site.",
    ),
    cookiePolicyLabel: "Politique cookies",
    cookiePolicyLabelIntl: localeString("Politique cookies"),
    cookiePolicyHref: "/cookies",
    cookieAcceptLabel: "Accepter",
    cookieAcceptLabelIntl: localeString("Accepter"),
    cookieRejectLabel: "Refuser",
    cookieRejectLabelIntl: localeString("Refuser"),
  };

  const navigation = {
    _id: "navigation",
    _type: "navigation",
    // Périmètre réduit à 4 pages : Accueil, Solutions, Actualités (section
    // de la home), Contact. Tout le reste a été retiré du code — voir
    // next.config.ts pour les redirections des anciennes routes.
    mainNav: withKeys([
      { _type: "navItem", label: "Accueil", labelIntl: localeString("Accueil"), href: "/" },
      {
        _type: "navItem",
        label: "Services et Solutions IA",
        labelIntl: localeString("Services et Solutions IA"),
        href: "/solutions",
      },
      { _type: "navItem", label: "Actualit\u00e9s", labelIntl: localeString("Actualit\u00e9s"), href: "/actualites" },
      { _type: "navItem", label: "Contact", labelIntl: localeString("Contact"), href: "/contact" },
    ]),
    footerNav: withKeys([
      { _type: "navItem", label: "Mentions légales", labelIntl: localeString("Mentions légales"), href: "/mentions-legales" },
      { _type: "navItem", label: "Confidentialité", labelIntl: localeString("Confidentialité"), href: "/confidentialite" },
      { _type: "navItem", label: "Cookies", labelIntl: localeString("Cookies"), href: "/cookies" },
    ]),
  };

  const formSettings = {
    _id: "formSettings",
    _type: "formSettings",
    contact: formCopy({
      title: "Contacter le laboratoire",
      subtitle: "Précisez votre demande afin que l'équipe puisse vous répondre efficacement.",
      fullNameLabel: "Nom complet",
      fullNamePlaceholder: "Votre nom",
      emailLabel: "Email",
      emailPlaceholder: "votre@email.com",
      subjectLabel: "Sujet",
      subjectPlaceholder: "Objet de votre message",
      messageLabel: "Message",
      messagePlaceholder: "Votre message",
      consentText: "J'accepte que mes données soient utilisées pour répondre à ma demande.",
      privacyLabel: "Politique de confidentialité",
      privacyHref: "/confidentialite",
      submitLabel: "Envoyer",
      loadingLabel: "Envoi en cours",
      successMessage: "Votre message a été envoyé.",
      errorMessage: "Le message n'a pas pu être envoyé. Réessayez plus tard.",
    }),
    collaborate: formCopy({
      title: "Proposer une collaboration",
      subtitle: "Présentez votre organisation, votre besoin et le type de partenariat envisagé.",
      fullNameLabel: "Nom complet",
      fullNamePlaceholder: "Votre nom",
      emailLabel: "Email",
      emailPlaceholder: "votre@email.com",
      organizationLabel: "Organisation",
      organizationPlaceholder: "Institution, entreprise ou équipe",
      subjectLabel: "Type de collaboration",
      subjectPlaceholder: "Projet, stage, recherche, financement",
      messageLabel: "Description",
      messagePlaceholder: "Contexte, objectifs, calendrier et attentes",
      consentText: "J'accepte que mes données soient utilisées pour traiter cette proposition.",
      privacyLabel: "Politique de confidentialité",
      privacyHref: "/confidentialite",
      submitLabel: "Soumettre",
      loadingLabel: "Envoi en cours",
      successMessage: "Votre proposition a été transmise.",
      errorMessage: "La proposition n'a pas pu être envoyée. Réessayez plus tard.",
    }),
    newsletter: formCopy({
      title: "Recevoir les nouvelles du laboratoire",
      subtitle: "Inscrivez-vous pour suivre les annonces, publications, événements et opportunités.",
      emailLabel: "Email",
      emailPlaceholder: "votre@email.com",
      consentText: "J'accepte de recevoir les communications du laboratoire.",
      privacyLabel: "Politique de confidentialité",
      privacyHref: "/confidentialite",
      submitLabel: "S'inscrire",
      loadingLabel: "Inscription en cours",
      successMessage: "Votre inscription a été prise en compte.",
      errorMessage: "L'inscription n'a pas pu être finalisée. Réessayez plus tard.",
    }),
    unsubscribe: formCopy({
      title: "Gérer mon abonnement",
      subtitle: "Vous pouvez vous désinscrire de la newsletter à tout moment.",
      emailLabel: "Email",
      emailPlaceholder: "votre@email.com",
      submitLabel: "Se désinscrire",
      loadingLabel: "Envoi en cours",
      successMessage: "Votre demande a été prise en compte.",
      errorMessage: "La demande n'a pas pu être traitée. Réessayez plus tard.",
    }),
  };

  const homePage = {
    _id: "homePage",
    _type: "homePage",
    heroBadge: localeString("Intelligence Artificielle - Recherche - Innovation"),
    heroSubtitle: localeText(
      "Nous menons des recherches en intelligence artificielle et science des donn\u00e9es pour l'agriculture, les services publics, la sant\u00e9 et l'innovation.",
    ),
    heroActions: withKeys([
      { _type: "linkAction", label: "Collaborer avec le laboratoire", href: "/collaborer", variant: "primary" },
      { _type: "linkAction", label: "Explorer nos projets", href: "/projets", variant: "secondary" },
      { _type: "linkAction", label: "Voir les actualités", href: "/actualites", variant: "tertiary" },
    ]),
    introEyebrow: localeString("LaCDIA"),
    introTitle: localeString("Laboratoire de recherche et d'innovation en IA et science des donn\u00e9es."),
    introBody: localeText(
      "Nous menons des travaux de recherche appliqu\u00e9e et fondamentale, et nous accompagnons \u00e9galement des partenaires et des institutions dans la conception de solutions fond\u00e9es sur l'intelligence artificielle, la science des donn\u00e9es et les syst\u00e8mes intelligents.",
    ),
    introActions: withKeys([
      { _type: "linkAction", label: "Collaborer avec le laboratoire", href: "/collaborer", variant: "primary" },
      { _type: "linkAction", label: "Explorer nos projets", href: "/projets", variant: "secondary" },
      { _type: "linkAction", label: "Voir les actualités", href: "/actualites", variant: "tertiary" },
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
    teamSectionLabel: localeString("\u00c9quipe scientifique"),
    teamTitle: localeString(
      "Une expertise scientifique de haut niveau, ancr\u00e9e en Ha\u00efti et ouverte sur le monde",
    ),
    teamIntro: localeText(
      "Le LaCDIA rassemble une dizaine de profils scientifiques et techniques compl\u00e9mentaires \u2014 chercheurs nationaux et internationaux, ing\u00e9nieurs sp\u00e9cialis\u00e9s et experts des technologies \u00e9mergentes \u2014 pour porter une recherche en intelligence artificielle rigoureuse et ancr\u00e9e dans les r\u00e9alit\u00e9s cara\u00efbeennes.",
    ),
    teamNote: localeText(
      "Certains profils cumulent plusieurs responsabilit\u00e9s scientifiques et institutionnelles ; cette pr\u00e9sentation refl\u00e8te les comp\u00e9tences mobilis\u00e9es par le laboratoire plut\u00f4t qu'un organigramme fig\u00e9.",
    ),
    teamCategories: withKeys([
      {
        _type: "teamCategoryItem",
        badge: localeString("2 chercheurs \u00b7 HDR"),
        title: localeString("Chercheurs seniors habilit\u00e9s"),
        description: localeText(
          "Deux chercheurs nationaux, titulaires d'une Habilitation \u00e0 Diriger des Recherches, encadrent les travaux du laboratoire et en garantissent l'exigence scientifique.",
        ),
      },
      {
        _type: "teamCategoryItem",
        badge: localeString("3 experts"),
        title: localeString("R\u00e9seau scientifique international"),
        description: localeText(
          "Deux chercheurs internationaux et un professeur \u00e9m\u00e9rite compl\u00e8tent ce noyau scientifique, apportant au LaCDIA un regard ext\u00e9rieur et des collaborations acad\u00e9miques \u00e9tablies.",
        ),
      },
      {
        _type: "teamCategoryItem",
        badge: localeString("2+ chercheurs"),
        title: localeString("Chercheurs nationaux associ\u00e9s"),
        description: localeText(
          "D'autres chercheurs nationaux, aux expertises compl\u00e9mentaires, rejoignent progressivement le laboratoire et contribuent \u00e0 l'\u00e9largissement de ses axes de recherche.",
        ),
      },
      {
        _type: "teamCategoryItem",
        badge: localeString("2 ing\u00e9nieurs"),
        title: localeString("Ing\u00e9nierie IA et donn\u00e9es"),
        description: localeText(
          "Deux ing\u00e9nieurs en intelligence artificielle, sp\u00e9cialis\u00e9s dans le traitement de grands volumes de donn\u00e9es, assurent la mise en \u0153uvre technique des projets et mod\u00e8les du laboratoire.",
        ),
      },
      {
        _type: "teamCategoryItem",
        badge: localeString("ESIH"),
        title: localeString("Rattachement institutionnel"),
        description: localeText(
          "Le LaCDIA est rattach\u00e9 \u00e0 l'\u00c9cole Sup\u00e9rieure d'Infotronique d'Ha\u00efti (ESIH), qui en garantit l'ancrage institutionnel et juridique. La direction scientifique du laboratoire rel\u00e8ve de ses propres instances de gouvernance.",
        ),
        linkLabel: localeString("ESIH"),
        linkHref: "https://esih.edu",
      },
      {
        _type: "teamCategoryItem",
        badge: localeString("1 expert"),
        title: localeString("Expertise en IA g\u00e9n\u00e9rative"),
        description: localeText(
          "Un expert en intelligence artificielle g\u00e9n\u00e9rative compl\u00e8te l'\u00e9quipe, portant l'exploration de ces technologies \u00e9mergentes au sein des travaux du LaCDIA.",
        ),
      },
    ]),
    teamStats: withKeys([
      { _type: "teamStatItem", value: "11", label: localeString("Membres mobilis\u00e9s") },
      { _type: "teamStatItem", value: "2", label: localeString("Chercheurs internationaux") },
      { _type: "teamStatItem", value: "2", label: localeString("Ing\u00e9nieurs IA") },
      { _type: "teamStatItem", value: "6", label: localeString("Profils d'expertise") },
    ]),
    publicationsTitle: localeString("Publications r\u00e9centes"),
    publicationsIntro: localeText("Articles, rapports et communications qui documentent nos avanc\u00e9es scientifiques."),
    partnersTitle: localeString("Partenaires & collaborations"),
    partnersIntro: localeText(
      "Nous travaillons avec des institutions acad\u00e9miques, publiques et priv\u00e9es pour acc\u00e9l\u00e9rer l'impact de la recherche.",
    ),
    partnersBadge: localeString("Besoin de collaborer ? Contactez-nous."),
    collaborateTitle: localeString("Collaborer avec le laboratoire"),
    collaborateBody: localeText(
      "Partenariats institutionnels, stages, financements ou projets appliqués : construisons ensemble des solutions d'impact.",
    ),
    collaborateActions: withKeys([
      { _type: "linkAction", label: "Proposer un partenariat", href: "/collaborer", variant: "primary" },
      { _type: "linkAction", label: "Candidater à un stage", href: "/collaborer", variant: "secondary" },
    ]),
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
      note: "Mise à jour prochainement",
      noteIntl: localeText("Mise à jour prochainement"),
      status: "draft",
    },
    {
      _id: "kpi-partners",
      _type: "kpi",
      key: "partners",
      label: "Partenaires / Clients",
      labelIntl: localeString("Partenaires / Clients"),
      value: "2+",
      note: "Liste évolutive",
      noteIntl: localeText("Liste évolutive"),
      status: "draft",
    },
    {
      _id: "kpi-students",
      _type: "kpi",
      key: "students",
      label: "Étudiants impliqués",
      labelIntl: localeString("Étudiants impliqués"),
      value: "30+",
      note: "Selon activités en cours",
      noteIntl: localeText("Selon activités en cours"),
      status: "draft",
    },
  ];

  const kpiSettings = {
    _id: "kpiSettings",
    _type: "kpiSettings",
    lastUpdated: "2025-12-30",
    lastUpdatedIntl: localeString("2025-12-30"),
    disclaimer: "Certains indicateurs sont provisoires et seront confirmés après consolidation interne.",
    disclaimerIntl: localeString(
      "Certains indicateurs sont provisoires et seront confirmés après consolidation interne.",
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
        "Plateforme médiatique indépendante engagée pour un journalisme rigoureux et la valorisation des savoirs.",
      shortDescriptionIntl: localeText(
        "Plateforme médiatique indépendante engagée pour un journalisme rigoureux et la valorisation des savoirs.",
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
      role: "Étudiant(e) stagiaire",
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
      role: "Étudiant(e) stagiaire",
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
      title: "Quand l'intelligence artificielle vient au secours des manguiers haïtiens",
      titleIntl: localeString(
        "Quand l'intelligence artificielle vient au secours des manguiers haïtiens",
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
      title: "Soutenance de Master 2 en Intelligence Artificielle - Décembre 2025",
      titleIntl: localeString("Soutenance de Master 2 en Intelligence Artificielle - Décembre 2025"),
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
    { _id: "sector-education", _type: "sector", name: "Éducation", nameIntl: localeString("Éducation"), icon: "book", order: 8 },
  ];

  const solutionsPage = {
    _id: "solutionsPage",
    _type: "solutionsPage",
    heroBadge: localeString("Services & Solutions IA"),
    heroTitle: localeString("Recherche appliqu\u00e9e et transfert en intelligence artificielle"),
    heroSubtitle: localeText(
      "Le LaCDIA développe des méthodes et prototypes IA, puis les transfère vers des cas d'usage réels en collaboration avec ses partenaires.",
    ),
    heroDescription: localeText(
      "Nos solutions s'appuient sur des axes de recherche, des projets interdisciplinaires et une validation scientifique rigoureuse.",
    ),
    heroPrimaryCta: { _type: "linkAction", label: "Proposer un projet", href: "/contact", variant: "primary" },
    heroSecondaryCta: { _type: "linkAction", label: "Voir les cas d'usage", href: "#cas-usage", variant: "secondary" },
    approachTitle: localeString("Notre approche"),
    approachIntro: localeText("Une démarche scientifique, rigoureuse et orientée impact."),
    approachSteps: withKeys([
      {
        title: "Diagnostic",
        titleIntl: localeString("Diagnostic"),
        description: "Qualification des donn\u00e9es, besoins m\u00e9tier et contraintes terrain.",
        descriptionIntl: localeText(
          "Qualification des donn\u00e9es, besoins m\u00e9tier et contraintes terrain.",
        ),
      },
      { title: "Modélisation", titleIntl: localeString("Modélisation"), description: "Conception IA, prototypage rapide et validation scientifique.", descriptionIntl: localeText("Conception IA, prototypage rapide et validation scientifique.") },
      { title: "Déploiement", titleIntl: localeString("Déploiement"), description: "Intégration, accompagnement et mesure d'impact.", descriptionIntl: localeText("Intégration, accompagnement et mesure d'impact.") },
    ]),
    solutionsTitle: localeString("Solutions IA"),
    solutionsIntro: localeText(
      "Des solutions concrètes pour analyser, automatiser, décider et rendre l'information accessible.",
    ),
    solutions: aiSolutions.map((item) => ({ _key: makeKey(), _type: "reference", _ref: item._id })),
    useCasesTitle: localeString("Cas d'usage"),
    useCasesIntro: localeText("Projets concrets et parcours d'impact."),
    featuredUseCase: { _type: "reference", _ref: useCases[0]._id },
    flowTitle: localeString("Flux IA appliqué"),
    flowDescription: localeText(
      "Donn\u00e9es terrain -> Connaissances -> Mod\u00e8les IA -> D\u00e9cision",
    ),
    flowSteps: ["Collecte", "Analyse", "Recommandation", "Suivi terrain"],
    servicesTitle: localeString("Services proposés"),
    servicesIntro: localeText("Un accompagnement complet, de l'idée au déploiement."),
    services: [
      "Conseil scientifique",
      "D\u00e9veloppement IA",
      "Data engineering",
      "Syst\u00e8mes d'aide \u00e0 la d\u00e9cision",
      "MLOps et déploiement",
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
      expertise: ["Gouvernance institutionnelle", "Direction stratégique", "Innovation pédagogique"],
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
      longBio: "Co-fondatrice du laboratoire LaCDIA. Pilote les activités scientifiques en apprentissage automatique.",
      expertise: ["Direction scientifique", "Machine Learning", "Data Science"],
      links: { email: "aishael.picard@lacdia.esih.edu" },
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
      shortBio: "Co-fondateur du laboratoire LaCDIA. Spécialiste des systèmes multi-agents.",
      affiliation: "LaCDIA - ESTIA",
      longBio: "Co-fondateur du laboratoire LaCDIA. Supervise les projets de recherche appliqu\u00e9e.",
      expertise: ["Intelligence artificielle", "Deep Learning", "Computer Vision"],
      links: { email: "livenson.nicolas@lacdia.esih.edu", linkedin: "https://linkedin.com/in/livenson-nicolas" },
      governanceGroup: "direction",
      order: 3,
    },
    {
      _id: "person-benedique-paul",
      _type: "person",
      name: "Dr. Bénédique Paul",
      slug: { current: "benedique-paul" },
      roleTitle: "Chercheur associé",
      roleCategory: "conseil",
      shortBio: "Membre du conseil scientifique. Expert en agronomie tropicale.",
      affiliation: "FSAE/UniQ - Université Quisqueya",
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
      affiliation: "À déterminer",
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
    membersSectionTitle: "Membres & Profils détaillés",
    membersSectionTitleIntl: localeString("Membres & Profils détaillés"),
    membersSectionIntro: [
      block(
        "L'équipe de LaCDIA réunit des experts en intelligence artificielle, data science et agronomie.",
      ),
    ],
    membersSectionIntroIntl: localeBlock([
      block(
        "L'équipe de LaCDIA réunit des experts en intelligence artificielle, data science et agronomie.",
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
        "Découvrez la structure organisationnelle et l'équipe qui pilote LaCDIA dans sa mission de recherche et d'innovation.",
      ),
    ],
    introIntl: localeBlock([
      block(
        "Découvrez la structure organisationnelle et l'équipe qui pilote LaCDIA dans sa mission de recherche et d'innovation.",
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
    membersSectionTitle: "Membres & Profils détaillés",
    membersSectionTitleIntl: localeString("Membres & Profils détaillés"),
    membersSectionIntro: [
      block(
        "L'équipe de LaCDIA réunit des experts en intelligence artificielle, data science et agronomie.",
      ),
    ],
    membersSectionIntroIntl: localeBlock([
      block(
        "L'équipe de LaCDIA réunit des experts en intelligence artificielle, data science et agronomie.",
      ),
    ]),
    membersGroupsToShow: ["direction", "gouvernance", "comite_scientifique"],
    membersOrder: "orderAsc",
    governanceChartStrict: { _type: "reference", _ref: "governanceChartStrict" },
  };

  const institutionalPages = [
    {
      _id: "page-a-propos",
      _type: "institutionalPage",
      status: "published",
      title: "À propos",
      titleIntl: localeString("À propos"),
      slug: { current: "a-propos" },
      slugIntl: { fr: { current: "a-propos" }, en: { current: "about" } },
      summary:
        "Laboratoire caribéen dédié à la recherche, à l'innovation et au transfert en intelligence artificielle et science des données.",
      summaryIntl: localeText(
        "Laboratoire caribéen dédié à la recherche, à l'innovation et au transfert en intelligence artificielle et science des données.",
      ),
      seo: seo(
        "À propos - LaCDIA",
        "Découvrez le Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle.",
      ),
      content: [block("Présentation institutionnelle du laboratoire.")],
      contentIntl: localeBlock([block("Présentation institutionnelle du laboratoire.")]),
      sections: [
        section({
          variant: "heroDark",
          eyebrow: "Laboratoire de recherche",
          title: "Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle",
          intro:
            "Un pôle de référence pour la recherche, l'innovation et le transfert technologique en intelligence artificielle et science des données dans la Caraïbe.",
          actions: [
            action("Explorer la recherche", "/recherche", "primary"),
            action("Contacter le laboratoire", "/contact", "secondary"),
          ],
        }),
        section({
          layout: "cards",
          title: "Identité institutionnelle",
          intro: "Les informations structurantes du laboratoire sont éditables depuis Sanity.",
          cards: [
            card({ title: "Nom complet", description: "Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle" }),
            card({ title: "Acronyme", description: "LaCDIA" }),
            card({ title: "Affiliation", description: "Écosystème académique et scientifique caribéen." }),
            card({ title: "Localisation", description: "Port-au-Prince, Haïti, avec une vocation régionale caribéenne." }),
          ],
        }),
        section({
          title: "Vision",
          body: [
            block(
              "Devenir un pôle de référence régional pour la recherche, l'innovation et l'application responsable de l'intelligence artificielle et de la science des données.",
            ),
          ],
        }),
        section({
          layout: "cards",
          variant: "light",
          title: "Mission",
          intro:
            "Produire des connaissances, former des talents, développer des solutions utiles et accompagner les institutions dans l'usage responsable des données.",
          cards: [
            card({ title: "Recherche", description: "Conduire des travaux scientifiques appliqués et fondamentaux." }),
            card({ title: "Innovation", description: "Transformer les résultats scientifiques en prototypes, outils et services." }),
            card({ title: "Formation", description: "Renforcer les compétences en IA, data science et ingénierie numérique." }),
            card({ title: "Transfert", description: "Connecter le laboratoire aux besoins des organisations publiques, privées et communautaires." }),
          ],
        }),
        section({
          layout: "pills",
          title: "Valeurs",
          cards: [
            card({ title: "Rigueur scientifique" }),
            card({ title: "Éthique et responsabilité" }),
            card({ title: "Impact local" }),
            card({ title: "Collaboration" }),
            card({ title: "Ouverture caribéenne" }),
            card({ title: "Excellence opérationnelle" }),
          ],
        }),
        section({
          layout: "cards",
          title: "Piliers stratégiques",
          cards: [
            card({ title: "Recherche scientifique", description: "Axes de recherche, publications, protocoles et encadrement." }),
            card({ title: "LaCDIA Tech", description: "Développement de solutions IA, plateformes data et services numériques." }),
            card({ title: "Formation et talents", description: "Ateliers, programmes, mentorat et accompagnement des jeunes chercheurs." }),
            card({ title: "Partenariats", description: "Coopération avec universités, institutions, entreprises et bailleurs." }),
          ],
        }),
      ],
    },
    {
      _id: "page-lacdia-tech",
      _type: "institutionalPage",
      status: "published",
      title: "LaCDIA Tech",
      titleIntl: localeString("LaCDIA Tech"),
      slug: { current: "lacdia-tech" },
      slugIntl: { fr: { current: "lacdia-tech" }, en: { current: "lacdia-tech" } },
      summary:
        "Département technologique chargé de transformer la recherche en solutions IA, produits data et services numériques.",
      summaryIntl: localeText(
        "Département technologique chargé de transformer la recherche en solutions IA, produits data et services numériques.",
      ),
      seo: seo(
        "LaCDIA Tech - Département Technologique et Innovation",
        "Solutions IA, data science, automatisation, plateformes intelligentes et innovation appliquée par LaCDIA Tech.",
      ),
      content: [block("Département technologique et innovation du laboratoire.")],
      contentIntl: localeBlock([block("Département technologique et innovation du laboratoire.")]),
      sections: [
        section({
          variant: "heroDark",
          eyebrow: "LaCDIA Tech",
          title: "Département Technologique et Innovation",
          intro:
            "Nous concevons des solutions IA, plateformes de données, outils d'automatisation et prototypes issus des travaux scientifiques du laboratoire.",
          actions: [action("Demander une solution", "/contact", "primary"), action("Voir les cas d'usage", "#cas-usage", "secondary")],
        }),
        section({
          title: "Mission",
          body: [
            block(
              "LaCDIA Tech assure le passage de la recherche vers l'usage : cadrage du besoin, architecture technique, développement, expérimentation, déploiement et transfert.",
            ),
          ],
        }),
        section({
          layout: "cards",
          variant: "light",
          title: "Services",
          cards: [
            card({ title: "Solutions IA sur mesure", description: "Modèles prédictifs, classification, recommandation et détection d'anomalies." }),
            card({ title: "Data platforms", description: "Collecte, structuration, visualisation et gouvernance des données." }),
            card({ title: "Automatisation", description: "Processus intelligents, assistants métier et workflows connectés." }),
            card({ title: "Conseil technique", description: "Audit, faisabilité, architecture et accompagnement de projets IA." }),
          ],
        }),
        section({
          layout: "cards",
          title: "Pipeline d'innovation",
          cards: [
            card({ title: "Cadrer", description: "Clarifier le problème, les données disponibles et les critères d'impact." }),
            card({ title: "Prototyper", description: "Construire un MVP testable avec des indicateurs mesurables." }),
            card({ title: "Valider", description: "Évaluer les performances, les risques et l'utilisabilité." }),
            card({ title: "Déployer", description: "Industrialiser progressivement avec documentation et transfert." }),
          ],
        }),
        section({
          anchor: "cas-usage",
          layout: "cards",
          variant: "light",
          title: "Cas d'usage",
          cards: [
            card({ title: "Agriculture intelligente", description: "Prédiction, suivi de cultures, alertes et tableaux de bord." }),
            card({ title: "Santé et services publics", description: "Analyse de données, priorisation, observatoires et aide à la décision." }),
            card({ title: "Éducation et formation", description: "Plateformes, assistants pédagogiques et analyse des parcours." }),
            card({ title: "Entreprises et institutions", description: "Optimisation opérationnelle, automatisation documentaire et reporting." }),
          ],
        }),
      ],
    },
    {
      _id: "page-departement-scientifique",
      _type: "institutionalPage",
      status: "published",
      title: "Département scientifique",
      titleIntl: localeString("Département scientifique"),
      slug: { current: "departement-scientifique" },
      slugIntl: { fr: { current: "departement-scientifique" }, en: { current: "scientific-department" } },
      summary:
        "Structure scientifique chargée des axes de recherche, méthodes, publications, encadrement et collaborations académiques.",
      summaryIntl: localeText(
        "Structure scientifique chargée des axes de recherche, méthodes, publications, encadrement et collaborations académiques.",
      ),
      seo: seo(
        "Département Scientifique - LaCDIA",
        "Axes de recherche, méthodes scientifiques, publications, encadrement et collaborations du département scientifique de LaCDIA.",
      ),
      content: [block("Présentation du département scientifique.")],
      contentIntl: localeBlock([block("Présentation du département scientifique.")]),
      sections: [
        section({
          variant: "heroDark",
          eyebrow: "Département scientifique",
          title: "Recherche, méthodes et production scientifique",
          intro:
            "Le département scientifique structure les axes de recherche, garantit la qualité méthodologique et accompagne les publications, projets et collaborations académiques.",
          actions: [action("Explorer les axes", "/recherche/axes", "primary"), action("Voir les publications", "/publications", "secondary")],
        }),
        section({
          title: "Rôle",
          body: [
            block(
              "Le département scientifique définit les priorités de recherche, encadre les protocoles, anime les groupes de travail et veille à la cohérence scientifique des projets du laboratoire.",
            ),
          ],
        }),
        section({
          layout: "cards",
          variant: "light",
          title: "Objectifs",
          cards: [
            card({ title: "Structurer les axes", description: "Organiser les travaux autour de problèmes scientifiques et territoriaux prioritaires." }),
            card({ title: "Garantir la méthode", description: "Assurer la rigueur des données, protocoles, expérimentations et évaluations." }),
            card({ title: "Produire et publier", description: "Valoriser les résultats sous forme d'articles, rapports, jeux de données et communications." }),
            card({ title: "Encadrer", description: "Accompagner et former les étudiants, chercheurs et collaborateurs associés." }),
          ],
        }),
        section({
          layout: "cards",
          title: "Méthodologies",
          cards: [
            card({ title: "Apprentissage automatique", description: "Modélisation prédictive, classification, optimisation et évaluation." }),
            card({ title: "Science des données", description: "Collecte, nettoyage, analyse, visualisation et interprétation des données." }),
            card({ title: "IA responsable", description: "Éthique, explicabilité, robustesse, biais et gouvernance." }),
            card({ title: "Recherche appliquée", description: "Protocoles terrain, expérimentation, mesure d'impact et transfert." }),
          ],
        }),
        section({
          layout: "cards",
          variant: "light",
          title: "Collaborations",
          cards: [
            card({ title: "Universités", description: "Programmes de recherche, encadrement, mobilité et co-publications." }),
            card({ title: "Institutions publiques", description: "Observatoires, données d'intérêt général et aide à la décision." }),
            card({ title: "Entreprises", description: "Recherche appliquée, prototypes et expérimentation." }),
            card({ title: "Organisations internationales", description: "Programmes régionaux, financement et transfert de connaissances." }),
          ],
        }),
      ],
    },
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
      content: [block("Retrouvez les actualités et annonces officielles de LaCDIA.")],
      contentIntl: localeBlock([block("Retrouvez les actualités et annonces officielles de LaCDIA.")]),
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
      seo: seo("Collaborer - LaCDIA", "Proposer un partenariat, un projet, un stage ou une collaboration avec LaCDIA."),
      content: [block("Expliquez votre projet et contactez le laboratoire pour initier une collaboration.")],
      contentIntl: localeBlock([block("Expliquez votre projet et contactez le laboratoire pour initier une collaboration.")]),
      sections: [
        section({
          variant: "heroDark",
          title: "Collaborer avec le laboratoire",
          intro:
            "Partenariats institutionnels, stages, financement, recherche appliquée ou développement de solutions : présentez votre besoin à l'équipe.",
        }),
        section({
          layout: "cards",
          title: "Types de collaboration",
          cards: [
            card({ title: "Partenariat scientifique", description: "Projets de recherche, publications, expérimentation et encadrement." }),
            card({ title: "Projet appliqué", description: "Cadrage et développement de solutions IA ou data adaptées à un besoin terrain." }),
            card({ title: "Formation et stage", description: "Accueil, mentorat, ateliers et parcours de renforcement de compétences." }),
            card({ title: "Financement et soutien", description: "Programmes, appels à projets, ressources et coopération institutionnelle." }),
          ],
        }),
        section({
          layout: "form",
          variant: "light",
          title: "Formulaire de collaboration",
          intro: "Tous les libellés et messages du formulaire sont modifiables dans les réglages Sanity.",
          formType: "collaborate",
        }),
      ],
    },
    {
      _id: "page-contact",
      _type: "institutionalPage",
      status: "published",
      title: "Contact",
      titleIntl: localeString("Contact"),
      slug: { current: "contact" },
      slugIntl: { fr: { current: "contact" }, en: { current: "contact" } },
      summary: "Écrivez au laboratoire pour toute demande.",
      summaryIntl: localeText("Écrivez au laboratoire pour toute demande."),
      seo: seo("Contact - LaCDIA", "Contacter le Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle."),
      content: [block("Utilisez le formulaire pour contacter l'équipe du laboratoire.")],
      contentIntl: localeBlock([block("Utilisez le formulaire pour contacter l'équipe du laboratoire.")]),
      sections: [
        section({
          variant: "heroDark",
          title: "Contact",
          intro:
            "Écrivez au laboratoire pour une demande institutionnelle, scientifique, technique, média ou partenariale.",
        }),
        section({
          layout: "cards",
          title: "Coordonnées",
          cards: [
            card({ title: "Email", description: "contact@lacdia.esih.edu", href: "mailto:contact@lacdia.esih.edu" }),
            card({ title: "Localisation", description: "Port-au-Prince, Haïti" }),
            card({ title: "Demandes", description: "Recherche, partenariats, projets IA, formation et communication." }),
          ],
        }),
        section({
          layout: "form",
          variant: "light",
          title: "Formulaire de contact",
          intro: "Tous les champs visibles sont pilotables depuis Sanity.",
          formType: "contact",
        }),
      ],
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
      summary: "Inscrivez-vous pour recevoir les actualités.",
      summaryIntl: localeText("Inscrivez-vous pour recevoir les actualités."),
      seo: seo("Newsletter - LaCDIA", "Recevoir les actualités, publications, événements et opportunités de LaCDIA."),
      content: [block("Inscrivez-vous pour recevoir les actualités du laboratoire.")],
      contentIntl: localeBlock([block("Inscrivez-vous pour recevoir les actualités du laboratoire.")]),
      sections: [
        section({
          variant: "heroDark",
          title: "Newsletter",
          intro:
            "Recevez les annonces, publications, événements, appels à collaboration et nouvelles du laboratoire.",
        }),
        section({
          layout: "form",
          variant: "light",
          title: "Inscription",
          formType: "newsletter",
        }),
      ],
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
      content: [block("Découvrez les axes de recherche et les projets scientifiques du laboratoire.")],
      contentIntl: localeBlock([block("Découvrez les axes de recherche et les projets scientifiques du laboratoire.")]),
    },
    {
      _id: "page-recherche-explorer",
      _type: "institutionalPage",
      status: "published",
      title: "Recherche scientifique",
      titleIntl: localeString("Recherche scientifique"),
      slug: { current: "recherche-explorer" },
      slugIntl: { fr: { current: "recherche-explorer" }, en: { current: "research-explorer" } },
      summary: "Interrogez les publications, projets et membres du laboratoire.",
      summaryIntl: localeText("Interrogez les publications, projets et membres du laboratoire."),
      seo: seo(
        "Recherche scientifique - Explorer",
        "Moteur de recherche des publications, projets et membres du LaCDIA.",
      ),
      content: [block("Recherche transversale dans les contenus scientifiques du laboratoire.")],
      contentIntl: localeBlock([block("Recherche transversale dans les contenus scientifiques du laboratoire.")]),
      sections: [
        section({
          layout: "form",
          title: "Formulaire de recherche",
          actions: [action("Rechercher", "/recherche/explorer", "primary")],
          cards: [
            card({ title: "Tous les contenus", href: "", label: "Mot-clé, auteur, projet..." }),
            card({ title: "Publications", href: "publication", description: "Aucun résultat pour votre recherche." }),
            card({ title: "Projets", href: "project" }),
            card({ title: "Membres", href: "member" }),
          ],
        }),
      ],
    },
    {
      _id: "page-formation",
      _type: "institutionalPage",
      status: "published",
      title: "Formation",
      titleIntl: localeString("Formation"),
      slug: { current: "formation" },
      slugIntl: { fr: { current: "formation" }, en: { current: "formation" } },
      summary: "Programmes, ateliers et formations proposés par le laboratoire.",
      summaryIntl: localeText("Programmes, ateliers et formations proposés par le laboratoire."),
      content: [block("Renseignez ici les programmes de formation et les parcours pédagogiques.")],
      contentIntl: localeBlock([block("Renseignez ici les programmes de formation et les parcours pédagogiques.")]),
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
      content: [block("Détaillez ici la politique d'utilisation des cookies.")],
      contentIntl: localeBlock([block("Détaillez ici la politique d'utilisation des cookies.")]),
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
      content: [block("Liste des axes de recherche et des équipes associées.")],
      contentIntl: localeBlock([block("Liste des axes de recherche et des équipes associées.")]),
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
      content: [block("Sélectionnez un axe pour consulter les publications associées.")],
      contentIntl: localeBlock([block("Sélectionnez un axe pour consulter les publications associées.")]),
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
    formSettings,
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
