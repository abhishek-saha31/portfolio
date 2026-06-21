"use client";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { academy as a } from "@/lib/content";

export default function Academy() {
  return (
    <section
      id="academy"
      className="relative bg-bg-soft/70 px-5 py-[clamp(90px,14vh,180px)] sm:px-[clamp(20px,5vw,64px)]"
    >
      <SectionHead num="07" title="After Schools Academy" kicker="The education venture I co-founded and ran — and what it taught me about people." />
      <div className="grid items-start gap-[clamp(40px,6vw,90px)] min-[861px]:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="mb-5 font-mono text-[12px] uppercase tracking-[0.08em] text-signal">
            {a.roleLine}
          </div>
          <h3 className="mb-6 font-serif text-[clamp(28px,4vw,48px)] font-light leading-[1.12] tracking-[-0.02em]">
            {a.heading}
          </h3>
          <p className="max-w-[52ch] text-[clamp(16px,1.7vw,19px)] leading-[1.7] text-ink">
            {a.lede}
          </p>
          <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.75] text-ink-dim">
            {a.body}
          </p>
          <p className="mt-[30px] border-l-2 border-signal pl-[22px] font-serif text-[clamp(18px,2.2vw,24px)] font-light italic leading-[1.4] text-ink-dim">
            {a.pull.split("free").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <em className="italic text-signal-soft">free</em>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-px border border-line bg-line">
            {a.stats.map((s, i) => (
              <div
                key={i}
                className="bg-bg-soft px-[30px] py-7 transition-colors hover:bg-panel"
              >
                <div className="text-[clamp(34px,4vw,48px)] font-medium leading-none tracking-[-0.03em]">
                  {s.v.includes("%") || s.v.includes("+") ? (
                    <>
                      <Counter value={s.v.replace(/[%+]/, "")} />
                      <em className="font-serif font-light italic text-signal">
                        {s.v.includes("%") ? "%" : "+"}
                      </em>
                    </>
                  ) : (
                    s.v
                  )}
                </div>
                <div className="mt-2.5 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.05em] text-ink-faint">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
