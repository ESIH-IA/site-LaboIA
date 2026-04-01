import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { ContentBlock } from "@/content/articles";

type Props = {
  blocks: readonly ContentBlock[];
};

export function ContentBlocks({ blocks }: Props) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-p:mt-0 prose-p:mb-4 prose-p:text-neutral-700 prose-li:text-neutral-700">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={`p-${index}`}>{block.text}</p>;

          case "heading": {
            const HeadingTag = (`h${block.level}` as unknown) as React.ElementType;
            return <HeadingTag key={`h-${index}`}>{block.text}</HeadingTag>;
          }

          case "list":
            return (
              <ul key={`ul-${index}`} className="list-disc pl-6">
                {block.items.map((item, itemIndex) => (
                  <li key={`${index}-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <div
                key={`c-${index}`}
                className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3"
              >
                <p className="font-medium text-neutral-900">{block.text}</p>
                <Link
                  href={block.href}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ouvrir
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            );

          case "linkList":
            return (
              <ul key={`ll-${index}`} className="list-disc pl-6">
                {block.items.map((item, itemIndex) => (
                  <li key={`${index}-${itemIndex}`}>
                    <Link
                      href={item.href}
                      className="font-medium text-neutral-900 underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            );

          case "gallery":
            return (
              <div key={`g-${index}`} className="grid gap-6 sm:grid-cols-2">
                {block.images.map((image, imageIndex) => (
                  <figure key={`${index}-${imageIndex}`} className="space-y-2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {image.caption ? (
                      <figcaption className="text-sm text-neutral-600">{image.caption}</figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
