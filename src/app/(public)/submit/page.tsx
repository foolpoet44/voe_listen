import Link from "next/link";

import { SubmissionForm } from "@/components/submission-form";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { organizationRepository } from "@/repositories/mock-organization-repository";

export default function SubmitPage({
  searchParams,
}: {
  searchParams?: { org?: string };
}) {
  const tree = organizationRepository.getTree();
  const selectedOrg = searchParams?.org
    ? organizationRepository.getBySlug(searchParams.org)
    : undefined;
  const invalidOrg = Boolean(searchParams?.org && !selectedOrg);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[var(--color-accent-strong)]">
          안전한 의견 제출
        </p>
        <h1 className="text-3xl font-semibold">당신의 목소리를 남겨주세요</h1>
        <p className="text-sm text-[var(--color-muted)]">
          이 공간은 누구를 평가하거나 추적하지 않습니다. 의견은 조직 개선을 위한
          신호로만 사용됩니다.
        </p>
      </div>

      {invalidOrg && (
        <EmptyState
          title="선택한 조직을 찾을 수 없습니다"
          description="조직명이 변경되었을 수 있습니다. 전체 조직 보기로 전환합니다."
          action={
            <Button asChild>
              <Link href="/submit">전체 조직 선택하기</Link>
            </Button>
          }
        />
      )}

      <Card className="space-y-3 border border-[var(--color-border)] bg-white p-6 text-sm">
        <p className="font-semibold text-foreground">신뢰와 안전을 위한 약속</p>
        <ul className="space-y-2 text-[var(--color-muted)]">
          <li>· 익명 제출이 기본입니다. 의견에는 개인 식별 정보를 적지 않도록 안내합니다.</li>
          <li>· HR은 개인이 아닌 패턴을 중심으로 의견을 해석합니다.</li>
          <li>· 조직 개선에 필요한 경우에만 요약된 인사이트가 공유됩니다.</li>
        </ul>
      </Card>

      <Card className="space-y-3 border border-[var(--color-border)] bg-[#f7f2ec] p-6 text-sm">
        <p className="font-semibold text-foreground">제출 후 어떻게 진행되나요?</p>
        <ol className="space-y-2 text-[var(--color-muted)]">
          <li>1. 의견은 조직별 보드에 축적됩니다.</li>
          <li>2. 반복 신호가 감지되면 인사이트로 요약됩니다.</li>
          <li>3. 실행 가능한 액션이 정리되어 리더와 공유됩니다.</li>
        </ol>
      </Card>

      <SubmissionForm
        organizationTree={tree}
        initialOrganizationId={selectedOrg?.id}
      />
    </div>
  );
}
