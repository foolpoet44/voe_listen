You are a senior full-stack product engineer, product designer, and pragmatic architect.

Build an MVP web application called “VOE Listening Platform”.

## Product Goal
Create a Korean-first employee voice listening platform where employees can submit healthy and productive opinions in text or audio form, and HR/admin users can review, analyze, and convert those voices into actionable productivity insights.

This is not just a suggestion box.
It is a listening → structuring → analysis → action loop.

The product should help:
1. employees speak safely,
2. HR capture real voice as data,
3. leaders identify recurring friction and opportunities,
4. the organization turn qualitative feedback into productivity improvement actions.

The platform must also reflect organizational structure.
This means employee voice must be submitted, viewed, and analyzed not only company-wide, but also by organization-based boards.

---

## Critical Language Requirement
This is a Korean-first product for Korean employees and HR teams.

Rules:
- All user-facing copy must be written in natural Korean.
- This includes:
  - page titles
  - labels
  - buttons
  - helper text
  - placeholder text
  - validation messages
  - empty states
  - success messages
  - dashboard section titles
  - chart labels
  - insight summaries
  - organization names shown in navigation and selectors
- Use Korean that feels natural in a workplace context: warm, trustworthy, simple, and non-bureaucratic.
- Avoid awkward literal translation from English.
- Code, internal variable names, comments, and technical docs can remain in English.
- If you generate sample/mock data, use realistic Korean examples.

---

## Product Principles
1. Psychological safety first
2. Anonymous-friendly by default
3. Trustworthy and simple UX
4. Convert qualitative voice into structured insight
5. Show patterns, not expose individuals
6. Outputs should be actionable, not merely descriptive
7. Opinions should be understood in organizational context
8. Parent organizations should see aggregated patterns from child organizations

---

## Core Product Concept
This platform is not a single company-wide board only.
It must support organization-based listening boards.

Employees should be able to submit their voice into the relevant organization board.
HR/admin users should be able to analyze voices:
- company-wide
- by center
- by department/team-like unit
- by sub-organization
- with roll-up aggregation from child organizations to parent organizations

The system should support:
- organization-specific board pages
- organization selector / tree navigation
- organization-aware submissions
- organization-filtered dashboard
- organization-filtered insights
- parent-level aggregation of child organization data

---

## Organization Hierarchy Requirement
Use the following organization hierarchy as mock/master seed structure.

- 장비기술센터
  - 정밀기술담당
  - 검사가술담당
  - 전기기술담당
  - 장비SW/제어담당

- 생산혁신센터
  - 생산기술담당
  - 금형/품격기술연구소
  - 제조AX추진실

- Smart Factory솔루션센터
  - 생산시스템솔루션담당
  - 로봇/AX솔루션담당
  - FA솔루션담당
  - Smart Factory사업개발담당

- 선행장비기술연구소
- 선행요소기술연구소
- 오퍼레이션담당
- 전략담당
- 안전보건/지원실
- 경영관리실

Requirements:
- each organization should have its own board view
- submissions must be associated with an organization
- support hierarchical organization structure
- parent organizations should aggregate child organization submissions
- dashboard and insights pages must support organization filtering
- include mock data distributed across organizations
- create reusable organization navigation UI
- keep all organization labels in Korean for the UI

---

## MVP Scope
Build these pages:

### 1) Landing page `/`
Purpose:
- explain what the platform is
- explain why employee voice matters
- explain trust/privacy/anonymous participation
- guide users to submit their voice
- guide users to browse organization-based boards

Must include:
- hero section
- trust/privacy notice
- short explanation of how submitted voices are used
- CTA button to go to submission page
- section showing sample improvement stories or example impact cards
- section introducing organization-based listening boards

### 2) Board index page `/boards`
Purpose:
- provide an entry point to organization-based boards

Must include:
- organization tree or grouped board list
- easy navigation by organization
- visually clear grouping of center / sub-organization relationships
- Korean labels for all organizations
- card or tree-based UI suitable for HR/internal product users

### 3) Organization board page `/boards/[orgSlug]`
Purpose:
- show the listening board for a selected organization

Must include:
- organization header
- breadcrumb or hierarchy context
- description of the organization board
- recent voices for that organization
- key stats for that organization
- CTA to submit a voice for that organization
- if the organization is a parent node, include roll-up summary of child organizations

