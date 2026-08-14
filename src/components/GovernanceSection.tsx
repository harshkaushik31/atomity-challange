// src/components/GovernanceSection.tsx
"use client";

import { motion } from "framer-motion";
import GovernanceCard from "./GovernanceCard";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function AllocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v9h9" />
      <path d="M21 12a9 9 0 1 1-9-9" />
      <path d="M12 12l6.4-6.4" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5c0 4.8-2.9 8.3-7 10-4.1-1.7-7-5.2-7-10V6l7-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

export default function GovernanceSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="governance-heading"
      className="w-full"
      style={{
        backgroundColor: "var(--color-bg-card)",
      }}
    >
      <div
        className="@container mx-auto w-full max-w-5xl px-4"
        style={{
          paddingBlock:
            "clamp(4rem, 3rem + 4vw, 6rem)",
        }}
      >
        {/* Header */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: "easeOut",
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="governance-heading"
            className="font-extrabold leading-tight tracking-tight"
            style={{
              fontSize:
                "clamp(1.75rem, 1.35rem + 1.4vw, 2.25rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Built for Enterprise Kubernetes Governance
          </h2>

          <p
            className="mt-3"
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-muted)",
            }}
          >
            Complete control, security compliance, and seamless
            integration with your DevOps stack.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          className="mt-10 grid grid-cols-1 gap-4 @2xl:grid-cols-3"
        >
          <GovernanceCard
            icon={<AllocationIcon />}
            title="Granular Allocation"
            description="Break down spend by Kubernetes namespace, deployment, service, team, or custom label instantly."
            delay={0}
          />

          <GovernanceCard
            icon={<AlertIcon />}
            title="Budgets & Alerts"
            description="Set threshold alerts in Slack, Microsoft Teams, or Webhooks when spend exceeds target bounds."
            delay={0.08}
          />

          <GovernanceCard
            icon={<SecurityIcon />}
            title="100% On-Prem Security"
            description="Your data never leaves your infrastructure. Kubecost runs natively inside your own cluster."
            delay={0.16}
          />
        </div>
      </div>
    </section>
  );
}