"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";

export interface BarChartDatum {
  label: string;
  value: number; 
}

interface BarChartProps {
  data: BarChartDatum[];
  maxHeight?: number; 
}

export default function BarChart({ data, maxHeight = 180 }: BarChartProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

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
              initial={
                prefersReducedMotion
                  ? { height: `${(d.value / 100) * maxHeight}px` }
                  : { height: 0 }
              }
              whileInView={{ height: `${(d.value / 100) * maxHeight}px` }}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: "easeOut", delay: i * 0.08 }
              }
              className="w-full max-w-10 rounded-t-md"
              style={{ backgroundColor: "var(--color-accent-primary)" }}
            />
          </div>
          <span
            className="font-semibold text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--font-size-sm)" }}
          >
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}