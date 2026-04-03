import * as React from "react";

import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
