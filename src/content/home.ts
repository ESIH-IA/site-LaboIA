export const hero = {
  bannerSrc: "/banners/banner-neutral.svg",
  bannerAlt: "Bannière principale du LaCDIA",
  description:
    "Premier laboratoire de recherche en intelligence artificielle et science des données dans la Caraïbe, le LaCDIA produit des connaissances scientifiques originales et développe des solutions technologiques adaptées aux réalités caribéennes.",
  actions: [
    {
      label: "Découvrir le laboratoire",
      href: "/a-propos",
      variant: "primary",
    },
    {
      label: "Nos axes de recherche",
      href: "/recherche/departement-scientifique",
      variant: "secondary",
    },
    {
      label: "LaCDIA Tech — Services",
      href: "/lacdia-tech",
      variant: "tertiary",
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
