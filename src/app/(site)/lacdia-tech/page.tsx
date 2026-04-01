import type { Metadata } from "next";
import Link from "next/link";

import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { services, servicePoles, techDepartmentInfo } from "@/data/services";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "LaCDIA Tech - Département Technologique et Innovation",
    description:
      "Transformez votre recherche en solutions concrètes. Découvrez nos services de développement, conseil et formation en IA pour institutions et entreprises.",
    path: localizedPath("/lacdia-tech", locale),
    alternates: {
      fr: localizedPath("/lacdia-tech", "fr"),
      en: localizedPath("/lacdia-tech", "en"),
    },
  });
}

export default async function LaCDIATechPage() {
  const locale = await getServerLocale();

  // Group services by pole
  const servicesByPole = services.reduce(
    (acc, service) => {
      if (!acc[service.pole]) {
        acc[service.pole] = [];
      }
      acc[service.pole].push(service);
      return acc;
    },
    {} as Record<string, typeof services>,
  );

  const pipelineSteps = [
    {
      phase: 1,
      name: "Recherche",
      inputs: ["Production scientifique", "Prototypes de laboratoire"],
      outputs: ["Publications", "POC validés"],
      description: "Exploration et validation scientifique des concepts",
    },
    {
      phase: 2,
      name: "Maturation",
      inputs: ["Validation technique", "Études de marché"],
      outputs: ["Prototype avancé", "Business plan"],
      description: "Raffinement et faisabilité commerciale",
    },
    {
      phase: 3,
      name: "Développement",
      inputs: ["Ingénierie logicielle", "Tests rigoureux"],
      outputs: ["MVP", "Documentation complète"],
      description: "Implémentation production-ready",
    },
    {
      phase: 4,
      name: "Déploiement",
      inputs: ["Mise en production", "Support utilisateur"],
      outputs: ["Solution opérationnelle", "Revenu généré"],
      description: "Adoption et impact à grande échelle",
    },
  ];

  const useCases = [
    {
      sector: "Agriculture",
      title: "Système de Détection de Maladies des Cultures par IA",
      description:
        "Solution de vision par ordinateur et analyse d'images pour identifier et prédire les maladies des cultures en temps réel, permettant aux agriculteurs des Caraïbes d'intervenir avant les pertes massives.",
      impacts: [
        "Réduction des pertes agricoles de 35-40%",
        "Rendement optimisé grâce à détection précoce",
        "Accessibilité via application mobile hors ligne",
      ],
    },
    {
      sector: "Santé",
      title: "Assistant de Structuration de Comptes Rendus Médicaux",
      description:
        "Chatbot NLP pour assister les professionnels de santé dans la création de comptes rendus structurés conformes aux standards internationaux, en français et en créole haïtien.",
      impacts: [
        "Gain de temps de 40% sur rédaction de rapports",
        "Conformité aux standards médicaux",
        "Documentation de qualité pour audit et recherche",
      ],
    },
    {
      sector: "Services Publics",
      title: "Plateforme e-Gouvernement avec Automatisation Documentaire",
      description:
        "Plateforme SaaS intégrant traitement automatique de documents administratifs, validation d'identité, et workflow de dossiers pour gouvernements caribéens modernisant leurs services.",
      impacts: [
        "Réduction du temps de traitement administratif de 60%",
        "Accès citoyen amélioré et plus transparent",
        "Réduction des coûts opérationnels",
      ],
    },
    {
      sector: "Finance",
      title: "Système de Détection de Fraudes pour Institutions Financières",
      description:
        "Système de machine learning pour analyse en temps réel des transactions financières, identification de patterns frauduleux et alertes intelligentes pour équipes de conformité.",
      impacts: [
        "Détection de fraudes avec 94% de précision",
        "Réduction des pertes fraudes de 55%",
        "Conformité accrue aux standards FATF/AML",
      ],
    },
  ];

  const clientCategories = [
    {
      title: "Institutions Publiques",
      description: "Ministères, collectivités, administrations en transformation numérique",
      icon: "landmark",
    },
    {
      title: "Secteur Privé",
      description: "Banques, agriculture, télécoms, grande distribution",
      icon: "briefcase",
    },
    {
      title: "Organisations Internationales",
      description: "BID, PNUD, FAO, OMS, bailleurs de fonds",
      icon: "globe",
    },
    {
      title: "Monde Académique",
      description: "Universités, centres de recherche, écoles d'ingénieurs",
      icon: "book",
    },
  ];

  const engagementModels = [
    {
      model: "Forfait Projet",
      description: "Scope et budget défini, timeline fixe pour projet clairement délimité",
      ideal: "Projets bien spécifiés avec livrables clairs",
      icon: "package",
    },
    {
      model: "Régie",
      description: "Facturation au temps et matériaux, flexibilité maximale sur scope",
      ideal: "Projets exploratoires ou en évolution",
      icon: "calendar",
    },
    {
      model: "Abonnement",
      description: "Support SaaS et maintenance mensuelle incluse pour solutions existantes",
      ideal: "Solutions cloud à long terme avec support",
      icon: "repeat",
    },
    {
      model: "Licence",
      description: "Modules réutilisables et solutions packagées avec droits d'exploitation",
      ideal: "Solutions à déployer dans plusieurs contextes",
      icon: "key",
    },
  ];

  return (
    <main className="bg-white">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{
        background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(15, 23, 42) 100%)',
      }}>
        {/* Gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
          <div
            className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 mb-6" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
          }}>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
              LaCDIA Tech
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            {techDepartmentInfo.mission.split(' ')[0]}
          </h1>
          <p className="mt-4 text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Département Technologique et Innovation
          </p>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed">
            Transformer la recherche en solutions concrètes pour les institutions et les entreprises
          </p>
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            LaCDIA Tech opère à l'interface entre la recherche académique de classe mondiale et les besoins réels du marché, convertissant la découverte scientifique en applications à fort impact économique et social.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#services"
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.3)',
              }}
            >
              Découvrir nos services
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <a
              href="#contact"
              className="rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              Demander un devis
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: MISSION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Notre Mission
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              LaCDIA Tech transfère les connaissances scientifiques vers le monde socio-économique tout en générant les revenus qui soutiennent la recherche fondamentale. Nous positionnons l'organisation à l'interface entre la recherche académique et les besoins du marché.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Transfert Technologique",
                description:
                  "Conversion systématique de découvertes scientifiques en solutions commercialisables et déployables à grande échelle",
              },
              {
                title: "Création de Valeur Économique",
                description:
                  "Génération de revenus durables qui financent la recherche fondamentale et soutiennent l'écosystème d'innovation",
              },
              {
                title: "Impact Socio-Économique",
                description:
                  "Résolution des défis pressants des institutions et entreprises caribéennes par des solutions technologiques de pointe",
              },
            ].map((prop, idx) => (
              <article
                key={idx}
                className="group relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-2 hover:shadow-xl"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(226, 232, 240, 1)',
                }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <span className="text-2xl font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{prop.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{prop.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PIPELINE */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Pipeline Recherche → Produit
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Un processus structuré transformant la découverte scientifique en solutions opérationnelles et à fort impact
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Card */}
                <div
                  className="rounded-2xl border p-6 h-full transition-all hover:-translate-y-2 hover:shadow-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    borderColor: 'rgba(226, 232, 240, 1)',
                  }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />

                  {/* Phase number */}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                    <span className="text-lg font-bold">{step.phase}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{step.description}</p>

                  {/* Inputs */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                      Entrées
                    </p>
                    <ul className="space-y-1">
                      {step.inputs.map((input, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-cyan-500 font-bold mt-0.5">▸</span>
                          {input}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outputs */}
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                      Résultats
                    </p>
                    <ul className="space-y-1">
                      {step.outputs.map((output, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-teal-500 font-bold mt-0.5">▸</span>
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow connector (not on last) */}
                {idx < pipelineSteps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: POLES D'EXPERTISE */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Nos Pôles d'Expertise
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Trois pôles de compétences complémentaires couvrant toute la chaîne de valeur de l'innovation technologique
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {servicePoles.map((pole) => {
              const serviceCount = servicesByPole[pole.id]?.length || 0;
              const iconMap: Record<string, string> = {
                code: "💻",
                briefcase: "💼",
                "graduation-cap": "🎓",
              };
              return (
                <article
                  key={pole.id}
                  className="group relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-2 hover:shadow-lg"
                  style={{
                    backgroundColor: 'rgba(248, 250, 252, 0.8)',
                    borderColor: 'rgba(226, 232, 240, 1)',
                  }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />

                  <div className="text-4xl mb-4">{iconMap[pole.icon] || "🔧"}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{pole.name}</h3>
                  <p className="text-base text-slate-600 leading-relaxed mb-4">{pole.description}</p>
                  <div className="pt-4 border-t border-slate-200">
                    <span className="inline-block rounded-full bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-700">
                      {serviceCount} service{serviceCount > 1 ? "s" : ""}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: CATALOGUE DE SERVICES */}
      <section id="services" className="py-20 md:py-28 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Catalogue de Services
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Une gamme complète de services regroupés par pôle d'expertise pour couvrir tous les besoins de transformation numérique et technologique
            </p>
          </div>

          {/* Services grouped by pole */}
          {servicePoles.map((pole) => (
            <div key={pole.id} className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b-2" style={{
                borderBottomColor: 'rgba(6, 182, 212, 0.2)',
              }}>
                {pole.name}
              </h3>

              <div className="grid gap-8 md:grid-cols-2">
                {(servicesByPole[pole.id] || []).map((service, idx) => (
                  <article
                    key={service.id}
                    className="group relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-2 hover:shadow-lg"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      borderColor: 'rgba(226, 232, 240, 1)',
                      animationDelay: `${idx * 100}ms`,
                    }}
                  >
                    <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />

                    {/* Pole badge */}
                    <span className="inline-block rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4" style={{
                      borderColor: 'rgba(6, 182, 212, 0.3)',
                      backgroundColor: 'rgba(6, 182, 212, 0.05)',
                      color: 'rgb(6, 100, 150)',
                    }}>
                      {pole.name}
                    </span>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
                      {service.title}
                    </h4>

                    {/* Summary */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {service.summary}
                    </p>

                    {/* Deliverables */}
                    <div className="mb-4 pb-4 border-b border-slate-200">
                      <p className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                        Livrables clés
                      </p>
                      <ul className="space-y-1">
                        {service.deliverables.slice(0, 3).map((deliverable, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-teal-500 font-bold mt-0.5">▪</span>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Target audience tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.targetAudience.slice(0, 2).map((audience, i) => (
                        <span
                          key={i}
                          className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: 'rgba(206, 250, 254, 0.4)',
                            color: 'rgb(6, 100, 150)',
                          }}
                        >
                          {audience}
                        </span>
                      ))}
                    </div>

                    {/* Learn more link */}
                    <button className="mt-4 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors group-hover:underline">
                      En savoir plus →
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CAS D'USAGE CONCRETS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Cas d'Usage Concrets
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Découvrez comment nos solutions créent un impact tangible dans divers secteurs d'activité
            </p>
          </div>

          <div className="grid gap-8">
            {useCases.map((useCase, idx) => (
              <article
                key={idx}
                className="group relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-2 hover:shadow-lg"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(226, 232, 240, 1)',
                }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <span className="inline-block rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-4" style={{
                      borderColor: 'rgba(13, 148, 136, 0.3)',
                      backgroundColor: 'rgba(13, 148, 136, 0.05)',
                    }}>
                      {useCase.sector}
                    </span>

                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {useCase.title}
                    </h3>

                    <p className="text-base text-slate-600 leading-relaxed mb-6">
                      {useCase.description}
                    </p>

                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                        Impacts clés
                      </p>
                      <ul className="space-y-2">
                        {useCase.impacts.map((impact, i) => (
                          <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-cyan-500 font-bold mt-0.5">✓</span>
                            {impact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CLIENTS ET PARTENAIRES */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Clients et Partenaires Cibles
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Nous servons les acteurs majeurs des transformations numériques caribéennes et régionales
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {clientCategories.map((category, idx) => (
              <article
                key={idx}
                className="group relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-2 hover:shadow-lg text-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  borderColor: 'rgba(226, 232, 240, 1)',
                }}
              >
                <div className="absolute left-0 right-0 top-0 h-0.5 bg-linear-to-r from-teal-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="text-3xl mb-4">
                  {category.icon === "landmark" && "🏛️"}
                  {category.icon === "briefcase" && "💼"}
                  {category.icon === "globe" && "🌍"}
                  {category.icon === "book" && "📚"}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{category.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: MODELES DE COLLABORATION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Modèles de Collaboration
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Nous nous adaptons à votre contexte avec des formats d'engagement flexibles et adaptés à vos besoins
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((model, idx) => (
              <article
                key={idx}
                className="group relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-2 hover:shadow-lg"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(226, 232, 240, 1)',
                }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />

                <div className="text-3xl mb-4">
                  {model.icon === "package" && "📦"}
                  {model.icon === "calendar" && "📅"}
                  {model.icon === "repeat" && "🔄"}
                  {model.icon === "key" && "🔑"}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3">{model.model}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {model.description}
                </p>
                <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Idéal pour: {model.ideal}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section id="contact" className="relative overflow-hidden py-20 md:py-28" style={{
        background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(15, 23, 42) 100%)',
      }}>
        {/* Gradient mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
          <div
            className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Prêt à transformer vos données en solutions ?
          </h2>
          <p className="text-lg text-slate-200 mb-8 leading-relaxed max-w-2xl mx-auto">
            Contactez-nous pour discuter comment LaCDIA Tech peut transformer votre organisation à travers l'innovation technologique et la science des données.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.3)',
              }}
            >
              Voir nos solutions
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="mailto:tech@lacdia.com"
              className="rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
