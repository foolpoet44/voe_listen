# TECH_SPEC: VOE Listening Platform

## 기술 스택
- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Recharts
- Repository Pattern

## 폴더 구조
```
/docs
/src
  /app
    /(public)
    /(admin)
  /components
  /data
  /lib
  /repositories
  /services
  /types
```

## 데이터 모델
- OrganizationNode
- VoiceEntry
- InsightCluster
- ActionItem

모든 타입은 `src/types`에서 정의한다.

## Repository Pattern
- `OrganizationRepository`
- `VoiceRepository`
- `InsightRepository`

현재는 Mock 구현을 사용하고, 향후 Supabase/DB 구현으로 교체 가능하도록 인터페이스를 분리한다.

## 서비스 레이어
AI/분석 서비스는 인터페이스만 준비하고, 실제 구현은 TODO로 명시한다.
- TranscriptionService
- SentimentService
- CategoryService
- ClusteringService
- InsightSummaryService
- ThemeExtractionService

## 라우팅
- `/` 랜딩
- `/boards` 조직 보드 목록
- `/boards/[orgSlug]` 조직 보드 상세
- `/submit` 의견 제출
- `/dashboard` 관리자 대시보드
- `/insights` 인사이트

## 조직 집계 규칙
- 하위 조직 의견은 상위 조직에서 집계되어 표시된다.
- 필터는 조직 단위이며, 상위 선택 시 하위 데이터 포함.

## 향후 확장
- Supabase 연동 시 Repository 교체
- 음성 파일 저장/전사 연동
- 사용자 권한 모델(조직 범위 기반 접근)
- 실시간 알림 및 워크플로우
