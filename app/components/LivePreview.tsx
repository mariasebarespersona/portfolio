"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const IFRAME_W = 1280; // logical width the external site renders at, then scaled to fit

type Props = {
  cover: string;
  src?: string;
  label: string;
  /** Allow the live iframe (desktop, motion ok, not touch). */
  enabled?: boolean;
  /** Whether the site can be embedded at all. */
  embeddable?: boolean;
};

export default function LivePreview({
  cover,
  src,
  label,
  enabled = true,
  embeddable = true,
}: Props) {
  const canLive = enabled && embeddable && !!src;
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Scale the logical 1280px-wide site down to the actual window width.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / IFRAME_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full overflow-hidden bg-[#ebe3d2]"
      onMouseEnter={() => canLive && setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setLoaded(false);
      }}
    >
      {/* Screenshot (default / fallback) */}
      <Image
        src={cover}
        alt={`${label} preview`}
        fill
        sizes="360px"
        className={`object-cover object-top transition-transform duration-700 ${
          hover ? "scale-[1.05]" : "scale-100"
        }`}
      />

      {/* Live site, crossfaded in once it actually loads */}
      {hover && canLive && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <iframe
            src={src}
            title={`${label} live`}
            loading="lazy"
            tabIndex={-1}
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setLoaded(true)}
            className="pointer-events-none absolute left-0 top-0 origin-top-left"
            style={{ width: IFRAME_W, height: IFRAME_W * 0.625, transform: `scale(${scale})` }}
          />
        </div>
      )}

      {/* "live" pill */}
      {hover && canLive && (
        <span
          className={`pointer-events-none absolute left-2.5 top-2.5 z-10 flex items-center gap-1 rounded-full bg-[#161310]/85 px-2 py-1 text-[8px] font-medium uppercase tracking-[0.16em] text-[#efe6d4] backdrop-blur transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7f9a6b]" /> live
        </span>
      )}
    </div>
  );
}
