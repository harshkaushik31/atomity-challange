"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePreferReducedMotion";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: AnimatedCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const variants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: prefersReducedMotion ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={`rounded-[var(--radius-lg)] bg-[var(--color-bg-card)] shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}