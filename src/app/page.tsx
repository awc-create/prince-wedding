import Link from "next/link";
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
          <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Up next</p>
          <p className="text-[1rem] leading-7 text-ink">
            Bohol
            <br />
            Starting Sunday, 1 November
          </p>
          <p className="mt-3 text-[0.9rem] leading-6 text-sage-dark">
            We&apos;re heading over to Bohol by ferry for a few days of sightseeing and time together.
          </p>
          <Link
            href="/travel/bohol"
            className="display mt-4 inline-block text-[0.68rem] tracking-[0.14em] text-red"
          >
            See the Bohol plans &rarr;
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
