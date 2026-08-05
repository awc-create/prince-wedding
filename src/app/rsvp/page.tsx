import PageShell from "@/components/PageShell";
import { wedding } from "@/lib/wedding";
import RsvpForm from "./RsvpForm";

export default function RsvpPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Kindly respond</p>
      <h2 className="script text-4xl text-ink">RSVP</h2>
      <div className="divider" />
      <p className="text-[1.02rem] leading-8 text-sage-dark">
        Please respond by <strong className="text-ink">{wedding.rsvpBy}</strong>.
      </p>

      <RsvpForm />

      <p className="mt-8 text-[0.85rem] text-sage-dark">
        Having trouble with the form? Email us directly at{" "}
        <a
          href="mailto:jacob.and.angelie@example.com?subject=RSVP%20for%20Jacob%20%26%20Angelie"
          className="text-red"
        >
          jacob.and.angelie@example.com
        </a>{" "}
        <em>(replace with your real contact email)</em>.
      </p>
    </PageShell>
  );
}
