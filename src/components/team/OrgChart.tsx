"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import type { OrgNode } from "@/lib/team/getTeamPageData";

type PositionedNode = OrgNode & { x: number; y: number; cx: number; cy: number };

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

type Layout = {
  positioned: PositionedNode[];
  edges: Array<[string, string]>;
  size: { width: number; height: number };
  nodeWidth: number;
  nodeHeight: number;
};

// Tree layout: subtree widths are computed bottom-up; then nodes are placed top-down so that
// every parent is centered above the full width of its children.
function buildTreeLayout(nodes: OrgNode[]): Layout {
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

  const nodeWidth = 260;
  const nodeHeight = 92;
  const hGap = 46;
  const vGap = 92;
  const padding = 80;

  const root = nodes.find((n) => !n.parentId) ?? null;
  if (!root) {
    return {
      positioned: [],
      edges: [],
      size: { width: nodeWidth + padding * 2, height: nodeHeight + padding * 2 },
      nodeWidth,
      nodeHeight,
    };
  }

  const widths = new Map<string, number>();
  const edges: Array<[string, string]> = [];

  function computeWidth(id: string): number {
    const kids = children.get(id) ?? [];
    for (const child of kids) edges.push([id, child.id]);
    if (kids.length === 0) {
      widths.set(id, nodeWidth);
      return nodeWidth;
    }

    let total = 0;
    kids.forEach((kid, index) => {
      total += computeWidth(kid.id);
      if (index > 0) total += hGap;
    });
    const w = Math.max(nodeWidth, total);
    widths.set(id, w);
    return w;
  }

  computeWidth(root.id);

  const positioned: PositionedNode[] = [];
  let maxDepth = 0;

  function assign(id: string, left: number, depth: number) {
    maxDepth = Math.max(maxDepth, depth);
    const node = byId.get(id);
    if (!node) return;

    const subtreeWidth = widths.get(id) ?? nodeWidth;
    const centerX = left + subtreeWidth / 2;
    const x = centerX - nodeWidth / 2;
    const y = padding + depth * (nodeHeight + vGap);
    positioned.push({ ...node, x, y, cx: centerX, cy: y + nodeHeight / 2 });

    const kids = children.get(id) ?? [];
    if (kids.length === 0) return;

    const kidsWidth =
      kids.reduce((acc, k) => acc + (widths.get(k.id) ?? nodeWidth), 0) +
      Math.max(0, kids.length - 1) * hGap;

    let childLeft = left + (subtreeWidth - kidsWidth) / 2;
    for (const child of kids) {
      const w = widths.get(child.id) ?? nodeWidth;
      assign(child.id, childLeft, depth + 1);
      childLeft += w + hGap;
    }
  }

  assign(root.id, padding, 0);

  let minX = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const n of positioned) {
    minX = Math.min(minX, n.x);
    maxX = Math.max(maxX, n.x + nodeWidth);
    maxY = Math.max(maxY, n.y + nodeHeight);
  }

  const dx = minX < padding ? padding - minX : 0;
  if (dx !== 0) {
    for (const n of positioned) {
      n.x += dx;
      n.cx += dx;
    }
    maxX += dx;
  }

  return {
    positioned,
    edges,
    size: { width: maxX + padding, height: maxY + padding },
    nodeWidth,
    nodeHeight,
  };
}

