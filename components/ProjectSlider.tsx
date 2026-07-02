"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CAPS: Record<string, string> = {
  pd: "Plumbing machine",
  iot: "Ammonia monitor",
  sw: "SolidWorks model",
};

type Slide =
  | { type: "video"; src: string }
  | { type: "image"; src: string; n: number };

export default function ProjectSlider({
  slug,
  images,
  video,
}: {
  slug: string;
  images: string[];
  video?: string | null;
}) {
  // Build the slide list: photos first, then the optional video at the end.
  const slides: Slide[] = [];
  images.forEach((src, i) => slides.push({ type: "image", src, n: i + 1 }));
  if (video) slides.push({ type: "video", src: video });

  const total = slides.length;
  const photoCount = images.length;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const hovering = useRef(false);
  const videoPlaying = useRef(false);

  const go = (n: number, d: number) => {
    setDir(d);
    setIdx(((n % total) + total) % total);
  };

  useEffect(() => {
    if (total <= 1) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    const t = setInterval(() => {
      if (!hovering.current && !videoPlaying.current) {
        setDir(1);
        setIdx((p) => (p + 1) % total);
      }
    }, 4200);
    return () => clearInterval(t);
  }, [total]);

  const cap = CAPS[slug] ?? "";
  const current = slides[idx];
  const label =
    current.type === "video"
      ? `${cap} · video`
      : `${cap} · ${String(current.n).padStart(2, "0")} / ${String(
          photoCount
        ).padStart(2, "0")}`;

  return (
    <div
      data-cursor="hov"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      className="relative aspect-[3/2] overflow-hidden border border-line bg-[#0d0f12]"
    >
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -40 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {current.type === "video" ? (
            <video
              src={current.src}
              controls
              playsInline
              preload="metadata"
              onPlay={() => (videoPlaying.current = true)}
              onPause={() => (videoPlaying.current = false)}
              onEnded={() => (videoPlaying.current = false)}
              className="h-full w-full bg-black object-contain"
            />
          ) : (
            <Image
              src={current.src}
              alt={`${cap} ${current.n}`}
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className="object-contain bg-[#0d0f12] saturate-[0.95] brightness-[0.96]"
            />
          )}
          {current.type !== "video" && (
            <div className="absolute bottom-0 left-0 right-0 z-[2] bg-gradient-to-t from-bg/80 to-transparent px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.06em] text-white">
              {label}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {total > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={() => go(idx - 1, -1)}
            className="absolute left-3.5 top-1/2 z-[3] flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-bg/55 text-white backdrop-blur-sm transition-colors hover:border-transparent hover:bg-signal hover:text-bg"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => go(idx + 1, 1)}
            className="absolute right-3.5 top-1/2 z-[3] flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-bg/55 text-white backdrop-blur-sm transition-colors hover:border-transparent hover:bg-signal hover:text-bg"
          >
            ›
          </button>

          <div className="absolute bottom-3.5 left-1/2 z-[3] flex -translate-x-1/2 gap-[7px]">
            {slides.map((s, i) => (
              <button
                key={i}
                aria-label={`Go to ${i + 1}`}
                onClick={() => go(i, i > idx ? 1 : -1)}
                className={`h-[7px] rounded-full transition-all ${
                  i === idx ? "w-5 bg-signal" : "w-[7px] bg-white/35"
                } ${s.type === "video" ? "ring-1 ring-signal/50" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
