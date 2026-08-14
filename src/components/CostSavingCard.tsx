// src/components/CostSavingsCard.tsx
"use client";

import { motion } from "framer-motion";
import { SavingsMetrics } from "@/hooks/useApiData";
import AnimatedCard from "./AnimatedCard";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";
import { roundedPolygonPath } from "@/components/polygon";

interface CostSavingsCardProps {
  savings: SavingsMetrics;
}

interface MetricColProps {
  label: string;
  value: string;
  accent?: boolean;
  delay: number;
  prefersReducedMotion: boolean;
}

interface ClusterNodeConfig {
  filled: boolean;
  angle: number; // degrees; 0 = right, 90 = down, 180 = left, -90/270 = up
  radius: number; // % of container radius from center
  large?: boolean;
}

const CLUSTER_NODES: ClusterNodeConfig[] = [
  { filled: false, angle: -150, radius: 30 }, // upper-left
  { filled: false, angle: -90, radius: 30 }, // top
  { filled: false, angle: -30, radius: 30 }, // upper-right
  { filled: true, angle: -210, radius: 30 }, // active, bottom
];

function ClusterLayout() {
  return (
    <div className="relative h-full w-full">
      {CLUSTER_NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const left = 50 + node.radius * Math.cos(rad);
        const top = 50 + node.radius * Math.sin(rad);

        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <ClusterHexagon filled={node.filled} large={node.large} />
          </div>
        );
      })}
    </div>
  );
}

function MetricColumn({
  label,
  value,
  accent = false,
  delay,
  prefersReducedMotion,
}: MetricColProps) {
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0 : delay,
      }}
      className="flex flex-col items-start gap-2 px-4 first:pl-0 sm:px-6"
    >
      <span
        className="font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
        style={{ fontSize: "var(--font-size-sm)" }}
      >
        {label}
      </span>
      <span
        className="font-bold"
        style={{
          fontSize: "var(--font-size-xl)",
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
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <defs>
          <filter id="hexagon-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="var(--color-shadow, rgba(0,0,0,0.15))"
            />
          </filter>
        </defs>
        <path
          d={roundedPolygonPath(50, 50, 44, 6, 10)}
          fill={filled ? "var(--color-accent-primary)" : "var(--color-bg-card)"}
          stroke={filled ? "var(--color-accent-primary)" : "var(--color-bg-hexagon-muted)"}
          strokeWidth="3"
          strokeLinejoin="round"
          filter="url(#hexagon-shadow)"
        />
      </svg>
    </div>
  );
}

export default function CostSavingsCard({ savings }: CostSavingsCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="savings-heading"
      className="@container mx-auto w-full max-w-5xl px-4"
      style={{ paddingBlock: "var(--space-section-block)" }}
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
            <MetricColumn
              label="CPU Usage"
              value={savings.cpuUsage}
              delay={0}
              prefersReducedMotion={prefersReducedMotion}
            />
            <MetricColumn
              label="CPU Request"
              value={savings.cpuRequest}
              delay={0.08}
              prefersReducedMotion={prefersReducedMotion}
            />
            <MetricColumn
              label="Memory Usage"
              value={savings.memoryUsage}
              delay={0.16}
              prefersReducedMotion={prefersReducedMotion}
            />
            <MetricColumn
              label="Memory Request"
              value={savings.memoryRequest}
              delay={0.24}
              prefersReducedMotion={prefersReducedMotion}
            />
            <MetricColumn
              label="Estimated Savings"
              value={savings.estimatedSavings}
              accent
              delay={0.32}
              prefersReducedMotion={prefersReducedMotion}
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
            initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: "easeOut",
              delay: prefersReducedMotion ? 0 : 0.3,
            }}
          />
        </svg>

        {/* Right: hexagon cluster */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: "easeOut",
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
          className="relative flex items-center justify-center rounded-3xl"
          style={{ inlineSize: "16rem", blockSize: "16rem" }}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <path
              d={roundedPolygonPath(50, 50, 47, 7, 4)}
              fill="none"
              stroke="var(--color-accent-primary)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="relative z-10 h-48 w-48">
  <ClusterLayout />
</div>
        </motion.div>
      </div>
    </section>
  );
}