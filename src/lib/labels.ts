import { Scope, Sentiment, Urgency, VoiceCategory, VoiceStatus } from "@/types";

export const categoryLabels: Record<VoiceCategory, string> = {
  suggestion: "제안",
  friction: "불편/방해",
  work: "업무",
  leadership: "리더십",
  wellbeing: "삶의 질",
  culture: "문화",
  other: "기타",
};

export const sentimentLabels: Record<Sentiment, string> = {
  positive: "긍정",
  neutral: "중립",
  negative: "부정",
  constructive: "건설적 제안",
};

export const urgencyLabels: Record<Urgency, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
  immediate: "즉시 확인 필요",
};

export const scopeLabels: Record<Scope, string> = {
  individual: "개인",
  team: "팀",
  division: "부문",
  company: "전사",
};

export const statusLabels: Record<VoiceStatus, string> = {
  new: "신규",
  reviewed: "검토됨",
  actioned: "조치 중",
  closed: "종결",
};
