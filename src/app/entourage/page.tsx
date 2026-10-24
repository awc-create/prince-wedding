import PageShell from "@/components/PageShell";

// Each group is a heading plus rows; each row is one person or a couple shown together.
const groups: { title: string; rows: string[][] }[] = [
  {
    title: "Parents of the Bride",
    rows: [["Urbano Alias"], ["Maria Elena Trasmonte Alias"]]
  },
  {
    title: "Parents of the Groom",
    rows: [["Peter Varghese"], ["Latha Varghese"]]
  },
  { title: "Best Man", rows: [["Chandresh Pravin"]] },
  {
    title: "Groomsmen",
    rows: [
      ["Anoshan Antony"],
      ["Shae Kelly"],
      ["Martin O'Toole"],
      ["Daniel Ruben Alias"],
      ["Ryan Trasmonte"]
    ]
  },
  { title: "Maid of Honour", rows: [["Bea Teresa"]] },
  {
    title: "Bridesmaids",
    rows: [["Josephyn Aure"], ["Jo Hannah Alcuino"], ["Miria Benni"], ["Saniya Preman"]]
  },
  {
    title: "Principal Sponsors",
    rows: [
      ["Benni Thysserry", "Jancy Benni"],
      ["Sony Robinson", "Linda Robinson"],
      ["Thomas Alex", "Elizabeth Thomas"],
      ["Orlando Alias", "Clotilde Guinocor"],
      ["Joselito Raniero Dana", "Leonida Cavite"]
    ]
  },
  { title: "Candle Sponsors", rows: [["Roy Varghese", "Mavis Boniface"]] },
  { title: "Veil Sponsors", rows: [["Diju Jose", "Meera Diju"]] },
  { title: "Cord Sponsors", rows: [["Sachin Preman", "Shikitha John"]] },
  {
    title: "Junior Entourage",
    rows: [
      ["Adhithy Aparna"],
      ["Lael Allen Trasmonte"],
      ["Naomi Ritchie"],
      ["Ayaan Benni"],
      ["Jassy Delalamon"]
    ]
  }
];

export default function EntouragePage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">The lineup</p>
      <h2 className="script text-4xl text-ink">Entourage</h2>
      <div className="divider" />

      {groups.map((group) => (
        <section key={group.title} className="mb-10 last:mb-0">
          <p className="display mb-4 text-[0.72rem] tracking-[0.2em] text-red">{group.title}</p>
          <div className="space-y-2">
            {group.rows.map((row) => (
              <p key={row.join("|")} className="text-[1.05rem] leading-7 text-ink">
                {row.join(" & ")}
              </p>
            ))}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
