// src/components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";
import { CloudIcon, GlobeIcon, ClusterIcon, ServerIcon, ArrowDownIcon } from "@/icons/IconPack";

const TRUST_LOGOS = [
  { icon: <CloudIcon />, label: "AWS EKS" },
  { icon: <GlobeIcon />, label: "Azure AKS" },
  { icon: <ClusterIcon />, label: "Google GKE" },
  { icon: <ServerIcon />, label: "On-Premise" },
];

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0.3 : 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: prefersReducedMotion ? 0 : delay,
    },
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="@container mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center"
      style={{ paddingBlock: "var(--space-section-block)" }}
    >
      {/* Badge */}
      <motion.div {...fadeUp(0)}>
        <span
          className="inline-flex items-center gap-2 rounded-[var(--radius-full)] border px-4 py-1.5 text-xs font-semibold"
          style={{
            backgroundColor: "var(--color-accent-primary-light)",
            borderColor: "transparent",
            color: "var(--color-accent-primary)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-accent-primary)" }}
          />
          Kubernetes Cost Visibility &amp; Savings Engine
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        {...fadeUp(0.1)}
        id="hero-heading"
        className="mt-6 font-extrabold leading-[1.05] tracking-tight"
        style={{
          fontSize: "clamp(2.25rem, 1.8rem + 3.5vw, 4.25rem)",
          color: "var(--color-text-primary)",
        }}
      >
        Monitor, Allocate &amp;{" "}
        <span style={{ color: "var(--color-accent-primary)" }}>Reduce Cloud Costs</span> in
        Real Time
      </motion.h1>

      {/* Subtext */}
      <motion.p
        {...fadeUp(0.2)}
        className="mt-6 max-w-2xl"
        style={{
          fontSize: "var(--font-size-lg)",
          color: "var(--color-text-muted)",
        }}
      >
        Continuous visibility and automated optimization across AWS, Azure, Google Cloud, and
        On-Premise Kubernetes clusters.
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-col gap-3 @sm:flex-row">
        <motion.a
          href="#feature-heading"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] px-6 py-3 text-sm font-semibold"
          style={{
            backgroundColor: "var(--color-text-primary)",
            color: "var(--color-bg-primary)",
          }}
        >
          Explore Interactive Demo
          <ArrowDownIcon/>
        </motion.a>

        <motion.a
          href="#savings-heading"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="inline-flex items-center justify-center rounded-[var(--radius-full)] border px-6 py-3 text-sm font-semibold"
          style={{
            borderColor: "var(--color-border-primary)",
            color: "var(--color-text-primary)",
            backgroundColor: "var(--color-bg-card)",
          }}
        >
          Calculate Projected ROI
        </motion.a>
      </motion.div>

      {/* Divider */}
      <motion.div
        {...fadeUp(0.4)}
        className="mt-14 h-px w-full max-w-3xl"
        style={{ backgroundColor: "var(--color-border-primary)" }}
      />

      {/* Trust row */}
      <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-col items-center gap-5">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-text-muted)" }}
        >
          Trusted Across All Kubernetes Environments
        </span>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {TRUST_LOGOS.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              {item.icon}
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}