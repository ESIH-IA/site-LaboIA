import type { GovernanceData } from "./types";
import type { Locale } from "@/lib/i18n";
import {
  patrickAttie,
  aishaelPicard,
  livensonNicolas,
  benediquePaul,
  evensEmmanuel,
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
  title: "Équipe et Gouvernance",
  intro:
    "Découvrez la structure organisationnelle et l'équipe qui pilote LaCDIA dans sa mission de recherche et d'innovation en intelligence artificielle au service d'Haïti.",

  orgChart: {
    sectionTitle: "Équipe de direction",
    sectionIntro:
      "Le LaCDIA est dirigé par une équipe pluridisciplinaire associant gouvernance institutionnelle et expertise scientifique. La structure de direction combine la gouvernance institutionnelle assurée par la direction de l'ESIH et la direction scientifique portée par deux spécialistes en intelligence artificielle et en apprentissage automatique. Le laboratoire s'appuie également sur un conseil scientifique composé de chercheurs associés et de conseillers scientifiques internationaux.",
    topPerson: patrickAttie,
    scientificDirectors: [livensonNicolas, aishaelPicard],
    associateResearchers: [benediquePaul, evensEmmanuel, sergeMranda],
  },

  members: {
    sectionTitle: "Équipe scientifique",
    sectionIntro:
      "L'équipe de LaCDIA réunit des experts en intelligence artificielle, data science et agronomie. Leur expertise complémentaire permet d'aborder les enjeux de recherche avec une approche multidisciplinaire et innovante.",
    people: [patrickAttie, livensonNicolas, aishaelPicard, benediquePaul, evensEmmanuel, sergeMranda],
  },
};

/**
 * Helper pour récupérer les données de gouvernance
 * Simule une fonction async comme si on faisait un fetch
 */
export async function getGovernanceData(locale: Locale = "fr"): Promise<GovernanceData> {
  // Simule un délai réseau (optionnel)
  await new Promise((resolve) => setTimeout(resolve, 0));
  if (locale === "en") {
    return {
      ...governanceData,
      title: "Team and Governance",
      intro:
        "Discover the organizational structure and the team leading LaCDIA in its mission of research and innovation in artificial intelligence for Haiti and the Caribbean.",
      orgChart: {
        ...governanceData.orgChart,
        sectionTitle: "Leadership team",
        sectionIntro:
          "LaCDIA is led by a multidisciplinary team combining institutional governance and scientific expertise. The leadership structure brings together institutional oversight from ESIH's management and scientific direction led by two specialists in artificial intelligence and machine learning. The laboratory also relies on a scientific council made up of associate researchers and international scientific advisers.",
      },
      members: {
        ...governanceData.members,
        sectionTitle: "Scientific team",
        sectionIntro:
          "LaCDIA brings together experts in artificial intelligence, data science and agronomy. Their complementary expertise makes it possible to tackle research challenges with a multidisciplinary and innovative approach.",
      },
    };
  }

  return governanceData;
}

// Export des types et personnes
export * from "./types";
export * from "./people";
