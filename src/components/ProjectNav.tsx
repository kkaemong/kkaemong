'use client';

import { useEffect, useState } from 'react';

// 프로젝트 영역을 볼 때만 왼쪽에 뜨는 번호 메뉴: 누르면 그 프로젝트로 이동하고, 보고 있는 프로젝트는 진하게 표시된다.
export default function ProjectNav({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((it) => document.getElementById(`project-${it.id}`)).filter((e): e is HTMLElement => !!e);
    const update = () => {
      const mid = window.innerHeight * 0.4;
      let cur: string | null = null;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) cur = el.id.replace('project-', '');
      }
      setActive(cur);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  return (
    <nav
      aria-label="프로젝트 바로가기"
      className={`fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-full bg-white p-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] ring-1 ring-[#111]/10 transition-opacity duration-300 min-[1700px]:flex ${active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      {items.map((it, i) => (
        <a
          key={it.id}
          href={`#project-${it.id}`}
          aria-current={active === it.id ? 'true' : undefined}
          className={`group relative flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
            active === it.id ? 'bg-[#e4572e] text-white' : 'text-[#5a5853] hover:bg-[#111]/[0.06]'
          }`}
        >
          {i + 1}
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#1f1e1c] px-2.5 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">{it.title}</span>
        </a>
      ))}
    </nav>
  );
}
