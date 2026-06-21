import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0b0d",
        "bg-soft": "#0e1014",
        panel: "#14171c",
        ink: "#eceff2",
        "ink-dim": "#9aa3ad",
        "ink-faint": "#5b636d",
        line: "#21252b",
        "line-soft": "#191c21",
        signal: "#ff6a3d",
        "signal-soft": "#ff8a64",
        cyan: "#5fd4d0",
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "sans-serif"],
        serif: ["var(--font-newsreader)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
