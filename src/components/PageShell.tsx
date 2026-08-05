import { ReactNode } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteNav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 text-center">{children}</main>
      <SiteFooter />
    </div>
  );
}
