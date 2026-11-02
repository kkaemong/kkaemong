'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon as Github } from './GithubIcon';
import Hero from './Hero';
import { GREETING, currentPeriod, type Period } from '@/lib/timeOfDay';
import { portfolioData } from '@/data/portfolio';

// 방 사진 (모두 같은 구도). 아직 없는 시간대는 가장 비슷한 사진으로 대신한다.
const IMG_ASPECT = 1376 / 768;
const PERIOD_IMAGE: Record<Period, string> = {
  dawn: 'dawn',
  morning: 'morning',
  noon: 'morning',
  evening: 'evening',
  night: 'dawn',
};

// 사진 속 물건 위치(사진 크기 대비 0~1). 스크롤 순서대로 하나씩 확대한다.
const SPOTS = [
  { label: '코드 보드', x: 0.251, y: 0.405, w: 0.17, h: 0.4 },
  { label: '수치 보드', x: 0.74, y: 0.29, w: 0.127, h: 0.17 },
  { label: '노트', x: 0.386, y: 0.888, w: 0.25, h: 0.105 },
  { label: '상자', x: 0.228, y: 0.836, w: 0.124, h: 0.156 },
  { label: '노트북', x: 0.668, y: 0.588, w: 0.107, h: 0.134 },
] as const;
const STAGES = SPOTS.length + 1; // 0 = 방 전체
const HOLD = 0.045; // 단계 근처에서 머무는 스크롤 폭

// 좁은 화면에서는 카드를 아래에 둔다
const NARROW = 768;

// 좁은 화면이나 모션 줄이기 설정에서는 확대 연출 대신 기존 히어로를 보여준다
const FALLBACK_QUERY = '(prefers-reduced-motion: reduce)';
const subscribeFallback = (cb: () => void) => {
  const mq = window.matchMedia(FALLBACK_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const getFallback = () => window.matchMedia(FALLBACK_QUERY).matches;
const subscribeNone = () => () => {};
const subscribeResize = (cb: () => void) => {
  window.addEventListener('resize', cb);
  return () => window.removeEventListener('resize', cb);
};
const getSize = () => `${window.innerWidth}x${window.innerHeight}`;

// 0~1 밖으로 나가는 구간은 잘라서 오프셋이 단조 증가하도록 만든다
// (앞쪽은 가장 안쪽 값을, 뒤쪽은 1에 처음 닿는 값을 남긴다)
function clampRange(xs: number[], ys: number[]) {
  const pairs: [number, number][] = [];
  xs.forEach((x, k) => {
    const cx = Math.min(1, Math.max(0, x));
    const last = pairs[pairs.length - 1];
    if (last && last[0] === cx) {
      if (x < 0) pairs[pairs.length - 1] = [cx, ys[k]];
    } else pairs.push([cx, ys[k]]);
  });
  return { xs: pairs.map((q) => q[0]), ys: pairs.map((q) => q[1]) };
}

// 단계 k에서 사진이 어떻게 확대·이동해야 하는지 (px)
function focusFor(k: number, vw: number, vh: number) {
  if (k === 0) return { s: 1, x: 0, y: 0, cardRight: false };
  const spot = SPOTS[k - 1];
  const narrow = vw < NARROW;
  const W = Math.max(vw, vh * IMG_ASPECT);
  const H = W / IMG_ASPECT;
  const s = narrow ? 2 : 1.6;
  const cardRight = !narrow && spot.x < 0.5;
  const tx = narrow ? 0.5 : cardRight ? 0.3 : 0.7;
  const ty = narrow ? 0.32 : 0.5;
  const clamp = (t: number, view: number, size: number) => Math.min(Math.max(t, view / 2 - (s * size) / 2), (s * size) / 2 - view / 2);
  return {
    s,
    x: clamp(tx * vw - vw / 2 - s * (spot.x - 0.5) * W, vw, W),
    y: clamp(ty * vh - vh / 2 - s * (spot.y - 0.5) * H, vh, H),
    cardRight,
  };
}

const TRAITS = [
  {
    label: '코드 보드',
    title: '원인을 끝까지 따라갑니다',
    body: "플레이어가 '어색하다'고 느끼는 증상에서 멈추지 않고 원인을 찾아 고칩니다. 코인 스폰 시각을 static 변수가 공유하던 문제, 부모 스케일이 자식 오브젝트에 상속되던 문제처럼 눈에 보이는 증상 뒤의 코드를 추적해 해결했습니다.",
  },
  {
    label: '수치 보드',
    title: '수치가 만드는 체감을 봅니다',
    body: '반동이 있고 없고, 탄이 어디로 가는지 같은 작은 수치가 플레이어의 손맛을 바꾼다고 생각합니다. FPS를 좋아해서 조작감과 정밀함을 코드 레벨에서 다루는 클라이언트 개발자가 되고 싶습니다.',
  },
  {
    label: '노트',
    title: '플레이어의 말을 듣습니다',
    body: '완성 전 빌드를 삼성 임직원분들께 미리 배포해 피드백을 받았고, 그 의견으로 스테이지를 추가하고 선물 상자 크기를 키우는 식으로 반영했습니다. 만들고 끝내지 않고, 써 본 사람의 말로 고칩니다.',
  },
  { label: '상자', title: '만들어 온 것들', body: null },
  { label: '노트북', title: '함께 만들어 보고 싶습니다', body: null },
] as const;

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function RoomHero() {
  const fallback = useSyncExternalStore(subscribeFallback, getFallback, () => true);
  if (fallback) return <Hero />;
  return <RoomHeroInner />;
}

function Card({ index, progress, narrow, right, children }: { index: number; progress: MotionValue<number>; narrow: boolean; right: boolean; children: React.ReactNode }) {
  const c = index / (STAGES - 1);
  const xs = [c - 0.075, c - HOLD, c + HOLD, c + 0.075];
  const o = clampRange(xs, [0, 1, 1, 0]);
  const opacity = useTransform(progress, o.xs, o.ys);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? 'auto' : 'none'));
  const pos = narrow ? 'inset-x-4 bottom-6' : `${right ? 'right-[5%]' : 'left-[5%]'} top-1/2 -translate-y-1/2 w-[min(440px,42vw)]`;
  return (
    <motion.div style={{ opacity, pointerEvents }} className={`absolute z-10 rounded-3xl border border-white/40 bg-white/90 p-6 shadow-xl backdrop-blur-md sm:p-8 ${pos}`}>
      {children}
    </motion.div>
  );
}

