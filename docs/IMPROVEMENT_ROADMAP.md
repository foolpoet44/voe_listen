# VOE Listening Platform
## 개선 우선순위 & Codex 빌드 프롬프트

**작성일**: 2026-04-03  
**기준 문서**:
- COMMUNICATION_PLATFORM_EVALUATION.md (커뮤니케이션 플랫폼 관점)
- USER_UX_EVALUATION.md (직원 관점)

---

## 📊 우선순위 매트릭스

### 평가 기준

| 기준 | 설명 | 가중치 |
|------|------|--------|
| **Impact** | 직원 사용성, 신뢰도, 제출율 향상 | 40% |
| **Effort** | 개발 시간, 복잡도, 위험도 | 30% |
| **Risk** | 기존 기능 영향, 버그 가능성 | 20% |
| **MVP** | 런칭 전 필수 여부 | 10% |

### 점수 계산

```
Score = (Impact × 0.4) + (100 - Effort × 0.3) + (100 - Risk × 0.2) + (MVP × 0.1)
```

---

## 🎯 개선 항목별 우선순위

### Phase 1: 긴급 (MVP 런칭 전)

| # | 개선 항목 | Impact | Effort | Risk | MVP | Score | Status |
|---|---------|--------|--------|------|-----|-------|--------|
| **P1-1** | 필수 필드 `*` 마킹 | 70 | 20 | 5 | 100 | **83.5** | 🔴 |
| **P1-2** | 제출 완료 후 CTA 버튼 | 80 | 25 | 10 | 90 | **82.0** | 🔴 |
| **P1-3** | 오디오 필드 현실적 메시지 | 60 | 15 | 5 | 100 | **79.0** | 🔴 |
| **P1-4** | 에러 메시지 요약 표시 | 70 | 35 | 15 | 80 | **74.0** | 🟡 |

**Phase 1 합계**: 4개 항목, 약 3~4일 개발, MVP 필수 준비

---

### Phase 2: 높음 (1주 이내)

| # | 개선 항목 | Impact | Effort | Risk | MVP | Score | Status |
|---|---------|--------|--------|------|-----|-------|--------|
| **P2-1** | 조직 선택기 개선 (그룹화 또는 검색) | 85 | 60 | 20 | 70 | **75.5** | 🟡 |
| **P2-2** | 필수/선택 필드 시각적 구분 | 75 | 25 | 10 | 70 | **73.0** | 🟡 |
| **P2-3** | 폼 필드 순서 최적화 | 70 | 30 | 15 | 60 | **68.5** | 🟢 |
| **P2-4** | 조직 보드 페이지 트리-카드 연동 | 65 | 50 | 25 | 50 | **65.5** | 🟢 |

**Phase 2 합계**: 4개 항목, 약 5~7일 개발, 사용성 대폭 개선

---

### Phase 3: 중간 (2주)

| # | 개선 항목 | Impact | Effort | Risk | MVP | Score | Status |
|---|---------|--------|--------|------|-----|-------|--------|
| **P3-1** | 2단계 폼 리팩토링 (Step 1 + Step 2) | 85 | 80 | 40 | 60 | **71.0** | 🟢 |
| **P3-2** | 모바일 반응형 최적화 | 60 | 40 | 20 | 40 | **59.0** | 🟢 |
| **P3-3** | 최근 조직 선택 쿠키 저장 | 50 | 20 | 10 | 30 | **52.0** | 🟢 |

**Phase 3 합계**: 3개 항목, 약 1주 개발, 선택적 개선

---

## 🚀 Phase별 상세 계획

### Phase 1: 긴급 - MVP 런칭 준비 (목표: 3~4일)

**개선 항목**: P1-1 ~ P1-4  
**영향**: 직원 신뢰도, 폼 완료율 기초  
**위험**: 낮음 (기존 코드 최소 수정)

#### P1-1: 필수 필드 `*` 마킹
```
Impact: 70 (필드 혼동 제거)
Effort: 20 (간단한 추가)
소요 시간: 30분~1시간
파일: src/components/submission-form.tsx
변경 범위: 라벨에 * 추가, 스타일 조정
```

#### P1-2: 제출 완료 후 CTA 버튼
```
Impact: 80 (피드백 루프 강화)
Effort: 25 (몇 개 버튼 추가)
소요 시간: 1~1.5시간
파일: src/components/submission-form.tsx
변경 범위: 제출 완료 화면 개선
```

#### P1-3: 오디오 필드 현실적 메시지
```
Impact: 60 (기대치 조정)
Effort: 15 (텍스트 변경)
소요 시간: 15~30분
파일: src/components/submission-form.tsx
변경 범위: 안내 문구 수정
```

#### P1-4: 에러 메시지 요약 표시
```
Impact: 70 (UX 개선)
Effort: 35 (로직 추가)
소요 시간: 1~2시간
파일: src/components/submission-form.tsx
변경 범위: 검증 결과 요약 화면 추가
```

---

### Phase 2: 높음 - 사용성 개선 (목표: 5~7일)

**개선 항목**: P2-1 ~ P2-4  
**영향**: 조직 선택 오류 감소, 폼 완료율 ↑10%  
**위험**: 중간 (새 컴포넌트 로직)

#### P2-1: 조직 선택기 개선
```
Impact: 85 (가장 큰 UX 문제)
Effort: 60 (구현 복잡)
소요 시간: 2~3시간
파일: src/components/organization-selector.tsx
변경 범위: 그룹화된 select 또는 커스텀 콤보박스
옵션: 
  - 빠른: <optgroup> 추가 (1시간)
  - 권장: 검색 가능한 콤보박스 (2~3시간)
```