### 4) Submission page `/submit`
Purpose:
- allow employees to submit opinions safely and simply

Must include:
- title input
- opinion content textarea
- audio upload UI
- category selector
- sentiment self-check selector
- urgency selector
- scope selector
- organization selector
- anonymous toggle
- safety/behavioral agreement checkbox
- submit button
- success confirmation UI

Categories:
- 제안
- 불편/마찰
- 협업
- 리더십
- 업무 생산성
- 웰빙
- 기타

Sentiment options:
- 긍정적
- 중립적
- 부정적
- 건설적 제안

Urgency:
- 낮음
- 보통
- 높음
- 즉시 확인 필요

Scope:
- 개인
- 팀
- 부서
- 전사

Validation rules:
- title required
- category required
- urgency required
- scope required
- organization required
- at least one of text content or audio upload required
- safety agreement required

The organization selector should support the hierarchy above and feel easy to use.

### 5) Admin dashboard `/dashboard`
Purpose:
- help HR/admin users monitor employee voice patterns

Must include:
- total submission count
- category breakdown
- sentiment breakdown
- recent submissions table
- urgent issues panel
- repeated theme / keyword section
- suggested action cards
- quick overview stats cards
- organization filter
- company-wide view and organization-specific view

If a parent organization is selected, aggregate child organization data into the view.

Use charts that are readable for executives and non-technical HR stakeholders.

### 6) Insights page `/insights`
Purpose:
- show summarized organizational signals from collected voices

Must include:
- 이번 기간 핵심 신호 3가지
- 긍정적/건설적 제안 테마
- 생산성 저해 요인
- 리더십 관련 패턴
- 권장 액션
- organization filter
- narrative summary blocks in Korean
- if organization is parent, summarize both parent-level and child-level patterns where useful

---

## Routing Requirements
Support at least the following routes:

- `/`
- `/boards`
- `/boards/[orgSlug]`
- `/submit`
- `/dashboard`
- `/insights`

Optional but recommended:
- support query params for organization filtering:
  - `/dashboard?org=[orgSlug]`
  - `/insights?org=[orgSlug]`
  - `/submit?org=[orgSlug]`

If an organization is passed in the URL, preselect it in the UI.

---

