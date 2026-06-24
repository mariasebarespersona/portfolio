"use client";

import { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  return touch;
}

/**
 * Normalized pointer position in [-1, 1] on each axis (relative to viewport
 * center), exposed as motion values so consumers can read them inside a rAF
 * loop without re-rendering. Disabled (held at 0) when `enabled` is false.
 */
export function usePointerParallax(enabled: boolean) {
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  useEffect(() => {
    if (!enabled) {
      nx.set(0);
      ny.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      nx.set((e.clientX / window.innerWidth) * 2 - 1);
      ny.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, nx, ny]);
  return { nx, ny };
}
