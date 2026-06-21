"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";

const links = [
  ["About", "#about"],
  ["Toolkit", "#toolkit"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Research", "#research"],
  ["Academy", "#academy"],
  ["Photography", "#photo"],
  ["Contact", "#contact"],
];

function DownloadIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-5 py-4 transition-all duration-300 sm:px-[clamp(20px,5vw,64px)] ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex items-center gap-[11px] text-[15px] font-semibold tracking-[-0.01em] text-ink">
        <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-signal shadow-[0_0_12px_#ff6a3d]" />
        {profile.name}
      </div>
      <div className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-[0.04em] min-[861px]:flex">
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="group relative text-ink-dim transition-colors hover:text-ink"
          >
            {label}
            <span className="absolute -bottom-[5px] left-0 h-px w-0 bg-signal transition-[width] duration-300 group-hover:w-full" />
          </a>
        ))}
        <a
          href={profile.cvFile}
          download
          className="ml-1 flex items-center gap-2.5 rounded-[30px] border border-signal/40 bg-signal/[0.08] px-[18px] py-[10px] font-mono text-[12px] font-semibold uppercase tracking-[0.05em] text-signal-soft transition-all hover:gap-3.5 hover:border-signal hover:bg-signal hover:text-bg"
        >
          <DownloadIcon />
          Resume
        </a>
      </div>
      {/* mobile resume button */}
      <a
        href={profile.cvFile}
        download
        className="flex items-center gap-2 rounded-[30px] border border-signal/40 bg-signal/[0.08] px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.05em] text-signal-soft min-[861px]:hidden"
      >
        <DownloadIcon />
        Resume
      </a>
    </motion.nav>
  );
}
