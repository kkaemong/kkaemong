'use client';

import { useEffect, useRef } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import SignatureHero, { STROKES as SIGNATURE } from '@/components/SignatureHero';

// 인터랙티브 첫 장면: 첫 화면과 똑같이 왼쪽에 서명과 소개 글이 있다가, 스크롤을 내리면 서명이 납작해지며 땅(선 하나)으로 내려앉고, 그 선을 연필을 쥔 손이 이어 그으며 솟아올라 내 캐릭터가 된다.
// 연필을 쥔 손이 선 끝을 따라다니며 그린다. 스크롤 위치(0~1)가 곧 그린 정도이므로 올리면 다시 지워진다.
// 좌표는 1600 x 900 화면 기준이고, 캐릭터는 480 x 420 짜리 그림을 키워서(S) 땅 위(GROUND)에 세운다.
const INK = 'currentColor';
const GROUND = 714;
const S = 1.0; // 캐릭터 확대 비율
// 납작해진 서명의 가운데 가로 위치(0이면 왼쪽 끝). 이 값만 바꾸면 서명, 땅의 시작, 캐릭터 위치가 모두 따라 움직인다.
const SIG_X = 0;
const SIG_HALF = 250; // 납작해진 서명의 절반 폭
const GROUND_START = SIG_X + SIG_HALF; // 서명이 끝나는 점: 여기서부터 땅이 이어지고 바로 캐릭터가 그려진다
const LEAD_IN = 40; // 땅이 시작해서 캐릭터 몸이 올라오기까지의 짧은 거리
const CX = GROUND_START + LEAD_IN - 166; // 캐릭터 그림의 왼쪽 위치(몸의 왼쪽 밑이 땅 시작점 바로 옆에 온다)
const CY = GROUND - 384 * S; // 그림 속 바닥(y=384)이 땅에 닿도록
const HAND_SCALE = 0.27;
const HAND_TIP = { x: 144, y: 214 }; // hand-pen.png(1400 x 2600) 안의 연필 끝

// 캐릭터 몸 윤곽(그림 좌표)
const BODY_LEFT_X = 166;
const HAIR = 'M196 132 C206 100 256 92 290 122 C262 108 232 114 212 142 C206 144 200 138 196 132 Z';
const EYE_L = 'M226 152 L226.2 152';
const EYE_R = 'M262 150 L262.2 150';
const BROW_L = 'M212 138 C218 134 230 134 238 138';
const BROW_R = 'M250 136 C256 132 268 132 276 136';
const SMILE = 'M232 182 C242 192 260 192 270 180';
const TUFT = 'M232 98 C226 76 250 68 258 84';
const BODY_RIGHT_X = 300; // 몸의 오른쪽 아래 끝(여기서부터 오른쪽 땅이 시작된다)
const BODY_FWD = 'M166 384 C174 336 178 284 172 232 C166 196 172 156 196 130 C214 110 262 104 288 128 C306 146 306 188 298 232 C292 280 292 340 300 384';
const ARM_L1 = 'M180 214 C160 238 140 270 122 318';
const ARM_L2 = 'M172 268 C160 292 146 312 136 330';
const HAND_L = 'M122 318 C114 322 112 334 118 342 M126 322 L124 350 M134 328 L136 354 M142 332 L148 352 M136 330 C148 334 152 346 148 354 C140 358 128 356 124 350';
const ARM_R1 = 'M290 200 C324 214 356 236 384 268';
const ARM_R2 = 'M298 258 C326 270 352 288 372 306';
const HAND_R = 'M384 268 C394 262 404 266 408 276 M390 276 L410 300 M382 280 L396 304 M374 286 L380 308 M372 306 C376 316 388 316 396 304';

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const ease = (t: number) => 0.5 - Math.cos(Math.PI * clamp01(t)) / 2;

// 서명이 땅으로 내려앉는 구간(0 ~ T_START), 그 뒤로 손이 그리는 구간(T_START ~ T_END)
const T_START = 0.22;
const T_END = 0.93;
const remap = (t: number) => T_START + ((t - 0.1) / 0.8) * (T_END - T_START);

