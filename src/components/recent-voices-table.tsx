import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/voice-utils";
import { urgencyLabels } from "@/lib/labels";
import { VoiceEntry } from "@/types";

export function RecentVoicesTable({ entries }: { entries: VoiceEntry[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#faf8f5] text-xs uppercase text-[var(--color-muted)]">
          <tr>
            <th className="px-5 py-3">제목</th>
            <th className="px-5 py-3">조직</th>
            <th className="px-5 py-3">긴급도</th>
            <th className="px-5 py-3">등록일</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-t border-[var(--color-border)]">
              <td className="px-5 py-4 font-semibold">{entry.title}</td>
              <td className="px-5 py-4 text-[var(--color-muted)]">
                {entry.organizationName}
              </td>
              <td className="px-5 py-4">
                <Badge
                  variant={entry.urgency === "immediate" ? "danger" : "warning"}
                >
                  {urgencyLabels[entry.urgency]}
                </Badge>
              </td>
              <td className="px-5 py-4 text-[var(--color-muted)]">
                {formatDate(entry.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
