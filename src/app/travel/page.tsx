import { ReactNode } from "react";
import PageShell from "@/components/PageShell";

const origins = [
  {
    flag: "🇬🇧",
    country: "United Kingdom",
    note: "Visa-free 30 days. Fly Heathrow → Manila, then Manila → Cebu."
  },
  {
    flag: "🇮🇳",
    country: "India",
    note: "Visa-free 14–30 days depending on other visas held. Fly via Singapore or Kuala Lumpur."
  }
];

const visaUK = [
  "Visa-free for up to 30 days for tourism.",
  "Passport must be valid at least 6 months beyond your intended stay.",
  "Confirmed return or onward ticket required.",
  "Proof of sufficient funds and accommodation details may be requested.",
  "Extensions possible through the Bureau of Immigration in 29-day increments."
];

const visaIndia = [
  "Visa-free for a non-extendible 14 days for tourism (passport valid ≥6 months beyond stay + confirmed hotel booking + proof of funds + return/onward ticket).",
  "Visa-free for a non-extendible 30 days if you hold a valid/current US, Japanese, Australian, Canadian, Schengen, Singapore or UK visa or residence permit.",
  "For longer stays, apply for a 9(a) Temporary Visitor's Visa at a Philippine Embassy or Consulate well in advance."
];

const sightseeing = [
  {
    area: "South Cebu — the adventure hub",
    items: [
      "Moalboal: snorkel or dive the year-round sardine run plus sea turtles.",
      "Kawasan Falls / Badian: canyoneering through a jungle canyon to turquoise falls.",
      "Oslob: swim or snorkel with whale sharks (early morning, follow eco-rules). Nearby Tumalog Falls.",
      "Osmeña Peak: Cebu's highest point — short hike, dramatic limestone views.",
      "Carcar: famous roadside lechon stops."
    ]
  },
  {
    area: "Bohol (nearby island)",
    items: ["2-hour fast ferry from Cebu City Pier 1 — Chocolate Hills, tarsier sanctuary, Loboc River cruise and beaches. Easy overnight or long day trip."]
  },
  {
    area: "In and near Cebu City",
    items: [
      "Historic sites: Magellan's Cross, Basilica del Santo Niño, Fort San Pedro, Heritage of Cebu Monument.",
      "Taoist Temple, museums, or Ayala/IT Park for dining and nightlife.",
      "Mactan Island beaches or short island-hopping trips for snorkelling."
    ]
  }
];

const foodMustTries = [
  "Lechon Cebu — crispy skin, herb-stuffed, no sauce needed. Try CnT Lechon, Rico's, Zubuchon, House of Lechon, or roadside spots in Carcar.",
  "Puso (hanging rice in woven palm leaves) — perfect with lechon or BBQ.",
  "Sinuglaw / Kinilaw — grilled meat or fresh seafood, ceviche-style.",
  "Street food & BBQ — Larsian, Sugbo Mercado night market in IT Park, siomai, ngohiong, skewers.",
  "Other favourites — danggit, humba, bam-i noodles, fresh seafood, mango desserts, halo-halo, sikwate."
];

const practicalTips = [
  "Weather & packing — light breathable clothes, rain jacket or umbrella, comfortable walking shoes, reef-safe sunscreen, insect repellent. Modest attire for the church.",
  "Transport — Grab is your best friend in the city, and great for food deliveries too. Hire a van or join an organised tour for longer island trips.",
  "Health & safety — standard travel precautions, drink bottled water, pharmacies are easy to find.",
  "SIM / data — buy a local SIM (Globe or Smart) at the airport for cheap data.",
  "Currency — roughly 75–80 PHP to £1, 50–55 PHP to $1, 0.65–0.70 PHP to ₹1 (check live rates closer to travel)."
];

function Accordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="brand-card group mb-4 px-5 py-4 text-left [&_summary::-webkit-details-marker]:hidden">
      <summary className="display flex cursor-pointer list-none items-center justify-between text-[0.78rem] tracking-[0.08em] text-ink">
        {title}
        <span className="text-red transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="mt-4 text-[0.9rem] leading-6 text-sage-dark">{children}</div>
    </details>
  );
}

