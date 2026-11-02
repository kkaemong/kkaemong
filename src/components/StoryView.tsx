'use client';

import LineScene from '@/components/LineScene';
import ThemeToggle from '@/components/ThemeToggle';

// 인터랙티브 포트폴리오: 스크롤에 따라 선으로 이야기가 그려진다. 첫 화면에서 누르면 같은 자리에서 바로 이어진다.
export default function StoryView({ onBack }: { onBack: () => void }) {
  return (
    <main className="landing-root relative" style={{ color: 'var(--l-ink)', backgroundColor: 'var(--l-bg)', fontFamily: 'var(--font-hand)', ['--font-noto-serif' as string]: 'var(--font-hand)' } as React.CSSProperties}>
      <button type="button" onClick={onBack} className="fixed left-6 top-6 z-50 text-sm underline underline-offset-4" style={{ color: 'var(--l-sub)' }}>
        ← 처음으로
      </button>
      <ThemeToggle className="landing-toggle fixed left-1/2 top-6 z-50 -translate-x-1/2 md:top-7" />
      <LineScene />
    </main>
  );
}
