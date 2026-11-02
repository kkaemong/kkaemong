'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

// 나이트 모드: <html>에 dark 클래스를 붙이고 선택을 기억한다. (색 반전은 globals.css에서 처리)
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => mo.disconnect();
};
const getDark = () => document.documentElement.classList.contains('dark');

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getDark, () => false);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* 저장이 막혀 있어도 이번 방문 동안은 바뀐다 */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? '라이트 모드로 바꾸기' : '나이트 모드로 바꾸기'}
      aria-pressed={dark}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#111]/25 text-[#111] transition-colors hover:border-[#111] hover:bg-[#111] hover:text-white ${className}`}
    >
      {dark ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
    </button>
  );
}
