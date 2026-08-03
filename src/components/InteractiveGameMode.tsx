'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';

const GameScene3D = dynamic(() => import('./GameScene3D'), { ssr: false });

interface InteractiveGameModeProps {
  onSwitchToStandard: () => void;
  onBackToLanding?: () => void;
}

export default function InteractiveGameMode({ onSwitchToStandard, onBackToLanding }: InteractiveGameModeProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">

      {/* Notebook Graph Paper Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2.2rem_2.2rem] opacity-50 pointer-events-none" />

      {/* Floating Doodle Decorations */}
      <motion.img
        animate={{ y: [0, -6, 0], rotate: [-8, 2, -8] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        src="/decorations/pencil_blue.png"
        alt=""
        className="absolute top-24 left-8 w-14 h-auto hidden lg:block opacity-80 pointer-events-none z-0"
      />
      <motion.img
        animate={{ y: [0, 8, 0], rotate: [6, -6, 6] }}
        transition={{ duration: 5, repeat: Infinity }}
        src="/decorations/star.png"
        alt=""
        className="absolute bottom-16 right-10 w-9 h-auto hidden lg:block opacity-80 pointer-events-none z-0"
      />

      {/* Minimal floating nav */}
      {onBackToLanding && (
        <button
          onClick={onBackToLanding}
          className="absolute top-5 left-5 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-lg transition-all cursor-pointer"
          title="첫 선택 화면"
        >
          <ArrowLeft size={18} />
        </button>
      )}
      <button
        onClick={onSwitchToStandard}
        className="absolute top-5 right-5 z-20 inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-slate-200 shadow-md text-xs font-bold text-slate-600 hover:text-blue-600 hover:shadow-lg transition-all cursor-pointer"
      >
        <FileText size={14} />
        <span>포트폴리오 보기</span>
      </button>

      {/* Flash-game style stage: dark cabinet bezel around a centered screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-3xl aspect-video rounded-[1.75rem] bg-slate-900 p-3 sm:p-4 shadow-2xl"
      >
        {/* Bezel details */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>

        {/* Screen */}
        <div className="w-full h-full rounded-2xl bg-[#FAF9F6] border border-slate-800/40 overflow-hidden">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold">
                3D 씬 불러오는 중...
              </div>
            }
          >
            <GameScene3D />
          </Suspense>
        </div>
      </motion.div>

      <p className="relative z-10 mt-3 text-xs text-slate-400 font-medium">
        💡 드래그해서 회전, 스크롤로 확대/축소해보세요
      </p>
    </div>
  );
}
