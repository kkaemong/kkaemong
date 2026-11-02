'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { goSection } from '@/lib/section';

// 첫 화면: 가운데에 직함, 그 아래로 발자국이 지그재그로 이어지며 강점이 하나씩 찍힌다 (오프닝의 발자국과 이어지는 구성)
const STRENGTHS = ['원인을 끝까지 따라갑니다', '피드백을 바로 받아들입니다', '수치로 손맛을 설계합니다', 'AI의 결과를 판단해서 씁니다'];

// 발자국 길: x, y는 길 영역 안의 위치(%)
const PATH = [
  { x: 12, y: 6 },
  { x: 37, y: 52 },
  { x: 63, y: 6 },
  { x: 88, y: 52 },
];

const SERIF = 'font-[family-name:var(--font-noto-serif)]';

function Paw({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor" aria-hidden>
      <ellipse cx="21" cy="40" rx="9" ry="12.5" transform="rotate(-24 21 40)" />
      <ellipse cx="39" cy="22" rx="9.5" ry="13.5" transform="rotate(-7 39 22)" />
      <ellipse cx="61" cy="22" rx="9.5" ry="13.5" transform="rotate(7 61 22)" />
      <ellipse cx="79" cy="40" rx="9" ry="12.5" transform="rotate(24 79 40)" />
      <path d="M50 47 C32 47 18 65 23 78 C27 89 40 87 50 83 C60 87 73 89 77 78 C82 65 68 47 50 47 Z" />
    </svg>
  );
}

export default function Hero() {
  // 큰 발자국 사이를 잇는 작은 발자국
  const steps = PATH.slice(0, -1).flatMap((a, i) => {
    const b = PATH[i + 1];
    return [1 / 3, 2 / 3].map((f) => ({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f + 14, i, f }));
  });

  return (
    <section id="hero" className="relative text-[#111]">
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-28 text-center sm:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-8 text-sm font-medium tracking-[0.45em] text-[#8a8780] sm:text-base"
        >
          진준영
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className={`break-keep text-[clamp(2.4rem,min(7vw,13vh),9rem)] font-light leading-[1.15] tracking-tight ${SERIF}`}
        >
          게임 클라이언트 개발자
        </motion.h1>

        {/* 발자국 길 (넓은 화면) */}
        <div className="relative mt-14 hidden h-[clamp(170px,30vh,280px)] w-full max-w-[1400px] sm:block">
          {steps.map((s, k) => (
            <motion.span
              key={k}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.22, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 + s.i * 0.45 + s.f * 0.35 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%`, rotate: `${s.i % 2 === 0 ? 70 : 110}deg` }}
            >
              <Paw className="h-5 w-5" />
            </motion.span>
          ))}
          {STRENGTHS.map((text, i) => (
            <div key={text} className="absolute flex w-[270px] -translate-x-1/2 flex-col items-center gap-3" style={{ left: `${PATH[i].x}%`, top: `${PATH[i].y}%` }}>
              <motion.span
                initial={{ opacity: 0, scale: 0.4, y: -12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22, delay: 0.9 + i * 0.45 }}
                style={{ rotate: `${i % 2 === 0 ? -14 : 12}deg` }}
              >
                <Paw className="h-[clamp(2.5rem,2.6vw,3.5rem)] w-[clamp(2.5rem,2.6vw,3.5rem)]" />
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 + i * 0.45 }}
                className={`break-keep text-[clamp(1.1rem,1.5vw,1.9rem)] font-light leading-snug tracking-tight ${SERIF}`}
              >
                {text}
              </motion.p>
            </div>
          ))}
        </div>

        {/* 좁은 화면 */}
        <ul className="mt-12 grid w-full max-w-md grid-cols-1 gap-6 sm:hidden">
          {STRENGTHS.map((text, i) => (
            <motion.li key={text} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 + i * 0.3 }} className="flex items-center justify-center gap-3">
              <Paw className="h-6 w-6 shrink-0" style={{ rotate: `${i % 2 === 0 ? -14 : 12}deg` }} />
              <span className={`break-keep text-lg font-light ${SERIF}`}>{text}</span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          type="button"
          onClick={() => goSection('#intro')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.8 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium uppercase tracking-[0.3em] text-[#8a8780]"
          aria-label="아래로 스크롤"
        >
          Scroll
          <ArrowDown size={16} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
