import PageShell from "@/components/PageShell";

const items = [
  {
    time: "How We Met",
    text: "Replace this with the story of how Jacob and Angelie first crossed paths — the setting, the small details, the moment it clicked."
  },
  {
    time: "The First Date",
    text: "Add the story of an early date or memory that set the tone for everything that followed."
  },
  {
    time: "The Proposal",
    text: "Share how and where Jacob popped the question — the details that made it unforgettable."
  },
  {
    time: "Today",
    text: "A short note on where they are now, and how excited they are to celebrate with everyone on October 30th, 2026."
  }
];

export default function OurStoryPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">How it began</p>
      <h2 className="script text-4xl text-ink">Our Story</h2>
      <div className="divider" />
      <p className="mb-8 text-[1.02rem] leading-8 text-sage-dark">
        Every good thing has an origin story — here&apos;s ours. (Edit this page with the real details
        whenever you&apos;re ready!)
      </p>

      <div className="text-left">
        {items.map((item) => (
          <div key={item.time} className="timeline-item">
            <div className="display mb-1 text-[0.72rem] tracking-[0.1em] text-sage-dark">{item.time}</div>
            <p className="leading-7">{item.text}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
