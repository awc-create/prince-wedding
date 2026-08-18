import Image from "next/image";
import PageShell from "@/components/PageShell";
import { wedding } from "@/lib/wedding";

const sightseeing = [
  "The Chocolate Hills",
  "Visiting the Philippine Tarsier Sanctuary",
  "Exploring the countryside and some of Bohol's scenic viewpoints",
  "The Loboc River",
  "Beaches and relaxed time around Panglao",
  "Optional island hopping, snorkelling and marine activities"
];

export default function BoholPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">After the wedding</p>
      <h2 className="script text-4xl text-ink">Bohol</h2>
      <div className="divider" />

      <div className="brand-card mb-8 overflow-hidden p-2">
        <Image
          src="/bohol/beach.jpg"
          alt="Panglao beach, Bohol"
          width={1440}
          height={960}
          className="h-auto w-full rounded-[var(--radius-md)]"
        />
      </div>

      <div className="text-left text-[0.98rem] leading-7 text-sage-dark">
        <p className="mb-4">Keep the celebrations going and join us for a few days in Bohol after the wedding.</p>
        <p className="mb-8">
          We plan to leave Cebu on <strong className="text-ink">Sunday, 1 November 2026</strong> and
          travel to Bohol by ferry. We&apos;ll be staying around Panglao, where there&apos;s a great
          mix of beaches, restaurants and easy access to the island&apos;s main attractions.
        </p>

        <h3 className="script mb-3 text-2xl text-ink">What We&apos;re Planning</h3>
        <p className="mb-4">
          During our stay, we&apos;re hoping to arrange a few optional guided trips and group
          activities that everyone joining us in Bohol can take part in. Some of the sightseeing
          we&apos;re planning includes:
        </p>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="brand-card overflow-hidden p-1.5">
            <Image
              src="/bohol/chocolate-hills.jpg"
              alt="The Chocolate Hills, Bohol"
              width={669}
              height={446}
              className="h-auto w-full rounded-[var(--radius-sm)]"
            />
          </div>
          <div className="brand-card overflow-hidden p-1.5">
            <Image
              src="/bohol/tarsier.jpg"
              alt="Philippine tarsier, Bohol"
              width={670}
              height={457}
              className="h-auto w-full rounded-[var(--radius-sm)]"
            />
          </div>
        </div>

        <ul className="mb-8 list-disc space-y-1 pl-5">
          {sightseeing.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mb-8">
          Nothing will be too formal — the idea is to spend a few days together, explore Bohol and
          relax after the wedding. Guests are welcome to join as many or as few of the organised
          activities as they like.
        </p>

        <h3 className="script mb-3 text-2xl text-ink">Let Us Know If You&apos;re Joining</h3>
        <p className="mb-2">
          We will need to know numbers in advance, particularly so we can organise the ferry from
          Cebu and plan transport and guided activities in Bohol.
        </p>
        <p className="mb-8">
          If you would like to join us, please let us know as early as possible — you can reach{" "}
          {wedding.contactName} directly at{" "}
          <a href={`tel:${wedding.contactPhone.replace(/\s+/g, "")}`} className="text-red">
            {wedding.contactPhone}
          </a>
          .
        </p>

        <h3 className="script mb-3 text-2xl text-ink">Where to Stay</h3>
        <p className="mb-2">
          We recommend staying in Panglao, ideally around the Alona Beach / central Panglao area,
          so everyone is reasonably close together.
        </p>
        <p className="mb-8">
          Guests can book their own accommodation depending on their budget and preferences.
          We&apos;ll also provide some recommended hotels and resorts to make choosing somewhere
          easier.
        </p>

        <h3 className="script mb-3 text-2xl text-ink">Travelling Home</h3>
        <p className="mb-1"><strong className="text-ink">Flying home from Cebu?</strong></p>
        <p className="mb-4">
          You can take the ferry back from Bohol to Cebu and continue your journey from
          Mactan-Cebu International Airport.
        </p>
        <p className="mb-1"><strong className="text-ink">Flying home via Manila?</strong></p>
        <p className="mb-8">
          Bohol has its own airport with domestic flights to Manila, so flying directly from Bohol
          to Manila may be the easiest option rather than returning to Cebu first.
        </p>

        <p>
          We&apos;ll provide more details on ferry timings, accommodation recommendations and the
          planned Bohol itinerary closer to the wedding.
        </p>
      </div>
    </PageShell>
  );
}
