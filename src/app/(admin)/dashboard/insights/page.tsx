import Link from "next/link";
import { Suspense } from "react";

import { ActionTracker } from "@/components/action-tracker";
import { EmptyState } from "@/components/empty-state";
import { InsightCards } from "@/components/insight-cards";
import { OrganizationFilter } from "@/components/org-filter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { organizationRepository } from "@/repositories/mock-organization-repository";
import { insightRepository } from "@/repositories/mock-insight-repository";
import { voiceRepository } from "@/repositories/mock-voice-repository";
import { getOrganizationScope, resolveOrganization } from "@/services/organization-service";

export default function AdminInsightsPage({
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
  const actionItems = insightRepository
    .listActions()
    .filter((item) => scope.orgIds.includes(item.organizationId));
  const voices = voiceRepository.listByOrganizations(scope.orgIds);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-accent-strong)]">
            관리자 인사이트
          </p>
          <h1 className="text-3xl font-semibold">신호를 실행 계획으로 연결합니다</h1>
          <p className="text-sm text-[var(--color-muted)]">
            {scope.org
              ? `${scope.org.name} 조직의 핵심 신호를 실행 관점으로 요약했습니다.`
              : "전사 관점에서 핵심 신호를 실행 관점으로 요약했습니다."}
          </p>
        </div>
        <Suspense fallback={<div className="h-11 w-48 rounded-2xl border border-[var(--color-border)] bg-white" />}><OrganizationFilter tree={tree} currentSlug={scope.org?.slug} label="조직 필터" /></Suspense>
      </section>

      {invalidOrg && (
        <EmptyState
          title="선택한 조직을 찾을 수 없습니다"
          description="조직명이 변경되었을 수 있습니다. 전체 조직 보기로 돌아갑니다."
          action={
            <Button asChild>
              <Link href="/dashboard/insights">전체 조직 보기</Link>
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
              <Link href="/dashboard">대시보드로 이동</Link>
            </Button>
          }
        />
      ) : (
        <>
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="p-6">
              <h2 className="text-lg font-semibold">핵심 요약</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                현재 {voices.length}건의 의견 중 {clusters.length}개 신호가 핵심 테마로
                분류되었습니다. 우선순위를 지정하고 실행 단계를 정의하세요.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {clusters.slice(0, 5).map((cluster) => (
                  <span
                    key={cluster.id}
                    className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs"
                  >
                    {cluster.theme}
                  </span>
                ))}
              </div>
              <Button className="mt-6" asChild>
                <Link href="/dashboard">액션 진행 현황 보기</Link>
              </Button>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-semibold">이번 주 실행 제안</h2>
              <ol className="mt-3 space-y-3 text-sm text-[var(--color-muted)]">
                <li>1. 긴급 신호가 높은 조직에 피드백 루프를 설정합니다.</li>
                <li>2. 반복 테마별로 담당/기한을 확정합니다.</li>
                <li>3. 실행 진행 상황을 월간 리포트로 공유합니다.</li>
              </ol>
              <Button className="mt-6" variant="outline" asChild>
                <Link href="/boards">조직 보드에서 근거 확인</Link>
              </Button>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">추천 액션 카드</h2>
            {actionItems.length === 0 ? (
              <EmptyState
                title="추천 액션이 없습니다"
                description="의견이 누적되면 실행 카드가 제안됩니다."
              />
            ) : (
              <ActionTracker items={actionItems} />
            )}
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


