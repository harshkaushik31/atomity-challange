"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  label: string;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export default function Badge({
  label,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default:
      "bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border-[var(--color-border-primary)]",
    accent:
      "bg-[var(--color-accent-primary-light)] text-[var(--color-accent-primary)] border-transparent",
    muted:
      "bg-[var(--color-bg-hexagon-muted)] text-[var(--color-text-muted)] border-transparent",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {label}
    </motion.span>
  );
}