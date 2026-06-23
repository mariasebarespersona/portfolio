"use client";

import React, { useRef, useState } from "react";

/**
 * MarIA — a video portrait whose gaze follows the cursor by scrubbing the clip's
 * playback position to the angle of the pointer around the face. On touch devices
 * (no mousemove) it falls back to a static poster.
 * Extracted from the original BentoGrid centerpiece.
 */
export default function Avatar({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  const targetRef = useRef(0.5);
  const currentRef = useRef(0.5);

  React.useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  React.useEffect(() => {
    if (isTouch) return;
    // east≈0.0 (forward), north≈0.25 (up), west≈0.5, south≈0.75 — map the cursor's
    // angle around the face to that 0..1 clip position so the head turns toward it.
    const onMove = (e: PointerEvent) => {
      const v = videoRef.current;
      if (!v) return;
      const r = v.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = r.top + r.height / 2 - e.clientY; // up = positive
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      targetRef.current = ((((ang % 360) + 360) % 360) / 360);
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && isFinite(v.duration) && v.duration > 0) {
        let d = targetRef.current - currentRef.current;
        d -= Math.round(d); // shortest path on the circular 0..1 domain
        if (Math.abs(d) < 0.0015) {
          currentRef.current = targetRef.current;
        } else {
          currentRef.current = (currentRef.current + d * 0.16 + 1) % 1;
        }
        const t = currentRef.current * v.duration;
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
  }, [isTouch]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#f4eee0]" />
      {isTouch ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/avatar-poster.jpg"
          alt="MarIA"
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <video
          ref={videoRef}
          poster="/avatar-poster.jpg"
          muted
          playsInline
          preload="auto"
          className="pointer-events-none max-h-full max-w-full object-contain"
          onLoadedMetadata={(e) => e.currentTarget.pause()}
        >
          <source src="/avatar.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
