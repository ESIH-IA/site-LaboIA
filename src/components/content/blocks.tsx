import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { ContentBlock } from "@/content/articles";

type Props = {
  blocks: readonly ContentBlock[];
};

export function ContentBlocks({ blocks }: Props) {
  return (
    <div className="prose">
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
              <ul key={`ul-${index}`} style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                {block.items.map((item, itemIndex) => (
                  <li key={`${index}-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <div
                key={`c-${index}`}
                className="content-callout"
              >
                <p>{block.text}</p>
                <Link
                  href={block.href}
                  className="content-callout-btn"
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
              <ul key={`ll-${index}`} style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                {block.items.map((item, itemIndex) => (
                  <li key={`${index}-${itemIndex}`}>
                    <Link
                      href={item.href}
                      style={{ fontWeight: 500, color: "#171717", textDecoration: "underline", textUnderlineOffset: "4px" }}
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
              <div key={`g-${index}`} className="content-gallery">
                {block.images.map((image, imageIndex) => (
                  <figure key={`${index}-${imageIndex}`} className="content-gallery-figure">
                    <div className="content-gallery-image">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    {image.caption ? (
                      <figcaption className="content-gallery-caption">{image.caption}</figcaption>
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
