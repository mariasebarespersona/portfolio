"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Globe,
  Linkedin,
  FileText,
  Mail,
  Hand,
  Brain,
  Code,
  Zap,
} from "lucide-react";
import WindowCard, { type Entrance } from "./WindowCard";
import FloatLayer from "./FloatLayer";
import CustomCursor from "./CustomCursor";
import Threads, { type Anchor } from "./Threads";
import LivePreview from "./LivePreview";
import Avatar from "./Avatar";
import { projects, type Project } from "../data/projects";
import { useReducedMotion, useIsTouch, usePointerParallax } from "../hooks/usePointer";

const STAGE_W = 1340;
const STAGE_H = 880;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const heroVariants: Variants = {
  hidden: { y: "120%" },
  visible: { y: 0, transition: { type: "spring", stiffness: 80, damping: 16 } },
};

const project = (slug: string) => projects.find((p) => p.slug === slug)!;

// --- Window meta (positions, depth) -----------------------------------------

type WinMeta = {
  id: string;
  kind: "intro" | "project" | "avatar" | "stack";
  slug?: string;
  label: string;
  href?: string;
  width: number;
  x: number;
  y: number;
  rotate: number;
  depth: number; // 0 far .. 1 near
};

const WINDOWS: WinMeta[] = [
  { id: "intro", kind: "intro", label: "about", width: 375, x: 0, y: 20, rotate: -1.5, depth: 0.2 },
  { id: "tumai", kind: "project", slug: "tumai", label: project("tumai").windowLabel, href: "/work/tumai", width: 325, x: 440, y: 0, rotate: 1.8, depth: 0.5 },
  { id: "roomiescore", kind: "project", slug: "roomiescore", label: project("roomiescore").windowLabel, href: "/work/roomiescore", width: 300, x: 790, y: 52, rotate: 3, depth: 0.7 },
  { id: "stack", kind: "stack", label: "stack.txt", width: 250, x: 1095, y: 60, rotate: 3, depth: 0.35 },
  { id: "maria", kind: "avatar", label: "maria.mov", width: 285, x: 180, y: 300, rotate: -2.5, depth: 0.45 },
  { id: "redae-capital", kind: "project", slug: "redae-capital", label: project("redae-capital").windowLabel, href: "/work/redae-capital", width: 345, x: 430, y: 430, rotate: 1.2, depth: 0.6 },
  { id: "neuro", kind: "project", slug: "neuro-ad-analyzer", label: project("neuro-ad-analyzer").windowLabel, href: "/work/neuro-ad-analyzer", width: 295, x: 40, y: 540, rotate: -3, depth: 0.45 },
  { id: "neuropop", kind: "project", slug: "neuropop", label: project("neuropop").windowLabel, href: "/work/neuropop", width: 335, x: 820, y: 470, rotate: -1.8, depth: 0.8 },
];

const CONNECTIONS: [string, string][] = [
  ["intro", "maria"],
  ["maria", "tumai"],
  ["tumai", "roomiescore"],
  ["neuro", "neuropop"],
];

// --- Window bodies -----------------------------------------------------------

