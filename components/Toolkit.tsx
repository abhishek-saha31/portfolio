"use client";
import Image from "next/image";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import CgpaBadge from "./CgpaBadge";
import { toolkit, education } from "@/lib/content";

export default function Toolkit() {
  return (
    <section
      id="toolkit"
      className="relative px-5 py-[clamp(90px,14vh,180px)] sm:px-[clamp(20px,5vw,64px)]"
    >
      <SectionHead num="02" title="Toolkit & Education" kicker="The tools I work with and the academic foundation behind them." />

      {/* skills table */}
      <Reveal>
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.06em] text-signal">
          Capabilities
        </div>
        <div className="border border-line">
          {toolkit.map((group, gi) => (
            <div
              key={gi}
              className="grid border-b border-line last:border-0 min-[721px]:grid-cols-[260px_1fr]"
            >
              <div className="border-b border-line bg-bg-soft px-5 py-5 font-mono text-[12px] uppercase tracking-[0.05em] text-ink min-[721px]:border-b-0 min-[721px]:border-r">
                {group.category}
              </div>
              <div>
                {group.items.map(([skill, spec], i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 border-b border-line-soft px-5 py-4 transition-colors last:border-0 hover:bg-bg-soft min-[521px]:flex-row min-[521px]:items-baseline min-[521px]:gap-6"
                  >
                    <span className="min-w-[200px] text-[15px] text-ink">
                      {skill}
                    </span>
                    <span className="text-[14px] leading-[1.6] text-ink-dim">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* education */}
      <Reveal delay={0.1}>
        <div className="mb-4 mt-14 font-mono text-[11px] uppercase tracking-[0.06em] text-signal">
          Academic foundation
        </div>
        <div className="ml-1.5 border-l border-line">
          {education.map((e, i) => (
            <div key={i} className="relative pb-10 pl-[38px] last:pb-0">
              <span className="absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full border-2 border-signal bg-bg" />
              <div className="font-mono text-[12px] tracking-[0.04em] text-signal">
                {e.period}
              </div>
              <div className="mb-1 mt-[7px] flex items-center gap-3.5">
                {e.logo && (
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-panel">
                    <Image
                      src={e.logo}
                      alt={`${e.school} logo`}
                      width={44}
                      height={44}
                      className="h-9 w-9 object-contain"
                    />
                  </span>
                )}
                <span className="font-serif text-[24px] font-light leading-[1.2]">
                  {e.school}
                </span>
              </div>
              <div className="mb-4 text-[14px] text-ink-dim">{e.degree}</div>
              {e.cgpa && (
                <div className="mb-4">
                  <CgpaBadge
                    value={e.cgpa}
                    scale={e.cgpaScale}
                    label={e.cgpaLabel}
                  />
                </div>
              )}
              {e.points.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {e.points.map((p, pi) => (
                    <li
                      key={pi}
                      className="relative max-w-[68ch] pl-4 text-[15px] leading-[1.65] text-ink-dim before:absolute before:left-0 before:top-[9px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-ink-faint"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              {e.coursework && e.coursework.length > 0 && (
                <div className="mt-5">
                  <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-signal">
                    Key coursework
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {e.coursework.map((c) => (
                      <span
                        key={c}
                        className="rounded-[20px] border border-signal/30 bg-signal/[0.06] px-[12px] py-[6px] font-mono text-[11px] uppercase tracking-[0.05em] text-signal-soft"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
