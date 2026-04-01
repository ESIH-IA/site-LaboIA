import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import ContactForm from "@/components/forms/contact-form";
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
    { slug: "contact", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title || "Nous Contacter",
    description: page?.summary || "Contactez le LaCDIA pour vos demandes de collaboration et d'information.",
    path: localizedPath("/contact", locale),
    alternates: {
      fr: localizedPath("/contact", "fr"),
      en: localizedPath("/contact", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "contact", locale },
    null,
  );

  return (
    <main className="w-full">
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
              Contact
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-in-up">
            Nous Contacter
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed animate-fade-in-up">
            Vous avez une question, un projet ou une opportunité de collaboration ?
          </p>
          <p className="mt-3 max-w-2xl text-base text-slate-300 animate-fade-in-up">
            Contactez l'équipe du LaCDIA pour discuter de vos besoins en intelligence artificielle et science des données.
          </p>
        </div>
      </section>

      {/* CMS Content Section (if available) */}
      {page && (page.title || page.summary || page.content?.length) ? (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="max-w-3xl">
            {page.title ? <h2 className="text-3xl font-semibold text-slate-900">{page.title}</h2> : null}
            {page.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
          </div>

          <div className="mt-6">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      ) : null}

      {/* Contact Info & Form Section */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          {/* Contact Info Cards */}
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {/* Email Card */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Email</h3>
              <p className="text-base text-slate-600">contact@lacdia.org</p>
            </article>

            {/* Address Card */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Adresse</h3>
              <p className="text-base text-slate-600 leading-relaxed">Campus ESIH, Route de Frères, Pétion-Ville, Haïti</p>
            </article>

            {/* Hours Card */}
            <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-500/10">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-violet-500 to-cyan-500" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Horaires</h3>
              <p className="text-base text-slate-600">Lundi-Vendredi, 8h-17h</p>
            </article>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
