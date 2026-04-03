export type OrganizationLevel = "center" | "division" | "lab" | "office" | "team" | "unit";

export interface OrganizationNode {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  level: OrganizationLevel;
}

export type OrganizationTreeNode = OrganizationNode & {
  children: OrganizationTreeNode[];
};

export type SubmissionType = "text" | "audio";

export type VoiceCategory =
  | "suggestion"
  | "friction"
  | "work"
  | "leadership"
  | "wellbeing"
  | "culture"
  | "other";

export type Sentiment = "positive" | "neutral" | "negative" | "constructive";

export type Urgency = "low" | "medium" | "high" | "immediate";

export type Scope = "individual" | "team" | "division" | "company";

export type VoiceStatus = "new" | "reviewed" | "actioned" | "closed";

export interface VoiceEntry {
  id: string;
  createdAt: string;
  submissionType: SubmissionType;
  title: string;
  content?: string;
  audioFileUrl?: string;
  transcript?: string;
  category: VoiceCategory;
  sentiment: Sentiment;
  urgency: Urgency;
  scope: Scope;
  isAnonymous: boolean;
  organizationId: string;
  organizationName: string;
  status: VoiceStatus;
}

export interface InsightCluster {
  id: string;
  theme: string;
  summary: string;
  relatedEntryIds: string[];
  volume: number;
  sentimentScore: number;
  urgencyScore: number;
  productivityImpact: string;
  suggestedAction: string;
  organizationId: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  owner: string;
  dueDate: string;
  relatedClusterId: string;
  progressStatus: "planned" | "in_progress" | "blocked" | "done";
  organizationId: string;
}
