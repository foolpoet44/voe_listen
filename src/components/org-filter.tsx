"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Select } from "@/components/ui/select";
import { OrganizationTreeNode } from "@/types";

export function OrganizationFilter({
  tree,
  currentSlug,
  label = "조직 필터",
}: {
  tree: OrganizationTreeNode[];
  currentSlug?: string;
  label?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const options: { slug: string; name: string; depth: number }[] = [];
  const walk = (node: OrganizationTreeNode, depth: number) => {
    options.push({ slug: node.slug, name: node.name, depth });
    node.children.forEach((child) => walk(child, depth + 1));
  };
  tree.forEach((node) => walk(node, 0));

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("org", value);
    } else {
      params.delete("org");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-[var(--color-muted)]">{label}</p>
      <Select
        value={currentSlug ?? ""}
        onChange={(event) => handleChange(event.target.value)}
      >
        <option value="">전체 조직</option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>
            {"— ".repeat(option.depth)}{option.name}
          </option>
        ))}
      </Select>
    </div>
  );
}


