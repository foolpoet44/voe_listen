import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant="admin" />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
