'use client';

import { useSyncExternalStore } from 'react';

// 화면 오른쪽 아래의 "간식 주기" 버튼: 누르면 강아지에게 뼈다귀가 떨어지고, 강아지가 달려가서 먹는다.
const subscribe = (cb: () => void) => {
  window.addEventListener('intro-done', cb);
  return () => window.removeEventListener('intro-done', cb);
};
const getReady = () => !!(window as unknown as { __introDone?: boolean }).__introDone;

export default function TreatButton({ active = true }: { active?: boolean }) {
  const ready = useSyncExternalStore(subscribe, getReady, () => false);
  if (!ready || !active) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('dog-treat'))}
      aria-label="강아지에게 간식 주기"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-[#111]/30 bg-white/90 py-2.5 pl-3.5 pr-5 text-sm font-medium tracking-[0.08em] text-[#111] shadow-sm backdrop-blur-sm transition-all hover:border-[#111] hover:bg-[#111] hover:text-white print:hidden"
    >
      <svg viewBox="0 0 40 20" className="h-5 w-10 transition-transform duration-300 group-hover:-rotate-12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="9" y="7.5" width="22" height="5" rx="2.5" />
        <circle cx="8" cy="6.5" r="3.6" />
        <circle cx="8" cy="13.5" r="3.6" />
        <circle cx="32" cy="6.5" r="3.6" />
        <circle cx="32" cy="13.5" r="3.6" />
      </svg>
      간식 주기
    </button>
  );
}
