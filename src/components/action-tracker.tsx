import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionItem } from "@/types";

const statusLabel: Record<ActionItem["progressStatus"], { label: string; variant: "default" | "success" | "warning" | "danger" }> = {
  planned: { label: "계획", variant: "default" },
  in_progress: { label: "진행 중", variant: "success" },
  blocked: { label: "지연", variant: "danger" },
  done: { label: "완료", variant: "default" },
};

export function ActionTracker({ items }: { items: ActionItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{item.title}</CardTitle>
              <Badge variant={statusLabel[item.progressStatus].variant}>
                {statusLabel[item.progressStatus].label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-[var(--color-muted)]">{item.description}</p>
            <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
              <span>담당: {item.owner}</span>
              <span>기한: {item.dueDate}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
