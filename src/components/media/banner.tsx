import Image from "next/image";

import { site } from "@/content/site";
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
  const fallback = site.assets.banner;
  const bannerData = banner?.url
    ? { src: banner.url, alt: banner.alt ?? fallback.alt }
    : { src: fallback.src, alt: fallback.alt };

  if (cover) {
    return (
      <Image
        src={bannerData.src}
        alt={bannerData.alt}
        fill
        sizes="100vw"
        className={`object-cover ${className}`}
        priority
      />
    );
  }

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="relative aspect-[894/160] w-full">
        <Image src={bannerData.src} alt={bannerData.alt} fill sizes="100vw" className="object-cover" priority />
      </div>
    </div>
  );
}
