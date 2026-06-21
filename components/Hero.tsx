"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import NetworkCanvas from "./NetworkCanvas";
import { profile } from "@/lib/content";

const lineReveal = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.12 },
  }),
};

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <header className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-[140px] pt-24 sm:px-[clamp(20px,5vw,64px)]">
      <NetworkCanvas />

      <div className="relative z-[3] grid w-full max-w-[1180px] items-center gap-[clamp(30px,5vw,70px)] min-[821px]:grid-cols-[1.5fr_0.8fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-7 flex items-center gap-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-signal"
          >
            <span className="h-px w-[42px] bg-signal" />
            {profile.role}
          </motion.div>

          <h1 className="text-[clamp(46px,9.5vw,150px)] font-medium leading-[0.9] tracking-[-0.04em]">
            <span className="block overflow-hidden pb-[0.02em]">
              <motion.span
                custom={0}
                variants={lineReveal}
                initial="hidden"
                animate="show"
                className="block"
              >
                Optimizing
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.02em]">
              <motion.span
                custom={1}
                variants={lineReveal}
                initial="hidden"
                animate="show"
                className="block"
              >
                the{" "}
                <em className="font-serif font-extralight italic text-signal-soft">
                  unseen
                </em>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-9 max-w-[520px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-ink-dim"
          >
            I build intelligent decision systems for supply chains — and chase
            light through a camera.{" "}
            <b className="font-medium text-ink">
              Reinforcement learning, process optimization, and an eye for the
              frame.
            </b>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
          className="group relative aspect-[3/3.7] w-[min(340px,32vw)] justify-self-end overflow-hidden border border-line bg-[#111] max-[820px]:hidden"
        >
          <Image
            src={profile.portrait}
            alt={profile.name}
            fill
            sizes="340px"
            className="object-cover saturate-[0.92] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent from-50% to-signal/10" />
          <div className="absolute bottom-0 left-0 right-0 z-[2] bg-gradient-to-t from-bg/85 to-transparent px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
            {profile.name} · Dhaka
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-[34px] left-5 right-5 z-[3] hidden grid-cols-4 overflow-hidden rounded border border-line bg-panel/80 backdrop-blur-md min-[681px]:grid sm:left-[clamp(20px,5vw,64px)] sm:right-[clamp(20px,5vw,64px)]"
      >
        {[
          ["Engineered by", profile.name],
          ["Discipline", "Industrial & Production Engineering, BUET"],
          ["Based in", "Dhaka, Bangladesh · 23°N 90°E"],
          ["Status", "Open to roles & collaborations"],
        ].map(([k, v], i) => (
          <div
            key={i}
            className={`px-5 py-4 ${i < 3 ? "border-r border-line" : ""}`}
          >
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-signal">
              {k}
            </div>
            <div className="font-mono text-[12px] leading-[1.45] text-ink">
              {i === 3 ? (
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-signal shadow-[0_0_8px_#ff6a3d]" />
                  {v}
                </span>
              ) : (
                v
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </header>
  );
}
