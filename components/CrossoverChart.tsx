"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { crossover } from "@/lib/content";

export default function CrossoverChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const W = 560,
    H = 300,
    pad = { t: 30, r: 30, b: 44, l: 44 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const xs = crossover.shelfLives;
  const maxX = Math.max(...xs);
  const minX = Math.min(...xs);
  // log-ish even spacing by index for readability
  const xPos = (i: number) => pad.l + (i / (xs.length - 1)) * innerW;
  const yPos = (v: number) => pad.t + (1 - (v - 40) / (100 - 40)) * innerH;

  const toPath = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"}${xPos(i)},${yPos(v)}`).join(" ");

  const dqnPath = toPath(crossover.dqn);
  const ppoPath = toPath(crossover.ppo);

  return (
    <div ref={ref} className="border border-line bg-bg p-[clamp(20px,4vw,40px)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
          Shelf-life sensitivity — cost-efficiency score
        </div>
        <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.05em]">
          <span className="flex items-center gap-2 text-cyan">
            <span className="h-2 w-2 rounded-full bg-cyan" /> DQN
          </span>
          <span className="flex items-center gap-2 text-signal">
            <span className="h-2 w-2 rounded-full bg-signal" /> PPO
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* grid */}
        {[40, 55, 70, 85, 100].map((g) => (
          <g key={g}>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={yPos(g)}
              y2={yPos(g)}
              stroke="#21252b"
              strokeWidth={1}
            />
            <text
              x={pad.l - 10}
              y={yPos(g) + 3}
              textAnchor="end"
              fill="#5b636d"
              fontFamily="monospace"
              fontSize="9"
            >
              {g}
            </text>
          </g>
        ))}
        {/* x labels */}
        {xs.map((x, i) => (
          <text
            key={x}
            x={xPos(i)}
            y={H - pad.b + 20}
            textAnchor="middle"
            fill="#9aa3ad"
            fontFamily="monospace"
            fontSize="10"
          >
            {x}d
          </text>
        ))}

        {/* lines */}
        <motion.path
          d={dqnPath}
          fill="none"
          stroke="#5fd4d0"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.path
          d={ppoPath}
          fill="none"
          stroke="#ff6a3d"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
        />

        {/* points */}
        {crossover.dqn.map((v, i) => (
          <motion.circle
            key={`d${i}`}
            cx={xPos(i)}
            cy={yPos(v)}
            r={3.5}
            fill="#0a0b0d"
            stroke="#5fd4d0"
            strokeWidth={1.6}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 + i * 0.1 }}
          />
        ))}
        {crossover.ppo.map((v, i) => (
          <motion.circle
            key={`p${i}`}
            cx={xPos(i)}
            cy={yPos(v)}
            r={3.5}
            fill="#0a0b0d"
            stroke="#ff6a3d"
            strokeWidth={1.6}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 + i * 0.1 }}
          />
        ))}
      </svg>

      <p className="mt-3 font-mono text-[11px] leading-[1.6] tracking-[0.03em] text-ink-faint">
        {crossover.caption}
      </p>
    </div>
  );
}
