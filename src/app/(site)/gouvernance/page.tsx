import type { Metadata } from "next";
import Link from "next/link";

import PortableTextRenderer from "@/components/content/portable-text";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import {
  institutionalPageBySlugQuery,
  internalEventListQuery,
  kpiListQuery,
  labReportListQuery,
} from "@/lib/sanity/queries";
import type { EventListItem, InstitutionalPage, KpiItem, LabReportItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "gouvernance", locale },
    null,
  );

  return buildMetadata({
    title: page?.title ?? "Gouvernance",
    description: page?.summary,
    path: localizedPath("/gouvernance", locale),
    alternates: {
      fr: localizedPath("/gouvernance", "fr"),
      en: localizedPath("/gouvernance", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "gouvernance", locale },
    null,
  );
  const kpis = await sanityFetch<KpiItem[]>(kpiListQuery, {}, []);
  const reports = await sanityFetch<LabReportItem[]>(labReportListQuery, { locale }, []);
  const internalEvents = await sanityFetch<EventListItem[]>(internalEventListQuery, { locale }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
        {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      </div>
      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-neutral-900">Indicateurs cles</h2>
        {kpis.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Indicateurs en cours de consolidation.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {kpis.map((kpi) => (
              <article
                key={kpi._id}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="text-sm uppercase tracking-wide text-neutral-500">{kpi.label}</div>
                <div className="mt-2 text-2xl font-semibold text-neutral-900">{kpi.value}</div>
                {kpi.note ? <p className="mt-2 text-sm text-neutral-600">{kpi.note}</p> : null}
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Rapports annuels</h2>
        {reports.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Rapports en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <article
                key={report._id}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="text-xs uppercase tracking-wide text-neutral-500">
                  {report.year ?? ""}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{report.title}</h3>
                {report.summary ? (
                  <p className="mt-2 text-sm text-neutral-700">{report.summary}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-neutral-900">
                  {report.fileUrl ? (
                    <Link
                      href={report.fileUrl}
                      className="underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Telecharger
                    </Link>
                  ) : null}
                  {report.url ? (
                    <Link
                      href={report.url}
                      className="underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Lien externe
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Vie du laboratoire</h2>
        {internalEvents.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Evenements internes en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {internalEvents.map((event) => (
              <article
                key={event._id}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="text-xs uppercase tracking-wide text-neutral-500">
                  {event.startDate ?? ""}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{event.title}</h3>
                {event.summary ? (
                  <p className="mt-2 text-sm text-neutral-700">{event.summary}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
