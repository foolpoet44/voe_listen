import { VoiceEntry } from "@/types";

export function sortByDateDesc(entries: VoiceEntry[]) {
  return [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function countBy<T extends string>(
  entries: VoiceEntry[],
  getter: (entry: VoiceEntry) => T
) {
  return entries.reduce<Record<T, number>>((acc, entry) => {
    const key = getter(entry);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

export function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}
