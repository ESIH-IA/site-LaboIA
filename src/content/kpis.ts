export type KpiStatus = "draft" | "confirmed";

export const kpis = [
  {
    key: "projects",
    label: "Projets",
    value: "—",
    status: "draft" as KpiStatus,
    note: "En cours de consolidation",
  },
  {
    key: "publications",
    label: "Publications",
    value: "—",
    status: "draft" as KpiStatus,
    note: "Mise à jour prochainement",
  },
  {
    key: "partners",
    label: "Partenaires / Clients",
    value: "2+",
    status: "draft" as KpiStatus,
    note: "Liste évolutive",
  },
  {
    key: "students",
    label: "Étudiants impliqués",
    value: "30+",
    status: "draft" as KpiStatus,
    note: "Selon activités en cours",
  },
] as const;

export const kpiMeta = {
  lastUpdated: "2025-12-30",
  disclaimer:
    "Certains indicateurs sont provisoires et seront confirmés après consolidation interne.",
} as const;
