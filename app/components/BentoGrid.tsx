"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, type Variants } from "framer-motion";
import { Github, MapPin, ArrowUpRight, Mail, Globe, Zap, Code, FileText, Linkedin, Trophy, Brain, Calendar } from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

// --- COMPONENTS ---

function Card({ children, className = "", spotlight = true, noPadding = false, onClick }: { children: React.ReactNode; className?: string; spotlight?: boolean; noPadding?: boolean; onClick?: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`relative border border-[#26211b]/12 bg-[#f4eee0] overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(154,122,76,0.08),
                transparent 80%
              )
            `,
          }}
        />
      )}
      <div className={`relative h-full z-0 ${noPadding ? '' : 'p-4 md:p-5'}`}>{children}</div>
    </motion.div>
  );
}

function MemojiCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Touch devices have no mousemove to scrub the avatar, so show a static portrait.
  const [isTouch, setIsTouch] = useState(false);

  // Target playback position (0..1) driven by the cursor; eased toward in a rAF loop.
  const targetRef = useRef(0.5);
  const currentRef = useRef(0.5);

  React.useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  React.useEffect(() => {
    if (isTouch) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && isFinite(v.duration) && v.duration > 0) {
        // Ease current toward target for a smooth, fluid follow.
        currentRef.current += (targetRef.current - currentRef.current) * 0.18;
        const t = currentRef.current * v.duration;
        if (Math.abs(t - v.currentTime) > 0.004) {
          if (typeof v.fastSeek === "function") v.fastSeek(t);
          else v.currentTime = t;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isTouch]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    // Map cursor left→right to the avatar turning to follow it.
    targetRef.current = Math.max(0, Math.min(1, 1 - x));
  };

    return (
        <div className="h-full">
            <Card className="h-full group relative bg-[#f4eee0]" noPadding>
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="absolute inset-0 flex items-center justify-center cursor-crosshair"
            >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f4eee0] z-0" />

            <div className="relative w-full h-full pointer-events-none flex items-center justify-center pb-12">
                {isTouch ? (
                    // Touch devices have no mouse to scrub — show a clean, static portrait
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
                        muted playsInline preload="auto"
                        className="max-h-full max-w-full object-contain"
                        onLoadedMetadata={(e) => e.currentTarget.pause()}
                    >
                        <source src="/avatar.mp4" type="video/mp4" />
                    </video>
                )}
            </div>

            <div className="absolute bottom-6 left-6 z-20">
                <h1 className="text-2xl font-bold text-[#26211b] tracking-tight mb-1">MarIA</h1>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-transparent border border-[#9a7a4c]/40 text-[10px] text-[#9a7a4c] uppercase tracking-[0.18em] backdrop-blur-md">
                        Founder · Tumai
                    </span>
                </div>
            </div>
            </div>
            </Card>
        </div>
    );
}

