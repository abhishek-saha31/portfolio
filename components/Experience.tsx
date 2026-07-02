"use client";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import ExperienceGallery from "./ExperienceGallery";
import { experience, industrialAttachment as ia } from "@/lib/content";

function Card({
  chip,
  role,
  org,
  points,
}: {
  chip: string;
  role: string;
  org: string;
  points: string[];
}) {
  return (
    <div className="flex h-full flex-col border border-line bg-bg-soft/40 p-7">
      <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-signal/30 bg-signal/[0.07] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-signal-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
        {chip}
      </div>
      <h3 className="font-serif text-[clamp(22px,2.6vw,26px)] font-light leading-[1.15]">
        {role}
      </h3>
      <div className="mb-5 mt-1.5 text-[14px] leading-[1.5] text-ink-dim">
        {org}
      </div>
      <ul className="flex flex-col gap-2.5">
        {points.map((p, pi) => {
          const m = p.match(/^(At [A-Z]+:)(\s*)(.*)$/);
          return (
            <li
              key={pi}
              className="relative pl-5 text-[15px] leading-[1.7] text-ink-dim before:absolute before:left-0 before:top-[10px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-signal"
            >
              {m ? (
                <>
                  <span className="font-semibold text-signal-soft">{m[1]}</span>{" "}
                  {m[3]}
                </>
              ) : (
                p
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-5 py-[clamp(90px,14vh,180px)] sm:px-[clamp(20px,5vw,64px)]"
    >
      <SectionHead
        num="03"
        title="Experience"
        kicker="Research, mentorship, and industry — where I have applied the work."
      />

      {/* top row: two cards side by side */}
      <div className="grid gap-6 min-[861px]:grid-cols-2">
        {experience.map((e, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <Card chip={e.when} role={e.role} org={e.org} points={e.points} />
          </Reveal>
        ))}
      </div>

      {/* bottom: full-width Industrial Attachment, split into RAIL | RMBL */}
      <Reveal delay={0.12} className="mt-6">
        <div className="border border-line bg-bg-soft/40 p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-serif text-[clamp(24px,3vw,30px)] font-light">
              {ia.role}
            </h3>
            <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/[0.07] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-signal-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              {ia.when}
            </div>
          </div>

          <div className="grid gap-8 min-[761px]:grid-cols-2 min-[761px]:divide-x min-[761px]:divide-line">
            <div className="min-[761px]:pr-8">
              <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.06em] text-signal">
                At RAIL
              </div>
              <div className="mb-4 text-[14px] text-ink-dim">{ia.rail.org}</div>
              <ul className="flex flex-col gap-2.5">
                {ia.rail.points.map((p, pi) => (
                  <li
                    key={pi}
                    className="relative pl-5 text-[15px] leading-[1.7] text-ink-dim before:absolute before:left-0 before:top-[10px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-signal"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-[761px]:pl-8">
              <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.06em] text-signal">
                At RMBL
              </div>
              <div className="mb-4 text-[14px] text-ink-dim">{ia.rmbl.org}</div>
              <ul className="flex flex-col gap-2.5">
                {ia.rmbl.points.map((p, pi) => (
                  <li
                    key={pi}
                    className="relative pl-5 text-[15px] leading-[1.7] text-ink-dim before:absolute before:left-0 before:top-[10px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-signal"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ExperienceGallery images={ia.images} />
        </div>
      </Reveal>
    </section>
  );
}