import { chromium } from "playwright";
const BASE = "http://localhost:3117";
const b = await chromium.launch();
for (const vp of [{ w: 1440, h: 900 }, { w: 1280, h: 720 }, { w: 375, h: 812 }]) {
  for (const key of ["Projects"]) {
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, hasTouch: vp.w < 768, isMobile: vp.w < 768 });
    const p = await ctx.newPage();
    await p.goto(`${BASE}`, { waitUntil: "networkidle" });
    await p.waitForTimeout(1800);
    await p.getByRole("button", { name: key }).click();
    await p.waitForTimeout(700);
    const r = await p.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      const d = dlg.getBoundingClientRect();
      const scroller = dlg.querySelector(".overflow-y-auto");
      const head = dlg.querySelector("h2");
      const btns = [...dlg.querySelectorAll("button, a")].map((e) => {
        const r = e.getBoundingClientRect();
        return { t: e.textContent.trim().slice(0, 14) || e.getAttribute("aria-label"), w: Math.round(r.width), h: Math.round(r.height), out: r.right > innerWidth + 1 || r.left < -1 };
      });
      return {
        dlg: { x: Math.round(d.x), y: Math.round(d.y), w: Math.round(d.width), h: Math.round(d.height), bottom: Math.round(d.bottom) },
        fitsVertically: d.bottom <= innerHeight + 1 && d.top >= -1,
        scrollable: scroller ? scroller.scrollHeight > scroller.clientHeight : null,
        hOverflow: document.documentElement.scrollWidth - innerWidth,
        headWraps: head ? Math.round(head.getBoundingClientRect().height) : null,
        offscreenControls: btns.filter((x) => x.out),
        tinyTargets: btns.filter((x) => x.h > 0 && x.h < 32).map((x) => `${x.t}:${x.h}px`),
      };
    });
    console.log(`${vp.w}x${vp.h}  "${key}"  dlg ${r.dlg.w}x${r.dlg.h} @${r.dlg.y}  fits:${r.fitsVertically}  scrolls:${r.scrollable}  hOverflow:${r.hOverflow}  offscreen:${r.offscreenControls.length}  small:${r.tinyTargets.join(",") || "none"}`);
    await ctx.close();
  }
}
await b.close();
