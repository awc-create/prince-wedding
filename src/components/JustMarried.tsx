"use client";

import { useEffect, useState } from "react";
import { JM_ASCENT, JM_DESCENT, JM_PATH, JM_WIDTH } from "@/lib/justMarriedPath";

// Ceremony photo lives at public/married/ceremony.jpg
const PHOTO = "/married/ceremony.jpg";
const COOKIE = "wedding_married_seen";

function hasSeen() {
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=`));
}
function markSeen() {
  document.cookie = `${COOKIE}=1; max-age=${60 * 60 * 24 * 365}; path=/; samesite=lax`;
}

function Animation({ onClose }: { onClose: () => void }) {
  const [hasPhoto, setHasPhoto] = useState(true);
  const pad = 60;
  return (
    <div
      className="married-overlay fixed inset-0 z-50 cursor-pointer overflow-hidden bg-[#2a1d12]"
      onClick={onClose}
      role="dialog"
      aria-label="Just married"
    >
      {hasPhoto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={PHOTO}
          alt="Jacob & Angelie on their wedding day"
          onError={() => setHasPhoto(false)}
          className="married-photo absolute inset-0 h-full w-full object-cover object-top"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-14 text-center sm:pb-20">
        <svg
          viewBox={`${-pad} ${-JM_ASCENT - pad} ${JM_WIDTH + pad * 2} ${JM_ASCENT + JM_DESCENT + pad * 2}`}
          className="w-[82vw] max-w-xl overflow-visible"
          role="img"
          aria-label="Just Married"
        >
          <path
            d={JM_PATH}
            pathLength={1}
            className="married-pen"
            fill="#fff"
            stroke="#fff"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="married-sub display mt-2 text-[0.7rem] tracking-[0.24em] text-white/75">
          Jacob &amp; Angelie &middot; 30 October 2026
        </p>
        <p className="married-sub display mt-6 text-[0.6rem] tracking-[0.2em] text-white/40">Tap to continue</p>
      </div>
    </div>
  );
}

export default function JustMarried() {
  const [mode, setMode] = useState<"loading" | "play" | "idle">("loading");
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (hasSeen()) {
      setMode("idle");
    } else {
      markSeen();
      setMode("play");
    }
  }, []);

  return (
    <>
      <div className="my-8 min-h-[7rem] text-center">
        {mode !== "loading" && (
          <button
            onClick={() => {
              setRun((r) => r + 1);
              setMode("play");
            }}
            className="group inline-flex flex-col items-center"
            aria-label="Replay the just married animation"
          >
            <span className="script text-5xl text-red sm:text-6xl">Just Married</span>
            <span className="display mt-3 text-[0.7rem] tracking-[0.24em] text-sage-dark transition-colors group-hover:text-ink">
              Jacob &amp; Angelie &middot; 30 October 2026
            </span>
            <span className="display mt-4 text-[0.6rem] tracking-[0.2em] text-sage-dark">Tap to relive it</span>
          </button>
        )}
      </div>
      {mode === "play" && <Animation key={run} onClose={() => setMode("idle")} />}
    </>
  );
}
