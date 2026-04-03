import { organizations } from "@/data/organizations";
import { OrganizationRepository } from "@/repositories/organization-repository";
import {
  buildOrgTree,
  getBreadcrumbs,
  getChildren,
  getDescendants,
  getOrganizationBySlug,
} from "@/lib/org-utils";

export class MockOrganizationRepository implements OrganizationRepository {
  listAll() {
    return organizations;
  }

  getBySlug(slug: string) {
    return getOrganizationBySlug(organizations, slug);
  }

  getChildren(parentId: string) {
    return getChildren(organizations, parentId);
  }

  getDescendants(orgId: string) {
    return getDescendants(organizations, orgId);
  }

  getBreadcrumbs(orgId: string) {
    return getBreadcrumbs(organizations, orgId);
  }

  getTree() {
    return buildOrgTree(organizations);
  }
}

export const organizationRepository = new MockOrganizationRepository();