#### P2-2: 필수/선택 필드 시각적 구분
```
Impact: 75 (명확성 향상)
Effort: 25 (스타일 일관성)
소요 시간: 1시간
파일: src/components/submission-form.tsx
변경 범위: 라벨, 색상, 텍스트 추가
```

#### P2-3: 폼 필드 순서 최적화
```
Impact: 70 (컨텍스트 개선)
Effort: 30 (필드 재배열)
소요 시간: 1~1.5시간
파일: src/components/submission-form.tsx
변경 범위: 조직 선택을 앞으로 이동
권장 순서:
  1. 제목
  2. 내용
  3. 조직 선택 ← 이동
  4. 오디오
  5. 카테고리/감정/긴급도/범위
  6. 동의
```

#### P2-4: 조직 보드 페이지 상호작용
```
Impact: 65 (탐색성 개선)
Effort: 50 (상태 관리)
소요 시간: 2~2.5시간
파일: src/app/(public)/boards/page.tsx, organization-tree.tsx
변경 범위: 트리 클릭 → 카드 하이라이트 또는 페이지 이동
```

---

### Phase 3: 중간 - 고급 개선 (목표: 1주)

**개선 항목**: P3-1 ~ P3-3  
**영향**: 폼 완료율 추가 ↑5~10%, 재방문율 향상  
**위험**: 중간~높음 (구조 변경)

#### P3-1: 2단계 폼 리팩토링
```
Impact: 85 (근본적 UX 개선)
Effort: 80 (구조 변경)
소요 시간: 3~4시간
파일: src/components/submission-form.tsx (분리)
변경 범위: 
  - SubmissionFormStep1.tsx (새 파일)
  - SubmissionFormStep2.tsx (새 파일)
  - 상태 관리 (useState → Context 또는 URL)
```

#### P3-2: 모바일 반응형 최적화
```
Impact: 60 (모바일 사용성)
Effort: 40 (테스트 필요)
소요 시간: 2시간
파일: 여러 컴포넌트 (CSS 수정)
변경 범위: 
  - 터치 타겟 44px 확보
  - 드롭다운 크기 증대
  - 키보드 올라올 때 입력 가림 방지
```

#### P3-3: 최근 조직 선택 저장
```
Impact: 50 (편의성)
Effort: 20 (localStorage)
소요 시간: 30분~1시간
파일: src/components/submission-form.tsx
변경 범위: 
  - localStorage 저장/로드
  - 초기값 설정 로직
```

---

## 📝 Codex 빌드 프롬프트

### Phase 1: 긴급 준비 (P1-1 ~ P1-4)

```markdown
# Codex Build Prompt: VOE Listening Platform - Phase 1 (MVP Ready)

## 목표
VOE Listening Platform MVP 런칭 전 긴급 UX 개선 4가지 구현

## 배경
- 직원들이 제출 폼을 작성할 때 필드 혼동, 제출 후 불확실성, 불명확한 메시지로 인한 마찰 발생
- 제출 완료율 저하 위험
- MVP 런칭 전 이 4가지를 해결하면 기본 신뢰도 확보 가능

## 평가 기준
- COMMUNICATION_PLATFORM_EVALUATION.md (심리적 안전성, 신뢰도)
- USER_UX_EVALUATION.md (직원 관점 사용성)

---

## 구현 요구사항

### 1. 필수 필드에 * 마킹 (P1-1)

**파일**: `src/components/submission-form.tsx`

**변경 사항**:
```typescript
// 현재:
<label className="text-sm font-semibold">제목</label>

// 변경:
<label className="text-sm font-semibold">
  제목 <span className="text-red-500">*</span>
</label>
```

**필수 필드**: 제목, 의견 내용, 카테고리, 긴급도, 범위, 조직, 안전 동의

**선택 필드 표시** (추가):
```typescript
<label className="text-sm font-semibold text-[var(--color-muted)]">
  의견 톤 <span className="text-xs">(선택사항)</span>
</label>
```

---

### 2. 제출 완료 후 CTA 버튼 (P1-2)

**파일**: `src/components/submission-form.tsx`

**현재 코드** (line 68-80):
```typescript
if (submitted) {
  return (
    <Card className="p-8">
      <h2 className="text-xl font-semibold">의견 제출이 완료되었습니다.</h2>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        익명 제출을 기본으로 안내하며, HR 팀은 의견을 개인이 아닌 패턴으로
        해석합니다. 조직 개선을 위한 다음 단계를 준비하겠습니다.
      </p>
      <Button className="mt-6" onClick={() => setSubmitted(false)}>
        추가 의견 작성하기
      </Button>
    </Card>
  );
}
```

**변경**: 제출 조직을 저장하고, 완료 화면에 3개의 다음 행동 버튼 추가

```typescript
const [submittedOrgId, setSubmittedOrgId] = useState<string>("");

const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  if (!validate()) return;
  setSubmittedOrgId(form.organizationId); // 조직 저장
  setSubmitted(true);
};

