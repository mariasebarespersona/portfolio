import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3117";
const b = await chromium.launch();

for (const vp of [{ w: 1440, h: 900 }, { w: 1280, h: 720 }, { w: 768, h: 1024 }, { w: 375, h: 812 }]) {
  const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(`${BASE}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2200);
  const r = await p.evaluate(() => {
    const sel = [
      ...document.querySelectorAll("a.cap, button.cap, .plate, h1, main > p, .node"),
    ];
    const items = sel.map((e, idx) => {
      const b = e.getBoundingClientRect();
      return {
        idx,
        el: e,
        tag: e.tagName,
        kind: e.classList.contains("plate")
          ? `plate:${e.textContent.trim()}`
          : e.classList.contains("node")
            ? "node"
            : e.classList.contains("cap")
              ? `cap:${(e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 12)}`
              : e.tagName === "H1"
                ? "greeting"
                : "footer",
        x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1),
        r: +(b.x + b.width).toFixed(1), bt: +(b.y + b.height).toFixed(1),
      };
    });
    // pairwise overlap, ignoring a plate against its own cap
    const hits = [];
    for (let i = 0; i < items.length; i++)
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i], c = items[j];
        const ox = Math.min(a.r, c.r) - Math.max(a.x, c.x);
        const oy = Math.min(a.bt, c.bt) - Math.max(a.y, c.y);
        if (ox > 1 && oy > 1) {
          // a plate inside its own cap is meant to sit on it
          const own = a.el.contains(c.el) || c.el.contains(a.el);
          if (!own) hits.push({ a: a.kind, b: c.kind, ox: +ox.toFixed(1), oy: +oy.toFixed(1) });
        }
      }
    const face = document.querySelector(".face-cap");
    const vid = face?.querySelector("video");
    const fb = face?.getBoundingClientRect();
    return {
      vw: innerWidth, vh: innerHeight,
      docH: document.documentElement.scrollHeight,
      overflowY: document.documentElement.scrollHeight - innerHeight,
      hits: hits.map(({ a, b, ox, oy }) => ({ a, b, ox, oy })),
      face: fb ? { w: Math.round(fb.width), h: Math.round(fb.height), y: Math.round(fb.y), bottom: Math.round(fb.bottom) } : null,
      video: vid ? { natW: vid.videoWidth, natH: vid.videoHeight, fit: getComputedStyle(vid).objectFit, pos: getComputedStyle(vid).objectPosition, tr: getComputedStyle(vid).transform } : null,
      footerBottom: (() => { const p = document.querySelector("main > p"); return p ? Math.round(p.getBoundingClientRect().bottom) : null; })(),
    };
  });
  console.log(`\n=== ${vp.w}x${vp.h} ===`);
  console.log("viewport", r.vw, "doc", r.docH, "vertical overflow", r.overflowY);
  console.log("face", JSON.stringify(r.face), "video", JSON.stringify(r.video));
  console.log("footer bottom", r.footerBottom);
  console.log("overlaps:", r.hits.length ? JSON.stringify(r.hits, null, 1) : "none");
  await ctx.close();
}
await b.close();
