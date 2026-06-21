"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pipeline } from "@/lib/content";

export default function Pipeline() {
  const [active, setActive] = useState(0);

  return (
    <div className="border border-line bg-bg p-[clamp(20px,4vw,40px)]">
      <div className="mb-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
        <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-signal" />
        Methodology — click any stage
      </div>

      {/* stage chips */}
      <div className="flex flex-wrap gap-2">
        {pipeline.map((s, i) => (
          <button
            key={s.n}
            onClick={() => setActive(i)}
            className={`group relative flex items-center gap-2 rounded border px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.04em] transition-all ${
              active === i
                ? "border-signal bg-signal/[0.08] text-ink"
                : "border-line text-ink-faint hover:border-ink-faint hover:text-ink-dim"
            }`}
          >
            <span
              className={active === i ? "text-signal" : "text-ink-faint"}
            >
              {s.n}
            </span>
            {s.title}
          </button>
        ))}
      </div>

      {/* connector flow line */}
      <div className="my-7 flex items-center gap-1.5">
        {pipeline.map((_, i) => (
          <div key={i} className="flex flex-1 items-center gap-1.5">
            <div
              className={`h-px flex-1 transition-colors duration-300 ${
                i <= active ? "bg-signal" : "bg-line"
              }`}
            />
            {i < pipeline.length - 1 && (
              <div
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  i < active ? "bg-signal" : "bg-line"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-5 min-[641px]:grid-cols-[auto_1fr] min-[641px]:items-center"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-[clamp(40px,6vw,68px)] font-extralight leading-none text-signal">
              {pipeline[active].n}
            </span>
            <div>
              <div className="font-serif text-[22px] font-light">
                {pipeline[active].title}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-signal">
                {pipeline[active].tag}
              </div>
            </div>
          </div>
          <p className="max-w-[56ch] text-[15px] leading-[1.7] text-ink-dim">
            {pipeline[active].detail}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
