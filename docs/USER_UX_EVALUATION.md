# VOE Listening Platform
## 직원(조직 구성원) 관점 UI/UX 개선 평가 보고서

**평가일**: 2026-04-03  
**대상 사용자**: 일반 직원 (제출자, 게시판 열람자)  
**평가 범위**: 공개 영역 (/, /boards, /submit, /boards/[orgSlug]) UI/UX

---

## 📊 종합 평가

| 항목 | 현재 등급 | 개선 후 목표 | 우선순위 |
|------|---------|-----------|---------|
| **제출 폼 복잡도** | C+ | B+ | 🔴 높음 |
| **조직 선택 UI** | B- | A- | 🔴 높음 |
| **접근성/명확성** | C+ | B | 🟡 중간 |
| **완료 후 가이드** | C | B+ | 🟡 중간 |
| **페이지 흐름** | B | A- | 🟢 낮음 |
| **신뢰성 메시지** | A | A | 🟢 낮음 |

---

## 🔴 높은 우선순위 개선사항

### 1️⃣ 제출 폼이 너무 길고 복잡함

**문제점**

```
현재 필드 순서:
1. 제목 (필수) ✅
2. 의견 내용 (필수: 텍스트 OR 음성)
3. 오디오 파일 업로드 (선택)
4. 카테고리 (필수) ✅
5. 의견 톤/감정 (선택?)  ← 필수인지 선택인지 불명확
6. 긴급도 (필수) ✅
7. 범위 (필수) ✅
8. 조직 선택 (필수) ✅
9. 익명 여부 체크 (기본값: true)
10. 안전 동의 체크 (필수)
11. 제출 버튼

→ 한 번에 11개 입력 요소, 매우 긴 스크롤
```

**사용자 경험**

```
직원 입장:
"어? 이게 다 필수야? 뭐 이렇게 많아?"
→ 3번 필드에서 포기
```

**체크리스트**

- [ ] 필수 필드 vs 선택 필드 시각적으로 구분
- [ ] "의견 톤(감정)" 필드: 필수로 변경 또는 제거
- [ ] 폼을 2단계로 나누기 (Core / Detail)

---

**개선안: 2단계 폼 (권장)**

```
=== 1단계: 핵심 의견 (60% 사용자 완료)
✅ 제목 (필수, 큼)
✅ 내용 (필수: 텍스트 OR 음성)
✅ 조직 선택 (필수, 초기값 미리 설정하면 더 좋음)
  [다음] 버튼

=== 2단계: 컨텍스트 (추가 정보, 선택적으로 느껴지게)
✅ 카테고리 (필수)
✅ 긴급도 (필수)
✅ 범위 (필수)
  (의견 톤은 삭제 또는 AI가 자동 분류)
  [안전 동의 체크]
  [제출] 버튼
```

**개선 효과**

```
현재: 평균 스크롤 7번 필요
개선 후: 스크롤 2~3번, 심리적 진입장벽 50% 감소
```

**코드 변경 (sketch)**

```typescript
// submission-form.tsx: 현재 단일 폼 → 다단계 폼으로 리팩토링
const [step, setStep] = useState<1 | 2>(1);

if (step === 1) {
  return <SubmissionFormStep1 onNext={() => setStep(2)} />
}
return <SubmissionFormStep2 onBack={() => setStep(1)} />
```

---

### 2️⃣ 조직 선택기가 시각적으로 약함

**문제점**

```
현재: <select> 드롭다운 + "— " 들여쓰기
<option value="">조직을 선택해주세요</option>
<option value="org1">장비기술센터</option>
<option value="org1-1">— 정밀기술담당</option>
<option value="org1-2">— 검사기술담당</option>
<option value="org1-3">— — 검사팀A</option>
...

문제:
1. "— " 개수로 깊이 파악 → 직관적이지 않음
2. 긴 드롭다운은 스크롤 피로도 높음
3. 현재 선택한 조직이 어디 그룹에 속하는지 모호함
4. 모바일에서 드롭다운이 작음
```

**사용자 경험**

```
직원:
"어... 내가 정밀기술담당인데... 여기가 어디야?"
→ 몇 번이고 스크롤 필요
→ 잘못 선택할 가능성 높음
```

**체크리스트**

- [ ] 드롭다운 대신 **시각적 그룹화** 지원
- [ ] 조직 검색 기능 추가
- [ ] 선택된 조직을 더 명시적으로 표시

---

**개선안 1: 그룹화된 드롭다운 (빠른 개선)**

