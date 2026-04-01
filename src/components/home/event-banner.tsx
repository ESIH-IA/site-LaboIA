import Link from "next/link";

type EventBannerProps = {
  enabled?: boolean;
  label?: string;
  title?: string;
  date?: string;
  location?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function EventBanner({
  enabled = true,
  label,
  title,
  date,
  location,
  ctaLabel,
  ctaHref,
}: EventBannerProps) {
  if (!enabled) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            {label ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {label}
              </p>
            ) : null}
            <h2 className="mt-2 text-xl font-semibold text-neutral-900">
              {title ?? "Événement"}
            </h2>
            {(date || location) && (
              <p className="mt-2 text-sm text-neutral-600">
                {date ?? ""}{date && location ? " - " : ""}{location ?? ""}
              </p>
            )}
          </div>
          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              className="rounded-full border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
