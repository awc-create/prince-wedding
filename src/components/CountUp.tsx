"use client";

import { useEffect, useState } from "react";

function elapsed(sinceISO: string) {
  const diff = Math.max(0, Date.now() - new Date(sinceISO).getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000)
  };
}

export default function CountUp({ sinceISO }: { sinceISO: string }) {
  const [t, setT] = useState<ReturnType<typeof elapsed> | null>(null);

  useEffect(() => {
    setT(elapsed(sinceISO));
    const id = setInterval(() => setT(elapsed(sinceISO)), 1000);
    return () => clearInterval(id);
  }, [sinceISO]);

  const units: [string, number | string][] = [
    ["Days", t?.days ?? "--"],
    ["Hours", t?.hours ?? "--"],
    ["Mins", t?.mins ?? "--"],
    ["Secs", t?.secs ?? "--"]
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {units.map(([label, value]) => (
          <div key={label} className="brand-card min-w-[74px] px-4 py-3 text-center">
            <span className="display block text-2xl text-red">{value}</span>
            <span className="display text-[0.6rem] tracking-[0.14em] text-sage-dark">{label}</span>
          </div>
        ))}
      </div>
      <p className="display mt-3 text-[0.62rem] tracking-[0.2em] text-sage-dark">Married</p>
    </div>
  );
}
