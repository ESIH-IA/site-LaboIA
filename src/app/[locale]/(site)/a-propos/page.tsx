import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "À propos - LaCDIA",
    description:
      "Découvrez le Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle, pôle de référence en IA et sciences des données dans la Caraïbe.",
    path: localizedPath("/a-propos", locale),
    alternates: {
      fr: localizedPath("/a-propos", "fr"),
      en: localizedPath("/a-propos", "en"),
    },
  });
}

export default async function AboutPage() {
  const locale = await getServerLocale();

  return (
    <main className="bg-white">
      {/* ============================================
          SECTION 1: HERO
          ============================================ */}
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
              Laboratoire de recherche
            </span>
          </div>

          {/* Titre Principal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle
          </h1>

          {/* Sous-titre */}
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed">
            Le pôle de référence en intelligence artificielle et sciences des données dans la Caraïbe,
            dédié à l'excellence scientifique, l'innovation responsable et l'impact régional.
          </p>
        </div>

        {/* Gradient fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* ============================================
          SECTION 2: IDENTITÉ INSTITUTIONNELLE
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12">
            Identité Institutionnelle
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Nom Complet */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Nom Complet
              </h3>
              <p className="text-base font-bold text-slate-900">
                Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle
              </p>
            </article>

            {/* Acronyme */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Acronyme
              </h3>
              <p className="text-base font-bold text-slate-900">LaCDIA</p>
            </article>

            {/* Affiliation */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Affiliation
              </h3>
              <p className="text-base font-bold text-slate-900">ESIH</p>
              <p className="text-xs text-slate-600 mt-1">
                École Supérieure d'Informatique d'Haïti
              </p>
            </article>

            {/* Localisation & Fondation */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Localisation
              </h3>
              <p className="text-base font-bold text-slate-900">Port-au-Prince, Haïti</p>
              <p className="text-xs text-slate-600 mt-1">Fondé en 2025</p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: VISION
          ============================================ */}
      <section className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12">
            Notre Vision
          </h2>

          {/* Vision Quote */}
          <div className="relative rounded-3xl gradient-card-bg border border-slate-200 p-12 shadow-lg mb-12">
            <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 via-teal-500 to-indigo-500" />
            <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed">
              "Devenir le pôle de référence en intelligence artificielle et sciences des données dans
              la Caraïbe"
            </blockquote>
            <p className="mt-6 text-base text-slate-600">
              Cet engagement guide notre recherche, notre formation et nos innovations au service du
              développement régional et international.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Pilier 1 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Excellence Scientifique</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Produire des connaissances originales, pertinentes et reconnues internationalement dans
                l'IA et les sciences des données.
              </p>
            </article>

            {/* Pilier 2 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pertinence Sociétale</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Répondre aux enjeux caribéens et haïtiens par des solutions responsables, inclusives et
                durables.
              </p>
            </article>

            {/* Pilier 3 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rayonnement Régional</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Établir le LaCDIA comme partenaire clé de l'écosystème d'innovation caribéen et mondial.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: MISSION
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12">
            Notre Mission
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            Nous poursuivons quatre piliers stratégiques pour réaliser notre vision :
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Pilier 1 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Produire des Connaissances</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Développer une intelligence artificielle robuste, explicable et responsable, avec des
                recherches fondamentales et appliquées de haut niveau.
              </p>
            </article>

            {/* Pilier 2 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600 font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Former la Prochaine Génération</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Développer le capital humain caribéen en formant des doctorants et ingénieurs chercheurs
                en IA et sciences des données.
              </p>
            </article>

            {/* Pilier 3 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Transférer les Innovations</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Diffuser nos résultats de recherche via LaCDIA Tech, transformant les innovations en
                solutions concrètes et impacts économiques mesurables.
              </p>
            </article>

            {/* Pilier 4 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Débat Scientifique International</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Contribuer au débat scientifique mondial tout en répondant aux besoins spécifiques de la
                Caraïbe et du contexte socio-économique régional.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: VALEURS
          ============================================ */}
      <section className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12">
            Nos Valeurs
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Valeur 1 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                <span className="text-lg">✨</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Excellence Scientifique</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rigueur, qualité et reconnaissance internationale de nos travaux.
              </p>
            </article>

            {/* Valeur 2 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <span className="text-lg">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Innovation Responsable</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Éthique, impact social mesurable et durabilité.
              </p>
            </article>

            {/* Valeur 3 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <span className="text-lg">🌈</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Inclusivité</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Accès équitable à la formation et l'innovation pour tous.
              </p>
            </article>

            {/* Valeur 4 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                <span className="text-lg">🔗</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Interdisciplinarité</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Collaboration entre disciplines et expertise.
              </p>
            </article>

            {/* Valeur 5 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <span className="text-lg">🌐</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ouverture</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Partenariats régionaux et internationaux.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: POSITIONNEMENT STRATÉGIQUE
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12">
            Positionnement Stratégique
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            Le LaCDIA s'inscrit dans une triple articulation : académique international, régional caribéen,
            et socio-économique local.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Pilier Académique */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Académique International</h3>
              <ul className="space-y-2 text-base text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                  <span>Partenariats avec universités mondiales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                  <span>Publications dans journaux et conférences de prestige</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                  <span>Mobilité de chercheurs et doctorants</span>
                </li>
              </ul>
            </article>

            {/* Pilier Régional */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <span className="text-2xl">🌴</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Régional Caribéen</h3>
              <ul className="space-y-2 text-base text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                  <span>Hub IA et data science pour la Caraïbe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                  <span>Formation de talents caribéens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                  <span>Collaboration avec institutions régionales</span>
                </li>
              </ul>
            </article>

            {/* Pilier Socio-économique */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Socio-économique Local</h3>
              <ul className="space-y-2 text-base text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span>Solutions IA adaptées à Haïti et la Caraïbe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span>Création de valeur économique et emplois</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span>Impact sur développement durable</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7: CONTEXTE ET ENJEUX
          ============================================ */}
      <section className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-8">
            Contexte et Enjeux
          </h2>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Haïti et la Caraïbe font face à une transformation numérique accélérée. Alors que
                l'intelligence artificielle devient un moteur stratégique de développement économique et
                social, la région souffre d'un déficit majeur : <strong>l'absence de capacités endogènes
                de recherche en IA</strong>.
              </p>

              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Le LaCDIA est le <strong>premier laboratoire de recherche en IA d'Haïti</strong>. Cette
                première permet à notre pays de contribuer au débat scientifique international, tout en
                développant des solutions adaptées aux réalités caribéennes : agriculture, santé, éducation,
                gouvernance.
              </p>

              <p className="text-lg text-slate-600 leading-relaxed">
                En bridging le gap académique tout en créant une filière IA locale, le LaCDIA catalyse
                une transformation que les écosystèmes régionaux réclament depuis des années.
              </p>
            </div>

            <div className="relative rounded-3xl gradient-card-bg border border-slate-200 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.08),transparent_55%)]" />
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />

              <div className="relative space-y-8">
                {/* Stat 1 */}
                <div>
                  <p className="text-4xl font-bold text-cyan-600 mb-2">1er</p>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                    Laboratoire en IA en Haïti
                  </p>
                </div>

                {/* Stat 2 */}
                <div>
                  <p className="text-4xl font-bold text-teal-600 mb-2">6</p>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                    Axes de recherche stratégiques
                  </p>
                </div>

                {/* Stat 3 */}
                <div>
                  <p className="text-4xl font-bold text-indigo-600 mb-2">∞</p>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                    Potentiel d'impact régional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 8: PLAN DE DÉVELOPPEMENT 2025-2029
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12">
            Plan de Développement 2025-2029
          </h2>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {/* Phase 1 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 font-bold">
                I
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2025 — Fondation</h3>
              <p className="text-sm text-slate-600 mb-4">Consolidation des fondations institutionnelles</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span>Équipe de 5-7 chercheurs permanents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span>Infrastructure technique et administrative</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span>Lancement LaCDIA Tech</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span>Premiers projets de recherche</span>
                </li>
              </ul>
            </article>

            {/* Phase 2 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 font-bold">
                II
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2026-2027 — Consolidation</h3>
              <p className="text-sm text-slate-600 mb-4">Renforcement des capacités et visibilité</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">•</span>
                  <span>Équipe de 8-10 chercheurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">•</span>
                  <span>Publications internationales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">•</span>
                  <span>Premiers doctorants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">•</span>
                  <span>Croissance LaCDIA Tech</span>
                </li>
              </ul>
            </article>

            {/* Phase 3 */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
                III
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2028-2029 — Rayonnement</h3>
              <p className="text-sm text-slate-600 mb-4">Reconnaissance et impact régional</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>Équipe de 12+ chercheurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>Reconnaissance internationale établie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>Pipeline doctorants stable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>LaCDIA Tech leader régional</span>
                </li>
              </ul>
            </article>
          </div>

          {/* Key Indicators Table */}
          <div className="relative rounded-2xl gradient-card-bg border border-slate-200 overflow-hidden">
            <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 via-teal-500 to-indigo-500" />

            <div className="p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Indicateurs Clés de Succès</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Indicateur</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">2025</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">
                        2026-2027
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">
                        2028-2029
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-3 px-4 text-slate-700">Chercheurs permanents</td>
                      <td className="text-center py-3 px-4 text-slate-600">5-7</td>
                      <td className="text-center py-3 px-4 text-slate-600">8-10</td>
                      <td className="text-center py-3 px-4 text-slate-600">12+</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700">Publications/an</td>
                      <td className="text-center py-3 px-4 text-slate-600">5-10</td>
                      <td className="text-center py-3 px-4 text-slate-600">15-20</td>
                      <td className="text-center py-3 px-4 text-slate-600">25+</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700">Doctorants en cours</td>
                      <td className="text-center py-3 px-4 text-slate-600">0-2</td>
                      <td className="text-center py-3 px-4 text-slate-600">5-8</td>
                      <td className="text-center py-3 px-4 text-slate-600">10+</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700">Projets LaCDIA Tech</td>
                      <td className="text-center py-3 px-4 text-slate-600">2-5</td>
                      <td className="text-center py-3 px-4 text-slate-600">10-15</td>
                      <td className="text-center py-3 px-4 text-slate-600">20+</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700">Partenaires internationaux</td>
                      <td className="text-center py-3 px-4 text-slate-600">3-5</td>
                      <td className="text-center py-3 px-4 text-slate-600">8-12</td>
                      <td className="text-center py-3 px-4 text-slate-600">15+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 9: CALL-TO-ACTION
          ============================================ */}
      <section className="relative overflow-hidden gradient-mesh-bg py-20 md:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow" />
        <div
          className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-glow"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 text-center">
            Découvrez Notre Impact
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-lg md:text-xl text-slate-200 leading-relaxed mb-12">
            Explorez nos axes de recherche, nos services, et nos opportunités de collaboration.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={localizedPath("/recherche/departement-scientifique", locale)}
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
            >
              Explorer la Recherche
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
              href={localizedPath("/lacdia-tech", locale)}
              className="rounded-xl glass-card px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Découvrir LaCDIA Tech
            </Link>

            <Link
              href={localizedPath("/collaborer", locale)}
              className="rounded-xl glass-card px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Nous Contacter
            </Link>
          </div>
        </div>

        {/* Gradient fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
      </section>
    </main>
  );
}
