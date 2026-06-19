import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import ContactForm from "@/components/forms/contact-form";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "contact", locale },
    null,
  );
  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
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

  const channels = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Email",
      value: "contact@lacdia.org",
      href: "mailto:contact@lacdia.org",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Localisation",
      value: "29 2nd Lane, Port-au-Prince, Haïti",
      href: null,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Collaboration",
      value: "Via le formulaire",
      href: "/collaborer",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Questions générales",
      value: "Formulaire ci-dessous",
      href: null,
    },
  ];

  return (
    <main style={{ background: "var(--labo-bg)" }}>
      {/* Hero minimal "Parlons." */}
      <section className="relative overflow-hidden section-padding" style={{ background: "var(--labo-bg)" }}>
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="container-site relative z-10">
          <h1
            className="text-display-hero text-[#f0f4ff]"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            {page?.title ?? "Parlons."}
          </h1>
          {page?.summary && (
            <p className="mt-6 text-lg text-[#8892b0] max-w-xl leading-relaxed">{page.summary}</p>
          )}
        </div>
      </section>

      {/* Channels grid */}
      <section className="section-labo-surface section-padding-sm">
        <div className="container-site">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-16">
            {channels.map((ch) => (
              <div key={ch.label} className="glass-labo rounded-xl p-5 flex flex-col gap-3">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center text-[#00d4aa]"
                  style={{ background: "rgba(0,212,170,0.1)" }}
                >
                  {ch.icon}
                </div>
                <div>
                  <div className="label-eyebrow text-[#8892b0] mb-1">{ch.label}</div>
                  {ch.href ? (
                    <a href={ch.href} className="text-sm font-medium text-[#f0f4ff] hover:text-[#00d4aa] transition-colors">
                      {ch.value}
                    </a>
                  ) : (
                    <span className="text-sm text-[#8892b0]">{ch.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page?.content && (
        <section className="section-labo-surface section-padding-sm">
          <div className="container-site">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      )}

      {/* Formulaire */}
      <section className="section-labo section-padding">
        <div className="container-site max-w-2xl">
          <div className="label-eyebrow text-[#00d4aa] mb-8">Message</div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}