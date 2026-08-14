"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";

interface GovernanceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function GovernanceCard({
  icon,
  title,
  description,
  delay = 0,
}: GovernanceCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.article
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0 : delay,
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="group flex min-h-[9.75rem] flex-col rounded-xl border p-5 transition-shadow duration-300"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-muted)",
        boxShadow:
          "0 1px 2px color-mix(in srgb, var(--color-text-primary) 4%, transparent)",
      }}
    >
      {/* Icon */}
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          backgroundColor:
            "var(--color-accent-primary-light)",
          color: "var(--color-accent-primary)",
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3
          className="font-bold leading-tight"
          style={{
            fontSize: "var(--font-size-base)",
            color: "var(--color-text-primary)",
          }}
        >
          {title}
        </h3>

        <p
          className="mt-2 max-w-sm leading-relaxed"
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-muted)",
          }}
        >
          {description}
        </p>
      </div>
    </motion.article>
  );
}