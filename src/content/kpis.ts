export type KpiStatus = "draft" | "confirmed";

export const kpis = [
  {
    key: "students",
    label: "Étudiants impliqués",
    value: "30+",
    status: "confirmed" as KpiStatus,
    note: "Étudiants encadrés sur nos projets de recherche",
  },
  {
    key: "partners",
    label: "Partenaires",
    value: "2+",
    status: "confirmed" as KpiStatus,
    note: "Partenariats actifs en recherche et médiation",
  },
  {
    key: "projects",
    label: "Projets actifs",
    value: "1",
    status: "confirmed" as KpiStatus,
    note: "DEEP FARM — agriculture intelligente en Haïti",
  },
  {
    key: "years",
    label: "Années de recherche",
    value: "3+",
    status: "confirmed" as KpiStatus,
    note: "Depuis la fondation du laboratoire",
  },
] as const;

export const kpiMeta = {
  lastUpdated: "2026-06-18",
  disclaimer: "",
} as const;
