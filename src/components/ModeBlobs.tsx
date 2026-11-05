'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// 세 가지 모드를 물방울처럼 일렁이는 덩어리로 보여 준다. 덩어리를 누르면 해당 화면으로 들어간다.
// - 덩어리의 윤곽은 둥근 모양에서 시작해 여러 군데가 천천히 부풀고 들어가며 계속 모양이 바뀐다.
// - 덩어리들은 제멋대로 천천히 떠다닌다. 마우스가 가까워지면 그쪽으로 아주 살짝 끌리고 윤곽이 조금 부푼다.
// - 서명이 있는 왼쪽 영역은 침범하지 않는다. 이 영역의 왼쪽 경계를 넘어 움직이지 않는다.
const SERIF = 'font-[family-name:var(--font-noto-serif)]';

export type BlobItem = {
  href: string;
  no: string;
  title: string;
  label: string;
  desc: string; // 마우스를 올렸을 때 나오는 작은 설명
  content?: React.ReactNode; // 덩어리 위쪽에 보이는 그림
  tint?: string; // 덩어리의 종이색
  onSelect?: () => void; // 있으면 페이지를 옮기지 않고 이것을 실행한다
  wip?: boolean; // 아직 개발 중인 화면(이름 옆에 '개발중' 표시와 안내가 붙는다)
};

// 덩어리마다 자리(퍼센트)와 크기를 다르게 줘서 한 줄로 늘어서지 않게 한다. 크게 잡아서 서로 조금 겹친다.
// 글씨와 그림은 모든 덩어리 위의 별도 층에 올려서, 겹쳐도 가려지지 않는다.
const LAYOUT = [
  { left: '0%', top: '0%', width: '66%', height: '31%' },
  { left: '34%', top: '34%', width: '66%', height: '31%' },
  { left: '0%', top: '68%', width: '66%', height: '31%' },
] as const;

const POINTS = 10; // 윤곽을 이루는 점의 수
const DRIFT = 22; // 떠다니는 범위(px)
const PULL = 12; // 마우스에 끌리는 최대 거리(px)