export function OrgChart({ nodes }: { nodes: OrgNode[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [{ scale, x, y }, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(
    null,
  );

  const layout = useMemo(() => buildTreeLayout(nodes), [nodes]);
  const positionedById = useMemo(() => {
    const map = new Map<string, PositionedNode>();
    for (const n of layout.positioned) map.set(n.id, n);
    return map;
  }, [layout.positioned]);

  function clamp(next: { scale: number; x: number; y: number }) {
    const el = containerRef.current;
    if (!el) return next;

    const viewportW = el.clientWidth;
    const viewportH = el.clientHeight;
    const margin = 72;

    const scaledW = layout.size.width * next.scale;
    const scaledH = layout.size.height * next.scale;

    const centeredX = (viewportW - scaledW) / 2;
    const centeredY = (viewportH - scaledH) / 2;

    const minX = scaledW <= viewportW ? centeredX : viewportW - scaledW - margin;
    const maxX = scaledW <= viewportW ? centeredX : margin;
    const minY = scaledH <= viewportH ? centeredY : viewportH - scaledH - margin;
    const maxY = scaledH <= viewportH ? centeredY : margin;

    return {
      scale: next.scale,
      x: Math.max(minX, Math.min(maxX, next.x)),
      y: Math.max(minY, Math.min(maxY, next.y)),
    };
  }

  function reset() {
    setTransform((prev) => clamp({ ...prev, scale: 1, x: 0, y: 0 }));
  }

  function zoomTo(nextScale: number, anchor?: { clientX: number; clientY: number }) {
    const clampedScale = Math.max(0.6, Math.min(1.7, nextScale));
    setTransform((prev) => {
      if (!containerRef.current || !anchor) return clamp({ ...prev, scale: clampedScale });
      const rect = containerRef.current.getBoundingClientRect();
      const px = anchor.clientX - rect.left;
      const py = anchor.clientY - rect.top;
      const worldX = (px - prev.x) / prev.scale;
      const worldY = (py - prev.y) / prev.scale;
      const nextX = px - worldX * clampedScale;
      const nextY = py - worldY * clampedScale;
      return clamp({ scale: clampedScale, x: nextX, y: nextY });
    });
  }

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout.size.width, layout.size.height]);

  function scrollToPerson(nodeId: string) {
    const target = document.getElementById(`person-${nodeId}`);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.focus({ preventScroll: true });
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Navigation</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface-muted"
            onClick={() => zoomTo(scale - 0.1)}
            aria-label="Zoom arrière"
          >
            -
          </button>
          <button
            type="button"
            className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface-muted"
            onClick={reset}
            aria-label="Réinitialiser"
          >
            Réinitialiser
          </button>
          <button
            type="button"
            className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface-muted"
            onClick={() => zoomTo(scale + 0.1)}
            aria-label="Zoom avant"
          >
            +
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[520px] w-full touch-none select-none overflow-hidden rounded-2xl bg-surface-muted/40"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          if ((event.target as HTMLElement | null)?.closest?.("button[data-org-node]")) return;
          setDragging(true);
          dragRef.current = { startX: event.clientX, startY: event.clientY, originX: x, originY: y };
          (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragging || !dragRef.current) return;
          const dx = event.clientX - dragRef.current.startX;
          const dy = event.clientY - dragRef.current.startY;
          setTransform((prev) => clamp({ ...prev, x: dragRef.current!.originX + dx, y: dragRef.current!.originY + dy }));
        }}
        onPointerUp={() => {
          setDragging(false);
          dragRef.current = null;
        }}
        onPointerCancel={() => {
          setDragging(false);
          dragRef.current = null;
        }}
        onWheel={(event) => {
          event.preventDefault();
          const delta = event.deltaY;
          const factor = delta > 0 ? -0.12 : 0.12;
          zoomTo(scale + factor, { clientX: event.clientX, clientY: event.clientY });
        }}
        role="region"
        aria-label="Organigramme"
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

              const startX = parent.cx;
              const startY = parent.y + layout.nodeHeight;
              const endX = child.cx;
              const endY = child.y;

              const c1y = startY + 26;
              const c2y = endY - 26;

              return (
                <path
                  key={`${parentId}-${childId}`}
                  d={`M ${startX} ${startY} C ${startX} ${c1y}, ${endX} ${c2y}, ${endX} ${endY}`}
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
                className="absolute"
                style={{ left: node.x, top: node.y, width: layout.nodeWidth, height: layout.nodeHeight }}
              >
                <button
                  type="button"
                  data-org-node
                  className={[
                    "group flex h-full w-full items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-left shadow-sm transition",
                    "hover:border-primary/25 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/25",
                  ].join(" ")}
                  onClick={() => scrollToPerson(node.id)}
                >
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
                    <div className="mt-2 text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
                      Cliquer pour aller au profil
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 text-xs text-muted">
        Astuce : glisser pour déplacer, utiliser la molette ou +/- pour zoomer.
      </div>
    </div>
  );
}

