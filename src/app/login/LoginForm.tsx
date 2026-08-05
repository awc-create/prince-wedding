"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { wedding } from "@/lib/wedding";

export default function LoginForm() {
  const router = useRouter();
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

      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong — please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="brand-card w-full max-w-sm px-8 py-10 text-center">
      <Image
        src="/brand/prince-foods-logo.png"
        alt="Prince Foods"
        width={120}
        height={63}
        className="mx-auto mb-5 h-8 w-auto"
      />
      <p className="display mb-1 text-[0.68rem] tracking-[0.2em] text-sage-dark">Private celebration</p>
      <h1 className="script mb-3 text-3xl text-ink">{wedding.siteName}</h1>
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
