import Link from "next/link";
import { Suspense } from "react";

import { InsightCards } from "@/components/insight-cards";
import { EmptyState } from "@/components/empty-state";
import { OrganizationFilter } from "@/components/org-filter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { organizationRepository } from "@/repositories/mock-organization-repository";
import { insightRepository } from "@/repositories/mock-insight-repository";
import { voiceRepository } from "@/repositories/mock-voice-repository";
import { getOrganizationScope, resolveOrganization } from "@/services/organization-service";

export default function InsightsPage({
  searchParams,
}: {
  searchParams?: { org?: string };
}) {
  const tree = organizationRepository.getTree();
  const selectedOrg = resolveOrganization(searchParams?.org);
  const invalidOrg = Boolean(searchParams?.org && !selectedOrg);
  const scope = getOrganizationScope(selectedOrg);

  const clusters = insightRepository
    .listClusters()
    .filter((cluster) => scope.orgIds.includes(cluster.organizationId));

  const voices = voiceRepository.listByOrganizations(scope.orgIds);
  const topSignals = [...clusters]
    .sort((a, b) => b.urgencyScore - a.urgencyScore)
    .slice(0, 3);
  const constructiveSignals = clusters.filter((cluster) => cluster.sentimentScore > 0.5);
  const riskSignals = clusters.filter((cluster) => cluster.urgencyScore > 0.6);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-accent-strong)]">
            인사이트 요약
          </p>
          <h1 className="text-3xl font-semibold">조직 신호를 전략적으로 요약합니다</h1>
          <p className="text-sm text-[var(--color-muted)]">
            {scope.org
              ? `${scope.org.name} 조직의 의견 흐름과 실행 포인트를 요약했습니다.`
              : "전사 관점에서 주요 신호와 실행 포인트를 요약했습니다."}
          </p>
        </div>
        <Suspense fallback={<div className="h-11 w-48 rounded-2xl border border-[var(--color-border)] bg-white" />}><OrganizationFilter tree={tree} currentSlug={scope.org?.slug} /></Suspense>
      </section>

      {invalidOrg && (
        <EmptyState
          title="선택한 조직을 찾을 수 없습니다"
          description="조직명이 변경되었을 수 있습니다. 전체 조직 보기로 돌아갑니다."
          action={
            <Button asChild>
              <Link href="/insights">전체 조직 보기</Link>
            </Button>
          }
        />
      )}

      {clusters.length === 0 ? (
        <EmptyState
          title="아직 인사이트가 충분하지 않습니다"
          description="의견이 누적되면 조직 신호가 자동으로 요약됩니다."
          action={
            <Button variant="outline" asChild>
              <Link href="/submit">의견 제출하기</Link>
            </Button>
          }
        />
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            {topSignals.map((cluster) => (
              <Card key={cluster.id} className="p-5">
                <p className="text-xs font-semibold text-[var(--color-muted)]">
                  이번 기간 핵심 신호
                </p>
                <h3 className="mt-2 text-lg font-semibold">{cluster.theme}</h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{cluster.summary}</p>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="p-6">
              <h2 className="text-xl font-semibold">건설적 제안 테마</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
                {constructiveSignals.length === 0 && (
                  <li>
                    · 현재는 개선 아이디어가 부족합니다. 제안 유도 캠페인이 필요합니다.
                  </li>
                )}
                {constructiveSignals.map((cluster) => (
                  <li key={cluster.id}>· {cluster.theme} — {cluster.suggestedAction}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-semibold">생산성 리스크</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
                {riskSignals.map((cluster) => (
                  <li key={cluster.id}>· {cluster.theme}: {cluster.productivityImpact}</li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-[#f7f2ec] p-4 text-sm">
                현재 {voices.length}건의 의견 중 {riskSignals.length}건이 긴급 대응 신호로
                분류됩니다.
              </div>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold">운영/리더십 협업 포인트</h2>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                우선순위, 의사결정 기준, 리소스 공유에 대한 명확성이 요구됩니다. 운영
                커뮤니케이션을 주기적으로 공유하는 것이 효과적입니다.
              </p>
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-semibold">권장 액션</h2>
              <ol className="mt-3 space-y-3 text-sm text-[var(--color-muted)]">
                <li>1. 긴급 신호가 높은 조직에 즉시 피드백 루프를 실행합니다.</li>
                <li>2. 반복 신호가 많은 프로세스는 간단한 표준안을 우선 적용합니다.</li>
                <li>3. 개선 조치 진행 현황을 주간 리포트로 공유합니다.</li>
              </ol>
              <Button className="mt-4" variant="accent" asChild>
                <Link href="/boards">조직 보드에서 자세히 보기</Link>
              </Button>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">세부 인사이트</h2>
            <InsightCards clusters={clusters} />
          </section>
        </>
      )}
    </div>
  );
}