if (submitted) {
  const submittedOrg = organizationTree.find(org => 
    isOrgInTree(org, submittedOrgId)
  );
  const submittedOrgSlug = submittedOrg?.slug || "";
  
  return (
    <Card className="p-8 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">✅ 안전하게 제출되었습니다</h2>
        <p className="text-sm text-[var(--color-muted)]">
          당신의 의견은 <strong>{submittedOrg?.name}</strong> 게시판에 
          익명으로 등록되었습니다.
        </p>
      </div>
      
      <div className="border-t pt-6 space-y-3">
        <p className="text-sm font-semibold">다음 단계</p>
        
        <Button asChild variant="outline" className="w-full justify-start h-auto">
          <Link href={`/boards/${submittedOrgSlug}`} className="flex flex-col items-start py-3">
            <span className="font-semibold">👉 제출한 의견 보러 가기</span>
            <span className="text-xs text-muted">같은 조직의 다른 의견들도 확인하세요</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full justify-start h-auto">
          <Link href="/submit" className="flex flex-col items-start py-3">
            <span className="font-semibold">✏️ 다른 의견 더 제출하기</span>
            <span className="text-xs text-muted">추가 의견이 있으시면 언제든 제출하세요</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full justify-start h-auto">
          <Link href="/insights" className="flex flex-col items-start py-3">
            <span className="font-semibold">📊 조직 인사이트 보기</span>
            <span className="text-xs text-muted">의견들이 어떻게 집계되는지 확인하세요</span>
          </Link>
        </Button>
      </div>
      
      <Button 
        className="w-full mt-2"
        onClick={() => setSubmitted(false)}
        variant="ghost"
      >
        폼 초기화하기
      </Button>
    </Card>
  );
}
```

**필요한 헬퍼 함수**:
```typescript
// 조직 트리에서 ID로 조직 찾기
function findOrgInTree(
  tree: OrganizationTreeNode[], 
  orgId: string
): OrganizationTreeNode | undefined {
  for (const node of tree) {
    if (node.id === orgId) return node;
    const found = findOrgInTree(node.children, orgId);
    if (found) return found;
  }
  return undefined;
}
```

---

### 3. 오디오 필드 현실적 메시지 (P1-3)

**파일**: `src/components/submission-form.tsx`

**현재 코드** (line 112-126):
```typescript
<div>
  <label className="text-sm font-semibold">오디오 파일 업로드</label>
  <input
    type="file"
    accept="audio/*"
    className="mt-2 block w-full text-sm"
    onChange={(event) =>
      updateField("audioFile", event.target.files?.[0]?.name ?? "")
    }
  />
  <p className="mt-2 text-xs text-[var(--color-muted)]">
    텍스트 작성이 어렵다면 음성으로 남겨주세요. 전사는 자동 처리됩니다.
    개인 식별 정보가 포함되지 않도록 유의해주세요.
  </p>
</div>
```

**변경**:
```typescript
<div>
  <label className="text-sm font-semibold">
    오디오 파일 업로드 <span className="text-xs text-muted">(선택)</span>
  </label>
  <input
    type="file"
    accept="audio/*"
    className="mt-2 block w-full text-sm"
    onChange={(event) =>
      updateField("audioFile", event.target.files?.[0]?.name ?? "")
    }
  />
  <div className="mt-2 rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-900">
    <p className="font-semibold mb-1">ℹ️ 현재 단계</p>
    <p>
      음성 파일은 HR 팀이 수동으로 검토하고 텍스트로 변환합니다.
      텍스트 입력이 더 빠른 처리가 가능합니다.
      개인 식별 정보가 포함되지 않도록 유의해주세요.
    </p>
  </div>
</div>
```

---

### 4. 에러 메시지 요약 표시 (P1-4)

**파일**: `src/components/submission-form.tsx`

**추가**: 제출 실패 시 상단에 에러 요약 카드

```typescript
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  if (!validate()) {
    // 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  setSubmitted(true);
};

// JSX 최상단에 추가:
return (
  <form onSubmit={handleSubmit} className="space-y-6">
    {Object.keys(errors).length > 0 && (
      <Card className="border border-red-300 bg-red-50 p-4 space-y-2">
        <p className="font-semibold text-red-900 text-sm">다음을 확인해주세요:</p>
        <ul className="space-y-1 text-sm text-red-800">
          {Object.values(errors).map((error, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span>•</span>
              <span>{error}</span>
            </li>
          ))}
        </ul>
      </Card>
    )}
    
    {/* 기존 폼 필드들... */}
  </form>
);
```

---

## 테스트 체크리스트

### 기능 테스트
- [ ] P1-1: 모든 필수 필드에 * 표시 확인
- [ ] P1-1: 선택 필드에 "(선택사항)" 텍스트 확인
- [ ] P1-2: 제출 후 조직명이 완료 메시지에 표시됨
- [ ] P1-2: 3개의 CTA 버튼이 클릭 가능함
- [ ] P1-2: CTA 링크가 올바른 페이지로 이동
- [ ] P1-3: 오디오 필드에 현실적 메시지 표시
- [ ] P1-4: 필드를 비우고 제출 시 에러 요약이 상단에 표시됨
- [ ] P1-4: 모든 에러 메시지가 요약에 포함됨

### UX 테스트 (3명 직원)
- [ ] 필드 혼동이 줄었는가? (이전 대비 주관적 평가)
- [ ] 제출 완료 후 다음 할 일이 명확한가?
- [ ] 제출이 정말 완료됐다고 느껴지는가?

### 회귀 테스트
- [ ] 기존 폼 제출 동작 (validate → setSubmitted)
- [ ] 성공/실패 케이스 모두 동작
- [ ] 모바일 반응형 유지 (레이아웃 깨짐 없음)

---

## 추정 소요 시간
- P1-1: 30분 (스타일만 추가)
- P1-2: 1.5시간 (버튼 + 헬퍼 함수)
- P1-3: 15분 (텍스트 변경)
- P1-4: 1.5시간 (에러 요약 로직)

**총 4시간 (당일 완료 가능)**

---

## 구현 후 검증
1. 로컬에서 폼 제출 전체 흐름 테스트
2. 필드 검증 테스트 (필수 필드 빈 상태 제출 시도)
3. 에러 메시지 정렬 및 가독성 확인
4. 모바일 (iPhone SE) 화면 비율 테스트
```

