// src/components/ProviderNode.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HexagonCell {
  filled: boolean;
  icon?: ReactNode;
}

interface ProviderNodeProps {
  name: string;
  logo: ReactNode;
  cells: HexagonCell[];
  delay?: number;
  muted?: boolean; // for the greyed-out On-Premise variant
}

// A single small hexagon used inside the cluster
function Hexagon({ filled, icon }: HexagonCell) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ inlineSize: "2.5rem", blockSize: "2.5rem" }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon
          points="50,3 93,25 93,75 50,97 7,75 7,25"
          fill={filled ? "var(--color-accent-primary)" : "var(--color-bg-card)"}
          stroke={filled ? "var(--color-accent-primary)" : "var(--color-border-primary)"}
          strokeWidth="2"
        />
      </svg>
      {icon && <span className="relative z-10 text-[10px]">{icon}</span>}
    </div>
  );
}

export default function ProviderNode({
  name,
  logo,
  cells,
  delay = 0,
  muted = false,
}: ProviderNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="flex flex-col items-center gap-3"
    >
      {/* Large outer hexagon containing the small cluster */}
      <div
        className={`relative flex items-center justify-center rounded-2xl p-2 ${
          muted ? "bg-[var(--color-bg-hexagon-muted)]" : ""
        }`}
        style={{ inlineSize: "9rem", blockSize: "9rem" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <polygon
            points="50,2 95,26 95,74 50,98 5,74 5,26"
            fill="none"
            stroke="var(--color-accent-primary)"
            strokeWidth="1.5"
            opacity={muted ? 0.4 : 1}
          />
        </svg>
        <div className="relative z-10 grid grid-cols-2 gap-2 place-items-center">
          {cells.map((cell, i) => (
            <Hexagon key={i} filled={cell.filled} icon={cell.icon} />
          ))}
        </div>
      </div>

      {/* Logo + name */}
      <div className="flex items-center gap-2">
        <span className="h-6 w-6 flex items-center justify-center">{logo}</span>
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          {name}
        </span>
      </div>
    </motion.div>
  );
}