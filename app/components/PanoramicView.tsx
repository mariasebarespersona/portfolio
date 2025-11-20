"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Github, Twitter, ExternalLink, ArrowRight } from "lucide-react";

const PanoramicView = () => {
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Screen width for calculating scroll limits
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const y = (e.clientY / innerHeight) * 2 - 1; // -1 to 1
      mouseX.set(x);
      mouseY.set(y);

      // Head Turning Logic (Scrubbing)
      if (videoRef.current && videoRef.current.duration) {
        const video = videoRef.current;
        video.pause();
        const percentage = e.clientX / innerWidth;
        const clampedPercentage = Math.max(0, Math.min(1, percentage));
        // Invert: Left Mouse (0) = End of video (Looking Left), Right Mouse (1) = Start (Looking Right)
        // Adjust this based on your specific video. 
        // Assuming video is: Look Left -> Center -> Look Right
        // Then 0.0 should be 0s (Left) and 1.0 should be End (Right)
        // Let's try standard direction first:
        if (isFinite(video.duration)) {
           video.currentTime = clampedPercentage * video.duration;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  // MEMOJI PHYSICS
  // Head follows mouse slightly (Tilt)
  const headRotateX = useSpring(useTransform(mouseY, [-1, 1], [10, -5]), { stiffness: 200, damping: 20 });
  const headRotateY = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), { stiffness: 200, damping: 20 });
  const headX = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), { stiffness: 200, damping: 20 });
  const headY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), { stiffness: 200, damping: 20 });

  // CONTENT PARALLAX
  // As mouse moves Left (-1), Content moves Right (+500px) to reveal left side
  const bgX = useSpring(useTransform(mouseX, [-1, 1], [windowWidth * 0.4, -windowWidth * 0.4]), { stiffness: 150, damping: 30 });
  const bgRotateY = useSpring(useTransform(mouseX, [-1, 1], [15, -15]), { stiffness: 150, damping: 30 });

  const projects = [
    { title: "FinTech App", desc: "Banking for the future", color: "bg-blue-500" },
    { title: "AI Assistant", desc: "Your personal jarvis", color: "bg-purple-500" },
    { title: "Crypto Dash", desc: "Realtime analytics", color: "bg-orange-500" },
  ];

  return (
    <div className="relative w-full h-screen bg-neutral-950 overflow-hidden perspective-2000 flex flex-col justify-end">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black pointer-events-none" />

      {/* --- THE PANORAMIC WORLD --- */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        style={{ 
            x: bgX, 
            rotateY: bgRotateY,
            transformStyle: "preserve-3d"
        }}
      >
        
        {/* LEFT PANEL: PROJECTS */}
        <div className="absolute -left-[60vw] w-[50vw] flex flex-col gap-6 p-10 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <h2 className="text-6xl font-bold text-white mb-4 text-right">My <br/> <span className="text-blue-500">Projects</span></h2>
            <div className="grid grid-cols-1 gap-4">
                {projects.map((p, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md flex justify-between items-center group cursor-pointer hover:bg-neutral-800 transition-colors">
                        <div>
                            <h3 className="text-xl font-bold text-white">{p.title}</h3>
                            <p className="text-neutral-400 text-sm">{p.desc}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-full ${p.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <ArrowRight className="text-white w-5 h-5" />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* CENTER PANEL: HERO */}
        <div className="relative z-0 text-center transform -translate-y-20">
             <h1 className="text-[12vw] font-bold text-white leading-none tracking-tighter opacity-10">
                MARIA
             </h1>
             <h2 className="text-2xl text-neutral-400 mt-4 font-light tracking-widest uppercase">
                Product Engineer
             </h2>
        </div>

        {/* RIGHT PANEL: ABOUT/SOCIALS */}
        <div className="absolute -right-[60vw] w-[40vw] flex flex-col items-start gap-8 p-10 opacity-40 hover:opacity-100 transition-opacity duration-500">
             <h2 className="text-6xl font-bold text-white mb-4">About <br/> <span className="text-purple-500">Me</span></h2>
             <p className="text-xl text-neutral-300 leading-relaxed max-w-md">
                I build digital experiences that feel alive. Based in Madrid, obsessing over details and interactions.
             </p>
             
             <div className="flex gap-4 mt-8">
                <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                    <Github className="text-white w-8 h-8" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                    <Twitter className="text-white w-8 h-8" />
                </div>
             </div>
        </div>

      </motion.div>

      {/* --- THE COMMANDER (MEMOJI) --- */}
      <motion.div 
        className="relative z-50 self-center mb-[-50px]" // Pushes it to bottom center
        style={{
            x: headX,
            y: headY,
            rotateX: headRotateX,
            rotateY: headRotateY,
            transformStyle: "preserve-3d"
        }}
      >
        {/* Avatar Container - Larger size */}
        <div className="w-80 h-80 md:w-[500px] md:h-[500px] relative">
            {/* Video Mask - Circle or silhouette? Let's stick to circle but HUGE */}
             <motion.div 
               className="w-full h-full rounded-full overflow-hidden relative z-10"
               // Optional: Add a gradient fade at the bottom to blend with screen edge
               style={{ maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)" }}
             >
               <motion.video 
                 ref={videoRef}
                 src="/avatar.mov" 
                 muted playsInline preload="auto"
                 className="w-full h-full object-cover transform scale-[1.1] translate-y-10"
                 onLoadedMetadata={(e) => e.currentTarget.pause()} 
               />
             </motion.div>
        </div>
      </motion.div>

      {/* Instructions */}
      <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none opacity-30">
        <p className="text-white text-sm uppercase tracking-widest">Move Cursor to Explore</p>
      </div>

    </div>
  );
};

export default PanoramicView;

