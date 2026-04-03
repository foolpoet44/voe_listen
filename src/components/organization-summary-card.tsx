import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OrganizationSummaryCard({
  name,
  slug,
  total,
  urgent,
  highlight,
}: {
  name: string;
  slug: string;
  total: number;
  urgent: number;
  highlight: string;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base">{name}</CardTitle>
          <Badge variant={urgent > 0 ? "warning" : "default"}>
            {urgent > 0 ? "긴급" : "안정"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-[var(--color-muted)]">{highlight}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-muted)]">의견 수</span>
          <span className="font-semibold">{total}건</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-muted)]">즉시 확인 필요</span>
          <span className="font-semibold text-[var(--color-danger)]">
            {urgent}건
          </span>
        </div>
        <Link
          href={`/boards/${slug}`}
          className="inline-flex text-sm font-semibold text-[var(--color-accent-strong)]"
        >
          조직 보드 보기
        </Link>
      </CardContent>
    </Card>
  );
}
