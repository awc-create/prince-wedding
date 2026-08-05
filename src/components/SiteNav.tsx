"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/wedding";

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <div className="relative z-20 border-b border-black/[0.06] bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/prince-foods-logo.png"
            alt="Prince Foods"
            width={140}
            height={74}
            className="h-10 w-auto"
          />
          <span className="display text-[0.7rem] tracking-[0.14em] text-ink">Jacob &amp; Angelie</span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`display pb-0.5 text-[0.68rem] tracking-[0.1em] text-ink transition-colors ${
                  active ? "border-b-2 border-red" : "border-b-2 border-transparent hover:text-red"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
