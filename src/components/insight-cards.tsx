import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightCluster } from "@/types";

export function InsightCards({ clusters }: { clusters: InsightCluster[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {clusters.map((cluster) => (
        <Card key={cluster.id}>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">{cluster.theme}</CardTitle>
              <Badge variant={cluster.urgencyScore > 0.6 ? "warning" : "default"}>
                중요도 {Math.round(cluster.urgencyScore * 100)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-[var(--color-muted)]">{cluster.summary}</p>
            <div className="rounded-2xl bg-[#f8f6f2] p-3">
              <p className="text-xs font-semibold text-[var(--color-muted)]">
                제안된 다음 행동
              </p>
              <p className="mt-1 text-sm font-semibold">{cluster.suggestedAction}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
