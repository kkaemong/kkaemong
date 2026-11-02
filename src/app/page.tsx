'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SignatureHero, { markSignatureSeen, useSignatureSeen } from '@/components/SignatureHero';
import ThemeToggle from '@/components/ThemeToggle';
import ModeBlobs from '@/components/ModeBlobs';
import StoryView from '@/components/StoryView';
import { GameArt, InteractiveArt, SimpleArt } from '@/components/BlobArt';

// 첫 화면: 왼쪽에서 연필을 든 손이 "june"을 쓰고, 다 쓰면 같은 화면 오른쪽에 세 가지 모드가 나타난다.
// 세 모드는 세로로 쌓인 줄이고, 마우스를 올린 줄은 살짝 넓어지며 화살표와 설명이 나온다.
const SERIF = 'font-[family-name:var(--font-noto-serif)]';
// 이 화면의 색은 CSS 변수라서 나이트 모드에서 globals.css가 푸른 회색 바탕에 맞는 색으로 바꾼다
const INK = 'var(--l-ink)';
const MUTED = 'var(--l-muted)';
const LINE = 'var(--l-line)';

// 손으로 쓴 듯한 글씨체: 이 화면의 모든 글씨(SERIF 지정 포함)를 바꾼다
const HAND_STYLE = { fontFamily: 'var(--font-hand)', ['--font-noto-serif' as string]: 'var(--font-hand)' } as React.CSSProperties;

const SVG_PROPS = { viewBox: '0 0 48 48', fill: 'none', stroke: 'currentColor', strokeWidth: 0.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

function JoyConIcon({ className }: { className?: string }) {
  return (
    <svg {...SVG_PROPS} className={className}>
      <rect x="14" y="3" width="20" height="42" rx="10" />
      <path d="M20 8h8" />
      <circle cx="24" cy="17" r="4.2" />
      <circle cx="24" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="24" cy="29" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="24" cy="37" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="33" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="28.5" cy="33" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CursorIcon({ className }: { className?: string }) {
  return (
    <svg {...SVG_PROPS} className={className}>
      <path d="M14 8 L14 34 L20.5 28.5 L25 39 L29 37.2 L24.6 26.8 L33 26 Z" />
      <path d="M31 9 Q38 11 40 18" />
      <path d="M35 5 Q44 8 46 18" />
    </svg>
  );
}

function PaperIcon({ className }: { className?: string }) {
  return (
    <svg {...SVG_PROPS} className={className}>
      <rect x="9" y="5" width="30" height="38" rx="1.5" />
      <path d="M15 14h18M15 21h18M15 28h12M15 35h8" />
    </svg>
  );
}

type Item = {
  href: string;
  no: string;
  title: string;
  label: string;
  desc: string;
  Icon: (props: { className?: string }) => React.JSX.Element;
  content?: React.ReactNode; // 덩어리 위쪽에 보이는 그림이나 글(없으면 종이색 덩어리)
  tint?: string; // 덩어리의 종이색
  onSelect?: () => void;
};

const ITEMS: Item[] = [
  { href: '/game', no: '01', title: 'Game', label: '게임 체험하기', desc: '만들고 싶은 게임을 영상과 체험판으로 만나 보세요.', Icon: JoyConIcon, content: <GameArt />, tint: '#f1eee6' },
  { href: '/interactive', no: '02', title: 'Interactive', label: '인터랙티브 포트폴리오', desc: '움직이고 반응하는 포트폴리오입니다.', Icon: CursorIcon, content: <InteractiveArt />, tint: '#e9edf1' },
  { href: '/simple', no: '03', title: 'Simple', label: '심플 포트폴리오', desc: '이력과 프로젝트를 한눈에 읽을 수 있게 정리했습니다.', Icon: PaperIcon, content: <SimpleArt />, tint: '#f4ede3' },
];

export default function Home() {
  const [done, setDone] = useState(false);
  const [forced, setForced] = useState(false);
  const [story, setStory] = useState(false); // 인터랙티브를 고르면 페이지를 옮기지 않고 그 자리에서 이야기가 시작된다
  const seen = useSignatureSeen();
  const skip = seen || forced;
  const ready = skip || done;
  const handleDone = useCallback(() => setDone(true), []);
  const skipNow = () => {
    markSignatureSeen();
    setForced(true);
  };

  const items = ITEMS.map((it) => (it.href === '/interactive' ? { ...it, onSelect: () => { setStory(true); window.scrollTo(0, 0); } } : it));

  if (story) {
    return <StoryView onBack={() => { setStory(false); window.scrollTo(0, 0); }} />;
  }

  return (
    <main className="landing-root relative min-h-screen overflow-hidden" style={{ color: INK, backgroundColor: 'var(--l-bg)', ...HAND_STYLE }}>
      {/* 맨 위 가운데: 나이트 모드 */}
      <ThemeToggle className="landing-toggle absolute left-1/2 top-6 z-50 -translate-x-1/2 md:top-7" />
      {!ready && (
        <button type="button" onClick={skipNow} className="absolute right-[4vw] top-8 z-50 text-sm underline underline-offset-4 md:top-9" style={{ color: MUTED }}>
          건너뛰기
        </button>
      )}

      {/* 왼쪽: 연필을 든 손이 쓰는 서명 */}
      <SignatureHero skip={skip} onDone={handleDone} className="absolute left-[4vw] top-[12vh] z-10 w-[min(78vw,420px)] md:top-1/2 md:w-[min(38vw,560px)] md:-translate-y-1/2" />

      {/* ===== 넓은 화면: 오른쪽에 돌림판처럼 돌려서 고르는 세 가지 모드 ===== */}
      <motion.div
        initial={false}
        animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : 36 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[2vw] top-[5vh] hidden md:block"
      >
        <ModeBlobs items={items} ready={ready} />
      </motion.div>

      {/* ===== 좁은 화면: 서명 아래에 위아래로 쌓인 선택 ===== */}
      <motion.div
        initial={false}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-x-0 bottom-0 top-[46vh] flex flex-col md:hidden"
        style={{ pointerEvents: ready ? 'auto' : 'none' }}
      >
        {ITEMS.map((it, i) => {
          const { Icon } = it;
          return (
            <Link key={it.href} href={it.href} className="flex flex-1 items-center gap-5 px-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: i === ITEMS.length - 1 ? `1px solid ${LINE}` : 'none' }}>
              <Icon className="h-10 w-10 shrink-0 opacity-60" />
              <div>
                <span className={`text-xs font-light tracking-[0.4em] ${SERIF}`} style={{ color: MUTED }}>{it.no}</span>
                <h2 className={`mt-0.5 text-xl font-extralight uppercase tracking-[0.12em] ${SERIF}`}>{it.title}</h2>
                <p className={`text-sm font-light ${SERIF}`}>{it.label}</p>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </main>
  );
}
