// src/components/CostSavingsCard.tsx
"use client";

import { motion } from "framer-motion";
import { SavingsMetrics } from "@/hooks/useApiData";
import AnimatedCard from "./AnimatedCard";

interface CostSavingsCardProps {
  savings: SavingsMetrics;
}

interface MetricColProps {
  label: string;
  value: string;
  accent?: boolean;
  delay: number;
}

function MetricColumn({ label, value, accent = false, delay }: MetricColProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className="flex flex-col items-start gap-2 px-4 first:pl-0 sm:px-6"
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] sm:text-xs">
        {label}
      </span>
      <span
        className="text-lg font-bold sm:text-xl"
        style={{
          color: accent ? "var(--color-accent-primary)" : "var(--color-text-primary)",
        }}
      >
        {value}
      </span>
    </motion.div>
  );
}

// Small hexagon used inside the right-side cluster
function ClusterHexagon({
  filled,
  large = false,
}: {
  filled: boolean;
  large?: boolean;
}) {
  return (
    <div
      className="relative"
      style={{
        inlineSize: large ? "3rem" : "2.75rem",
        blockSize: large ? "3rem" : "2.75rem",
      }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <polygon
          points="50,3 93,25 93,75 50,97 7,75 7,25"
          fill={filled ? "var(--color-accent-primary)" : "var(--color-bg-card)"}
          stroke={filled ? "var(--color-accent-primary)" : "var(--color-bg-hexagon-muted)"}
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

export default function CostSavingsCard({ savings }: CostSavingsCardProps) {
  return (
    <section
      aria-labelledby="savings-heading"
      className="@container mx-auto w-full max-w-5xl px-4 py-16 sm:py-24"
    >
      <h2 id="savings-heading" className="sr-only">
        Estimated cost savings breakdown
      </h2>

      <div className="flex flex-col items-center gap-10 @3xl:flex-row @3xl:items-center @3xl:gap-16">
        {/* Left: metrics card */}
        <AnimatedCard className="w-full @3xl:flex-1">
          <div
            className="flex flex-wrap gap-y-6 rounded-[var(--radius-lg)] border p-6 sm:p-8"
            style={{ borderColor: "var(--color-border-primary)" }}
          >
            <MetricColumn label="CPU Usage" value={savings.cpuUsage} delay={0} />
            <MetricColumn label="CPU Request" value={savings.cpuRequest} delay={0.08} />
            <MetricColumn label="Memory Usage" value={savings.memoryUsage} delay={0.16} />
            <MetricColumn label="Memory Request" value={savings.memoryRequest} delay={0.24} />
            <MetricColumn
              label="Estimated Savings"
              value={savings.estimatedSavings}
              accent
              delay={0.32}
            />
          </div>
        </AnimatedCard>

        {/* Connector line (desktop only) */}
        <svg
          className="hidden @3xl:block"
          style={{ inlineSize: "3rem", blockSize: "2px" }}
          viewBox="0 0 48 2"
        >
          <motion.line
            x1="0"
            y1="1"
            x2="48"
            y2="1"
            stroke="var(--color-accent-primary)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          />
        </svg>

        {/* Right: hexagon cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center rounded-3xl"
          style={{ inlineSize: "16rem", blockSize: "16rem" }}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <polygon
              points="50,2 95,26 95,74 50,98 5,74 5,26"
              fill="none"
              stroke="var(--color-accent-primary)"
              strokeWidth="1.5"
            />
          </svg>
          <div className="relative z-10 grid grid-cols-2 gap-4 place-items-center">
            <ClusterHexagon filled={false} />
            <ClusterHexagon filled={false} />
            <ClusterHexagon filled={false} />
            <ClusterHexagon filled={true} large />
          </div>
        </motion.div>
      </div>
    </section>
  );
}