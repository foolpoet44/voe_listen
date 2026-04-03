import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import {
  categoryLabels,
  sentimentLabels,
  scopeLabels,
  urgencyLabels,
} from "@/lib/labels";

const categories = Object.entries(categoryLabels);
const sentiments = Object.entries(sentimentLabels);
const urgencies = Object.entries(urgencyLabels);
const scopes = Object.entries(scopeLabels);

export function SubmissionFormStep2({
  form,
  errors,
  onChange,
  onBack,
  onSubmit,
}: {
  form: {
    category: string;
    sentiment: string;
    urgency: string;
    scope: string;
    isAnonymous: boolean;
    agreement: boolean;
  };
  errors: Record<string, string>;
  onChange: (key: string, value: string | boolean) => void;
  onBack: () => void;
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

      <Card className="grid gap-6 p-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold">
            카테고리 <span className="text-[var(--color-danger)]">*</span>
          </label>
          <Select
            value={form.category}
            onChange={(event) => onChange("category", event.target.value)}
          >
            <option value="">카테고리를 선택해주세요</option>
            {categories.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          {errors.category && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.category}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--color-muted)]">
            의견 톤 <span className="text-xs">(선택)</span>
          </label>
          <Select
            value={form.sentiment}
            onChange={(event) => onChange("sentiment", event.target.value)}
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
          <label className="text-sm font-semibold">
            긴급도 <span className="text-[var(--color-danger)]">*</span>
          </label>
          <Select
            value={form.urgency}
            onChange={(event) => onChange("urgency", event.target.value)}
          >
            <option value="">선택해주세요</option>
            {urgencies.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          {errors.urgency && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.urgency}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold">
            범위 <span className="text-[var(--color-danger)]">*</span>
          </label>
          <Select
            value={form.scope}
            onChange={(event) => onChange("scope", event.target.value)}
          >
            <option value="">선택해주세요</option>
            {scopes.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          {errors.scope && (
            <p className="mt-2 text-xs text-[var(--color-danger)]">{errors.scope}</p>
          )}
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={form.isAnonymous}
            onChange={(event) => onChange("isAnonymous", event.target.checked)}
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
            onChange={(event) => onChange("agreement", event.target.checked)}
          />
          <div>
            <p className="text-sm font-semibold">
              안전하고 존중하는 의견 작성에 동의합니다
              <span className="ml-2 text-[var(--color-danger)]">*</span>
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              개인 지목·비난보다 개선에 도움이 되는 의견을 남깁니다.
            </p>
          </div>
        </div>
        {errors.agreement && (
          <p className="text-xs text-[var(--color-danger)]">{errors.agreement}</p>
        )}
      </Card>

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          이전 단계
        </Button>
        <Button type="submit">안전하게 제출하기</Button>
      </div>
    </form>
  );
}
