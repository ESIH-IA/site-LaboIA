import type { GovernanceData } from "./types";
import {
  patrickAttie,
  aishaelPicard,
  livensonNicolas,
  benediquePaul,
  sergeMiranda,
} from "./people";

/**
 * Configuration de la page Équipe & Gouvernance de LaCDIA
 * CMS local - Toutes les données sont ici
 *
 * Structure harmonisée :
 * - Co-fondateurs du laboratoire (3 personnes) : statut juridique commun
 * - Fonctions opérationnelles distinctes : gouvernance institutionnelle + direction scientifique
 * - Conseil scientifique : chercheurs associés et conseillers internationaux
 */
export const governanceData: GovernanceData = {
  title: "Équipe & Gouvernance",
  intro:
    "Découvrez la structure organisationnelle et l'équipe qui pilote LaCDIA dans sa mission de recherche et d'innovation en intelligence artificielle au service d'Haïti.",

  orgChart: {
    sectionTitle: "Co-fondateurs du laboratoire",
    sectionIntro:
      "Le laboratoire a été co-fondé par des acteurs académiques et scientifiques. Sa gouvernance institutionnelle est assurée par l'ESIH, tandis que la direction scientifique est portée par les fondateurs spécialistes en intelligence artificielle et en apprentissage automatique. Le laboratoire s'appuie également sur un conseil scientifique composé de chercheurs associés et de conseillers scientifiques internationaux.",
    topPerson: patrickAttie,
    coFounders: [livensonNicolas, aishaelPicard],
    associateResearchers: [benediquePaul, sergeMiranda],
  },

  members: {
    sectionTitle: "Membres & Profils détaillés",
    sectionIntro:
      "L'équipe de LaCDIA réunit des experts en intelligence artificielle, data science et agronomie. Leur expertise complémentaire permet d'aborder les enjeux de recherche avec une approche multidisciplinaire et innovante.",
    people: [patrickAttie, livensonNicolas, aishaelPicard, benediquePaul, sergeMiranda],
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
