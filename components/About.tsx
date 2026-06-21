"use client";
import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { facets } from "@/lib/content";

export default function About() {
  return (
    <section
      id="about"
      className="relative px-5 py-[clamp(90px,14vh,180px)] sm:px-[clamp(20px,5vw,64px)]"
    >
      <SectionHead num="01" title="About" kicker="Who I am and how I think — the throughline between my engineering work and my photography." />
      <div className="grid items-start gap-[clamp(40px,7vw,110px)] min-[861px]:grid-cols-[1.7fr_1fr]">
        <Reveal>
          <p className="font-serif text-[clamp(24px,3.4vw,40px)] font-light leading-[1.32] tracking-[-0.01em]">
            I&apos;m{" "}
            <em className="italic text-signal-soft">Abhishek Saha</em> — an
            Industrial &amp; Production Engineer who builds intelligent decision
            systems for supply chains, and chases light through a camera off the
            clock.
          </p>
          <p className="mt-7 max-w-[54ch] text-[16px] leading-[1.75] text-ink-dim">
            Trained at Bangladesh University of Engineering and Technology, I
            work at the intersection of reinforcement learning, process
            optimization, supply chain design, and quality management. My
            research applies deep RL to inventory control under uncertainty; my
            instinct, in every domain, is the same — find the structure beneath
            the noise, then make a deliberate choice about it. Outside the
            models, that same eye for structure turns toward composition and
            light.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="border-t border-line">
          {facets.map(([k, v], i) => (
            <motion.div
              key={k}
              whileHover={{ paddingLeft: 10 }}
              className="flex items-center justify-between border-b border-line py-[17px] font-mono text-[13px] text-ink-dim transition-colors hover:text-ink"
            >
              <span>{k}</span>
              <span className="text-signal">{v}</span>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
