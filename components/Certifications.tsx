"use client";
import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { certification as c } from "@/lib/content";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative px-5 py-[clamp(90px,14vh,180px)] sm:px-[clamp(20px,5vw,64px)]"
    >
      <SectionHead num="06" title="Certifications" kicker="Formal credentials backing the toolkit." />
      <div className="grid items-center gap-[clamp(30px,5vw,70px)] min-[821px]:grid-cols-2">
        <Reveal>
          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden border border-line bg-panel p-[clamp(28px,4vw,44px)] transition-colors hover:border-signal"
          >
            <div className="absolute -right-[30px] -top-[30px] h-[140px] w-[140px] rounded-full border border-line">
              <div className="absolute inset-[22px] rounded-full border border-line-soft" />
            </div>
            <div className="mb-[18px] flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-signal">
              <span className="h-[7px] w-[7px] rounded-full bg-signal shadow-[0_0_10px_#ff6a3d]" />
              {c.badge}
            </div>
            <h3 className="relative z-[2] mb-3.5 font-serif text-[clamp(26px,3.2vw,38px)] font-light leading-[1.15] tracking-[-0.01em]">
              {c.title}
            </h3>
            <p className="relative z-[2] max-w-[42ch] text-[15px] leading-[1.65] text-ink-dim">
              {c.desc}
            </p>
            <div className="relative z-[2] mt-6 flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-[20px] border border-signal/30 bg-signal/[0.06] px-[12px] py-[6px] font-mono text-[11px] uppercase tracking-[0.05em] text-signal-soft"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[16px] leading-[1.8] text-ink-dim">
            {c.side.split("real work").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <em className="font-serif italic text-signal-soft">
                    real work
                  </em>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
