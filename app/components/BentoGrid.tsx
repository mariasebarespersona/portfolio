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
      className={`relative border border-[#1c1c1c]/12 bg-white overflow-hidden rounded-3xl ${className}`}
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
                rgba(28,28,28,0.05),
                transparent 80%
              )
            `,
          }}
        />
      )}
      <div className={`relative h-full z-0 ${noPadding ? '' : 'p-6'}`}>{children}</div>
    </motion.div>
  );
}

function MemojiCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !videoRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / width));
    const invertedPercentage = 1 - percentage; 
    
    if (isFinite(videoRef.current.duration)) {
        videoRef.current.currentTime = invertedPercentage * videoRef.current.duration;
    }
  };

    return (
        <div className="h-full">
            <Card className="h-full group relative bg-[#f5f5f5]" noPadding>
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="absolute inset-0 flex items-center justify-center cursor-crosshair"
            >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5f5f5] z-0" />
            
            <div className="relative w-full h-full pointer-events-none flex items-center justify-center pb-12">
                <video 
                    ref={videoRef}
                    src="/avatar.mov" 
                    muted playsInline preload="auto"
                    className="max-h-full max-w-full object-contain drop-shadow-2xl"
                    onLoadedMetadata={(e) => e.currentTarget.pause()}
                />
            </div>

            <div className="absolute bottom-6 left-6 z-20">
                <h1 className="text-3xl font-bold text-[#1c1c1c] tracking-tight mb-1">MarIA</h1>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#1c1c1c]/5 border border-[#1c1c1c]/15 text-xs text-[#555] backdrop-blur-md">
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
        <Card className="h-full flex flex-col justify-center p-6">
            <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-[#1c1c1c] animate-pulse" />
                 <span className="text-xs font-medium text-[#555] uppercase tracking-wider">Open for client projects</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium text-[#1c1c1c] mb-4 tracking-tight leading-tight">
                Founder building <span className="italic">Agentic AI</span> for clients across the US & Spain.
            </h2>
            <p className="text-[#555] mb-4 leading-relaxed">
                Founder of <span className="text-[#1c1c1c] font-medium">Tumai</span>, where I build <span className="text-[#1c1c1c] font-medium">AI agents that automate real estate operations</span> over WhatsApp, connected directly to clients&apos; CRMs—with paying customers in production in the <span className="text-[#1c1c1c] font-medium">US and Spain</span>. <span className="text-[#1c1c1c] font-bold">Ex-IBM AI Engineer</span> with a <span className="text-[#1c1c1c] font-medium">Neuroscience background</span>—I architect autonomous AI that moves beyond demos into real-world impact.
            </p>
            <div className="flex gap-4 text-[#555] text-sm">
                <span className="flex items-center gap-1 hover:text-[#1c1c1c] transition-colors cursor-pointer">
                    <MapPin size={14} /> London, UK
                </span>
                <span className="flex items-center gap-1 hover:text-[#1c1c1c] transition-colors cursor-pointer">
                    <Globe size={14} /> English, Spanish & French
                </span>
            </div>
        </Card>
    );
}

function ResumeCard({ className = "" }: { className?: string }) {
    return (
        <a href="/resume" className={`block ${className}`}>
            <Card className="h-full flex flex-col justify-center items-center bg-[#fafafa] hover:bg-[#f5f5f5] transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#1c1c1c] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="text-white w-6 h-6" />
                </div>
                <span className="text-[#1c1c1c] font-medium">Resume / CV</span>
                <span className="text-[#555] text-xs mt-1">View History</span>
            </Card>
        </a>
    );
}

function SocialsCard({ className = "" }: { className?: string }) {
    return (
        <div className={`grid grid-cols-2 gap-2 ${className}`}>
            <a href="https://www.linkedin.com/in/maria-sebares9" target="_blank" className="block h-full">
                <Card className="h-full flex flex-col justify-center items-center bg-[#fafafa] hover:bg-[#f5f5f5] transition-colors group cursor-pointer !p-3">
                    <div className="w-9 h-9 rounded-full bg-[#1c1c1c] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Linkedin className="text-white w-4 h-4" />
                    </div>
                    <span className="text-[#1c1c1c] text-[11px] font-medium mt-2">LinkedIn</span>
                </Card>
            </a>
            {/* TODO: replace href with your X handle, e.g. https://x.com/<your-handle> */}
            <a href="https://x.com/" target="_blank" className="block h-full">
                <Card className="h-full flex flex-col justify-center items-center bg-[#fafafa] hover:bg-[#f5f5f5] transition-colors group cursor-pointer !p-3">
                    <div className="w-9 h-9 rounded-full bg-[#1c1c1c] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-base leading-none">𝕏</span>
                    </div>
                    <span className="text-[#1c1c1c] text-[11px] font-medium mt-2">Twitter / X</span>
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
        <Card className="p-5 group hover:bg-[#fafafa] transition-colors cursor-default flex flex-col justify-between h-full relative overflow-hidden">
                {badge && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#1c1c1c] text-white border border-[#1c1c1c] rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                        <Trophy size={11} fill="currentColor" /> {badge}
                    </div>
                )}

                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1c1c1c] flex items-center justify-center text-2xl">
                        {icon || "🚀"}
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-[#1c1c1c] mb-2 group-hover:text-[#555] transition-colors">{title}</h3>
                    <p className="text-[#555] text-sm leading-relaxed mb-4">{desc}</p>

                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded-md bg-transparent border border-[#1c1c1c]/15 text-[10px] text-[#555] font-medium uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {(link || (secondaryLink && secondaryLabel)) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {link && (
                                <a
                                    href={link}
                                    target="_blank"
                                    className="px-3 py-1 rounded-full bg-[#1c1c1c] text-white text-[11px] font-medium hover:bg-[#333] transition-colors flex items-center gap-1"
                                >
                                    <ArrowUpRight size={12} />
                                    <span>{linkLabel}</span>
                                </a>
                            )}
                            {secondaryLink && secondaryLabel && (
                            <a
                                href={secondaryLink}
                                target="_blank"
                                className="px-3 py-1 rounded-full bg-transparent border border-[#1c1c1c]/20 text-[11px] text-[#1c1c1c] hover:bg-[#1c1c1c]/5 transition-colors flex items-center gap-1"
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
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#1c1c1c]/5 text-[#1c1c1c] border border-[#1c1c1c]/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Founder
            </div>

            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1c1c1c] flex items-center justify-center text-2xl font-black text-white">
                    T
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-[#1c1c1c] mb-2 group-hover:text-[#555] transition-colors">Tumai</h3>
                <p className="text-[#555] text-sm leading-relaxed mb-3">
                    AI agents that automate real estate operations end-to-end—running over WhatsApp and plugged straight into your CRM. Rent collection, tenant comms, property evaluation and reporting, on autopilot.
                </p>

                <div className="flex items-center gap-3 text-[10px] text-[#555] uppercase tracking-wider font-semibold mb-3 border-y border-[#1c1c1c]/10 py-2">
                    <span><span className="text-[#1c1c1c]">Live</span> clients</span>
                    <span className="text-[#1c1c1c]/30">·</span>
                    <span><span className="text-[#1c1c1c]">US</span> & <span className="text-[#1c1c1c]">Spain</span></span>
                    <span className="text-[#1c1c1c]/30">·</span>
                    <span className="text-[#1c1c1c]">In production</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {["Real Estate AI", "WhatsApp Agents", "CRM Automation", "RAG"].map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-transparent border border-[#1c1c1c]/15 text-[10px] text-[#555] font-medium uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2">
                    <a
                        href="https://tumai.tech/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-full bg-[#1c1c1c] text-white text-[11px] font-medium hover:bg-[#333] transition-colors flex items-center gap-1"
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
            <h3 className="text-[10px] text-[#555] uppercase tracking-wider font-bold mb-2">Tech Stack</h3>
            <div className="flex flex-col gap-1 flex-1 justify-center">
                {stack.map((tech, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-[#1c1c1c] border-b border-[#1c1c1c]/10 pb-1 last:border-0 last:pb-0">
                        <span>{tech.name}</span>
                        <span className="text-[#555]">{tech.icon}</span>
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
            className="col-span-1 md:col-span-2 bg-[#1c1c1c] border-none !p-0 overflow-hidden group relative"
        >
            <div className="h-full w-full p-6 md:p-8 flex items-center justify-between relative z-10 gap-4">
                <div className="min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                        {copied ? "Email Copied!" : "Let's work together"}
                    </h3>
                    <p className="text-white/60 text-sm">
                        {copied ? "mariasebares9@gmail.com" : "Taking on new client projects this quarter."}
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {/* TODO: replace with your real Cal.com link, e.g. https://cal.com/maria */}
                    <a
                        href="https://cal.com/"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-[#1c1c1c] text-xs font-bold hover:bg-[#f5f5f5] transition-colors shadow-lg"
                    >
                        <Calendar size={14} />
                        <span>Book a 15 min</span>
                    </a>
                    <button
                        onClick={handleCopy}
                        aria-label="Copy email"
                        className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
                    >
                        {copied ? (
                             <div className="text-[#1c1c1c] font-bold text-xl">✓</div>
                        ) : (
                            <Mail className="text-[#1c1c1c] w-5 h-5" />
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
    <div className="min-h-screen w-full bg-white text-[#1c1c1c] p-4 md:p-6 flex items-start justify-center relative overflow-x-hidden">
        
        {/* Background Noise */}
        <div className="fixed inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        
        <motion.div
            className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(0,auto)] gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* ROW 1 */}
            {/* Memoji - spans 2 rows vertically on desktop */}
            <div className="aspect-[4/5] md:aspect-auto md:h-full md:col-span-1 md:row-span-2">
                 <MemojiCard />
            </div>

            {/* Intro - spans 2 cols, 1 row */}
            <div className="md:col-span-2 md:row-span-1">
                <IntroCard />
            </div>

            {/* Stacked Resume & Socials - spans 1 col, 1 row */}
            <div className="md:col-span-1 md:row-span-1 flex flex-col gap-3">
                <ResumeCard className="flex-1" />
                <SocialsCard className="flex-1" />
            </div>

            {/* ROW 2 */}
            {/* Tumai - featured, spans 2 cols */}
            <div className="md:col-span-2 md:row-span-1">
                <TumaiCard />
            </div>

            {/* RoomieScore - spans 1 col, with prominent winner badge */}
            <div className="md:col-span-1 md:row-span-1">
                <ProjectCard
                    title="RoomieScore"
                    desc="AI roommate compatibility analyzer. 1st place at the Cursor Hackathon."
                    tags={["React", "AI", "Vercel"]}
                    badge="1st • Cursor"
                    link="https://roomiescore.vercel.app/dashboard"
                />
            </div>

            {/* ROW 3 */}
            {/* Neuro Ad Analyzer */}
            <div className="md:col-span-1 md:row-span-1">
                <ProjectCard
                    title="Neuro Ad Analyzer"
                    desc="AI-driven marketing analysis combining neuroscience and ML."
                    tags={["AI", "Analytics"]}
                    link="https://neuro-retail-pro.vercel.app/"
                    icon={<Brain size={24} className="text-white" />}
                />
            </div>

            {/* Stack */}
            <div className="md:col-span-1 md:row-span-1">
                 <StackCard />
            </div>

            {/* REDAE Capital - client website design, spans 2 cols */}
            <div className="md:col-span-2 md:row-span-1">
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
            <div className="md:col-span-4 md:row-span-1">
                 <ContactCard />
            </div>

        </motion.div>
    </div>
  );
};

export default BentoGrid;
