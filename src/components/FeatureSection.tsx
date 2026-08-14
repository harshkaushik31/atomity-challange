// src/components/FeatureSection.tsx
"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import ProviderNode from "./ProviderNode";
import BarChart, { BarChartDatum } from "./BarChart";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";

interface FeatureSectionProps {
  resourceMetrics: BarChartDatum[];
}

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

interface ConnectorPathData {
  d: string;
  delay: number;
}

// Builds a horizontal-then-vertical elbow path with a rounded corner,
// between two measured points. Works for connectors approaching the
// card from either the left or right side.
function buildElbowPath(x1: number, y1: number, x2: number, y2: number, r = 10): string {
  const dir = y2 > y1 ? 1 : -1;
  const goingRight = x2 > x1;
  const bendX = goingRight ? x2 - r : x2 + r;
  return `M ${x1},${y1} H ${bendX} Q ${x2},${y1} ${x2},${y1 + dir * r} V ${y2}`;
}

export default function FeatureSection({ resourceMetrics }: FeatureSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const awsRef = useRef<HTMLDivElement>(null);
  const gcpRef = useRef<HTMLDivElement>(null);
  const azureRef = useRef<HTMLDivElement>(null);
  const onPremRef = useRef<HTMLDivElement>(null);

  const [paths, setPaths] = useState<ConnectorPathData[]>([]);
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const sectionRect = section.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    // Card corner anchor points, inset slightly so lines meet the
    // rounded corner rather than the exact geometric edge.
    const cardLeft = cardRect.left - sectionRect.left;
    const cardRight = cardRect.right - sectionRect.left;
    const cardTop = cardRect.top - sectionRect.top + 14;
    const cardBottom = cardRect.bottom - sectionRect.top - 14;

    const rel = (el: HTMLDivElement | null) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        rightX: r.right - sectionRect.left,
        leftX: r.left - sectionRect.left,
        centerY: r.top - sectionRect.top + r.height / 2,
      };
    };

    const aws = rel(awsRef.current);
    const gcp = rel(gcpRef.current);
    const azure = rel(azureRef.current);
    const onPrem = rel(onPremRef.current);

    const next: ConnectorPathData[] = [];
    if (aws) next.push({ d: buildElbowPath(aws.rightX, aws.centerY, cardLeft, cardTop), delay: 0 });
    if (gcp) next.push({ d: buildElbowPath(gcp.rightX, gcp.centerY, cardLeft, cardBottom), delay: 0.15 });
    if (azure) next.push({ d: buildElbowPath(azure.leftX, azure.centerY, cardRight, cardTop), delay: 0.15 });
    if (onPrem) next.push({ d: buildElbowPath(onPrem.leftX, onPrem.centerY, cardRight, cardBottom), delay: 0.3 });

    setPaths(next);
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    measure();

    const ro = new ResizeObserver(() => measure());
    if (sectionRef.current) ro.observe(sectionRef.current);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="feature-heading"
      className="@container relative mx-auto w-full max-w-5xl px-4"
      style={{ paddingBlock: "var(--space-section-block)" }}
    >
      <h2 id="feature-heading" className="sr-only">
        Multi-cloud resource optimization overview
      </h2>

      {/* Measured connector overlay — real pixel coordinates, not guessed offsets */}
      {ready && (
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full @3xl:block"
          aria-hidden="true"
        >
          {paths.map((path, i) => (
            <motion.g
              key={i}
              initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: "easeOut",
                delay: prefersReducedMotion ? 0 : path.delay,
              }}
            >
              <motion.path
                d={path.d}
                fill="none"
                stroke="var(--color-accent-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="3 5"
                animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -16] }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 1.2, repeat: Infinity, ease: "linear" }
                }
              />
            </motion.g>
          ))}
        </svg>
      )}

      <div className="relative grid grid-cols-1 items-center gap-10 @3xl:grid-cols-[1fr_2fr_1fr] @3xl:gap-6">
        {/* Left column: AWS + GCP */}
        <div className="relative z-10 flex flex-row justify-around gap-6 @3xl:flex-col @3xl:justify-between @3xl:gap-24">
          <ProviderNode
            ref={awsRef}
            name="AWS"
            logo={<ProviderLogo brand="aws" fullName="aws" color="#FF9900" />}
            cells={[
              { filled: false, icon: "minus", x: 45, y: 32, size: 2 },
              { filled: true, icon: "square", x: 62, y: 50, size: 2.25 },
            ]}
            delay={0}
          />
          <ProviderNode
            ref={gcpRef}
            name="Google Cloud"
            logo={<ProviderLogo brand="GCP" fullName="Google Cloud" color="#4285F4" />}
            cells={[
              { filled: false, icon: "minus", x: 38, y: 24, size: 1.9 },
              { filled: false, icon: "none", x: 60, y: 24, size: 1.9 },
              { filled: true, icon: "none", x: 30, y: 50, size: 2.1 },
              { filled: true, icon: "square", x: 62, y: 50, size: 2.1 },
              { filled: true, icon: "square", x: 45, y: 75, size: 2.1 },
            ]}
            delay={0.15}
          />
        </div>

        {/* Center: bar chart card */}
        <div className="relative order-first @3xl:order-none border-3 rounded-2xl border-[var(--color-border-primary)] bg-[var(--color-bg-card)]">
          <motion.div
            ref={cardRef}
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
            onAnimationComplete={measure}
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
        <div className="relative z-10 flex flex-row justify-around gap-6 @3xl:flex-col @3xl:justify-between @3xl:gap-24">
          <ProviderNode
            ref={azureRef}
            name="Azure"
            logo={<ProviderLogo brand="" fullName="Azure" color="#0078D4" />}
            cells={[
              { filled: false, icon: "none", x: 34, y: 24, size: 1.9 },
              { filled: false, icon: "square", x: 60, y: 24, size: 1.9 },
              { filled: false, icon: "none", x: 34, y: 50, size: 1.9 },
              { filled: true, icon: "square", x: 60, y: 65, size: 2.3 },
            ]}
            delay={0.15}
          />
          <ProviderNode
            ref={onPremRef}
            name="On-Premise"
            logo={<ProviderLogo brand="" fullName="On-Premise" color="var(--color-text-muted)" />}
            cells={[
              { filled: true, icon: "square", x: 32, y: 50, size: 2.1 },
              { filled: true, icon: "square", x: 68, y: 50, size: 2.1 },
            ]}
            delay={0.3}
            muted
          />
        </div>
      </div>
    </section>
  );
}