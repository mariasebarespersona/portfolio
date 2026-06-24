"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft ring that trails the pointer and blooms into a labelled disc over an
 * interactive window ("open" / "drag"). Desktop only; pointer-events:none so it
 * never blocks clicks. Rendered only when motion is allowed and not on touch.
 */
export default function CustomCursor({ hint }: { hint: string | null }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    const on = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, [x, y]);

  const active = !!hint;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#26211b]/40 backdrop-blur-[1px]"
        animate={{
          width: active ? 60 : 16,
          height: active ? 60 : 16,
          backgroundColor: active ? "rgba(22,19,16,0.92)" : "rgba(38,33,27,0)",
          borderColor: active ? "rgba(22,19,16,0)" : "rgba(38,33,27,0.4)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        {active && (
          <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#efe6d4]">
            {hint}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
