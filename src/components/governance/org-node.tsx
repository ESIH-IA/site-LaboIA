import Image from "next/image";

import type { OrgNode, Person } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

function initials(text: string) {
  const parts = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function themeClasses(theme?: string | null) {
  switch ((theme ?? "").toLowerCase()) {
    case "blue":
      return { ring: "ring-primary/30", bg: "bg-primary/10", text: "text-primary" };
    case "teal":
      return { ring: "ring-accent/30", bg: "bg-accent/10", text: "text-accent" };
    case "indigo":
      return { ring: "ring-primary/30", bg: "bg-primary/10", text: "text-primary" };
    case "violet":
      return { ring: "ring-accent-2/30", bg: "bg-accent-2/10", text: "text-accent-2" };
    case "slate":
    default:
      return { ring: "ring-border", bg: "bg-surface-muted", text: "text-muted" };
  }
}

function peopleForUnit(node: OrgNode): Person[] {
  const lead = node.orgUnit?.lead ? [node.orgUnit.lead] : [];
  const members = node.orgUnit?.members ?? [];
  const seen = new Set<string>();
  const all: Person[] = [];
  for (const person of [...lead, ...members]) {
    if (!person?._id) continue;
    if (seen.has(person._id)) continue;
    seen.add(person._id);
    all.push(person);
  }
  return all;
}

function PersonAvatar({ person, size }: { person: Person; size: number }) {
  const imageUrl =
    person.photo ? urlForImage(person.photo).width(256).height(256).fit("crop").url() : null;
  const label = person.name;
  const initialsLabel = initials(person.name);

  return (
    <div
      className="relative overflow-hidden rounded-full bg-surface-muted ring-1 ring-border shadow-sm transition-shadow group-hover:shadow-md"
      style={{ width: size, height: size }}
      aria-label={label}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt={label} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
          {initialsLabel}
        </div>
      )}
    </div>
  );
}

function UnitAvatar({ label, size, theme }: { label: string; size: number; theme: ReturnType<typeof themeClasses> }) {
  return (
    <div
      className={[
        "grid place-items-center rounded-full ring-2 shadow-sm transition-shadow group-hover:shadow-md",
        theme.bg,
        theme.ring,
        theme.text,
      ].join(" ")}
      style={{ width: size, height: size }}
      aria-label={label}
    >
      <div className="text-lg font-semibold">{initials(label)}</div>
    </div>
  );
}

export function OrgNodeView({ node }: { node: OrgNode }) {
  const nodeTheme = themeClasses(node.theme ?? node.orgUnit?.colorKey ?? null);
  const kind = node.person ? "person" : "unit";
  const unitPeople = kind === "unit" ? peopleForUnit(node) : [];
  const unitLabel = node.orgUnit?.title ?? node.label;

  return (
    <div className="group flex w-full flex-col items-center">
      <div className="flex max-w-md flex-col items-center text-center">
        {kind === "person" && node.person ? (
          <PersonAvatar person={node.person} size={96} />
        ) : (
          <UnitAvatar label={unitLabel} size={96} theme={nodeTheme} />
        )}

        <div className="mt-4">
          <div className="text-sm font-semibold text-foreground">{node.label}</div>
          {node.subtitle ? <div className="mt-1 text-xs text-muted">{node.subtitle}</div> : null}
          {kind === "person" && node.person ? (
            <div className="mt-2 text-sm text-muted">
              <span className="font-medium text-foreground">{node.person.name}</span>
              {node.person.roleTitle ? <span> — {node.person.roleTitle}</span> : null}
            </div>
          ) : null}
          {kind === "unit" && node.orgUnit?.description ? (
            <div className="mt-2 text-xs text-muted">{node.orgUnit.description}</div>
          ) : null}
        </div>

        {kind === "unit" && unitPeople.length > 0 ? (
          <div className="mt-4 w-full">
            <div className="flex flex-wrap justify-center gap-2">
              {unitPeople.slice(0, 10).map((person) => (
                <div key={person._id} title={person.name} className="flex items-center gap-2">
                  <PersonAvatar person={person} size={36} />
                  <span className="hidden text-xs text-muted sm:inline">{person.name}</span>
                </div>
              ))}
            </div>
            {unitPeople.length > 10 ? (
              <div className="mt-2 text-xs text-muted">+ {unitPeople.length - 10} autres membres</div>
            ) : null}
          </div>
        ) : null}
      </div>

      {node.children && node.children.length > 0 ? (
        <div className="mt-10 w-full">
          <div className="relative mx-auto w-full max-w-6xl">
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-6 w-px -translate-x-1/2 bg-border md:block" />
            <div className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-border md:block" />

            <div className="hidden gap-8 pt-10 md:grid md:grid-flow-col md:auto-cols-fr md:justify-center">
              {node.children.map((child) => (
                <div
                  key={child._id}
                  className="relative flex justify-center md:pt-0"
                >
                  <div className="pointer-events-none absolute left-1/2 top-0 hidden h-6 w-px -translate-x-1/2 bg-border md:block" />
                  <OrgNodeView node={child} />
                </div>
              ))}
            </div>

            <div className="mt-8 border-l border-border pl-6 md:hidden">
              <div className="grid gap-6">
                {node.children.map((child) => (
                  <OrgNodeView key={`${child._id}-mobile`} node={child} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
