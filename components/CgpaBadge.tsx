"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CgpaBadge({
  value,
  scale,
  label,
}: {
  value: string;
  scale: string;
  label: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const [display, setDisplay] = useState("0.00");
  const [done, setDone] = useState(false);
  const target = parseFloat(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 2;

  const run = () => {
    const start = performance.now();
    const dur = 1300;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay((target * eased).toFixed(decimals));
      if (t < 1) requestAnimationFrame(tick);
      else setDone(true);
    };
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (inView && !done) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <button
      ref={ref}
      onClick={() => {
        setDone(false);
        run();
      }}
      data-cursor="hov"
      className="group inline-flex items-baseline gap-2 rounded border border-signal/40 bg-signal/[0.06] px-4 py-3 transition-all hover:border-signal hover:bg-signal/[0.12]"
      title="Click to replay"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-signal">
        {label}
      </span>
      <span className="font-serif text-[28px] font-light leading-none text-ink">
        {display}
      </span>
      <span className="font-mono text-[12px] text-ink-faint">/ {scale}</span>
    </button>
  );
}
