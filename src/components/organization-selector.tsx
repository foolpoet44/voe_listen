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
    const rows: {
      id: string;
      name: string;
      depth: number;
      parentName?: string;
    }[] = [];

    const walk = (node: OrganizationTreeNode, depth: number, parentName?: string) => {
      rows.push({ id: node.id, name: node.name, depth, parentName });
      node.children.forEach((child) => walk(child, depth + 1, node.name));
    };

    tree.forEach((node) => walk(node, 0));
    return rows;
  }, [tree]);

  const grouped = React.useMemo(() => {
    const groups = new Map<string, typeof options>();
    options.forEach((option) => {
      const key = option.parentName ?? "root";
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)?.push(option);
    });
    return groups;
  }, [options]);

  const placeholderLabel = includeAll ? allLabel : placeholder;

  return (
    <Select
      value={value ?? ""}
      onChange={(event) => onChange?.(event.target.value)}
    >
      <option value="">{placeholderLabel}</option>
      {Array.from(grouped.entries()).map(([groupName, items]) => {
        if (groupName === "root") {
          return items.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ));
        }

        return (
          <optgroup key={groupName} label={groupName}>
            {items.map((option) => (
              <option key={option.id} value={option.id}>
                {"— ".repeat(Math.max(0, option.depth - 1))}
                {option.name}
              </option>
            ))}
          </optgroup>
        );
      })}
    </Select>
  );
}
