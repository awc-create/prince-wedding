import Link from "next/link";
import PageShell from "@/components/PageShell";
import { wedding } from "@/lib/wedding";

const faqs = [
  {
    q: "What should I wear?",
    a: (
      <>
        Our dress code for the wedding ceremony and reception is Sunset Colours. Please see the{" "}
        <Link href="/dress-code" className="text-red">
          Dress Code
        </Link>{" "}
        page for more details and inspiration.
      </>
    )
  },
  {
    q: "Can I bring a plus-one?",
    a: "Yes, you're welcome to bring a plus-one. Please just let us know one month (30/09/2026) in advance so we can include them in our final guest numbers."
  },
  {
    q: "Are kids welcome?",
    a: "Yes, children are very welcome."
  },
  {
    q: "Is there parking at the Church and reception venue?",
    a: "Parking at the church is limited. Parking is available at the reception venue; however, we recommend making use of the arranged transport from the Church to Cebu so you can relax and enjoy the evening — and a few drinks — without having to worry about driving."
  },
  {
    q: "How far is the reception venue from the church?",
    a: "The journey from the church to the reception venue takes approximately one hour, allowing for traffic and the journey across to Mactan Island. Canapés will be served from 4:00 PM onwards at the reception venue."
  },
  {
    q: "How will I get from the church to the reception and back to my accommodation?",
    a: "Transportation will be arranged for guests from the church to the reception venue after the ceremony. We'll be travelling together by Coaster, a small local-style bus commonly used for group transport in the Philippines. At the end of the evening, return transport will also be arranged back towards Cebu City. Once we know where everyone is staying, we'll organise either a convenient central drop-off point or, where practical, individual accommodation drop-offs."
  },
  {
    q: "Do you have a gift registry?",
    a: "We don't have a gift registry. Your presence is the only gift on our list, so please — no presents."
  },
  {
    q: "What time should I arrive?",
    a: "Please arrive by 12:30 PM for the 1:00 PM ceremony at the Shrine of St. Pedro Calungsod."
  },
  {
    q: "Who do I contact with other questions?",
    a: (
      <>
        If you have any other questions, please contact {wedding.contactName} on{" "}
        <a href={`tel:${wedding.contactPhone.replace(/\s+/g, "")}`} className="text-red">
          {wedding.contactPhone}
        </a>
        .
      </>
    )
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
