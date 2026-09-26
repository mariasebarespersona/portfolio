"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * The memoji is a 360 degree head turn. On a pointer device the clip is
 * scrubbed to the angle of the cursor around the face, so she physically looks
 * at whichever key you are reaching for. On touch there is no cursor, so it
 * makes one slow revolution instead of freezing on a poster.
 *
 * It is also the device's main button, which is why it carries the cap bevel
 * and glow: the cream plate the memoji was exported on becomes the button face
 * rather than a rectangle floating in the void.
 */
export default function Face({ onPress }: { onPress: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const target = useRef(0.5);
  const current = useRef(0.5);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const v = ref.current;
    if (!v) return;

    // Read once inside the effect: it only picks which loop to run, it never
    // needs to drive a render, so it does not belong in state.
    const touch = window.matchMedia("(hover: none)").matches;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = v.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = r.top + r.height / 2 - e.clientY;
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      target.current = (((ang % 360) + 360) % 360) / 360;
    };
    if (!touch) window.addEventListener("pointermove", onMove);

    const start = performance.now();
    const tick = (now: number) => {
      if (isFinite(v.duration) && v.duration > 0) {
        if (touch) {
          // one slow revolution, so a phone is not shown a still frame
          target.current = ((now - start) / 14000) % 1;
          current.current = target.current;
        } else {
          let d = target.current - current.current;
          d -= Math.round(d); // shortest path around the circle
          current.current =
            Math.abs(d) < 0.0015 ? target.current : (current.current + d * 0.16 + 1) % 1;
        }
        const t = current.current * v.duration;
        if (Math.abs(t - v.currentTime) > 0.002) {
          if (typeof v.fastSeek === "function") v.fastSeek(t);
          else v.currentTime = t;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <button
      type="button"
      onClick={onPress}
      aria-label="About María"
      className="cap face-cap face-in rounded-full"
      style={{ width: "var(--face)", height: "var(--face)" }}
    >
      {/* the clip is masked here, not on the button, so the label plate below
          is not clipped away with it */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <video
          ref={ref}
          poster="/avatar-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="pointer-events-none h-full w-full"
          onLoadedMetadata={(e) => e.currentTarget.pause()}
        >
          <source src="/avatar.mp4" type="video/mp4" />
        </video>
      </span>
      {/* About lost its key, so the face has to say it is a way in */}
      <span className="plate">Who I am</span>
    </button>
  );
}
