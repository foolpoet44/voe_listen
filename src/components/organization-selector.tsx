import * as React from "react";

import { Select } from "@/components/ui/select";
import { OrganizationTreeNode } from "@/types";

export function OrganizationSelector({
  tree,
  value,
  onChange,
  includeAll = false,
  allLabel = "전체 조직",
  placeholder = "조직을 선택해주세요",
}: {
  tree: OrganizationTreeNode[];
  value?: string;
  onChange?: (value: string) => void;
  includeAll?: boolean;
  allLabel?: string;
  placeholder?: string;
}) {
  const options = React.useMemo(() => {
    const rows: { id: string; name: string; depth: number }[] = [];
    const walk = (node: OrganizationTreeNode, depth: number) => {
      rows.push({ id: node.id, name: node.name, depth });
      node.children.forEach((child) => walk(child, depth + 1));
    };

    tree.forEach((node) => walk(node, 0));
    return rows;
  }, [tree]);

  const placeholderLabel = includeAll ? allLabel : placeholder;

  return (
    <Select
      value={value ?? ""}
      onChange={(event) => onChange?.(event.target.value)}
    >
      <option value="">{placeholderLabel}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {"— ".repeat(option.depth)}{option.name}
        </option>
      ))}
    </Select>
  );
}


