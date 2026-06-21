"use client";
import { useEffect, useRef } from "react";

export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0,
      H = 0,
      raf = 0;
    let nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }[] = [];
    const ptr = { x: -999, y: -999 };

    const resize = () => {
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    const init = () => {
      resize();
      nodes = [];
      const n = Math.min(60, Math.floor((W * H) / 17000));
      for (let i = 0; i < n; i++)
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          r: Math.random() * 1.5 + 0.6,
        });
    };
    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (const a of nodes) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        const dx = a.x - ptr.x,
          dy = a.y - ptr.y,
          d = Math.hypot(dx, dy);
        if (d < 150) {
          a.x += (dx / d) * 0.6;
          a.y += (dy / d) * 0.6;
        }
      }
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j],
            d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 132) {
            const near =
              Math.min(
                Math.hypot(a.x - ptr.x, a.y - ptr.y),
                Math.hypot(b.x - ptr.x, b.y - ptr.y)
              ) < 160;
            ctx.strokeStyle = near
              ? `rgba(255,106,61,${0.24 * (1 - d / 132)})`
              : `rgba(120,135,150,${0.13 * (1 - d / 132)})`;
            ctx.lineWidth = near ? 0.9 : 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      for (const a of nodes) {
        const near = Math.hypot(a.x - ptr.x, a.y - ptr.y) < 150;
        ctx.fillStyle = near
          ? "rgba(255,138,100,.9)"
          : "rgba(150,165,180,.5)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, 7);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    init();
    if (reduce) {
      resize();
    } else {
      window.addEventListener("resize", init);
      window.addEventListener("mousemove", onMove);
      frame();
    }
    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full z-0"
      aria-hidden
    />
  );
}
