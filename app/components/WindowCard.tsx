"use client";

import React, { useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";

// `custom` carries each window's resting rotation so the staggered entrance and
// the scattered-collage tilt coexist (whileHover/whileDrag straighten to 0).
export const windowVariants: Variants = {
  hidden: (rotate: number = 0) => ({ opacity: 0, y: 24, scale: 0.96, rotate }),
  visible: (rotate: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  }),
};

type WindowCardProps = {
  /** Text shown in the title bar (domain-like). */
  label: string;
  /** Internal route to open on click (e.g. "/work/tumai"). */
  href?: string;
  /** Card body. */
  children: React.ReactNode;
  /** Enable drag (desktop canvas). Off for the mobile stack. */
  draggable?: boolean;
  /** Ref to the canvas element used as drag bounds. */
  dragConstraints?: React.RefObject<HTMLElement | null>;
  className?: string;
  style?: React.CSSProperties;
  /** Resting rotation, in degrees, for the scattered collage look. */
  rotate?: number;
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
  rotate = 0,
  testId,
}: WindowCardProps) {
  const router = useRouter();
  // Distinguishes a real click from the click the browser fires after a drag.
  const draggingRef = useRef(false);
  const [z, setZ] = useState(1);

  function handleClick() {
    if (draggingRef.current) return; // it was a drag, not a click
    if (href) router.push(href);
  }

  return (
    <motion.div
      variants={windowVariants}
      custom={rotate}
      drag={draggable}
      dragConstraints={dragConstraints}
      dragMomentum={false}
      dragElastic={0.12}
      whileHover={{ scale: 1.025, rotate: 0 }}
      whileDrag={{ scale: 1.04, rotate: 0, cursor: "grabbing" }}
      onPointerDown={() => {
        draggingRef.current = false;
        setZ(50);
      }}
      onDragStart={() => {
        draggingRef.current = true;
      }}
      onHoverStart={() => setZ(40)}
      onHoverEnd={() => setZ(1)}
      onClick={handleClick}
      data-testid={testId}
      style={{ zIndex: z, ...style }}
      className={`group relative select-none overflow-hidden rounded-xl border border-[#26211b]/12 bg-[#f4eee0] shadow-[0_18px_40px_-22px_rgba(38,33,27,0.45)] ${
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
