import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { Link } from "@/i18n/navigation";

type Props = {
  value: PortableTextBlock[] | undefined;
};

export const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "";
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return <Link href={href}>{children}</Link>;
      }
      return (
        <a href={href} target={value?.blank ? "_blank" : undefined} rel="noreferrer">
          {children}
        </a>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: Props) {
  if (!value || value.length === 0) return null;

  return (
    <div className="prose">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
