'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LandingModeSelectorProps {
  onSelectMode: (mode: 'GAME' | 'STANDARD') => void;
}

interface DecItem {
  id: number;
  src: string;
  alt: string;
  style: React.CSSProperties;
  initialRotate: number;
  floatY: number;
  duration: number;
}

const DECORATION_ASSETS = [
  { src: '/decorations/pencil_red.png', alt: 'Red Pencil', defaultWidth: 80 },
  { src: '/decorations/pencil_blue.png', alt: 'Blue Pencil', defaultWidth: 75 },
  { src: '/decorations/pencil_green.png', alt: 'Green Pencil', defaultWidth: 70 },
  { src: '/decorations/star.png', alt: 'Star', defaultWidth: 32 },
  { src: '/decorations/heart.png', alt: 'Heart', defaultWidth: 28 },
  { src: '/decorations/big_heart.png', alt: 'Big Heart', defaultWidth: 42 },
];

export default function LandingModeSelector({ onSelectMode }: LandingModeSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [blink, setBlink] = useState<boolean>(true);
  const [decorations, setDecorations] = useState<DecItem[]>([]);

  // Blinking effect for selection cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  // Generate Abundant & Densely Randomized Decoration Positions on Refresh
  useEffect(() => {
    const generated: DecItem[] = [];
    let idCounter = 1;

    // Define multi-layered outer & inner gap zones across the full screen
    const zones = [
      // Top Area (6 items)
      ...Array.from({ length: 6 }).map(() => ({
        top: `${Math.floor(Math.random() * 18) + 2}%`,
        left: `${Math.floor(Math.random() * 88) + 4}%`,
      })),
      // Left Outer Margin (7 items)
      ...Array.from({ length: 7 }).map(() => ({
        top: `${Math.floor(Math.random() * 75) + 12}%`,
        left: `${Math.floor(Math.random() * 14) + 1}%`,
      })),
      // Right Outer Margin (7 items)
      ...Array.from({ length: 7 }).map(() => ({
        top: `${Math.floor(Math.random() * 75) + 12}%`,
        right: `${Math.floor(Math.random() * 14) + 1}%`,
      })),
      // Inner Mid-Left Gaps (4 items)
      ...Array.from({ length: 4 }).map(() => ({
        top: `${Math.floor(Math.random() * 45) + 25}%`,
        left: `${Math.floor(Math.random() * 16) + 14}%`,
      })),
      // Inner Mid-Right Gaps (4 items)
      ...Array.from({ length: 4 }).map(() => ({
        top: `${Math.floor(Math.random() * 45) + 25}%`,
        right: `${Math.floor(Math.random() * 16) + 14}%`,
      })),
      // Bottom Area (6 items)
      ...Array.from({ length: 6 }).map(() => ({
        bottom: `${Math.floor(Math.random() * 16) + 3}%`,
        left: `${Math.floor(Math.random() * 88) + 4}%`,
      })),
    ];

    zones.forEach((pos) => {
      const asset = DECORATION_ASSETS[Math.floor(Math.random() * DECORATION_ASSETS.length)];
      const rotate = Math.floor(Math.random() * 140) - 70;
      const sizeScale = 0.75 + Math.random() * 0.5;
      const width = Math.round(asset.defaultWidth * sizeScale);
      
      generated.push({
        id: idCounter++,
        src: asset.src,
        alt: asset.alt,
        style: {
          position: 'absolute',
          ...pos,
          width: `${width}px`,
          height: 'auto',
          zIndex: 10,
        },
        initialRotate: rotate,
        floatY: Math.floor(Math.random() * 8) + 4,
        duration: 2.8 + Math.random() * 3.2,
      });
    });

    setDecorations(generated);
  }, []);

  // Keyboard & Mouse Wheel Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === '1') {
        setSelectedIndex(0);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === '2') {
        setSelectedIndex(1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        onSelectMode(selectedIndex === 0 ? 'GAME' : 'STANDARD');
      }
    };

    // Mouse Wheel Navigation
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setSelectedIndex(1);
      } else if (e.deltaY < 0) {
        setSelectedIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [selectedIndex, onSelectMode]);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] text-slate-900 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none font-['Gaegu',var(--font-gaegu),'Single_Day','Galmuri11',cursive]">
      
      {/* Import Cute Sketchbook Doodle Fonts (Gaegu, Single Day) */}
      <style jsx global>{`
        .sketch-font {
          font-family: 'Gaegu', var(--font-gaegu), 'Single Day', cursive, sans-serif;
        }
        .galmuri-font {
          font-family: 'Galmuri11', monospace;
        }
      `}</style>

      {/* ================= DOODLE NOTEBOOK / GRAPH PAPER BACKGROUND ================= */}
      {/* Grid Pattern (Notebook Graph Lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.8rem_1.8rem] opacity-75 pointer-events-none" />

      {/* Notebook Margin Line (Red Line on Left) */}
      <div className="absolute top-0 bottom-0 left-8 sm:left-16 w-[2px] bg-red-300/70 pointer-events-none hidden sm:block" />

      {/* ================= ABUNDANTLY DENSE DYNAMICALLY RANDOMIZED DECORATIONS ================= */}
      {decorations.map((item) => (
        <motion.img
          key={item.id}
          src={item.src}
          alt={item.alt}
          style={item.style}
          draggable={false}
          animate={{
            y: [0, -item.floatY, 0],
            rotate: [item.initialRotate - 6, item.initialRotate + 6, item.initialRotate - 6],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="drop-shadow-xs pointer-events-none"
        />
      ))}

      {/* ================= CENTER SKETCHBOOK TITLE & OPTIONS ================= */}
      <main className="w-full max-w-5xl mx-auto my-auto py-2 z-20 flex flex-col items-center text-center sketch-font">
        
        {/* Main Title: JIN JUNE YOUNG PORTFOLIO */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 sm:mb-12 relative flex flex-col items-center w-full px-2"
        >
          {/* Main Title Container */}
          <div className="relative my-2 py-4 px-6 sm:px-10 max-w-full flex items-center justify-center">
            {/* Main Black Text */}
            <h1 className="text-slate-900 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold sketch-font tracking-wider whitespace-nowrap drop-shadow-[2px_2px_0px_rgba(203,213,225,0.8)] py-1">
              JIN JUNE YOUNG PORTFOLIO
            </h1>

            {/* Heart on Top Left */}
            <motion.img
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              src="/decorations/big_heart.png"
              alt="Heart"
              draggable={false}
              className="absolute -top-3 left-1 sm:left-4 w-6 sm:w-9 h-auto z-10"
            />

            {/* Star on Bottom Right */}
            <motion.img
              animate={{ rotate: [0, 180, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              src="/decorations/star.png"
              alt="Star"
              draggable={false}
              className="absolute -bottom-3 right-1 sm:right-4 w-6 sm:w-8 h-auto z-10"
            />
          </div>

          {/* ================= CLEAN SOFT SKETCHBOOK SUBTITLE BADGE ================= */}
          <div className="mt-2">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 py-2 rounded-2xl bg-white/90 border-2 border-slate-300 text-slate-800 font-extrabold text-lg sm:text-2xl shadow-[3px_3px_0px_#cbd5e1] rotate-[-1deg]"
            >
              <span className="tracking-wider text-slate-900 font-extrabold px-2">GAME CLIENT DEVELOPER</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ================= AUTHENTIC SKETCHBOOK TAPED MEMO CARDS ================= */}
        <div className="w-full max-w-2xl flex flex-col gap-6 my-4 px-4 relative">

          {/* OPTION 1: 게임으로 포트폴리오 보기 */}
          <motion.div
            whileHover={{ scale: 1.015, rotate: -0.5 }}
            whileTap={{ scale: 0.99 }}
            onMouseEnter={() => setSelectedIndex(0)}
            onClick={() => onSelectMode('GAME')}
            className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 relative cursor-pointer ${
              selectedIndex === 0
                ? 'bg-amber-100/90 border-slate-900 shadow-[6px_6px_0px_#3b82f6] rotate-[-1deg]'
                : 'bg-white/80 border-slate-800 shadow-[3px_3px_0px_#cbd5e1] opacity-90 hover:opacity-100 rotate-[0.5deg]'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                {/* Arrow Selector Indicator */}
                <span className={`text-3xl transition-transform duration-150 ${
                  selectedIndex === 0 && blink ? 'opacity-100 text-blue-600 scale-125' : selectedIndex === 0 ? 'opacity-40 text-blue-600' : 'opacity-0'
                }`}>
                  ▶
                </span>

                <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                  selectedIndex === 0 ? 'text-slate-900 font-extrabold underline decoration-blue-500 decoration-wavy decoration-2' : 'text-slate-800'
                }`}>
                  1. 게임으로 포트폴리오 보기
                </span>
              </div>

              {/* Action Keycap Badge */}
              <span className={`hidden sm:inline-block text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-all ${
                selectedIndex === 0 ? 'bg-blue-600 text-white border-slate-900 shadow-xs' : 'bg-slate-100 text-slate-600 border-slate-400'
              }`}>
                [START / 1]
              </span>
            </div>
          </motion.div>

          {/* OPTION 2: 포트폴리오 바로 감상하기 */}
          <motion.div
            whileHover={{ scale: 1.015, rotate: 0.5 }}
            whileTap={{ scale: 0.99 }}
            onMouseEnter={() => setSelectedIndex(1)}
            onClick={() => onSelectMode('STANDARD')}
            className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 relative cursor-pointer ${
              selectedIndex === 1
                ? 'bg-emerald-100/90 border-slate-900 shadow-[6px_6px_0px_#10b981] rotate-[1deg]'
                : 'bg-white/80 border-slate-800 shadow-[3px_3px_0px_#cbd5e1] opacity-90 hover:opacity-100 rotate-[-0.5deg]'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                {/* Arrow Selector Indicator */}
                <span className={`text-3xl transition-transform duration-150 ${
                  selectedIndex === 1 && blink ? 'opacity-100 text-emerald-600 scale-125' : selectedIndex === 1 ? 'opacity-40 text-emerald-600' : 'opacity-0'
                }`}>
                  ▶
                </span>

                <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                  selectedIndex === 1 ? 'text-slate-900 font-extrabold underline decoration-emerald-500 decoration-wavy decoration-2' : 'text-slate-800'
                }`}>
                  2. 포트폴리오 바로 감상하기
                </span>
              </div>

              {/* Action Keycap Badge */}
              <span className={`hidden sm:inline-block text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-all ${
                selectedIndex === 1 ? 'bg-emerald-600 text-white border-slate-900 shadow-xs' : 'bg-slate-100 text-slate-600 border-slate-400'
              }`}>
                [START / 2]
              </span>
            </div>
          </motion.div>

        </div>

      </main>

      {/* Bottom Footer */}
      <footer className="w-full text-center text-xs text-slate-400 py-2 z-20 sketch-font flex items-center justify-center gap-2">
        <img src="/decorations/star.png" alt="Star" draggable={false} className="w-3.5 h-auto opacity-70" />
        <span>© 2026 JIN JUNE YOUNG PORTFOLIO</span>
        <img src="/decorations/star.png" alt="Star" draggable={false} className="w-3.5 h-auto opacity-70" />
      </footer>

    </div>
  );
}
