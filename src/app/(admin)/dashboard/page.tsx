import Link from "next/link";
import { Suspense } from "react";

import { ActionTracker } from "@/components/action-tracker";
import { CategoryChart } from "@/components/category-chart";
import { DashboardStats } from "@/components/dashboard-stats";
import { EmptyState } from "@/components/empty-state";
import { OrganizationFilter } from "@/components/org-filter";
import { RecentVoicesTable } from "@/components/recent-voices-table";
import { SentimentChart } from "@/components/sentiment-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sortByDateDesc } from "@/lib/voice-utils";
import { organizationRepository } from "@/repositories/mock-organization-repository";
import { insightRepository } from "@/repositories/mock-insight-repository";
import { voiceRepository } from "@/repositories/mock-voice-repository";
import { getVoiceStats, getCategoryChartData, getSentimentChartData } from "@/services/analytics-service";
import { getOrganizationScope, resolveOrganization } from "@/services/organization-service";

export default function DashboardPage({
  searchParams,
}: {
  searchParams?: { org?: string };
}) {
  const tree = organizationRepository.getTree();
  const selectedOrg = resolveOrganization(searchParams?.org);
  const invalidOrg = Boolean(searchParams?.org && !selectedOrg);
  const scope = getOrganizationScope(selectedOrg);

  const voices = voiceRepository.listByOrganizations(scope.orgIds);
  const stats = getVoiceStats(voices);

  const categoryData = getCategoryChartData(voices);
  const sentimentData = getSentimentChartData(voices);

  const recentEntries = sortByDateDesc(voices).slice(0, 5);
  const urgentEntries = voices.filter((entry) => entry.urgency === "immediate");
  const clusters = insightRepository
    .listClusters()
    .filter((cluster) => scope.orgIds.includes(cluster.organizationId));
  const actionItems = insightRepository
    .listActions()
    .filter((item) => scope.orgIds.includes(item.organizationId));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-accent-strong)]">
            HR/관리자 대시보드
          </p>
          <h1 className="text-3xl font-semibold">조직의 목소리를 실행으로 연결합니다</h1>
          <p className="text-sm text-[var(--color-muted)]">
            {scope.org
              ? `${scope.org.name} 조직의 의견 흐름을 요약했습니다.`
              : "전사 관점에서 의견 흐름을 요약했습니다."}
          </p>
        </div>
        <Suspense
          fallback={
            <div className="h-11 w-48 rounded-2xl border border-[var(--color-border)] bg-white" />
          }
        >
          <OrganizationFilter tree={tree} currentSlug={scope.org?.slug} label="조직 필터" />
        </Suspense>
      </section>

      {invalidOrg && (
        <EmptyState
          title="선택한 조직을 찾을 수 없습니다"
          description="조직명이 변경되었을 수 있습니다. 전체 조직 보기로 돌아갑니다."
          action={
            <Button asChild>
              <Link href="/dashboard">전체 조직 보기</Link>
            </Button>
          }
        />
      )}

      <DashboardStats
        total={stats.total}
        urgent={stats.urgent}
        constructive={stats.constructive}
        actioned={stats.actioned}
      />

      <Card className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">이번 주 실행 리듬 만들기</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            핵심 신호를 기준으로 실행 플랜을 정리하고 담당/기한을 확정하세요.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/insights">관리자 인사이트 보기</Link>
        </Button>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">카테고리 분포</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            반복적으로 나타나는 의견 유형을 확인합니다.
          </p>
          {voices.length === 0 ? (
            <EmptyState
              title="표시할 의견이 없습니다"
              description="의견이 수집되면 카테고리 분포가 표시됩니다."
            />
          ) : (
            <CategoryChart data={categoryData} />
          )}
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold">감성 분포</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            긍정과 개선 신호의 균형을 확인합니다.
          </p>
          {voices.length === 0 ? (
            <EmptyState
              title="표시할 의견이 없습니다"
              description="의견이 수집되면 감성 분포가 표시됩니다."
            />
          ) : (
            <SentimentChart data={sentimentData} />
          )}
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">최근 의견</h2>
          {recentEntries.length === 0 ? (
            <EmptyState
              title="최근 의견이 없습니다"
              description="의견이 제출되면 이곳에 최신 항목이 표시됩니다."
            />
          ) : (
            <RecentVoicesTable entries={recentEntries} />
          )}
        </div>
        <Card className="space-y-4 p-6">
          <div>
            <h2 className="text-lg font-semibold">즉시 확인 필요</h2>
            <p className="text-sm text-[var(--color-muted)]">
              긴급 신호는 빠른 피드백이 필요합니다.
            </p>
          </div>
          <div className="space-y-3">
            {urgentEntries.length === 0 && (
              <p className="text-sm text-[var(--color-muted)]">
                현재 긴급 신호가 없습니다.
              </p>
            )}
            {urgentEntries.slice(0, 4).map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-4"
              >
                <p className="text-sm font-semibold">{entry.title}</p>
                <p className="mt-2 text-xs text-[var(--color-muted)]">
                  {entry.organizationName}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">반복 테마 / 키워드</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {clusters.map((cluster) => (
              <Badge key={cluster.id} variant="outline">
                {cluster.theme}
              </Badge>
            ))}
            {clusters.length === 0 && (
              <p className="text-sm text-[var(--color-muted)]">
                현재 반복 테마가 없습니다.
              </p>
            )}
          </div>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            테마는 의견의 반복 패턴을 기반으로 요약됩니다.
          </p>
        </Card>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">추천 액션 카드</h2>
          {actionItems.length === 0 ? (
            <EmptyState
              title="추천 액션이 없습니다"
              description="의견이 누적되면 실행 카드가 제안됩니다."
            />
          ) : (
            <ActionTracker items={actionItems.slice(0, 4)} />
          )}
        </div>
      </section>
    </div>
  );
}
