import { ActionItem, InsightCluster } from "@/types";

export interface InsightRepository {
  listClusters(): InsightCluster[];
  listClustersByOrganization(orgId: string): InsightCluster[];
  listActions(): ActionItem[];
  listActionsByOrganization(orgId: string): ActionItem[];
}
