import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3117";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(`${BASE}`, { waitUntil: "networkidle" });
await p.waitForTimeout(3200);

const audit = async (label) => {
  const rows = await p.evaluate(() => {
    const lum = (c) => {
      // tokens come back as hex, computed styles as rgb(); parsing only the
      // digits turned "#f4f1e9" into nonsense and cried wolf on every keycap
      let m;
      if (c.trim().startsWith("#")) {
        let h = c.trim().slice(1);
        if (h.length === 3) h = h.split("").map((x) => x + x).join("");
        m = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
      } else {
        m = (c.match(/[\d.]+/g) || []).map(Number);
      }
      const [r, g, bl] = m;
      const f = [r, g, bl].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
    };
    // walk up for the first opaque background actually painted behind an element
    const bgOf = (el) => {
      // a keycap paints a gradient, so backgroundColor is transparent on it;
      // use its mid stop instead of walking past it to the page
      let n = el;
      // walk up, but stop at a keycap and use its gradient mid stop, since a
      // gradient leaves backgroundColor transparent
      while (n) {
        const cs = getComputedStyle(n);
        const c = cs.backgroundColor;
        const m = (c.match(/[\d.]+/g) || []).map(Number);
        if (m.length >= 3 && (m[3] === undefined || m[3] > 0.85)) return c;
        if (n.classList && n.classList.contains("cap")) {
          const v = cs.getPropertyValue("--cap-b").trim();
          if (v) return v;
        }
        n = n.parentElement;
      }
      return "rgb(255,255,255)";
    };
    const _unused = (el) => {
      let n = el;
      while (n) {
        const c = getComputedStyle(n).backgroundColor;
        const m = (c.match(/[\d.]+/g) || []).map(Number);
        if (m.length >= 3 && (m[3] === undefined || m[3] > 0.85)) return c;
        n = n.parentElement;
      }
      return "rgb(255,255,255)";
    };
    const out = [];
    const seen = new Set();
    document.querySelectorAll("h1, h2, h3, h4, p, dt, dd, span, a, button, li").forEach((e) => {
      const txt = (e.textContent || "").trim();
      if (!txt || e.children.length) return;
      const r = e.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) return;
      const cs = getComputedStyle(e);
      if (+cs.opacity < 0.1 || cs.visibility === "hidden") return;
      const size = parseFloat(cs.fontSize);
      const bold = +cs.fontWeight >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const ratio = (() => {
        const a = lum(cs.color), bg = lum(bgOf(e));
        return (Math.max(a, bg) + 0.05) / (Math.min(a, bg) + 0.05);
      })();
      const need = large ? 3 : 4.5;
      const key = txt.slice(0, 22) + size;
      if (seen.has(key)) return;
      seen.add(key);
      if (ratio < need) out.push({ txt: txt.slice(0, 26), size: Math.round(size), ratio: +ratio.toFixed(2), need });
    });
    return out;
  });
  console.log(`\n${label}: ${rows.length ? rows.length + " below WCAG AA" : "all text passes WCAG AA"}`);
  rows.forEach((r) => console.log(`  "${r.txt}" ${r.size}px  ${r.ratio}:1  needs ${r.need}`));
};

await audit("home");
await p.getByRole("button", { name: "Projects", exact: true }).click();
await p.waitForTimeout(900);
await audit("panel: Projects");
await p.keyboard.press("Escape");
await p.waitForTimeout(400);
// About has no key now: it opens from her face
await p.getByRole("button", { name: /About Mar/i }).click();
await p.waitForTimeout(900);
await audit("panel: Who I am");
await b.close();
