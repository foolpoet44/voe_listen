import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const impactCards = [
  {
    title: "야근 감소",
    description: "반복되는 일정 변경 이슈를 조기에 파악해 주 2시간의 야근이 줄었습니다.",
  },
  {
    title: "리드타임 18% 단축",
    description: "승인 단계 병목을 줄여 배포 리드타임이 개선되었습니다.",
  },
  {
    title: "협업 효율 상승",
    description: "공식 협업 채널 통합으로 메시지 누락이 크게 줄었습니다.",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold text-[var(--color-accent-strong)]">
            조직 맥락에서 듣는 VOE
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            안전하게 말하고, 구조적으로 분석하고, 실행으로 연결하는
            <span className="block text-[var(--color-accent-strong)]">
              VOE 리스닝 플랫폼
            </span>
          </h1>
          <p className="text-base text-[var(--color-muted)]">
            익명 제출을 기본으로 안내하면서도 조직의 맥락을 잃지 않습니다. 구성원은
            안전하게 말하고, HR은 패턴을 읽고, 리더는 실행 우선순위를 정할 수
            있습니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/submit">의견 제출하기</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/boards">조직 보드 보기</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-[var(--color-accent-soft)]">
              <CardHeader>
                <CardTitle className="text-sm">심리적 안전</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[var(--color-muted)]">
                익명 제출 원칙으로 개인이 아닌 패턴을 바라봅니다.
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-sm">조직 맥락</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[var(--color-muted)]">
                조직별 보드로 의견의 의미를 놓치지 않습니다.
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-sm">실행 연결</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[var(--color-muted)]">
                인사이트에서 바로 행동 계획으로 이어집니다.
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="p-6">
          <h2 className="text-lg font-semibold">신뢰와 보호에 대한 약속</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li>· 익명 제출이 기본이며, 개인 식별 정보는 포함하지 않도록 안내합니다.</li>
            <li>· 개인 지목·비난보다는 개선 중심으로 작성해주세요.</li>
            <li>· 의견은 처벌이 아닌 개선의 근거로 사용됩니다.</li>
            <li>· 조직별로 맥락을 이해한 뒤 실행을 연결합니다.</li>
          </ul>
          <div className="mt-6 rounded-2xl bg-[#f7f2ec] p-4 text-xs text-[var(--color-muted)]">
            조직 보드에서는 개인이 아닌 흐름을 중심으로 신호를 읽고, 요약된 인사이트로
            공유합니다.
          </div>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {impactCards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-[var(--color-muted)]">
              {card.description}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">어떻게 작동하나요?</h2>
          <ol className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li>1. 구성원이 익명으로 의견을 제출합니다.</li>
            <li>2. 조직별 보드에서 반복되는 신호를 확인합니다.</li>
            <li>3. HR과 리더가 인사이트를 실행 계획으로 전환합니다.</li>
          </ol>
          <Button className="mt-6" variant="accent" asChild>
            <Link href="/insights">인사이트 샘플 보기</Link>
          </Button>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">조직별 리스닝 보드</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            조직 트리에서 바로 이동하고, 상위 조직은 하위 조직의 의견을 집계해
            패턴을 확인합니다.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {["장비기술센터", "생산혁신센터", "Smart Factory솔루션센터", "전략담당"].map(
              (name) => (
                <div
                  key={name}
                  className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-semibold"
                >
                  {name}
                </div>
              )
            )}
          </div>
          <Button className="mt-6" variant="outline" asChild>
            <Link href="/boards">조직 보드 전체 보기</Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
