import { Sentiment } from "@/types";

export interface SentimentService {
  classify(text: string): Promise<Sentiment>;
}

export class MockSentimentService implements SentimentService {
  async classify(_text: string): Promise<Sentiment> {
    void _text;
    // TODO: 실제 감성 분석 모델을 연동하세요.
    return "constructive";
  }
}
