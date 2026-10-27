"use client";

import { useEffect, useState } from "react";

// A thin gold bar under the header that shows how far down an article the reader is.
export default function ReadingProgress({ targetId }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const done = Math.min(Math.max(-r.top + window.innerHeight * 0.3, 0), Math.max(total, 1));
      setPct(Math.round((done / Math.max(total, 1)) * 100));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-transparent" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
      <div className="h-full bg-gold transition-[width] duration-150" style={{ width: `${pct}%` }} />
    </div>
  );
}
