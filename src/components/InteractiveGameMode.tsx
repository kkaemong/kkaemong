'use client';

import { ArrowLeft, FileText } from 'lucide-react';

interface InteractiveGameModeProps {
  onSwitchToStandard: () => void;
  onBackToLanding?: () => void;
}

// 플레이 가능한 Unity WebGL 빌드는 아직 개발 중이라, 지금은 시작 화면 미리보기(GIF)만 노출한다.
// 실제 게임 임베드 로직(UnityPortfolioGame / GameScene3D)은 그대로 남겨 두었고 여기서 import만 끊었다.
const PREVIEW_GIF = '/portfolio-game.gif';

export default function InteractiveGameMode({ onSwitchToStandard, onBackToLanding }: InteractiveGameModeProps) {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-slate-900 flex flex-col overflow-hidden select-none relative">

      {/* Notebook graph-paper background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.8rem_1.8rem] opacity-60 pointer-events-none" />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl flex flex-col items-center">

          {/* 개발중 배지 */}
          <div className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow-[3px_3px_0px_#cbd5e1]">
            🚧 현재 개발 중
          </div>

          {/* 시작 화면 미리보기 (GIF 로드 실패 시 뒤의 안내 문구가 보이도록) */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-4 border-slate-900 bg-[#0b0f1a] shadow-[8px_8px_0px_#cbd5e1] flex items-center justify-center">
            <span className="absolute text-slate-400 text-sm font-semibold">시작 화면 미리보기 준비 중</span>
            <img
              src={PREVIEW_GIF}
              alt="포트폴리오 게임 시작 화면 미리보기"
              className="relative w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <h2 className="mt-7 text-xl sm:text-2xl font-extrabold tracking-tight text-center">
            게임으로 즐기는 포트폴리오를 만들고 있어요
          </h2>
          <p className="mt-3 max-w-xl text-center text-sm sm:text-base text-slate-600 leading-relaxed break-keep">
            3D 마을을 직접 돌아다니며 확인하는 인터랙티브 포트폴리오입니다.
            상호작용을 다듬는 중이라, 정식 공개 전까지는 시작 화면 미리보기만 공개합니다.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onSwitchToStandard}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-[3px_3px_0px_#cbd5e1] hover:bg-black transition-colors cursor-pointer"
            >
              <FileText size={16} />
              포트폴리오 감상하러 가기
            </button>
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-slate-900 text-sm font-bold text-slate-800 shadow-[3px_3px_0px_#cbd5e1] hover:text-blue-600 transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
                처음으로
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
