import { isSanityConfigured } from "@/lib/sanity/client";
import StudioClient from "./StudioClient";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Sanity Studio</h1>
        <p className="mt-3 text-neutral-600">
          Configurez NEXT_PUBLIC_SANITY_PROJECT_ID et NEXT_PUBLIC_SANITY_DATASET pour activer le
          studio.
        </p>
      </section>
    );
  }

  return <StudioClient />;
}
