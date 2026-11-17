"use client";

import { useEffect, useRef, useState } from "react";

// Counts up to a number once it scrolls into view. The final figure is in the HTML, so it shows
// without JavaScript and under reduced motion. `value` is the number, `suffix` text after it ("+", " ft").
export default function CountUp({ value, suffix = "", duration = 1600, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return undefined;

    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(Math.round(value * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    setShown(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
