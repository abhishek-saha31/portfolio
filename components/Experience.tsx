"use client";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import ExperienceGallery from "./ExperienceGallery";
import { experience } from "@/lib/content";

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
      <div className="ml-1.5 border-l border-line">
        {experience.map((e, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="relative pb-14 pl-[clamp(28px,4vw,48px)] last:pb-0">
              {/* node */}
              <span className="absolute -left-[6px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-signal bg-bg shadow-[0_0_12px_rgba(255,106,61,0.5)]" />

              {/* period chip */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/[0.07] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-signal-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                {e.when}
              </div>

              {/* role + org */}
              <h3 className="font-serif text-[clamp(24px,3vw,30px)] font-light leading-[1.15]">
                {e.role}
              </h3>
              <div className="mb-5 mt-1.5 text-[14px] leading-[1.5] text-ink-dim">
                {e.org}
              </div>

              {/* bullets */}
              <ul className="flex flex-col gap-2.5">
                {e.points.map((p, pi) => {
                  // highlight a leading "At XXX:" label if present
                  const m = p.match(/^(At [A-Z]+:)(\s*)(.*)$/);
                  return (
                    <li
                      key={pi}
                      className="relative max-w-[66ch] pl-5 text-[15px] leading-[1.7] text-ink-dim before:absolute before:left-0 before:top-[10px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-signal"
                    >
                      {m ? (
                        <>
                          <span className="font-semibold text-signal-soft">
                            {m[1]}
                          </span>{" "}
                          {m[3]}
                        </>
                      ) : (
                        p
                      )}
                    </li>
                  );
                })}
              </ul>

              {"images" in e && e.images && e.images.length > 0 && (
                <ExperienceGallery images={e.images} />
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
