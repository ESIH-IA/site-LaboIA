import Image from "next/image";

import type { SiteAsset } from "@/lib/sanity/types";

export function Banner({
  className = "",
  cover = false,
  banner,
}: {
  className?: string;
  cover?: boolean;
  banner?: SiteAsset | null;
}) {
  if (!banner?.url) return null;

  if (cover) {
    return (
      <Image
        src={banner.url}
        alt={banner.alt ?? ""}
        fill
        sizes="100vw"
        className={className}
        priority
      />
    );
  }

  return (
    <div className={`banner-image ${className}`}>
      <div className="banner-aspect">
        <Image src={banner.url} alt={banner.alt ?? ""} fill sizes="100vw" priority />
      </div>
    </div>
  );
}
