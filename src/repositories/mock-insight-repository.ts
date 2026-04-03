import { actionItems } from "@/data/actions";
import { insightClusters } from "@/data/insights";
import { InsightRepository } from "@/repositories/insight-repository";

export class MockInsightRepository implements InsightRepository {
  listClusters() {
    return insightClusters;
  }

  listClustersByOrganization(orgId: string) {
    return insightClusters.filter((cluster) => cluster.organizationId === orgId);
  }

  listActions() {
    return actionItems;
  }

  listActionsByOrganization(orgId: string) {
    return actionItems.filter((item) => item.organizationId === orgId);
  }
}

export const insightRepository = new MockInsightRepository();
