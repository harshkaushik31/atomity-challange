// src/components/BarChart.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface BarChartDatum {
  label: string;
  value: number; // 0-100
}

interface BarChartProps {
  data: BarChartDatum[];
  maxHeight?: number; // px, for the tallest bar
}

export default function BarChart({ data, maxHeight = 180 }: BarChartProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return (
    <div
      className="flex items-end justify-between gap-4 @container"
      style={{ blockSize: `${maxHeight + 40}px` }}
    >
      {data.map((d, i) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="relative flex w-full items-end justify-center"
            style={{ blockSize: `${maxHeight}px` }}
          >
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.value / 100) * maxHeight}px` }}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: "easeOut", delay: i * 0.08 }
              }
              className="w-full max-w-[2.5rem] rounded-t-md"
              style={{ backgroundColor: "var(--color-accent-primary)" }}
            />
          </div>
          <span className="text-xs font-semibold text-[var(--color-text-primary)] @[8rem]:text-sm">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}