function ProjectWindowBody({ p, liveEnabled }: { p: Project; liveEnabled: boolean }) {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <LivePreview
          cover={p.cover}
          src={p.externalLink}
          label={p.name}
          enabled={liveEnabled}
          embeddable={p.embeddable}
        />
        {p.badge && (
          <span className="pointer-events-none absolute right-2.5 top-2.5 z-20 rounded-full bg-[#161310]/90 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-[#efe6d4] backdrop-blur">
            {p.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-normal leading-tight text-[#26211b]">{p.name}</h3>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-[#9a7a4c]">{p.role}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[#6f6657]">{p.oneLiner}.</p>
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#26211b] transition-colors group-hover:text-[#9a7a4c]">
          <span>View project</span>
          <ArrowUpRight size={12} />
        </div>
      </div>
    </div>
  );
}

function IntroBody() {
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9a7a4c]" />
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#9a7a4c]">
          Open for client projects
        </span>
      </div>
      <h2 className="mb-3 text-2xl font-normal leading-[1.15] tracking-tight text-[#26211b]">
        Founder building <span className="italic text-[#9a7a4c]">Agentic AI</span> for clients
        across the US &amp; Spain.
      </h2>
      <p className="mb-3 text-[14px] leading-relaxed text-[#6f6657]">
        Founder of <span className="font-medium text-[#26211b]">Tumai</span>, where I build{" "}
        <span className="font-medium text-[#26211b]">AI agents that automate real estate operations</span>{" "}
        over WhatsApp, connected directly to clients&apos; CRMs — with paying customers in production.{" "}
        <span className="font-medium text-[#26211b]">Ex-IBM AI Engineer</span> with a{" "}
        <span className="font-medium text-[#26211b]">Neuroscience background</span>.
      </p>
      <div className="flex gap-4 text-[13px] text-[#6f6657]">
        <span className="flex items-center gap-1">
          <MapPin size={13} /> London, UK
        </span>
        <span className="flex items-center gap-1">
          <Globe size={13} /> EN · ES · FR
        </span>
      </div>
    </div>
  );
}

function AvatarBody() {
  return (
    <div className="relative">
      <Avatar className="h-[210px] w-full" />
      <div className="absolute bottom-3 left-4">
        <h3 className="text-lg font-normal text-[#26211b]">MarIA</h3>
        <span className="rounded-full border border-[#9a7a4c]/40 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[#9a7a4c]">
          Founder · Tumai
        </span>
      </div>
    </div>
  );
}

function StackBody() {
  const stack = [
    { name: "Agentic AI & Orchestration", icon: <Brain size={13} /> },
    { name: "LLMs — Claude, GPT, Gemini", icon: <Zap size={13} /> },
    { name: "RAG & Vector DBs (pgvector)", icon: <Zap size={13} /> },
    { name: "TypeScript & Python", icon: <Code size={13} /> },
    { name: "Next.js & FastAPI", icon: <Code size={13} /> },
    { name: "AWS & GCP", icon: <Zap size={13} /> },
  ];
  return (
    <div className="p-4">
      <h3 className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#9a7a4c]">
        Tech Stack
      </h3>
      <div className="flex flex-col">
        {stack.map((t) => (
          <div
            key={t.name}
            className="flex items-center justify-between border-b border-[#26211b]/10 py-1.5 text-[12px] text-[#26211b] last:border-0"
          >
            <span>{t.name}</span>
            <span className="text-[#9a7a4c]">{t.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderBody(meta: WinMeta, liveEnabled: boolean) {
  switch (meta.kind) {
    case "intro":
      return <IntroBody />;
    case "avatar":
      return <AvatarBody />;
    case "stack":
      return <StackBody />;
    case "project":
      return <ProjectWindowBody p={project(meta.slug!)} liveEnabled={liveEnabled} />;
  }
}

// --- Contact / hero ----------------------------------------------------------

function ContactBar() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("mariasebares9@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative z-[60] mx-auto mt-12 w-full max-w-[1340px] overflow-hidden rounded-2xl bg-[#161310] px-6 py-6 md:px-8">
      <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_right,_rgba(255,255,255,0.08),transparent)]" />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-2xl font-normal text-[#efe6d4] md:text-3xl">
            {copied ? "Email copied!" : "Let's work together"}
          </h3>
          <p className="mt-1 text-sm text-[#efe6d4]/60">
            {copied ? "mariasebares9@gmail.com" : "Taking on new client projects this quarter."}
          </p>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-2 rounded-full bg-[#efe6d4] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#161310] transition-transform hover:scale-[1.03]"
        >
          <Mail size={15} />
          <span>{copied ? "Copied" : "Copy email"}</span>
        </button>
      </div>
    </div>
  );
}

function Hero({ animate }: { animate: boolean }) {
  return (
    <header className="mx-auto flex w-full max-w-[1340px] flex-wrap items-end justify-between gap-4 px-1">
      <div>
        <div className="overflow-hidden pb-1">
          <motion.h1
            variants={heroVariants}
            initial={animate ? "hidden" : false}
            animate="visible"
            className="text-4xl font-normal leading-[0.95] tracking-tight text-[#26211b] md:text-6xl"
          >
            María Sebares
          </motion.h1>
        </div>
        <motion.p
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#9a7a4c]"
        >
          AI Engineer · Founder of Tumai — agentic AI, shipped to production
        </motion.p>
      </div>
      <nav className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#26211b]">
        <Link
          href="/resume"
          className="flex items-center gap-1.5 rounded-full border border-[#26211b]/25 px-3.5 py-1.5 transition-colors hover:bg-[#26211b] hover:text-[#efe6d4]"
        >
          <FileText size={13} /> Resume
        </Link>
        <a
          href="https://www.linkedin.com/in/maria-sebares9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#26211b]/25 transition-colors hover:bg-[#26211b] hover:text-[#efe6d4]"
        >
          <Linkedin size={14} />
        </a>
      </nav>
    </header>
  );
}

// --- Canvas ------------------------------------------------------------------

export default function Canvas() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const motionOK = !reduced;
  const liveEnabled = motionOK && !touch;
  const fxEnabled = motionOK && !touch; // parallax, idle, custom cursor
  const pointer = usePointerParallax(fxEnabled);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const anchors = useMemo<Record<string, Anchor>>(() => {
    const a: Record<string, Anchor> = {};
    for (const w of WINDOWS) a[w.id] = { cx: w.x + w.width / 2, cy: w.y + 130 };
    return a;
  }, []);

  const hoveredMeta = WINDOWS.find((w) => w.id === hoveredId);
  const cursorHint = hoveredMeta ? (hoveredMeta.href ? "open" : "drag") : null;

  const deckEntrance = (w: WinMeta, i: number): Entrance => ({
    ox: STAGE_W / 2 - (w.x + w.width / 2),
    oy: STAGE_H / 2 - w.y - 60,
    rot: w.rotate,
    scale: 0.5,
    jit: i % 2 ? 5 : -5,
  });

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#f0e9da] px-4 py-6 text-[#26211b] md:px-8 md:py-8">
      {/* Background grain */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Soft vignette */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(38,33,27,0.10) 100%)",
        }}
      />

      {fxEnabled && <CustomCursor hint={cursorHint} />}

      <Hero animate={motionOK} />

      {/* Drag hint (desktop only) */}
      <div className="mx-auto mt-3 hidden w-full max-w-[1340px] items-center gap-1.5 px-1 text-[10px] uppercase tracking-[0.18em] text-[#9a7a4c]/80 lg:flex">
        <Hand size={12} /> Drag the windows · hover to go live · click a project to open it
      </div>

      {/* Desktop: living, scattered, draggable canvas */}
      <motion.div
        variants={containerVariants}
        initial={motionOK ? "hidden" : "visible"}
        animate="visible"
        className={`relative mx-auto mt-4 hidden lg:block ${fxEnabled ? "no-native-cursor" : ""}`}
        style={{ width: STAGE_W, height: STAGE_H }}
      >
        <div ref={stageRef} className="absolute inset-0">
          {fxEnabled && (
            <Threads width={STAGE_W} height={STAGE_H} anchors={anchors} connections={CONNECTIONS} />
          )}
          {WINDOWS.map((w, i) => (
            <FloatLayer
              key={w.id}
              x={w.x}
              y={w.y}
              width={w.width}
              depth={w.depth}
              index={i}
              baseZ={i + 1}
              pointer={fxEnabled ? pointer : null}
              idle={fxEnabled}
              recede={hoveredId !== null && hoveredId !== w.id}
              focused={hoveredId === w.id}
            >
              <WindowCard
                label={w.label}
                href={w.href}
                draggable
                dragConstraints={stageRef}
                entrance={deckEntrance(w, i)}
                onHover={(h) => setHoveredId(h ? w.id : null)}
                testId={`window-${w.id}`}
                className="w-full"
              >
                {renderBody(w, liveEnabled)}
              </WindowCard>
            </FloatLayer>
          ))}
        </div>
      </motion.div>

      {/* Mobile / tablet: clean vertical stack */}
      <motion.div
        variants={containerVariants}
        initial={motionOK ? "hidden" : "visible"}
        animate="visible"
        className="mx-auto mt-6 flex w-full max-w-[460px] flex-col gap-5 lg:hidden"
      >
        {WINDOWS.map((w) => (
          <WindowCard
            key={w.id}
            label={w.label}
            href={w.href}
            entrance={{ ox: 0, oy: 28, rot: 0 }}
            testId={`window-${w.id}`}
            className="w-full"
          >
            {renderBody(w, liveEnabled)}
          </WindowCard>
        ))}
      </motion.div>

      <ContactBar />
    </div>
  );
}