// 서명의 시작(크게, 화면 가운데)과 끝(작고 납작하게, 땅 위)의 위치와 크기
const SIG_CENTER = { x: 565, y: 380 }; // 서명 그림 안의 중심
// 서명의 시작 자리와 크기는 첫 화면의 서명을 실제로 재서 정한다(화면 크기가 달라도 똑같이 보이도록). 아래는 재기 전의 기본값.
const SIG_FROM_DEFAULT = { x: 352, y: 367, sx: 0.514, sy: 0.514 };
const SIG_TO = { x: SIG_X, y: GROUND, sx: 0.5, sy: 0.012 }; // 화면 왼쪽 끝으로 내려앉는다(오른쪽 끝이 땅의 시작)


type Piece = { d: string; local: boolean; from: number; to: number; face?: boolean };
const gx = (x: number) => CX + x * S;
// 서명이 닿은 왼쪽 끝에서 손이 나와 짧게 땅을 잇고, 몸과 팔과 손을 먼저 다 그린 다음(얼굴까지), 그 뒤에 오른쪽으로 땅을 길게 긋는다
const RAW_PIECES: Piece[] = [
  { d: `M${GROUND_START} ${GROUND} H${gx(BODY_LEFT_X)}`, local: false, from: 0.1, to: 0.18 },
  { d: BODY_FWD, local: true, from: 0.18, to: 0.38 },
  { d: ARM_L1, local: true, from: 0.38, to: 0.43 },
  { d: ARM_L2, local: true, from: 0.43, to: 0.46 },
  { d: HAND_L, local: true, from: 0.46, to: 0.51 },
  { d: ARM_R1, local: true, from: 0.51, to: 0.56 },
  { d: ARM_R2, local: true, from: 0.56, to: 0.59 },
  { d: HAND_R, local: true, from: 0.59, to: 0.64 },
  // 얼굴도 손이 그린다: 앞머리 -> 눈 -> 눈썹 -> 웃는 입 -> 삐죽한 머리카락
  { d: HAIR, local: true, from: 0.64, to: 0.68 },
  { d: EYE_L, local: true, from: 0.68, to: 0.69 },
  { d: EYE_R, local: true, from: 0.69, to: 0.7 },
  { d: BROW_L, local: true, from: 0.7, to: 0.71 },
  { d: BROW_R, local: true, from: 0.71, to: 0.72 },
  { d: SMILE, local: true, from: 0.72, to: 0.74 },
  { d: TUFT, local: true, from: 0.74, to: 0.76 },
  // 몸을 다 그린 뒤, 몸의 오른쪽 끝에서 땅을 오른쪽으로 긋는다
  { d: `M${gx(BODY_RIGHT_X)} ${GROUND} H1700`, local: false, from: 0.78, to: 0.9 },
];
// 몸을 그리는 동안 나오는 말풍선 대신의 멘트: [글, 나타나기 시작, 사라지는 끝] (그리는 구간 0.1~0.9 기준)
const SPEECH = [
  { text: '안녕하세요,', from: 0.18, to: 0.3 },
  { text: '반갑습니다.', from: 0.3, to: 0.46 },
  { text: '시작해보겠습니다.', from: 0.46, to: 0.66 },
] as const;
// 몸을 다 그린 뒤 캐릭터가 땅을 따라 오른쪽으로 걸어간다(앞에서 손이 땅을 그어 준다)
const WALK_MAX = 640; // 걸어가는 최대 거리
const WALK_RATIO = 0.5; // 땅이 그어진 길이 중 캐릭터가 걸은 비율(1보다 작아야 캐릭터가 항상 손 뒤에 있다)
const HOLE_INSET = 2; // 땅이 몸 아래 끝 선과 이어지도록, 비우는 폭을 몸 폭보다 양쪽으로 이만큼 좁게 한다(키우면 땅이 몸 안쪽으로 더 들어간다)
const STEP = 0.045; // 값이 클수록 걸음이 잦다
const SWING = 9; // 걸을 때 팔이 흔들리는 각도
const SHOULDER_L = { x: 176, y: 226 };
const SHOULDER_R = { x: 294, y: 214 };
const HAIR_FILL_FROM = remap(0.66); // 앞머리 윤곽을 거의 그리면 속이 채워진다
const HAIR_FILL_TO = remap(0.68);
const PIECES: Piece[] = RAW_PIECES.map((pc) => ({ ...pc, from: remap(pc.from), to: remap(pc.to) }));

