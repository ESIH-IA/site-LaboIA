export type KpiStatus = "draft" | "confirmed";

export const kpis = [
  {
    key: "chercheurs",
    label: "Chercheurs actifs",
    value: "5+",
    status: "confirmed" as KpiStatus,
    note: "Chercheurs, doctorants et collaborateurs actifs",
  },
  {
    key: "projets",
    label: "Projets en cours",
    value: "0",
    status: "confirmed" as KpiStatus,
    note: "Projets de recherche en cours de lancement",
  },
  {
    key: "partenariats",
    label: "Partenariats actifs",
    value: "1",
    status: "confirmed" as KpiStatus,
    note: "Partenariat actif en recherche et médiation",
  },
  {
    key: "axes",
    label: "Axes de recherche",
    value: "6",
    status: "confirmed" as KpiStatus,
    note: "Thématiques structurant nos travaux",
  },
] as const;

export const kpiMeta = {
  lastUpdated: "2026-06-18",
  disclaimer: "",
} as const;
