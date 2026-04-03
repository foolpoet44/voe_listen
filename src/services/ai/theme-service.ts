export interface ThemeExtractionService {
  extractThemes(texts: string[]): Promise<string[]>;
}

export class MockThemeExtractionService implements ThemeExtractionService {
  async extractThemes(_texts: string[]): Promise<string[]> {
    void _texts;
    // TODO: 반복 테마 추출 모델을 연동하세요.
    return ["일정 변경 공지", "협업 채널", "데이터 정합성"];
  }
}
