import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { OrganizationNode } from "@/types";

export function BoardHeader({
  organization,
  breadcrumbs,
  stats,
  isParent,
}: {
  organization: OrganizationNode;
  breadcrumbs: OrganizationNode[];
  stats: {
    total: number;
    urgent: number;
    suggestions: number;
  };
  isParent: boolean;
}) {
  return (
    <div className="space-y-4 rounded-3xl border border-[var(--color-border)] bg-white p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
        <Link href="/boards" className="hover:text-foreground">
          조직 보드
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.id} className="flex items-center gap-2">
            <span>·</span>
            <Link
              href={`/boards/${crumb.slug}`}
              className={
                index === breadcrumbs.length - 1
                  ? "text-foreground"
                  : "hover:text-foreground"
              }
            >
              {crumb.name}
            </Link>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold">{organization.name}</h1>
        <Badge variant={isParent ? "default" : "outline"}>
          {isParent ? "상위 조직 집계 포함" : "단일 조직"}
        </Badge>
      </div>
      <p className="text-sm text-[var(--color-muted)]">
        의견이 조직 맥락에서 기록되고, 반복되는 신호가 인사이트로 정리됩니다.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-[var(--color-accent-soft)] p-4">
          <p className="text-xs font-semibold text-[var(--color-accent-strong)]">
            최근 의견
          </p>
          <p className="mt-2 text-2xl font-semibold">{stats.total}건</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-[var(--color-muted)]">
            즉시 확인 필요
          </p>
          <p className="mt-2 text-2xl font-semibold text-[var(--color-danger)]">
            {stats.urgent}건
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-[var(--color-muted)]">
            개선 제안
          </p>
          <p className="mt-2 text-2xl font-semibold">{stats.suggestions}건</p>
        </div>
      </div>
    </div>
  );
}
