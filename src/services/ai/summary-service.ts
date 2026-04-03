import { InsightCluster } from "@/types";

export interface InsightSummaryService {
  summarize(clusters: InsightCluster[]): Promise<string>;
}

export class MockInsightSummaryService implements InsightSummaryService {
  async summarize(_clusters: InsightCluster[]): Promise<string> {
    void _clusters;
    // TODO: 실제 인사이트 요약 모델을 연동하세요.
    return "(모의 요약) 현재 조직의 주요 신호가 요약됩니다.";
  }
}
