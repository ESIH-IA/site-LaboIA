export type PartnerType = "partner" | "client" | "media" | "academic";

export const partners = [
  {
    id: "infosnation",
    name: "InfosNation",
    type: "media" as PartnerType,
    shortDescription:
      "Plateforme médiatique indépendante engagée pour un journalisme rigoureux et la valorisation des savoirs.",
    website: "https://infosnation.com",
    featured: true,
    tags: ["Médiation scientifique", "Partenariat éditorial", "Sciences & Société"],
  },
] as const;
