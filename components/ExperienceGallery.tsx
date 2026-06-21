"use client";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ExperienceGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const total = images.length;

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (d: number) =>
      setOpen((p) => (p === null ? p : (p + d + total) % total)),
    [total]
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

  useEffect(() => {
    if (open !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mt-6">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-signal">
        On-site · {total} photos
      </div>
      <div className="grid grid-cols-3 gap-2.5 min-[521px]:grid-cols-5">
        {images.map((src, i) => (
          <motion.button
            key={i}
            data-cursor="view"
            onClick={() => setOpen(i)}
            whileHover={{ y: -3 }}
            className="group relative aspect-[4/3] overflow-hidden border border-line bg-[#111] transition-colors hover:border-signal"
          >
            <Image
              src={src}
              alt={`Rancon Automobiles — photo ${i + 1}`}
              fill
              sizes="(max-width: 520px) 33vw, 18vw"
              className="object-cover saturate-90 brightness-[0.9] transition-all duration-500 group-hover:scale-105 group-hover:saturate-100 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
            <span className="absolute bottom-2 left-2 z-[2] font-mono text-[9px] uppercase tracking-[0.06em] text-white opacity-0 transition-opacity group-hover:opacity-100">
              ⤢ expand
            </span>
          </motion.button>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                className="fixed inset-0 z-[9000] flex flex-col items-center justify-center gap-5 bg-[#060709]/95 p-6 backdrop-blur-md"
              >
                <div className="fixed right-6 top-6 z-[9100] flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-dim">
                  <span>Press</span>
                  <kbd className="rounded-md border border-signal/50 bg-panel px-2.5 py-1 text-[11px] font-semibold text-signal-soft shadow-[0_2px_0_rgba(0,0,0,0.4)]">
                    Esc
                  </kbd>
                  <span>to exit</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    move(-1);
                  }}
                  className="fixed left-6 top-1/2 z-[9100] -translate-y-1/2 p-5 text-[26px] text-ink-dim transition-colors hover:text-signal"
                >
                  ←
                </button>
                <motion.div
                  key={open}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative h-[80vh] w-[min(90vw,1100px)] border border-line"
                >
                  <Image
                    src={images[open]}
                    alt={`Rancon Automobiles — photo ${open + 1}`}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </motion.div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    move(1);
                  }}
                  className="fixed right-6 top-1/2 z-[9100] -translate-y-1/2 p-5 text-[26px] text-ink-dim transition-colors hover:text-signal"
                >
                  →
                </button>
                <div className="font-mono text-[12px] tracking-[0.06em] text-ink-dim">
                  Rancon Automobiles Limited · {String(open + 1).padStart(2, "0")}{" "}
                  / {String(total).padStart(2, "0")}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}