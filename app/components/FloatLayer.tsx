"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, type MotionValue } from "framer-motion";

type Props = {
  x: number;
  y: number;
  width: number;
  /** 0 (far) .. 1 (near) — drives parallax + idle amplitude. */
  depth: number;
  index: number;
  baseZ: number;
  /** Normalized pointer values, or null to disable parallax. */
  pointer: { nx: MotionValue<number>; ny: MotionValue<number> } | null;
  /** Idle breathing drift. */
  idle: boolean;
  /** Another window is hovered → recede this one. */
  recede: boolean;
  /** This window is hovered → bring to front. */
  focused: boolean;
  children: React.ReactNode;
};

/**
 * The outer, absolutely-positioned layer for a window. It owns the "living"
 * transforms (idle drift + cursor parallax) and the focus/recede emphasis,
 * kept separate from the inner WindowCard so dragging never fights them.
 */
export default function FloatLayer({
  x,
  y,
  width,
  depth,
  index,
  baseZ,
  pointer,
  idle,
  recede,
  focused,
  children,
}: Props) {
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);

  useEffect(() => {
    if (!pointer && !idle) {
      tx.set(0);
      ty.set(0);
      return;
    }
    const phase = index * 1.7;
    const idleAmp = idle ? 2.5 + depth * 4 : 0;
    let raf = 0;
    const tick = (t: number) => {
      const sec = t / 1000;
      let ox = 0;
      let oy = 0;
      if (idleAmp) {
        ox += Math.sin(sec * 0.45 + phase) * idleAmp;
        oy += Math.cos(sec * 0.38 + phase) * idleAmp;
      }
      if (pointer) {
        ox += pointer.nx.get() * (8 + depth * 34);
        oy += pointer.ny.get() * (6 + depth * 26);
      }
      tx.set(ox);
      ty.set(oy);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pointer, idle, depth, index, tx, ty]);

  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, width, x: tx, y: ty, zIndex: focused ? 60 : baseZ }}
      initial={false}
      animate={{
        opacity: recede ? 0.78 : 1,
        filter: recede ? "blur(2.5px) saturate(0.9)" : "blur(0px) saturate(1)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
