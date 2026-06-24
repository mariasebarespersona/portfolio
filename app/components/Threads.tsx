"use client";

import { motion } from "framer-motion";

export type Anchor = { cx: number; cy: number };

type Props = {
  width: number;
  height: number;
  anchors: Record<string, Anchor>;
  connections: [string, string][];
};

/**
 * A faint pinboard of curved hairlines connecting related windows — a curatorial
 * "research wall" nod. Anchored to the windows' resting positions (decorative;
 * does not track live drag). Sits behind the windows. Desktop only.
 */
export default function Threads({ width, height, anchors, connections }: Props) {
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={width}
      height={height}
      style={{ zIndex: 0, overflow: "visible" }}
      aria-hidden
    >
      {connections.map(([a, b], i) => {
        const A = anchors[a];
        const B = anchors[b];
        if (!A || !B) return null;
        const mx = (A.cx + B.cx) / 2;
        const my = (A.cy + B.cy) / 2 - 48;
        const d = `M ${A.cx} ${A.cy} Q ${mx} ${my} ${B.cx} ${B.cy}`;
        return (
          <g key={`${a}-${b}`}>
            <motion.path
              d={d}
              fill="none"
              stroke="#26211b"
              strokeOpacity={0.13}
              strokeWidth={1}
              strokeDasharray="2 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.7 + i * 0.18, ease: "easeInOut" }}
            />
            <motion.circle
              cx={A.cx}
              cy={A.cy}
              r={2.5}
              fill="#9a7a4c"
              fillOpacity={0.55}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 + i * 0.18, type: "spring", stiffness: 300 }}
            />
          </g>
        );
      })}
    </svg>
  );
}
