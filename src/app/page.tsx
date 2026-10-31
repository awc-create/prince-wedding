import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CountUp from "@/components/CountUp";
import JustMarried from "@/components/JustMarried";
import { wedding } from "@/lib/wedding";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteNav />

      <section className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Married</p>
        <p className="mb-6 text-[1.02rem] leading-7 text-ink">
          {wedding.venue.name}
          <br />
          {wedding.venue.lines.join(", ")}
        </p>

        <JustMarried />
        <CountUp sinceISO={wedding.marriedISO} />

        <div className="brand-card mx-auto mt-10 max-w-xl px-6 py-6 text-left">
          <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Reception</p>
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
