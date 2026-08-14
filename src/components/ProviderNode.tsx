// src/components/ProviderNode.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";

interface HexagonCell {
  filled: boolean;
  icon?: "minus" | "square" | "bars" | "none";
  x: number;
  y: number;
  size?: number;
}

interface ProviderNodeProps {
  name: string;
  logo: ReactNode;
  cells: HexagonCell[];
  delay?: number;
  muted?: boolean;
}

function normalize(v: [number, number]): [number, number] {
  const len = Math.hypot(v[0], v[1]);
  return [v[0] / len, v[1] / len];
}

function roundedPolygonPath(sides: number, cornerRadius: number, startAngle = -90): string {
  const cx = 50;
  const cy = 50;
  const r = 46;

  const points: [number, number][] = [];
  for (let i = 0; i < sides; i++) {
    const angle = ((startAngle + i * (360 / sides)) * Math.PI) / 180;
    points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }

  const path: string[] = [];
  for (let i = 0; i < sides; i++) {
    const curr = points[i];
    const prev = points[(i - 1 + sides) % sides];
    const next = points[(i + 1) % sides];

    const toPrev = normalize([prev[0] - curr[0], prev[1] - curr[1]]);
    const toNext = normalize([next[0] - curr[0], next[1] - curr[1]]);

    const a: [number, number] = [
      curr[0] + toPrev[0] * cornerRadius,
      curr[1] + toPrev[1] * cornerRadius,
    ];
    const b: [number, number] = [
      curr[0] + toNext[0] * cornerRadius,
      curr[1] + toNext[1] * cornerRadius,
    ];

    path.push(i === 0 ? `M ${a[0]},${a[1]}` : `L ${a[0]},${a[1]}`);
    path.push(`Q ${curr[0]},${curr[1]} ${b[0]},${b[1]}`);
  }
  path.push("Z");
  return path.join(" ");
}

const INNER_HEX_PATH = roundedPolygonPath(6, 10);
const OUTER_HEPTAGON_PATH = roundedPolygonPath(7, 6, -90 + 180 / 7);

function MinusGlyph() {
  return <rect x="35" y="47" width="30" height="6" rx="3" fill="var(--color-text-muted)" />;
}

function SquareGlyph({ filled }: { filled: boolean }) {
  return (
    <rect
      x="38"
      y="38"
      width="24"
      height="24"
      rx="4"
      fill={filled ? "var(--color-bg-card)" : "var(--color-accent-primary)"}
    />
  );
}

function BarsGlyph() {
  return (
    <g fill="var(--color-accent-primary)">
      <rect x="30" y="30" width="14" height="14" rx="2" />
      <rect x="48" y="30" width="22" height="6" rx="2" />
      <rect x="48" y="40" width="16" height="6" rx="2" />
      <rect x="30" y="52" width="40" height="6" rx="2" />
    </g>
  );
}

function Hexagon({ filled, icon = "none", x, y, size = 2.25 }: HexagonCell) {
  return (
    <div
      className="absolute"
      style={{
        inlineSize: `${size}rem`,
        blockSize: `${size}rem`,
        insetInlineStart: `${x}%`,
        insetBlockStart: `${y}%`,
        transform: "translate(-50%, -50%)",
        filter:
          "drop-shadow(0 2px 4px color-mix(in srgb, var(--color-text-primary) 12%, transparent))",
      }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path
          d={INNER_HEX_PATH}
          fill={filled ? "var(--color-accent-primary)" : "var(--color-bg-card)"}
          stroke={filled ? "var(--color-accent-primary)" : "var(--color-bg-hexagon-muted)"}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {icon === "minus" && <MinusGlyph />}
        {icon === "square" && <SquareGlyph filled={filled} />}
        {icon === "bars" && <BarsGlyph />}
      </svg>
    </div>
  );
}

// forwardRef targets the heptagon box specifically (not the label
// underneath), since that's the point connector lines should measure to.
const ProviderNode = forwardRef<HTMLDivElement, ProviderNodeProps>(function ProviderNode(
  { name, logo, cells, delay = 0, muted = false },
  ref
) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="flex flex-col items-center gap-3"
    >
      <div
        ref={ref}
        className={`relative ${muted ? "rounded-2xl bg-[var(--color-bg-hexagon-muted)] p-3 border-1 border-[var(--color-border-muted)] rounded-4xl" : ""}`}
        style={{ inlineSize: "9rem", blockSize: "9rem" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <path
            d={OUTER_HEPTAGON_PATH}
            fill="none"
            stroke="var(--color-accent-primary)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            opacity={muted ? 0.4 : 1}
          />
        </svg>
        <div className="absolute inset-0">
          {cells.map((cell, i) => (
            <Hexagon key={i} {...cell} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5">{logo}</div>
      <span className="sr-only">{name}</span>
    </motion.div>
  );
});

export default ProviderNode;