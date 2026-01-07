"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import type { OrgNode } from "@/lib/team/getTeamPageData";

type PositionedNode = OrgNode & { x: number; y: number };

function initials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function groupTheme(group?: OrgNode["group"]) {
  switch (group) {
    case "governance":
      return { ring: "ring-orange-500/30", bg: "bg-orange-500/10", accent: "text-orange-700" };
    case "associate":
      return { ring: "ring-violet-500/25", bg: "bg-violet-500/10", accent: "text-violet-700" };
    case "research":
    default:
      return { ring: "ring-accent/25", bg: "bg-accent/10", accent: "text-accent" };
  }
}

function buildLayout(nodes: OrgNode[]) {
  const byId = new Map<string, OrgNode>();
  const children = new Map<string, OrgNode[]>();
  for (const node of nodes) byId.set(node.id, node);
  for (const node of nodes) {
    const parentId = node.parentId ?? null;
    if (!parentId) continue;
    const list = children.get(parentId) ?? [];
    list.push(node);
    children.set(parentId, list);
  }

  const nodeWidth = 240;
  const nodeHeight = 90;
  const hGap = 56;
  const vGap = 88;

  const roots = nodes.filter((node) => !node.parentId);
  const root = roots[0] ?? null;
  if (!root) {
    return {
      positioned: [] as PositionedNode[],
      edges: [] as Array<[string, string]>,
      size: { width: nodeWidth + 120, height: nodeHeight + 120 },
      nodeWidth,
      nodeHeight,
    };
  }

  const levels: OrgNode[][] = [];
  let current: OrgNode[] = [root];
  const edges: Array<[string, string]> = [];
  while (current.length > 0) {
    levels.push(current);
    const next: OrgNode[] = [];
    for (const parent of current) {
      const kids = (children.get(parent.id) ?? []).slice();
      for (const child of kids) edges.push([parent.id, child.id]);
      next.push(...kids);
    }
    current = next;
  }

  const maxCols = Math.max(...levels.map((l) => l.length), 1);
  const width = maxCols * nodeWidth + Math.max(0, maxCols - 1) * hGap + 120;
  const height = levels.length * nodeHeight + Math.max(0, levels.length - 1) * vGap + 120;

  const positioned: PositionedNode[] = [];
  levels.forEach((levelNodes, levelIndex) => {
    const rowWidth =
      levelNodes.length * nodeWidth + Math.max(0, levelNodes.length - 1) * hGap;
    const startX = (width - rowWidth) / 2;
    const y = 60 + levelIndex * (nodeHeight + vGap);
    levelNodes.forEach((node, i) => {
      const x = startX + i * (nodeWidth + hGap);
      positioned.push({ ...node, x, y });
    });
  });

  return { positioned, edges, size: { width, height }, nodeWidth, nodeHeight };
}

export function OrgChart({ nodes }: { nodes: OrgNode[] }) {
  const [{ scale, x, y }, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);

  const layout = useMemo(() => buildLayout(nodes), [nodes]);
  const positionedById = useMemo(() => {
    const map = new Map<string, PositionedNode>();
    for (const n of layout.positioned) map.set(n.id, n);
    return map;
  }, [layout.positioned]);

  function zoom(nextScale: number) {
    const clamped = Math.max(0.6, Math.min(1.6, nextScale));
    setTransform((prev) => ({ ...prev, scale: clamped }));
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-[0.18em] text-muted">Navigation</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface-muted"
            onClick={() => zoom(scale - 0.1)}
            aria-label="Zoom out"
          >
            -
          </button>
          <button
            type="button"
            className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface-muted"
            onClick={() => setTransform({ scale: 1, x: 0, y: 0 })}
            aria-label="Reset view"
          >
            Reset
          </button>
          <button
            type="button"
            className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface-muted"
            onClick={() => zoom(scale + 0.1)}
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      <div
        className="relative h-[520px] w-full overflow-auto rounded-2xl bg-surface-muted/40"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          setDragging(true);
          dragRef.current = { startX: event.clientX, startY: event.clientY, originX: x, originY: y };
          (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragging || !dragRef.current) return;
          const dx = event.clientX - dragRef.current.startX;
          const dy = event.clientY - dragRef.current.startY;
          setTransform((prev) => ({ ...prev, x: dragRef.current!.originX + dx, y: dragRef.current!.originY + dy }));
        }}
        onPointerUp={() => {
          setDragging(false);
          dragRef.current = null;
        }}
        onPointerCancel={() => {
          setDragging(false);
          dragRef.current = null;
        }}
        role="region"
        aria-label="Organizational chart"
      >
        <div
          className="relative"
          style={{
            width: layout.size.width,
            height: layout.size.height,
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <svg
            className="pointer-events-none absolute inset-0"
            width={layout.size.width}
            height={layout.size.height}
            aria-hidden="true"
          >
            {layout.edges.map(([parentId, childId]) => {
              const parent = positionedById.get(parentId);
              const child = positionedById.get(childId);
              if (!parent || !child) return null;

              const parentCx = parent.x + layout.nodeWidth / 2;
              const parentCy = parent.y + layout.nodeHeight;
              const childCx = child.x + layout.nodeWidth / 2;
              const childCy = child.y;
              const midY = (parentCy + childCy) / 2;

              return (
                <path
                  key={`${parentId}-${childId}`}
                  d={`M ${parentCx} ${parentCy} V ${midY} H ${childCx} V ${childCy}`}
                  stroke="rgba(148,163,184,0.65)"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}
          </svg>

          {layout.positioned.map((node) => {
            const theme = groupTheme(node.group);
            const crown = node.group === "governance" && !node.parentId;
            return (
              <div
                key={node.id}
                className={[
                  "absolute rounded-2xl border border-border bg-surface p-4 shadow-sm transition",
                  "hover:border-primary/25 hover:shadow-md",
                ].join(" ")}
                style={{ left: node.x, top: node.y, width: layout.nodeWidth, height: layout.nodeHeight }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      "relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2",
                      theme.ring,
                      theme.bg,
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {node.photoUrl ? (
                      <Image src={node.photoUrl} alt={node.name} fill sizes="48px" className="object-cover" />
                    ) : (
                      <div className={["flex h-full w-full items-center justify-center text-sm font-semibold", theme.accent].join(" ")}>
                        {initials(node.name)}
                      </div>
                    )}
                    {crown ? (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-orange-600" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 18l2-10 6 6 6-6 2 10H4zm2 2h12v2H6v-2z" />
                        </svg>
                      </div>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">{node.name}</div>
                    <div className="mt-0.5 line-clamp-2 text-xs text-muted">{node.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 text-xs text-muted">
        Astuce : glisser pour d\u00e9placer, utiliser +/- pour zoomer.
      </div>
    </div>
  );
}
