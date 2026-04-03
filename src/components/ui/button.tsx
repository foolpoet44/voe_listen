import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "accent" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]",
  outline:
    "border border-[var(--color-border)] bg-white text-foreground hover:border-[var(--color-accent)]",
  ghost: "text-foreground hover:bg-[var(--color-accent-soft)]",
  accent:
    "bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] hover:bg-[#c7e7dd]",
  danger: "bg-[var(--color-danger)] text-white hover:bg-[#8a1f14]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(buttonClassName, child.props.className),
    });
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
