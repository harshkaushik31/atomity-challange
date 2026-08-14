// src/components/FeatureSection.tsx
"use client";

import { motion } from "framer-motion";
import ProviderNode from "./ProviderNode";
import BarChart, { BarChartDatum } from "./BarChart";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";

interface FeatureSectionProps {
  resourceMetrics: BarChartDatum[];
}

// Simple text-based provider "logos" — no external brand assets used,
// per the "build everything yourself" rule.
function ProviderLogo({ label, color }: { label: string; color: string }) {
  return (
    <span className="text-base font-bold" style={{ color }}>
      {label}
    </span>
  );
}

// A single dotted connector line drawn between a corner node and the
// center card, using an SVG path so it scales with the layout.
function Connector({
  corner,
  prefersReducedMotion,
}: {
  corner: "tl" | "tr" | "bl" | "br";
  prefersReducedMotion: boolean;
}) {
  const isTop = corner === "tl" || corner === "tr";
  const isLeft = corner === "tl" || corner === "bl";

  return (
    <svg
      className="pointer-events-none absolute hidden @2xl:block"
      style={{
        inlineSize: "8rem",
        blockSize: "4rem",
        insetBlockStart: isTop ? "3rem" : "auto",
        insetBlockEnd: isTop ? "auto" : "3rem",
        insetInlineStart: isLeft ? "9rem" : "auto",
        insetInlineEnd: isLeft ? "auto" : "9rem",
      }}
      viewBox="0 0 120 60"
      fill="none"
    >
      <motion.path
        d={
          isLeft
            ? isTop
              ? "M0,0 L70,0 Q90,0 90,20 L90,40"
              : "M0,60 L70,60 Q90,60 90,40 L90,20"
            : isTop
              ? "M120,0 L50,0 Q30,0 30,20 L30,40"
              : "M120,60 L50,60 Q30,60 30,40 L30,20"
        }
        stroke="var(--color-accent-primary)"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        initial={
          prefersReducedMotion
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: "easeOut",
          delay: prefersReducedMotion ? 0 : 0.2,
        }}
      />
    </svg>
  );
}

export default function FeatureSection({ resourceMetrics }: FeatureSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="feature-heading"
      className="@container relative mx-auto w-full max-w-5xl px-4"
      style={{ paddingBlock: "var(--space-section-block)" }}
    >
      <h2 id="feature-heading" className="sr-only">
        Multi-cloud resource optimization overview
      </h2>

      <div className="relative grid grid-cols-1 items-center gap-10 @3xl:grid-cols-[1fr_2fr_1fr] @3xl:gap-6">
        {/* Left column: AWS + GCP */}
        <div className="flex flex-row justify-around gap-6 @3xl:flex-col @3xl:justify-between @3xl:gap-24">
          <ProviderNode
            name="aws"
            logo={<ProviderLogo label="aws" color="#FF9900" />}
            cells={[{ filled: false }, { filled: true }]}
            delay={0}
          />
          <ProviderNode
            name="Google Cloud"
            logo={<ProviderLogo label="GCP" color="#4285F4" />}
            cells={[
              { filled: false },
              { filled: false },
              { filled: true },
              { filled: true },
              { filled: true },
            ]}
            delay={0.15}
          />
        </div>

        {/* Center: bar chart card */}
        <div className="relative order-first @3xl:order-none">
          <Connector corner="tl" prefersReducedMotion={prefersReducedMotion} />
          <Connector corner="tr" prefersReducedMotion={prefersReducedMotion} />
          <Connector corner="bl" prefersReducedMotion={prefersReducedMotion} />
          <Connector corner="br" prefersReducedMotion={prefersReducedMotion} />

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: "easeOut",
            }}
            className="relative z-10 rounded-2xl bg-[var(--color-bg-card)] p-6 sm:p-8"
            style={{
              boxShadow:
                "0 8px 24px color-mix(in srgb, var(--color-text-primary) 8%, transparent)",
            }}
          >
            <BarChart data={resourceMetrics} />
          </motion.div>
        </div>

        {/* Right column: Azure + On-Premise */}
        <div className="flex flex-row justify-around gap-6 @3xl:flex-col @3xl:justify-between @3xl:gap-24">
          <ProviderNode
            name="Azure"
            logo={<ProviderLogo label="Azure" color="#0078D4" />}
            cells={[
              { filled: false },
              { filled: false },
              { filled: false },
              { filled: true },
            ]}
            delay={0.15}
          />
          <ProviderNode
            name="On-Premise"
            logo={<ProviderLogo label="On-Prem" color="var(--color-text-muted)" />}
            cells={[{ filled: true }, { filled: true }]}
            delay={0.3}
            muted
          />
        </div>
      </div>
    </section>
  );
}