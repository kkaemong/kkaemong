'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  penColor?: string;
}

const DECORATION_ASSETS = [
  { src: '/decorations/pencil_red.png', alt: 'Red Pencil', defaultWidth: 80, penColor: '#EF4444' },
  { src: '/decorations/pencil_blue.png', alt: 'Blue Pencil', defaultWidth: 75, penColor: '#3B82F6' },
  { src: '/decorations/pencil_green.png', alt: 'Green Pencil', defaultWidth: 70, penColor: '#16A34A' },
  { src: '/decorations/star.png', alt: 'Star', defaultWidth: 32 },
  { src: '/decorations/heart.png', alt: 'Heart', defaultWidth: 28 },
  { src: '/decorations/big_heart.png', alt: 'Big Heart', defaultWidth: 42 },
];

export default function LandingModeSelector({ onSelectMode }: LandingModeSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [blink, setBlink] = useState<boolean>(true);
  const [decorations, setDecorations] = useState<DecItem[]>([]);
  const [penColor, setPenColor] = useState<string>('#EF4444');
  const [activePencilId, setActivePencilId] = useState<number | null>(null);
  const [heldPencilSrc, setHeldPencilSrc] = useState<string | null>(null);
  const [isErasing, setIsErasing] = useState(false);
  const INTRO_SEEN_KEY = 'kkaemong_pencil_intro_seen';
  const ERASER_HINT_SEEN_KEY = 'kkaemong_eraser_hint_seen';
  const [showIntro, setShowIntro] = useState(false);
  const [showEraserHint, setShowEraserHint] = useState(false);
  const toolHeld = Boolean(heldPencilSrc) || isErasing;

  const dismissIntro = () => {
    setShowIntro(false);
    try { localStorage.setItem(INTRO_SEEN_KEY, '1'); } catch {}
  };

  const dismissEraserHint = () => {
    setShowEraserHint(false);
    try { localStorage.setItem(ERASER_HINT_SEEN_KEY, '1'); } catch {}
  };

  // First-visit intro only: a brief dark spotlight explaining the drawing feature exists,
  // since nothing about the page otherwise hints that the decorations are interactive.
  // Remembered in localStorage so it doesn't come back on every refresh.
  useEffect(() => {
    let alreadySeen = false;
    try { alreadySeen = localStorage.getItem(INTRO_SEEN_KEY) === '1'; } catch {}
    if (alreadySeen) return;

    setShowIntro(true);
    const timer = setTimeout(() => dismissIntro(), 3800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nudge toward the eraser corner button the first time ever a pencil is picked up, then
  // fade — remembered in localStorage (like the intro) so it doesn't nag on every pickup,
  // only the one time the user genuinely doesn't know the eraser exists yet.
  useEffect(() => {
    if (!heldPencilSrc) return;
    let alreadySeen = false;
    try { alreadySeen = localStorage.getItem(ERASER_HINT_SEEN_KEY) === '1'; } catch {}
    if (alreadySeen) return;

    setShowEraserHint(true);
    const timer = setTimeout(() => dismissEraserHint(), 4000);
    return () => clearTimeout(timer);
  }, [heldPencilSrc]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorPencilRef = useRef<HTMLImageElement | null>(null);
  const eraserCursorRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const ERASER_SIZE = 32;

  // Where the pencil's drawn tip sits inside its own artwork (% of the image's own box),
  // measured from the pencil_blue.png asset. Used as the CSS transform-origin so rotating
  // the cursor pivots around the tip instead of the image center — the tip then stays
  // exactly under the pointer regardless of rotation.
  const TIP_ORIGIN = '94% 4%';
  // Rotating 180° from the artwork's own orientation flips which end anchors at the
  // cursor (tip instead of eraser) while keeping the same natural diagonal the art was
  // drawn at, so it still reads as a pencil actually being gripped rather than floating.
  const HELD_PENCIL_ANGLE_DEG = 180;

  // Moves the held-pencil cursor image to follow the pointer. Driven by a window-level
  // listener so it keeps following even when a decoration (e.g. another pencil) is the
  // direct event target instead of the canvas.
  const moveCursorPencil = (x: number, y: number) => {
    const img = cursorPencilRef.current;
    if (!img) return;
    img.style.opacity = '1';
    img.style.transform = `translate(${x}px, ${y}px) translate(-94%, -4%) rotate(${HELD_PENCIL_ANGLE_DEG}deg)`;
  };

  const moveCursorEraser = (x: number, y: number) => {
    const el = eraserCursorRef.current;
    if (!el) return;
    el.style.opacity = '1';
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  // Draw + cursor tracking are both window-level (not bound to the canvas element)
  // so that dragging works even when it starts or passes over another element with
  // its own pointer-events (mode cards, pencil decorations) sitting above the canvas.
  useEffect(() => {
    if (!heldPencilSrc && !isErasing) return;
    const moveCursor = isErasing ? moveCursorEraser : moveCursorPencil;

    const handleDown = (e: PointerEvent) => {
      isDrawingRef.current = true;
      lastPointRef.current = null;
      drawAt(e.clientX, e.clientY, isErasing);
      moveCursor(e.clientX, e.clientY);
    };
    const handleMove = (e: PointerEvent) => {
      if (isDrawingRef.current) drawAt(e.clientX, e.clientY, isErasing);
      moveCursor(e.clientX, e.clientY);
    };
    const handleUp = () => {
      isDrawingRef.current = false;
      lastPointRef.current = null;
    };

    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heldPencilSrc, isErasing]);

  // Size the doodle canvas to the viewport and keep it crisp on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const prev = document.createElement('canvas');
      prev.width = canvas.width;
      prev.height = canvas.height;
      prev.getContext('2d')?.drawImage(canvas, 0, 0);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        if (prev.width > 0) ctx.drawImage(prev, 0, 0, prev.width / dpr, prev.height / dpr);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const drawAt = (x: number, y: number, erase: boolean) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const last = lastPointRef.current;
    ctx.globalCompositeOperation = erase ? 'destination-out' : 'source-over';
    ctx.strokeStyle = penColor;
    ctx.lineWidth = erase ? ERASER_SIZE : 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    if (last) {
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
    } else {
      ctx.moveTo(x, y);
      ctx.lineTo(x + 0.1, y + 0.1);
    }
    ctx.stroke();
    lastPointRef.current = { x, y };
  };

  const clearDoodles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const togglePencil = (id: number, src: string, color: string) => {
    // Toggle by color, not by the specific decoration instance clicked — picking up any
    // pencil of the color you're already holding puts it back down.
    if (heldPencilSrc && penColor === color) {
      setActivePencilId(null);
      setHeldPencilSrc(null);
    } else {
      setPenColor(color);
      setActivePencilId(id);
      setHeldPencilSrc(src);
      setIsErasing(false);
    }
  };

  // The pinned pencil doubles as the first-visit intro target: dismiss the intro (if still
  // showing) and pick the pencil up, in one click.
  const handleAnchorPencilClick = () => {
    if (showIntro) dismissIntro();
    togglePencil(-1, '/decorations/pencil_red.png', '#EF4444');
  };

  const toggleEraser = () => {
    dismissEraserHint();
    setIsErasing((prev) => {
      const next = !prev;
      if (next) {
        setActivePencilId(null);
        setHeldPencilSrc(null);
      }
      return next;
    });
  };

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
        penColor: asset.penColor,
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

      {/* ================= FIRST-VISIT INTRO SPOTLIGHT ================= */}
      {/* Dims the page and zoom-pulses one dedicated pencil at a fixed, always-legible
          spot (not one of the randomly-scattered decorations, which could land anywhere).
          Clicking that pencil dismisses + picks it up; clicking elsewhere just dismisses.
          Shown once only — remembered in localStorage. */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={dismissIntro}
            className="fixed inset-0 z-[100] bg-black/75 cursor-pointer"
          >
            <p className="sketch-font absolute top-44 sm:top-48 left-8 sm:left-16 text-white text-xl sm:text-2xl font-bold leading-snug max-w-[240px]">
              커지는 연필을 클릭해서 들어보세요!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= PINNED PENCIL (ALWAYS FIXED, TOP-LEFT) ================= */}
      {/* Guaranteed-findable pencil, independent of the randomly-scattered decorations below
          (which could land anywhere or none nearby). Pulses big during the first-visit intro
          to draw the eye, then settles into a gentle idle bob. Always clickable to pick up. */}
      <motion.img
        src="/decorations/pencil_red.png"
        alt="연필 - 클릭해서 이 색으로 들거나 내려놓기"
        draggable={false}
        animate={{
          scale: showIntro ? [1, 1.5, 1] : activePencilId === -1 ? 1.15 : [1, 1.08, 1],
        }}
        transition={{ duration: showIntro ? 1.3 : 2.6, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.3 }}
        onClick={handleAnchorPencilClick}
        className={`fixed top-24 sm:top-28 left-8 sm:left-16 w-16 z-[110] pointer-events-auto cursor-pointer transition-[filter] ${
          showIntro
            ? 'drop-shadow-[0_0_16px_rgba(255,255,255,0.9)]'
            : activePencilId === -1
            ? 'drop-shadow-[0_0_6px_rgba(59,130,246,0.7)]'
            : 'drop-shadow-xs'
        }`}
      />

      {/* ================= DOODLE NOTEBOOK / GRAPH PAPER BACKGROUND ================= */}
      {/* Grid Pattern (Notebook Graph Lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.8rem_1.8rem] opacity-75 pointer-events-none" />

      {/* Notebook Margin Line (Red Line on Left) */}
      <div className="absolute top-0 bottom-0 left-8 sm:left-16 w-[2px] bg-red-300/70 pointer-events-none hidden sm:block" />

      {/* ================= DOODLE DRAWING SURFACE ================= */}
      {/* Purely a paint target — pointer handling lives in the window-level effect above so
          drawing still works when a drag starts or passes over the mode cards / decorations. */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-[5] touch-none ${heldPencilSrc || isErasing ? 'cursor-none' : ''}`}
      />

      {/* Held-pencil custom cursor: its tip (not the image center) is pinned under the pointer */}
      {heldPencilSrc && (
        <img
          ref={cursorPencilRef}
          src={heldPencilSrc}
          alt=""
          draggable={false}
          className="fixed top-0 left-0 w-12 h-auto z-[60] pointer-events-none opacity-0 drop-shadow-md"
          style={{ willChange: 'transform', transformOrigin: TIP_ORIGIN }}
        />
      )}

      {/* Eraser cursor: a little gray eraser block (standing upright), sized to the brush */}
      {isErasing && (
        <div
          ref={eraserCursorRef}
          className="fixed top-0 left-0 z-[60] pointer-events-none opacity-0 rounded-md border border-slate-400 shadow-sm overflow-hidden flex flex-col"
          style={{ width: ERASER_SIZE * 0.85, height: ERASER_SIZE * 1.3, willChange: 'transform' }}
        >
          <div className="w-full h-2/3 bg-slate-300" />
          <div className="w-full h-1/3 bg-slate-100" />
        </div>
      )}

      {/* ================= ABUNDANTLY DENSE DYNAMICALLY RANDOMIZED DECORATIONS ================= */}
      {decorations.map((item) => {
        const handlePencilClick = item.penColor
          ? () => togglePencil(item.id, item.src, item.penColor!)
          : undefined;

        return (
          <motion.img
            key={item.id}
            src={item.src}
            alt={item.penColor ? `${item.alt} - 클릭해서 이 색으로 들거나 내려놓기` : item.alt}
            style={item.style}
            draggable={false}
            animate={{
              y: [0, -item.floatY, 0],
              rotate: [item.initialRotate - 6, item.initialRotate + 6, item.initialRotate - 6],
              scale: activePencilId === item.id ? 1.15 : 1,
            }}
            whileHover={item.penColor ? { scale: 1.3 } : undefined}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            onClick={handlePencilClick}
            className={`drop-shadow-xs ${
              item.penColor
                ? `pointer-events-auto cursor-pointer ${activePencilId === item.id ? 'drop-shadow-[0_0_6px_rgba(59,130,246,0.7)]' : ''}`
                : 'pointer-events-none'
            }`}
          />
        );
      })}

      {/* Eraser discovery moment: same treatment as the pencil intro — dim everything,
          zoom-pulse the real eraser button in place (no ring, no dark box around it).
          No emoji stand-in for the eraser; the arrow points straight at the real pulsing
          button below so there's no ambiguity about what "here" refers to. */}
      <AnimatePresence>
        {showEraserHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={dismissEraserHint}
            className="fixed inset-0 z-[35] bg-black/70 cursor-pointer"
          >
            <p className="sketch-font absolute bottom-28 sm:bottom-32 right-5 text-white text-sm sm:text-lg font-bold whitespace-nowrap flex items-center gap-1.5">
              지우개로 지울 수 있어요
              <motion.span
                animate={{ x: [0, 4, 0], y: [0, 4, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              >
                ↘
              </motion.span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eraser + clear-all: persistent corner buttons
          so they're always reachable regardless of hint/idle state. */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        <button
          onClick={clearDoodles}
          title="전체 지우기"
          className="h-14 sm:h-16 px-4 sm:px-5 rounded-full shadow-lg border-2 flex items-center justify-center whitespace-nowrap text-xs sm:text-base font-bold text-slate-500 bg-white/90 hover:bg-white border-slate-300 transition-colors"
        >
          전체 지우기
        </button>
        <motion.button
          onClick={toggleEraser}
          title="지우개"
          animate={showEraserHint ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 1.3, repeat: showEraserHint ? Infinity : 0, ease: 'easeInOut' }}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg border-2 flex items-center justify-center transition-colors ${
            isErasing
              ? 'bg-slate-700 border-slate-800'
              : 'bg-white/90 border-slate-300 hover:bg-white'
          }`}
        >
          <span className="w-4 h-6 sm:w-5 sm:h-7 rounded-[3px] border border-slate-400 shadow-sm overflow-hidden flex flex-col rotate-[-8deg]">
            <span className="w-full h-2/3 bg-slate-300" />
            <span className="w-full h-1/3 bg-slate-100" />
          </span>
        </motion.button>
      </div>

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
            whileHover={toolHeld ? undefined : { scale: 1.015, rotate: -0.5 }}
            whileTap={toolHeld ? undefined : { scale: 0.99 }}
            onMouseEnter={() => { if (!toolHeld) setSelectedIndex(0); }}
            onClick={() => { if (!toolHeld) onSelectMode('GAME'); }}
            className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 relative ${
              selectedIndex === 0
                ? 'bg-amber-100/90 border-slate-900 shadow-[6px_6px_0px_#3b82f6] rotate-[-1deg]'
                : 'bg-white/80 border-slate-800 shadow-[3px_3px_0px_#cbd5e1] opacity-90 hover:opacity-100 rotate-[0.5deg]'
            } ${toolHeld ? 'cursor-default !opacity-50' : 'cursor-pointer'}`}
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
            whileHover={toolHeld ? undefined : { scale: 1.015, rotate: 0.5 }}
            whileTap={toolHeld ? undefined : { scale: 0.99 }}
            onMouseEnter={() => { if (!toolHeld) setSelectedIndex(1); }}
            onClick={() => { if (!toolHeld) onSelectMode('STANDARD'); }}
            className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 relative ${
              selectedIndex === 1
                ? 'bg-emerald-100/90 border-slate-900 shadow-[6px_6px_0px_#10b981] rotate-[1deg]'
                : 'bg-white/80 border-slate-800 shadow-[3px_3px_0px_#cbd5e1] opacity-90 hover:opacity-100 rotate-[-0.5deg]'
            } ${toolHeld ? 'cursor-default !opacity-50' : 'cursor-pointer'}`}
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
