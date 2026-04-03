import { Card } from "@/components/ui/card";

export function DashboardStats({
  total,
  urgent,
  constructive,
  actioned,
}: {
  total: number;
  urgent: number;
  constructive: number;
  actioned: number;
}) {
  const items = [
    { label: "전체 의견", value: `${total}건`, tone: "text-foreground" },
    { label: "즉시 확인 필요", value: `${urgent}건`, tone: "text-[var(--color-danger)]" },
    { label: "건설적 제안", value: `${constructive}건`, tone: "text-[var(--color-accent-strong)]" },
    { label: "조치 진행", value: `${actioned}건`, tone: "text-[var(--color-success)]" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="p-5">
          <p className="text-xs font-semibold text-[var(--color-muted)]">
            {item.label}
          </p>
          <p className={`mt-2 text-2xl font-semibold ${item.tone}`}>
            {item.value}
          </p>
        </Card>
      ))}
    </div>
  );
}