## Technical Requirements
Use:
- Next.js (latest, App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts

Architecture requirements:
- clean folder structure
- reusable UI components
- maintainable code
- separate domain types, repositories, and services
- use mock data/repository first
- prepare the codebase so Supabase can be attached later without major refactoring

---

## Required Architecture
Please structure the codebase approximately like this:

/docs
  PRD.md
  TECH_SPEC.md
  TODO.md
  ORG_STRUCTURE.md

/src
  /app
    /(public)
      page.tsx
      boards/page.tsx
      boards/[orgSlug]/page.tsx
      submit/page.tsx
      insights/page.tsx
    /(admin)
      dashboard/page.tsx
  /components
    organization-tree.tsx
    organization-selector.tsx
    board-header.tsx
    organization-summary-card.tsx
    submission-form.tsx
    dashboard-stats.tsx
    sentiment-chart.tsx
    category-chart.tsx
    recent-voices-table.tsx
    insight-cards.tsx
    action-tracker.tsx
  /types
  /services
  /repositories
  /lib
  /data

Use a repository pattern.

Define repository interfaces for:
- organizations
- voice entries

Implement mock repositories first.
Design the code so a future Supabase repository can replace them easily.

---

## Data Model
Create strong types/interfaces for:

### OrganizationNode
Fields:
- id
- name
- slug
- parentId
- level

Suggested level values:
- center
- division
- lab
- office
- team
- unit

### VoiceEntry
Fields:
- id
- createdAt
- submissionType ("text" | "audio")
- title
- content
- audioFileUrl
- transcript
- category
- sentiment
- urgency
- scope
- isAnonymous
- organizationId
- organizationName
- status ("new" | "reviewed" | "actioned" | "closed")

### InsightCluster
Fields:
- id
- theme
- summary
- relatedEntryIds
- volume
- sentimentScore
- urgencyScore
- productivityImpact
- suggestedAction
- organizationId

### ActionItem
Fields:
- id
- title
- description
- owner
- dueDate
- relatedClusterId
- progressStatus
- organizationId

---

## Repository Design
Define repository interfaces like:

### OrganizationRepository
- listAll()
- getBySlug(slug)
- getChildren(parentId)
- getDescendants(orgId)
- getBreadcrumbs(orgId)

### VoiceRepository
- create(entry)
- list()
- getById(id)
- listByOrganization(orgId)
- listByOrganizations(orgIds)
- updateStatus(id, status)

For parent organization views, allow aggregation using descendant organization IDs.

---

## Organization Behavior Requirements
Implement logic so that:
- a child organization board shows only its own entries
- a parent organization view can show aggregated entries from all descendants
- dashboard filtering by a parent organization includes descendant submissions
- insights filtering by a parent organization includes descendant submissions
- organization-specific stats feel accurate and realistic

Also generate mock data spread across the organization hierarchy so the app feels real in review mode.

---

## AI / Analysis Layer
Do not fully integrate external AI APIs yet.
Instead, prepare clean service interfaces and placeholder implementations for:

- transcription
- sentiment classification
- category classification
- clustering
- insight summarization
- repeated-theme extraction

Requirements:
- mark these clearly with TODO comments
- make the interfaces easy to swap with real implementations later
- AI-generated output should be in Korean
- summaries should be organization-aware
- allow future parent/child aggregation logic for insight generation

---

## UI / UX Direction
Style:
- executive-friendly
- warm and trustworthy
- modern internal product
- clean whitespace
- rounded cards
- visually polished but not flashy
- data-rich but not cluttered

The feeling should be:
“safe enough to speak honestly, structured enough to act on.”

Navigation expectations:
- easy movement between landing, boards, submit, dashboard, and insights
- organization browsing should feel intuitive
- hierarchy should be visually understandable
- admin users should quickly understand which organization they are viewing

---

## Functional Expectations
Implement:
- navigation/header
- responsive layout
- form validation
- mock submission flow
- organization-aware submission flow
- board index page
- organization board page
- dashboard organization filter
- insight cards using mock clustered data
- sample Korean mock data that feels realistic in a workplace setting
- organization tree / selector component
- parent roll-up summaries for organization views

---

## Important Safety / Trust Expectations
Reflect these ideas in the UX copy:
- 익명 의견도 안전하게 제출할 수 있음
- 개인 공격이나 비방은 지양
- 수집된 의견은 개인 식별보다 패턴 이해와 개선에 활용됨
- 말하는 것으로 끝나지 않고, 더 나은 일하는 환경으로 연결된다는 메시지
- 조직별 게시판은 의견을 더 맥락 있게 이해하고 개선하기 위한 장치라는 메시지

Do not make the experience feel punitive or surveillance-oriented.

---

## Mock Data Expectations
Generate realistic Korean mock data including:
- sample organizations from the hierarchy above
- sample opinions for multiple organizations
- examples of constructive suggestions
- examples of productivity blockers
- examples of collaboration friction
- examples of leadership-related feedback
- examples of wellbeing-related voices

Ensure the data distribution helps the dashboard and insights pages look meaningful.

---

## Documentation Deliverables
Generate:
1. a runnable codebase
2. landing page
3. boards index page
4. organization board page
5. submit page
6. dashboard page
7. insights page
8. reusable components
9. mock data
10. PRD.md
11. TECH_SPEC.md
12. TODO.md
13. ORG_STRUCTURE.md
14. README.md with setup instructions

In ORG_STRUCTURE.md, document:
- the organization hierarchy
- how parent-child aggregation works
- the intended board routing model
- how future admin permissions could map to organization scope

---

## Code Quality Rules
- prefer clarity over cleverness
- avoid unnecessary abstraction
- keep components reasonably modular
- use strong typing
- keep naming clean and consistent
- do not leave broken imports or incomplete code
- do not generate pseudo-code; generate working app code
- use seed/mock data that is easy to edit later
- make org-related logic explicit and readable

---

## Final Instruction
Start by scaffolding the complete MVP with mock data and a polished UI.
Make the product feel real enough to review in a browser immediately.
Ensure all user-facing experiences are in Korean.
Ensure organization-based boards and parent-child aggregation are already reflected in the first version.