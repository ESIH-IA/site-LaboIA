"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { PublicationListItem } from "@/lib/sanity/types";

type AxisOption = { _id: string; title: string };
type PartnerOption = { _id: string; name: string };

type Props = {
  publications: PublicationListItem[];
  axes: AxisOption[];
  partners: PartnerOption[];
};

function getYear(date?: string) {
  if (!date) return "";
  return date.slice(0, 4);
}

export default function PublicationsFilter({ publications, axes, partners }: Props) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [axisFilter, setAxisFilter] = useState("all");
  const [partnerFilter, setPartnerFilter] = useState("all");

  const types = useMemo(() => {
    const list = new Set(publications.map((item) => item.publicationType).filter(Boolean));
    return Array.from(list);
  }, [publications]);

  const years = useMemo(() => {
    const list = new Set(publications.map((item) => getYear(item.date)).filter(Boolean));
    return Array.from(list).sort((a, b) => b.localeCompare(a));
  }, [publications]);

  const filtered = useMemo(() => {
    return publications.filter((item) => {
      const typeOk = typeFilter === "all" || item.publicationType === typeFilter;
      const yearOk = yearFilter === "all" || getYear(item.date) === yearFilter;
      const axisOk =
        axisFilter === "all" ||
        item.axes?.some((axis) => axis._id === axisFilter) ||
        false;
      const partnerOk =
        partnerFilter === "all" ||
        item.projects?.some((project) =>
          project.partners?.some((partner) => partner._id === partnerFilter),
        ) ||
        false;
      return typeOk && yearOk && axisOk && partnerOk;
    });
  }, [publications, typeFilter, yearFilter, axisFilter, partnerFilter]);

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-wrap gap-4">
        <label className="text-sm text-neutral-700">
          Type
          <select
            className="ml-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="all">Tous</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-neutral-700">
          Annee
          <select
            className="ml-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
            value={yearFilter}
            onChange={(event) => setYearFilter(event.target.value)}
          >
            <option value="all">Toutes</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-neutral-700">
          Axe
          <select
            className="ml-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
            value={axisFilter}
            onChange={(event) => setAxisFilter(event.target.value)}
          >
            <option value="all">Tous</option>
            {axes.map((axis) => (
              <option key={axis._id} value={axis._id}>
                {axis.title}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-neutral-700">
          Partenaire
          <select
            className="ml-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
            value={partnerFilter}
            onChange={(event) => setPartnerFilter(event.target.value)}
          >
            <option value="all">Tous</option>
            {partners.map((partner) => (
              <option key={partner._id} value={partner._id}>
                {partner.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface-muted p-6 text-sm text-muted">
          Contenu en cours de publication.
        </div>
      ) : (
        <div className="grid gap-6">
          {filtered.map((publication) => (
            <article
              key={publication._id}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-muted">
                {publication.publicationType ? (
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
                    {publication.publicationType}
                  </span>
                ) : null}
                {publication.date ? <span>{publication.date}</span> : null}
              </div>
              <h2 className="mt-3 text-xl font-semibold text-foreground">{publication.title}</h2>
              {publication.summary ? (
                <p className="mt-2 text-sm text-muted">{publication.summary}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-foreground">
                <Link
                  href={`/publications/${publication.slug.current}`}
                  className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                >
                  Voir la publication
                </Link>
                {publication.doi ? (
                  <span className="text-muted">DOI: {publication.doi}</span>
                ) : null}
                {publication.url ? (
                  <a
                    href={publication.url}
                    className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lien externe
                  </a>
                ) : null}
                {publication.pdfUrl ? (
                  <a
                    href={publication.pdfUrl}
                    className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    PDF
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
