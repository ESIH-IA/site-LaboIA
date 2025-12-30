import Image from "next/image";

import { site } from "@/content/site";

export function Banner({ className = "", cover = false }: { className?: string; cover?: boolean }) {
  const { banner } = site.assets;

  if (cover) {
    return (
      <Image
        src={banner.src}
        alt={banner.alt}
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
        <Image
          src={banner.src}
          alt={banner.alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
