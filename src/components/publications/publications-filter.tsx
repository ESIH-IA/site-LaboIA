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
    <div className="pub-filter">
      <div className="pub-filter-bar">
        <label className="pub-filter-label">
          Type
          <select
            className="form-select"
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

        <label className="pub-filter-label">
          Annee
          <select
            className="form-select"
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

        <label className="pub-filter-label">
          Axe
          <select
            className="form-select"
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

        <label className="pub-filter-label">
          Partenaire
          <select
            className="form-select"
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
        <div className="empty-state">
          Contenu en cours de publication.
        </div>
      ) : (
        <div className="pub-filter-results">
          {filtered.map((publication) => (
            <article
              key={publication._id}
              className="pub-filter-card"
            >
              <div className="pub-filter-card-meta">
                {publication.publicationType ? (
                  <span className="badge badge-accent">
                    {publication.publicationType}
                  </span>
                ) : null}
                {publication.date ? <span>{publication.date}</span> : null}
              </div>
              <h2 className="pub-filter-card-title">{publication.title}</h2>
              {publication.summary ? (
                <p className="pub-filter-card-summary">{publication.summary}</p>
              ) : null}
              <div className="pub-filter-card-links">
                <Link
                  href={`/publications/${publication.slug.current}`}
                  className="btn-link"
                >
                  Voir la publication
                </Link>
                {publication.doi ? (
                  <span className="pub-filter-doi">DOI: {publication.doi}</span>
                ) : null}
                {publication.url ? (
                  <a
                    href={publication.url}
                    className="btn-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lien externe
                  </a>
                ) : null}
                {publication.pdfUrl ? (
                  <a
                    href={publication.pdfUrl}
                    className="btn-link"
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
