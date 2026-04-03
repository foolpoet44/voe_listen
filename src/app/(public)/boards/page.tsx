import Link from "next/link";

import { OrganizationTree } from "@/components/organization-tree";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { organizationRepository } from "@/repositories/mock-organization-repository";
import { voiceRepository } from "@/repositories/mock-voice-repository";

export default function BoardsPage() {
  const tree = organizationRepository.getTree();
  const voices = voiceRepository.list();

  const getOrgStats = (orgId: string) => {
    const descendants = organizationRepository.getDescendants(orgId);
    const orgIds = [orgId, ...descendants.map((child) => child.id)];
    const scoped = voices.filter((entry) => orgIds.includes(entry.organizationId));
    const urgent = scoped.filter((entry) => entry.urgency === "immediate").length;
    return { total: scoped.length, urgent };
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <section className="space-y-4">
        <p className="text-sm font-semibold text-[var(--color-accent-strong)]">
          조직 기반 리스닝 보드
        </p>
        <h1 className="text-3xl font-semibold">조직을 선택해 의견을 확인하세요</h1>
        <p className="text-sm text-[var(--color-muted)]">
          상위 조직은 하위 조직의 의견을 함께 집계합니다. 조직별로 맥락을 파악하고
          개선 우선순위를 결정할 수 있습니다.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h2 className="text-base font-semibold">조직 트리</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            트리를 따라 이동하면 해당 조직 보드로 바로 이동합니다.
          </p>
          <div className="mt-6">
            <OrganizationTree tree={tree} linkMode="index" />
          </div>
        </Card>

        <div className="grid gap-4">
          {tree.map((node) => {
            const stats = getOrgStats(node.id);
            return (
              <Card key={node.id} id={`org-${node.slug}`} className="org-card h-full scroll-mt-24">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{node.name}</CardTitle>
                      <p className="mt-2 text-sm text-[var(--color-muted)]">
                        하위 조직 {node.children.length}개 포함 · 의견 {stats.total}건
                      </p>
                    </div>
                    <span className="rounded-full bg-[#fff3e0] px-3 py-1 text-xs font-semibold text-[var(--color-warning)]">
                      긴급 {stats.urgent}건
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex flex-wrap gap-2">
                    {node.children.map((child) => (
                      <span
                        key={child.id}
                        className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs"
                      >
                        {child.name}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/boards/${node.slug}`}
                    className="inline-flex text-sm font-semibold text-[var(--color-accent-strong)]"
                  >
                    {node.name} 보드 열기
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
