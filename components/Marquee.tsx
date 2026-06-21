"use client";
import { keywords } from "@/lib/content";

export default function Marquee() {
  const row = [...keywords, ...keywords]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden border-y border-line py-4">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-soft to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-soft to-transparent"
        aria-hidden
      />
      <div className="flex w-max animate-[marquee_36s_linear_infinite] gap-0 whitespace-nowrap">
        {row.map((k, i) => (
          <span
            key={i}
            className="flex items-center font-mono text-[12px] uppercase tracking-[0.08em] text-ink-faint"
          >
            <span className="px-5">{k}</span>
            <span className="text-signal">·</span>
          </span>
        ))}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
