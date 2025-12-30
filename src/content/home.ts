export const hero = {
  bannerSrc: "/banners/banner-neutral.svg",
  bannerAlt: "Bannière principale du LaDIA",
  description:
    "Nous concevons des solutions en intelligence artificielle et science des données pour l’agriculture, les services publics, la santé, l’environnement et l’innovation en Haïti et à l’international.",
  actions: [
    {
      label: "Découvrir nos projets",
      href: "/projets",
      variant: "primary",
    },
    {
      label: "Collaborer avec nous",
      href: "/collaborer",
      variant: "secondary", 
    },
    {
      label: "Voir nos publications",
      href: "/publications",
      variant: "tertiary",
    },
  ],
} as const;

export const event = {
  label: "Événement à venir",
  title: "Séminaire IA & données pour les services publics",
  date: "Jeudi 25 avril · 10h00",
  location: "Campus ESIH, Port-au-Prince",
  ctaLabel: "Voir le programme",
  ctaHref: "/actualites",
} as const;
