"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ContentBlocks } from "@/components/content/blocks";
import type { ContentBlock } from "@/content/articles";

type NewsCardItem = {
  _id: string;
  title: string;
  slug: { current: string };
  date?: string;
  category?: string;
  summary?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
  sourceUrl?: string;
  blocks?: readonly ContentBlock[];
};

type Props = {
  item: NewsCardItem;
};

export default function NewsCard({ item }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const hasModal = Boolean(item.blocks && item.blocks.length > 0);
  const isExternal = Boolean(item.sourceUrl);
  const hasImage = Boolean(item.mainImageUrl);

  return (
    <>
      <article className="glass-labo-hover group relative overflow-hidden rounded-2xl transition-all duration-300">
        <div
          className="absolute left-0 right-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, var(--labo-accent-teal), transparent)" }}
        />

        <div
          className={`grid gap-6 p-6 md:p-8 md:items-start ${
            hasImage
              ? isExternal
                ? "md:grid-cols-[200px_1fr]"
                : "md:grid-cols-[240px_1fr]"
              : "md:grid-cols-1"
          }`}
        >
          {item.mainImageUrl ? (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group/img relative aspect-4/3 w-full overflow-hidden rounded-xl focus-visible:outline-none"
              style={{ border: "1px solid var(--labo-border)" }}
              aria-label={`Agrandir l'image de ${item.title}`}
            >
              <Image
                src={item.mainImageUrl}
                alt={item.mainImageAlt ?? item.title}
                fill
                sizes="(min-width: 768px) 240px, 100vw"
                className="object-cover transition-all duration-500 group-hover/img:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover/img:opacity-100" />
            </button>
          ) : null}

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {item.category ? (
                <span className="badge-teal">{item.category}</span>
              ) : null}
              {item.date ? (
                <span className="label-eyebrow" style={{ color: "var(--labo-text-muted)" }}>
                  {item.date}
                </span>
              ) : null}
            </div>

            <h2
              className="text-xl font-bold mb-3 leading-snug"
              style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              {item.title}
            </h2>

            {item.summary ? (
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--labo-text-muted)" }}>
                {item.summary}
              </p>
            ) : null}

            <div className="mt-auto">
              {item.sourceUrl ? (
                <Link
                  href={item.sourceUrl}
                  className="btn-primary-labo"
                  style={{ fontSize: "0.85rem" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  Lire l&apos;article
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              ) : hasModal ? (
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="btn-primary-labo"
                  style={{ fontSize: "0.85rem" }}
                >
                  Voir plus
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={`/actualites/${item.slug.current}`}
                  className="btn-primary-labo"
                  style={{ fontSize: "0.85rem" }}
                >
                  Lire l&apos;article
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>

      {hasModal && isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,15,28,0.92)", backdropFilter: "blur(8px)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`Article ${item.title}`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
            style={{ background: "var(--labo-surface)", border: "1px solid var(--labo-border)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="relative overflow-hidden px-8 py-6"
              style={{ borderBottom: "1px solid var(--labo-border)" }}
            >
              <div
                className="absolute left-0 right-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, var(--labo-accent-teal), transparent)" }}
              />
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    {item.category ? (
                      <span className="badge-teal">{item.category}</span>
                    ) : null}
                    {item.date ? (
                      <span className="label-eyebrow" style={{ color: "var(--labo-text-muted)" }}>
                        {item.date}
                      </span>
                    ) : null}
                  </div>
                  <h3
                    className="text-xl font-bold leading-tight"
                    style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
                  style={{
                    border: "1px solid var(--labo-border)",
                    background: "transparent",
                    color: "var(--labo-text-muted)",
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>

            <div className="max-h-[calc(90vh-120px)] overflow-y-auto px-8 py-6">
              {item.mainImageUrl ? (
                <div
                  className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg"
                  style={{ border: "1px solid var(--labo-border)" }}
                >
                  <Image
                    src={item.mainImageUrl}
                    alt={item.mainImageAlt ?? item.title}
                    fill
                    sizes="(min-width: 1024px) 896px, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              {!item.blocks && item.summary ? (
                <p className="text-base leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
                  {item.summary}
                </p>
              ) : null}
              {item.blocks ? (
                <div className="prose max-w-none" style={{ color: "var(--labo-text-muted)" }}>
                  <ContentBlocks blocks={item.blocks} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}