export default function LineScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const lens = useRef<number[]>([]);
  const handRef = useRef<SVGGElement>(null);
  const faceRef = useRef<SVGGElement>(null);
  const charRef = useRef<SVGGElement>(null); // 캐릭터 전체(걸을 때 함께 움직인다)
  const gapRef = useRef<SVGPathElement>(null);
  const holeRef = useRef<SVGRectElement>(null); // 땅에서 캐릭터 밑을 비워 두는 가림막(걸어가도 밑에는 땅이 없다)
  const swingRefs = useRef<(SVGGElement | null)[]>([]); // 팔을 어깨 중심으로 흔들기 위한 묶음
  const speechRefs = useRef<(SVGTextElement | null)[]>([]);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const sigRef = useRef<SVGGElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const from = useRef({ ...SIG_FROM_DEFAULT });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const update = (p: number) => {
    const hand = handRef.current;
    if (!hand || lens.current.length !== PIECES.length) return;

    // 각 선을 그린 만큼 보여 준다
    let tip: { x: number; y: number } | null = null;
    let prev: { x: number; y: number } | null = null; // 이미 다 그린 마지막 선의 끝(그리는 선이 없는 사이에 손이 머무는 자리)
    PIECES.forEach((pc, i) => {
      const el = pathRefs.current[i];
      if (!el) return;
      const local = clamp01((p - pc.from) / (pc.to - pc.from));
      el.style.strokeDashoffset = `${lens.current[i] * (1 - local)}`;
      if (local >= 1) {
        const e = el.getPointAtLength(lens.current[i]);
        prev = pc.local ? { x: gx(e.x), y: CY + e.y * S } : { x: e.x, y: e.y };
      }
      if (local > 0 && local < 1) {
        const pt = el.getPointAtLength(lens.current[i] * local);
        tip = pc.local ? { x: gx(pt.x), y: CY + pt.y * S } : { x: pt.x, y: pt.y };
      }
    });

    // 얼굴은 선을 다 그린 뒤 은은하게 나타난다
    // 걷기: 땅을 그은 길이에 따라 캐릭터가 옆으로 가고, 몸이 살짝 늘었다 줄며 기울고, 팔을 흔든다
    const gi = PIECES.length - 1;
    const gp = clamp01((p - PIECES[gi].from) / (PIECES[gi].to - PIECES[gi].from));
    const walk = Math.min(gp * (1700 - gx(BODY_RIGHT_X)) * WALK_RATIO, WALK_MAX);
    const phase = Math.sin(walk * STEP);
    const stretch = walk > 0 ? 1 + Math.abs(phase) * 0.03 : 1; // 발은 땅에 붙인 채 몸만 살짝 늘었다 줄었다 한다(떠오르지 않는다)
    const lean = walk > 0 ? phase * 2.2 : 0;
    charRef.current?.setAttribute('transform', `translate(${walk} 0) translate(0 ${GROUND}) scale(1 ${stretch}) translate(0 ${-GROUND}) rotate(${lean} ${gx(233)} ${GROUND})`);
    // 캐릭터가 서 있는 바로 그 밑만 땅을 가린다(걸어가도 밑에는 땅이 없고, 지나간 뒤쪽에는 땅이 있다)
    holeRef.current?.setAttribute('x', `${gx(BODY_LEFT_X) + walk + HOLE_INSET}`);
    // 서 있던 자리의 땅은 캐릭터가 비켜나는 만큼 왼쪽부터 드러난다
    if (gapRef.current) gapRef.current.style.strokeDashoffset = `${1 - clamp01(walk / (gx(BODY_RIGHT_X) - gx(BODY_LEFT_X)))}`;
    const sw = walk > 0 ? phase * SWING : 0;
    swingRefs.current.forEach((g, i) => {
      if (!g) return;
      const left = i < 3; // 앞의 세 개는 왼팔, 나머지는 오른팔
      const pv = left ? SHOULDER_L : SHOULDER_R;
      g.setAttribute('transform', `rotate(${left ? sw : -sw} ${pv.x} ${pv.y})`);
    });

    // 멘트: 몸을 그리는 동안 차례로 나타났다 사라진다
    SPEECH.forEach((sp, i) => {
      const el = speechRefs.current[i];
      if (!el) return;
      const a = remap(sp.from);
      const b = remap(sp.to);
      const fade = (b - a) * 0.25;
      el.style.opacity = `${Math.min(clamp01((p - a) / fade), clamp01((b - p) / fade))}`;
    });

    if (faceRef.current) faceRef.current.style.opacity = `${clamp01((p - HAIR_FILL_FROM) / (HAIR_FILL_TO - HAIR_FILL_FROM))}`;

    // 손: 그리는 동안 선 끝에 붙어 있고, 다 그리면 오른쪽 아래로 빠진다
    // 서명이 왼쪽 끝에 닿을 즈음 손이 왼쪽 아래에서 올라와 땅의 시작점에 연필을 대고, 그 뒤 오른쪽으로 그려 나간다
    const ENTER_FROM = T_START - 0.08;
    const drawing = p > ENTER_FROM && p < T_END;
    let x = 1700;
    let y = 1000;
    if (tip) {
      ({ x, y } = tip);
    } else if (p >= T_END) {
      const out = clamp01((p - T_END) / (1 - T_END));
      x = gx(396) + out * 500;
      y = CY + 316 * S + out * 500;
    } else if (prev && p > T_START) {
      ({ x, y } = prev);
    } else if (p > ENTER_FROM) {
      const e = ease((p - ENTER_FROM) / (T_START - ENTER_FROM));
      x = -250 + (GROUND_START + 250) * e;
      y = GROUND + 420 * (1 - e);
    } else {
      x = -300;
      y = GROUND + 420;
    }
    hand.style.opacity = drawing || (p >= T_END && p < 1) ? '1' : '0';
    hand.setAttribute('transform', `translate(${x} ${y}) scale(${HAND_SCALE}) translate(${-HAND_TIP.x} ${-HAND_TIP.y})`);

    // 큰 서명이 작아지고 납작해지며 땅으로 내려앉는다
    const k = ease((p - 0.05) / (T_START - 0.05 - 0.03));
    const lerp = (a: number, b: number) => a + (b - a) * k;
    if (sigRef.current) {
      sigRef.current.setAttribute(
        'transform',
        `translate(${lerp(from.current.x, SIG_TO.x)} ${lerp(from.current.y, SIG_TO.y)}) scale(${lerp(from.current.sx, SIG_TO.sx)} ${lerp(from.current.sy, SIG_TO.sy)}) translate(${-SIG_CENTER.x} ${-SIG_CENTER.y})`
      );
      // 땅 선이 이어지기 시작하면 서명은 그 선 속으로 사라진다
      // 서명이 땅에 완전히 닿으면 곧은 선으로 바로 바뀐다(중간에 섞이지 않는다)
      const swap = k >= 0.999 ? 1 : 0;
      sigRef.current.style.opacity = `${1 - swap}`;
      if (lineRef.current) lineRef.current.style.opacity = `${swap}`;
    }
    if (capRef.current) capRef.current.style.opacity = `${1 - clamp01((p - 0.02) / 0.07)}`;
    if (hintRef.current) hintRef.current.style.opacity = `${1 - clamp01(p / 0.05)}`;
  };

  // 첫 화면에 있던 서명(위에 겹쳐 둔 것)의 실제 위치와 크기를 재서, 장면 속 서명이 정확히 그 자리에서 시작하게 한다
  useEffect(() => {
    const measure = () => {
      const svg = svgRef.current;
      const box = heroRef.current?.querySelector('svg');
      const ctm = svg?.getScreenCTM();
      if (!svg || !box || !ctm) return;
      const r = box.getBoundingClientRect();
      const a = r.width / 1161; // 서명 그림(viewBox 폭 1161)이 화면에서 몇 배로 보이는지
      const inv = ctm.inverse();
      const c = new DOMPoint(r.left + SIG_CENTER.x * a, r.top + (SIG_CENTER.y - 130) * a).matrixTransform(inv);
      from.current = { x: c.x, y: c.y, sx: a / ctm.a, sy: a / ctm.a };
      update(scrollYProgress.get());
    };
    measure();
    const t = window.setTimeout(measure, 300);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    lens.current = pathRefs.current.map((el) => (el ? el.getTotalLength() : 0));
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.strokeDasharray = `${lens.current[i]}`;
      el.style.strokeDashoffset = `${lens.current[i]}`;
    });
    update(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', update);

  return (
    <section ref={sectionRef} className="relative h-[480vh]" aria-label="소개 장면">
      <div className="sticky top-0 h-screen overflow-hidden">
        <svg ref={svgRef} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--l-ink, #1c1b19)' }}>
          {/* 서명: 처음엔 크게 가운데에 있다가 스크롤에 따라 땅 선으로 내려앉는다 */}
          <g ref={sigRef} transform={`translate(${SIG_FROM_DEFAULT.x} ${SIG_FROM_DEFAULT.y}) scale(${SIG_FROM_DEFAULT.sx}) translate(${-SIG_CENTER.x} ${-SIG_CENTER.y})`} stroke={INK} strokeWidth="4.4" style={{ vectorEffect: 'non-scaling-stroke' }}>
            {SIGNATURE.map((seg) => (
              <path key={seg.d} d={seg.d} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          {/* 서명이 내려앉아 변한 곧은 선(땅의 시작) */}
          <path ref={lineRef} d={`M${SIG_X - SIG_HALF} ${GROUND} H${GROUND_START}`} stroke={INK} strokeWidth="5" opacity="0" />

          <defs>
            <mask id="ground-hole" maskUnits="userSpaceOnUse" x="-500" y="0" width="3000" height="900">
              <rect x="-500" y="0" width="3000" height="900" fill="#fff" />
              <rect ref={holeRef} x={gx(BODY_LEFT_X) + HOLE_INSET} y="0" width={gx(BODY_RIGHT_X) - gx(BODY_LEFT_X) - 2 * HOLE_INSET} height="900" fill="#000" />
            </mask>
          </defs>

          {/* 땅: 스크롤에 따라 그려진다 */}
          <g stroke={INK} strokeWidth="5">
            {PIECES.map((pc, i) =>
              pc.local ? null : (
                <path
                  key={pc.d}
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  d={pc.d}
                  mask={i === PIECES.length - 1 ? 'url(#ground-hole)' : undefined}
                />
              )
            )}
          </g>

          {/* 캐릭터가 서 있던 자리의 땅: 캐릭터가 걸어 나가는 만큼 왼쪽부터 이어진다 */}
          <path ref={gapRef} d={`M${gx(BODY_LEFT_X)} ${GROUND} H${gx(BODY_RIGHT_X)}`} stroke={INK} strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />

          {/* 캐릭터: 몸과 팔과 얼굴. 다 그린 뒤에는 통째로 옆으로 걸어간다 */}
          <g ref={charRef}>
            <g transform={`translate(${CX} ${CY}) scale(${S})`} stroke={INK} strokeWidth={5 / S}>
              {PIECES.map((pc, i) => {
                if (!pc.local) return null;
                const arm = i >= 2 && i <= 7; // 팔과 손 여섯 개는 어깨를 중심으로 흔든다
                const path = (
                  <path
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                    d={pc.d}
                  />
                );
                return arm ? (
                  <g
                    key={pc.d}
                    ref={(el) => {
                      swingRefs.current[i - 2] = el;
                    }}
                  >
                    {path}
                  </g>
                ) : (
                  <g key={pc.d}>{path}</g>
                );
              })}
            </g>

            {/* 앞머리 속 채움: 윤곽을 그린 뒤 채워진다 */}
            <g ref={faceRef} opacity="0" transform={`translate(${CX} ${CY}) scale(${S})`}>
              <path d={HAIR} fill={INK} stroke="none" />
            </g>
          </g>

          {/* 몸을 그리는 동안 하는 말 */}
          <g fill={INK} stroke="none" fontSize="46" style={{ fontFamily: 'var(--font-hand)' }}>
            {SPEECH.map((sp, i) => (
              <text
                key={sp.text}
                ref={(el) => {
                  speechRefs.current[i] = el;
                }}
                x={gx(330)}
                y={CY + 70}
                opacity="0"
              >
                {sp.text}
              </text>
            ))}
          </g>

          {/* 연필을 쥔 손 */}
          <g ref={handRef} opacity="0">
            <image className="hand-img" href="/hand-pen.png" x="0" y="0" width="1400" height="2600" />
          </g>
        </svg>
        {/* 첫 화면의 서명과 소개 글을 그대로 겹쳐 둔다. 서명 선은 숨기고(장면 속 서명이 대신 그려진다) 글만 보인다. */}
        <div ref={capRef} className="pointer-events-none absolute inset-0">
          <div ref={heroRef} className="contents [&_svg]:opacity-0">
            <SignatureHero skip onDone={() => {}} className="absolute left-[4vw] top-[12vh] z-10 w-[min(78vw,420px)] md:top-1/2 md:w-[min(38vw,560px)] md:-translate-y-1/2" />
          </div>
        </div>
        <p ref={hintRef} className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-xs tracking-[0.5em]" style={{ color: 'var(--l-muted, #8a8780)' }}>
          SCROLL
        </p>
      </div>
    </section>
  );
}
