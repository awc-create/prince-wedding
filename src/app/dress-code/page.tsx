import Image from "next/image";
import PageShell from "@/components/PageShell";

export default function DressCodePage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Sunset colours</p>
      <h2 className="script text-4xl text-ink">Dress Code</h2>
      <div className="divider" />

      <div className="brand-card overflow-hidden p-2">
        <Image
          src="/dress-code/dress-code.jpg"
          alt="Dress code: sunset colours — Barong, Kurta, Sherwani or Suit for gentlemen; Long Gown, Saree, Lehenga or Churidar for ladies"
          width={1535}
          height={1024}
          className="h-auto w-full rounded-[var(--radius-md)]"
        />
      </div>

      <div className="mt-8 text-left text-[0.98rem] leading-7 text-sage-dark">
        <p className="mb-4">
          Our wedding brings together different cultures, traditions and families, and we would
          love for our dress code to reflect that too.
        </p>
        <p className="mb-4">
          We invite you to celebrate with us in soft, elegant colours inspired by a sunset —
          including shades of blush, peach, lavender, powder blue, cream, beige, taupe and light
          brown. The palette is intentionally broad, so please feel free to choose a colour and
          style that you feel comfortable and confident in.
        </p>
        <p className="mb-4">
          We would especially love to see a mixture of Filipino, Indian and Western formalwear
          throughout the day. Whether that means a Barong, Kurta, Sherwani or Suit for the
          gentlemen, or a Long Gown, Saree, Lehenga or Churidar for the ladies, we encourage you to
          embrace whichever style feels right for you.
        </p>
        <p className="mb-4">
          For us, this celebration is about more than bringing two people together — it is also
          about bringing our cultures, families and traditions together. We hope the colours and
          clothing throughout the wedding will become part of that celebration and make the day
          feel even more special.
        </p>
        <p className="mb-6">Most importantly, come dressed to celebrate, dance and enjoy the day with us.</p>
        <p className="script text-2xl text-ink">
          With love,
          <br />
          Jacob &amp; Angelie
        </p>
      </div>
    </PageShell>
  );
}
