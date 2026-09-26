import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto((process.env.BASE ?? "http://localhost:3118"), { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
await p.mouse.move(360, 260);
const fps = await p.evaluate(() => new Promise((res) => {
  let n = 0; const t0 = performance.now();
  const tick = () => { n++; if (performance.now() - t0 < 2500) requestAnimationFrame(tick); else res(Math.round(n / ((performance.now() - t0) / 1000))); };
  requestAnimationFrame(tick);
}));
console.log("fps:", fps);
const err = await p.evaluate(() => (window.__err || []).length);
await b.close();
