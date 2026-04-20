import Image from "next/image";

import { site } from "@/content/site";
import type { SiteAsset } from "@/lib/sanity/types";

type LogoSize = "header" | "footer" | "hero";

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
  header: { width: 56, height: 56 },
  footer: { width: 64, height: 64 },
  hero: { width: 120, height: 120 },
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
