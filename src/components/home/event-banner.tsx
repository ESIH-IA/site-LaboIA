import Link from "next/link";
import { event } from "@/content/home";

export default function EventBanner() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              {event.label}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-900">
              {event.title}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              {event.date} · {event.location}
            </p>
          </div>
          <Link
            href={event.ctaHref}
            className="rounded-full border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
          >
            {event.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
