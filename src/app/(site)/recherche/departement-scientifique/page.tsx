import type { Metadata } from "next";
import Link from "next/link";

import { researchAxes } from "@/data/research-axes";
import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "Département Scientifique - LaCDIA",
    description:
      "Découvrez le département scientifique de LaCDIA, ses axes de recherche en intelligence artificielle, ses méthodologies et ses objectifs scientifiques pour la région caribéenne.",
    path: localizedPath("/recherche/departement-scientifique", locale),
    alternates: {
      fr: localizedPath("/recherche/departement-scientifique", "fr"),
      en: localizedPath("/recherche/departement-scientifique", "en"),
    },
  });
}

export default async function DepartementScientifiquePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-mesh-bg py-20 md:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow" />
        <div
          className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-glow"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
              Département Scientifique
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Recherche en Intelligence Artificielle et Science des Données
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed">
            Produire des connaissances scientifiques originales et adaptées aux contextes caribéens
          </p>
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            Le département scientifique structure et anime les activités de recherche du laboratoire, en propulsant l'excellence scientifique et l'innovation méthodologique.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/recherche/projets"
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
            >
              Nos projets de recherche
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
              href="#axes"
              className="rounded-xl glass-card px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Explorer les axes
            </a>
          </div>
        </div>
      </section>

      {/* Section Rôle et Objectifs */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Rôle et Objectifs
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Le département scientifique structure et anime les activités de recherche du laboratoire. Son rôle est de coordonner les efforts de recherche, de garantir l'excellence scientifique et de promouvoir l'innovation méthodologique dans les domaines de l'intelligence artificielle et de la science des données.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Produire des connaissances scientifiques",
                description:
                  "Générer des savoirs originaux dans les domaines de l'IA, du machine learning et de l'analyse de données, avec une perspective adaptée aux contextes caribéens.",
              },
              {
                title: "Développer des méthodes adaptées",
                description:
                  "Concevoir et valider des approches méthodologiques robustes pour les contextes à ressources limitées et les environnements tropicaux.",
              },
              {
                title: "Former des chercheurs de haut niveau",
                description:
                  "Encadrer des doctorants et des jeunes chercheurs, en développant les compétences scientifiques et les capacités de recherche de la prochaine génération.",
              },
              {
                title: "Contribuer au débat scientifique international",
                description:
                  "Publier dans les plus prestigieuses revues et conférences, en propulsant la visibilité de la recherche caribéenne sur la scène mondiale.",
              },
            ].map((objective, idx) => (
              <article
                key={`${objective.title}-${idx}`}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <span className="text-2xl font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {objective.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {objective.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Axes de Recherche */}
      <section id="axes" className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Axes de Recherche
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Nos six axes de recherche structurent l'ensemble des activités scientifiques du laboratoire, en couvrant les domaines fondamentaux et appliqués de l'intelligence artificielle et de la science des données.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {researchAxes.map((axis, idx) => (
              <article
                key={axis.id}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />

                {/* Header with number and title */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                      <span className="text-lg font-bold">{axis.number}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:gradient-text-cyan transition-smooth">
                    {axis.title}
                  </h3>
                </div>

                {/* Problematic */}
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {axis.problematic}
                </p>

                {/* Objectives */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3">
                    Objectifs clés
                  </p>
                  <ul className="space-y-2">
                    {axis.objectives.slice(0, 3).map((objective) => (
                      <li key={objective} className="flex items-start gap-2">
                        <div className="mt-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                        </div>
                        <span className="text-sm text-slate-600">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2">
                  {axis.keywords.slice(0, 4).map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-block rounded-full border border-cyan-200 bg-cyan-50/50 px-3 py-1 text-xs font-semibold text-cyan-700"
                    >
                      {keyword}
                    </span>
                  ))}
                  {axis.keywords.length > 4 && (
                    <span className="inline-block rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                      +{axis.keywords.length - 4}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Approches Méthodologiques */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Approches Méthodologiques
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Nos approches combinent les meilleures pratiques scientifiques avec une adaptation aux contextes spécifiques de la région caribéenne.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Apprentissage Profond et Optimisation",
                description:
                  "Développement d'architectures de réseaux de neurones profonds et d'algorithmes d'optimisation robustes pour les contextes de ressources limitées.",
              },
              {
                title: "Vision par Ordinateur et Analyse Multimodale",
                description:
                  "Traitement et interprétation automatique des données visuelles issues d'images, de documents et de sources multimodales dans les domaines agricole et médical.",
              },
              {
                title: "IA Explicable et Audit Algorithmique",
                description:
                  "Conception de systèmes d'IA transparents, équitables et responsables avec des mécanismes de traçabilité et d'accountability.",
              },
              {
                title: "Traitement du Langage Naturel",
                description:
                  "Traitement spécialisé du créole haïtien et des langues caribéennes avec adaptation aux spécificités linguistiques et culturelles régionales.",
              },
              {
                title: "Analyse de Données en Contexte de Rareté",
                description:
                  "Développement de techniques efficaces fonctionnant avec peu de données, sources hétérogènes et bruitées, typiques des contextes en développement.",
              },
              {
                title: "Transfert et Adaptation de Domaine",
                description:
                  "Exploitation des connaissances acquises dans des contextes riches pour résoudre des problèmes dans des contextes différents et contraints.",
              },
            ].map((approach, idx) => (
              <article
                key={`${approach.title}-${idx}`}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {approach.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {approach.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Domaines d'Expertise */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Domaines d'Expertise
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Nos expertise couvrent un large spectre des technologies et applications de l'intelligence artificielle.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              "Machine Learning & Deep Learning",
              "Vision par Ordinateur",
              "Traitement du Langage Naturel",
              "IA Explicable (XAI)",
              "Systèmes Multi-Agents",
              "Analyse de Données Complexes",
              "IA pour la Santé",
              "Agriculture Numérique",
              "Edge AI & Modèles Compressés",
            ].map((domain, idx) => (
              <div
                key={domain}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 px-6 py-4 text-center text-base font-medium text-slate-700 shadow-sm transition-smooth hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/10"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="absolute left-0 right-0 top-0 h-0.5 bg-linear-to-r from-teal-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
                {domain}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Politique de Publication */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Politique de Publication
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Notre stratégie de publication vise l'excellence scientifique avec une visibilité maximale sur la scène internationale.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {[
              {
                title: "Revues Scientifiques",
                description:
                  "Publications dans les revues de haut rang indexées dans Scopus et Web of Science, notamment dans les domaines du machine learning, de la vision par ordinateur et de l'IA responsable.",
              },
              {
                title: "Conférences Internationales",
                description:
                  "Communications dans les principaux forums scientifiques: NeurIPS, ICML, CVPR, IJCAI, ICCV, et autres conférences de premier rang.",
              },
              {
                title: "Open Science",
                description:
                  "Dépôt des prépublications sur arXiv pour assurer une diffusion rapide des résultats à la communauté scientifique mondiale.",
              },
              {
                title: "Partenariats Éditoriaux",
                description:
                  "Collaboration avec la Revue Infos Nations pour la vulgarisation scientifique et la dissémination auprès des décideurs régionaux.",
              },
            ].map((publication, idx) => (
              <article
                key={`${publication.title}-${idx}`}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {publication.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {publication.description}
                </p>
              </article>
            ))}
          </div>

          {/* Publication Targets Table */}
          <div className="relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8">
            <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Indicateurs de Performance Scientifique
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">
                      Indicateur
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">
                      2025
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">
                      2027
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">
                      2029
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">
                      Articles dans revues Scopus/WoS
                    </td>
                    <td className="text-center py-3 px-4 text-slate-600">12</td>
                    <td className="text-center py-3 px-4 text-slate-600">24</td>
                    <td className="text-center py-3 px-4 text-slate-600">36</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">
                      Communications en conférences de rang A
                    </td>
                    <td className="text-center py-3 px-4 text-slate-600">8</td>
                    <td className="text-center py-3 px-4 text-slate-600">16</td>
                    <td className="text-center py-3 px-4 text-slate-600">24</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">
                      Prépublications sur arXiv
                    </td>
                    <td className="text-center py-3 px-4 text-slate-600">15</td>
                    <td className="text-center py-3 px-4 text-slate-600">30</td>
                    <td className="text-center py-3 px-4 text-slate-600">45</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">
                      Brevets et propriété intellectuelle
                    </td>
                    <td className="text-center py-3 px-4 text-slate-600">2</td>
                    <td className="text-center py-3 px-4 text-slate-600">5</td>
                    <td className="text-center py-3 px-4 text-slate-600">8</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">
                      Indice H moyen du laboratoire
                    </td>
                    <td className="text-center py-3 px-4 text-slate-600">5</td>
                    <td className="text-center py-3 px-4 text-slate-600">12</td>
                    <td className="text-center py-3 px-4 text-slate-600">20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section Encadrement Doctoral */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Encadrement Doctoral
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Le laboratoire s'engage dans la formation de la prochaine génération de chercheurs à travers un accompagnement rigoureux et personnalisé.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {[
              {
                title: "Direction et Co-direction",
                description:
                  "Thèses encadrées par des chercheurs titulaires de l'Habilitation à Diriger des Recherches (HDR). Co-direction avec des partenaires internationaux pour une expertise complète.",
              },
              {
                title: "Suivi et Monitoring",
                description:
                  "Comités de suivi annuels avec experts externes, évaluations régulières et ajustements de trajectoire pour assurer la qualité des travaux.",
              },
              {
                title: "Séminaires Doctoraux",
                description:
                  "Séminaires mensuels réunissant tous les doctorants pour partager les avancées, discuter des défis méthodologiques et renforcer la cohésion du collectif.",
              },
              {
                title: "Mobilité Internationale",
                description:
                  "Séjours de recherche à l'étranger, participations à écoles doctorales internationales et présentations dans des conférences majeures.",
              },
            ].map((item, idx) => (
              <article
                key={`${item.title}-${idx}`}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10"
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          {/* Partnerships */}
          <div className="rounded-2xl gradient-card-bg border border-slate-200 p-8">
            <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Partenariats Doctoraux
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Centre du Droit de la Haïti (CDH)",
                "Cotutelles internationales",
                "Agence Universitaire de la Francophonie (AUF)",
                "Campus France",
              ].map((partner) => (
                <div key={partner} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10">
                    <span className="h-2 w-2 rounded-full bg-teal-500" />
                  </div>
                  <span className="text-base font-medium text-slate-700">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Animation Scientifique */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Animation Scientifique
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Le département organise un ensemble d'activités scientifiques régulières pour stimuler les échanges, favoriser la collaboration et maintenir une dynamique de recherche active.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Séminaires Hebdomadaires",
                description:
                  "Présentations de recherche tous les jeudis réunissant membres du laboratoire et visiteurs. Plateforme d'échange sur les avancées scientifiques et les défis méthodologiques.",
                frequency: "Toutes les semaines",
              },
              {
                title: "Journal Club Mensuel",
                description:
                  "Discussion critique des publications récentes dans les domaines clés du laboratoire. Entraînement à la revue de littérature et aux débats scientifiques.",
                frequency: "Chaque mois",
              },
              {
                title: "Hackathons Biannuels",
                description:
                  "Compétitions de coding et d'innovation scientifique. Opportunités de travail collaboratif intensif, de prototypage rapide et d'exploration de nouvelles idées.",
                frequency: "Deux fois par an",
              },
              {
                title: "Conférence Annuelle",
                description:
                  "Événement majeur rassemblant la communauté scientifique caribéenne. Keynotes de chercheurs internationaux, présentations de résultats et table ronde sur les enjeux régionaux.",
                frequency: "Une fois par an",
              },
            ].map((activity, idx) => (
              <article
                key={`${activity.title}-${idx}`}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    {activity.title}
                  </h3>
                  <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                    {activity.frequency}
                  </span>
                </div>
                <p className="text-base text-slate-600 leading-relaxed">
                  {activity.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Collaborations et Partenariats */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Collaborations et Partenariats
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Le département s'inscrit dans un réseau de collaborations nationales et internationales pour renforcer la capacité de recherche et accélérer l'innovation scientifique.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {[
              "Université Côte d'Azur (France)",
              "ESTIA - École Supérieure des Technologies Innovantes en Aquitaine",
              "Agence Universitaire de la Francophonie (AUF)",
              "Université des Antilles",
              "Université des Indes Occidentales (UWI)",
              "Réseaux de recherche internationaux",
            ].map((partner, idx) => (
              <div
                key={partner}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/10"
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="text-base font-semibold text-slate-900">{partner}</p>
              </div>
            ))}
          </div>

          <Link
            href="/collaborations"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-teal-500 to-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/40"
          >
            Explorez nos collaborations complètes
            <svg
              className="h-5 w-5"
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden gradient-mesh-bg py-20 md:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl animate-glow" />
        <div
          className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              Rejoignez nos Activités de Recherche
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-200 leading-relaxed mb-8">
              Explorez nos projets en cours, participez à notre débat scientifique et collaborez avec nos équipes.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/recherche/projets"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-white/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-white/30"
              >
                Nos projets de recherche
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
              <Link
                href="/publications"
                className="rounded-xl glass-card px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20"
              >
                Nos publications
              </Link>
              <Link
                href="/collaborer"
                className="rounded-xl glass-card px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20"
              >
                Collaborer avec nous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
