import Link from "next/link";

import { cn } from "@/lib/utils";
import { OrganizationTreeNode } from "@/types";

function TreeNode({
  node,
  depth,
  currentSlug,
  linkMode,
}: {
  node: OrganizationTreeNode;
  depth: number;
  currentSlug?: string;
  linkMode: "board" | "index";
}) {
  const isActive = node.slug === currentSlug;
  const href = linkMode === "index" ? `#org-${node.slug}` : `/boards/${node.slug}`;

  return (
    <div className="space-y-3">
      <Link
        href={href}
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
              linkMode={linkMode}
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
  linkMode = "board",
}: {
  tree: OrganizationTreeNode[];
  currentSlug?: string;
  linkMode?: "board" | "index";
}) {
  return (
    <div className="space-y-4">
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          depth={0}
          currentSlug={currentSlug}
          linkMode={linkMode}
        />
      ))}
    </div>
  );
}
