import Image from "next/image";

import { site } from "@/content/site";
import type { SiteAsset } from "@/lib/sanity/types";

type LogoSize = "header" | "footer" | "hero";

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
  header: { width: 160, height: 58 },
  footer: { width: 200, height: 72 },
  hero: { width: 260, height: 94 },
};

export function Logo({
  size = "header",
  className = "",
  logo,
}: {
  size?: LogoSize;
  className?: string;
  logo?: SiteAsset | null;
}) {
  const fallback = site.assets.logo;
  const logoData = logo?.url ? { src: logo.url, alt: logo.alt ?? fallback.alt } : fallback;
  const dimensions = sizeMap[size];

  return (
    <Image
      src={logoData.src}
      alt={logoData.alt}
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      priority={size === "hero"}
    />
  );
}
