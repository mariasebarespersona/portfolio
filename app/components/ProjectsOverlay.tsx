"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProjectsOverlayProps {
  onClose: () => void;
}

const ProjectsOverlay: React.FC<ProjectsOverlayProps> = ({ onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const projects = [
    {
      title: "Project One",
      tags: ["React", "Next.js", "Tailwind"],
      description: "A brief description of your first amazing project. What problem did it solve? What tech did you use?",
      image: "/window.svg", // Placeholder
      link: "#"
    },
    {
      title: "Project Two",
      tags: ["TypeScript", "Node.js", "AI"],
      description: "Another cool project. Maybe something with AI or backend work. Highlight your key contributions here.",
      image: "/globe.svg", // Placeholder
      link: "#"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-10 overflow-y-auto"
      onClick={onClose} // Close when clicking outside
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl bg-neutral-900/50 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl min-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm text-neutral-400 hover:text-white"
        >
          <span>esc</span>
        </button>

        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            I <span className="text-red-500">❤️</span> to Build
          </h2>
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-neutral-400 text-lg leading-relaxed">
              I'm a Product guy. I see software engineering as a means to an end: to ship useful, impactful, or just plain fun stuff to the World. Feel free to explore some of my projects.
            </p>
          </div>
        </div>

        {/* Active Projects Section */}
        <div className="mb-8 flex items-center gap-3">
           <h3 className="text-2xl font-bold text-white">Active Projects</h3>
           <span className="text-2xl">🛠️</span>
        </div>
        
        <p className="text-neutral-500 mb-8">
            These are the active projects that I've built (alone or with others) that I am most proud of. Hope you like them!
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
                key={index} 
                className="group rounded-2xl bg-neutral-950 border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-neutral-900 relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent z-10" />
                 {/* Use a generic placeholder if no image */}
                 <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={100} 
                    height={100}
                    className="opacity-50 group-hover:scale-105 transition-transform duration-500"
                 />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-neutral-300 border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <a 
                        href={project.link}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                        Visit <ExternalLink size={14} />
                    </a>
                </div>
                
                <p className="text-neutral-400 text-sm leading-relaxed">
                    {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ProjectsOverlay;

