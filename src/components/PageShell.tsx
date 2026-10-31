import { ReactNode } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

export default function PageShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteNav />
      <main
        className={`mx-auto w-full flex-1 py-16 text-center ${wide ? "max-w-none px-4 sm:px-8" : "max-w-3xl px-6"}`}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
