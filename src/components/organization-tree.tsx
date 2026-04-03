import Link from "next/link";

import { cn } from "@/lib/utils";
import { OrganizationTreeNode } from "@/types";

function TreeNode({
  node,
  depth,
  currentSlug,
}: {
  node: OrganizationTreeNode;
  depth: number;
  currentSlug?: string;
}) {
  const isActive = node.slug === currentSlug;

  return (
    <div className="space-y-3">
      <Link
        href={`/boards/${node.slug}`}
        className={cn(
          "flex items-center justify-between rounded-2xl border border-transparent bg-white px-4 py-3 text-sm font-semibold transition hover:border-[var(--color-accent)]",
          isActive &&
            "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
        )}
        style={{ marginLeft: depth * 16 }}
      >
        <span>{node.name}</span>
        <span className="text-xs font-medium text-[var(--color-muted)]">
          {node.children.length > 0 ? "상위 조직" : "단위 조직"}
        </span>
      </Link>
      {node.children.length > 0 && (
        <div className="space-y-3">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              currentSlug={currentSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function OrganizationTree({
  tree,
  currentSlug,
}: {
  tree: OrganizationTreeNode[];
  currentSlug?: string;
}) {
  return (
    <div className="space-y-4">
      {tree.map((node) => (
        <TreeNode key={node.id} node={node} depth={0} currentSlug={currentSlug} />
      ))}
    </div>
  );
}
