"use client";

import { useEffect, useRef } from "react";

/* Warm, desaturated. The keycaps own the colour on this page, so the room
   behind them must not compete with them. */
/* Read from the stylesheet so one palette attribute repaints the canvas too. */
const readTokens = (el: Element) => {
  const cs = getComputedStyle(el);
  const sig: [number, number, number][] = [];
  for (let i = 1; i <= 5; i++) {
    const v = cs.getPropertyValue(`--sig-${i}`).trim();
    const p = v.split(",").map((x) => +x.trim());
    sig.push(p.length === 3 && p.every((n) => !isNaN(n)) ? (p as [number, number, number]) : [255, 196, 128]);
  }
  return { sig, ink: cs.getPropertyValue("--sig-ink").trim() || sig[0].join(",") };
};

/* The five project backlights. Nodes stay near-neutral so the keycaps keep
   the colour; only the travelling signal is saturated, and only briefly. */

type Node = { x: number; y: number; a: number; cool: number; r: number; adj: number[]; c: number };
type Edge = { a: number; b: number; len: number; bow: number };
type Pulse = { a: Node; b: Node; to: number; t: number; sp: number; c: number };
type Layer = {
  nodes: Node[];
  edges: Edge[];
  pulses: Pulse[];
  par: number;   // parallax factor
  soft: number;  // glow spread: the far plane reads out of focus
  alpha: number;
  rate: number;  // spontaneous firing rate
};

