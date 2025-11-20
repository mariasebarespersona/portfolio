"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Twitter, ExternalLink } from "lucide-react";

const OrbitHolo = () => {
  const [activeDeck, setActiveDeck] = useState<string | null>(null);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);

      if (videoRef.current && videoRef.current.duration) {
        const video = videoRef.current;
        video.pause();
        const percentage = e.clientX / innerWidth;
        const clampedPercentage = Math.max(0, Math.min(1, percentage));
        const invertedPercentage = 1 - clampedPercentage;
        if (isFinite(video.duration)) {
           video.currentTime = invertedPercentage * video.duration;
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const headRotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 300, damping: 20 });
  const headRotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 300, damping: 20 });
  const innerMoveX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 300, damping: 20 });
  const innerMoveY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), { stiffness: 300, damping: 20 });

  // Card tilt effect
  const cardRotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const cardRotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const items = [
    { id: "interests", icon: <span className="text-4xl">🤔</span>, label: "Interests", bg: "bg-purple-500/10", border: "border-purple-500/20", x: -150, y: -100 },
    { id: "projects", icon: <span className="text-4xl">🛠️</span>, label: "Projects", bg: "bg-blue-500/10", border: "border-blue-500/20", x: 0, y: -180 },
    { id: "about", icon: <span className="text-4xl">📖</span>, label: "About me", bg: "bg-green-500/10", border: "border-green-500/20", x: 150, y: -100 },
  ];

  const projects = [
    { title: "FinTech App", color: "from-blue-500 to-cyan-500" },
    { title: "AI Assistant", color: "from-purple-500 to-pink-500" },
    { title: "Crypto Dashboard", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-950 overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black" />

      <div className="absolute top-20 text-white/50">Holographic Deck Concept</div>

      <div className="relative z-10 flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
         <motion.div 
            className="w-40 h-40 rounded-full bg-black flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/10 relative z-10"
            style={{ rotateX: headRotateX, rotateY: headRotateY }}
         >
           <motion.video 
             ref={videoRef}
             src="/avatar.mov" 
             muted playsInline preload="auto"
             className="w-full h-full object-cover transform scale-[1.2] translate-y-4"
             style={{ x: innerMoveX, y: innerMoveY, scale: 1.2 }}
             onLoadedMetadata={(e) => e.currentTarget.pause()} 
           />
         </motion.div>

         {/* Orbit Icons */}
         {items.map((item) => (
            <motion.div
                key={item.id}
                onClick={() => setActiveDeck(activeDeck === item.id ? null : item.id)}
                className={`absolute flex items-center justify-center w-20 h-20 rounded-2xl backdrop-blur-md border ${item.bg} ${item.border} cursor-pointer transition-all duration-500`}
                initial={{ x: item.x, y: item.y, opacity: 0 }}
                animate={{ 
                    x: activeDeck ? (activeDeck === item.id ? 0 : item.x * 1.5) : item.x, // Move active to center, others away
                    y: activeDeck ? (activeDeck === item.id ? -250 : item.y * 1.5) : item.y,
                    opacity: activeDeck && activeDeck !== item.id ? 0.2 : 1,
                    scale: activeDeck === item.id ? 1.2 : 1
                }}
            >
                {item.icon}
            </motion.div>
         ))}

         {/* Holographic Cards Deck */}
         {activeDeck === "projects" && (
            <div className="absolute top-20 w-full h-full flex justify-center items-center pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                {projects.map((proj, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 0, rotateX: 90 }}
                        animate={{ 
                            opacity: 1, 
                            y: 100 + (index * 60), 
                            rotateX: 30, // Tilt towards viewer
                            z: index * 50 
                        }}
                        style={{ rotateX: cardRotateX, rotateY: cardRotateY }}
                        className={`absolute w-64 h-40 rounded-xl bg-gradient-to-br ${proj.color} p-4 border border-white/20 shadow-2xl backdrop-blur-xl flex flex-col justify-between pointer-events-auto cursor-pointer hover:brightness-110`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-full bg-white/20" />
                            <ExternalLink size={16} className="text-white/80" />
                        </div>
                        <div className="text-white font-bold text-lg">{proj.title}</div>
                    </motion.div>
                ))}
            </div>
         )}
      </div>
    </div>
  );
};

export default OrbitHolo;

