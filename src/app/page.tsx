import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Countdown from "@/components/Countdown";
import { wedding } from "@/lib/wedding";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteNav />

      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, var(--hero-top) 0%, var(--hero-bottom) 100%)" }}
      >
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
          <span className="display inline-block rounded-full bg-white/10 px-4 py-1.5 text-[0.65rem] tracking-[0.16em] text-white/80">
            {wedding.tagline}
          </span>

          <h1 className="script mt-6 text-5xl leading-tight text-white sm:text-6xl">
            {wedding.groom}
            <span className="mx-3 not-italic text-white/40">&amp;</span>
            {wedding.bride}
          </h1>

          <p className="mx-auto mt-4 max-w-md text-[0.98rem] leading-7 text-white/60">
            {wedding.dateDisplay} at {wedding.timeDisplay} — {wedding.venue.name}, {wedding.venue.lines[1]}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/rsvp"
              className="display rounded-[var(--radius-lg)] bg-red px-7 py-3 text-[0.72rem] tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-red-dark"
            >
              RSVP
            </Link>
            <Link
              href="/our-story"
              className="display rounded-[var(--radius-lg)] border border-white/25 px-7 py-3 text-[0.72rem] tracking-[0.14em] text-white/90 transition-colors hover:border-white/50"
            >
              Our Story
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.82rem] text-white/50">
            <li>{wedding.dateDisplay}</li>
            <li>Cebu City, Philippines</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Save the date</p>
        <p className="mb-6 text-[1.02rem] leading-7 text-ink">
          {wedding.venue.name}
          <br />
          {wedding.venue.lines.join(", ")}
        </p>
        <Countdown targetISO={wedding.dateISO} />
      </section>

      <SiteFooter />
    </div>
  );
}
