export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <span>VOE Listening Platform · 조직 기반 의견 수집 MVP</span>
        <span>의견은 개인이 아닌 패턴으로 해석됩니다.</span>
      </div>
    </footer>
  );
}