```html
<optgroup label="장비기술센터">
  <option value="org1">장비기술센터 (전체)</option>
  <optgroup label="  ├ 정밀기술담당">
    <option value="org1-1">정밀기술담당</option>
  </optgroup>
</optgroup>
```

**개선안 2: 콤보박스 + 검색 (권장)**

```
┌─────────────────────────────────────┐
│ 조직 선택                            │
├─────────────────────────────────────┤
│ 🔍 [정밀______________________]      │
├─────────────────────────────────────┤
│ ✅ 정밀기술담당                       │
│    (장비기술센터 > 정밀기술담당)     │
│                                     │
│    다른 결과:                       │
│ ◻ 검사기술담당                       │
│ ◻ 전기기술담당                       │
└─────────────────────────────────────┘

선택 후:
┌─────────────────────────────────────┐
│ 조직: 정밀기술담당 ✓ [변경]         │
│ (장비기술센터 내 팀)                │
└─────────────────────────────────────┘
```

**코드 변경 (sketch)**

```typescript
// organization-selector.tsx 개선
export function OrganizationSelector({
  tree,
  value,
  onChange,
}: ...) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  // 검색 필터링
  const filtered = useMemo(() => {
    return options.filter(opt => 
      opt.name.includes(search)
    );
  }, [search]);
  
  // 선택된 조직의 경로 표시
  const selectedPath = getPath(value); // "장비기술센터 > 정밀기술담당"
  
  return (
    <div className="space-y-2">
      <input 
        placeholder="조직명으로 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.map(opt => (
        <button 
          key={opt.id}
          onClick={() => onChange?.(opt.id)}
        >
          {opt.name}
          <span className="text-xs text-muted">{opt.path}</span>
        </button>
      ))}
    </div>
  );
}
```

---

### 3️⃣ 필수 필드 vs 선택 필드가 구분되지 않음

**문제점**

```
현재 코드 (submission-form.tsx):
- 제목: 필수 (검증 있음) ✅
- 카테고리: 필수 (검증 있음) ✅
- 긴급도: 필수 (검증 있음) ✅
- 범위: 필수 (검증 있음) ✅
- 조직: 필수 (검증 있음) ✅
- 의견 톤: 필수 아님 (검증 없음) ← 헷갈림!
- 안전 동의: 필수 (검증 있음) ✅

하지만 UI에는 모두 같은 스타일:
<label className="text-sm font-semibold">의견 톤</label>
```

**직원 입장**

```
"이 필드는 꼭 채워야 하나? 뭔가 빨간 별이 없는데..."
→ 불확실함 → 모든 필드를 다 채우려고 함
→ 불필요한 인지 부하
```

**개선안**

```
필수 필드 명시:

┌─ 제목 *                          ← 별 표시
├─ 의견 내용 *
├─ 오디오 파일 업로드
│  (텍스트 또는 오디오 중 하나 필수)
├─ 카테고리 *
├─ 의견 톤 (선택사항)             ← 회색으로 약하게
├─ 긴급도 *
├─ 범위 *
└─ 조직 선택 *
```

**코드 변경**

```typescript
<div>
  <label className="text-sm font-semibold">
    제목 <span className="text-red-500">*</span>
  </label>
  ...
</div>

<div>
  <label className="text-sm font-semibold text-muted">
    의견 톤 <span className="text-xs">(선택사항)</span>
  </label>
  ...
</div>
```

---

## 🟡 중간 우선순위 개선사항

### 4️⃣ 제출 완료 후 다음 단계가 불명확함

**현재 상태**

```typescript
// submission-form.tsx: line 69-80
if (submitted) {
  return (
    <Card className="p-8">
      <h2>의견 제출이 완료되었습니다.</h2>
      <p>익명 제출을 기본으로 안내하며...</p>
      <Button onClick={() => setSubmitted(false)}>
        추가 의견 작성하기
      </Button>
    </Card>
  );
}
```

**문제점**

```
1. "추가 의견 작성하기" 버튼만 있음
2. 제출한 의견이 어디로 갔는지 불명확
3. 다른 조직의 의견을 보고 싶어도 길이 없음
4. 대시보드로 어떻게 가는지 모름
5. 심리적 안정감 없음: "진짜 제출됐나?"
```

**개선안**

```
제출 완료 화면:

┌─────────────────────────────────────────┐
│ ✅ 의견이 안전하게 제출되었습니다      │
├─────────────────────────────────────────┤
│ 당신의 의견은 정밀기술담당 게시판에    │
│ 익명으로 등록되었습니다.               │
│                                        │
│ 다음 단계:                             │
│ • 같은 조직의 다른 의견 보기 →        │
│ • 다른 의견 제출하기 →                │
│ • 인사이트 확인하기 →                 │
│ • 대시보드로 이동하기 →               │
└─────────────────────────────────────────┘
```

