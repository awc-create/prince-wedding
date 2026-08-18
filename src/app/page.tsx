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
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
          <span className="display mx-auto inline-block max-w-[280px] rounded-2xl bg-white/10 px-4 py-1.5 text-[0.62rem] leading-relaxed tracking-[0.14em] text-white/80 sm:max-w-none sm:rounded-full sm:text-[0.65rem] sm:tracking-[0.16em]">
            {wedding.tagline}
          </span>

          <h1 className="script mt-6 text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Wedding of {wedding.groom.split(" ")[0]}
            <span className="mx-3 not-italic text-white/40">&amp;</span>
            {wedding.bride.split(" ")[0]}
          </h1>

          <p className="mx-auto mt-4 max-w-md text-[0.98rem] leading-7 text-white/60">
            {wedding.dateDisplay} at {wedding.timeDisplay} — {wedding.venue.name}, {wedding.venue.lines[1]}
          </p>

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

        <div className="brand-card mx-auto mt-10 max-w-xl px-6 py-6 text-left">
          <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Reception to follow</p>
          <p className="text-[1rem] leading-7 text-ink">
            {wedding.reception.name}
            <br />
            {wedding.reception.lines.join(", ")}
          </p>
          <p className="mt-3 text-[0.9rem] leading-6 text-sage-dark">{wedding.transportNote}</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
