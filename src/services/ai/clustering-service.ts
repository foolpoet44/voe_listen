import { InsightCluster, VoiceEntry } from "@/types";

export interface ClusteringService {
  cluster(entries: VoiceEntry[]): Promise<InsightCluster[]>;
}

export class MockClusteringService implements ClusteringService {
  async cluster(_entries: VoiceEntry[]): Promise<InsightCluster[]> {
    void _entries;
    // TODO: 실제 클러스터링 로직을 연동하세요.
    return [];
  }
}
