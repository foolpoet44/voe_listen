"use client";

import * as React from "react";

import { OrganizationSelector } from "@/components/organization-selector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categoryLabels, sentimentLabels, scopeLabels, urgencyLabels } from "@/lib/labels";
import { OrganizationTreeNode } from "@/types";

const categories = Object.entries(categoryLabels);
const sentiments = Object.entries(sentimentLabels);
const urgencies = Object.entries(urgencyLabels);
const scopes = Object.entries(scopeLabels);

export function SubmissionForm({
  organizationTree,
  initialOrganizationId,
}: {
  organizationTree: OrganizationTreeNode[];
  initialOrganizationId?: string;
}) {
  const [form, setForm] = React.useState({
    title: "",
    content: "",
    category: "",
    sentiment: "",
    urgency: "",
    scope: "",
    organizationId: initialOrganizationId ?? "",
    isAnonymous: true,
    agreement: false,
    audioFile: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const updateField = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "제목을 입력해주세요.";
    if (!form.category) nextErrors.category = "카테고리를 선택해주세요.";
    if (!form.urgency) nextErrors.urgency = "긴급도를 선택해주세요.";
    if (!form.scope) nextErrors.scope = "의견 범위를 선택해주세요.";
    if (!form.organizationId) nextErrors.organizationId = "조직을 선택해주세요.";
    if (!form.content.trim() && !form.audioFile)
      nextErrors.content = "텍스트 또는 오디오 중 하나는 반드시 입력해주세요.";
    if (!form.agreement)
      nextErrors.agreement = "안전한 의견 작성에 동의해주세요.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="p-8">
        <h2 className="text-xl font-semibold">의견 제출이 완료되었습니다.</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          익명 제출을 기본으로 안내하며, HR 팀은 의견을 개인이 아닌 패턴으로
          해석합니다. 조직 개선을 위한 다음 단계를 준비하겠습니다.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          추가 의견 작성하기
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="space-y-6 p-6">
        <div>
          <label className="text-sm font-semibold">제목</label>
          <Input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="예: 일정 변경 공지가 너무 늦게 전달됩니다"
          />
          {errors.title && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">
              {errors.title}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold">의견 내용</label>
          <Textarea
            value={form.content}
            onChange={(event) => updateField("content", event.target.value)}
            placeholder="상황, 영향, 바라는 개선점을 자유롭게 적어주세요."
          />
          {errors.content && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">
              {errors.content}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold">오디오 파일 업로드</label>
          <input
            type="file"
            accept="audio/*"
            className="mt-2 block w-full text-sm"
            onChange={(event) =>
              updateField("audioFile", event.target.files?.[0]?.name ?? "")
            }
          />
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            텍스트 작성이 어렵다면 음성으로 남겨주세요. 전사는 자동 처리됩니다.
            개인 식별 정보가 포함되지 않도록 유의해주세요.
          </p>
        </div>
      </Card>

      <Card className="grid gap-6 p-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold">카테고리</label>
          <Select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
          >
            <option value="">카테고리를 선택해주세요</option>
            {categories.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          {errors.category && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">
              {errors.category}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold">의견 톤</label>
          <Select
            value={form.sentiment}
            onChange={(event) => updateField("sentiment", event.target.value)}
          >
            <option value="">선택해주세요</option>
            {sentiments.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="text-sm font-semibold">긴급도</label>
          <Select
            value={form.urgency}
            onChange={(event) => updateField("urgency", event.target.value)}
          >
            <option value="">선택해주세요</option>
            {urgencies.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          {errors.urgency && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">
              {errors.urgency}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold">범위</label>
          <Select
            value={form.scope}
            onChange={(event) => updateField("scope", event.target.value)}
          >
            <option value="">선택해주세요</option>
            {scopes.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          {errors.scope && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">
              {errors.scope}
            </p>
          )}
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div>
          <label className="text-sm font-semibold">조직 선택</label>
          <OrganizationSelector
            tree={organizationTree}
            value={form.organizationId}
            onChange={(value) => updateField("organizationId", value)}
          />
          {errors.organizationId && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">
              {errors.organizationId}
            </p>
          )}
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={form.isAnonymous}
            onChange={(event) => updateField("isAnonymous", event.target.checked)}
          />
          <div>
            <p className="text-sm font-semibold">익명으로 제출합니다</p>
            <p className="text-xs text-[var(--color-muted)]">
              의견에는 이름·연락처 등 개인 식별 정보를 포함하지 않도록 안내합니다.
              의견은 조직 개선 목적에만 사용됩니다.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={form.agreement}
            onChange={(event) => updateField("agreement", event.target.checked)}
          />
          <div>
            <p className="text-sm font-semibold">안전하고 존중하는 의견 작성에 동의합니다</p>
            <p className="text-xs text-[var(--color-muted)]">
              개인 지목·비난보다 개선에 도움이 되는 의견을 남깁니다.
            </p>
          </div>
        </div>
        {errors.agreement && (
          <p className="text-xs text-[var(--color-danger)]">{errors.agreement}</p>
        )}
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--color-muted)]">
          제출된 의견은 개인이 아닌 패턴으로 해석되며, 조직 개선 계획으로 연결됩니다.
        </p>
        <Button type="submit">안전하게 제출하기</Button>
      </div>
    </form>
  );
}

