import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryLabels, sentimentLabels, urgencyLabels } from "@/lib/labels";
import { formatDate } from "@/lib/voice-utils";
import { VoiceEntry } from "@/types";

export function VoiceCard({ entry, showOrg = false }: { entry: VoiceEntry; showOrg?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">{entry.title}</CardTitle>
          <span className="text-xs text-[var(--color-muted)]">
            {formatDate(entry.createdAt)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-[var(--color-muted)]">{entry.content}</p>
        <div className="flex flex-wrap gap-2">
          <Badge>{categoryLabels[entry.category]}</Badge>
          <Badge variant="outline">{sentimentLabels[entry.sentiment]}</Badge>
          <Badge variant={entry.urgency === "immediate" ? "danger" : "warning"}>
            {urgencyLabels[entry.urgency]}
          </Badge>
          {showOrg && (
            <Badge variant="outline">{entry.organizationName}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