function IntroCard() {
    return (
        <Card className="h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#9a7a4c] animate-pulse" />
                 <span className="text-[10px] font-medium text-[#9a7a4c] uppercase tracking-[0.22em]">Open for client projects</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-normal text-[#26211b] mb-3 tracking-tight leading-[1.15]">
                Founder building <span className="italic text-[#9a7a4c]">Agentic AI</span> for clients across the US &amp; Spain.
            </h2>
            <p className="text-[#6f6657] text-sm md:text-[15px] mb-3 leading-relaxed">
                Founder of <span className="text-[#26211b] font-medium">Tumai</span>, where I build <span className="text-[#26211b] font-medium">AI agents that automate real estate operations</span> over WhatsApp, connected directly to clients&apos; CRMs—with paying customers in production in the <span className="text-[#26211b] font-medium">US and Spain</span>. <span className="text-[#26211b] font-medium">Ex-IBM AI Engineer</span> with a <span className="text-[#26211b] font-medium">Neuroscience background</span>—I architect autonomous AI that moves beyond demos into real-world impact.
            </p>
            <div className="flex gap-4 text-[#6f6657] text-sm">
                <span className="flex items-center gap-1 hover:text-[#9a7a4c] transition-colors cursor-pointer">
                    <MapPin size={14} /> London, UK
                </span>
                <span className="flex items-center gap-1 hover:text-[#9a7a4c] transition-colors cursor-pointer">
                    <Globe size={14} /> English, Spanish & French
                </span>
            </div>
        </Card>
    );
}

function ResumeCard({ className = "" }: { className?: string }) {
    return (
        <a href="/resume" className={`block ${className}`}>
            <Card className="h-full flex flex-col justify-center items-center bg-[#f4eee0] hover:bg-[#ebe3d2] transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#161310] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FileText className="text-white w-5 h-5" />
                </div>
                <span className="text-[#26211b] font-medium">Resume / CV</span>
                <span className="text-[#6f6657] text-xs mt-1">View History</span>
            </Card>
        </a>
    );
}

function SocialsCard({ className = "" }: { className?: string }) {
    return (
        <div className={`grid grid-cols-2 gap-2 ${className}`}>
            <a href="https://www.linkedin.com/in/maria-sebares9" target="_blank" className="block h-full">
                <Card className="h-full flex flex-col justify-center items-center bg-[#f4eee0] hover:bg-[#ebe3d2] transition-colors group cursor-pointer !p-3">
                    <div className="w-9 h-9 rounded-full bg-[#161310] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Linkedin className="text-white w-4 h-4" />
                    </div>
                    <span className="text-[#26211b] text-[11px] font-medium mt-2">LinkedIn</span>
                </Card>
            </a>
            {/* TODO: replace href with your X handle, e.g. https://x.com/<your-handle> */}
            <a href="https://x.com/" target="_blank" className="block h-full">
                <Card className="h-full flex flex-col justify-center items-center bg-[#f4eee0] hover:bg-[#ebe3d2] transition-colors group cursor-pointer !p-3">
                    <div className="w-9 h-9 rounded-full bg-[#161310] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-base leading-none">𝕏</span>
                    </div>
                    <span className="text-[#26211b] text-[11px] font-medium mt-2">Twitter / X</span>
                </Card>
            </a>
        </div>
    );
}

type ProjectCardProps = {
    title: string;
    desc: string;
    tags: string[];
    link?: string;
    badge?: string;
    icon?: React.ReactNode;
    linkLabel?: string;
    secondaryLabel?: string;
    secondaryLink?: string;
};

function ProjectCard({
    title,
    desc,
    tags,
    link = "#",
    badge,
    icon,
    linkLabel = "Open app",
    secondaryLabel,
    secondaryLink,
}: ProjectCardProps) {
    return (
        <Card className="p-5 group hover:bg-[#f4eee0] transition-colors cursor-default flex flex-col justify-between h-full relative overflow-hidden">
                {badge && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#161310] text-[#efe6d4] border border-[#161310] rounded-full text-[10px] font-medium uppercase tracking-[0.15em] flex items-center gap-1">
                        <Trophy size={11} fill="currentColor" /> {badge}
                    </div>
                )}

                <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#161310] flex items-center justify-center text-xl">
                        {icon || "🚀"}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-[#26211b] mb-1.5 group-hover:text-[#9a7a4c] transition-colors">{title}</h3>
                    <p className="text-[#6f6657] text-sm leading-relaxed mb-3">{desc}</p>

                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 rounded-full bg-transparent border border-[#9a7a4c]/40 text-[10px] text-[#9a7a4c] font-medium uppercase tracking-[0.15em]">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {(link || (secondaryLink && secondaryLabel)) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {link && (
                                <a
                                    href={link}
                                    target="_blank"
                                    className="px-4 py-1.5 rounded-full border border-[#26211b]/50 text-[#26211b] text-[10px] font-medium uppercase tracking-[0.18em] hover:bg-[#26211b] hover:text-[#efe6d4] transition-colors flex items-center gap-1.5"
                                >
                                    <ArrowUpRight size={12} />
                                    <span>{linkLabel}</span>
                                </a>
                            )}
                            {secondaryLink && secondaryLabel && (
                            <a
                                href={secondaryLink}
                                target="_blank"
                                className="px-4 py-1.5 rounded-full bg-transparent border border-[#26211b]/30 text-[10px] text-[#26211b] uppercase tracking-[0.18em] hover:bg-[#26211b]/5 transition-colors flex items-center gap-1.5"
                            >
                                <Github size={12} />
                                <span>{secondaryLabel}</span>
                            </a>
                            )}
                        </div>
                    )}
                </div>
        </Card>
    );
}