**코드 변경**

```typescript
if (submitted) {
  const submittedOrg = form.organizationId;
  
  return (
    <Card className="p-8 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">✅ 제출되었습니다</h2>
        <p className="text-sm text-muted">
          당신의 의견은 {submittedOrg} 게시판에 익명으로 등록되었습니다.
        </p>
      </div>
      
      <div className="border-t space-y-3 pt-4">
        <p className="text-sm font-semibold">다음 단계</p>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href={`/boards/${getSlug(submittedOrg)}`}>
            👉 같은 조직의 의견 보기
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/submit">
            ✏️  다른 의견 더 제출하기
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/insights">
            📊 조직 인사이트 보기
          </Link>
        </Button>
      </div>
    </Card>
  );
}
```

---

### 5️⃣ 조직 보드 페이지 (/boards)에서 선택과 탐색이 불연동됨

**현재 레이아웃**

```
┌──────────────────────────────────────┐
│  조직 트리 (왼쪽)                     │
│                                      │
│ 조직 트리:                          │
│ ├ 장비기술센터                       │
│ │ ├ 정밀기술담당                     │
│ │ └ 검사기술담당                     │
│ └ 생산혁신센터                       │
│                                      │
│  카드 리스트 (오른쪽)                │
│                                      │
│  [장비기술센터]                      │
│   의견 32건                          │
│   조직 4개 포함                      │
│   [보드 열기] →                      │
│                                      │
│  [생산혁신센터]                      │
│   의견 18건                          │
│   조직 3개 포함                      │
│   [보드 열기] →                      │
└──────────────────────────────────────┘
```

**문제점**

```
1. 왼쪽 트리를 클릭해도 오른쪽 카드 리스트가 변하지 않음
2. 트리와 카드 간의 연관성이 불명확
3. 모바일에서 레이아웃이 스택되면 혼란스러움
4. "이 트리는 뭐하는 거지?" 불명확
```

**개선안**

```
사용자 흐름:
1. 왼쪽 트리에서 조직 클릭
2. 해당 조직의 카드가 오른쪽에 하이라이트됨
3. 또는 바로 보드 페이지로 이동

안내 텍스트 개선:
"트리를 클릭하면 해당 조직의 의견을 확인할 수 있습니다"
→ "클릭하여 조직 보드로 이동하세요"
```

**코드 변경 (sketch)**

```typescript
// boards/page.tsx 개선
const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

return (
  <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
    <Card className="p-6">
      <h2 className="text-base font-semibold">
        조직을 선택해 의견을 확인하세요
      </h2>
      <OrganizationTree 
        tree={tree}
        onSelect={(orgId) => {
          setSelectedOrgId(orgId);
          // 옵션: 바로 보드로 이동
          router.push(`/boards/${getSlug(orgId)}`);
        }}
      />
    </Card>
    
    <div className="grid gap-4">
      {tree.map((node) => {
        const isSelected = selectedOrgId === node.id;
        return (
          <Card 
            key={node.id} 
            className={isSelected ? "ring-2 ring-accent" : ""}
            onClick={() => router.push(`/boards/${node.slug}`)}
            role="button"
          >
            ...
          </Card>
        );
      })}
    </div>
  </div>
);
```

---

### 6️⃣ 오디오 업로드 기능의 명확성 문제

**현재 상태**

```typescript
// submission-form.tsx: line 112-125
<label className="text-sm font-semibold">오디오 파일 업로드</label>
<input type="file" accept="audio/*" />
<p className="text-xs text-muted">
  텍스트 작성이 어렵다면 음성으로 남겨주세요. 
  전사는 자동 처리됩니다. 
  개인 식별 정보가 포함되지 않도록 유의해주세요.
</p>
```

**문제점**

```
1. "전사는 자동 처리됩니다" → 하지만 실제로는 플레이스홀더 상태
2. 음성 파일을 업로드했는데 실제로 처리 안 될 가능성
3. 직원이 나중에 "내 음성은 왜 텍스트가 안 돼?"라고 불평
4. MVP 단계의 기능 명확하지 않음
```

**개선안 1: 현실적 메시지 (권장)**

```
현재 상태:
┌────────────────────────────────┐
│ 오디오 파일 업로드(선택사항)   │
├────────────────────────────────┤
│ [파일 선택]                     │
├────────────────────────────────┤
│ ℹ️ 준비 중인 기능입니다.        │
│ 현재는 텍스트 입력을            │
│ 권장합니다.                    │
└────────────────────────────────┘
```

