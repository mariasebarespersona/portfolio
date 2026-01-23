"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, AnimatePresence, type Variants } from "framer-motion";
import { Github, Twitter, MapPin, ArrowUpRight, Mail, Globe, Zap, Code, Music, Send, FileText, Linkedin, Trophy, Brain } from "lucide-react";
import Image from "next/image";

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
      className={`relative border border-white/10 bg-neutral-900/50 overflow-hidden rounded-3xl backdrop-blur-sm ${className}`}
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
                rgba(255,255,255,0.1),
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
        <div className="col-span-1 row-span-2 h-full">
            <Card className="h-full aspect-auto group relative bg-black" noPadding>
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="absolute inset-0 flex items-center justify-center cursor-crosshair"
            >
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/20 to-black z-0" />
            
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
                <h1 className="text-3xl font-bold text-white tracking-tight mb-1">MarIA</h1>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-xs text-neutral-300 backdrop-blur-md">
                        AI Engineer & Data Scientist
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
        <Card className="h-full flex flex-col justify-center p-6 bg-neutral-900/40">
            <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-xs font-medium text-green-500 uppercase tracking-wider">Available for work</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4 tracking-tight leading-tight">
                AI Engineer & Data Scientist specializing in <span className="text-blue-400">Agentic AI</span> systems.
            </h2>
            <p className="text-neutral-400 mb-4 leading-relaxed">
                Ex-IBM Engineer combining <span className="text-neutral-200 font-medium">enterprise rigor</span> with independent innovation. I architect <span className="text-neutral-200 font-medium">autonomous AI systems</span> that are robust, scalable, and ready for production—moving beyond simple demos to real-world impact.
            </p>
            <div className="flex gap-4 text-neutral-500 text-sm">
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                    <MapPin size={14} /> London, UK
                </span>
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                    <Globe size={14} /> English, Spanish & French
                </span>
            </div>
        </Card>
    );
}

function ResumeCard({ className = "" }: { className?: string }) {
    return (
        <a href="/resume" className={`block ${className}`}>
            <Card className="h-full flex flex-col justify-center items-center bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="text-white w-6 h-6" />
                </div>
                <span className="text-white font-medium">Resume / CV</span>
                <span className="text-neutral-500 text-xs mt-1">View History</span>
            </Card>
        </a>
    );
}

function LinkedInCard({ className = "" }: { className?: string }) {
    return (
        <a href="https://www.linkedin.com/in/maria-sebares9" target="_blank" className={`block ${className}`}>
            <Card className="h-full flex flex-col justify-center items-center bg-[#0077b5]/10 hover:bg-[#0077b5]/20 transition-colors group cursor-pointer border-[#0077b5]/20">
                <div className="w-12 h-12 rounded-full bg-[#0077b5] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                    <Linkedin className="text-white w-6 h-6" />
                </div>
                <span className="text-white font-medium">LinkedIn</span>
                <span className="text-[#0077b5] text-xs mt-1">Connect</span>
            </Card>
        </a>
    );
}

type ProjectCardProps = {
    title: string;
    desc: string;
    color: string;
    tags: string[];
    wide?: boolean;
    link?: string;
    badge?: string;
    icon?: React.ReactNode;
    secondaryLabel?: string;
    secondaryLink?: string;
};

