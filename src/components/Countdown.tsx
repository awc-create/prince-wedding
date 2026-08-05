"use client";

import { useEffect, useState } from "react";

function getRemaining(targetISO: string) {
  const diff = Math.max(0, new Date(targetISO).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((diff % (1000 * 60)) / 1000)
  };
}

export default function Countdown({ targetISO }: { targetISO: string }) {
  const [time, setTime] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setTime(getRemaining(targetISO));
    const id = setInterval(() => setTime(getRemaining(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  const units: [string, number | string][] = [
    ["Days", time?.days ?? "--"],
    ["Hours", time?.hours ?? "--"],
    ["Mins", time?.mins ?? "--"],
    ["Secs", time?.secs ?? "--"]
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {units.map(([label, value]) => (
        <div key={label} className="brand-card min-w-[74px] px-4 py-3 text-center">
          <span className="display block text-2xl text-red">{value}</span>
          <span className="display text-[0.6rem] tracking-[0.14em] text-sage-dark">{label}</span>
        </div>
      ))}
    </div>
  );
}