function RoomHeroInner() {
  const { hero } = portfolioData;
  const period = useSyncExternalStore(subscribeNone, (): Period => currentPeriod(), () => null);
  const size = useSyncExternalStore(subscribeResize, getSize, () => '1440x900');
  const [vw, vh] = size.split('x').map(Number);
  const narrow = vw < NARROW;

  const ref = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [greeting, setGreeting] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.6 });

  // 사진이 뜨면 인삿말이 나오고, 잠시 뒤(또는 스크롤하면 바로) 블러가 걷히며 방이 드러난다
  useEffect(() => {
    if (!loaded) return;
    const timers = [setTimeout(() => setGreeting(true), 500), setTimeout(() => setRevealed(true), 7000)];
    const skip = () => setRevealed(true);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchmove', skip, { passive: true });
    window.addEventListener('keydown', skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [loaded]);

  // 단계별 확대·이동 값
  const focus = useMemo(() => Array.from({ length: STAGES }, (_, k) => focusFor(k, vw, vh)), [vw, vh]);
  const keys = useMemo(() => {
    const xs: number[] = [];
    const idx: number[] = [];
    for (let k = 0; k < STAGES; k++) {
      const c = k / (STAGES - 1);
      xs.push(c - HOLD, c + HOLD);
      idx.push(k, k);
    }
    return { xs, idx };
  }, []);
  const build = (pick: (f: ReturnType<typeof focusFor>) => number) => clampRange(keys.xs, keys.idx.map((k) => pick(focus[k])));
  const sc = build((f) => f.s);
  const tx = build((f) => f.x);
  const ty = build((f) => f.y);
  const scale = useTransform(p, sc.xs, sc.ys);
  const x = useTransform(p, tx.xs, tx.ys);
  const y = useTransform(p, ty.xs, ty.ys);

  const hintOpacity = useTransform(p, [0, 0.04], [1, 0]);
  const introOpacity = useTransform(p, [0, 0.06, 0.1], [1, 1, 0]);

  const goTo = (k: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (k / (STAGES - 1)) * range, behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={ref} className="relative h-[560vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* 방 사진 + 클릭 영역: 스크롤에 따라 확대·이동 */}
        {period && (
          <motion.div
            style={{ scale, x, y, width: 'max(100vw, calc(100vh * 1.7917))', aspectRatio: '1376 / 768', translate: '-50% -50%' }}
            className="absolute left-1/2 top-1/2 will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/room/${PERIOD_IMAGE[period]}.png`}
              alt="시간대에 따라 달라지는 작업실"
              onLoad={() => setLoaded(true)}
              draggable={false}
              className="h-full w-full select-none transition-[filter] duration-[2200ms] ease-out"
              style={{ filter: revealed ? 'none' : 'blur(16px) brightness(0.55)' }}
            />
            {revealed &&
              SPOTS.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => goTo(i + 1)}
                  aria-label={`${s.label} 보기`}
                  className="group absolute rounded-2xl"
                  style={{ left: `${(s.x - s.w / 2) * 100}%`, top: `${(s.y - s.h / 2) * 100}%`, width: `${s.w * 100}%`, height: `${s.h * 100}%` }}
                >
                  <span className="absolute inset-0 rounded-2xl ring-2 ring-white/0 transition-all duration-300 group-hover:bg-white/10 group-hover:ring-white/70" />
                  <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-[0_0_0_4px_rgba(255,255,255,0.35)] animate-pulse" />
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-800 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                    {s.label}
                  </span>
                </button>
              ))}
          </motion.div>
        )}

        {/* 오프닝: 희미한 방 위에 인삿말 */}
        <AnimatePresence>
          {period && loaded && greeting && !revealed && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6 }}
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
            >
              <p className="max-w-2xl whitespace-pre-line break-keep font-serif text-2xl font-medium leading-relaxed sm:text-4xl sm:leading-relaxed">{GREETING[period]}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 로딩 */}
        <AnimatePresence>
          {!loaded && (
            <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 z-30 flex items-center justify-center bg-black text-sm font-medium text-white/50">
              방을 정리하는 중…
            </motion.div>
          )}
        </AnimatePresence>

        {/* 0단계: 소개 */}
        {revealed && (
          <motion.div
            style={{ opacity: introOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`pointer-events-none absolute z-10 rounded-3xl bg-black/45 p-6 text-white backdrop-blur-sm sm:p-8 ${narrow ? 'inset-x-4 bottom-20' : 'bottom-16 left-[5%] w-[min(520px,46vw)]'}`}
          >
            <h1 className="whitespace-pre-line break-keep text-xl font-extrabold leading-snug tracking-tight sm:text-3xl">{hero.headline}</h1>
            <p className="mt-3 text-sm text-white/80">게임 클라이언트 개발자 진준영 · 스크롤하면 이 방을 둘러볼 수 있어요</p>
          </motion.div>
        )}

        {/* 1~5단계: 특징 카드 */}
        {TRAITS.map((t, i) => (
          <Card key={t.label} index={i + 1} progress={p} narrow={narrow} right={focus[i + 1].cardRight}>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{String(i + 1).padStart(2, '0')} · {t.label}</p>
            <h2 className="mb-3 text-xl font-extrabold text-slate-900 sm:text-2xl">{t.title}</h2>
            {t.body && <p className="text-sm leading-relaxed text-slate-600 break-keep">{t.body}</p>}
            {i === 3 && (
              <>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  <li><b className="text-slate-900">자본주 E.T.</b> · 2D 러너 금융 게임 <span className="text-amber-600">(핀테크 트랙 우수상 · 팀)</span></li>
                  <li><b className="text-slate-900">GIFTED</b> · 3D 포장 액션 캐주얼 게임</li>
                  <li><b className="text-slate-900">개소릴레이</b> · React 실시간 웹소켓 게임</li>
                  <li><b className="text-slate-900">SSAIET</b> · 식단·커뮤니티 웹 서비스</li>
                </ul>
                <button type="button" onClick={() => scrollToId('#projects')} className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-black">
                  프로젝트 자세히 보기 <ArrowDown size={15} />
                </button>
              </>
            )}
            {i === 4 && (
              <>
                <p className="mb-4 text-sm leading-relaxed text-slate-600 break-keep">배틀그라운드 패치 노트에 제가 고친 한 줄이 들어가는 것이 목표입니다.</p>
                <div className="flex flex-wrap gap-2">
                  <a href={hero.cta.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-black">
                    <Github size={16} /> GitHub
                  </a>
                  <a href={hero.cta.velogUrl || 'https://velog.io/@junemay31/posts'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
                    Velog
                  </a>
                  <a href="mailto:junemay31@naver.com" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-100">
                    <Mail size={16} /> Email
                  </a>
                </div>
              </>
            )}
          </Card>
        ))}

        {/* 스크롤 안내 + 건너뛰기 */}
        {revealed && (
          <>
            <motion.div style={{ opacity: hintOpacity }} className="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
              SCROLL
              <ArrowDown size={16} className="animate-bounce" />
            </motion.div>
            <button
              type="button"
              onClick={() => scrollToId('#about')}
              className="absolute right-5 top-20 z-10 rounded-full bg-black/40 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-black/60"
            >
              바로 내용 보기 ↓
            </button>
          </>
        )}
      </div>
    </section>
  );
}
