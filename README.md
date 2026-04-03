# VOE Listening Platform (MVP)

한국어 기반 직원 의견 수집 플랫폼 MVP입니다. 조직 단위 보드와 상위 조직 집계를 통해 의견을 구조화하고, HR/리더가 실행 가능한 인사이트로 전환할 수 있도록 설계되었습니다.

## 주요 기능
- 조직 트리 기반 의견 보드
- 조직 상하위 집계 로직
- 안전한 의견 제출 폼(익명 기본)
- 관리자 대시보드/인사이트 요약
- Recharts 기반 시각화

## 로컬 실행
```bash
corepack pnpm install
corepack pnpm dev
```

## 스크립트
```bash
corepack pnpm dev
corepack pnpm build
corepack pnpm lint
```

## 문서
- `docs/PRD.md`
- `docs/TECH_SPEC.md`
- `docs/ORG_STRUCTURE.md`
- `docs/TODO.md`

## 개발 메모
- 모든 사용자-facing 문구는 한국어로 작성되어 있습니다.
- Repository 패턴을 사용해 향후 Supabase 연동을 준비했습니다.
