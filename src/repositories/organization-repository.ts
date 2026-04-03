import { OrganizationNode, OrganizationTreeNode } from "@/types";

export interface OrganizationRepository {
  listAll(): OrganizationNode[];
  getBySlug(slug: string): OrganizationNode | undefined;
  getChildren(parentId: string): OrganizationNode[];
  getDescendants(orgId: string): OrganizationNode[];
  getBreadcrumbs(orgId: string): OrganizationNode[];
  getTree(): OrganizationTreeNode[];
}
