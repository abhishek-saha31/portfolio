"use client";
import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import Counter from "./Counter";
import Marquee from "./Marquee";
import Pipeline from "./Pipeline";
import ResultsTable from "./ResultsTable";
import CrossoverChart from "./CrossoverChart";
import { research } from "@/lib/content";

function SupplyDiagram() {
  return (
    <svg
      viewBox="0 0 900 320"
      className="block h-auto w-full"
      aria-label="Supply chain network diagram"
    >
      <defs>
        <marker
          id="ah"
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4.5"
          orient="auto"
        >
          <path d="M0,0 L9,4.5 L0,9 Z" fill="#5b636d" />
        </marker>
      </defs>
      <g stroke="#2c3138" strokeWidth={1.5} fill="none" markerEnd="url(#ah)">
        {[
          "M150,160 L368,160",
          "M432,160 C560,160 560,70 700,70",
          "M432,160 L700,160",
          "M432,160 C560,160 560,250 700,250",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            strokeDasharray="6 10"
            animate={{ strokeDashoffset: [0, -160] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </g>
      <g transform="translate(90,160)">
        <circle r="30" fill="#14171c" stroke="#3a4048" strokeWidth={1.5} />
        <text y="-44" textAnchor="middle" fill="#9aa3ad" fontFamily="monospace" fontSize="11">VENDOR</text>
        <text y="5" textAnchor="middle" fill="#eceff2" fontSize="13">V</text>
      </g>
      <g transform="translate(400,160)">
        <circle r="34" fill="#1a1410" stroke="#ff6a3d" strokeWidth={1.6} />
        <text y="-48" textAnchor="middle" fill="#ff8a64" fontFamily="monospace" fontSize="11">DIST. CENTER</text>
        <text y="0" textAnchor="middle" fill="#eceff2" fontSize="14">DC</text>
        <text y="16" textAnchor="middle" fill="#5b636d" fontFamily="monospace" fontSize="9">cap 650</text>
      </g>
      {[
        { y: 70, label: "S1", mu: "μ 200", cap: "cap 300" },
        { y: 160, label: "S2", mu: "μ 120", cap: "cap 250" },
        { y: 250, label: "S3", mu: "μ 80", cap: "cap 180" },
      ].map((s) => (
        <g key={s.label} transform={`translate(730,${s.y})`}>
          <circle r="26" fill="#14171c" stroke="#3a4048" strokeWidth={1.5} />
          <text y="5" textAnchor="middle" fill="#eceff2" fontSize="12">{s.label}</text>
          <text x="42" y="-2" fill="#9aa3ad" fontFamily="monospace" fontSize="10">{s.mu}</text>
          <text x="42" y="12" fill="#5b636d" fontFamily="monospace" fontSize="9">{s.cap}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Research() {
  return (
    <section
      id="research"
      className="relative bg-bg-soft/70 px-5 py-[clamp(90px,14vh,180px)] sm:px-[clamp(20px,5vw,64px)]"
    >
      <SectionHead num="05" title="Research" kicker="My B.Sc. thesis — deep reinforcement learning for perishable supply chains." />

      <div className="mb-[60px] grid items-end gap-[clamp(30px,5vw,70px)] min-[901px]:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <h3 className="font-serif text-[clamp(26px,3.6vw,44px)] font-light leading-[1.16] tracking-[-0.01em]">
            {research.title}
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="font-mono text-[12px] uppercase leading-[2.1] tracking-[0.05em] text-ink-faint">
            {research.meta.map((m, i) => (
              <div key={i}>
                {m.includes("Dr.") ? (
                  <>
                    Supervisor —{" "}
                    <b className="text-signal">Dr. Shuva Ghosh</b>
                  </>
                ) : (
                  m
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mb-[60px] grid grid-cols-2 gap-px border border-line bg-line min-[761px]:grid-cols-4">
          {research.stats.map((s, i) => (
            <div
              key={i}
              className="bg-bg-soft px-[26px] py-8 transition-colors hover:bg-panel"
            >
              <div className="text-[clamp(36px,4.6vw,60px)] font-medium leading-none tracking-[-0.035em]">
                {s.v.includes("%") ? (
                  <>
                    <Counter value={s.v.replace("%", "")} />
                    <em className="font-serif font-light italic text-signal">
                      %
                    </em>
                  </>
                ) : (
                  <Counter value={s.v} />
                )}
              </div>
              <div className="mt-3.5 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.05em] text-ink-faint">
                {s.k}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="relative overflow-hidden border border-line bg-bg p-[clamp(20px,4vw,46px)]">
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
            Two-echelon divergent network — 1 vendor → 1 DC → 3 stores · FIFO ·
            lost-sales
          </div>
          <SupplyDiagram />
        </div>
      </Reveal>

      {/* keyword marquee */}
      <div className="my-12">
        <Marquee />
      </div>

      {/* interactive pipeline */}
      <Reveal>
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-signal">
          Methodology pipeline
        </div>
        <Pipeline />
      </Reveal>

      {/* tabbed results + crossover chart */}
      <div className="mt-12 grid gap-6 min-[981px]:grid-cols-2">
        <Reveal>
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-signal">
            Three policies, compared
          </div>
          <ResultsTable />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-signal">
            The shelf-life crossover
          </div>
          <CrossoverChart />
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 min-[761px]:grid-cols-2">
        {research.agents.map((a, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden border border-line bg-bg p-8 transition-colors ${
                a.color === "cyan" ? "hover:border-cyan" : "hover:border-signal"
              }`}
            >
              <span
                className={`absolute left-0 top-0 h-full w-[3px] ${
                  a.color === "cyan" ? "bg-cyan" : "bg-signal"
                }`}
              />
              <div
                className={`mb-2.5 font-mono text-[11px] uppercase tracking-[0.08em] ${
                  a.color === "cyan" ? "text-cyan" : "text-signal"
                }`}
              >
                {a.role}
              </div>
              <h4 className="mb-2 font-serif text-[27px] font-light">
                {a.title}
              </h4>
              <p className="max-w-[40ch] text-[14px] leading-[1.65] text-ink-dim">
                {a.desc}
              </p>
              <div className="absolute right-[26px] top-[30px] font-mono text-[12px] text-ink-faint">
                {a.num}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
