"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"" | "hov" | "view">("");

  useEffect(() => {
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2,
      rx = mx,
      ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='view']")) setVariant("view");
      else if (
        t.closest(
          "a, button, .facet, .stat, .agent, input, textarea, [data-cursor='hov']"
        )
      )
        setVariant("hov");
      else setVariant("");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] h-[5px] w-[5px] rounded-full bg-white pointer-events-none mix-blend-difference max-[768px]:hidden"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-[9999] rounded-full pointer-events-none max-[768px]:hidden transition-[width,height,background-color,border-color] duration-200 flex items-center justify-center ${
          variant === "view"
            ? "h-[74px] w-[74px] bg-signal border-transparent"
            : variant === "hov"
            ? "h-[58px] w-[58px] bg-signal/[0.16] border border-transparent mix-blend-normal"
            : "h-8 w-8 border border-white/[0.55] mix-blend-difference"
        }`}
      >
        {variant === "view" && (
          <span className="font-mono text-[9px] font-semibold tracking-[0.1em] text-bg">
            VIEW
          </span>
        )}
      </div>
    </>
  );
}
