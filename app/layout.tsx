import type { Metadata } from "next";
import { Space_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Abhishek Saha — Industrial Engineer & Photographer",
  description:
    "Industrial & Production Engineer (BUET) working on reinforcement learning, process optimization, and supply chain — and a photographer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${grotesk.variable} ${newsreader.variable} ${mono.variable} bg-grid`}
      >
        {children}
      </body>
    </html>
  );
}
