import PageShell from "@/components/PageShell";

// NOTE: This page is intentionally NOT in the nav (see src/lib/wedding.ts).
// Jacob wants to ask permission before featuring Samudratheeram publicly.
// To publish: add { href: "/charity", label: "Charity" } to navLinks.

export default function CharityPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Giving back</p>
      <h2 className="script text-4xl text-ink">Charity</h2>
      <div className="divider" />

      <div className="text-left text-[0.98rem] leading-7 text-sage-dark">
        <p className="mb-4">
          We truly don&apos;t need gifts — your presence is the only thing on our list. If
          you would still like to give something, we&apos;d love for you to consider supporting a
          cause close to our family.
        </p>

        <div className="brand-card mb-6 px-6 py-6">
          <h3 className="script mb-2 text-2xl text-ink">Samudratheeram</h3>
          <p className="display mb-3 text-[0.68rem] tracking-[0.12em] text-sage-dark">
            Samudra Charitable Trust &middot; Kollam, Kerala
          </p>
          <p className="mb-3">
            Samudratheeram is a secular old age home offering shelter, food, clothing and medical
            care to elderly residents, built on the values of truth, love and mercy. The trust also
            runs a monthly free eye treatment camp and other community programmes.
          </p>
          <p>
            Any contribution is entirely optional and goes directly to the trust through their own
            website.
          </p>
        </div>

        <div className="brand-card mb-6 px-6 py-6">
          <p className="display mb-3 text-[0.72rem] tracking-[0.14em] text-red">Pay offline</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[0.95rem]">
            <dt className="font-medium text-ink">Account name</dt>
            <dd>Samudra Charitable Trust</dd>
            <dt className="font-medium text-ink">Account number</dt>
            <dd>12590200002521</dd>
            <dt className="font-medium text-ink">Bank</dt>
            <dd>Federal Bank</dd>
            <dt className="font-medium text-ink">IFSC code</dt>
            <dd>FDRL0001259</dd>
          </dl>
          <p className="mt-3 text-[0.85rem] italic">FCRA account available.</p>
        </div>

        <div className="text-center">
          <p className="display mb-3 text-[0.72rem] tracking-[0.14em] text-red">Pay online</p>
          <a
            href="https://samudratheeram.org/donate-now/"
            target="_blank"
            rel="noreferrer"
            className="display inline-block rounded-[var(--radius-lg)] bg-red px-8 py-3 text-[0.72rem] tracking-[0.14em] text-white transition-colors hover:bg-red-dark"
          >
            Donate now
          </a>
        </div>
      </div>
    </PageShell>
  );
}
