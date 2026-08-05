import Link from "next/link";
import PageShell from "@/components/PageShell";
import { wedding } from "@/lib/wedding";

export default function DetailsPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Save the date</p>
      <h2 className="script text-4xl text-ink">Event Details</h2>
      <div className="divider" />

      <div className="text-left">
        <div className="timeline-item">
          <div className="display mb-1 text-[0.72rem] tracking-[0.1em] text-sage-dark">
            Ceremony &middot; {wedding.timeDisplay}
          </div>
          <p className="leading-7">
            <strong>{wedding.venue.name}</strong>
            <br />
            {wedding.venue.lines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="timeline-item">
          <div className="display mb-1 text-[0.72rem] tracking-[0.1em] text-sage-dark">
            Reception &middot; To Follow
          </div>
          <p className="leading-7">
            Details on the reception venue and timing will be added here closer to the date. Please
            check back or watch your inbox for updates.
          </p>
        </div>
      </div>

      <div className="brand-card my-6 px-6 py-8">
        <p className="text-[1.05rem] leading-7">{wedding.giftNote}</p>
      </div>

      <Link
        href="/rsvp"
        className="display mt-2 inline-block rounded-[var(--radius-lg)] bg-red px-9 py-3 text-[0.72rem] tracking-[0.14em] text-white transition-colors hover:bg-red-dark"
      >
        RSVP
      </Link>
    </PageShell>
  );
}
