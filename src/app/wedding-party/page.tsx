import PageShell from "@/components/PageShell";

const bridesmaids = [
  { name: "Bridesmaid Name", role: "Maid of Honor" },
  { name: "Bridesmaid Name", role: "Bridesmaid" },
  { name: "Bridesmaid Name", role: "Bridesmaid" }
];

const groomsmen = [
  { name: "Groomsman Name", role: "Best Man" },
  { name: "Groomsman Name", role: "Groomsman" },
  { name: "Groomsman Name", role: "Groomsman" }
];

function PartyGrid({ people }: { people: { name: string; role: string }[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {people.map((p, i) => (
        <div key={i} className="brand-card px-6 py-8 text-center">
          <div className="text-[1.1rem] text-ink">{p.name}</div>
          <div className="display mt-1 text-[0.68rem] tracking-[0.12em] text-sage-dark">{p.role}</div>
        </div>
      ))}
    </div>
  );
}

export default function WeddingPartyPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">The lineup</p>
      <h2 className="script text-4xl text-ink">Wedding Party</h2>
      <div className="divider" />
      <p className="mb-4 text-[1.02rem] leading-8 text-sage-dark">
        The people standing beside Jacob &amp; Angelie on the big day. Swap in real names, roles, and
        photos whenever you&apos;re ready.
      </p>

      <p className="display mt-10 text-[0.68rem] tracking-[0.2em] text-sage-dark">Bridesmaids</p>
      <PartyGrid people={bridesmaids} />

      <p className="display mt-10 text-[0.68rem] tracking-[0.2em] text-sage-dark">Groomsmen</p>
      <PartyGrid people={groomsmen} />
    </PageShell>
  );
}
