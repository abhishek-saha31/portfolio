"use client";
import { motion } from "framer-motion";

export default function SectionHead({
  num,
  title,
  kicker,
}: {
  num: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-baseline gap-[18px]"
      >
        <span className="font-mono text-[13px] tracking-[0.04em] text-signal">
          {num}
        </span>
        <h2 className="font-serif text-[clamp(28px,5vw,56px)] font-light leading-[1.05] tracking-[-0.02em]">
          {title}
        </h2>
      </motion.div>
      {kicker && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 max-w-[60ch] pl-[31px] text-[15px] leading-[1.6] text-ink-dim"
        >
          {kicker}
        </motion.p>
      )}
    </div>
  );
}