---

### Phase 2: 사용성 개선 (P2-1 ~ P2-4)

```markdown
# Codex Build Prompt: VOE Listening Platform - Phase 2 (UX Enhancement)

## 목표
조직 선택 혼동 및 폼 필드 명확성 개선으로 사용성 대폭 향상

## 배경
- Phase 1 후 직원 피드백: "조직 선택이 헷갈린다", "필드가 많다"
- 조직 선택기가 깊은 계층을 표현하기 어려움
- 필수/선택 필드 시각적 구분 부족

## 우선순위
1. P2-1: 조직 선택기 (가장 큰 문제, 복잡도 높음)
2. P2-2: 필드 구분 (간단하지만 명확성 높음)
3. P2-3: 폼 필드 순서 (컨텍스트 개선)
4. P2-4: 보드 페이지 상호작용 (선택적)

---

## 구현 요구사항

### P2-1: 조직 선택기 개선 (옵션 선택)

**파일**: `src/components/organization-selector.tsx`

#### 옵션 A: 빠른 개선 (< 1시간)
`<optgroup>`을 사용하여 그룹화

```typescript
export function OrganizationSelector({
  tree,
  value,
  onChange,
  includeAll = false,
  allLabel = "전체 조직",
  placeholder = "조직을 선택해주세요",
}: {...}) {
  const options = React.useMemo(() => {
    const rows: { 
      id: string; 
      name: string; 
      depth: number;
      parentName?: string;
    }[] = [];
    
    const walk = (node: OrganizationTreeNode, depth: number, parentName?: string) => {
      rows.push({ id: node.id, name: node.name, depth, parentName });
      node.children.forEach((child) => walk(child, depth + 1, node.name));
    };

    tree.forEach((node) => walk(node, 0));
    return rows;
  }, [tree]);

  // 그룹화: parentName별로 groupBy
  const grouped = React.useMemo(() => {
    const groups = new Map<string, typeof options>();
    options.forEach(opt => {
      const key = opt.parentName || 'root';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(opt);
    });
    return groups;
  }, [options]);

  return (
    <Select
      value={value ?? ""}
      onChange={(event) => onChange?.(event.target.value)}
    >
      <option value="">{includeAll ? allLabel : placeholder}</option>
      {Array.from(grouped.entries()).map(([groupName, items]) => (
        groupName === 'root' ? (
          items.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))
        ) : (
          <optgroup key={groupName} label={groupName}>
            {items.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {"  "}{opt.name}
              </option>
            ))}
          </optgroup>
        )
      ))}
    </Select>
  );
}
```

#### 옵션 B: 권장 개선 (2~3시간) - 검색 가능한 콤보박스

새 파일: `src/components/organization-combobox.tsx`

```typescript
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { OrganizationTreeNode } from '@/types';

interface OrganizationOption {
  id: string;
  name: string;
  path: string; // "센터 > 부서 > 팀"
}

export function OrganizationCombobox({
  tree,
  value,
  onChange,
  placeholder = '조직을 검색해주세요',
}: {
  tree: OrganizationTreeNode[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  const [search, setSearch] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  // 플랫 옵션 + 경로 생성
  const allOptions = React.useMemo(() => {
    const opts: OrganizationOption[] = [];
    const walk = (node: OrganizationTreeNode, path: string[]) => {
      const fullPath = [...path, node.name];
      opts.push({
        id: node.id,
        name: node.name,
        path: fullPath.join(' > '),
      });
      node.children.forEach((child) => walk(child, fullPath));
    };
    tree.forEach((node) => walk(node, []));
    return opts;
  }, [tree]);

  // 검색 필터링
  const filtered = React.useMemo(() => {
    if (!search) return allOptions;
    const query = search.toLowerCase();
    return allOptions.filter(
      (opt) =>
        opt.name.toLowerCase().includes(query) ||
        opt.path.toLowerCase().includes(query)
    );
  }, [search, allOptions]);

  const selected = allOptions.find((opt) => opt.id === value);

  return (
    <div className="relative w-full">
      {/* 선택 표시 또는 입력 필드 */}
      {selected && !isOpen ? (
        <div className="rounded-lg border border-[var(--color-border)] p-3 space-y-1 cursor-pointer hover:bg-gray-50"
          onClick={() => setIsOpen(true)}>
          <p className="font-semibold text-sm">{selected.name}</p>
          <p className="text-xs text-[var(--color-muted)]">{selected.path}</p>
          <button
            className="text-xs text-[var(--color-accent-strong)] underline mt-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            변경
          </button>
        </div>
      ) : (
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full"
        />
      )}

      {/* 드롭다운 */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 p-2 space-y-2 max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)] p-2">
              "조직을 찾을 수 없습니다
            </p>
          ) : (
            filtered.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onChange?.(opt.id);
                  setSearch('');
                  setIsOpen(false);
                }}
                className="w-full text-left p-3 rounded hover:bg-gray-100 space-y-1 transition-colors"
              >
                <p className="font-semibold text-sm">{opt.name}</p>
                <p className="text-xs text-[var(--color-muted)]">{opt.path}</p>
              </button>
            ))
          )}
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2"
            onClick={() => {
              setIsOpen(false);
              setSearch('');
            }}
          >
            닫기
          </Button>
        </Card>
      )}
    </div>
  );
}
```

**submission-form.tsx 변경**:
```typescript
// import 변경
import { OrganizationCombobox } from "@/components/organization-combobox";
// 또는 기존 OrganizationSelector 개선 선택

