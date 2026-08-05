"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "sent" | "error";

export default function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      attending: (form.elements.namedItem("attending") as RadioNodeList).value,
      guests: (form.elements.namedItem("guests") as HTMLInputElement).value,
      dietary: (form.elements.namedItem("dietary") as HTMLTextAreaElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong sending your RSVP — please try the email link below instead.");
    }
  }

  if (status === "sent") {
    return (
      <div className="brand-card my-6 px-6 py-8">
        <p className="text-[1.05rem] leading-7">
          Thank you! Your RSVP has been noted. We can&apos;t wait to celebrate with you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="brand-card mt-6 px-6 py-8 text-left sm:px-8">
      <label className="display mb-1 mt-4 block text-[0.68rem] tracking-[0.1em] text-sage-dark" htmlFor="name">
        Full Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        className="w-full rounded-[var(--radius-sm)] border border-black/15 bg-white px-3 py-2.5 text-[0.95rem]"
      />

      <fieldset className="mt-4">
        <legend className="display mb-1 text-[0.68rem] tracking-[0.1em] text-sage-dark">
          Will you be attending?
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-[0.95rem]">
            <input type="radio" name="attending" value="yes" defaultChecked /> Joyfully Accepts
          </label>
          <label className="flex items-center gap-2 text-[0.95rem]">
            <input type="radio" name="attending" value="no" /> Regretfully Declines
          </label>
        </div>
      </fieldset>

      <label className="display mb-1 mt-4 block text-[0.68rem] tracking-[0.1em] text-sage-dark" htmlFor="guests">
        Number of Guests (including yourself)
      </label>
      <input
        id="guests"
        name="guests"
        type="number"
        min={1}
        max={6}
        defaultValue={1}
        className="w-full rounded-[var(--radius-sm)] border border-black/15 bg-white px-3 py-2.5 text-[0.95rem]"
      />

      <label className="display mb-1 mt-4 block text-[0.68rem] tracking-[0.1em] text-sage-dark" htmlFor="dietary">
        Dietary Notes / Allergies
      </label>
      <textarea
        id="dietary"
        name="dietary"
        placeholder="Let us know of any restrictions"
        className="min-h-[80px] w-full rounded-[var(--radius-sm)] border border-black/15 bg-white px-3 py-2.5 text-[0.95rem]"
      />

      <label className="display mb-1 mt-4 block text-[0.68rem] tracking-[0.1em] text-sage-dark" htmlFor="message">
        Message for the Couple (optional)
      </label>
      <textarea
        id="message"
        name="message"
        className="min-h-[80px] w-full rounded-[var(--radius-sm)] border border-black/15 bg-white px-3 py-2.5 text-[0.95rem]"
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="display mt-6 inline-block rounded-[var(--radius-lg)] bg-red px-9 py-3 text-[0.72rem] tracking-[0.14em] text-white transition-colors hover:bg-red-dark disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Submit RSVP"}
      </button>

      {status === "error" && <p className="mt-3 text-[0.85rem] text-red-700">{errorMsg}</p>}
    </form>
  );
}
