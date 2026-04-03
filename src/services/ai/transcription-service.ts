export interface TranscriptionService {
  transcribe(audioUrl: string): Promise<string>;
}

export class MockTranscriptionService implements TranscriptionService {
  async transcribe(_audioUrl: string): Promise<string> {
    void _audioUrl;
    // TODO: 실제 음성 전사 API를 연동하세요.
    return "(모의 전사) 음성 의견 요약이 여기에 표시됩니다.";
  }
}
