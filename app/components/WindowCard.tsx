"use client";

import React, { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";

export type Entrance = {
  ox: number;
  oy: number;
  rot: number;
  scale?: number;
  jit?: number;
};

// "Deck deal" entrance: windows start stacked toward the stage centre (custom
// offset + jittered rotation + small scale) and spring out to rest at x/y 0,
// where drag then takes over. whileHover/whileDrag straighten to 0.
export const deckVariants: Variants = {
  hidden: (c: Entrance) => ({
    opacity: 0,
    x: c.ox,
    y: c.oy,
    scale: c.scale ?? 1,
    rotate: (c.rot ?? 0) + (c.jit ?? 0),
  }),
  visible: (c: Entrance) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: c.rot ?? 0,
    transition: { type: "spring", stiffness: 90, damping: 15, mass: 0.9 },
  }),
};

type WindowCardProps = {
  label: string;
  href?: string;
  children: React.ReactNode;
  draggable?: boolean;
  dragConstraints?: React.RefObject<HTMLElement | null>;
  className?: string;
  style?: React.CSSProperties;
  entrance: Entrance;
  onHover?: (hovered: boolean) => void;
  testId?: string;
};

export default function WindowCard({
  label,
  href,
  children,
  draggable = false,
  dragConstraints,
  className = "",
  style,
  entrance,
  onHover,
  testId,
}: WindowCardProps) {
  const router = useRouter();
  // Distinguishes a real click from the click fired after a drag.
  const draggingRef = useRef(false);

  function handleClick() {
    if (draggingRef.current) return;
    if (href) router.push(href);
  }

  return (
    <motion.div
      variants={deckVariants}
      custom={entrance}
      drag={draggable}
      dragConstraints={dragConstraints}
      dragMomentum={false}
      dragElastic={0.12}
      whileHover={{
        scale: 1.03,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileDrag={{ scale: 1.05, rotate: 0, cursor: "grabbing" }}
      onPointerDown={() => {
        draggingRef.current = false;
      }}
      onDragStart={() => {
        draggingRef.current = true;
      }}
      onHoverStart={() => onHover?.(true)}
      onHoverEnd={() => onHover?.(false)}
      onClick={handleClick}
      data-testid={testId}
      style={style}
      className={`window-shadow group relative select-none overflow-hidden rounded-xl border border-[#26211b]/12 bg-[#f4eee0] ${
        href ? "cursor-pointer" : ""
      } ${draggable ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-[#26211b]/10 bg-[#ebe3d2]/70 px-3 py-2">
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#c4694f]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#caa45a]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#7f9a6b]/80" />
        </span>
        <span className="truncate text-[10px] uppercase tracking-[0.16em] text-[#6f6657]">
          {label}
        </span>
      </div>

      {/* Body */}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
