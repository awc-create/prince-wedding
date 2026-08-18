import Link from "next/link";
import PageShell from "@/components/PageShell";
import { wedding } from "@/lib/wedding";

type ItineraryEvent = {
  title: string;
  meta?: string;
  address?: string[];
  note?: string;
  link?: string;
};

const days: { date: string; events: ItineraryEvent[] }[] = [
  {
    date: "Wednesday, 28 October 2026",
    events: [
      { title: "Bachelor's Party", meta: "Venue TBC" },
      { title: "Bridal Shower", meta: "Venue TBC" }
    ]
  },
  {
    date: "Thursday, 29 October 2026",
    events: [
      {
        title: "Madhuram Veppu",
        meta: "5:00 PM",
        address: ["GrayPlace", "262 Guerillero, Lapu-Lapu City, 6015 Central Visayas, Philippines"]
      }
    ]
  },
  {
    date: "Friday, 30 October 2026",
    events: [
      {
        title: "Wedding Ceremony",
        meta: "1:00 PM",
        address: [
          wedding.venue.name,
          "Archbishop's Residence Compound, D. Jakosalem Street, Cebu City, Philippines"
        ]
      },
      {
        title: "Wedding Reception",
        meta: wedding.reception.time,
        address: [wedding.reception.name, ...wedding.reception.lines],
        note: wedding.transportNote
      }
    ]
  },
  {
    date: "Saturday, 31 October 2026",
    events: [{ title: "Recovery Day", meta: "Free day for guests" }]
  },
  {
    date: "Sunday, 1 November 2026",
    events: [{ title: "Post-Wedding Trip to Bohol", meta: "See the Bohol page for full details", link: "/travel/bohol" }]
  }
];

export default function ItineraryPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Save the date</p>
      <h2 className="script text-4xl text-ink">Wedding Week Itinerary</h2>
      <div className="divider" />

      <div className="text-left">
        {days.map((day) => (
          <div key={day.date} className="mb-8 last:mb-0">
            <p className="display mb-3 text-[0.72rem] tracking-[0.12em] text-red">{day.date}</p>
            {day.events.map((event) => (
              <div key={event.title} className="timeline-item">
                <div className="display mb-1 text-[0.72rem] tracking-[0.1em] text-sage-dark">
                  {event.title} {event.meta ? <>&middot; {event.meta}</> : null}
                </div>
                {event.address ? (
                  <p className="leading-7">
                    <strong>{event.address[0]}</strong>
                    {event.address.slice(1).map((line) => (
                      <span key={line}>
                        <br />
                        {line}
                      </span>
                    ))}
                  </p>
                ) : null}
                {event.note ? <p className="mt-1 text-[0.9rem] leading-6 text-sage-dark">{event.note}</p> : null}
                {event.link ? (
                  <Link href={event.link} className="mt-1 inline-block text-[0.9rem] text-red">
                    View the Bohol page &rarr;
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="brand-card my-6 px-6 py-8">
        <p className="text-[1.05rem] leading-7">{wedding.giftNote}</p>
      </div>
    </PageShell>
  );
}
