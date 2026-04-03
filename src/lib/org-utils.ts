import { OrganizationNode, OrganizationTreeNode } from "@/types";

export function getOrganizationBySlug(
  organizations: OrganizationNode[],
  slug: string
) {
  return organizations.find((org) => org.slug === slug);
}

export function getOrganizationById(
  organizations: OrganizationNode[],
  id: string
) {
  return organizations.find((org) => org.id === id);
}

export function getChildren(
  organizations: OrganizationNode[],
  parentId: string
) {
  return organizations.filter((org) => org.parentId === parentId);
}

export function getDescendants(
  organizations: OrganizationNode[],
  orgId: string
) {
  const results: OrganizationNode[] = [];
  const queue = [orgId];

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (!currentId) continue;
    const children = getChildren(organizations, currentId);
    for (const child of children) {
      results.push(child);
      queue.push(child.id);
    }
  }

  return results;
}

export function getBreadcrumbs(
  organizations: OrganizationNode[],
  orgId: string
) {
  const breadcrumbs: OrganizationNode[] = [];
  let current = getOrganizationById(organizations, orgId);

  while (current) {
    breadcrumbs.unshift(current);
    current = current.parentId
      ? getOrganizationById(organizations, current.parentId)
      : undefined;
  }

  return breadcrumbs;
}

export function buildOrgTree(organizations: OrganizationNode[]) {
  const rootNodes = organizations.filter((org) => org.parentId === null);
  const buildNode = (node: OrganizationNode): OrganizationTreeNode => {
    const children = getChildren(organizations, node.id).map(buildNode);
    return { ...node, children };
  };

  return rootNodes.map(buildNode);
}
