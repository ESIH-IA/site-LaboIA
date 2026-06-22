export const hero = {
  bannerSrc: "/banners/banner-neutral.svg",
  bannerAlt: "Bannière principale du LaCDIA",
  description:
    "Nous menons des recherches en intelligence artificielle et science des données pour l'agriculture, les services publics, la santé et l'innovation en Haïti et à l'international.",
  actions: [
    {
      label: "Collaborer avec le laboratoire",
      href: "/collaborer",
      variant: "primary",
    },
    {
      label: "Explorer nos projets",
      href: "/projets",
      variant: "secondary",
    },
  ],
} as const;

export const event = {
  label: "Événement à venir",
  title: "Séminaire IA & données pour les services publics",
  date: "Jeudi 25 avril à 10h00",
  location: "Campus ESIH, Port-au-Prince",
  ctaLabel: "Voir le programme",
  ctaHref: "/actualites",
} as const;
