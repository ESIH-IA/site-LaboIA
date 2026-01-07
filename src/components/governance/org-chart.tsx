import type { OrgNode } from "@/lib/sanity/types";
import { OrgNodeView } from "@/components/governance/org-node";

export function OrgChart({ root }: { root: OrgNode }) {
  return (
    <div className="mt-10 rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-10">
      <div className="overflow-x-auto">
        <div className="min-w-0 md:min-w-[42rem]">
          <OrgNodeView node={root} />
        </div>
      </div>
    </div>
  );
}
