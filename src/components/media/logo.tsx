import Image from "next/image";

import { site } from "@/content/site";

type LogoSize = "header" | "footer" | "hero";

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
  header: { width: 160, height: 58 },
  footer: { width: 200, height: 72 },
  hero: { width: 260, height: 94 },
};

export function Logo({ size = "header", className = "" }: { size?: LogoSize; className?: string }) {
  const { logo } = site.assets;
  const dimensions = sizeMap[size];

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      priority={size === "hero"}
    />
  );
}
