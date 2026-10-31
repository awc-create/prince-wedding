"use client";

import { useEffect, useState } from "react";

type Message = { id: string; name: string; message: string; createdAt: string };

function fmtShort(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { day: "", rest: "" };
  return {
    day: String(d.getDate()),
    rest: d.toLocaleDateString("en-GB", { month: "short", year: "numeric" })
  };
}

const TILTS = ["-rotate-[0.8deg]", "rotate-[0.6deg]", "-rotate-[0.3deg]", "rotate-[1deg]"];

function Stamp() {
  return (
    <div className="stamp" aria-hidden>
      <span className="script text-xl leading-none">J&amp;A</span>
      <span className="display mt-1 text-[0.45rem] tracking-[0.12em]">Cebu</span>
    </div>
  );
}

function Address({ from }: { from: React.ReactNode }) {
  return (
    <div className="mt-auto pt-6">
      <p className="display text-[0.55rem] tracking-[0.16em] text-sage-dark">To</p>
      <p className="hand text-2xl leading-7 text-ink">Jacob &amp; Angelie</p>
      <p className="hand text-lg leading-6 text-sage-dark">Cebu, Philippines</p>
      <div className="mt-3 border-t border-dashed border-black/20 pt-2">
        <p className="display text-[0.55rem] tracking-[0.16em] text-sage-dark">From</p>
        {from}
      </div>
    </div>
  );
}

export default function MessagesClient() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function load() {
    try {
      const res = await fetch("/api/messages", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load messages");
      setMessages(data.messages);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load messages");
      setMessages([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    setSent(false);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message: text, website: honey })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send");
      setMessages((prev) => [data.message, ...(prev ?? [])]);
      setText("");
      setSent(true);
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="text-left">
      <div className="mb-10 text-center">
        <button
          type="button"
          onClick={() => {
            setError("");
            setSent(false);
            setOpen(true);
          }}
          className="display rounded-[var(--radius-lg)] bg-red px-8 py-3 text-[0.72rem] tracking-[0.14em] text-white transition-colors hover:bg-red-dark"
        >
          Add a postcard
        </button>
        {sent && <p className="mt-3 text-[0.9rem] text-sage-dark">Posted — it&apos;s on the wall below. Thank you!</p>}
      </div>

      {/* Write a postcard (modal) */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-10"
          onClick={() => !sending && setOpen(false)}
        >
          <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute -top-8 right-0 text-2xl leading-none text-white"
            >
              ×
            </button>
      <form onSubmit={submit} className="postcard relative overflow-hidden">
        <input
          type="text"
          name="website"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <div className="grid sm:grid-cols-[1.5fr_1fr]">
          <div className="p-5 sm:border-r sm:border-dashed sm:border-black/20">
            <p className="display mb-2 text-[0.6rem] tracking-[0.16em] text-sage-dark">Write your postcard</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={1500}
              required
              rows={6}
              placeholder="Dear Jacob & Angelie…"
              aria-label="Your message"
              className="postcard-lines hand w-full resize-none bg-transparent text-2xl text-ink outline-none placeholder:text-black/30"
            />
          </div>
          <div className="flex flex-col p-5">
            <div className="flex justify-end">
              <Stamp />
            </div>
            <Address
              from={
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  required
                  placeholder="Your name"
                  aria-label="Your name"
                  className="hand w-full border-b border-black/20 bg-transparent text-2xl text-ink outline-none placeholder:text-black/30 focus:border-red"
                />
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 bg-black/[0.03] px-5 py-3">
          <p className={`text-[0.88rem] ${error ? "text-red" : "text-sage-dark"}`}>
            {error || "Everyone who visits this page can read it."}
          </p>
          <button
            type="submit"
            disabled={sending}
            className="display rounded-[var(--radius-lg)] bg-red px-7 py-2.5 text-[0.7rem] tracking-[0.14em] text-white transition-colors hover:bg-red-dark disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send postcard"}
          </button>
        </div>
      </form>
          </div>
        </div>
      )}

      <p className="display mb-5 text-[0.72rem] tracking-[0.14em] text-sage-dark">
        {messages ? `${messages.length} postcard${messages.length === 1 ? "" : "s"}` : "Loading…"}
      </p>

      {/* Postcards wall */}
      <ul className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {messages?.map((m, i) => {
          const d = fmtShort(m.createdAt);
          return (
            <li key={m.id} className={`postcard flex flex-col ${TILTS[i % TILTS.length]}`}>
              <div className="flex-1 p-5">
                <p className="hand whitespace-pre-wrap break-words text-[1.65rem] leading-8 text-ink">{m.message}</p>
              </div>
              <div className="flex items-end justify-between gap-3 border-t border-dashed border-black/20 px-5 py-4">
                <div className="min-w-0">
                  <p className="display text-[0.55rem] tracking-[0.16em] text-sage-dark">From</p>
                  <p className="hand break-words text-2xl leading-7 text-ink">{m.name}</p>
                  <p className="display mt-1 text-[0.55rem] tracking-[0.16em] text-sage-dark">
                    To Jacob &amp; Angelie, Cebu
                  </p>
                </div>
                <div className="flex shrink-0 items-start" aria-hidden>
                  <div className="postmark mr-1 mt-1 scale-90">
                    <span>Cebu</span>
                    <span className="text-[0.7rem] font-semibold">{d.day}</span>
                    <span>{d.rest}</span>
                  </div>
                  <div className="-ml-5">
                    <Stamp />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
