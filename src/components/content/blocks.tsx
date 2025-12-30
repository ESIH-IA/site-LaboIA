import Link from "next/link";

import { type ContentBlock } from "@/content/articles";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-p:text-neutral-700 prose-li:text-neutral-700">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={index}>{block.text}</p>;
        }

        if (block.type === "heading") {
          const Heading = `h${block.level}` as keyof JSX.IntrinsicElements;
          return <Heading key={index}>{block.text}</Heading>;
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc pl-6">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "callout") {
          return (
            <div
              key={index}
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
        }

        return null;
      })}
    </div>
  );
}
