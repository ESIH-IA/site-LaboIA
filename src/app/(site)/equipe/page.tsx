import type { Metadata } from "next";

import { MembersGrid } from "@/components/governance/members-grid";
import { GovernanceChartPremium } from "@/components/governance/GovernanceChartPremium";
import { getGovernanceData } from "@/data/governance";

export const metadata: Metadata = {
  title: "Équipe & Gouvernance | LaCDIA",
  description:
    "Découvrez la structure hiérarchique du laboratoire LaCDIA, ses membres clés et leur expertise en intelligence artificielle, data science et agronomie appliquées au développement d'Haïti.",
};

export default async function EquipePage() {
  const data = await getGovernanceData();

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Hero Section - Style Tech/IA */}
      <section className="relative overflow-hidden gradient-mesh-bg py-28 md:py-36">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow" />
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl animate-glow" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge Tech */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
              Intelligence Artificielle • Recherche • Innovation
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            {data.title}
          </h1>

          {data.intro ? (
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              {data.intro}
            </p>
          ) : null}

          {/* Decorative Lines */}
          <div className="mt-12 flex justify-center gap-3">
            <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
            <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-teal-400 to-transparent opacity-80" />
            <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
          </div>
        </div>
      </section>

      {/* Section Organigramme */}
      <section className="relative py-20 md:py-28 bg-white" aria-labelledby="governance-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              id="governance-section"
              className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6"
            >
              {data.orgChart.sectionTitle}
            </h2>
            {data.orgChart.sectionIntro ? (
              <p className="text-base text-slate-600 leading-relaxed">
                {data.orgChart.sectionIntro}
              </p>
            ) : null}
          </div>

          <GovernanceChartPremium
            topPerson={data.orgChart.topPerson}
            coFounders={data.orgChart.coFounders}
            associateResearchers={data.orgChart.associateResearchers}
          />
        </div>
      </section>

      {/* Section Membres */}
      <section className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <MembersGrid
            title={data.members.sectionTitle}
            intro={data.members.sectionIntro}
            members={data.members.people}
          />
        </div>
      </section>
    </main>
  );
}
