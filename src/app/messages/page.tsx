import PageShell from "@/components/PageShell";
import MessagesClient from "./MessagesClient";

export default function MessagesPage() {
  return (
    <PageShell wide>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Guest book</p>
      <h2 className="script text-4xl text-ink">Postcards</h2>
      <div className="divider" />
      <p className="mb-8 text-[1rem] leading-7 text-sage-dark">
        Write a postcard to Jacob &amp; Angelie. They&apos;ll all be pinned up here for everyone to read.
      </p>
      <MessagesClient />
    </PageShell>
  );
}
