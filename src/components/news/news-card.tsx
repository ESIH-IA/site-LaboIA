"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card
        className="card-hover"
        style={{ cursor: hasModal ? "pointer" : undefined }}
        onClick={hasModal && !isExternal ? () => setIsOpen(true) : undefined}
      >
        <div
          className={`news-card-layout ${
            hasImage ? "news-card-layout--with-image" : ""
          }`}
        >
          {item.mainImageUrl && (
            <div className="news-card-image">
              <Image
                src={item.mainImageUrl}
                alt={item.mainImageAlt ?? item.title}
                fill
                sizes="(min-width: 768px) 240px, 100vw"
                style={{ objectFit: "cover", transition: "transform 500ms" }}
              />
              <div className="news-card-image-overlay" />
            </div>
          )}

          <div className="news-card-body">
            <CardHeader className={hasImage ? "card-header--flush" : ""}>
              <div className="news-card-meta">
                {item.category && (
                  <span className="badge badge-cyan-outline">
                    {item.category}
                  </span>
                )}
                {item.date && <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--muted)" }}>{item.date}</span>}
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>

            {item.summary && (
              <CardContent className={hasImage ? "card-content--flush" : ""}>
                <CardDescription>{item.summary}</CardDescription>
              </CardContent>
            )}

            <CardFooter className={hasImage ? "card-footer--flush" : ""}>
              {item.sourceUrl ? (
                <Link
                  href={item.sourceUrl}
                  className="btn-news"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Lire l'article
                  <svg style={{height:'1rem', width:'1rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              ) : hasModal ? (
                <button
                  type="button"
                  className="btn-modal-open"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                  }}
                >
                  Lire la suite
                </button>
              ) : null}
            </CardFooter>
          </div>
        </div>
      </Card>

      {hasModal && isOpen && (
        <div
          className="modal-overlay--news"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-panel--news"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="modal-close--news"
              aria-label="Fermer"
            >
              <svg style={{height:'1.5rem', width:'1.5rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="modal-news-title">{item.title}</h2>
            <div className="modal-news-meta">
              {item.category && (
                <span className="badge badge-cyan-outline">
                  {item.category}
                </span>
              )}
              {item.date && <span style={{ fontWeight: 500, color: "var(--muted)" }}>{item.date}</span>}
            </div>
            {item.blocks && (
              <div className="prose prose-lg">
                <ContentBlocks blocks={item.blocks} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
