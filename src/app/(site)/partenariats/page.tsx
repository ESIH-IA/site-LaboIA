import type { Metadata } from "next";
import Link from "next/link";

import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "Partenariats",
    description:
      "Découvrez le réseau de collaborations de LaCDIA : partenaires nationaux, régionaux et internationaux pour la recherche et l'innovation en intelligence artificielle.",
    path: localizedPath("/partenariats", locale),
    alternates: {
      fr: localizedPath("/partenariats", "fr"),
      en: localizedPath("/partenariats", "en"),
    },
  });
}

export default async function PartenariatsPage() {
  const locale = await getServerLocale();

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
              Partenariats
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Un réseau de collaborations au service de la recherche et de l'innovation
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed">
            LaCDIA s'inscrit dans une stratégie de partenariats triple : national, régional et international.
          </p>
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            Ces collaborations créent un écosystème dynamique favorisant l'échange de savoirs, la mobilité académique et la création de solutions d'IA au service des défis haïtiens et caribéens.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={localizedPath("/collaborer", locale)}
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
            >
              Devenir partenaire
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
              href={localizedPath("/contact", locale)}
              className="rounded-xl glass-card px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Contacter le laboratoire
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Partenariale */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Stratégie de partenariats inclusifs
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              LaCDIA adopte une vision ouverte et inclusive des partenariats, basée sur la complémentarité des forces, l'échange mutuel et la création de valeur partagée.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Cercle National",
                description: "Institutions académiques, publiques et privées haïtiennes partenaires de la recherche et de l'innovation technologique.",
                icon: "🇭🇹",
              },
              {
                title: "Cercle Caribéen",
                description: "Universités et institutions des Caraïbes francophone, hispanophone et anglophone pour une vision régionale.",
                icon: "🏝️",
              },
              {
                title: "Cercle International",
                description: "Universités européennes, nord-américaines et organismes mondiaux favorisant une présence scientifique globale.",
                icon: "🌍",
              },
            ].map((circle, idx) => (
              <article
                key={`${circle.title}-${idx}`}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                <div className="mb-4 text-4xl">{circle.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{circle.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{circle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires Nationaux */}
      <section className="py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Partenaires Nationaux (Haïti)
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Au cœur du système d'innovation haïtien, LaCDIA collaborate avec des institutions académiques, publiques et privées pour renforcer l'écosystème local.
            </p>
          </div>

          {/* Institutions Académiques */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 font-semibold">
                📚
              </span>
              Institutions Académiques
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "ESIH",
                  detail: "Rattachement institutionnel",
                  desc: "École Supérieure d'Informatique d'Haïti - héberge LaCDIA",
                },
                {
                  name: "Université d'État d'Haïti",
                  detail: "Recherche conjointe",
                  desc: "Collaboration académique et projets de recherche multidisciplinaires",
                },
                {
                  name: "Université Quisqueya",
                  detail: "Mobilités académiques",
                  desc: "Échange d'étudiants et doctorants, formations conjointes",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700 mb-3">
                    {partner.detail}
                  </p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Institutions Publiques */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700 font-semibold">
                🏛️
              </span>
              Institutions Publiques
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Ministère de l'Éducation",
                  detail: "Politiques numériques",
                  desc: "Conseil et accompagnement pour l'intégration de l'IA dans l'éducation haïtienne",
                },
                {
                  name: "Ministère de la Santé (MSPP)",
                  detail: "Santé numérique",
                  desc: "Projets de diagnostic assisté et systèmes d'information sanitaire",
                },
                {
                  name: "Ministère de l'Agriculture",
                  detail: "Agriculture intelligente",
                  desc: "Solutions IA pour la productivité agricole et la résilience climatique",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-indigo-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3">
                    {partner.detail}
                  </p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secteur Privé */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-semibold">
                💼
              </span>
              Secteur Privé
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Entreprises Technologiques",
                  detail: "Transfert technologique",
                  desc: "Collaborations pour l'innovation et le déploiement de solutions IA",
                },
                {
                  name: "Secteur Bancaire",
                  detail: "Fintech et sécurité",
                  desc: "Projets autour de la fraude, du crédit scoring et de l'inclusion financière",
                },
                {
                  name: "Secteur Agroalimentaire",
                  detail: "AgriTech",
                  desc: "Solutions pour la qualité, la traçabilité et l'optimisation de la production",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-3">
                    {partner.detail}
                  </p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires Régionaux Caribéens */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Partenaires Régionaux Caribéens
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Renforcer les liens scientifiques et académiques au sein de la Caraïbe pour créer un espace d'innovation régional.
            </p>
          </div>

          {/* Caraïbe Francophone */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-cyan-700">
              Caraïbe Francophone
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  name: "Université des Antilles",
                  location: "Martinique, Guadeloupe",
                  desc: "Formation doctorale, recherche conjointe et mobilités étudiantes",
                },
                {
                  name: "Université de Guyane",
                  location: "Guyane française",
                  desc: "Collaborations en biodiversité numérique et écosystèmes amazo­niens",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{partner.name}</h4>
                  <p className="text-sm font-semibold text-cyan-700 mb-3">{partner.location}</p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Caraïbe Hispanophone */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-teal-700">
              Caraïbe Hispanophone
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  name: "Universidad Autónoma de Santo Domingo",
                  location: "République Dominicaine",
                  desc: "Projets de recherche multidisciplinaires et échanges académiques",
                },
                {
                  name: "Universidad de Puerto Rico",
                  location: "Porto Rico",
                  desc: "Collaboration en informatique et transformation numérique caribéenne",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{partner.name}</h4>
                  <p className="text-sm font-semibold text-teal-700 mb-3">{partner.location}</p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Caraïbe Anglophone */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-indigo-700">
              Caraïbe Anglophone
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  name: "University of the West Indies",
                  location: "Jamaïque, Trinité-et-Tobago, Barbade",
                  desc: "Réseau académique majeur pour l'IA et la transformation numérique régionale",
                },
                {
                  name: "Caribbean Programmes",
                  location: "Caraïbe anglophone",
                  desc: "Partenariats en développement durable et innovation technologique",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{partner.name}</h4>
                  <p className="text-sm font-semibold text-indigo-700 mb-3">{partner.location}</p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires Internationaux */}
      <section className="py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Partenaires Internationaux
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Une présence scientifique globale via des collaborations avec des universités de prestige et des organismes internationaux.
            </p>
          </div>

          {/* Europe */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 font-semibold">
                🇪🇺
              </span>
              Europe
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Université Côte d'Azur",
                  detail: "Nice, France",
                  desc: "Via Pr. Miranda - recherche en IA et partenariat académique fort",
                },
                {
                  name: "ESTIA",
                  detail: "France",
                  desc: "Formation d'ingénieurs et innovation technologique",
                },
                {
                  name: "Réseau AUF",
                  detail: "Agence Universitaire de la Francophonie",
                  desc: "Mobilités académiques, financements et projets francophones",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700 mb-3">
                    {partner.detail}
                  </p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Amérique du Nord */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700 font-semibold">
                🇨🇦
              </span>
              Amérique du Nord
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Universités Québécoises",
                  detail: "Québec, Canada",
                  desc: "Échanges d'étudiants, cotutelles de thèse et recherche conjointe",
                },
                {
                  name: "Universités Ontariennes",
                  detail: "Ontario, Canada",
                  desc: "Programmes de mobilité et collaborations en informatique",
                },
                {
                  name: "Universités Américaines",
                  detail: "États-Unis",
                  desc: "Partenariats académiques et échanges scientifiques",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-indigo-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3">
                    {partner.detail}
                  </p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Organismes Internationaux */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-semibold">
                🌐
              </span>
              Organismes Internationaux
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "AUF",
                  detail: "Agence Universitaire de la Francophonie",
                  desc: "Accès aux programmes de mobilité et financements pour la recherche",
                },
                {
                  name: "Campus France",
                  detail: "France",
                  desc: "Facilitation des mobilités académiques et échanges franco-haïtiens",
                },
                {
                  name: "ERASMUS+",
                  detail: "Programme Européen",
                  desc: "Bourse pour mobilités d'études et de formation en Europe",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-3">
                    {partner.detail}
                  </p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires Industriels et Institutionnels */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Partenaires Industriels et Institutionnels Mondiaux
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Des collaborations avec les leaders mondiaux pour apporter technologies et expertise au service de l'innovation.
            </p>
          </div>

          {/* Tech Companies */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Géants Technologiques</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Microsoft",
                  detail: "Academic Programs",
                  desc: "Accès à Azure, formations en cloud computing et IA",
                },
                {
                  name: "Google",
                  detail: "Edu & Research",
                  desc: "Outils cloud, formations en machine learning et développement",
                },
                {
                  name: "IBM",
                  detail: "Academic Partnerships",
                  desc: "Technologie Watson, certification et programmes éducatifs",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700 mb-3">
                    {partner.detail}
                  </p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* International Organizations */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Organismes Internationaux</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "BID",
                  detail: "Banque Inter-Américaine de Développement",
                  desc: "Financements et expertise pour projets de développement technologique",
                },
                {
                  name: "Banque Mondiale",
                  detail: "World Bank",
                  desc: "Projets de résilience et adaptation climatique via l'IA",
                },
                {
                  name: "PNUD",
                  detail: "Programme des Nations Unies pour le Développement",
                  desc: "Alignement avec ODD et projets de développement durable",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-indigo-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3">
                    {partner.detail}
                  </p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Agencies */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Organismes Spécialisés</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "FAO",
                  detail: "Organisation des Nations Unies pour l'Alimentation",
                  desc: "Solutions IA pour l'agriculture durable et sécurité alimentaire",
                },
                {
                  name: "OMS",
                  detail: "Organisation Mondiale de la Santé",
                  desc: "Projets de diagnostic assisté et systèmes de santé numériques",
                },
                {
                  name: "ONG Haïtiennes",
                  detail: "Secteur Humanitaire",
                  desc: "Collaborations pour impact social et développement communautaire",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-3">
                    {partner.detail}
                  </p>
                  <p className="text-sm text-slate-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modalités de Collaboration */}
      <section className="py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Modalités de Collaboration
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              LaCDIA offre diverses formes de collaborations adaptées aux besoins et ambitions de ses partenaires.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Projets de Recherche Conjoints",
                icon: "🔬",
                description: "Développement collaboratif de projets de recherche multidisciplinaires avec publication conjointe.",
              },
              {
                title: "Cotutelles de Thèse",
                icon: "🎓",
                description: "Encadrement conjoint de doctorants par plusieurs universités pour une formation enrichie.",
              },
              {
                title: "Mobilités de Chercheurs",
                icon: "✈️",
                description: "Échanges temporaires de chercheurs et enseignants pour collaborations intensives.",
              },
              {
                title: "Formations Conjointes",
                icon: "📖",
                description: "Programmes d'enseignement communs, séminaires et ateliers thématiques.",
              },
              {
                title: "Prestations et Conseil",
                icon: "💡",
                description: "Via LaCDIA Tech - Services de consultation et développement technologique pour partenaires.",
              },
              {
                title: "Événements Scientifiques",
                icon: "🎤",
                description: "Conférences, workshops et séminaires co-organisés avec partenaires académiques.",
              },
            ].map((modality, idx) => (
              <article
                key={`${modality.title}-${idx}`}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                <div className="mb-4 text-4xl">{modality.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{modality.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{modality.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ODD - Sustainable Development Goals */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Alignement avec les Objectifs de Développement Durable (ODD)
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Les partenariats de LaCDIA s'inscrivent dans une vision d'impact social et environnemental, alignée avec l'agenda 2030 des Nations Unies.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            {[
              {
                odd: "ODD 2",
                title: "Faim Zéro",
                description: "Agriculture intelligente et systèmes de production durables",
                color: "from-amber-500 to-orange-500",
              },
              {
                odd: "ODD 3",
                title: "Santé et Bien-être",
                description: "Diagnostic médical assisté par IA et systèmes informatiques de santé",
                color: "from-red-500 to-pink-500",
              },
              {
                odd: "ODD 4",
                title: "Éducation de Qualité",
                description: "Formation doctorale de haut niveau et programmes éducatifs innovants",
                color: "from-blue-500 to-cyan-500",
              },
              {
                odd: "ODD 9",
                title: "Innovation",
                description: "Infrastructures numériques résilientes et innovation technologique",
                color: "from-yellow-500 to-amber-500",
              },
              {
                odd: "ODD 13",
                title: "Action Climatique",
                description: "Solutions IA pour adaptation et atténuation du changement climatique",
                color: "from-green-500 to-emerald-500",
              },
            ].map((odd, idx) => (
              <article
                key={`${odd.odd}-${idx}`}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl`}
                style={{
                  animationDelay: `${idx * 50}ms`,
                  background: `linear-gradient(135deg, ${
                    odd.color === "from-amber-500 to-orange-500"
                      ? "rgb(217, 119, 6) 0%, rgb(234, 88, 12) 100%"
                      : odd.color === "from-red-500 to-pink-500"
                        ? "rgb(239, 68, 68) 0%, rgb(236, 72, 153) 100%"
                        : odd.color === "from-blue-500 to-cyan-500"
                          ? "rgb(59, 130, 246) 0%, rgb(6, 182, 212) 100%"
                          : odd.color === "from-yellow-500 to-amber-500"
                            ? "rgb(234, 179, 8) 0%, rgb(217, 119, 6) 100%"
                            : "rgb(34, 197, 94) 0%, rgb(5, 150, 105) 100%"
                  })`,
                }}
              >
                <div className="relative">
                  <p className="text-sm font-bold text-white/90 mb-2">{odd.odd}</p>
                  <h3 className="text-lg font-bold text-white mb-2">{odd.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{odd.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 gradient-mesh-bg opacity-60" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-glow" />
        <div
          className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl animate-glow"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Rejoignez Notre Écosystème de Collaboration
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg md:text-xl text-slate-100 leading-relaxed mb-8">
            Que vous soyez une institution académique, une organisation publique ou une entreprise privée, LaCDIA vous invite à explorer des opportunités de collaboration.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={localizedPath("/collaborer", locale)}
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
            >
              Devenir Partenaire
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
              href={localizedPath("/contact", locale)}
              className="rounded-xl glass-card px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Contacter le Laboratoire
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
