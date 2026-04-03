import { organizationRepository } from "@/repositories/mock-organization-repository";
import { OrganizationNode } from "@/types";

export function resolveOrganization(slug?: string) {
  if (!slug) return undefined;
  return organizationRepository.getBySlug(slug);
}

export function getOrganizationScope(org?: OrganizationNode) {
  if (!org) {
    return {
      org: undefined,
      orgIds: organizationRepository.listAll().map((item) => item.id),
      isParent: true,
      breadcrumbs: [] as OrganizationNode[],
      children: [] as OrganizationNode[],
    };
  }

  const descendants = organizationRepository.getDescendants(org.id);
  const orgIds = [org.id, ...descendants.map((child) => child.id)];

  return {
    org,
    orgIds,
    isParent: descendants.length > 0,
    breadcrumbs: organizationRepository.getBreadcrumbs(org.id),
    children: organizationRepository.getChildren(org.id),
  };
}
