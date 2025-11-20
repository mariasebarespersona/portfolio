"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Github, Twitter, X } from "lucide-react";

// Reusing the head tracking logic and basic structure
const OrbitZoom = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Mouse tracking for head turn effect
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

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 200, damping: 20 });
  const moveX = useSpring(useTransform(mouseX, [-1, 1], [-50, 50]), { stiffness: 200, damping: 20 });
  const moveY = useSpring(useTransform(mouseY, [-1, 1], [-50, 50]), { stiffness: 200, damping: 20 });
  const headRotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 300, damping: 20 });
  const headRotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 300, damping: 20 });
  const innerMoveX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 300, damping: 20 });
  const innerMoveY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), { stiffness: 300, damping: 20 });

  const items = [
    { id: "interests", icon: <span className="text-4xl">🤔</span>, label: "Interests", bg: "bg-purple-500/20", color: "bg-purple-900", x: -150, y: -100 },
    { id: "projects", icon: <span className="text-4xl">🛠️</span>, label: "Projects", bg: "bg-blue-500/20", color: "bg-blue-900", x: 0, y: -180 },
    { id: "about", icon: <span className="text-4xl">📖</span>, label: "About me", bg: "bg-green-500/20", color: "bg-green-900", x: 150, y: -100 },
    { id: "github", icon: <Github className="w-8 h-8 text-white" />, label: "Github", bg: "bg-white/10", color: "bg-neutral-800", x: -150, y: 100 },
    { id: "twitter", icon: <Twitter className="w-8 h-8 text-white" />, label: "Twitter", bg: "bg-white/10", color: "bg-neutral-800", x: 150, y: 100 },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-950 overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black" />

      {/* Central Avatar - Always visible but fades out when zoomed */}
      <motion.div 
        className="relative z-10 flex flex-col items-center pointer-events-none"
        animate={{ opacity: selectedId ? 0 : 1, scale: selectedId ? 0.8 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 className="text-white text-3xl mb-40 font-bold tracking-tight relative z-50">
          Zoom Portal Concept
        </motion.h1>

        <motion.div
          style={{ rotateX, rotateY, x: moveX, y: moveY, transformStyle: "preserve-3d" }}
          className="relative w-48 h-48 flex items-center justify-center pointer-events-auto"
        >
             <motion.div 
               className="w-40 h-40 rounded-full bg-black flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/10 relative z-10"
               style={{ transform: "translateZ(20px)", rotateX: headRotateX, rotateY: headRotateY }}
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
             
             {/* Orbiting Icons */}
             {items.map((item) => (
               <motion.div
                 key={item.id}
                 layoutId={`card-${item.id}`}
                 onClick={() => setSelectedId(item.id)}
                 className={`absolute flex items-center justify-center w-20 h-20 rounded-2xl backdrop-blur-md border border-white/10 ${item.bg} cursor-pointer z-20`}
                 initial={{ x: item.x, y: item.y }}
                 animate={{ x: item.x, y: item.y }}
                 whileHover={{ scale: 1.1 }}
               >
                 <motion.div layoutId={`icon-${item.id}`}>{item.icon}</motion.div>
               </motion.div>
             ))}
        </motion.div>
      </motion.div>

      {/* Full Screen Zoom Overlay */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            layoutId={`card-${selectedId}`}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${items.find(i => i.id === selectedId)?.color}`}
            onClick={() => setSelectedId(null)}
          >
            <motion.button 
                className="absolute top-10 right-10 p-2 bg-white/20 rounded-full text-white"
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
            >
                <X />
            </motion.button>
            
            <motion.div layoutId={`icon-${selectedId}`} className="scale-150 mb-8">
                {items.find(i => i.id === selectedId)?.icon}
            </motion.div>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
                className="text-6xl font-bold text-white mb-4"
            >
                {items.find(i => i.id === selectedId)?.label}
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="text-white/60 max-w-md text-center"
            >
                This is the "Zoom Portal" effect. The icon itself expands to become the entire world.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrbitZoom;

