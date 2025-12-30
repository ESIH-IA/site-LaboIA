export type DocumentType =
  | "Rapport"
  | "Présentation"
  | "Certificat"
  | "Publication"
  | "Autre";

export const documents = [
  {
    id: "certificat-publications-infosnation-2025",
    title: "Certificat attestant les publications (InfosNation – 2025)",
    type: "Certificat" as DocumentType,
    date: "2025-12-25",
    file: null as null | { url: string; mime: string },
    related: {
      people: ["livenson-nicolas", "aishael-picard"],
      projects: ["deep-farm"],
      articles: [],
      partners: ["infosnation"],
    },
    notes: "Document à téléverser dès validation interne (PDF).",
  },
] as const;
