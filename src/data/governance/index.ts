import type { GovernanceData } from "./types";
import {
  patrickAttie,
  aishaelPicard,
  livensonNicolas,
  benediquePaul,
  sergeMranda,
} from "./people";

/**
 * Configuration de la page Équipe & Gouvernance de LaCDIA
 * CMS local - Toutes les données sont ici
 *
 * Structure organisationnelle :
 * - Gouvernance institutionnelle : Directeur de l'ESIH
 * - Direction scientifique : deux directeurs spécialistes (ML et IA)
 * - Conseil scientifique : chercheurs associés et conseillers internationaux
 */
export const governanceData: GovernanceData = {
  title: "Équipe & Gouvernance",
  intro:
    "Découvrez la structure organisationnelle et l'équipe qui pilote LaCDIA dans sa mission de recherche et d'innovation en intelligence artificielle au service d'Haïti.",

  orgChart: {
    sectionTitle: "Équipe de direction",
    sectionIntro:
      "Le LaCDIA est dirigé par une équipe pluridisciplinaire associant gouvernance institutionnelle et expertise scientifique. La structure de direction combine la gouvernance institutionnelle assurée par la direction de l'ESIH et la direction scientifique portée par deux spécialistes en intelligence artificielle et en apprentissage automatique. Le laboratoire s'appuie également sur un conseil scientifique composé de chercheurs associés et de conseillers scientifiques internationaux.",
    topPerson: patrickAttie,
    scientificDirectors: [livensonNicolas, aishaelPicard],
    associateResearchers: [benediquePaul, sergeMranda],
  },

  members: {
    sectionTitle: "Équipe scientifique",
    sectionIntro:
      "L'équipe de LaCDIA réunit des experts en intelligence artificielle, data science et agronomie. Leur expertise complémentaire permet d'aborder les enjeux de recherche avec une approche multidisciplinaire et innovante.",
    people: [patrickAttie, livensonNicolas, aishaelPicard, benediquePaul, sergeMranda],
  },
};

/**
 * Helper pour récupérer les données de gouvernance
 * Simule une fonction async comme si on faisait un fetch
 */
export async function getGovernanceData(): Promise<GovernanceData> {
  // Simule un délai réseau (optionnel)
  await new Promise((resolve) => setTimeout(resolve, 0));
  return governanceData;
}

// Export des types et personnes
export * from "./types";
export * from "./people";
