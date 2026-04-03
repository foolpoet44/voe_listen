import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]",
  success: "bg-[#e8f7ee] text-[var(--color-success)]",
  warning: "bg-[#fff3e0] text-[var(--color-warning)]",
  danger: "bg-[#fdecea] text-[var(--color-danger)]",
  outline: "border border-[var(--color-border)] text-[var(--color-muted)]",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
