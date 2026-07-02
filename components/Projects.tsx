"use client";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import ProjectSlider from "./ProjectSlider";
import { projects } from "@/lib/content";

function SubBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-signal">
        {label}
      </div>
      <p className="text-[14px] leading-[1.7] text-ink-dim">{text}</p>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative px-5 py-[clamp(90px,14vh,180px)] sm:px-[clamp(20px,5vw,64px)]"
    >
      <SectionHead num="04" title="Projects" kicker="Hands-on engineering — each project broken down by overview, stack, and impact." />
      <div className="flex flex-col gap-[clamp(56px,8vw,110px)]">
        {projects.map((p) => (
          <Reveal key={p.key}>
            <div className="border-t border-line pt-8">
              <div className="mb-7 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">
                {p.caseLabel}
              </div>

              <div className="grid gap-[clamp(28px,4vw,56px)] min-[861px]:grid-cols-[1.1fr_1fr] min-[861px]:items-start">
                <div>
                  <div className="mb-2 font-mono text-[12px] tracking-[0.04em] text-signal">
                    {p.idx}
                  </div>
                  <h3 className="mb-2 font-serif text-[clamp(26px,3.4vw,40px)] font-light leading-[1.12] tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <div className="mb-7 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">
                    {p.sub}
                  </div>

                  <div className="flex flex-col gap-5">
                    <SubBlock label="Overview" text={p.overview} />
                    <SubBlock label="Stack / Engineering" text={p.stack} />
                    <SubBlock label="Impact" text={p.impact} />
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-[20px] border border-signal/30 bg-signal/[0.06] px-[12px] py-[6px] font-mono text-[11px] uppercase tracking-[0.05em] text-signal-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="min-[861px]:sticky min-[861px]:top-24">
                  <ProjectSlider slug={p.key} images={p.images} video={p.video} />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
