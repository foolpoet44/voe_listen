import { categoryLabels, sentimentLabels } from "@/lib/labels";
import { countBy } from "@/lib/voice-utils";
import { VoiceEntry } from "@/types";

export function getVoiceStats(entries: VoiceEntry[]) {
  return {
    total: entries.length,
    urgent: entries.filter((entry) => entry.urgency === "immediate").length,
    constructive: entries.filter((entry) => entry.sentiment === "constructive").length,
    actioned: entries.filter((entry) => entry.status === "actioned").length,
    suggestions: entries.filter((entry) => entry.category === "suggestion").length,
  };
}

export function getCategoryChartData(entries: VoiceEntry[]) {
  const counts = countBy(entries, (entry) => entry.category);
  return Object.entries(counts).map(([key, value]) => ({
    name: categoryLabels[key as keyof typeof categoryLabels],
    value,
  }));
}

export function getSentimentChartData(entries: VoiceEntry[]) {
  const counts = countBy(entries, (entry) => entry.sentiment);
  return Object.entries(counts).map(([key, value]) => ({
    name: sentimentLabels[key as keyof typeof sentimentLabels],
    value,
  }));
}
