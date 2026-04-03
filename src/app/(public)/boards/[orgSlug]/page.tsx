import Link from "next/link";

import { BoardHeader } from "@/components/board-header";
import { EmptyState } from "@/components/empty-state";
import { OrganizationSummaryCard } from "@/components/organization-summary-card";
import { VoiceCard } from "@/components/voice-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { organizationRepository } from "@/repositories/mock-organization-repository";
import { voiceRepository } from "@/repositories/mock-voice-repository";
import { sortByDateDesc } from "@/lib/voice-utils";

export default function OrganizationBoardPage({
  params,
}: {
  params: { orgSlug: string };
}) {
  const org = organizationRepository.getBySlug(params.orgSlug);

  if (!org) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-semibold">조직을 찾을 수 없습니다</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            조직 목록에서 다시 선택해주세요.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/boards">조직 보드로 돌아가기</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const descendants = organizationRepository.getDescendants(org.id);
  const orgIds = [org.id, ...descendants.map((child) => child.id)];
  const voices = sortByDateDesc(voiceRepository.listByOrganizations(orgIds));
  const urgent = voices.filter((entry) => entry.urgency === "immediate").length;
  const suggestions = voices.filter((entry) => entry.category === "suggestion").length;

  const children = organizationRepository.getChildren(org.id);
  const scopeLabel =
    descendants.length > 0
      ? `${org.name} 및 하위 ${descendants.length}개 조직`
      : `${org.name} 단일 조직`;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <BoardHeader
        organization={org}
        breadcrumbs={organizationRepository.getBreadcrumbs(org.id)}
        stats={{ total: voices.length, urgent, suggestions }}
        isParent={descendants.length > 0}
      />

      <Card className="space-y-3 p-6">
        <p className="text-sm font-semibold">집계 범위</p>
        <p className="text-sm text-[var(--color-muted)]">
          현재 보드에는 {scopeLabel}의 의견이 포함됩니다.
        </p>
        <div className="flex flex-wrap gap-2">
          {[org, ...descendants].map((item) => (
            <span
              key={item.id}
              className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs"
            >
              {item.name}
            </span>
          ))}
        </div>
      </Card>

      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">최근 의견</h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {descendants.length > 0
              ? "상위 조직으로 집계된 의견을 포함합니다."
              : "해당 조직의 의견만 표시됩니다."}
          </p>
        </div>
        <Button asChild>
          <Link href={`/submit?org=${org.slug}`}>이 조직에 의견 제출</Link>
        </Button>
      </section>

      {voices.length === 0 ? (
        <EmptyState
          title="아직 의견이 없습니다"
          description="첫 의견이 등록되면 조직 보드에 표시됩니다."
          action={
            <Button variant="outline" asChild>
              <Link href={`/submit?org=${org.slug}`}>의견 제출하기</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {voices.slice(0, 6).map((entry) => (
            <VoiceCard key={entry.id} entry={entry} showOrg={descendants.length > 0} />
          ))}
        </div>
      )}

      {descendants.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">하위 조직 롤업 요약</h2>
          <p className="text-sm text-[var(--color-muted)]">
            각 하위 조직의 의견 흐름을 빠르게 파악할 수 있습니다.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {children.map((child) => {
              const childDescendants = organizationRepository.getDescendants(child.id);
              const childIds = [child.id, ...childDescendants.map((item) => item.id)];
              const childVoices = voiceRepository.listByOrganizations(childIds);
              const childUrgent = childVoices.filter(
                (entry) => entry.urgency === "immediate"
              ).length;

              return (
                <OrganizationSummaryCard
                  key={child.id}
                  name={child.name}
                  slug={child.slug}
                  total={childVoices.length}
                  urgent={childUrgent}
                  highlight={`${child.name} 조직에서 ${childVoices.length > 0 ? "업무 프로세스" : "신규"} 신호가 감지되었습니다.`}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
