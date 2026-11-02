'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

// 인삿말 대신: 하얀 화면에 강아지 발바닥이 "빵!" 찍히고, 발자국이 또각또각 걸어가면 사이트가 열린다.
// 영화 버전(/film)이 아직 없으므로 선택지는 꺼 둔다. 만들어지면 true로 바꾼다.
const FILM_ENABLED = false;
const END_AT = FILM_ENABLED ? 14000 : 3200; // 선택지를 둔 채로 기다리는 최대 시간(ms), 선택지가 없으면 바로 넘어간다
const LAST_PRINT_AT = 2650; // 마지막 발자국이 찍히는 시각(ms)

function Paw({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
      <ellipse cx="21" cy="40" rx="9" ry="12.5" transform="rotate(-24 21 40)" />
      <ellipse cx="39" cy="22" rx="9.5" ry="13.5" transform="rotate(-7 39 22)" />
      <ellipse cx="61" cy="22" rx="9.5" ry="13.5" transform="rotate(7 61 22)" />
      <ellipse cx="79" cy="40" rx="9" ry="12.5" transform="rotate(24 79 40)" />
      <path d="M50 47 C32 47 18 65 23 78 C27 89 40 87 50 83 C60 87 73 89 77 78 C82 65 68 47 50 47 Z" />
    </svg>
  );
}

// 발자국이 걸어가는 길 (중앙에서 오른쪽 위로, 번갈아 왼발·오른발)
const TRAIL = [
  { x: 150, y: -10, r: 62 },
  { x: 215, y: -62, r: 52 },
  { x: 285, y: -22, r: 66 },
  { x: 350, y: -76, r: 54 },
  { x: 420, y: -34, r: 64 },
  { x: 490, y: -88, r: 56 },
];

const SPECKS = [
  [-120, -60], [110, -80], [-150, 40], [140, 60], [-60, 130], [70, 140], [-30, -140], [30, -130],
] as const;

// 영화 버전에서 "웹페이지로 보기"로 돌아온 경우에는 오프닝을 다시 보여주지 않는다
const subscribeNone = () => () => {};
const getSkip = () => {
  try {
    return sessionStorage.getItem('skipIntro') === '1';
  } catch {
    return false;
  }
};

export default function WhiteIntro() {
  const router = useRouter();
  const skip = useSyncExternalStore(subscribeNone, getSkip, () => false);
  const [closed, setClosed] = useState(false);
  const [choice, setChoice] = useState(false);
  const hidden = closed || skip;

  useEffect(() => {
    // 마지막 발자국이 찍히는 자리: 강아지가 바로 여기서 걸어 나온다
    const last = TRAIL[TRAIL.length - 1];
    const w = window as unknown as { __dogStart?: { x: number; y: number }; __introDone?: boolean };
    w.__dogStart = { x: Math.min(window.innerWidth - 90, window.innerWidth / 2 + last.x), y: window.innerHeight / 2 + last.y + 28 };
    // 웹페이지로 들어가기로 하면 신호를 보낸다 (중복 안전)
    if (hidden) {
      if (!w.__introDone) {
        w.__introDone = true;
        window.dispatchEvent(new Event('intro-done'));
      }
      return;
    }
    document.body.style.overflow = 'hidden';
    const show = setTimeout(() => FILM_ENABLED && setChoice(true), LAST_PRINT_AT + 400);
    // 아무것도 고르지 않아도 갇히지 않도록 잠시 뒤 웹페이지로 넘어간다
    const auto = setTimeout(() => setClosed(true), END_AT);
    return () => {
      clearTimeout(show);
      clearTimeout(auto);
      document.body.style.overflow = '';
    };
  }, [hidden]);

  const startFilm = () => router.push('/film');

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="white-intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#ffffff_0%,#faf9f6_55%,#f1efe9_100%)] text-[#111] print:hidden"
          role="dialog"
          aria-label="오프닝"
        >
          {/* 쾅 찍힐 때 화면이 살짝 흔들린다 */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ x: 0, y: 0 }}
            animate={{ x: [0, 0, -4, 3, -2, 0], y: [0, 0, 7, -3, 2, 0] }}
            transition={{ duration: 0.5, delay: 0.55, times: [0, 0.01, 0.2, 0.45, 0.7, 1] }}
          >
            {/* 충격 파동 */}
            <motion.span
              className="absolute h-44 w-44 rounded-full border border-[#111]/40"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 2.6], opacity: [0.7, 0] }}
              transition={{ duration: 0.9, delay: 0.62, ease: 'easeOut' }}
            />

            {/* 튀는 잉크 점 */}
            {SPECKS.map(([x, y], i) => (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-[#111]"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{ x, y, opacity: [0, 0.9, 0], scale: [0.4, 1, 0.8] }}
                transition={{ duration: 0.8, delay: 0.62, ease: 'easeOut' }}
              />
            ))}

            {/* 큰 발바닥: 위에서 내려와 빵! */}
            <motion.div
              initial={{ scale: 2.6, opacity: 0, rotate: -14 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{ delay: 0.45, type: 'spring', stiffness: 900, damping: 26, mass: 0.7 }}
            >
              <Paw className="h-40 w-40 sm:h-52 sm:w-52" />
            </motion.div>

            {/* 걸어가는 발자국 */}
            {TRAIL.map((p, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ rotate: p.r }}
                initial={{ x: p.x, y: p.y + 14, opacity: 0, scale: 0.6 }}
                animate={{ x: p.x, y: p.y, opacity: [0, 0.85, 0.85], scale: 1 }}
                transition={{ delay: 1.45 + i * 0.2, duration: 0.25, ease: 'easeOut' }}
              >
                <Paw className="h-10 w-10 sm:h-12 sm:w-12" />
              </motion.div>
            ))}
          </motion.div>

          {/* 선택: 영화로 시작하기 / 바로 둘러보기 */}
          <AnimatePresence>
            {choice && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute inset-x-0 bottom-[12%] flex flex-col items-center gap-5 px-6"
              >
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={startFilm}
                    className="group inline-flex items-center gap-3 border border-[#111] bg-[#111] px-8 py-3.5 text-sm font-medium tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-[#111] sm:text-base"
                  >
                    <span className="inline-block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
                    영화로 시작하기
                  </button>
                  <button
                    type="button"
                    onClick={() => setClosed(true)}
                    className="border border-[#111]/40 px-8 py-3.5 text-sm font-medium tracking-[0.12em] text-[#111] transition-colors hover:border-[#111] hover:bg-[#111] hover:text-white sm:text-base"
                  >
                    바로 둘러보기
                  </button>
                </div>
                <p className="text-xs tracking-[0.2em] text-[#8a8780]">스크롤로 이어지는 짧은 영화 · 언제든 웹페이지로 나갈 수 있어요</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
