import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import CollaborateForm from "@/components/forms/collaborate-form";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "collaborer", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/collaborer", locale),
    alternates: {
      fr: localizedPath("/collaborer", "fr"),
      en: localizedPath("/collaborer", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "collaborer", locale },
    null,
  );

  const collaborationBenefits = [
    {
      title: "Recherche conjointe",
      description: "Associez-vous à nos projets de recherche en IA, données et innovation technologique.",
      icon: "🔬",
    },
    {
      title: "Transfert technologique",
      description: "Accédez à nos innovations et transformez-les en solutions concrètes pour votre organisation.",
      icon: "⚡",
    },
    {
      title: "Formation spécialisée",
      description: "Bénéficiez de programmes de formation adaptés aux besoins de votre équipe.",
      icon: "📚",
    },
    {
      title: "Impact régional",
      description: "Contribuez au développement technologique et scientifique de la région haïtienne.",
      icon: "🌍",
    },
  ];

  const partnershipTypes = [
    {
      title: "Conventions de recherche",
      description: "Collaborations académiques et scientifiques sur des projets définis.",
    },
    {
      title: "Contrats de prestation",
      description: "Services de consulting, développement et expertise en intelligence artificielle.",
    },
    {
      title: "Partenariats académiques",
      description: "Échanges d'étudiants, co-supervision de thèses et formations conjointes.",
    },
    {
      title: "Mécénat & soutien",
      description: "Contribution au financement et au développement de l'écosystème de recherche.",
    },
  ];

  return (
    <main className="bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-mesh-bg py-20 md:py-32">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute left-0 top-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl animate-glow" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow" style={{ animationDelay: "1s" }} />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-8 animate-fade-in-up">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
              Collaboration & Partenariats
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in-up leading-tight" style={{ animationDelay: "100ms" }}>
            Collaborer avec LaCDIA
          </h1>

          <p className="mt-6 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Rejoignez une communauté de chercheurs, d'innovateurs et de partenaires engagés dans la transformation numérique. Ensemble, créons des solutions d'intelligence artificielle impactantes pour Haïti et la région.
          </p>
        </div>
      </section>

      {/* Page Content */}
      {page?.content && (
        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      )}

      {/* Why Collaborate Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Pourquoi collaborer avec LaCDIA
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              Découvrez les avantages d'une collaboration avec notre laboratoire.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {collaborationBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group glass-card rounded-2xl backdrop-blur-lg border border-white/20 p-8 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg opacity-30" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Modalités de collaboration
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              Plusieurs formes de partenariat adaptées à vos besoins.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {partnershipTypes.map((type, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {type.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-28 bg-gradient-mesh-bg relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-glow" />

        <div className="relative mx-auto max-w-3xl px-4">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Démarrez une collaboration
            </h2>
            <p className="text-lg text-slate-200">
              Complétez ce formulaire et notre équipe vous contactera pour discuter de vos besoins.
            </p>
          </div>

          <CollaborateForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            D'autres questions ?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            N'hésitez pas à nous contacter directement pour discuter de vos projets.
          </p>
          <a
            href="/contact"
            className="inline-flex px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </main>
  );
}
