// src/components/FeatureSection.tsx
"use client";

import { motion } from "framer-motion";
import ProviderNode from "./ProviderNode";
import BarChart, { BarChartDatum } from "./BarChart";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";

interface FeatureSectionProps {
  resourceMetrics: BarChartDatum[];
}

// Logo unit: optional colored brand mark + plain-text company name.
// Pass brand="" to render just the name (used for Azure / On-Premise,
// which don't have a separate short wordmark in the reference).
function ProviderLogo({
  brand,
  fullName,
  color,
}: {
  brand: string;
  fullName: string;
  color: string;
}) {
  return (
    <span className="flex items-center gap-1.5 text-sm">
      {brand && (
        <span className="font-bold" style={{ color }}>
          {brand}
        </span>
      )}
      <span className="font-semibold text-[var(--color-text-primary)]">{fullName}</span>
    </span>
  );
}

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
            name="AWS"
            logo={<ProviderLogo brand="aws" fullName="aws" color="#FF9900" />}
            cells={[
              { filled: false, icon: "minus", x: 45, y: 32, size: 2 },
              { filled: true, icon: "square", x: 62, y: 50, size: 2.25 },
            ]}
            delay={0}
          />
          <ProviderNode
            name="Google Cloud"
            logo={<ProviderLogo brand="GCP" fullName="Google Cloud" color="#4285F4" />}
            cells={[
              { filled: false, icon: "none", x: 38, y: 24, size: 1.9 },
              { filled: false, icon: "none", x: 60, y: 24, size: 1.9 },
              { filled: true, icon: "none", x: 30, y: 50, size: 2.1 },
              { filled: true, icon: "none", x: 62, y: 50, size: 2.1 },
              { filled: true, icon: "none", x: 45, y: 75, size: 2.1 },
            ]}
            delay={0.15}
          />
        </div>

        {/* Center: bar chart card */}
        <div className="relative order-first @3xl:order-none border-2 rounded-2xl border-[var(--color-accent-primary)]">
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
            logo={<ProviderLogo brand="Azure" fullName="Azure" color="#0078D4" />}
            cells={[
              { filled: false, icon: "none", x: 34, y: 24, size: 1.9 },
              { filled: false, icon: "none", x: 60, y: 24, size: 1.9 },
              { filled: false, icon: "none", x: 34, y: 50, size: 1.9 },
              { filled: true, icon: "bars", x: 60, y: 65, size: 2.3 },
            ]}
            delay={0.15}
          />
          <ProviderNode
            name="On-Premise"
            logo={<ProviderLogo brand="" fullName="On-Premise" color="var(--color-text-muted)" />}
            cells={[
              { filled: true, icon: "square", x: 32, y: 50, size: 2.1 },
              { filled: true, icon: "square", x: 68, y: 50, size: 2.1 },
            ]}
            delay={0.3}
            
          />
        </div>
      </div>
    </section>
  );
}