export default function TravelPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Getting there</p>
      <h2 className="script text-4xl text-ink">Travel &amp; Stay</h2>
      <div className="divider" />
      <p className="mb-8 text-[1.02rem] leading-7 text-sage-dark">
        We&apos;re celebrating in Cebu City, Philippines, with family and friends joining mainly
        from the UK and India. Full guide below — information current as of 30 July 2026, so
        always cross-check visas, entry rules and flights closer to October 2026.
      </p>

      <p className="display mb-4 text-[0.68rem] tracking-[0.2em] text-sage-dark">Coming from</p>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {origins.map((o) => (
          <div key={o.country} className="brand-card flex items-center gap-4 px-5 py-4 text-left">
            <span className="text-3xl leading-none">{o.flag}</span>
            <div>
              <div className="display text-[0.78rem] tracking-[0.06em] text-ink">{o.country}</div>
              <p className="mt-1 text-[0.88rem] leading-6 text-sage-dark">{o.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="brand-card mb-10 px-6 py-6 text-left">
        <div className="display mb-2 text-[0.72rem] tracking-[0.1em] text-ink">Suggested timeline</div>
        <p className="text-[0.9rem] leading-6 text-sage-dark">
          Wedding day is <strong className="text-ink">Friday, 30 October 2026</strong>. Ideal
          arrival is <strong className="text-ink">26–28 October</strong> (earlier if combining with
          sightseeing), and ideal departure is <strong className="text-ink">after 3 November</strong>{" "}
          (Jacob &amp; Joshua&apos;s birthday is on the 3rd!). October is toward the end of typhoon
          season — expect 25–30°C, humidity, and possible afternoon showers, with conditions
          usually improving by late October.
        </p>
      </div>

      <p className="display mb-3 text-[0.68rem] tracking-[0.2em] text-sage-dark">The full guide</p>

      <Accordion title="Visa requirements">
        <p className="display mb-1 text-[0.72rem] tracking-[0.08em] text-ink">UK / British passport holders</p>
        <ul className="mb-4 list-disc space-y-1 pl-5">
          {visaUK.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="display mb-1 text-[0.72rem] tracking-[0.08em] text-ink">
          Indian passport holders (policy effective June 2025)
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5">
          {visaIndia.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="display mb-1 text-[0.72rem] tracking-[0.08em] text-ink">All travellers</p>
        <p>
          Complete free eTravel registration at{" "}
          <a href="https://etravel.gov.ph" className="text-red" target="_blank" rel="noreferrer">
            etravel.gov.ph
          </a>{" "}
          within 72 hours before arrival — you&apos;ll get a QR code airlines often require for
          boarding. Never use paid third-party sites. Always verify the latest rules on the
          Philippine Bureau of Immigration or your embassy&apos;s website.
        </p>
      </Accordion>

      <Accordion title="Flights & approximate costs">
        <p className="mb-3">
          Airport: <strong className="text-ink">Mactan-Cebu International Airport (CEB)</strong>,
          on Mactan Island, connected by bridges to Cebu City.
        </p>
        <p className="display mb-1 text-[0.72rem] tracking-[0.08em] text-ink">From the UK</p>
        <p className="mb-2">
          Fly London Heathrow → Manila (MNL), then a short connecting flight Manila → Cebu (CEB).
          Strongest long-haul options: Etihad Airways, Air China, China Southern (Shenzhen
          Airlines can be cheaper but with longer layovers).
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5">
          <li>London–Manila return: roughly £400–£500</li>
          <li>Manila–Cebu one-way (Cebu Pacific, direct): roughly £21–£30</li>
        </ul>
        <p className="display mb-1 text-[0.72rem] tracking-[0.08em] text-ink">From India (Thiruvananthapuram)</p>
        <p className="mb-4">
          One-stop routes via Singapore or Kuala Lumpur are most convenient. Approximate return
          fares: ₹20,000–₹30,000. Book early for the best prices.
        </p>
        <p className="display mb-1 text-[0.72rem] tracking-[0.08em] text-ink">Manila → Cebu domestic flight</p>
        <p className="mb-4">
          Very frequent — almost hourly on Cebu Pacific, Philippine Airlines and AirAsia, about 1
          hour 30 minutes. Strong recommendation: book this leg for as soon as possible after you
          land in Manila, so you clear immigration and fly straight to Cebu without an unplanned
          overnight stay.
        </p>
        <p>
          Baggage note: long-haul tickets often include only a cabin bag unless you add checked
          luggage, and domestic flights (especially Cebu Pacific) are strict on allowances — add
          checked bags at booking if needed.
        </p>
      </Accordion>

      <Accordion title="Airport to Cebu City">
        <p>
          CEB is about 14 km / 30–60 minutes from central Cebu City depending on traffic.{" "}
          <strong className="text-ink">Grab</strong> is the most convenient way in — it accepts
          foreign cards, is tracked, safe and reliable (download the app before you arrive), and
          is also excellent for food deliveries once you&apos;re in Cebu. Avoid unofficial touts
          inside the terminal.
        </p>
      </Accordion>

      <Accordion title="Where to stay">
        <p className="display mb-1 text-[0.72rem] tracking-[0.08em] text-ink">Cebu City — most convenient for the wedding</p>
        <p className="mb-4">
          Ayala Center / Cebu Business Park / IT Park: safest and most convenient for first-timers
          — malls, restaurants, easy Grab access. Good mid-to-upscale options include Seda Ayala
          Center, Quest Hotel and Radisson Blu. Near SM City Cebu or downtown for other mid-range
          choices.
        </p>
        <p className="display mb-1 text-[0.72rem] tracking-[0.08em] text-ink">Mactan Island</p>
        <p className="mb-4">
          Near the airport, more resort-style — beach resorts and hotels if you prefer a quieter
          base or easy airport access (Shangri-La, Crimson, or mid-range options).
        </p>
        <p>
          <strong className="text-ink">Airbnb</strong> is convenient and often cheaper, especially
          for families and larger groups — highly recommended if travelling together. Book early,
          as properties fill around the wedding season. We&apos;ll share group-rate or preferred
          hotel suggestions once the reception venue is finalised.
        </p>
      </Accordion>

      <Accordion title="Paying for things">
        <ul className="list-disc space-y-1 pl-5">
          <li>Foreign cards (Visa/Mastercard) and Apple Pay are widely accepted in Cebu City hotels, malls, restaurants and many shops.</li>
          <li>Cash (Philippine Peso, PHP) is still useful for smaller vendors, markets and street food.</li>
          <li>If travelling around other islands/provinces, cards are less widely accepted — keep some cash with you.</li>
          <li>ATMs are widely available (BDO, BPI, Metrobank, etc.). Notify your bank before travelling.</li>
          <li>Roughly 75–80 PHP to £1, 50–55 PHP to $1, 0.65–0.70 PHP to ₹1 — check live rates closer to travel.</li>
        </ul>
      </Accordion>

      <Accordion title="Things to do around Cebu Island">
        {sightseeing.map((group) => (
          <div key={group.area} className="mb-4 last:mb-0">
            <p className="display mb-1 text-[0.72rem] tracking-[0.08em] text-ink">{group.area}</p>
            <ul className="list-disc space-y-1 pl-5">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <p className="mt-4">
          Private vans, organised day tours, or public buses/vans from the South Bus Terminal make
          these accessible. Further details of post-wedding excursions will follow.
        </p>
      </Accordion>

      <Accordion title="What to eat">
        <p className="mb-3">
          Cebu is famous for lechon (roast pig) — Anthony Bourdain called it the best he&apos;d
          ever had.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          {foodMustTries.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3">
          Plenty of international options are available in the malls and IT Park. Vegetarian
          options exist but are more limited — communicate clearly.
        </p>
      </Accordion>

      <Accordion title="Practical tips">
        <ul className="list-disc space-y-1 pl-5">
          {practicalTips.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Accordion>

      <div className="brand-card mt-8 px-6 py-6">
        <p className="text-[0.92rem] leading-6 text-sage-dark">
          We&apos;ll share more details — exact reception venue, group transport, suggested hotels
          and coordinated excursions — once everything is finalised. Questions about travel?
          Reach out on the RSVP page and we&apos;ll help however we can.
        </p>
      </div>
    </PageShell>
  );
}
