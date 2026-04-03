"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const publicLinks = [
  { href: "/", label: "홈" },
  { href: "/boards", label: "조직 보드" },
  { href: "/submit", label: "의견 제출" },
  { href: "/insights", label: "인사이트" },
];

const adminLinks = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/dashboard/insights", label: "인사이트" },
  { href: "/boards", label: "조직 보드" },
];

export function SiteHeader({ variant = "public" }: { variant?: "public" | "admin" }) {
  const pathname = usePathname();
  const links = variant === "admin" ? adminLinks : publicLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-base font-semibold">
            VOE 리스닝 플랫폼
          </Link>
          <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-accent-strong)]">
            {variant === "admin" ? "관리자 분석 보기" : "직원/조직용"}
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => {
            const isDashboardRoot = link.href === "/dashboard";
            const active =
              pathname === link.href ||
              (!isDashboardRoot && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium text-[var(--color-muted)] transition-colors",
                  active && "text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {variant === "public" ? (
            <Button size="sm" asChild>
              <Link href="/submit">의견 작성</Link>
            </Button>
          ) : (
            <Button size="sm" variant="outline" asChild>
              <Link href="/">직원 뷰 보기</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
