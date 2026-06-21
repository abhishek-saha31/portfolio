"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Parses a value like "−26%", "$375,179", "87%", "3", "60+", "Free"
// and animates the numeric part from 0 up to target when in view.
export default function Counter({
  value,
  className = "",
  duration = 1400,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  // Extract prefix (non-digits at start), the number, and suffix.
  const match = value.match(/^([^\d-]*)(-|−)?([\d,]*\.?\d+)?(.*)$/);
  const prefix = match?.[1] ?? "";
  const minus = match?.[2] ?? "";
  const numStr = match?.[3] ?? "";
  const suffix = match?.[4] ?? "";
  const hasNumber = numStr !== "";
  const target = hasNumber ? parseFloat(numStr.replace(/,/g, "")) : 0;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const grouped = numStr.includes(",");

  useEffect(() => {
    if (!hasNumber) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = target * eased;
      let formatted = current.toFixed(decimals);
      if (grouped)
        formatted = Number(current.toFixed(decimals)).toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      setDisplay(`${prefix}${minus}${formatted}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {hasNumber ? display : value}
    </span>
  );
}
