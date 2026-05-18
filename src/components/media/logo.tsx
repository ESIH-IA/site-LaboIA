import Image from "next/image";

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
  if (!logo?.url) return null;

  const dimensions = sizeMap[size];

  return (
    <Image
      src={logo.url}
      alt={logo.alt ?? ""}
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      priority={size === "hero"}
    />
  );
}
