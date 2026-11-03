'use client';

import { useLayoutEffect } from 'react';
import LineScene from '@/components/LineScene';

// 인터랙티브 포트폴리오: 스크롤에 따라 선으로 이야기가 그려진다. 첫 화면에서 누르면 같은 자리에서 바로 이어진다.
// 이야기 화면에는 낮/밤 버튼이 없다. 방문한 기기의 밤 모드 설정을 따르고(장면마다 분위기 색이 바뀐다), 이 화면을 벗어나면 원래 선택으로 돌려 놓는다.
export default function StoryView({ onBack }: { onBack: () => void }) {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const before = html.classList.contains('dark');
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => html.classList.toggle('dark', mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      html.classList.toggle('dark', before);
    };
  }, []);

  return (
    <main className="landing-root relative" style={{ color: 'var(--l-ink)', backgroundColor: 'var(--l-bg)', fontFamily: 'var(--font-hand)', ['--font-noto-serif' as string]: 'var(--font-hand)' } as React.CSSProperties}>
      <button type="button" onClick={onBack} className="fixed left-6 top-6 z-50 text-sm underline underline-offset-4" style={{ color: 'var(--l-sub)' }}>
        ← 처음으로
      </button>
      <LineScene />
    </main>
  );
}