<OrganizationCombobox
  tree={organizationTree}
  value={form.organizationId}
  onChange={(value) => updateField("organizationId", value)}
/>
```

---

### P2-2: 필수/선택 필드 시각적 구분

**파일**: `src/components/submission-form.tsx`

모든 label에 명시:

```typescript
// 필수 필드
<label className="text-sm font-semibold">
  제목 <span className="text-red-500">*</span>
</label>

// 선택 필드
<label className="text-sm font-semibold text-[var(--color-muted)]">
  의견 톤
  <span className="text-xs ml-2">(선택사항)</span>
</label>
```

모든 필드 리스트:
- 제목: 필수 *
- 의견 내용: 필수 *
- 오디오: 선택
- 카테고리: 필수 *
- 의견 톤: 선택
- 긴급도: 필수 *
- 범위: 필수 *
- 조직: 필수 *
- 익명: 기본 선택
- 안전 동의: 필수 *

---

### P2-3: 폼 필드 순서 최적화

**현재 순서**:
1. 제목
2. 의견 내용
3. 오디오
4. 카테고리, 의견 톤, 긴급도, 범위
5. 조직 선택 ← **여기**

**변경 순서**:
1. 제목
2. 의견 내용
3. 오디오
4. **조직 선택** ← **위로 이동** (맥락 설정)
5. 카테고리, 의견 톤, 긴급도, 범위
6. 익명 여부, 안전 동의

**이유**: 조직을 먼저 선택하면, "내 부서에 관련된 의견을 남기는 구나" 맥락이 생김

**코드 변경**: 렌더링 순서 재배열

---

### P2-4: 조직 보드 페이지 상호작용

**파일**: `src/app/(public)/boards/page.tsx`

현재: 트리와 카드가 독립적

변경: 트리 클릭 → 해당 조직 보드로 이동 또는 카드 강조

```typescript
export default function BoardsPage() {
  const tree = organizationRepository.getTree();
  const voices = voiceRepository.list();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      {/* ... 헤더 ... */}
      
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h2 className="text-base font-semibold">
            조직을 선택하면 보드로 이동합니다
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            트리의 조직을 클릭하세요.
          </p>
          <div className="mt-6">
            <OrganizationTree 
              tree={tree}
              onSelectOrg={(orgId) => {
                const org = findOrgInTree(tree, orgId);
                if (org) {
                  router.push(`/boards/${org.slug}`);
                }
              }}
            />
          </div>
        </Card>

        {/* 카드 리스트는 유지 */}
        <div className="grid gap-4">
          {/* ... */}
        </div>
      </div>
    </div>
  );
}
```

**organization-tree.tsx 업데이트**:
```typescript
export function OrganizationTree({
  tree,
  onSelectOrg,
}: {
  tree: OrganizationTreeNode[];
  onSelectOrg?: (orgId: string) => void;
}) {
  return (
    <ul className="space-y-2">
      {tree.map((node) => (
        <OrganizationTreeNode
          key={node.id}
          node={node}
          onSelect={() => onSelectOrg?.(node.id)}
        />
      ))}
    </ul>
  );
}