function ProjectCard({
    title,
    desc,
    color,
    tags,
    wide = false,
    link = "#",
    badge,
    icon,
    secondaryLabel,
    secondaryLink,
}: ProjectCardProps) {
    return (
        <Card className="p-5 group hover:bg-neutral-900 transition-colors cursor-default flex flex-col justify-between h-full relative overflow-hidden">
                {badge && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Trophy size={10} /> {badge}
                    </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-2xl shadow-lg ring-4 ring-black`}>
                        {icon || "🚀"}
                    </div>
                </div>
                
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">{desc}</p>
                    
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-neutral-300 font-medium uppercase tracking-wider">
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
                                    className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-medium hover:bg-neutral-200 transition-colors flex items-center gap-1"
                                >
                                    <ArrowUpRight size={12} />
                                    <span>Open app</span>
                                </a>
                            )}
                            {secondaryLink && secondaryLabel && (
                            <a
                                href={secondaryLink}
                                target="_blank"
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-200 hover:bg-white/10 transition-colors flex items-center gap-1"
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

function StackCard() {
    // Stack updated for High-Ticket Client Attraction (End-to-End + Cloud)
    const stack = [
        { name: "Agentic AI (LangGraph/DSPy)", icon: <Brain size={14} /> },
        { name: "RAG & Vector DBs", icon: <Zap size={14} /> },
        { name: "AWS & Cloud Architecture", icon: <Zap size={14} /> },
        { name: "Python & FastAPI", icon: <Code size={14} /> },
        { name: "React & Next.js", icon: <Code size={14} /> },
    ];
    
    return (
        <Card className="h-full p-5 flex flex-col justify-between">
            <h3 className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold mb-2">Tech Stack</h3>
            <div className="flex flex-col gap-1 flex-1 justify-center">
                {stack.map((tech, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-neutral-300 border-b border-white/5 pb-1 last:border-0 last:pb-0">
                        <span>{tech.name}</span>
                        <span className="text-neutral-600">{tech.icon}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function ContactCard() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("mariasebares9@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card 
            onClick={handleCopy}
            className="col-span-1 md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-500 border-none !p-0 overflow-hidden group cursor-pointer relative"
        >
            <div className="h-full w-full p-8 flex items-center justify-between relative z-10">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                        {copied ? "Email Copied!" : "Let's work together"}
                    </h3>
                    <p className="text-blue-100 text-sm">
                        {copied ? "mariasebares9@gmail.com" : "I'm currently open to new opportunities."}
                    </p>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                    {copied ? (
                         <div className="text-blue-600 font-bold text-xl">✓</div>
                    ) : (
                        <Mail className="text-blue-600 w-6 h-6" />
                    )}
                </div>
            </div>
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_right,_rgba(255,255,255,0.4),transparent)]" />
        </Card>
    );
}

// --- MAIN BENTO GRID ---

const BentoGrid = () => {
  return (
    <div className="h-screen w-screen bg-neutral-950 text-white p-4 flex items-center justify-center relative overflow-hidden">
        
        {/* Background Noise */}
        <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        
        <motion.div 
            className="max-w-6xl w-full h-full max-h-[90vh] grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            
            {/* ROW 1 */}
            {/* Memoji - spans 2 rows vertically */}
            <div className="col-span-1 row-span-2">
                 <MemojiCard /> 
            </div>
            
            {/* Intro - spans 2 cols, 1 row */}
            <div className="col-span-2 row-span-1">
                <IntroCard />
            </div>
            
            {/* Stacked Resume & LinkedIn - spans 1 col, 1 row */}
            <div className="col-span-1 row-span-1 flex flex-col gap-3">
                <ResumeCard className="flex-1" />
                <LinkedInCard className="flex-1" />
            </div>

            {/* ROW 2 */}
            {/* Tumai Project - spans 2 cols, 1 row */}
             <div className="col-span-2 row-span-1">
                <ProjectCard 
                    title="Tumai" 
                    desc="AI-powered real estate investment platform." 
                    color="bg-green-600"
                    tags={["Python", "AI Agents", "Real Estate"]}
                    wide={true}
                    link="https://tumai-kappa.vercel.app"
                    secondaryLabel="GitHub"
                    secondaryLink="https://github.com/mariasebarespersona/tumai"
                />
            </div>
            
            {/* RoomieScore - spans 1 col, 1 row */}
            <div className="col-span-1 row-span-1">
                <ProjectCard 
                    title="RoomieScore" 
                    desc="Cursor Hackathon Winner." 
                    color="bg-purple-500"
                    tags={["React", "Vercel"]}
                    badge="1st Place"
                    link="https://roomiescore.vercel.app/dashboard"
                />
            </div>

            {/* ROW 3 */}
            {/* Neuro Ad - spans 1 col, 1 row */}
            <div className="col-span-1 row-span-1">
                <ProjectCard 
                    title="Neuro Ad Analyzer" 
                    desc="AI-driven marketing analysis." 
                    color="bg-rose-500"
                    tags={["AI", "Analytics"]}
                    link="https://neuro-retail-pro.vercel.app/"
                    icon={<Brain size={24} className="text-white" />}
                />
            </div>

            {/* Stack - spans 1 col, 1 row */}
            <div className="col-span-1 row-span-1">
                 <StackCard />
            </div>

             {/* Contact - spans 2 cols, 1 row */}
            <div className="col-span-2 row-span-1">
                 <ContactCard /> 
            </div>

        </motion.div>
    </div>
  );
};

export default BentoGrid;
