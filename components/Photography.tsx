"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { photos } from "@/lib/content";

export default function Photography() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (d: number) =>
      setOpen((p) => (p === null ? p : (p + d + photos.length) % photos.length)),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, move]);

  return (
    <section
      id="photo"
      className="relative bg-bg-soft/70 px-5 py-[clamp(90px,14vh,180px)] sm:px-[clamp(20px,5vw,64px)]"
    >
      <Reveal className="mb-16 flex flex-wrap items-baseline justify-between gap-3.5">
        <div className="flex items-baseline gap-[18px]">
          <span className="font-mono text-[13px] tracking-[0.04em] text-signal">
            08
          </span>
          <h2 className="font-serif text-[clamp(28px,5vw,56px)] font-light tracking-[-0.02em]">
            Through the lens
          </h2>
        </div>
        <div className="max-w-[30ch] text-right font-mono text-[12px] uppercase tracking-[0.06em] text-ink-faint">
          The same eye for structure — pointed at light instead of logistics
        </div>
      </Reveal>

      <Reveal>
        <div className="grid auto-rows-[210px] grid-cols-1 gap-3.5 min-[521px]:grid-cols-2 min-[901px]:grid-cols-4">
          {photos.map((p, i) => (
            <motion.div
              key={p.n}
              data-cursor="view"
              onClick={() => setOpen(i)}
              whileHover={{ scale: 1.0 }}
              className={`group relative flex cursor-pointer items-end overflow-hidden border border-line bg-[#111] transition-colors hover:border-signal ${
                p.span === "tall" ? "row-span-2" : ""
              } ${p.span === "wide" ? "min-[521px]:col-span-2" : ""}`}
            >
              <Image
                src={p.src}
                alt={`${p.label} study`}
                fill
                sizes="(max-width: 900px) 50vw, 25vw"
                className="object-cover saturate-90 brightness-[0.92] transition-all duration-700 group-hover:scale-105 group-hover:saturate-100 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 from-0% via-transparent via-45% to-transparent opacity-50 transition-opacity group-hover:opacity-90" />
              <div className="relative z-[2] translate-y-2 p-4 font-mono text-[10px] uppercase tracking-[0.06em] text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {String(p.n).padStart(2, "0")} · {p.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[9000] flex flex-col items-center justify-center gap-5 bg-[#060709]/95 backdrop-blur-md"
          >
            <span className="absolute right-9 top-7 font-mono text-[12px] tracking-[0.06em] text-ink-dim">
              [ esc ]
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-5 text-[26px] text-ink-dim transition-colors hover:text-signal"
            >
              ←
            </button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[74vh] w-[min(86vw,1000px)] border border-line"
            >
              <Image
                src={photos[open].src}
                alt={photos[open].label}
                fill
                sizes="86vw"
                className="object-contain"
              />
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-5 text-[26px] text-ink-dim transition-colors hover:text-signal"
            >
              →
            </button>
            <div className="font-mono text-[12px] tracking-[0.06em] text-ink-dim">
              {String(photos[open].n).padStart(2, "0")} · {photos[open].label} —
              Abhishek Saha
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