// 같은 번호면 항상 같은 값이 나오는 0~1 난수
const rnd = (i: number, seed: number) => {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// 닫힌 부드러운 곡선(Catmull-Rom)을 베지어 경로로 바꾼다
const smoothClosed = (pts: [number, number][]) => {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
};

// t(초) 시점의 덩어리 윤곽. bump는 마우스 쪽으로 윤곽이 부푸는 정도와 방향
const outline = (w: number, h: number, t: number, blob: number, bump: { amount: number; angle: number }) => {
  const pts: [number, number][] = [];
  for (let i = 0; i < POINTS; i++) {
    const a = (i / POINTS) * Math.PI * 2;
    const s = blob * 31 + i;
    // 느린 파동 두 개를 겹쳐서 점마다 다른 박자로 부풀고 들어가게 한다
    const wave =
      0.07 * Math.sin(t * (0.32 + rnd(s, 1) * 0.4) + rnd(s, 2) * 6.28) +
      0.035 * Math.sin(t * (0.7 + rnd(s, 3) * 0.6) + rnd(s, 4) * 6.28);
    const toward = Math.max(0, Math.cos(a - bump.angle));
    const r = 0.88 + wave + bump.amount * 0.1 * toward * toward;
    pts.push([w / 2 + (w / 2) * r * Math.cos(a), h / 2 + (h / 2) * r * Math.sin(a)]);
  }
  return smoothClosed(pts);
};

export default function ModeBlobs({ items, ready }: { items: BlobItem[]; ready: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const els = refs.current.filter((e): e is HTMLAnchorElement => e !== null);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = els.map(() => ({ ox: 0, oy: 0, pull: 0, angle: 0 }));
    const mouse = { x: -9999, y: -9999 };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    if (!reduce) {
      window.addEventListener('pointermove', onMove);
      document.addEventListener('pointerleave', onLeave);
    }

    const draw = (now: number) => {
      const t = reduce ? 0 : now / 1000;
      const wrapW = wrap.clientWidth;
      els.forEach((el, i) => {
        const s = state[i];
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const homeL = el.offsetLeft;
        const homeT = el.offsetTop;

        // 제멋대로 천천히 떠다닌다 (서로 다른 박자의 움직임을 겹친다)
        let tx = DRIFT * Math.sin(t * 0.21 * (1 + i * 0.31) + i * 2.1) + DRIFT * 0.4 * Math.sin(t * 0.47 + i * 5.3);
        let ty = DRIFT * Math.sin(t * 0.17 * (1 + i * 0.27) + i * 3.6) + DRIFT * 0.4 * Math.sin(t * 0.39 + i * 1.7);

        // 마우스가 가까우면 그쪽으로 아주 살짝 끌린다
        const cx = homeL + w / 2 + s.ox;
        const cy = homeT + h / 2 + s.oy;
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.max(w, h) * 0.9;
        const near = Math.max(0, 1 - dist / reach);
        if (near > 0) {
          tx += (dx / dist) * PULL * near;
          ty += (dy / dist) * PULL * near;
          s.angle = Math.atan2(dy, dx);
        }
        s.pull += (near - s.pull) * 0.04; // 부푸는 정도는 천천히 따라간다

        // 부드럽게 따라간다(갑자기 튀지 않게)
        s.ox += (tx - s.ox) * 0.05;
        s.oy += (ty - s.oy) * 0.05;
        // 서명 쪽(이 영역의 왼쪽 경계)과 오른쪽 끝을 넘지 않는다
        s.ox = Math.min(Math.max(s.ox, -homeL), wrapW + 12 - homeL - w);

        const move = `translate(${s.ox.toFixed(1)}px, ${s.oy.toFixed(1)}px)`;
        el.style.transform = move;
        // 글씨 층도 같은 덩어리를 그대로 따라 움직인다
        const lab = labelRefs.current[i];
        if (lab) lab.style.transform = move;
        el.style.clipPath = `path('${outline(w, h, t, i, { amount: s.pull, angle: s.angle })}')`;
      });
    };

    let raf = 0;
    const step = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(step);
    };
    if (reduce) draw(0);
    else raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[96vh] w-[min(57vw,880px)]" style={{ pointerEvents: ready ? 'auto' : 'none' }}>
      {items.map((it, i) => {
        const box = LAYOUT[i % LAYOUT.length];
        return (
          <Link
            key={it.href}
            ref={(el) => {
              refs.current[i] = el;
            }}
            href={it.href}
            aria-label={`${it.label}으로 들어가기`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onClick={(e) => {
              if (it.onSelect) {
                e.preventDefault();
                it.onSelect();
              }
            }}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className={`absolute block outline-none transition-[scale] duration-700 ease-out hover:scale-[1.04] focus-visible:scale-[1.04] ${i === 1 ? 'z-[2]' : 'z-[1]'}`}
            // 처음 그려질 때(스크립트가 윤곽을 만들기 전)는 둥근 타원으로 잘라 둔다
            style={{ ...box, backgroundColor: it.tint ?? '#f1eee6', clipPath: 'ellipse(46% 46% at 50% 50%)' }}
          />
        );
      })}

      {/* 글씨와 그림 층: 모든 덩어리 위에 올려서 덩어리가 서로 겹쳐도 가려지지 않는다. 클릭은 아래 덩어리가 받는다. */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {items.map((it, i) => {
          const box = LAYOUT[i % LAYOUT.length];
          const on = hover === i;
          return (
            <div
              key={it.href}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="absolute flex items-center justify-center gap-[4%] px-[14%] text-[#1c1b19] transition-[scale] duration-700 ease-out"
              style={{ ...box, scale: on ? 1.04 : 1 }}
            >
              {/* 왼쪽: 그림 (덩어리 안쪽에 들어오는 크기) */}
              {it.content && <span className="block aspect-square h-[38%] shrink-0">{it.content}</span>}
              {/* 오른쪽: 번호, 이름, 마우스를 올리면 작은 설명 */}
              <span className="relative block">
                <span className={`flex items-center justify-between gap-6 text-lg font-semibold tracking-[0.3em] ${SERIF}`} style={{ color: '#e4572e' }}>
                  {it.no}
                  <ArrowUpRight size={30} strokeWidth={1.8} className={`text-[#1c1b19] transition-transform duration-500 ${on ? '-translate-y-0.5 translate-x-0.5' : ''}`} />
                </span>
                <span className={`mt-1 block whitespace-nowrap text-[clamp(1.2rem,1.9vw,2.25rem)] font-extralight uppercase leading-none tracking-[0.08em] ${SERIF}`}>{it.title}</span>
                <span className={`mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[clamp(0.95rem,1.15vw,1.3rem)] font-light ${SERIF}`}>
                  <span className="whitespace-nowrap">{it.label}</span>
                  {it.wip && (
                    <span className="shrink-0 whitespace-nowrap rounded-full border border-[#e4572e] px-2 py-0.5 text-[0.7em] leading-none tracking-wide" style={{ color: '#e4572e' }}>
                      개발중
                    </span>
                  )}
                </span>
                <span
                  className={`absolute left-0 top-full z-20 mt-2 block w-max whitespace-nowrap rounded-xl bg-[#ffffff]/95 px-3.5 py-2.5 text-[clamp(0.85rem,1vw,1.1rem)] leading-relaxed text-[#45443f] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 ${on ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'}`}
                >
                  {it.desc}
                  {it.wip && <span className="mt-1 block text-[0.9em] text-[#e4572e]">아직 개발 중이라 중간에 끝나거나 일부가 비어 있을 수 있어요.</span>}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