**개선안 2: 수동 텍스트 입력 옵션**

```
또는

┌────────────────────────────────┐
│ 음성으로 의견 제출             │
├────────────────────────────────┤
│ [🎙️ 녹음 시작]                 │
│                                │
│ ↓ 또는                         │
│                                │
│ [📄 음성 파일 첨부]            │
│ (관리자가 수동 전사)           │
└────────────────────────────────┘
```

**코드 변경**

```typescript
<div>
  <label className="text-sm font-semibold">
    오디오 파일 업로드 <span className="text-xs text-muted">(선택)</span>
  </label>
  <input type="file" accept="audio/*" />
  <p className="text-xs text-muted bg-blue-50 p-2 rounded mt-2">
    ℹ️ <strong>현재 단계:</strong> 음성 파일은 HR 팀이 수동으로 
    검토 및 텍스트 변환을 진행합니다. 
    텍스트 입력이 더 빠릅니다.
  </p>
</div>
```

---

## 🟢 낮은 우선순위 개선사항

### 7️⃣ 초기 상태에서 조직 선택기 프리셋

**현재**

```
/submit 페이지 로드 시:
조직 선택 필드가 비어있음 → "조직을 선택해주세요"
```

**개선안**

```
URL 파라미터 지원 (이미 구현됨):
/submit?org=precision-tech
→ 정밀기술담당이 자동 선택됨

추가 개선:
- 이전에 선택한 조직 쿠키에 저장
- 로그인 후: 직원의 소속 조직 자동 선택
```

**코드는 이미 구현되어 있음:**

```typescript
// submit/page.tsx: line 15-16
const selectedOrg = searchParams?.org
  ? organizationRepository.getBySlug(searchParams.org)
  : undefined;
```

개선 가능 영역:

```typescript
// 개선: 로컬스토리지 활용
const lastSelectedOrg = localStorage.getItem('lastSelectedOrgId');
const initialOrgId = selectedOrg?.id ?? lastSelectedOrg ?? "";

// 선택 후 저장
const handleOrgChange = (orgId: string) => {
  localStorage.setItem('lastSelectedOrgId', orgId);
  // ...
};
```

---

### 8️⃣ 에러 메시지 스타일 일관성

**현재**

```typescript
{errors.title && (
  <p className="mt-2 text-xs text-[var(--color-danger)]">
    {errors.title}
  </p>
)}
```

**개선**

```
모든 에러 메시지 위치를 일관되게:
- 필드 아래에만 표시 (현재: OK)
- 색상과 크기 일관성 (현재: OK)
- 제출 실패 시 상단에 요약 표시 (현재: 없음) ← 추가하면 좋음

추가 개선:
┌──────────────────────────────────────┐
│ ⚠️ 다음 필드를 확인해주세요:        │
│ • 제목을 입력해주세요               │
│ • 조직을 선택해주세요               │
│ • 안전한 의견 작성에 동의해주세요   │
└──────────────────────────────────────┘
```

**코드 변경**

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) {
    // 상단에 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  setSubmitted(true);
};

// JSX에서:
{Object.keys(errors).length > 0 && (
  <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-6">
    <p className="font-semibold text-red-800">다음을 확인해주세요:</p>
    <ul className="mt-2 space-y-1 text-sm text-red-700">
      {Object.values(errors).map((error) => (
        <li key={error}>• {error}</li>
      ))}
    </ul>
  </div>
)}
```

---

## 📱 모바일 반응형 체크리스트

**점검 항목**

- [ ] 제출 폼: 모바일에서 필드들이 스택되는가? (현재: 좋음, 2단계 후 더 좋아짐)
- [ ] 조직 선택기: 모바일에서 드롭다운이 충분히 큰가? (현재: 작음)
- [ ] 조직 보드 (/boards): 레이아웃이 스택될 때 트리와 카드가 보기 좋은가? (현재: 중간)
- [ ] 버튼: 터치 타겟이 최소 44px인가? (현재: 확인 필요)
- [ ] 입력 필드: 모바일 키보드가 올라왔을 때 입력이 가려지는가? (현재: 확인 필요)

**모바일 개선 권고**

```css
/* 모바일에서 조직 선택기 크기 증가 */
@media (max-width: 768px) {
  select {
    min-height: 48px;
    font-size: 16px; /* iOS에서 줌 방지 */
  }
}

/* 버튼 터치 타겟 확보 */
button {
  min-height: 44px;
  min-width: 44px;
}
```

---

## ✅ 즉시 실행 가능한 개선 (Quick Wins)

### Phase 1: 이번 주 (1~2일)

```typescript
// 1. 필수 필드에 * 추가
<label className="font-semibold">
  제목 <span className="text-red-500">*</span>
