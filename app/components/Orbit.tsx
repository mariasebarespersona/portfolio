"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import ProjectsOverlay from "./ProjectsOverlay";

const Orbit = () => {
  // State for Projects Overlay
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  // Mouse tracking for head turn effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ref for the video element to control playback
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);

      // VIDEO SCRUBBING LOGIC
      if (videoRef.current && videoRef.current.duration) {
        const video = videoRef.current;
        video.pause(); // Force pause to ensure we are in control
        
        // Calculate percentage of screen width (0.0 to 1.0)
        const percentage = e.clientX / innerWidth;
        const clampedPercentage = Math.max(0, Math.min(1, percentage));
        
        // INVERTED LOGIC: 
        // If the head movement is opposite, we reverse the percentage.
        // (1 - percentage) flips the timeline: Left mouse = End of video, Right mouse = Start of video
        const invertedPercentage = 1 - clampedPercentage;

        // Set current time based on inverted mouse position
        if (isFinite(video.duration)) {
           video.currentTime = invertedPercentage * video.duration;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Create smooth spring physics for the rotation and movement
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 200, damping: 20 });
  
  // Add translation to physically move the head towards the mouse (MAGNET EFFECT)
  // Increased range significantly to 50px
  const moveX = useSpring(useTransform(mouseX, [-1, 1], [-50, 50]), { stiffness: 200, damping: 20 });
  const moveY = useSpring(useTransform(mouseY, [-1, 1], [-50, 50]), { stiffness: 200, damping: 20 });

  // Head/Neck bend effect (tilting the VIDEO itself, not just the container)
  const headRotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 300, damping: 20 });
  const headRotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 300, damping: 20 });
  
  // Parallax/Leaning effect for the inner video
  const innerMoveX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 300, damping: 20 });
  const innerMoveY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), { stiffness: 300, damping: 20 });


  // Configuration for the orbiting items
  const items = [
    {
      icon: <span className="text-4xl">🤔</span>,
      label: "Interests",
      bg: "bg-white/5",
      border: "border-white/10",
      glow: "shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]", // Purple glow
      delay: 0,
      x: -150,
      y: -100,
      onClick: () => {}, // No action yet
    },
    {
      icon: <span className="text-4xl">🛠️</span>,
      label: "Projects",
      bg: "bg-white/5",
      border: "border-white/10",
      glow: "shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]", // Blue glow
      delay: 1,
      x: 0,
      y: -180,
      onClick: () => setIsProjectsOpen(true), // Open Projects Overlay
    },
    {
      icon: <span className="text-4xl">📖</span>,
      label: "About me",
      bg: "bg-white/5",
      border: "border-white/10",
      glow: "shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)]", // Green glow
      delay: 2,
      x: 150,
      y: -100,
      onClick: () => {}, 
    },
    {
      icon: <Github className="w-8 h-8 text-white" />,
      label: "Github",
      bg: "bg-white/5",
      border: "border-white/10",
      glow: "shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]", // White glow
      delay: 3,
      x: -150,
      y: 100,
      onClick: () => {},
    },
    {
      icon: <Twitter className="w-8 h-8 text-white" />,
      label: "Twitter",
      bg: "bg-white/5",
      border: "border-white/10",
      glow: "shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]", // White glow
      delay: 4,
      x: 150,
      y: 100,
      onClick: () => {},
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-950 overflow-hidden perspective-1000">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black" />

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Central Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white text-3xl mb-40 font-bold tracking-tight relative z-50"
        >
          Hi, this is MarIA
        </motion.h1>

        {/* Central Avatar Area with 3D Tilt and Movement */}
        <motion.div
          style={{ 
            rotateX, 
            rotateY,
            x: moveX,
            y: moveY,
            transformStyle: "preserve-3d"
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48 flex items-center justify-center"
        >
            {/* 
                Avatar Container 
            */}
             <motion.div 
               className="w-40 h-40 rounded-full bg-black flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/10 relative z-10"
               style={{
                 transform: "translateZ(20px)",
                 rotateX: headRotateX, // Apply rotation directly to the container for "neck" feel
                 rotateY: headRotateY
               }}
             >
               <motion.video 
                 ref={videoRef}
                 src="/avatar.mov" 
                 muted 
                 playsInline
                 preload="auto" // Ensure video is loaded for seeking
                 // Removed autoPlay and loop so we can control it manually with the mouse
                 className="w-full h-full object-cover transform scale-[1.2] translate-y-4"
                 style={{
                    x: innerMoveX,
                    y: innerMoveY,
                    scale: 1.2 
                 }}
                 onLoadedMetadata={(e) => {
                    e.currentTarget.pause(); // Ensure it starts paused
                 }} 
               />
             </motion.div>
             
             {/* Orbiting Icons */}
             {items.map((item, index) => (
               <motion.div
                 key={index}
                 onClick={item.onClick} // Add click handler
                 className={`absolute flex items-center justify-center w-20 h-20 rounded-2xl backdrop-blur-md border ${item.bg} ${item.border} ${item.glow} group cursor-pointer`} // Added cursor-pointer explicitly
                 initial={{ x: 0, y: 0, opacity: 0 }}
                 animate={{ 
                    x: item.x, 
                    y: item.y, 
                    opacity: 1,
                 }}
                 transition={{
                    delay: 0.2, 
                    duration: 0.5,
                    ease: "easeOut"
                 }}
                 style={{ 
                    translateZ: 50 // Pushes items forward in 3D space
                 }}
                 whileHover={{ scale: 1.1, cursor: "pointer" }}
               >
                 {/* Tooltip */}
                 <div className="absolute -bottom-10 px-3 py-1 rounded-lg bg-neutral-900/90 border border-white/10 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {item.label}
                 </div>

                 {/* Inner floating animation */}
                 <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                    }}
                 >
                    {item.icon}
                 </motion.div>
               </motion.div>
             ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 text-neutral-500 text-sm z-50"
      >
          Made with ❤️ in Madrid
      </motion.p>

      {/* Projects Overlay */}
      <AnimatePresence>
        {isProjectsOpen && (
          <ProjectsOverlay onClose={() => setIsProjectsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orbit;
