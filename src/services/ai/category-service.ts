import { VoiceCategory } from "@/types";

export interface CategoryService {
  classify(text: string): Promise<VoiceCategory>;
}

export class MockCategoryService implements CategoryService {
  async classify(_text: string): Promise<VoiceCategory> {
    void _text;
    // TODO: 실제 카테고리 분류 모델을 연동하세요.
    return "suggestion";
  }
}
