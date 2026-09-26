"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Linkedin, Github, Layers, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import Typed from "./components/Typed";
import Face from "./components/Face";
import { WorkPanel, AboutPanel } from "./components/Panels";
import Backdrop from "./components/Backdrop";
import { EMAIL, LINKEDIN } from "./data/content";

const GITHUB = "https://github.com/mariasebarespersona";

type Tab = { id: string; legend: string; label: string; Icon: typeof Layers; tilt: number };

const TABS: (Tab & { wide?: boolean })[] = [
  { id: "work", legend: "W", label: "Projects", Icon: Layers, tilt: -4.5, wide: true },
];

const BODIES: Record<string, () => React.ReactElement> = {
  work: WorkPanel,
  about: AboutPanel,
};

/* Openable panels. About has no key of its own any more, but it still answers
   to A, to the arrows and to the panel's own back and forward. */
const PANELS = ["work", "about"] as const;
const LEGEND: Record<string, string> = { work: "W", about: "A" };
const TITLE: Record<string, string> = { work: "Projects", about: "Who I am" };

export default function Hola() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const reveal = useCallback(() => setReady(true), []);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => {
    setOpen((cur) => {
      const i = cur ? PANELS.indexOf(cur as (typeof PANELS)[number]) : -1;
      return PANELS[(i + d + PANELS.length) % PANELS.length];
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (e.key === "Escape") return close();
      if (e.key === "ArrowRight") { e.preventDefault(); return step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); return step(-1); }
      const hit = PANELS.find((id) => LEGEND[id].toLowerCase() === e.key.toLowerCase());
      if (hit) { e.preventDefault(); setOpen((c) => (c === hit ? null : hit)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, step]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const Body = open ? BODIES[open] : null;
  const active = open ? { id: open, label: TITLE[open], legend: LEGEND[open] } : null;

  return (
    <main className="app-root stage flex min-h-[100dvh] flex-col items-center justify-center px-5" data-open={!!open} data-ready={ready} style={{ paddingBlock: "clamp(18px, 3vh, 46px)" }}>
      <Backdrop />
      {/* two utility keys, above */}
      <div className="key-row relative z-10 flex gap-7">
        {[
          { href: LINKEDIN, Icon: Linkedin, label: "LinkedIn", tilt: -6 },
          { href: GITHUB, Icon: Github, label: "GitHub", tilt: 4.5 },
        ].map(({ href, Icon, label, tilt }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="cap cap-in breathe k-util h-[60px] w-[60px]"
            style={{ "--tilt": `${tilt}deg`, "--in": "80ms" } as React.CSSProperties}
            aria-label={label}
          >
            <Icon size={22} strokeWidth={1.6} />
            <span className="plate">{label}</span>
          </a>
        ))}
      </div>

      {/* The page is an object: almost nothing here is text, which leaves a
          screen reader with four button labels and a search engine with a
          title. This is the page described once, in plain words, for both. */}
      <p className="sr-only">
        María Sebares is an AI Engineer and founder based between San Francisco
        and Madrid. She runs Tumai, a B2B startup whose software a modular home
        dealer in Texas runs their business on, with paying customers in
        production, and she is raising an angel round. She also builds NeuroPop,
        three tools that turn brain research into something a person can use,
        and is open to collaborations on it. Previously an AI Engineer at IBM for
        three years, building agentic systems for a bank. MSci Neuroscience,
        University College London.
      </p>

      {/* the greeting */}
      <div className="relative z-10 text-center" style={{ marginTop: "var(--gap-1)" }}>
        <Typed onFirstLine={reveal} />
      </div>

      {/* her, with the work orbiting */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{ width: "var(--stage)", height: "var(--stage)", marginTop: "var(--gap-2)" }}
      >
        {/* The orbit ring is gone: with a bigger face it was one element too
            many, and its hairline was pulling the eye off the primary key.
            Ring.tsx is still there if it ever comes back. */}
        {/* the gate lives on the button itself: a display:contents wrapper
            has no box, so opacity on it does nothing */}
        <Face onPress={() => setOpen("about")} />
      </div>

      {/* the three keys */}
      <div
        className="key-row relative z-10 flex items-end gap-5 md:gap-7"
        style={{ marginTop: "var(--gap-keys)" }}
      >
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setOpen((c) => (c === t.id ? null : t.id))}
            aria-expanded={open === t.id}
            className={`cap cap-in breathe k-${t.id} ${
              t.wide ? "h-[88px] w-[142px] md:h-[98px] md:w-[196px]" : "h-[64px] w-[64px] md:h-[70px] md:w-[70px]"
            }`}
            style={{ "--tilt": `${t.tilt}deg`, "--in": `${340 + i * 110}ms`, "--bd": `${i * 1.3}s` } as React.CSSProperties}
          >
            <t.Icon size={t.wide ? 30 : 21} strokeWidth={1.4} />
            <span className="plate">{t.label}</span>
          </button>
        ))}

        {/* Not a panel: pressing it opens a mail draft. A contact page that
            makes you read before you can write is a page in the way. */}
        <a
          href={`mailto:${EMAIL}`}
          aria-label={`Email María at ${EMAIL}`}
          className="cap cap-in k-contact h-[64px] w-[64px] md:h-[70px] md:w-[70px]"
          style={{ "--tilt": "-2.4deg", "--in": "560ms" } as React.CSSProperties}
        >
          <Mail size={21} strokeWidth={1.4} />
          <span className="plate">Say hi</span>
        </a>
      </div>

      
{/* the panel: content lives on a screen the device opens */}
      <AnimatePresence>
        {open && Body && active && (
          <motion.div
            key="panel"
            className="fixed inset-0 z-50 flex items-center justify-center p-2.5 md:p-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute inset-0 backdrop-blur-sm"
              style={{ background: "color-mix(in oklab, var(--on-void) 62%, transparent)" }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.label}
              className="screen relative flex max-h-full w-full max-w-[940px] flex-col overflow-hidden"
              
              initial={reduce ? false : { y: 22, scale: 0.985 }}
              animate={{ y: 0, scale: 1 }}
              exit={reduce ? undefined : { y: 14, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[color:var(--screen-line)] px-3 py-2.5 md:px-4">
                <div className="flex gap-2">
                  <button onClick={() => step(-1)} aria-label="Previous" className="cap k-util h-8 w-8 rounded-md">
                    <ChevronLeft size={15} strokeWidth={1.6} />
                  </button>
                  <button onClick={() => step(1)} aria-label="Next" className="cap k-util h-8 w-8 rounded-md">
                    <ChevronRight size={15} strokeWidth={1.6} />
                  </button>
                </div>
                <button onClick={close} className="cap k-util mono h-8 rounded-md px-3 text-[11px]">
                  esc
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-7 md:px-10 md:py-9">
                <Body />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
