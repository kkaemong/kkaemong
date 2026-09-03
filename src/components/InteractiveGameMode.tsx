'use client';

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';
import { portfolioData, type Project } from '@/data/portfolio';
import ProjectModal from './ProjectModal';
import type { UnityPortfolioGameHandle } from './UnityPortfolioGame';

const GameScene3D = dynamic(() => import('./GameScene3D'), { ssr: false });
const UnityPortfolioGame = dynamic(() => import('./UnityPortfolioGame'), { ssr: false });

interface InteractiveGameModeProps {
  onSwitchToStandard: () => void;
  onBackToLanding?: () => void;
}

const TIP_ORIGIN = '94% 4%';

// Non-project booths (About Me / Experience) on the map: no modal, just a
// brief scenic pause before movement unlocks again on its own.
const SCENIC_PAUSE_MS = 1400;

export default function InteractiveGameMode({ onSwitchToStandard, onBackToLanding }: InteractiveGameModeProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [gameFailed, setGameFailed] = useState(false);
  const gameRef = useRef<UnityPortfolioGameHandle | null>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLImageElement | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const handleBoothReached = useCallback((boothId: string) => {
    const project = portfolioData.projects.find((p) => p.id === boothId);
    if (project) {
      setSelectedProject(project);
      return;
    }
    window.setTimeout(() => gameRef.current?.resume(), SCENIC_PAUSE_MS);
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    gameRef.current?.resume();
  }, []);

  // Fit the trail canvas to the viewport and keep it crisp on resize
  useEffect(() => {
    const canvas = trailCanvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Continuously fades the trail toward the page color, so pencil strokes
  // left by the custom cursor linger a moment and then dissolve instead of
  // needing an explicit clear.
  useEffect(() => {
    const canvas = trailCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let raf: number;
    const fade = () => {
      // destination-out erases by reducing alpha, instead of painting translucent
      // color over a transparent canvas — the latter accumulates opacity over
      // time (source-over compositing) and eventually washes the whole page white.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(fade);
    };
    raf = requestAnimationFrame(fade);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Custom pencil cursor: replaces the system pointer everywhere in GAME
  // mode (ties back to the site's pencil motif) and leaves a faint graphite
  // stroke behind it as it moves.
  useEffect(() => {
    const canvas = trailCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const handleMove = (e: PointerEvent) => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.opacity = '1';
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-94%, -4%) rotate(180deg)`;
      }
      const last = lastPointRef.current;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.45)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      if (last) {
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(e.clientX, e.clientY);
      } else {
        ctx.moveTo(e.clientX, e.clientY);
        ctx.lineTo(e.clientX + 0.1, e.clientY + 0.1);
      }
      ctx.stroke();
      lastPointRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#FAF9F6] text-slate-900 overflow-hidden select-none cursor-none">

      {/* Full-bleed scene — no cabinet frame, this *is* the screen */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 font-bold">
            불러오는 중...
          </div>
        }
      >
        {gameFailed ? (
          <GameScene3D onSelectProject={setSelectedProject} onOpenResume={onSwitchToStandard} />
        ) : (
          <UnityPortfolioGame
            apiRef={gameRef}
            onBoothReached={handleBoothReached}
            onFailure={() => setGameFailed(true)}
          />
        )}
      </Suspense>

      {/* Fading pencil-stroke trail, purely decorative */}
      <canvas ref={trailCanvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Custom pencil cursor tracking the pointer everywhere in GAME mode */}
      <img
        ref={cursorRef}
        src="/decorations/pencil_red.png"
        alt=""
        draggable={false}
        className="fixed top-0 left-0 w-10 h-auto z-30 pointer-events-none opacity-0 drop-shadow-md"
        style={{ willChange: 'transform', transformOrigin: TIP_ORIGIN }}
      />

      {/* Floating HUD nav, layered above the canvas */}
      {onBackToLanding && (
        <button
          onClick={onBackToLanding}
          className="absolute top-5 left-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-lg transition-all cursor-none"
          title="첫 선택 화면"
        >
          <ArrowLeft size={18} />
        </button>
      )}
      {gameFailed && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-xs text-slate-500 font-medium bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap">
          💡 카드에 마우스를 올려보세요 · 클릭하면 상세 정보를 볼 수 있어요
        </p>
      )}

      <ProjectModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={closeProjectModal}
      />
    </div>
  );
}