function OrganizationTreeNode({
  node,
  onSelect,
}: {
  node: OrganizationTreeNode;
  onSelect: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <li>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          onSelect();
        }}
        className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors font-semibold text-sm"
      >
        {node.children.length > 0 && (
          <span className="mr-2">{isOpen ? '▼' : '▶'}</span>
        )}
        {node.name}
      </button>
      {isOpen && node.children.length > 0 && (
        <ul className="ml-4 space-y-1 mt-1">
          {node.children.map((child) => (
            <OrganizationTreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
```

---

## 테스트 체크리스트

### P2-1: 조직 선택기
- [ ] 드롭다운/콤보박스가 모든 조직을 표시
- [ ] 깊은 레벨 조직도 선택 가능
- [ ] 옵션 B 선택 시: 검색 필터링 동작
- [ ] 옵션 B 선택 시: 경로(path) 표시 정확

### P2-2: 필드 구분
- [ ] 모든 필수 필드에 * 표시
- [ ] 모든 선택 필드에 "(선택사항)" 표시
- [ ] 색상/스타일 일관성

### P2-3: 필드 순서
- [ ] 조직이 카테고리보다 위에 있음
- [ ] 폼 논리적 흐름: 핵심(제목, 내용, 조직) → 상세(카테고리 등)

### P2-4: 보드 페이지
- [ ] 트리 클릭 → 보드 페이지로 이동
- [ ] URL이 올바른 조직 slug로 변경됨
- [ ] 모바일에서 레이아웃 깨짐 없음

---

## 추정 소요 시간
- P2-1A (그룹화): 1시간
- P2-1B (콤보박스): 2~3시간
- P2-2: 1시간
- P2-3: 1시간
- P2-4: 1.5시간

**총 5~7시간 (2~3일)**

---

## 구현 전략
1. P2-2, P2-3 먼저 (간단, 빠름)
2. P2-1 선택 (그룹화 vs 콤보박스)
3. P2-4 (선택적)
```

---

### Phase 3: 고급 개선 (P3-1 ~ P3-3)

```markdown
# Codex Build Prompt: VOE Listening Platform - Phase 3 (Advanced UX)

## 목표
2단계 폼 리팩토링으로 근본적인 폼 복잡도 해소

## 배경
- Phase 2 이후에도 "폼이 좀 길다"는 피드백 지속
- 2단계 폼으로 첫 진입장벽을 낮추고, 추가 정보는 선택적으로 느껴지게 하기

## 우선순위
1. P3-1: 2단계 폼 (근본 개선)
2. P3-2: 모바일 최적화 (접근성)
3. P3-3: 쿠키 저장 (편의)

---

## 구현 요구사항

### P3-1: 2단계 폼 리팩토링

**목표 UX**:

```
=== 1단계: 핵심 의견 (60% 직원이 이것만 원함)
[제목]
[내용 또는 음성]
[조직]

[다음] 버튼

=== 2단계: 상세 정보 (선택적으로 느껴짐)
[카테고리]
[긴급도]
[범위]
[익명 동의] [안전 동의]

[제출]
```

**파일 구조**:

```
src/components/
├── submission-form.tsx (리팩토링: 메인 상태 관리)
├── submission-form-step1.tsx (새로 생성)
└── submission-form-step2.tsx (새로 생성)
```

**submission-form.tsx** (메인):

```typescript
'use client';

import * as React from 'react';
import { SubmissionFormStep1 } from './submission-form-step1';
import { SubmissionFormStep2 } from './submission-form-step2';
import { OrganizationTreeNode } from '@/types';

export function SubmissionForm({
  organizationTree,
  initialOrganizationId,
}: {
  organizationTree: OrganizationTreeNode[];
  initialOrganizationId?: string;
}) {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [submittedOrgId, setSubmittedOrgId] = React.useState('');
  
  const [form, setForm] = React.useState({
    title: '',
    content: '',
    category: '',
    sentiment: '',
    urgency: '',
    scope: '',
    organizationId: initialOrganizationId ?? '',
    isAnonymous: true,
    agreement: false,
    audioFile: '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleStep1Submit = (formData: typeof form) => {
    // Step 1 검증 (제목, 내용 or 오디오, 조직)
    const step1Errors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      step1Errors.title = '제목을 입력해주세요.';
    }
    if (!formData.content.trim() && !formData.audioFile) {
      step1Errors.content = '텍스트 또는 오디오 중 하나는 반드시 입력해주세요.';
    }
    if (!formData.organizationId) {
      step1Errors.organizationId = '조직을 선택해주세요.';
    }
    
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return;
    }
    
    setForm(formData);
    setErrors({});
    setStep(2);
  };

  const handleStep2Submit = (formData: typeof form) => {
    // Step 2 검증 (카테고리, 긴급도, 범위, 동의)
    const step2Errors: Record<string, string> = {};
    
    if (!formData.category) {
      step2Errors.category = '카테고리를 선택해주세요.';
    }
    if (!formData.urgency) {
      step2Errors.urgency = '긴급도를 선택해주세요.';
    }
    if (!formData.scope) {
      step2Errors.scope = '의견 범위를 선택해주세요.';
    }
    if (!formData.agreement) {
      step2Errors.agreement = '안전한 의견 작성에 동의해주세요.';
    }
    
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setForm(formData);
    setSubmittedOrgId(formData.organizationId);
    setSubmitted(true);
  };

  if (submitted) {
    return <SubmissionSuccess organizationId={submittedOrgId} organizationTree={organizationTree} />;
  }

  return (
    <div className="space-y-6">
      {step === 1 && (
        <SubmissionFormStep1
          form={form}
          errors={errors}
          organizationTree={organizationTree}
          onSubmit={handleStep1Submit}
        />
      )}
      
      {step === 2 && (
        <SubmissionFormStep2
          form={form}
          errors={errors}
          onBack={() => setStep(1)}
          onSubmit={handleStep2Submit}
        />
      )}
    </div>
  );
}

function SubmissionSuccess({
  organizationId,
  organizationTree,
}: {
  organizationId: string;
  organizationTree: OrganizationTreeNode[];
}) {
  const org = findOrgInTree(organizationTree, organizationId);
  
  return (
    <Card className="p-8 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">✅ 안전하게 제출되었습니다</h2>
        <p className="text-sm text-[var(--color-muted)]">
          당신의 의견은 <strong>{org?.name}</strong> 게시판에 
          익명으로 등록되었습니다.
        </p>
      </div>
      
      <div className="border-t pt-6 space-y-3">
        <p className="text-sm font-semibold">다음 단계</p>
        
        <Button asChild variant="outline" className="w-full justify-start h-auto">
          <Link href={`/boards/${org?.slug}`} className="flex flex-col items-start py-3">
            <span className="font-semibold">👉 제출한 의견 보러 가기</span>
            <span className="text-xs text-muted">같은 조직의 다른 의견들도 확인하세요</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full justify-start h-auto">
          <Link href="/submit" className="flex flex-col items-start py-3">
            <span className="font-semibold">✏️ 다른 의견 더 제출하기</span>
            <span className="text-xs text-muted">추가 의견이 있으시면 언제든 제출하세요</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full justify-start h-auto">
          <Link href="/insights" className="flex flex-col items-start py-3">
            <span className="font-semibold">📊 조직 인사이트 보기</span>
            <span className="text-xs text-muted">의견들이 어떻게 집계되는지 확인하세요</span>
          </Link>
        </Button>
      </div>
    </Card>
  );
}

function findOrgInTree(
  tree: OrganizationTreeNode[],
  orgId: string
): OrganizationTreeNode | undefined {
  for (const node of tree) {
    if (node.id === orgId) return node;
    const found = findOrgInTree(node.children, orgId);
    if (found) return found;
  }
  return undefined;
}
```

**submission-form-step1.tsx** (새로 생성):

```typescript
'use client';

import * as React from 'react';
import { OrganizationCombobox } from '@/components/organization-combobox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OrganizationTreeNode } from '@/types';

export function SubmissionFormStep1({
  form,
  errors,
  organizationTree,
  onSubmit,
}: {
  form: any;
  errors: Record<string, string>;
  organizationTree: OrganizationTreeNode[];
  onSubmit: (form: any) => void;
}) {
  const [localForm, setLocalForm] = React.useState(form);

  const handleChange = (key: string, value: string | boolean) => {
    setLocalForm((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(localForm);
      }}
      className="space-y-6"
    >
      <Card className="space-y-6 p-6">
        <div>
          <label className="text-sm font-semibold">
            제목 <span className="text-red-500">*</span>
          </label>
          <Input
            value={localForm.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="예: 일정 변경 공지가 너무 늦게 전달됩니다"
          />
          {errors.title && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">
            의견 내용 <span className="text-red-500">*</span>
            <span className="text-xs text-muted ml-2">(텍스트 또는 음성 필수)</span>
          </label>
          <Textarea
            value={localForm.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="상황, 영향, 바라는 개선점을 자유롭게 적어주세요."
          />
          {errors.content && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.content}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">
            오디오 파일 업로드
            <span className="text-xs text-muted ml-2">(선택사항)</span>
          </label>
          <input
            type="file"
            accept="audio/*"
            className="mt-2 block w-full text-sm"
            onChange={(e) => handleChange('audioFile', e.target.files?.[0]?.name ?? '')}
          />
          <p className="mt-2 text-xs text-blue-900 bg-blue-50 p-2 rounded">
            ℹ️ 현재: HR 팀이 수동으로 텍스트 변환합니다. 텍스트 입력이 더 빠릅니다.
          </p>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div>
          <label className="text-sm font-semibold">
            조직 선택 <span className="text-red-500">*</span>
          </label>
          <OrganizationCombobox
            tree={organizationTree}
            value={localForm.organizationId}
            onChange={(value) => handleChange('organizationId', value)}
          />
          {errors.organizationId && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.organizationId}</p>
          )}
        </div>
      </Card>

      <div className="flex items-center justify-between pt-4">
        <p className="text-xs text-[var(--color-muted)]">
          다음 단계에서 추가 정보를 입력할 수 있습니다.
        </p>
        <Button type="submit">다음 단계 →</Button>
      </div>
    </form>
  );
}
```

**submission-form-step2.tsx** (새로 생성):

```typescript
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';
import {
  categoryLabels,
  sentimentLabels,
  scopeLabels,
  urgencyLabels,
} from '@/lib/labels';

const categories = Object.entries(categoryLabels);
const sentiments = Object.entries(sentimentLabels);
const urgencies = Object.entries(urgencyLabels);
const scopes = Object.entries(scopeLabels);

export function SubmissionFormStep2({
  form,
  errors,
  onBack,
  onSubmit,
}: {
  form: any;
  errors: Record<string, string>;
  onBack: () => void;
  onSubmit: (form: any) => void;
}) {
  const [localForm, setLocalForm] = React.useState(form);

  const handleChange = (key: string, value: string | boolean) => {
    setLocalForm((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(localForm);
      }}
      className="space-y-6"
    >
      {Object.keys(errors).length > 0 && (
        <Card className="border border-red-300 bg-red-50 p-4 space-y-2">
          <p className="font-semibold text-red-900 text-sm">다음을 확인해주세요:</p>
          <ul className="space-y-1 text-sm text-red-800">
            {Object.values(errors).map((error, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span>•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="space-y-6 p-6">
        <p className="text-sm font-semibold text-[var(--color-muted)]">
          의견의 맥락을 정해주세요
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <Select
              value={localForm.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="">카테고리를 선택해주세요</option>
              {categories.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            {errors.category && (
              <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-[var(--color-muted)]">
              의견 톤 <span className="text-xs">(선택사항)</span>
            </label>
            <Select
              value={localForm.sentiment}
              onChange={(e) => handleChange('sentiment', e.target.value)}
            >
              <option value="">선택 (선택사항)</option>
              {sentiments.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="text-sm font-semibold">
              긴급도 <span className="text-red-500">*</span>
            </label>
            <Select
              value={localForm.urgency}
              onChange={(e) => handleChange('urgency', e.target.value)}
            >
              <option value="">선택해주세요</option>
              {urgencies.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            {errors.urgency && (
              <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.urgency}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">
              범위 <span className="text-red-500">*</span>
            </label>
            <Select
              value={localForm.scope}
              onChange={(e) => handleChange('scope', e.target.value)}
            >
              <option value="">선택해주세요</option>
              {scopes.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            {errors.scope && (
              <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.scope}</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={localForm.isAnonymous}
            onChange={(e) => handleChange('isAnonymous', e.target.checked)}
          />
          <div>
            <p className="text-sm font-semibold">익명으로 제출합니다</p>
            <p className="text-xs text-[var(--color-muted)]">
              개인 식별 정보 없이 조직 개선 목적에만 사용됩니다.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            checked={localForm.agreement}
            onChange={(e) => handleChange('agreement', e.target.checked)}
          />
          <div>
            <p className="text-sm font-semibold">안전하고 존중하는 의견 작성에 동의합니다</p>
            <p className="text-xs text-[var(--color-muted)]">
              개인 지목·비난보다 개선에 도움이 되는 의견을 남깁니다.
            </p>
          </div>
        </div>
        {errors.agreement && (
          <p className="text-xs text-[var(--color-danger)]">{errors.agreement}</p>
        )}
      </Card>

      <div className="flex items-center justify-between pt-4 gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          ← 이전 단계
        </Button>
        <Button type="submit">안전하게 제출하기</Button>
      </div>
    </form>
  );
}
```

---

### P3-2: 모바일 반응형 최적화

**파일**: 전체 컴포넌트의 CSS

```css
/* 터치 타겟 확보 */
button, input, select {
  min-height: 44px;
  min-width: 44px;
}

/* 폰트 크기: iOS 줌 방지 */
@media (max-width: 768px) {
  input,
  select,
  textarea {
    font-size: 16px; /* 16px 이상이어야 줌 방지 */
  }
}

/* 키보드 올라올 때 입력 가림 방지 */
@media (max-height: 700px) {
  form {
    padding-bottom: 50vh; /* 여유 공간 */
  }
}
```

---

### P3-3: 최근 조직 선택 저장

**파일**: `src/components/submission-form.tsx` (메인)

```typescript
React.useEffect(() => {
  // 초기값: URL 파라미터 > localStorage > 빈 상태
  const savedOrgId = localStorage.getItem('lastSelectedOrgId');
  if (!initialOrganizationId && savedOrgId) {
    setForm(prev => ({ ...prev, organizationId: savedOrgId }));
  }
}, []);

const handleOrgChange = (orgId: string) => {
  localStorage.setItem('lastSelectedOrgId', orgId);
  // ...
};
```

---

## 테스트 체크리스트

### P3-1: 2단계 폼
- [ ] Step 1에서 필수 필드 검증 동작
- [ ] "다음 단계 →" 버튼 클릭 → Step 2로 이동
- [ ] Step 2에서 "← 이전 단계" → Step 1로 복귀 (데이터 유지)
- [ ] Step 2에서 필수 필드 검증 동작
- [ ] 제출 → 완료 화면으로 이동
- [ ] 모바일 반응형 (스택 레이아웃)

### P3-2: 모바일 최적화
- [ ] iPhone SE (375px)에서 버튼/입력 터치 가능
- [ ] Android (360px)에서 드롭다운 선택 가능
- [ ] 키보드 올라올 때 입력 필드 가림 없음
- [ ] 텍스트 확대 없이 가독성 OK

### P3-3: 로컬스토리지
- [ ] 조직 선택 후 새로고침 → 같은 조직 프리셋
- [ ] 다른 조직 선택 → localStorage 업데이트

---

## 추정 소요 시간
- P3-1: 3~4시간 (구조 변경, 상태 관리)
- P3-2: 1~2시간 (CSS 수정, 테스트)
- P3-3: 30분~1시간

**총 5~7시간 (2~3일)**

---

## 구현 전략
1. P3-1 (2단계 폼) 먼저 - 구조적 변경
2. 테스트 후 P3-2 (모바일) - CSS 최적화
3. P3-3 (쿠키) - 선택적 개선
```

---

## 📊 전체 로드맵 요약

| Phase | 기간 | 점수 | 주요 개선 | 누적 효과 |
|-------|------|------|---------|---------|
| **P1** | 3~4일 | 74~83 | 필수 표시, CTA, 메시지 | 신뢰도 ↑ |
| **P2** | 5~7일 | 65~75 | 조직 선택, 필드 순서 | 완료율 ↑10% |
| **P3** | 5~7일 | 52~71 | 2단계 폼, 모바일 | 완료율 ↑15% |

**총 소요 시간**: 13~18일 (약 2.5~3.5주)

---

## 다음 단계

1. Phase 1 Codex 프롬프트 실행
2. Phase 1 테스트 & 검증 (3~4일)
3. 직원 피드백 수집
4. Phase 2 시작

---

**작성일**: 2026-04-03
```

---

## 📋 요약: 실행 체크리스트

```markdown
# 실행 체크리스트

## Phase 1: 긴급 (3~4일) - MVP 준비
- [ ] Codex Build Prompt: Phase 1 실행
- [ ] P1-1: 필수 필드 * 마킹
- [ ] P1-2: 제출 완료 후 CTA 버튼
- [ ] P1-3: 오디오 메시지 수정
- [ ] P1-4: 에러 요약 표시
- [ ] 전체 QA (기능 + UX)
- [ ] 내부 테스트 (3명 직원)

## Phase 2: 높음 (5~7일) - 사용성 개선
- [ ] Codex Build Prompt: Phase 2 실행
- [ ] P2-1: 조직 선택기 (그룹화 또는 콤보박스)
- [ ] P2-2: 필드 구분 (필수/선택)
- [ ] P2-3: 필드 순서 최적화
- [ ] P2-4: 보드 페이지 상호작용 (선택)
- [ ] 전체 QA
- [ ] 직원 피드백

## Phase 3: 중간 (5~7일) - 고급 개선
- [ ] Codex Build Prompt: Phase 3 실행
- [ ] P3-1: 2단계 폼 리팩토링
- [ ] P3-2: 모바일 반응형 최적화
- [ ] P3-3: 최근 조직 선택 저장 (선택)
- [ ] 전체 QA
- [ ] 성능 테스트

## 최종 검증
- [ ] MVP 런칭 전 Phase 1+2 완료
- [ ] Phase 3는 Phase 2 후 평가
```

---

**보고서 작성**: 2026-04-03  
**기준 문서**:
- COMMUNICATION_PLATFORM_EVALUATION.md
- USER_UX_EVALUATION.md
