"use client";
import { useEffect, useRef } from "react";

// Interactive Milky Way starfield: crisp twinkling stars that react to the
// mouse — nearby stars brighten and gently drift, a click sends a ripple.
export default function FloatingBackground() {
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
      raf = 0,
      t = 0;

    type Star = {
      x: number;
      y: number;
      z: number; // depth 0..1 (affects size/parallax)
      base: number; // base brightness
      tw: number; // twinkle phase
      tws: number; // twinkle speed
      vx: number;
      vy: number;
      color: string;
    };
    let stars: Star[] = [];
    const ptr = { x: -9999, y: -9999, active: false };
    let ripples: { x: number; y: number; r: number; life: number }[] = [];

    const palette = [
      "255,255,255",
      "255,255,255",
      "255,255,255",
      "210,225,255", // bluish
      "255,228,200", // warm
      "255,200,160", // signal-ish
    ];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const init = () => {
      resize();
      const count = Math.min(260, Math.floor((W * H) / 6500));
      stars = [];
      for (let i = 0; i < count; i++) {
        const z = Math.random();
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z,
          base: 0.25 + Math.random() * 0.75,
          tw: Math.random() * Math.PI * 2,
          tws: 0.5 + Math.random() * 2.0,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          color: palette[(Math.random() * palette.length) | 0],
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.active = true;
    };
    const onLeave = () => {
      ptr.active = false;
      ptr.x = -9999;
      ptr.y = -9999;
    };
    const onClick = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
      if (ripples.length > 6) ripples.shift();
    };

    const frame = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      // slowly drifting Milky Way band — a soft diagonal glow that pans over time
      const drift = (t * 8) % (W + 400) - 200;
      const cx = W * 0.5 + Math.sin(t * 0.05) * W * 0.15 + (drift - W * 0.5) * 0.15;
      const cy = H * 0.5 + Math.cos(t * 0.04) * H * 0.1;
      const band = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.8);
      band.addColorStop(0, "rgba(120,105,175,0.16)");
      band.addColorStop(0.35, "rgba(80,95,160,0.11)");
      band.addColorStop(0.65, "rgba(70,60,120,0.05)");
      band.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.5 + Math.sin(t * 0.03) * 0.06);
      ctx.scale(1.7, 0.45);
      ctx.translate(-cx, -cy);
      ctx.fillStyle = band;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // brighter "dust" clusters along the band
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let k = 0; k < 4; k++) {
        const px = (cx + Math.sin(t * 0.1 + k * 1.7) * W * 0.32) % W;
        const py = cy + Math.cos(t * 0.08 + k * 1.7) * H * 0.16;
        const g2 = ctx.createRadialGradient(px, py, 0, px, py, 220);
        const tone = k % 2 === 0 ? "150,135,200" : "120,150,200";
        g2.addColorStop(0, `rgba(${tone},0.12)`);
        g2.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(px, py, 220, 0, 7);
        ctx.fill();
      }
      ctx.restore();

      // update ripples
      ripples = ripples.filter((r) => r.life > 0);
      for (const r of ripples) {
        r.r += 6;
        r.life -= 0.02;
      }

      for (const s of stars) {
        // drift
        s.x += s.vx * (0.4 + s.z);
        s.y += s.vy * (0.4 + s.z);
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        // mouse influence
        let boost = 0;
        if (ptr.active) {
          const dx = s.x - ptr.x,
            dy = s.y - ptr.y,
            d = Math.hypot(dx, dy);
          if (d < 160) {
            boost = (1 - d / 160) * 0.9;
            // gentle push outward
            s.x += (dx / (d || 1)) * boost * 0.6;
            s.y += (dy / (d || 1)) * boost * 0.6;
          }
        }
        // ripple influence
        for (const r of ripples) {
          const d = Math.abs(Math.hypot(s.x - r.x, s.y - r.y) - r.r);
          if (d < 30) boost = Math.max(boost, (1 - d / 30) * r.life);
        }

        const twinkle = 0.5 + 0.5 * Math.sin(t * s.tws + s.tw);
        const bright = Math.min(1, s.base * (0.5 + 0.5 * twinkle) + boost);
        const size = (0.4 + s.z * 1.5) * (1 + boost * 1.6);

        // glow for brighter/boosted stars
        if (bright > 0.7 || boost > 0.2) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${s.color},${0.08 + boost * 0.15})`;
          ctx.arc(s.x, s.y, size * 4, 0, 7);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.color},${bright})`;
        ctx.arc(s.x, s.y, size, 0, 7);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    init();
    if (reduce) {
      // static field, no animation
      stars.forEach((s) => {
        ctx.fillStyle = `rgba(${s.color},${s.base})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 0.6 + s.z, 0, 7);
        ctx.fill();
      });
    } else {
      window.addEventListener("resize", init);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
      window.addEventListener("click", onClick);
      frame();
    }

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
      aria-hidden
    />
  );
}
