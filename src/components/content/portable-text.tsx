import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type Props = {
  value: PortableTextBlock[] | undefined;
};

export default function PortableTextRenderer({ value }: Props) {
  if (!value || value.length === 0) return null;

  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-p:text-neutral-700 prose-li:text-neutral-700">
      <PortableText value={value} />
    </div>
  );
}
