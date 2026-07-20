'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, FileText, Sparkles, ArrowRight, X } from 'lucide-react';

interface ModeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'GAME' | 'STANDARD') => void;
}

export default function ModeSelectorModal({
  isOpen,
  onClose,
  onSelectMode,
}: ModeSelectorModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        
        {/* Modal Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 text-white"
        >
          {/* Top Background Gradient Orbs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
            title="닫기"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
              <Sparkles size={14} className="text-indigo-400 animate-pulse" />
              <span>Game Client Developer Portfolio</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white mb-3">
              방문해 주셔서 감사합니다! 👋
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              포트폴리오를 감상할 방식을 선택해 주세요.<br className="hidden sm:inline" />
              상단 메뉴에서 언제든지 1클릭으로 자유롭게 전환할 수 있습니다.
            </p>
          </div>

          {/* Split Path Choice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
            
            {/* Option 1: 2D Interactive Game Mode */}
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onSelectMode('GAME');
                onClose();
              }}
              className="group text-left p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900/90 border-2 border-indigo-500/40 hover:border-indigo-400 shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                  <Gamepad2 size={26} />
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[11px] font-black uppercase tracking-wider mb-2">
                  Interactive RPG
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  🎮 2D 게임 모드로 보기
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  WASD / 방향키로 2D 캐릭터를 직접 움직여 전시장 부스를 탐색하고 레트로 RPG 스타일로 포트폴리오를 둘러봅니다.
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                <span>게임 모드 시작하기</span>
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {/* Option 2: Standard Clean Document Mode */}
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onSelectMode('STANDARD');
                onClose();
              }}
              className="group text-left p-6 sm:p-7 rounded-2xl bg-slate-900/90 border-2 border-slate-700/60 hover:border-slate-500 shadow-xl hover:shadow-slate-700/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-700/10 rounded-bl-full pointer-events-none group-hover:bg-slate-700/20 transition-colors" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-black uppercase tracking-wider mb-2">
                  Fast Document
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-200 transition-colors">
                  📄 바로 포트폴리오 보기
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  기술 스택, 프로젝트 최적화 경험, 이력 사항을 빠르게 한눈에 읽어볼 수 있는 깔끔한 서류 모드입니다.
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-slate-300 group-hover:text-white">
                <span>이력서 모드로 보기</span>
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 text-center text-xs text-slate-500">
            💡 모드는 포트폴리오 상단 메뉴의 스위치 버튼으로 언제든지 바꾸실 수 있습니다.
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
