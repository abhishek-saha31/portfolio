"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { policyResults } from "@/lib/content";

export default function ResultsTable() {
  const [active, setActive] = useState(2); // Branching DQN highlighted by default

  return (
    <div className="border border-line bg-bg">
      {/* tabs */}
      <div className="flex flex-wrap gap-px border-b border-line bg-line">
        {policyResults.rows.map((r, i) => (
          <button
            key={r.policy}
            onClick={() => setActive(i)}
            className={`flex-1 px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.05em] transition-colors ${
              active === i
                ? "bg-bg text-signal"
                : "bg-bg-soft text-ink-faint hover:text-ink-dim"
            }`}
          >
            {r.best && <span className="mr-1.5 text-signal">★</span>}
            {r.policy}
          </button>
        ))}
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line">
              {policyResults.columns.map((c, i) => (
                <th
                  key={c}
                  className={`whitespace-nowrap px-4 py-3 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint ${
                    i === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {policyResults.rows.map((r, ri) => (
              <motion.tr
                key={r.policy}
                animate={{
                  backgroundColor:
                    active === ri ? "rgba(255,106,61,0.06)" : "rgba(0,0,0,0)",
                }}
                className="border-b border-line-soft last:border-0"
              >
                <td className="px-4 py-3.5 text-left">
                  <span
                    className={`font-grotesk text-[15px] ${
                      r.best ? "text-ink" : "text-ink-dim"
                    }`}
                  >
                    {r.best && <span className="mr-1.5 text-signal">★</span>}
                    {r.policy}
                  </span>
                </td>
                {r.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`whitespace-nowrap px-4 py-3.5 text-right font-mono text-[13px] ${
                      cell.includes("−") || cell.includes("-")
                        ? "text-cyan"
                        : active === ri
                        ? "text-ink"
                        : "text-ink-dim"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-line px-4 py-3 font-mono text-[11px] leading-[1.6] tracking-[0.03em] text-ink-faint">
        {policyResults.note}
      </div>
    </div>
  );
}
