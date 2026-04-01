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
      <article className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
        <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />

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
              className="group/img relative aspect-4/3 w-full overflow-hidden rounded-xl border border-slate-200 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label={`Agrandir l'image de ${item.title}`}
            >
              <Image
                src={item.mainImageUrl}
                alt={item.mainImageAlt ?? item.title}
                fill
                sizes="(min-width: 768px) 240px, 100vw"
                className="object-cover transition-all duration-500 group-hover/img:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover/img:opacity-100" />
            </button>
          ) : null}

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {item.category ? (
                <span className="rounded-full border border-cyan-200 bg-cyan-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700">
                  {item.category}
                </span>
              ) : null}
              {item.date ? (
                <span className="text-sm font-medium text-slate-500">{item.date}</span>
              ) : null}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:gradient-text-cyan transition-smooth">
              {item.title}
            </h2>

            {item.summary ? (
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {item.summary}
              </p>
            ) : null}

            <div className="mt-auto">
              {item.sourceUrl ? (
                <Link
                  href={item.sourceUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/30"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lire l&apos;article
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              ) : hasModal ? (
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  Voir plus
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={`/actualites/${item.slug.current}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  Lire l&apos;article
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Article ${item.title}`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="relative overflow-hidden border-b border-slate-200 bg-linear-to-br from-slate-50 to-white px-8 py-6">
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    {item.category ? (
                      <span className="rounded-full border border-cyan-200 bg-cyan-50/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700">
                        {item.category}
                      </span>
                    ) : null}
                    {item.date ? (
                      <span className="text-sm font-medium text-slate-500">{item.date}</span>
                    ) : null}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  Fermer
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[calc(90vh-120px)] overflow-y-auto px-8 py-6">
              {item.mainImageUrl ? (
                <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
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
                <p className="text-base text-slate-700 leading-relaxed">{item.summary}</p>
              ) : null}
              {item.blocks ? (
                <div className="prose prose-slate max-w-none">
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
