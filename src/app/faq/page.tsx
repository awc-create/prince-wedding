import PageShell from "@/components/PageShell";

const faqs = [
  {
    q: "What should I wear?",
    a: "Semi-formal / garden formal attire. We'd love a soft, earthy palette — think sage, cream, and blush. Please avoid white and bright red."
  },
  {
    q: "Can I bring a plus-one?",
    a: "We've kept our guest list intimate. Your invitation and RSVP form will note the number of seats reserved for you — plus-ones are only included if listed."
  },
  {
    q: "Are kids welcome?",
    a: "We adore your little ones, but we're keeping the celebration adults-only so everyone can relax and celebrate."
  },
  {
    q: "Is there parking at the venue?",
    a: "Parking details for the Shrine of St. Pedro Calungsod / Archbishop's Residence Compound will be shared closer to the date — check back here for updates."
  },
  {
    q: "Do you have a gift registry?",
    a: "No registry needed — your presence is the only gift on our list. Please, no presents."
  },
  {
    q: "What time should I arrive?",
    a: "Please arrive by 12:30 PM for a 1:00 PM ceremony start at the Shrine of St. Pedro Calungsod."
  },
  {
    q: "Who do I contact with other questions?",
    a: "Reach out via the email listed on our RSVP page and we'll get back to you as soon as we can."
  }
];

export default function FaqPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Good to know</p>
      <h2 className="script text-4xl text-ink">FAQ</h2>
      <div className="divider" />

      <div className="text-left">
        {faqs.map((item) => (
          <div key={item.q} className="border-b border-black/10 py-5">
            <h3 className="mb-2 text-[1.02rem] font-medium text-ink">{item.q}</h3>
            <p className="leading-7 text-sage-dark">{item.a}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
