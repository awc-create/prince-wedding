"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "That passcode doesn't match — please try again.");
        setLoading(false);
        return;
      }

      // Hard navigation (not router.push) so middleware re-checks the
      // freshly-set cookie on a clean request instead of relying on the
      // client router, which can otherwise appear to hang.
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      window.location.href = callbackUrl;
    } catch {
      setError("Something went wrong — please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="brand-card w-full max-w-sm px-8 py-10 text-center">
      <Image
        src="/brand/jacob-angelie-logo.png"
        alt="Jacob & Angelie"
        width={1309}
        height={711}
        className="mx-auto mb-4 h-14 w-auto"
      />
      <p className="display mb-5 text-[0.68rem] tracking-[0.2em] text-sage-dark">Private celebration</p>
      <p className="mb-5 text-[0.9rem] leading-6 text-sage-dark">
        Please enter the passcode from your invitation to view the site.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          autoComplete="off"
          placeholder="Passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className="w-full rounded-[var(--radius-sm)] border border-black/15 bg-white px-4 py-3 text-center text-[1rem] tracking-[0.15em]"
        />
        <button
          type="submit"
          disabled={loading}
          className="display mt-4 inline-block rounded-[var(--radius-lg)] bg-red px-9 py-3 text-[0.72rem] tracking-[0.14em] text-white transition-colors hover:bg-red-dark disabled:opacity-50"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
        <p className="mt-3 min-h-[1.2em] text-[0.8rem] text-red-700">{error}</p>
      </form>
    </div>
  );
}