function TumaiCard() {
    return (
        <Card className="h-full p-5 group flex flex-col justify-between relative overflow-hidden cursor-default">
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-transparent text-[#9a7a4c] border border-[#9a7a4c]/40 rounded-full text-[10px] font-medium uppercase tracking-[0.18em]">
                Founder
            </div>

            <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#161310] flex items-center justify-center text-xl font-black text-white">
                    T
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-normal text-[#26211b] mb-1.5 group-hover:text-[#9a7a4c] transition-colors">Tumai</h3>
                <p className="text-[#6f6657] text-sm leading-relaxed mb-3">
                    AI agents that automate real estate operations end-to-end—running over WhatsApp and plugged straight into your CRM. Rent collection, tenant comms, property evaluation and reporting, on autopilot.
                </p>

                <div className="flex items-center gap-3 text-[10px] text-[#6f6657] uppercase tracking-[0.15em] font-medium mb-3 border-y border-[#26211b]/12 py-2.5">
                    <span><span className="text-[#9a7a4c]">Live</span> clients</span>
                    <span className="text-[#9a7a4c]/40">·</span>
                    <span><span className="text-[#9a7a4c]">US</span> &amp; <span className="text-[#9a7a4c]">Spain</span></span>
                    <span className="text-[#9a7a4c]/40">·</span>
                    <span className="text-[#9a7a4c]">In production</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {["Real Estate AI", "WhatsApp Agents", "CRM Automation", "RAG"].map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-transparent border border-[#9a7a4c]/40 text-[10px] text-[#9a7a4c] font-medium uppercase tracking-[0.15em]">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2">
                    <a
                        href="https://tumai.tech/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 rounded-full border border-[#26211b]/50 text-[#26211b] text-[10px] font-medium uppercase tracking-[0.18em] hover:bg-[#26211b] hover:text-[#efe6d4] transition-colors flex items-center gap-1.5"
                    >
                        <ArrowUpRight size={12} />
                        <span>tumai.tech</span>
                    </a>
                </div>
            </div>
        </Card>
    );
}

function StackCard() {
    const stack = [
        { name: "Agentic AI & Orchestration", icon: <Brain size={14} /> },
        { name: "LLMs (Claude, GPT-4, Gemini)", icon: <Zap size={14} /> },
        { name: "RAG & Vector DBs (pgvector)", icon: <Zap size={14} /> },
        { name: "TypeScript & Python", icon: <Code size={14} /> },
        { name: "Next.js & FastAPI", icon: <Code size={14} /> },
        { name: "AWS & GCP", icon: <Zap size={14} /> },
    ];
    
    return (
        <Card className="h-full p-5 flex flex-col justify-between">
            <h3 className="text-[10px] text-[#9a7a4c] uppercase tracking-[0.22em] font-medium mb-2">Tech Stack</h3>
            <div className="flex flex-col gap-1 flex-1 justify-center">
                {stack.map((tech, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-[#26211b] border-b border-[#26211b]/10 pb-1 last:border-0 last:pb-0">
                        <span>{tech.name}</span>
                        <span className="text-[#9a7a4c]">{tech.icon}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function ContactCard() {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText("mariasebares9@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card
            className="border-none overflow-hidden group relative"
            noPadding
        >
            <div className="absolute inset-0 bg-[#161310] z-0" />
            <div className="h-full w-full p-5 md:p-6 flex items-center justify-between relative z-10 gap-4">
                <div className="min-w-0">
                    <h3 className="text-2xl md:text-3xl font-normal text-[#efe6d4] mb-1">
                        {copied ? "Email Copied!" : "Let's work together"}
                    </h3>
                    <p className="text-[#efe6d4]/60 text-sm">
                        {copied ? "mariasebares9@gmail.com" : "Taking on new client projects this quarter."}
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {/* TODO: replace with your real Cal.com link, e.g. https://cal.com/maria */}
                    <a
                        href="https://cal.com/"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent border border-[#efe6d4]/40 text-[#efe6d4] text-[10px] font-medium uppercase tracking-[0.18em] hover:bg-[#efe6d4] hover:text-[#161310] transition-colors"
                    >
                        <Calendar size={14} />
                        <span>Book a 15 min</span>
                    </a>
                    <button
                        onClick={handleCopy}
                        aria-label="Copy email"
                        className="w-11 h-11 bg-[#efe6d4] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
                    >
                        {copied ? (
                             <div className="text-[#161310] font-bold text-xl">✓</div>
                        ) : (
                            <Mail className="text-[#161310] w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_right,_rgba(255,255,255,0.08),transparent)]" />
        </Card>
    );
}

// --- MAIN BENTO GRID ---

const BentoGrid = () => {
  return (
    <div className="min-h-[100dvh] w-full bg-[#f0e9da] text-[#26211b] flex items-center justify-center relative overflow-x-hidden p-3 md:p-5 lg:p-6">

        {/* Background Noise */}
        <div className="fixed inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <motion.div
            className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(0,auto)] gap-2.5 md:gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* ROW 1 — Intro (2) + Resume (1) + Socials (1) */}
            <div className="md:col-span-2 row-span-1">
                <IntroCard />
            </div>

            <div className="md:col-span-1 row-span-1">
                <ResumeCard className="h-full" />
            </div>

            <div className="md:col-span-1 row-span-1">
                <SocialsCard className="h-full" />
            </div>

            {/* ROW 2 — Tumai (1) + MarIA centerpiece (2) + RoomieScore (1) */}
            <div className="md:col-span-1 row-span-1">
                <TumaiCard />
            </div>

            {/* MarIA - featured centerpiece, mouse-scrub avatar */}
            <div className="h-44 sm:h-52 md:h-full md:col-span-2 row-span-1">
                 <MemojiCard />
            </div>

            {/* RoomieScore - spans 1 col, with prominent winner badge */}
            <div className="md:col-span-1 row-span-1">
                <ProjectCard
                    title="RoomieScore"
                    desc="AI roommate compatibility analyzer. 1st place at the Cursor Hackathon."
                    tags={["React", "AI", "Vercel"]}
                    badge="1st • Cursor"
                    link="https://roomiescore.vercel.app/dashboard"
                />
            </div>

            {/* ROW 3 — Neuro (1) + Stack (1) + REDAE (2) */}
            <div className="md:col-span-1 row-span-1">
                <ProjectCard
                    title="Neuro Ad Analyzer"
                    desc="AI-driven marketing analysis combining neuroscience and ML."
                    tags={["AI", "Analytics"]}
                    link="https://neuro-retail-pro.vercel.app/"
                    icon={<Brain size={24} className="text-white" />}
                />
            </div>

            {/* Stack */}
            <div className="md:col-span-1 row-span-1">
                 <StackCard />
            </div>

            {/* REDAE Capital - client website design, spans 2 cols */}
            <div className="md:col-span-2 row-span-1">
                <ProjectCard
                    title="REDAE Capital"
                    desc="Designed and built the corporate website for REDAE Capital, a private equity and real estate firm connecting investors between Latin America and Europe across luxury hospitality and residential developments in Spain."
                    tags={["Web Design", "Next.js", "Client Work"]}
                    link="https://www.redaecapital.com/"
                    linkLabel="Visit site"
                    icon={<Globe size={24} className="text-white" />}
                />
            </div>

            {/* Contact - full width */}
            <div className="md:col-span-4 row-span-1">
                 <ContactCard />
            </div>

        </motion.div>
    </div>
  );
};

export default BentoGrid;