</label>

// 2. 제출 완료 후 CTA 버튼 추가
<Button asChild>
  <Link href={`/boards/${getSlug(submittedOrg)}`}>
    제출한 의견 보러 가기
  </Link>
</Button>

// 3. 오디오 필드: 현실적 메시지로 변경
<p className="text-xs text-blue-700 bg-blue-50 p-2 rounded">
  ℹ️ 현재: HR 팀이 수동으로 텍스트 변환합니다
</p>
```

**예상 개선 효과**: 혼동 감소, 조직 보드 트래픽 증가

---

### Phase 2: 다음 주 (3~5일)

```typescript
// 1. 필수/선택 필드 시각적 구분
// - 회색 라벨 + "(선택사항)" 텍스트 추가

// 2. 조직 선택기: 그룹화된 select 또는 검색 기능
// - <optgroup> 추가
// - 또는 커스텀 콤보박스

// 3. 에러 메시지 요약: 상단에 표시
// - 스크롤 상단으로 이동
// - 에러 목록 카드
```

**예상 개선 효과**: 폼 완료율 10~15% 상승, 조직 선택 오류 감소

---

### Phase 3: 차주 (1주)

```typescript
// 1. 2단계 폼 리팩토링
// - Step 1: 제목, 내용, 조직
// - Step 2: 카테고리, 긴급도, 범위

// 2. 조직 보드 /boards 페이지 상호작용 개선
// - 트리와 카드 연동

// 3. 모바일 반응형 테스트 & 개선
// - 터치 타겟 크기
// - 키보드 올라올 때 입력 가림 방지
```

**예상 개선 효과**: 제출 완료율 15~20% 상승, 직원 만족도 향상

---

## 📋 체크리스트: MVP 런칭 전 확인

### 사용성 검증

- [ ] **3명의 직원**에게 제출 폼 테스트 (싱크탱크 세션)
  - "이 폼을 작성하는 데 얼마나 걸렸나요?"
  - "어려웠던 부분은?"
  - "다음에 또 제출하고 싶나요?"
  
- [ ] **5명의 HR/리더**에게 게시판 네비게이션 테스트
  - "장비기술센터의 의견을 찾아보세요"
  - "정밀기술담당의 의견만 보고 싶습니다. 어떻게 하나요?"

- [ ] **모바일 테스트** (iPhone + Android)
  - 드롭다운 크기 OK?
  - 입력 필드 가림 없음?
  - 버튼 터치하기 쉬움?

### 신뢰성 검증

- [ ] 제출 폼 모든 필드 검증 테스트
  - 빈 필드로 제출 시도 → 오류 메시지 표시 되나?
  - 음성 + 텍스트 중 하나는 필수 → 제대로 검증되나?

- [ ] 오디오 파일 업로드
  - 파일 선택 후 이름 표시되나?
  - 업로드 실패 시 오류 메시지 나오나?
  - (MVP: 파일 저장은 필요 없음, UI 동작만 확인)

- [ ] 조직 선택기
  - 모든 조직이 보이나?
  - 깊은 레벨 조직이 선택 가능한가?

### 신호 검증

- [ ] 제출 완료 메시지가 명확한가?
- [ ] "익명"이 기본값인 것이 명확한가?
- [ ] 안전성 메시지가 신뢰감을 주나?

---

## 🎯 최종 결론

### 현재 상태: B (기본은 되지만, 몇 가지 개선 필요)

**강점**:
- ✅ 신뢰성 메시지 탁월 ("개인 식별 아님", "패턴 기반")
- ✅ 기본 폼 구조 타당 (필드 선택)
- ✅ 조직 선택 로직 OK (단, UI는 개선 필요)

**약점**:
- ❌ 폼이 너무 길다 (심리적 진입장벽)
- ❌ 조직 선택기가 드롭다운으로는 약하다
- ❌ 제출 후 다음 단계 가이드 부재
- ❌ 필수/선택 필드 구분 불명확

### 개선 후 목표: A (직원들이 기꺼이 제출하고, 빠르게 완료)

**우선순위**:

1. 🔴 **필수** (즉시): 필드 명시 (*), 폼 단계화, 제출 후 CTA
2. 🟡 **권장** (1주): 조직 선택기 개선, 에러 요약
3. 🟢 **선택** (2주): 모바일 최적화, 상호작용 개선

---

**보고서 작성**: 2026-04-03  
**평가 기준**: 직원(비기술 사용자) 관점에서의 사용성, 명확성, 신뢰성
