import { OrganizationSelector } from "@/components/organization-selector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OrganizationTreeNode } from "@/types";

export function SubmissionFormStep1({
  form,
  errors,
  organizationTree,
  onChange,
  onSubmit,
}: {
  form: {
    title: string;
    content: string;
    organizationId: string;
    audioFile: string;
  };
  errors: Record<string, string>;
  organizationTree: OrganizationTreeNode[];
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
}) {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      {hasErrors && (
        <Card className="border border-red-300 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-900">다음을 확인해주세요:</p>
          <ul className="mt-2 space-y-1 text-sm text-red-800">
            {Object.values(errors).map((error, index) => (
              <li key={`${error}-${index}`} className="flex items-start gap-2">
                <span>•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="space-y-6 p-6">
        <div>
          <label className="text-sm font-semibold">
            제목 <span className="text-[var(--color-danger)]">*</span>
          </label>
          <Input
            value={form.title}
            onChange={(event) => onChange("title", event.target.value)}
            placeholder="예: 일정 변경 공지가 너무 늦게 전달됩니다"
          />
          {errors.title && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold">
            의견 내용 <span className="text-[var(--color-danger)]">*</span>
            <span className="ml-2 text-xs text-[var(--color-muted)]">
              (텍스트 또는 오디오 중 하나 필수)
            </span>
          </label>
          <Textarea
            value={form.content}
            onChange={(event) => onChange("content", event.target.value)}
            placeholder="상황, 영향, 바라는 개선점을 자유롭게 적어주세요."
          />
          {errors.content && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.content}</p>
          )}
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div>
          <label className="text-sm font-semibold">
            조직 선택 <span className="text-[var(--color-danger)]">*</span>
          </label>
          <OrganizationSelector
            tree={organizationTree}
            value={form.organizationId}
            onChange={(value) => onChange("organizationId", value)}
          />
          {errors.organizationId && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">
              {errors.organizationId}
            </p>
          )}
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div>
          <label className="text-sm font-semibold">
            오디오 파일 업로드
            <span className="ml-2 text-xs text-[var(--color-muted)]">(선택)</span>
          </label>
          <input
            type="file"
            accept="audio/*"
            className="mt-2 block w-full text-sm"
            onChange={(event) =>
              onChange("audioFile", event.target.files?.[0]?.name ?? "")
            }
          />
          <div className="mt-3 rounded-2xl border border-[#c6e3f2] bg-[#eff7fb] p-3 text-xs text-[#15506d]">
            <p className="font-semibold">안내</p>
            <p className="mt-1">
              오디오는 전사되어 텍스트로 정리됩니다. 개인 식별 정보가 포함되지
              않도록 유의해주세요.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--color-muted)]">
          다음 단계에서 카테고리와 긴급도를 추가로 입력합니다.
        </p>
        <Button type="submit">다음 단계로</Button>
      </div>
    </form>
  );
}
