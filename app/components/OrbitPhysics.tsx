"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Twitter } from "lucide-react";

const OrbitPhysics = () => {
  const constraintsRef = useRef(null);
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

  // Reuse head tracking
  const headRotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 300, damping: 20 });
  const headRotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 300, damping: 20 });
  const innerMoveX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 300, damping: 20 });
  const innerMoveY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), { stiffness: 300, damping: 20 });


  const items = [
    { id: "interests", icon: <span className="text-4xl">🤔</span>, label: "Interests", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { id: "projects", icon: <span className="text-4xl">🛠️</span>, label: "Projects", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { id: "about", icon: <span className="text-4xl">📖</span>, label: "About me", bg: "bg-green-500/10", border: "border-green-500/20" },
    { id: "github", icon: <Github className="w-8 h-8 text-white" />, label: "Github", bg: "bg-white/10", border: "border-white/20" },
    { id: "twitter", icon: <Twitter className="w-8 h-8 text-white" />, label: "Twitter", bg: "bg-white/10", border: "border-white/20" },
  ];

  return (
    <div className="relative w-full h-screen bg-neutral-950 overflow-hidden" ref={constraintsRef}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black pointer-events-none" />

        <div className="absolute top-20 w-full text-center z-0 pointer-events-none">
            <h1 className="text-white text-3xl font-bold">Gravity Playground</h1>
            <p className="text-neutral-500">Drag the icons! They float freely.</p>
        </div>

      {/* Central Avatar - Static anchor in the chaos */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
      </div>

      {/* Physics Icons */}
      {items.map((item, i) => (
        <motion.div
            key={item.id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.2, cursor: "grabbing" }}
            initial={{ 
                x: (Math.random() * window.innerWidth - window.innerWidth/2) * 0.5, 
                y: (Math.random() * window.innerHeight - window.innerHeight/2) * 0.5 
            }}
            animate={{
                y: [0, -20, 0], // Float animation
                rotate: [0, 5, -5, 0]
            }}
            transition={{
                y: { repeat: Infinity, duration: 3 + Math.random(), ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 5 + Math.random(), ease: "easeInOut" }
            }}
            className={`absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 flex flex-col items-center justify-center rounded-full backdrop-blur-md border ${item.bg} ${item.border} shadow-lg cursor-grab z-20`}
        >
            {item.icon}
            <span className="text-[10px] text-white/50 mt-1 uppercase tracking-widest">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default OrbitPhysics;

