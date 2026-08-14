"use client";

import { motion } from "framer-motion";
import { SavingsMetrics } from "@/hooks/useApiData";
import AnimatedCard from "./AnimatedCard";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";
import { roundedPolygonPath } from "@/lib/polygon";

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
  angle: number;
  radius: number;
  large?: boolean;
}

const CLUSTER_NODES: ClusterNodeConfig[] = [
  { filled: false, angle: -150, radius: 30 },
  { filled: false, angle: -90, radius: 30 },
  { filled: false, angle: -30, radius: 30 },
  { filled: true, angle: -210, radius: 30 },
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
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
          >
            <ClusterHexagon
              filled={node.filled}
              large={node.large}
            />
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
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 12 }
      }
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
          color: accent
            ? "var(--color-accent-primary)"
            : "var(--color-text-primary)",
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
        inlineSize: large ? "3.5rem" : "3.25rem",
        blockSize: large ? "3.5rem" : "3.25rem",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <filter
            id="hexagon-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
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
          fill={
            filled
              ? "var(--color-accent-primary)"
              : "var(--color-bg-card)"
          }
          stroke={
            filled
              ? "var(--color-accent-primary)"
              : "var(--color-bg-hexagon-muted)"
          }
          strokeWidth="3"
          strokeLinejoin="round"
          filter="url(#hexagon-shadow)"
        />
      </svg>
    </div>
  );
}

export default function CostSavingsCard({
  savings,
}: CostSavingsCardProps) {
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
            className="rounded-[var(--radius-lg)] border p-6 sm:p-8"
            style={{
              borderColor: "var(--color-border-primary)",
            }}
          >
            {/* Header */}
            <div className="mb-8">
              <h3
                className="font-bold leading-tight"
                style={{
                  fontSize: "var(--font-size-2xl)",
                  color: "var(--color-text-primary)",
                }}
              >
                Automated Pod Right-Sizing & Savings
              </h3>

              <p
                className="mt-3 max-w-xl leading-relaxed"
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-muted)",
                }}
              >
                Kubecost continuously analyzes container workloads to provide
                precise right-sizing suggestions. Optimize CPU and Memory
                requests without compromising application SLAs.
              </p>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-y-6">
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
          </div>
        </AnimatedCard>

        {/* Connector line */}
        <svg
          className="hidden @3xl:block"
          style={{
            inlineSize: "3rem",
            blockSize: "2px",
          }}
          viewBox="0 0 48 2"
        >
          <motion.line
            x1="0"
            y1="1"
            x2="48"
            y2="1"
            stroke="var(--color-accent-primary)"
            strokeWidth="1.5"
            initial={
              prefersReducedMotion
                ? { pathLength: 1 }
                : { pathLength: 0 }
            }
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
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: "easeOut",
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
          className="relative flex items-center justify-center rounded-3xl"
          style={{
            
            inlineSize: "19rem",
            blockSize: "19rem",
          }}
        >
          {/* Outer polygon on the Right Side */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
          >
            <path
              d={roundedPolygonPath(50, 50, 49, 7, 4)}
              fill="none"
              stroke="var(--color-accent-primary)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Inner cluster */}
          <div className="relative z-10 h-56 w-56">
            <ClusterLayout />
          </div>
        </motion.div>
      </div>
    </section>
  );
}