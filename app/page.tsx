"use client";

import { useState } from "react";
import Orbit from "./components/Orbit";
import OrbitZoom from "./components/OrbitZoom";
import OrbitPhysics from "./components/OrbitPhysics";
import OrbitHolo from "./components/OrbitHolo";
import PanoramicView from "./components/PanoramicView";
import BentoGrid from "./components/BentoGrid";

export default function Home() {
  const [mode, setMode] = useState<"original" | "zoom" | "physics" | "holo" | "panoramic" | "bento">("bento");

  return (
    <main className="relative">
      {mode === "original" && <Orbit />}
      {mode === "zoom" && <OrbitZoom />}
      {mode === "physics" && <OrbitPhysics />}
      {mode === "holo" && <OrbitHolo />}
      {mode === "panoramic" && <PanoramicView />}
      {mode === "bento" && <BentoGrid />}

      {/* Mode Switcher */}
      <div className="fixed bottom-6 right-6 z-[100] bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex gap-2 flex-wrap max-w-[90vw]">
        <button 
            onClick={() => setMode("original")} 
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === "original" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
        >
            Original
        </button>
        <button 
            onClick={() => setMode("zoom")} 
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === "zoom" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
        >
            Zoom
        </button>
        <button 
            onClick={() => setMode("physics")} 
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === "physics" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
        >
            Physics
        </button>
        <button 
            onClick={() => setMode("holo")} 
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === "holo" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
        >
            Holo
        </button>
        <button 
            onClick={() => setMode("panoramic")} 
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === "panoramic" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
        >
            Panoramic
        </button>
        <button 
            onClick={() => setMode("bento")} 
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === "bento" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
        >
            Bento Grid (SV Style)
        </button>
      </div>
    </main>
  );
}
