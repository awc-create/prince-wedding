import { wedding } from "@/lib/wedding";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-black/[0.06] bg-white px-6 py-8 text-center">
      <p className="display text-[0.68rem] tracking-[0.14em] text-ink">
        {wedding.groom.split(" ")[0]} &amp; {wedding.bride.split(" ")[0]} &middot; October 30, 2026
      </p>
      <p className="mt-1 text-[0.75rem] text-sage-dark">Cebu City, Philippines</p>
    </footer>
  );
}
