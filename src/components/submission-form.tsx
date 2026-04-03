"use client";

import Link from "next/link";
import * as React from "react";

import { SubmissionFormStep1 } from "@/components/submission-form-step1";
import { SubmissionFormStep2 } from "@/components/submission-form-step2";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OrganizationTreeNode } from "@/types";

export function SubmissionForm({
  organizationTree,
  initialOrganizationId,
}: {
  organizationTree: OrganizationTreeNode[];
  initialOrganizationId?: string;
}) {
  const [step, setStep] = React.useState<1 | 2>(1);
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
  const [submittedOrgId, setSubmittedOrgId] = React.useState("");

  React.useEffect(() => {
    if (initialOrganizationId) {
      setForm((prev) => ({ ...prev, organizationId: initialOrganizationId }));
      return;
    }

    const savedOrgId = window.localStorage.getItem("lastSelectedOrgId");
    if (savedOrgId) {
      setForm((prev) => ({ ...prev, organizationId: savedOrgId }));
    }
  }, [initialOrganizationId]);

  const updateField = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleOrgChange = (orgId: string) => {
    updateField("organizationId", orgId);
    if (orgId) {
      window.localStorage.setItem("lastSelectedOrgId", orgId);
    } else {
      window.localStorage.removeItem("lastSelectedOrgId");
    }
  };

  const validateStep1 = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "제목을 입력해주세요.";
    if (!form.content.trim() && !form.audioFile)
      nextErrors.content = "텍스트 또는 오디오 중 하나는 반드시 입력해주세요.";
    if (!form.organizationId) nextErrors.organizationId = "조직을 선택해주세요.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.category) nextErrors.category = "카테고리를 선택해주세요.";
    if (!form.urgency) nextErrors.urgency = "긴급도를 선택해주세요.";
    if (!form.scope) nextErrors.scope = "의견 범위를 선택해주세요.";
    if (!form.agreement)
      nextErrors.agreement = "안전한 의견 작성에 동의해주세요.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
    return true;
  };

  const handleStep1Submit = () => {
    if (!validateStep1()) return;
    setErrors({});
    setStep(2);
  };

  const handleStep2Submit = () => {
    if (!validateStep2()) return;
    setSubmittedOrgId(form.organizationId);
    setSubmitted(true);
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  if (submitted) {
    const submittedOrg = findOrgInTree(organizationTree, submittedOrgId);
    const submittedOrgSlug = submittedOrg?.slug ?? "";

    return (
      <Card className="space-y-6 p-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold">의견 제출이 완료되었습니다.</h2>
          <p className="text-sm text-[var(--color-muted)]">
            {submittedOrg?.name ? (
              <>
                방금 작성한 의견이 <strong>{submittedOrg.name}</strong> 보드에
                등록되었습니다.
              </>
            ) : (
              "의견이 안전하게 등록되었습니다."
            )}
          </p>
        </div>

        <div className="space-y-3 border-t pt-6">
          <p className="text-sm font-semibold">다음 단계</p>
          <Button asChild variant="outline" className="h-auto w-full justify-start">
            <Link
              href={submittedOrgSlug ? `/boards/${submittedOrgSlug}` : "/boards"}
              className="flex flex-col items-start py-3"
            >
              <span className="font-semibold">방금 제출한 조직 보드 보기</span>
              <span className="text-xs text-[var(--color-muted)]">
                같은 조직의 의견 흐름을 확인합니다.
              </span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto w-full justify-start">
            <Link href="/submit" className="flex flex-col items-start py-3">
              <span className="font-semibold">추가 의견 작성하기</span>
              <span className="text-xs text-[var(--color-muted)]">
                다른 의견이 있다면 계속 제출할 수 있습니다.
              </span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto w-full justify-start">
            <Link href="/insights" className="flex flex-col items-start py-3">
              <span className="font-semibold">조직 인사이트 보기</span>
              <span className="text-xs text-[var(--color-muted)]">
                의견이 어떻게 요약되는지 확인합니다.
              </span>
            </Link>
          </Button>
        </div>

        <Button variant="ghost" className="w-full" onClick={() => setSubmitted(false)}>
          초기 화면으로
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {step === 1 ? (
        <SubmissionFormStep1
          form={{
            title: form.title,
            content: form.content,
            organizationId: form.organizationId,
            audioFile: form.audioFile,
          }}
          errors={errors}
          organizationTree={organizationTree}
          onChange={(key, value) => {
            if (key === "organizationId") {
              handleOrgChange(value);
            } else {
              updateField(key, value);
            }
          }}
          onSubmit={handleStep1Submit}
        />
      ) : (
        <SubmissionFormStep2
          form={{
            category: form.category,
            sentiment: form.sentiment,
            urgency: form.urgency,
            scope: form.scope,
            isAnonymous: form.isAnonymous,
            agreement: form.agreement,
          }}
          errors={errors}
          onChange={updateField}
          onBack={handleBack}
          onSubmit={handleStep2Submit}
        />
      )}
    </div>
  );
}

function findOrgInTree(
  tree: OrganizationTreeNode[],
  orgId: string
): OrganizationTreeNode | undefined {
  for (const node of tree) {
    if (node.id === orgId) return node;
    const found = findOrgInTree(node.children, orgId);
    if (found) return found;
  }
  return undefined;
}