export default function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { sig: SIGNAL, ink: INK } = readTokens(cv.parentElement ?? document.documentElement);
    let W = 0, H = 0, raf = 0, last: number | null = null;
    let mx = -1, my = -1;
    const R = Math.random;

    // --- network state -------------------------------------------------------
    let layers: Layer[] = [];
    // One pre-rendered glow per signal colour. Building a radial gradient for
    // every node on every frame was half the frame budget.
    const SPRITE = 64;
    const sprites = SIGNAL.map(([r, g, bl]) => {
      const c = document.createElement("canvas");
      c.width = c.height = SPRITE;
      const x = c.getContext("2d")!;
      const grd = x.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2);
      grd.addColorStop(0, `rgba(${r},${g},${bl},1)`);
      grd.addColorStop(0.45, `rgba(${r},${g},${bl},0.32)`);
      grd.addColorStop(1, `rgba(${r},${g},${bl},0)`);
      x.fillStyle = grd;
      x.fillRect(0, 0, SPRITE, SPRITE);
      return c;
    });
    const glow = (g: CanvasRenderingContext2D, ci: number, x: number, y: number, rad: number, a: number) => {
      if (a <= 0.004) return;
      g.globalAlpha = Math.min(1, a);
      g.drawImage(sprites[ci], x - rad, y - rad, rad * 2, rad * 2);
      g.globalAlpha = 1;
    };
    let gain = 0;   // brief global lift so a cascade reads as one wave
    let alive = 0;  // seconds since the first frame
    const SETTLE = 9;      // it calms over this many seconds
    const FLOOR = 0.55;    // and never goes fully quiet y: number; ph: number }[] = []; off: number; sp: number; seed: number }[] = []; y: number; r: number; sp: number; ph: number }[] = [];

    function build() {
      // A soft, out-of-focus background gains nothing from retina resolution
      // and pays 5.2M pixels a frame for it.
      const dpr = Math.min(1.5, devicePixelRatio || 1);
      W = cv!.clientWidth; H = cv!.clientHeight;
      cv!.width = W * dpr; cv!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Three depth planes instead of one flat web. Far is small, dim and
        // out of focus; near is larger, brighter and moves most with the
        // pointer. That parallax is what stops it reading as a particle field.
        const area = W * H;
        const SPEC = [
          { n: Math.round(Math.min(56, Math.max(22, area / 30000))), par: 0.006, soft: 1.9, alpha: 0.5, rate: 0.7, rmin: 0.7, rmax: 1.5 },
          { n: Math.round(Math.min(40, Math.max(16, area / 46000))), par: 0.016, soft: 1.25, alpha: 0.85, rate: 0.85, rmin: 1.2, rmax: 2.4 },
          { n: Math.round(Math.min(20, Math.max(8, area / 95000))), par: 0.034, soft: 1, alpha: 1, rate: 0.55, rmin: 2, rmax: 3.6 },
        ];
        layers = SPEC.map((sp) => {
          const nodes: Node[] = [];
          for (let i = 0; i < sp.n; i++) {
            // Bias density away from the middle: the object lives there, and a
            // uniform fill is what made the first version read as wallpaper.
            let x = 0, y = 0;
            for (let tries = 0; tries < 8; tries++) {
              x = R() * W; y = R() * H;
              const nx = (x - W / 2) / (W / 2), ny = (y - H / 2) / (H / 2);
              if (Math.hypot(nx, ny) > 0.42 || R() < 0.18) break;
            }
            nodes.push({
              x, y, a: R() * 0.25, cool: 0,
              r: sp.rmin + R() * (sp.rmax - sp.rmin),
              adj: [], c: (R() * SIGNAL.length) | 0,
            });
          }
          const edges: Edge[] = [];
          const maxD = Math.min(W, H) * 0.34 + 60;
          for (let i = 0; i < nodes.length; i++) {
            const d: [number, number][] = [];
            for (let j = 0; j < nodes.length; j++) {
              if (i === j) continue;
              const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
              if (dist < maxD) d.push([dist, j]);
            }
            d.sort((a, b) => a[0] - b[0]);
            // two links, not three: a sparser graph reads as a network, a
            // denser one reads as a triangulated mesh
            for (let k = 0; k < Math.min(2, d.length); k++) {
              const j = d[k][1];
              if (!edges.some((e) => e.a === j && e.b === i))
                edges.push({ a: i, b: j, len: d[k][0], bow: (R() - 0.5) * 0.16 });
            }
          }
          edges.forEach((e, ei) => { nodes[e.a].adj.push(ei); nodes[e.b].adj.push(ei); });
          return { nodes, edges, pulses: [], par: sp.par, soft: sp.soft, alpha: sp.alpha, rate: sp.rate };
        });

    }

    function fire(L: Layer, i: number) {
      const n = L.nodes[i];
      if (!n || n.cool > 0) return;
      n.a = 1;
      n.cool = 0.5;
      n.adj.forEach((ei) => {
        const e = L.edges[ei];
        const to = e.a === i ? e.b : e.a;
        L.pulses.push({ a: L.nodes[i], b: L.nodes[to], to, t: 0, sp: 1 / (0.3 + e.len / 520), c: n.c });
      });
    }

    /** One depth plane. Edges bow slightly and fade with length; the signal is
     *  a travelling comet with a trail, not a dot, which is what makes it read
     *  as propagation rather than as decoration. */
    function drawLayer(g: CanvasRenderingContext2D, L: Layer, lift: number, calm = 1) {
      g.lineCap = "round";
      L.edges.forEach((e) => {
        const A = L.nodes[e.a], B = L.nodes[e.b];
        const act = Math.max(A.a, B.a);
        const fade = 1 - Math.min(1, e.len / 420);
        const a = (0.055 + act * 0.22 + lift * 0.04) * fade * L.alpha * calm;
        if (a < 0.004) return;
        const mxp = (A.x + B.x) / 2 - (B.y - A.y) * e.bow;
        const myp = (A.y + B.y) / 2 + (B.x - A.x) * e.bow;
        g.strokeStyle = `rgba(${INK},${a})`;
        g.lineWidth = 0.9;
        g.beginPath();
        g.moveTo(A.x, A.y);
        g.quadraticCurveTo(mxp, myp, B.x, B.y);
        g.stroke();
      });

      L.pulses.forEach((pu) => {
        const [r, gr, bl] = SIGNAL[pu.c];
        const tail = Math.max(0, pu.t - 0.26);
        const x0 = pu.a.x + (pu.b.x - pu.a.x) * tail;
        const y0 = pu.a.y + (pu.b.y - pu.a.y) * tail;
        const x = pu.a.x + (pu.b.x - pu.a.x) * pu.t;
        const y = pu.a.y + (pu.b.y - pu.a.y) * pu.t;
        const grad = g.createLinearGradient(x0, y0, x, y);
        grad.addColorStop(0, `rgba(${r},${gr},${bl},0)`);
        grad.addColorStop(1, `rgba(${r},${gr},${bl},${0.5 * L.alpha * calm})`);
        g.strokeStyle = grad;
        g.lineWidth = 1.7;
        g.beginPath(); g.moveTo(x0, y0); g.lineTo(x, y); g.stroke();
        glow(g, pu.c, x, y, 10, 0.42 * L.alpha * calm);
      });

      L.nodes.forEach((n) => {
        const act = Math.min(1, n.a + lift * 0.3);
        if (act > 0.05) glow(g, n.c, n.x, n.y, (5 + act * 22) * L.soft, act * 0.22 * L.alpha * calm);
        g.fillStyle = `rgba(${INK},${(0.32 + act * 0.6) * L.alpha * calm})`;
        g.beginPath(); g.arc(n.x, n.y, n.r + act * 1.4, 0, 7); g.fill();
      });
    }

    function draw(dt: number) {
      ctx!.clearRect(0, 0, W, H);

        // The network introduces itself, then gets out of the way. A field
        // firing at full rate forever is what made the page feel busy.
        alive += dt;
        const calm = FLOOR + (1 - FLOOR) * Math.max(0, 1 - alive / SETTLE);
        gain *= Math.pow(0.22, dt);
        const px = mx < 0 ? W / 2 : mx;
        const py = my < 0 ? H / 2 : my;

        layers.forEach((L) => {
          if (R() < dt * L.rate * calm) fire(L, (R() * L.nodes.length) | 0);
          if (mx >= 0)
            L.nodes.forEach((n, i) => {
              const d = Math.hypot(n.x - px, n.y - py);
              if (d < 130) {
                n.a = Math.min(1, n.a + (1 - d / 130) * dt * 2.6);
                if (n.a > 0.86) fire(L, i);
              }
            });
          L.nodes.forEach((n) => { n.a *= Math.pow(0.2, dt); if (n.cool > 0) n.cool -= dt; });
          for (let q = L.pulses.length - 1; q >= 0; q--) {
            const pu = L.pulses[q];
            pu.t += pu.sp * dt;
            if (pu.t >= 1) {
              pu.b.a = Math.min(1, pu.b.a + 0.75);
              pu.b.c = pu.c; // the signal carries its colour onward
              gain = Math.min(1, gain + 0.16);
              if (R() < 0.42) fire(L, pu.to);
              L.pulses.splice(q, 1);
            }
          }
        });

        // Painter's order: far plane first, and the out-of-focus planes go
        // through a single blurred blit, so depth of field costs one filtered
        // draw rather than one per node.
        layers.forEach((L) => {
          const ox = (px - W / 2) * L.par;
          const oy = (py - H / 2) * L.par;
          ctx!.save();
          ctx!.translate(-ox, -oy);
          drawLayer(ctx!, L, gain, calm);
          ctx!.restore();
        });

    }

    build();
    const onResize = () => { build(); if (reduce) draw(0); };
    const onMove = (e: PointerEvent) => {
      const b = cv!.getBoundingClientRect();
      mx = e.clientX - b.left; my = e.clientY - b.top;
    };
    const onLeave = () => { mx = my = -1; };

    addEventListener("resize", onResize);
    if (!reduce) {
      addEventListener("pointermove", onMove);
      document.addEventListener("pointerleave", onLeave);
    }

    if (reduce) {
      draw(0);
    } else {
      const frame = (ts: number) => {
        if (last == null) last = ts;
        let dt = (ts - last) / 1000;
        last = ts;
        if (dt > 0.05) dt = 0.05;
        draw(dt);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="backdrop-canvas pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
