'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import SignatureHero, { STROKES as SIGNATURE } from '@/components/SignatureHero';
import { currentPeriod, type Period } from '@/lib/timeOfDay';

// 인터랙티브 첫 장면: 첫 화면과 똑같이 왼쪽에 서명과 소개 글이 있다가, 스크롤을 내리면 서명이 납작해지며 땅(선 하나)으로 내려앉고, 그 선을 연필을 쥔 손이 이어 그으며 솟아올라 내 캐릭터가 된다.
// 연필을 쥔 손이 선 끝을 따라다니며 그린다. 스크롤 위치(0~1)가 곧 그린 정도이므로 올리면 다시 지워진다.
// 좌표는 1600 x 900 화면 기준이고, 캐릭터는 480 x 420 짜리 그림을 키워서(S) 땅 위(GROUND)에 세운다.
const INK = 'currentColor';
const GROUND = 714;
const S = 0.8; // 캐릭터 확대 비율
const LINE_W = 4; // 땅과 캐릭터 선의 굵기(화면 기준)
// 납작해진 서명의 가운데 가로 위치(0이면 왼쪽 끝). 이 값만 바꾸면 서명, 땅의 시작, 캐릭터 위치가 모두 따라 움직인다.
const SIG_X = 0;
const SIG_HALF = 250; // 납작해진 서명의 절반 폭
const GROUND_START = SIG_X + SIG_HALF; // 서명이 끝나는 점: 여기서부터 땅이 이어지고 바로 캐릭터가 그려진다
const LEAD_IN = 40; // 땅이 시작해서 캐릭터 몸이 올라오기까지의 짧은 거리
const CX = GROUND_START + LEAD_IN - 166 * S; // 캐릭터 그림의 왼쪽 위치(몸의 왼쪽 밑이 땅 시작점 바로 옆에 온다)
const CY = GROUND - 384 * S; // 그림 속 바닥(y=384)이 땅에 닿도록
const HAND_SCALE = 0.22;
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
  { text: '안녕하세요,', from: 0.18, to: 0.27, size: 46 },
  { text: '반갑습니다.', from: 0.27, to: 0.35, size: 46 },
  { text: '인터랙티브 포트폴리오를 선택해 주셔서 감사합니다.', from: 0.35, to: 0.5, size: 40 },
  { text: '', from: 0.5, to: 0.6, size: 44 }, // 지금 시간에 맞춘 인삿말(화면이 뜬 뒤에 채운다)
  { text: '그럼 제 이야기를 들려드리겠습니다.', from: 0.6, to: 0.74, size: 44 },
] as const;
const GREETING_AT = 3; // SPEECH 중 시간 인삿말 자리
// 지금 시간대에 맞춘 인삿말(?time=dawn|morning|noon|evening|night 로 미리 볼 수 있다)
const TIME_GREETING: Record<Period, string> = {
  dawn: '아직 세상이 잠든 새벽에 와 주셨네요.',
  morning: '좋은 아침이에요.',
  noon: '바쁜 한낮에 와 주셨네요.',
  evening: '노을 지는 저녁이에요.',
  night: '별이 뜬 밤이네요.',
};
// 몸을 다 그린 뒤 캐릭터가 땅을 따라 오른쪽으로 걸어간다(앞에서 손이 땅을 그어 준다)
const HOLE_INSET = 2; // 땅이 몸 아래 끝 선과 이어지도록, 비우는 폭을 몸 폭보다 양쪽으로 이만큼 좁게 한다(키우면 땅이 몸 안쪽으로 더 들어간다)
const STEP = 0.045; // 값이 클수록 걸음이 잦다
const SWING = 9; // 걸을 때 팔이 흔들리는 각도
const SHOULDER_L = { x: 176, y: 226 };
const SHOULDER_R = { x: 294, y: 214 };
// 땅을 다 그으면 오른쪽 끝에 필리핀 국기가 달린 학교가 이미 서 있고, 캐릭터가 끊기지 않고 걸어가 문으로 들어간다. 안으로 사라진 뒤 다음 장면으로 넘어간다.
const VH_TOTAL = 2420; // 전체 스크롤 길이(vh)
const SCENE_END = 700 / VH_TOTAL; // 앞의 그리기·걷기 장면이 끝나는 지점
const F_END = 1140 / VH_TOTAL; // 비행기 장면(3살에 필리핀으로)이 끝나는 지점
const RAMP_X = [502, 652] as const; // 비행기 탑승 계단의 아래·위 가로 위치(위쪽 끝이 문 바로 앞)
const RAMP_RISE = 70; // 계단을 올라가는 높이
const RAMP_STEPS = 4;
const SHOW_FOOT_LINE = true; // 계단을 오르내리는 동안 캐릭터 발밑에 줄을 그린다(false로 하면 줄이 없다)
// 계단을 한 칸씩 올라간다(칸 사이는 부드럽게 올라선다)
const stairRise = (e: number) => {
  const x = clamp01(e) * RAMP_STEPS;
  const i = Math.min(Math.floor(x), RAMP_STEPS - 1);
  return (RAMP_RISE / RAMP_STEPS) * (i + ease(x - i));
};
const W1 = 150; // 첫 장면에서 땅을 긋는 동안 캐릭터가 걷는 거리(그 뒤 비행기가 있는 곳까지 화면이 흐르며 계속 걷는다)
const W_RAMP = RAMP_X[0] - (CX + 233 * S); // 탑승 계단 아래에 닿을 때의 걸음 위치
const S2_END = 1940 / VH_TOTAL; // 필리핀 장면이 끝나는 지점(그 뒤가 대학 졸업 -> 코딩 -> 싸피 장면)
const PAN_MAX = 1500; // 풍경이 왼쪽으로 흘러가는 거리(클수록 오른쪽으로 멀리 가는 느낌)
const DOOR_SCREEN_X = 800; // 캐릭터가 학교로 들어갈 때 문이 화면에서 서는 자리(가운데)
const SCHOOL_X = DOOR_SCREEN_X + PAN_MAX;
const PLANE_PAN = 2800; // 비행기가 있는 곳까지 풍경이 흘러가는 거리(클수록 비행기까지 멀리 걷는다)
const PLANE_X = DOOR_SCREEN_X + PLANE_PAN; // 비행기가 서 있는 자리(풍경 좌표) // 학교 문의 가운데(풍경 좌표: 처음엔 화면 오른쪽 밖 멀리 있고, 풍경이 흘러오며 들어온다)
const DOOR_WALK = SCHOOL_X - PAN_MAX - (CX + 233 * S); // 캐릭터(화면 기준)가 학교 문까지 걸어가는 거리
const SV = 800; // 필리핀 장면의 스크롤 길이(vh)
const qv = (vh: number) => vh / SV; // vh -> 필리핀 장면의 진행 정도(q)
const Q_DOOR = qv(240); // 캐릭터가 문에 닿는 때(이때부터 학교 안으로 들어간다)
const DOOR_FADE = qv(32); // 문 안으로 들어가고 나오는 데 걸리는 길이
const ENTER_WALK = -950; // 다음 장면에서 왼쪽 화면 밖에서 시작하는 걸음 위치
// 이야기 한 줄씩: 그림이 나올 때마다 한 줄이 나타났다가 사라지고 다음 줄이 나온다(스크롤 위치 기준)
const qT = (q: number) => F_END + q * (S2_END - F_END); // 필리핀 장면의 진행 정도 -> 스크롤 위치
const rT = (r: number) => S2_END + r * (1 - S2_END); // 그 뒤 장면의 진행 정도 -> 스크롤 위치
const FS = F_END - SCENE_END;
const BEAT_FADE = 0.012; // 나타나고 사라지는 데 걸리는 스크롤 길이
const BEATS = [
  { text: '저를 따라오세요.', a: SCENE_END * 0.9, b: SCENE_END + 0.1 * FS },
  { text: '제 이야기는 어렸을 때부터 시작됩니다.', a: SCENE_END + 0.14 * FS, b: SCENE_END + 0.4 * FS },
  { text: '저는 3살 때 필리핀으로 이민 갔습니다.', a: SCENE_END + 0.44 * FS, b: qT(qv(64)) },
  { text: '낯선 말과 낯선 문화 속에서, 하나씩 배우며 자랐습니다.', a: qT(qv(64)), b: qT(qv(190)) },
  { text: '그곳에서 자유롭게 지냈습니다.', a: qT(qv(190)), b: qT(qv(240)) },
  { text: '초등학교도 다니고,', a: qT(qv(240)), b: qT(qv(335)) },
  { text: '농구도 하고,', a: qT(qv(335)), b: qT(qv(540)) },
  { text: '친구랑 PC방에 가서 게임도 했죠.', a: qT(qv(540)), b: qT(qv(760)) },
  { text: '한국으로 돌아와 중·고등학교를 다녔습니다.', a: qT(qv(764)), b: rT(0.16) },
  { text: '대학교를 졸업하고,', a: rT(0.31), b: rT(0.5) },
  { text: '코딩에 흥미가 생겨,', a: rT(0.5), b: rT(0.68) },
  { text: 'SSAFY 14기에 입과했습니다.', a: rT(0.68), b: 2 },
];
// 땅 위의 작은 풀(풍경이 흘러가는 걸 보여 준다): 땅이 그어진 곳에만 보인다
const TUFT_PATH = 'M0 0 L-9 -20 M0 0 L0 -26 M0 0 L9 -20';
const mapPath = (d: string, f: (x: number, y: number) => [number, number]) =>
  d.replace(/(-?\d+(?:\.\d+)?)[ ,](-?\d+(?:\.\d+)?)/g, (_, a: string, b: string) => {
    const [x, y] = f(Number(a), Number(b));
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });
const scaleMap = (ox: number, k: number) => (x: number, y: number): [number, number] => [ox + x * k, GROUND + y * k];
type Item = { kind: 'path' | 'text'; d?: string; from: number; to: number };
const SCHOOL = scaleMap(SCHOOL_X, 1);
const FLAG_W = 160; // 국기의 가로
const FLAG_H = 90; // 국기의 세로
// 학교(벽·지붕·문·창문·깃대·국기): 땅이 닿으면 이미 서 있다
const SCHOOL_LINES = [
  'M-190 0 L-190 -200 L190 -200 L190 0',
  'M-215 -200 L0 -290 L215 -200 Z',
  'M-40 0 L-40 -110 L40 -110 L40 0',
  'M-150 -170 L-100 -170 L-100 -120 L-150 -120 Z',
  'M100 -170 L150 -170 L150 -120 L100 -120 Z',
  'M0 -290 L0 -410',
  `M0 -410 L${FLAG_W} -410 L${FLAG_W} ${-410 + FLAG_H} L0 ${-410 + FLAG_H} Z`,
].map((d) => mapPath(d, SCHOOL));
// 필리핀 국기의 삼각형·가운데 선(국기가 태극기로 바뀔 때 함께 사라진다)
const PH_FLAG_LINES = [`M0 -410 L70 ${-410 + FLAG_H / 2} L0 ${-410 + FLAG_H}`, `M70 ${-410 + FLAG_H / 2} L${FLAG_W} ${-410 + FLAG_H / 2}`].map((d) => mapPath(d, SCHOOL));
// 태극기: 가운데 태극 무늬(위 빨강·아래 파랑)와 네 모서리의 괘(막대 셋)
const TG_CX = SCHOOL_X + FLAG_W / 2;
const TG_CY = GROUND - 410 + FLAG_H / 2;
const TG_R = 17;
const TG_BARS = [[-52, -22], [52, -22], [-52, 22], [52, 22]].flatMap(([dx, dy]) => {
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return [-5, 0, 5].map((o) => `M${TG_CX + dx + ux * o + uy * 9} ${TG_CY + dy + uy * o - ux * 9} L${TG_CX + dx + ux * o - uy * 9} ${TG_CY + dy + uy * o + ux * 9}`);
});
// 필리핀 장면 뒤: 캐릭터가 다시 오른쪽으로 나가고, 왼쪽에서 걸어 들어온다. 손이 졸업모, 노트북, 싸피 간판을 그리며 글로 이어 준다.
// 학교 문으로 들어간 캐릭터가 교복을 입고 다시 나와 오른쪽으로 걸어 나간다(그 뒤 장면은 r 0.2부터)
const R = (t: number) => 0.2 + 0.8 * t; // 뒤 장면의 시간을 학교에서 나오는 구간만큼 뒤로 민다
const R_OUT = [0.06, 0.2] as const; // 교복 입은 모습으로 문에서 나와 오른쪽 화면 밖으로 걸어 나가는 구간
const OUT_WALK = 2000 - (CX + 233 * S); // 오른쪽 화면 밖으로 나갈 때까지의 걸음 거리
const STOP3_WALK = 0; // 세 번째 장면에서 캐릭터가 서는 자리
const R_ENTER = [R(0.1), R(0.3)] as const; // 왼쪽에서 걸어 들어오는 구간
const CAP_X = 650;
const LAPTOP_X = 960;
const SIGN_X = 1330;
const SIGN_TEXT = { text: 'SSAFY 14기', x: SIGN_X - 190 + 34, y: GROUND - 250, w: 345 };
const SCENE3_RAW: Item[] = [
  // 졸업모: 모자판 -> 모자 -> 술
  { kind: 'path', d: mapPath('M-110 -80 L0 -120 L110 -80 L0 -40 Z', scaleMap(CAP_X, 1.4)), from: 0.3, to: 0.34 },
  { kind: 'path', d: mapPath('M-60 -62 L-60 -20 C-60 0 60 0 60 -20 L60 -62', scaleMap(CAP_X, 1.4)), from: 0.34, to: 0.37 },
  { kind: 'path', d: mapPath('M100 -76 L100 -14', scaleMap(CAP_X, 1.4)), from: 0.37, to: 0.39 },
  { kind: 'path', d: mapPath('M100 -14 L92 6 M100 -14 L108 6', scaleMap(CAP_X, 1.4)), from: 0.39, to: 0.4 },
  // 노트북: 화면 -> 받침 -> < > /
  { kind: 'path', d: mapPath('M-120 -170 L120 -170 L120 -30 L-120 -30 Z', scaleMap(LAPTOP_X, 1.1)), from: 0.44, to: 0.49 },
  { kind: 'path', d: mapPath('M-150 -30 L-135 0 L135 0 L150 -30', scaleMap(LAPTOP_X, 1.1)), from: 0.49, to: 0.51 },
  { kind: 'path', d: mapPath('M-30 -125 L-62 -100 L-30 -75', scaleMap(LAPTOP_X, 1.1)), from: 0.51, to: 0.53 },
  { kind: 'path', d: mapPath('M30 -125 L62 -100 L30 -75', scaleMap(LAPTOP_X, 1.1)), from: 0.53, to: 0.55 },
  { kind: 'path', d: mapPath('M10 -135 L-10 -65', scaleMap(LAPTOP_X, 1.1)), from: 0.55, to: 0.57 },
  // 싸피 간판: 판 -> 기둥 -> 글씨
  { kind: 'path', d: mapPath('M-190 -330 L190 -330 L190 -210 L-190 -210 Z', scaleMap(SIGN_X, 1)), from: 0.62, to: 0.7 },
  { kind: 'path', d: mapPath('M0 -210 L0 0', scaleMap(SIGN_X, 1)), from: 0.7, to: 0.74 },
  { kind: 'text', from: 0.74, to: 0.84 },
];
const SCENE3: Item[] = SCENE3_RAW.map((it) => ({ ...it, from: R(it.from), to: R(it.to) }));
// 교복: 문에서 나올 때만 입는다(옷깃·넥타이·단추)
// 교복(그림 좌표): 평소 캐릭터 위에 덧그린다
const UNIFORM_LINES = [
  'M176 224 C196 240 214 250 233 276', // 조끼 브이넥 왼쪽
  'M290 224 C270 240 252 250 233 276', // 조끼 브이넥 오른쪽
  'M170 338 C200 345 266 345 293 338', // 조끼 밑단 골지(위)
  'M169 352 C200 359 266 359 294 352', // 조끼 밑단 골지(아래)
  'M255 286 L255 306 M255 296 L269 284 M255 296 L269 308', // 조끼 가슴의 K
];
const UNIFORM_COLLAR = ['M200 236 L229 252 L210 268 Z', 'M266 236 L237 252 L256 268 Z']; // 셔츠 깃(배경색으로 채운다)
const UNIFORM_TIE = 'M228 250 L238 250 L236 260 L230 260 Z M230 260 L223 290 L233 306 L243 290 L236 260 Z'; // 넥타이(매듭 + 몸)
// 소매 끝단(커프스): 팔과 함께 흔들리도록 팔 묶음 안에 넣는다
const UNIFORM_CUFF: Record<number, string> = {
  4: 'M129 303 L146 318 M123 312 L140 327',
  7: 'M358 252 L350 293 M370 259 L362 300',
};
// 팔 안쪽도 배경색으로 채워, 학교 같은 뒤의 그림이 팔 사이로 비치지 않게 한다(소매+손)
const ARM_FILL = [
  'M180 214 C160 238 140 270 122 318 C114 322 112 334 118 342 L124 350 C128 356 140 358 148 354 C152 346 148 334 136 330 C146 312 160 292 172 268 Z',
  'M290 200 C324 214 356 236 384 268 C394 262 404 266 408 276 L410 300 L396 304 L372 306 C352 288 326 270 298 258 Z',
];
// 땅에 서 있는 비행기(오른쪽을 보고 있다): 학교와 만나는 자리(화면 가운데)에 있고, 캐릭터가 타면 창문에 얼굴이 보이며 날아간다
// 비행기: 사용자가 준 손그림(public/plane-line.png = 선, public/plane-fill.png = 안쪽). 선은 글자색, 안쪽은 배경색으로 칠해서 낮/밤 모드에 맞는다.
// 그림 좌표는 (바퀴 밑, 몸통 가운데 근처)를 원점으로 한 픽셀이고, PLANE_K배로 줄여서 쓴다.
const PLANE_IMG = { w: 1305, h: 560, ox: 660, oy: 548 };
const PLANE_K = 0.41; // 땅에 서 있는 비행기의 크기(그림 픽셀 -> 화면)
const PLANE_FOOT = 0; // 원점이 바퀴 밑이라 바로 땅에 닿는다
const F_WALK = 0.52; // 비행기가 있는 곳까지 걸어가는 구간(f 기준, 이 동안 풍경이 흘러간다)
const TAKEOFF = [0.72, 0.92] as const; // 비행기가 달려 날아오르는 구간(f 기준)
const BOARD = 0.14; // 캐릭터가 계단을 올라 비행기에 타는 데 걸리는 길이(f 기준)
// 필리핀 장면의 처음: 비행기가 왼쪽 위에서 내려와 땅에 닿아 멈추고, 캐릭터가 문에서 나와 계단을 내려온다
const LAND_X = 520; // 비행기가 멈추는 자리(풍경 좌표, 이때 풍경은 아직 흐르지 않는다)
// 땅 위의 작은 풀: 학교·비행기가 서 있는 동안만 그 자리를 비운다(그 자리를 지나갈 때 풀이 갑자기 사라지지 않게, 있을 때만 보이도록 묶어서 켜고 끈다)
const TUFT_ALL = Array.from({ length: 24 }, (_, i) => 520 + i * 290 + (i % 3) * 40);
const nearSchool = (x: number) => Math.abs(x - SCHOOL_X) <= 360;
const nearPlane = (x: number) => x - PLANE_X >= -310 && x - PLANE_X <= 290;
const nearLanded = (x: number) => x - LAND_X >= -310 && x - LAND_X <= 290;
const TUFT_SCHOOL = TUFT_ALL.filter(nearSchool); // 학교가 나오는 필리핀 장면에서만 비운다(비행기 장면에서는 풀이 있다)
const TUFT_PLANE = TUFT_ALL.filter((x) => !nearSchool(x) && nearPlane(x)); // 비행기가 서 있는 비행기 장면에서만 비운다
const TUFT_LANDED = TUFT_ALL.filter((x) => !nearSchool(x) && !nearPlane(x) && nearLanded(x)); // 비행기가 착륙해 서 있는 동안만 비운다
const TUFT_FREE = TUFT_ALL.filter((x) => !nearSchool(x) && !nearPlane(x) && !nearLanded(x));
const Q_LAND = [qv(8), qv(64)] as const; // 착륙하는 구간
const Q_STEP = [qv(88), qv(120)] as const; // 캐릭터가 문에서 나와 계단을 내려오는 구간
const EXIT_X = [LAND_X - 127, LAND_X - 17] as const; // 내려가는 계단의 위·아래 가로 위치(문 오른쪽 끝에서 시작)
// 학교에서 다시 나온 뒤: 농구 골대와 친구들이 있는 곳까지 풍경이 더 흘러가고, 슛을 한 다음 PC방으로 넘어간다
const Q_BACK = qv(300); // 학교 안에서 다시 나오는 때
const Q_BB = [qv(335), qv(420)] as const; // 농구 골대까지 걷는 구간(풍경이 더 흘러간다)
const Q_SHOT = [qv(480), qv(520)] as const; // 직접 던지지 않았을 때 저절로 슛하는 구간(공이 포물선으로 골대에 들어간다)
const Q_BBEND = qv(540); // 농구가 끝나고 PC방으로 걸어가기 시작하는 때(이때부터 공은 사라진다)
const Q_PW = [qv(535), qv(655)] as const; // PC방까지 걷는 구간(풍경이 더 흘러간다)
const Q_PDOOR = qv(655); // PC방 문에 닿는 때(이때부터 안으로 들어간다)
const Q_PC = [qv(680), qv(760)] as const; // PC방이 나오는 구간(들어오고 나가는 것 포함)
const Q_RESET = qv(700); // PC방이 화면을 다 덮은 뒤: 이때 풍경을 학교 앞으로 되돌린다
const Q_SWAP = [qv(764), qv(800)] as const; // 국기가 태극기로 바뀌고 건물이 좋아지는 구간
const BB_PAN = 850; // 농구 골대까지 풍경이 더 흘러가는 거리
const BB_BASE = PAN_MAX + BB_PAN; // 농구 장면에서 풍경이 흘러간 전체 거리
const HOOP_SCREEN = 1380; // 도착했을 때 골대가 화면에서 서는 자리
const BB_CHAR_SCREEN = 760; // 캐릭터가 서는 자리
const BB_WALK = BB_CHAR_SCREEN - (CX + 233 * S);
const HOOP_X = HOOP_SCREEN + BB_BASE; // 골대(풍경 좌표)
const PC_PAN = 1900; // 골대 다음 PC방까지 풍경이 더 흘러가는 거리
const PCB_X = DOOR_SCREEN_X + BB_BASE + PC_PAN; // PC방 문의 가운데(풍경 좌표)
// 농구공(사용자가 준 손그림): 슬링샷처럼 끌었다 놓아 던진다
const BALL_R = 32; // 공 반지름(클수록 큰 공)
const BALL_K = BALL_R / 368; // 공 그림(반지름 약 368px)을 줄이는 비율
const BALL_HAND = { x: BB_CHAR_SCREEN + 125 + BB_BASE, y: GROUND - 76 }; // 캐릭터 손(풍경 좌표)
// 골대: 사용자가 준 손그림(public/hoop-line.png). 정면에서 본 골대라서, 공이 림(타원) 안으로 위에서 떨어지면 들어간 것이다.
const HOOP_K = 0.34; // 골대 그림을 줄이는 비율(클수록 큰 골대)
const HOOP_IMG = { w: 745, h: 1060, ox: 378, oy: 1038 }; // 잘라낸 그림 크기와 원점(바닥 가운데)
const RIM_CX = HOOP_X - 10 * HOOP_K; // 림 가운데(그림에서 림의 위치를 골대 크기에 맞춰 계산한다)
const RIM_L = RIM_CX - 190 * HOOP_K; // 림의 왼쪽·오른쪽 끝
const RIM_R = RIM_CX + 190 * HOOP_K;
const RIM_Y = GROUND - 715 * HOOP_K; // 림 높이
const NET_BOTTOM = GROUND - 478 * HOOP_K; // 그물 아래
const GRAV = 1500; // 중력(px/s²)
const SHOT_K = 6; // 끈 길이 -> 던지는 속도
const MAX_DRAG = 220; // 최대로 끌 수 있는 길이
// 공이 림을 위에서 아래로 지나가면 들어간 것(백보드에 맞으면 실패로 본다)
const simulateShot = (x0: number, y0: number, vx0: number, vy0: number) => {
  let x = x0;
  let y = y0;
  let vy = vy0;
  const dt = 1 / 120;
  for (let i = 0; i < 700; i++) {
    const py = y;
    vy += GRAV * dt;
    x += vx0 * dt;
    y += vy * dt;
    if (py < RIM_Y && y >= RIM_Y) return x > RIM_L + BALL_R * 0.55 + 6 && x < RIM_R - BALL_R * 0.55 - 6; // 림 끝에 닿지 않고 가운데로 들어가야 한다
    if (y > GROUND) return false;
  }
  return false;
};
// 조금 어긋나게 던져도 들어가도록 살짝 보정해 준다
const assistShot = (x0: number, y0: number, vx: number, vy: number): [number, number] => {
  if (simulateShot(x0, y0, vx, vy)) return [vx, vy];
  for (const sx of [0.97, 1.03, 0.94, 1.06, 0.9, 1.1]) for (const sy of [1, 0.97, 1.03, 0.94, 1.06]) if (simulateShot(x0, y0, vx * sx, vy * sy)) return [vx * sx, vy * sy];
  return [vx, vy];
};
const EXIT_WALK = [LAND_X - 137 - (CX + 233 * S), EXIT_X[1] - (CX + 233 * S)] as const; // 문 앞 자리, 계단 아래 자리에서의 걸음 위치
// 분위기 색: 필리핀은 햇볕 같은 따뜻한 색, 한국은 차분한 서늘한 색(낮/밤 모드에 맞춰 두 벌)
const MOOD = {
  light: { base: '#ffffff', ph: '#fff0cf', kr: '#e7eef7' },
  dark: { base: '#637a9e', ph: '#8a7863', kr: '#4c6283' },
} as const;
const hexRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixHex = (a: string, b: string, t: number) => {
  const [r1, g1, b1] = hexRgb(a);
  const [r2, g2, b2] = hexRgb(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
};
// 한국의 학교로 바뀔 때 더해지는 건물: 양쪽 별관(창문 하나씩)과 입구 계단 두 칸(시계는 따로)
const UPGRADE_SHAPES = [
  'M-340 0 L-340 -130 L-190 -130 L-190 0 Z',
  'M340 0 L340 -130 L190 -130 L190 0 Z',
  'M-300 -100 L-250 -100 L-250 -60 L-300 -60 Z',
  'M250 -100 L300 -100 L300 -60 L250 -60 Z',
  'M-84 0 L-84 -10 L84 -10 L84 0 Z',
  'M-64 -10 L-64 -20 L64 -20 L64 -10 Z',
].map((d) => mapPath(d, SCHOOL));
// PC방 그림: 나란히 놓인 모니터 두 대, 그 위로 나와 친구의 얼굴이 보인다
const PC_X = [620, 980] as const;
const HAIR_FILL_FROM = remap(0.66); // 앞머리 윤곽을 거의 그리면 속이 채워진다
const HAIR_FILL_TO = remap(0.68);
const PIECES: Piece[] = RAW_PIECES.map((pc) => ({ ...pc, from: remap(pc.from), to: remap(pc.to) }));

export default function LineScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [greeting, setGreeting] = useState(''); // 지금 시간에 맞춘 인삿말(서버와 화면이 달라지지 않게 화면이 뜬 뒤에 채운다)
  useEffect(() => setGreeting(TIME_GREETING[currentPeriod()]), []);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const lens = useRef<number[]>([]);
  const handRef = useRef<SVGGElement>(null);
  const footLineRef = useRef<SVGPathElement>(null); // 계단을 오르내릴 때 캐릭터 발밑 줄
  const bodyFillRef = useRef<SVGPathElement>(null); // 몸 안쪽을 배경색으로 채워 뒤에 있는 그림(학교 등)이 비치지 않게 한다
  const uniformRef = useRef<SVGGElement>(null); // 교복(학교에서 나올 때만 입는다)
  const armFillRefs = useRef<(SVGPathElement | null)[]>([]); // 팔 안쪽 채움(팔을 다 그리면 채워진다)
  const phFlagRef = useRef<SVGGElement>(null); // 필리핀 국기
  const tgFlagRef = useRef<SVGGElement>(null); // 태극기
  const beatRefs = useRef<(SVGTextElement | null)[]>([]); // 한 줄씩 나오는 이야기
  const pcDoorRef = useRef<SVGRectElement>(null); // PC방 문 안쪽(들어갈 때 어두워진다)
  const hoopShakeRef = useRef<SVGGElement>(null); // 골이 들어가면 골대가 살짝 흔들린다
  const hopRef = useRef<SVGGElement>(null); // 캐릭터가 던질 때 웅크렸다 뛰는 동작
  const bbRef = useRef<SVGGElement>(null); // 농구 골대와 친구들
  const ballLayerRef = useRef<SVGGElement>(null); // 캐릭터 앞에 그리는 공 층(풍경과 같이 움직인다)
  const ballRef = useRef<SVGGElement>(null); // 농구공
  const ballSpinRef = useRef<SVGGElement>(null); // 공이 도는 각도
  const ballBackRef = useRef<SVGGElement>(null); // 그물 뒤에서 보이는 공
  const ballBackSpinRef = useRef<SVGGElement>(null);
  const hoopRef = useRef<SVGGElement>(null); // 골대
  const ballHitRef = useRef<SVGCircleElement>(null); // 공을 잡는 자리(마우스로 끌 수 있다)
  const trajRef = useRef<SVGPathElement>(null); // 던질 방향 미리보기
  const goalRef = useRef<SVGTextElement>(null); // 골 문구
  const goalNextRef = useRef<SVGTextElement>(null); // 골 뒤에 나오는 '계속 스크롤' 안내
  const ballHintRef = useRef<SVGGElement>(null); // 공을 끌어 보라는 안내
  const panNow = useRef(0); // 지금 풍경이 흘러간 정도(마우스 위치를 풍경 좌표로 바꿀 때 쓴다)
  const rafRef = useRef(0);
  const shotRef = useRef({ mode: 'idle' as 'idle' | 'drag' | 'fly' | 'rest' | 'ret', x: 0, y: 0, vx: 0, vy: 0, spin: 0, scored: false, attempted: false, done: false, jumpAt: 0, goalAt: 0, groundAt: 0, last: 0, restAt: 0, rx: 0, ry: 0, dragX: 0, dragY: 0 });
  const pcRef = useRef<SVGGElement>(null); // PC방 그림
  const pcCoverRef = useRef<SVGRectElement>(null); // PC방이 나올 동안 뒤의 학교를 가린다
  const upgradeRef = useRef<SVGGElement>(null); // 한국 학교로 바뀔 때 더해지는 건물(양쪽 건물, 시계, 계단)
  const planeRef = useRef<SVGGElement>(null);
  const rampRef = useRef<SVGGElement>(null); // 비행기 탑승 계단
  const exitRampRef = useRef<SVGGElement>(null); // 착륙한 뒤 내려오는 계단
  const coverRef = useRef<SVGRectElement>(null); // 화면 전환(배경색으로 덮었다가 걷힌다)
  const uniformCuffRefs = useRef<(SVGPathElement | null)[]>([]); // 팔 묶음 안의 소매 끝단
  const faceRef = useRef<SVGGElement>(null);
  const charRef = useRef<SVGGElement>(null); // 캐릭터 전체(걸을 때 함께 움직인다)
  const gapRef = useRef<SVGPathElement>(null);
  const holeRef = useRef<SVGRectElement>(null); // 땅에서 캐릭터 밑을 비워 두는 가림막(걸어가도 밑에는 땅이 없다)
  const swingRefs = useRef<(SVGGElement | null)[]>([]); // 팔을 어깨 중심으로 흔들기 위한 묶음
  const speechRefs = useRef<(SVGTextElement | null)[]>([]);
  const extRef = useRef<SVGPathElement>(null);
  const schoolRef = useRef<SVGGElement>(null); // 학교 전체(땅이 닿으면 이미 서 있다)
  const tuftSchoolRef = useRef<SVGGElement>(null);
  const tuftPlaneRef = useRef<SVGGElement>(null);
  const tuftLandedRef = useRef<SVGGElement>(null);
  const tuftClipRef = useRef<SVGRectElement>(null); // 땅이 그어진 곳까지만 풀이 보이게 하는 가림막
  const worldRef = useRef<SVGGElement>(null); // 땅과 학교(걷는 동안 왼쪽으로 흘러가 더 멀리 가는 느낌을 준다)
  const doorFillRef = useRef<SVGPathElement>(null); // 캐릭터가 들어가는 문(어둡게 채워진다)
  const scene2Ref = useRef<SVGGElement>(null); // 필리핀 장면 전체(다음 장면으로 넘어가며 사라진다)
  const s3Refs = useRef<(SVGPathElement | null)[]>([]); // 졸업모·노트북·간판(손이 그리는 선)
  const signClipRef = useRef<SVGRectElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<SVGGElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const from = useRef({ ...SIG_FROM_DEFAULT });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  // 마우스(손가락)로 공을 끌었다 놓아 던진다
  const setBall = (x: number, y: number, rot: number, show = true) => {
    // 림 아래 그물 사이를 지나는 동안에는 그물 선 뒤에서 보이도록 뒤쪽 공으로 바꾼다
    const inNet = y > RIM_Y - 4 && y < NET_BOTTOM && x > RIM_L && x < RIM_R;
    ballRef.current?.setAttribute('transform', `translate(${x} ${y})`);
    ballSpinRef.current?.setAttribute('transform', `rotate(${rot})`);
    ballBackRef.current?.setAttribute('transform', `translate(${x} ${y})`);
    ballBackSpinRef.current?.setAttribute('transform', `rotate(${rot})`);
    if (ballRef.current) ballRef.current.style.opacity = show && !inNet ? '1' : '0';
    if (ballBackRef.current) ballBackRef.current.style.opacity = show && inNet ? '1' : '0';
  };
  const stopShot = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    shotRef.current.mode = 'idle';
    if (goalRef.current) goalRef.current.style.opacity = '0';
    if (goalNextRef.current) goalNextRef.current.style.opacity = '0';
    if (trajRef.current) trajRef.current.style.opacity = '0';
  };
  const toWorld = (e: React.PointerEvent) => {
    const ctm = svgRef.current?.getScreenCTM();
    if (!ctm) return null;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return { x: pt.x + panNow.current, y: pt.y };
  };
  const shotLoop = (now: number) => {
    const sh = shotRef.current;
    if (sh.scored && sh.groundAt && now - sh.groundAt > 2000) {
      sh.done = true; // 골을 넣은 공은 바닥에 떨어져 잠깐 있다가 사라지고, 다시 돌아오지 않는다
      sh.mode = 'idle';
      setBall(sh.x, sh.y, sh.spin, false);
      return;
    }
    if (sh.goalAt) {
      const u = (now - sh.goalAt) / 800;
      if (u >= 1) {
        sh.goalAt = 0;
        hoopShakeRef.current?.removeAttribute('transform');
      } else hoopShakeRef.current?.setAttribute('transform', `rotate(${(1.8 * Math.exp(-4 * u) * Math.sin(u * 30)).toFixed(3)} ${HOOP_X} ${GROUND})`); // 점점 잦아드는 흔들림
    }
    if (sh.jumpAt) {
      const u = (now - sh.jumpAt) / 520;
      if (u >= 1) {
        sh.jumpAt = 0;
        setHop(0, 0);
      } else setHop(46 * 4 * u * (1 - u), 0); // 위로 뛰었다가 내려온다
    }
    if (sh.mode === 'fly') {
      const dt = Math.min(0.033, (now - sh.last) / 1000);
      sh.last = now;
      const py = sh.y;
      sh.vy += GRAV * dt;
      sh.x += sh.vx * dt;
      sh.y += sh.vy * dt;
      sh.spin += sh.vx * dt * 0.6; // 날아가는 만큼 돈다
      if (!sh.scored) {
        for (const ex of [RIM_L, RIM_R]) {
          const dx = sh.x - ex;
          const dy = sh.y - RIM_Y;
          const d = Math.hypot(dx, dy);
          if (d < BALL_R * 0.55 && d > 0) {
            const nx = dx / d;
            const ny = dy / d;
            const dot = sh.vx * nx + sh.vy * ny;
            if (dot < 0) {
              sh.vx -= 1.6 * dot * nx; // 림에 맞고 튕긴다
              sh.vy -= 1.6 * dot * ny;
            }
          }
        }
      }
      if (!sh.scored && py < RIM_Y && sh.y >= RIM_Y && sh.x > RIM_L + 6 && sh.x < RIM_R - 6) {
        sh.scored = true; // 골!
        sh.goalAt = now;
        sh.vx *= 0.35;
        if (goalRef.current) goalRef.current.style.opacity = '1';
        if (goalNextRef.current) goalNextRef.current.style.opacity = '0.85';
      }
      if (sh.y > GROUND - BALL_R) {
        if (!sh.groundAt) sh.groundAt = now;
        sh.y = GROUND - BALL_R;
        sh.vy = -sh.vy * 0.55;
        sh.vx *= 0.82;
        if (Math.abs(sh.vy) < 90) sh.vy = 0;
      }
      if (sh.y >= GROUND - BALL_R - 0.5 && sh.vy === 0) {
        sh.vx *= 1 - 1.4 * dt; // 땅에서 구르다 멈춘다
        if (Math.abs(sh.vx) < 20) {
          sh.vx = 0;
          sh.mode = 'rest';
          sh.restAt = now;
        }
      }
      setBall(sh.x, sh.y, sh.spin);
      if (!sh.scored && sh.groundAt && now - sh.groundAt > 350) {
        sh.mode = 'ret'; // 빗나가면 오래 기다리지 않고 바로 손으로 돌아온다
        sh.last = now;
        sh.rx = sh.x;
        sh.ry = sh.y;
      }
    } else if (sh.mode === 'rest') {
      if (!sh.scored && now - sh.restAt > 1000) {
        sh.mode = 'ret';
        sh.last = now;
        sh.rx = sh.x;
        sh.ry = sh.y;
      }
    } else if (sh.mode === 'ret') {
      const u = clamp01((now - sh.last) / 300);
      const e = ease(u);
      setBall(sh.rx + (BALL_HAND.x - sh.rx) * e, sh.ry + (BALL_HAND.y - sh.ry) * e, sh.spin * (1 - e)); // 다시 손으로 돌아온다
      if (u >= 1) {
        sh.mode = 'idle';
        sh.spin = 0;
        if (goalRef.current) goalRef.current.style.opacity = '0';
        if (goalNextRef.current) goalNextRef.current.style.opacity = '0';
        return;
      }
    }
    if (sh.mode !== 'idle') rafRef.current = requestAnimationFrame(shotLoop);
  };
  const setHop = (hop: number, crouch: number) => {
    hopRef.current?.setAttribute('transform', `translate(0 ${-hop}) translate(0 ${GROUND}) scale(1 ${1 - crouch * 0.06}) translate(0 ${-GROUND})`);
  };
  const onBallDown = (e: React.PointerEvent<SVGCircleElement>) => {
    const sh = shotRef.current;
    if (sh.mode !== 'idle') return;
    sh.mode = 'drag';
    sh.attempted = true;
    if (ballHintRef.current) ballHintRef.current.style.opacity = '0'; // 잡으면 안내를 지운다
    sh.dragX = BALL_HAND.x;
    sh.dragY = BALL_HAND.y;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const onBallMove = (e: React.PointerEvent<SVGCircleElement>) => {
    const sh = shotRef.current;
    if (sh.mode !== 'drag') return;
    const w = toWorld(e);
    if (!w) return;
    let dx = w.x - BALL_HAND.x;
    let dy = w.y - BALL_HAND.y;
    const len = Math.hypot(dx, dy);
    if (len > MAX_DRAG) {
      dx *= MAX_DRAG / len;
      dy *= MAX_DRAG / len;
    }
    sh.dragX = BALL_HAND.x + dx;
    sh.dragY = BALL_HAND.y + dy;
    setBall(sh.dragX, sh.dragY, 0);
    setHop(0, Math.min(1, Math.hypot(dx, dy) / MAX_DRAG)); // 많이 끌수록 웅크린다
    // 던질 방향 미리보기(점선)
    if (trajRef.current) {
      if (Math.hypot(dx, dy) < 30) {
        trajRef.current.style.opacity = '0';
      } else {
        const vx = -dx * SHOT_K;
        const vy = -dy * SHOT_K;
        let d = `M${BALL_HAND.x} ${BALL_HAND.y}`; // 공은 손에서 날아가므로 미리보기도 손에서 시작한다
        for (let t = 0.06; t < 1.2; t += 0.06) d += ` L${BALL_HAND.x + vx * t} ${BALL_HAND.y + vy * t + 0.5 * GRAV * t * t}`;
        trajRef.current.setAttribute('d', d);
        trajRef.current.style.opacity = '0.55';
      }
    }
  };
  const onBallUp = () => {
    const sh = shotRef.current;
    if (sh.mode !== 'drag') return;
    if (trajRef.current) trajRef.current.style.opacity = '0';
    const dx = sh.dragX - BALL_HAND.x;
    const dy = sh.dragY - BALL_HAND.y;
    if (Math.hypot(dx, dy) < 30) {
      setHop(0, 0);
      sh.mode = 'idle'; // 조금만 끌었으면 던지지 않고 손으로 돌아간다
      setBall(BALL_HAND.x, BALL_HAND.y, 0);
      return;
    }
    const [vx, vy] = assistShot(BALL_HAND.x, BALL_HAND.y, -dx * SHOT_K, -dy * SHOT_K);
    sh.mode = 'fly';
    sh.jumpAt = performance.now(); // 던지면서 뛰어오른다
    sh.x = BALL_HAND.x; // 슬링샷처럼 손(원래 자리)에서 날아간다
    sh.y = BALL_HAND.y;
    sh.vx = vx;
    sh.vy = vy;
    sh.spin = 0;
    sh.scored = false;
    sh.goalAt = 0;
    sh.groundAt = 0;
    sh.last = performance.now();
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(shotLoop);
  };

  const update = (pRaw: number) => {
    const p = Math.min(pRaw / SCENE_END, 1);
    const f = clamp01((pRaw - SCENE_END) / (F_END - SCENE_END)); // 비행기 장면의 진행 정도
    const q = clamp01((pRaw - F_END) / (S2_END - F_END)); // 필리핀 장면의 진행 정도
    const r = clamp01((pRaw - S2_END) / (1 - S2_END)); // 그 뒤 장면(졸업 -> 코딩 -> 싸피)의 진행 정도
    const pan = q > 0 ? ease(clamp01((q - Q_STEP[1]) / (Q_DOOR - Q_STEP[1]))) * PAN_MAX + (q < Q_RESET ? ease(clamp01((q - Q_BB[0]) / (Q_BB[1] - Q_BB[0]))) * BB_PAN + ease(clamp01((q - Q_PW[0]) / (Q_PW[1] - Q_PW[0]))) * PC_PAN : 0) : ease(clamp01(f / F_WALK)) * PLANE_PAN; // 풍경이 왼쪽으로 흘러간 정도(비행기, 학교, 농구 골대)
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
    // 첫 장면: 땅을 긋기 시작할 때부터 땅을 다 그을 때까지 같은 속도로 걷고, 비행기 장면에서는 서 있는다
    const walkFrom = PIECES[gi].from * SCENE_END;
    let walk = clamp01((pRaw - walkFrom) / (SCENE_END - walkFrom)) * W1;
    let moving = walk > 0 && walk < W1;
    if (f > 0 && q === 0) {
      // 비행기가 있는 곳까지 계속 걷고(풍경이 흘러간다), 닿으면 멈추지 않고 그대로 계단을 올라 탄다
      if (f < F_WALK) {
        walk = W1 + (W_RAMP - W1) * (f / F_WALK);
        moving = true;
      } else {
        const e = clamp01((f - F_WALK) / BOARD);
        walk = W_RAMP + (RAMP_X[1] - RAMP_X[0]) * e;
        moving = e < 1;
      }
    }
    let rise = q === 0 && f > F_WALK ? stairRise((f - F_WALK) / BOARD) : 0; // 계단을 한 칸씩 오른다
    if (q > 0) {
      // 필리핀 장면: 비행기가 착륙한 뒤 캐릭터가 문에서 나와 계단을 한 칸씩 내려오고, 이어서 학교 문까지 걷는다
      if (q < Q_STEP[0]) {
        walk = EXIT_WALK[0];
        moving = false;
        rise = RAMP_RISE;
      } else if (q < Q_STEP[1]) {
        const e = (q - Q_STEP[0]) / (Q_STEP[1] - Q_STEP[0]);
        walk = EXIT_WALK[0] + (EXIT_WALK[1] - EXIT_WALK[0]) * e;
        moving = true;
        rise = stairRise(1 - e);
      } else if (q < Q_DOOR) {
        const e = clamp01((q - Q_STEP[1]) / (Q_DOOR - Q_STEP[1]));
        walk = EXIT_WALK[1] + (DOOR_WALK - EXIT_WALK[1]) * e;
        moving = e < 1;
      } else if (q < Q_BB[0] || q >= Q_RESET) {
        // 학교 안(들어갔다가 다시 나올 때까지)이거나 PC방 이후: 문 앞에 있다
        walk = DOOR_WALK;
        moving = false;
      } else {
        // 학교에서 나와 농구 골대 쪽으로 걸어간다(풍경이 같이 흘러간다)
        const e = ease(clamp01((q - Q_BB[0]) / (Q_BB[1] - Q_BB[0])));
        const e2 = ease(clamp01((q - Q_PW[0]) / (Q_PW[1] - Q_PW[0])));
        walk = DOOR_WALK + (BB_WALK - DOOR_WALK) * e + (DOOR_WALK - BB_WALK) * e2; // 농구 골대 쪽으로 갔다가, 다시 PC방 문까지 걸어간다
        moving = (e > 0 && e < 1) || (e2 > 0 && e2 < 1);
      }
    }
    if (r > 0) {
      if (r < R_OUT[0]) {
        // 학교 문 앞에서 교복을 입은 채로 나타난다
        walk = DOOR_WALK;
        moving = false;
      } else if (r < R_OUT[1]) {
        // 문에서 나와 오른쪽 화면 밖으로 걸어 나간다
        walk = DOOR_WALK + ease((r - R_OUT[0]) / (R_OUT[1] - R_OUT[0])) * (OUT_WALK - DOOR_WALK);
        moving = true;
      } else if (r < R_ENTER[0]) {
        // 다음 장면: 왼쪽 화면 밖에서 대기
        walk = ENTER_WALK;
        moving = false;
      } else {
        const e = clamp01((r - R_ENTER[0]) / (R_ENTER[1] - R_ENTER[0]));
        walk = ENTER_WALK + ease(e) * (STOP3_WALK - ENTER_WALK);
        moving = e > 0 && e < 1;
      }
    }
    const phase = Math.sin((walk + pan) * STEP); // 화면이 흐르는 만큼도 걸음이 이어진다
    const stretch = moving ? 1 + Math.abs(phase) * 0.03 : 1; // 발은 땅에 붙인 채 몸만 살짝 늘었다 줄었다 한다(떠오르지 않는다)
    const lean = moving ? phase * 2.2 : 0;
    charRef.current?.setAttribute('transform', `translate(${walk} ${-rise}) translate(0 ${GROUND}) scale(1 ${stretch}) translate(0 ${-GROUND}) rotate(${lean} ${gx(233)} ${GROUND})`);
    // 캐릭터가 서 있는 바로 그 밑만 땅을 가린다(걸어가도 밑에는 땅이 없고, 지나간 뒤쪽에는 땅이 있다)
    const inSchool = r === 0 && ((q === 0 && f > F_WALK) || (q > 0 && q < Q_STEP[1]) || (q >= Q_DOOR + DOOR_FADE && q < Q_BACK) || q >= Q_RESET); // 학교 안으로 들어가 보이지 않는 동안
    holeRef.current?.setAttribute('x', `${inSchool ? -5000 : gx(BODY_LEFT_X) + walk + HOLE_INSET + pan}`);
    if (charRef.current) charRef.current.style.opacity = r > 0 ? `${r < R_OUT[0] ? clamp01(r / R_OUT[0]) : 1}` : q > 0 ? `${q < Q_DOOR ? clamp01((q - Q_STEP[0]) / qv(12)) : q < Q_BACK ? 1 - clamp01((q - Q_DOOR) / DOOR_FADE) : q < Q_RESET ? clamp01((q - Q_BACK) / DOOR_FADE) * (1 - clamp01((q - Q_PDOOR) / DOOR_FADE)) : 0}` : `${1 - clamp01((f - F_WALK - BOARD * 0.7) / (BOARD * 0.3))}`; // 문에 닿으면 학교 안으로 사라지고, 나올 때 다시 나타난다
    // 서 있던 자리의 땅은 캐릭터가 비켜나는 만큼 왼쪽부터 드러난다
    if (gapRef.current) gapRef.current.style.strokeDashoffset = `${1 - (q > 0 ? 1 : clamp01(walk / (gx(BODY_RIGHT_X) - gx(BODY_LEFT_X))))}`;
    const sw = moving ? phase * SWING : 0;
    swingRefs.current.forEach((g, i) => {
      if (!g) return;
      const left = i < 3 || i === 6; // 앞의 세 개와 왼팔 채움은 왼팔, 나머지는 오른팔
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

    const inUniform = r > 0 && r < R_ENTER[0] ? '1' : '0'; // 학교에서 나오는 동안만 교복
    if (uniformRef.current) uniformRef.current.style.opacity = inUniform;
    uniformCuffRefs.current.forEach((el) => el && (el.style.opacity = inUniform));
    armFillRefs.current.forEach((el) => el && (el.style.opacity = `${clamp01((p - PIECES[7].to) / 0.02)}`)); // 팔과 손을 다 그리면 속이 채워진다
    if (footLineRef.current) footLineRef.current.style.opacity = SHOW_FOOT_LINE && rise > 1 ? '1' : '0';
    if (bodyFillRef.current) bodyFillRef.current.style.opacity = `${clamp01((p - PIECES[1].to) / 0.02)}`; // 몸 윤곽을 다 그리면 속이 채워진다
    if (faceRef.current) faceRef.current.style.opacity = `${clamp01((p - HAIR_FILL_FROM) / (HAIR_FILL_TO - HAIR_FILL_FROM))}`;

    // 필리핀 장면: 땅이 학교에 닿으면 학교는 이미 서 있고, 캐릭터가 걸어가 문으로 들어간다
    worldRef.current?.setAttribute('transform', `translate(${-pan} 0)`);
    ballLayerRef.current?.setAttribute('transform', `translate(${-pan} 0)`);
    if (extRef.current) extRef.current.style.opacity = p >= 0.999 ? '1' : '0';
    if (scene2Ref.current) scene2Ref.current.style.opacity = `${1 - clamp01((r - R_OUT[1]) / 0.06)}`; // 다음 장면으로 넘어가며 필리핀 풍경이 사라진다
    const groundGp = clamp01((p - PIECES[gi].from) / (PIECES[gi].to - PIECES[gi].from));
    const groundTipX = gx(BODY_RIGHT_X) + groundGp * (1700 - gx(BODY_RIGHT_X)); // 오른쪽 땅이 그어진 끝
    // 풀은 학교·비행기가 서 있는 때에만 그 자리를 비운다
    if (tuftSchoolRef.current) tuftSchoolRef.current.style.opacity = q > 0 ? '0' : '1';
    if (tuftPlaneRef.current) tuftPlaneRef.current.style.opacity = q > 0 ? '1' : '0';
    if (tuftLandedRef.current) tuftLandedRef.current.style.opacity = q > 0 && q < Q_DOOR ? '0' : '1';
    tuftClipRef.current?.setAttribute('width', `${p >= 0.999 ? 12000 : groundTipX + 3000}`);
    if (schoolRef.current) schoolRef.current.style.opacity = q > 0 ? `${clamp01((groundTipX - 1500) / 150)}` : '0'; // 비행기 장면에서는 같은 자리에 비행기만 있다
    // 비행기 장면: 땅이 그어지면 비행기가 이미 서 있고, 캐릭터가 걸어가 타면 창문에 얼굴이 보이며 날아오른다. 이어서 배경색으로 화면이 덮였다가 걷히며 필리핀 장면으로 넘어간다
    const tk = clamp01((f - TAKEOFF[0]) / (TAKEOFF[1] - TAKEOFF[0]));
    const run = tk * tk; // 가속
    // 착륙: 왼쪽 위에서 내려와 땅에 닿아 미끄러지다 멈춘다
    const tl = clamp01((q - Q_LAND[0]) / (Q_LAND[1] - Q_LAND[0]));
    const landX = -420 + (LAND_X + 420) * (1 - Math.pow(1 - tl, 3));
    const landLift = tl < 0.5 ? 380 * Math.pow(1 - tl / 0.5, 1.6) : 0;
    const ppx = q > 0 ? landX : PLANE_X + run * 1700; // 풍경 좌표(이륙은 학교가 있던 자리에서)
    const ppy = GROUND - PLANE_FOOT * PLANE_K - (q > 0 ? landLift : run * 520);
    const pitch = q > 0 ? -6 * (1 - clamp01(tl / 0.6)) : -Math.min(tk * 2.2, 1) * 14;
    const planeIn = q === 0 ? clamp01((groundTipX - 1500) / 150) : 0; // 땅이 닿으면 이미 서 있다
    if (planeRef.current) {
      planeRef.current.setAttribute('transform', `translate(${ppx} ${ppy}) rotate(${pitch}) scale(${PLANE_K})`);
      planeRef.current.style.opacity = q > 0 ? (q < Q_DOOR ? '1' : '0') : tk >= 1 ? '0' : `${planeIn}`;
    }
    rampRef.current?.setAttribute('transform', `translate(${PLANE_PAN - pan} 0)`); // 풍경과 같이 흘러온다(캐릭터 앞에 그리기 위해 풍경 밖에 둔다)
    exitRampRef.current?.setAttribute('transform', `translate(${-pan} 0)`);
    if (exitRampRef.current) exitRampRef.current.style.opacity = q > 0 && q < Q_DOOR ? `${clamp01((q - Q_LAND[1] + qv(8)) / qv(16))}` : '0';
    if (rampRef.current) rampRef.current.style.opacity = tk > 0 ? `${planeIn * (1 - clamp01(tk * 6))}` : `${planeIn}`;
    // 이야기 한 줄씩
    beatRefs.current.forEach((el, i) => {
      if (!el) return;
      const bt = BEATS[i];
      el.style.opacity = `${Math.min(clamp01((pRaw - bt.a) / BEAT_FADE), clamp01((bt.b - pRaw) / BEAT_FADE))}`;
    });
    if (coverRef.current) coverRef.current.style.opacity = `${q > 0 ? 1 - clamp01(q / qv(24)) : clamp01((f - 0.88) / 0.1)}`;
    // PC방 장면: 학교로 들어간 뒤 잠깐 PC방이 나오고, 그동안 학교는 한국의 학교로 바뀐다
    const pcOn = clamp01((q - Q_PC[0]) / qv(16)) * (1 - clamp01((q - (Q_PC[1] - qv(16))) / qv(16)));
    if (pcRef.current) pcRef.current.style.opacity = `${pcOn}`;
    if (pcCoverRef.current) pcCoverRef.current.style.opacity = `${pcOn}`;
    // 농구 장면: 골대와 친구들이 나타나고, 캐릭터가 슛을 한다
    const bbOp = q > 0 && q < Q_RESET ? `${clamp01((q - (Q_BB[0] - qv(30))) / qv(20))}` : '0';
    if (bbRef.current) bbRef.current.style.opacity = bbOp;
    if (hoopRef.current) hoopRef.current.style.opacity = bbOp;
    // 공: 캐릭터가 집어 올리고, 사용자가 끌었다 놓아 던진다(던지지 않으면 저절로 슛한다)
    panNow.current = pan;
    const sh = shotRef.current;
    const interactive = q >= Q_BB[1] && q < Q_BBEND;
    if (!interactive && (sh.mode !== 'idle' || sh.done)) stopShot();
    if (!interactive || !sh.done) {
      if (!sh.done && sh.mode === 'idle' && goalRef.current) goalRef.current.style.opacity = '0';
      if (!sh.done && sh.mode === 'idle' && goalNextRef.current) goalNextRef.current.style.opacity = '0';
    }
    if (q < Q_BB[1] - qv(15)) {
      sh.attempted = false; // 되돌아가면 다시 던질 수 있다
      sh.done = false;
    }
    if (ballHitRef.current) ballHitRef.current.style.pointerEvents = interactive && !sh.done ? 'all' : 'none';
    const ts = clamp01((q - Q_SHOT[0]) / (Q_SHOT[1] - Q_SHOT[0]));
    const pickT = clamp01((q - (Q_BB[1] - qv(10))) / qv(20));
    if (ballRef.current) {
      if (sh.mode === 'idle') {
        const bxr = RIM_CX; // 림 가운데
        const byr = RIM_Y - 140; // 림 위
        let bx = BALL_HAND.x - 30 * (1 - ease(pickT));
        let by = GROUND - BALL_R + (BALL_HAND.y - (GROUND - BALL_R)) * ease(pickT); // 땅에서 집어 올린다
        let rot = 0;
        if (!sh.attempted && ts > 0) {
          rot = ts * 720; // 도는 공
          if (ts < 0.65) {
            const u = ts / 0.65;
            bx = BALL_HAND.x + (bxr - BALL_HAND.x) * u;
            by = BALL_HAND.y + (byr - BALL_HAND.y) * u - 230 * 4 * u * (1 - u); // 포물선
          } else if (ts < 0.85) {
            const u = (ts - 0.65) / 0.2;
            bx = bxr;
            by = byr + (GROUND - 22 - byr) * u * u; // 그물을 지나 떨어진다
          } else {
            const u = (ts - 0.85) / 0.15;
            bx = bxr - 10 * u;
            by = GROUND - 22 - 26 * Math.sin(u * Math.PI); // 한 번 튀고 멈춘다
          }
        }
        setBall(bx, by, rot, q >= Q_BB[1] - qv(10) && q < Q_BBEND && !sh.done);
      } else if (!(q >= Q_BB[1] - qv(10) && q < Q_BBEND)) {
        setBall(BALL_HAND.x, BALL_HAND.y, 0, false);
      }
    }
    if (ballHintRef.current) ballHintRef.current.style.opacity = interactive && !sh.attempted && ts === 0 && sh.mode === 'idle' ? `${pickT}` : '0';
    const flagSwap = clamp01((q - Q_SWAP[0]) / (Q_SWAP[1] - Q_SWAP[0])); // PC방 장면이 지나가면 필리핀 국기가 태극기로 바뀌고 건물도 좋아진다
    if (upgradeRef.current) upgradeRef.current.style.opacity = `${flagSwap}`;
    // 분위기: 필리핀으로 가는 동안 따뜻한 색이 되고, 국기가 태극기로 바뀌면 서늘한 색으로 바뀐다
    const root = svgRef.current?.closest<HTMLElement>('.landing-root');
    if (root) {
      const pal = document.documentElement.classList.contains('dark') ? MOOD.dark : MOOD.light;
      const toPh = q > 0 ? 1 : clamp01((f - 0.8) / 0.2);
      // 분위기가 없는 구간(처음)에는 원래 색(낮/밤 설정)을 그대로 쓴다
      if (toPh === 0 && flagSwap === 0) root.style.removeProperty('--l-bg');
      else root.style.setProperty('--l-bg', mixHex(mixHex(pal.base, pal.ph, toPh), pal.kr, flagSwap));
    }
    if (phFlagRef.current) phFlagRef.current.style.opacity = `${1 - flagSwap}`;
    if (tgFlagRef.current) tgFlagRef.current.style.opacity = `${flagSwap}`;
    if (pcDoorRef.current) pcDoorRef.current.style.opacity = q > 0 && q < Q_RESET ? `${clamp01((q - (Q_PDOOR - qv(8))) / qv(8))}` : '0';
    if (doorFillRef.current) doorFillRef.current.style.opacity = `${r > 0 ? 1 - clamp01(r / R_OUT[0]) : q >= Q_RESET ? 1 : clamp01((q - (Q_DOOR - qv(8))) / qv(8)) * (1 - clamp01((q - (Q_BACK + DOOR_FADE * 0.5)) / qv(16)))}`; // 들어가고 나오는 동안 문 안쪽이 어두워지고, 한국 학교에서는 교복 입은 캐릭터가 나올 때까지 어둡다

    // 세 번째 장면: 졸업모 -> 노트북 -> 싸피 간판을 손이 그리고, 위의 글이 차례로 바뀐다
    let tip3: { x: number; y: number } | null = null;
    let prev3: { x: number; y: number } | null = null;
    SCENE3.forEach((it, i) => {
      const local = clamp01((r - it.from) / (it.to - it.from));
      if (it.kind === 'path') {
        const el = s3Refs.current[i];
        if (!el) return;
        el.style.strokeDashoffset = `${1 - local}`;
        el.style.visibility = local > 0 ? 'visible' : 'hidden';
        const len = el.getTotalLength();
        if (local >= 1) prev3 = el.getPointAtLength(len);
        if (local > 0 && local < 1) tip3 = el.getPointAtLength(len * local);
      } else {
        signClipRef.current?.setAttribute('width', `${SIGN_TEXT.w * local}`);
        const pt = { x: SIGN_TEXT.x + SIGN_TEXT.w * local, y: SIGN_TEXT.y - 10 };
        if (local >= 1) prev3 = pt;
        if (local > 0 && local < 1) tip3 = pt;
      }
    });
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
      // 땅을 다 그은 오른쪽 끝에서 그대로 화면 밖으로 빠진다(캐릭터 쪽으로 되돌아오지 않는다)
      const end = prev as { x: number; y: number } | null;
      x = (end ? end.x : 1700) + out * 500;
      y = (end ? end.y : GROUND) + out * 500;
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
    if (r > 0) {
      // 세 번째 장면: 오른쪽 아래에서 올라와 졸업모 자리에 연필을 대고 차례로 그린 뒤, 다 그리면 빠진다
      const t3 = tip3 as { x: number; y: number } | null;
      const p3 = prev3 as { x: number; y: number } | null;
      const first = SCENE3[0];
      const last = SCENE3[SCENE3.length - 1].to;
      const out0 = last + 0.04;
      hand.style.opacity = r > first.from - 0.04 && r < out0 + 0.08 ? '1' : '0';
      if (t3) {
        ({ x, y } = t3);
      } else if (r < first.from) {
        const st = s3Refs.current[0] ? (s3Refs.current[0] as SVGPathElement).getPointAtLength(0) : { x: CAP_X, y: GROUND };
        const e = ease((r - (first.from - 0.04)) / 0.04);
        x = st.x + 400 * (1 - e);
        y = st.y + 500 * (1 - e);
      } else if (r >= out0 && p3) {
        const k2 = clamp01((r - out0) / 0.08);
        x = p3.x + k2 * 500;
        y = p3.y + k2 * 500;
      } else if (p3) {
        ({ x, y } = p3);
      }
    }
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

  // 낮/밤 모드를 바꾸면 스크롤하지 않아도 바로 분위기 색을 다시 계산한다
  useEffect(() => {
    const mo = new MutationObserver(() => update(scrollYProgress.get()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 장면을 벗어나면 분위기 색을 원래대로 돌려 놓는다
  useEffect(() => {
    const el = svgRef.current;
    return () => {
      el?.closest<HTMLElement>('.landing-root')?.style.removeProperty('--l-bg');
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[2300vh]" aria-label="소개 장면">
      <div className="sticky top-0 h-screen overflow-hidden">
        <svg ref={svgRef} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--l-ink, #1c1b19)', pointerEvents: 'none' }}>
          {/* 서명: 처음엔 크게 가운데에 있다가 스크롤에 따라 땅 선으로 내려앉는다 */}
          <g ref={sigRef} transform={`translate(${SIG_FROM_DEFAULT.x} ${SIG_FROM_DEFAULT.y}) scale(${SIG_FROM_DEFAULT.sx}) translate(${-SIG_CENTER.x} ${-SIG_CENTER.y})`} stroke={INK} strokeWidth="4.4" style={{ vectorEffect: 'non-scaling-stroke' }}>
            {SIGNATURE.map((seg) => (
              <path key={seg.d} d={seg.d} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          {/* 땅 전체: 캐릭터가 서 있는 바로 밑만 비운다 */}
          <g ref={worldRef}>
          <g mask="url(#ground-hole)">
          {/* 서명이 내려앉아 변한 곧은 선(땅의 시작) */}
          <path ref={lineRef} d={`M${SIG_X - SIG_HALF} ${GROUND} H${GROUND_START}`} stroke={INK} strokeWidth={LINE_W} opacity="0" />

          <defs>
            <mask id="ground-hole" maskUnits="userSpaceOnUse" x="-500" y="0" width="9500" height="900">
              <rect x="-500" y="0" width="9500" height="900" fill="#fff" />
              <rect ref={holeRef} x={gx(BODY_LEFT_X) + HOLE_INSET} y="0" width={gx(BODY_RIGHT_X) - gx(BODY_LEFT_X) - 2 * HOLE_INSET} height="900" fill="#000" />
            </mask>
          </defs>

          {/* 땅: 스크롤에 따라 그려진다 */}
          <g stroke={INK} strokeWidth={LINE_W}>
            {PIECES.map((pc, i) =>
              pc.local ? null : (
                <path
                  key={pc.d}
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  d={pc.d}
                />
              )
            )}
          </g>

          {/* 캐릭터가 서 있던 자리의 땅: 캐릭터가 걸어 나가는 만큼 왼쪽부터 이어진다 */}
          <path ref={gapRef} d={`M${gx(BODY_LEFT_X)} ${GROUND} H${gx(BODY_RIGHT_X)}`} stroke={INK} strokeWidth={LINE_W} pathLength="1" strokeDasharray="1" strokeDashoffset="1" />

          {/* 걷기가 끝난 뒤 이어지는 땅 */}
          <path ref={extRef} d={`M1700 ${GROUND} H${Math.max(SCHOOL_X, PLANE_X) + 2600}`} stroke={INK} strokeWidth={LINE_W} opacity="0" />
          <clipPath id="tuft-clip">
            <rect ref={tuftClipRef} x="-3000" y="0" width="0" height="900" />
          </clipPath>
          <g clipPath="url(#tuft-clip)" stroke={INK} strokeWidth={LINE_W - 1}>
            {TUFT_FREE.map((x) => (
              <path key={x} d={TUFT_PATH} transform={`translate(${x} ${GROUND})`} />
            ))}
            <g ref={tuftSchoolRef}>
              {TUFT_SCHOOL.map((x) => (
                <path key={x} d={TUFT_PATH} transform={`translate(${x} ${GROUND})`} />
              ))}
            </g>
            <g ref={tuftPlaneRef}>
              {TUFT_PLANE.map((x) => (
                <path key={x} d={TUFT_PATH} transform={`translate(${x} ${GROUND})`} />
              ))}
            </g>
            <g ref={tuftLandedRef}>
              {TUFT_LANDED.map((x) => (
                <path key={x} d={TUFT_PATH} transform={`translate(${x} ${GROUND})`} />
              ))}
            </g>
          </g>
          </g>

          {/* 필리핀 장면: 오른쪽 끝에 이미 서 있는 학교(필리핀 국기) */}
          <g ref={scene2Ref}>
            <g ref={schoolRef} opacity="0">
              <g ref={phFlagRef}>
                {/* 필리핀 초등학교 간판 */}
                <text x={SCHOOL_X} y={GROUND - 214} fill={INK} stroke="none" fontSize="27" textAnchor="middle" style={{ fontFamily: 'var(--font-hand)' }}>
                  ELEMENTARY SCHOOL
                </text>
                <g stroke="none">
                  <rect x={SCHOOL_X} y={GROUND - 410} width={FLAG_W} height={FLAG_H / 2} fill="#0038a8" />
                  <rect x={SCHOOL_X} y={GROUND - 410 + FLAG_H / 2} width={FLAG_W} height={FLAG_H / 2} fill="#ce1126" />
                  <path d={`M${SCHOOL_X} ${GROUND - 410} L${SCHOOL_X + 70} ${GROUND - 410 + FLAG_H / 2} L${SCHOOL_X} ${GROUND - 410 + FLAG_H} Z`} fill="#ffffff" />
                  <circle cx={SCHOOL_X + 22} cy={GROUND - 410 + FLAG_H / 2} r="8" fill="#fcd116" />
                </g>
                <g stroke={INK} strokeWidth={LINE_W}>
                  {PH_FLAG_LINES.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </g>
              </g>
              <g ref={tgFlagRef} opacity="0">
                {/* 한국으로 돌아온 뒤의 학교 간판 */}
                <text x={SCHOOL_X} y={GROUND - 214} fill={INK} stroke="none" fontSize="32" textAnchor="middle" style={{ fontFamily: 'var(--font-hand)' }}>
                  중·고등학교
                </text>
                <rect x={SCHOOL_X} y={GROUND - 410} width={FLAG_W} height={FLAG_H} fill="#ffffff" stroke="none" />
                <path d={`M${TG_CX - TG_R} ${TG_CY} A${TG_R} ${TG_R} 0 0 1 ${TG_CX + TG_R} ${TG_CY} Z`} fill="#cd2e3a" stroke="none" />
                <path d={`M${TG_CX - TG_R} ${TG_CY} A${TG_R} ${TG_R} 0 0 0 ${TG_CX + TG_R} ${TG_CY} Z`} fill="#0047a0" stroke="none" />
                <g stroke={INK} strokeWidth={LINE_W - 1.5}>
                  {TG_BARS.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </g>
              </g>
              <g ref={upgradeRef} opacity="0" stroke={INK} strokeWidth={LINE_W} style={{ fill: 'var(--l-bg, #ffffff)' }}>
                {UPGRADE_SHAPES.map((d) => (
                  <path key={d} d={d} />
                ))}
                <circle cx={SCHOOL_X} cy={GROUND - 262} r="17" />
                <path d={`M${SCHOOL_X} ${GROUND - 262} V${GROUND - 274} M${SCHOOL_X} ${GROUND - 262} H${SCHOOL_X + 8}`} fill="none" />
              </g>
              <path ref={doorFillRef} opacity="0" fill={INK} stroke="none" d={mapPath('M-40 0 L-40 -110 L40 -110 L40 0 Z', SCHOOL)} />
              <g stroke={INK} strokeWidth={LINE_W}>
                {SCHOOL_LINES.map((d) => (
                  <path key={d} d={d} />
                ))}
              </g>
            </g>
          </g>
          {/* 농구: 학교 오른쪽의 골대와 친구들, 공 */}
          <g ref={bbRef} opacity="0" stroke={INK} strokeWidth={LINE_W}>
            {/* PC방: 간판과 창문, 문이 있는 가게 */}
            <rect x={PCB_X - 260} y={GROUND - 300} width="520" height="300" style={{ fill: 'var(--l-bg, #ffffff)' }} />
            <rect x={PCB_X - 280} y={GROUND - 390} width="560" height="90" rx="6" style={{ fill: 'var(--l-bg, #ffffff)' }} />
            <text x={PCB_X} y={GROUND - 326} fill={INK} stroke="none" fontSize="62" textAnchor="middle" style={{ fontFamily: 'var(--font-hand)' }}>
              PC방
            </text>
            <rect x={PCB_X - 60} y={GROUND - 200} width="120" height="200" />
            <rect ref={pcDoorRef} x={PCB_X - 60} y={GROUND - 200} width="120" height="200" opacity="0" style={{ fill: INK }} />
            {[-185, 125].map((dx) => (
              <g key={dx}>
                <rect x={PCB_X + dx} y={GROUND - 230} width="60" height="120" />
                <rect x={PCB_X + dx + 12} y={GROUND - 212} width="36" height="26" strokeWidth="2.5" />
                <path d={`M${PCB_X + dx + 30} ${GROUND - 186} V${GROUND - 172} M${PCB_X + dx + 18} ${GROUND - 172} H${PCB_X + dx + 42}`} strokeWidth="2.5" />
              </g>
            ))}
          </g>
          {/* 골대: 공이 그물에 들어간 동안에는 공이 그물 선 뒤로 보인다 */}
          <g ref={hoopRef} opacity="0">
            <g ref={ballBackRef} opacity="0">
              <g ref={ballBackSpinRef}>
                <g transform={`scale(${BALL_K})`}>
                  <rect x="-400" y="-400" width="800" height="800" mask="url(#ball-fill-mask)" style={{ fill: 'var(--l-bg, #ffffff)' }} />
                  <rect x="-400" y="-400" width="800" height="800" mask="url(#ball-line-mask)" fill="currentColor" />
                </g>
              </g>
            </g>
            <g ref={hoopShakeRef}>
            <g transform={`translate(${HOOP_X} ${GROUND}) scale(${HOOP_K})`}>
              <mask id="hoop-line-mask" maskUnits="userSpaceOnUse" x={-HOOP_IMG.ox} y={-HOOP_IMG.oy} width={HOOP_IMG.w} height={HOOP_IMG.h}>
                <image href="/hoop-line.png" x={-HOOP_IMG.ox} y={-HOOP_IMG.oy} width={HOOP_IMG.w} height={HOOP_IMG.h} />
              </mask>
              <rect x={-HOOP_IMG.ox} y={-HOOP_IMG.oy} width={HOOP_IMG.w} height={HOOP_IMG.h} mask="url(#hoop-line-mask)" fill="currentColor" />
            </g>
            </g>
          </g>
          {/* 던질 방향 미리보기와 안내, 골 문구 */}
          <path ref={trajRef} d="M0 0" opacity="0" stroke={INK} strokeWidth={LINE_W - 1.5} strokeDasharray="2 14" fill="none" />
          <g ref={ballHintRef} opacity="0">
            <circle cx={BALL_HAND.x} cy={BALL_HAND.y} r={BALL_R * 1.7} stroke={INK} strokeWidth="2.5" fill="none" className="ball-pulse" />
            <text x={BALL_HAND.x} y={GROUND - 340} fill={INK} stroke="none" fontSize="30" textAnchor="middle" style={{ fontFamily: 'var(--font-hand)' }}>
              공을 뒤로 끌었다 놓아 보세요
            </text>
            <text x={BALL_HAND.x} y={GROUND - 300} fill={INK} stroke="none" fontSize="22" opacity="0.6" textAnchor="middle" style={{ fontFamily: 'var(--font-hand)' }}>
              (하기 싫으면 그냥 스크롤해도 돼요)
            </text>
          </g>
          <text ref={goalRef} x={HOOP_X} y={GROUND - 1020 * HOOP_K - 24} opacity="0" fill={INK} stroke="none" fontSize="52" textAnchor="middle" style={{ fontFamily: 'var(--font-hand)' }}>
            골!
          </text>
          <text ref={goalNextRef} x={HOOP_X} y={GROUND - 1020 * HOOP_K - 78} opacity="0" fill={INK} stroke="none" fontSize="26" textAnchor="middle" style={{ fontFamily: 'var(--font-hand)' }}>
            ↓ 스크롤해서 계속
          </text>
          {/* 비행기: 학교가 있던 자리(풍경 오른쪽 멀리)에 서 있고, 캐릭터가 걸어가 타면 날아오른다 */}
          <g ref={planeRef} opacity="0">
            <mask id="plane-fill-mask" maskUnits="userSpaceOnUse" x={-PLANE_IMG.ox} y={-PLANE_IMG.oy} width={PLANE_IMG.w} height={PLANE_IMG.h}>
              <image href="/plane-fill.png" x={-PLANE_IMG.ox} y={-PLANE_IMG.oy} width={PLANE_IMG.w} height={PLANE_IMG.h} />
            </mask>
            <mask id="plane-line-mask" maskUnits="userSpaceOnUse" x={-PLANE_IMG.ox} y={-PLANE_IMG.oy} width={PLANE_IMG.w} height={PLANE_IMG.h}>
              <image href="/plane-line.png" x={-PLANE_IMG.ox} y={-PLANE_IMG.oy} width={PLANE_IMG.w} height={PLANE_IMG.h} />
            </mask>
            <rect x={-PLANE_IMG.ox} y={-PLANE_IMG.oy} width={PLANE_IMG.w} height={PLANE_IMG.h} mask="url(#plane-fill-mask)" style={{ fill: 'var(--l-bg, #ffffff)' }} />
            <rect x={-PLANE_IMG.ox} y={-PLANE_IMG.oy} width={PLANE_IMG.w} height={PLANE_IMG.h} mask="url(#plane-line-mask)" fill="currentColor" />
          </g>
          </g>
          {/* 이야기 한 줄씩: 화면 위쪽 한 곳에 나타났다 사라진다 */}
          {BEATS.map((bt, i) => (
            <text
              key={bt.text}
              ref={(el) => {
                beatRefs.current[i] = el;
              }}
              x="800"
              y="160"
              opacity="0"
              fill={INK}
              stroke="none"
              fontSize="40"
              textAnchor="middle"
              style={{ fontFamily: 'var(--font-hand)' }}
            >
              {bt.text}
            </text>
          ))}

          {/* 세 번째 장면: 졸업모, 노트북, 싸피 간판과 위에 나오는 글 */}
          <g stroke={INK} strokeWidth={LINE_W}>
            {SCENE3.map((it, i) =>
              it.kind === 'path' ? (
                <path
                  key={i}
                  ref={(el) => {
                    s3Refs.current[i] = el;
                  }}
                  d={it.d}
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                />
              ) : null
            )}
          </g>
          <clipPath id="sign-clip">
            <rect ref={signClipRef} x={SIGN_TEXT.x} y={SIGN_TEXT.y - 70} width="0" height="90" />
          </clipPath>
          <text x={SIGN_TEXT.x} y={SIGN_TEXT.y} fill={INK} stroke="none" fontSize="52" clipPath="url(#sign-clip)" style={{ fontFamily: 'var(--font-hand)' }}>
            {SIGN_TEXT.text}
          </text>

          {/* 탑승 계단: 캐릭터는 항상 맨 앞에 그려지므로 계단은 캐릭터 뒤에 둔다 */}
          <g ref={rampRef} opacity="0" stroke={INK} strokeWidth={LINE_W}>
            <path
              d={(() => {
                const dx = (RAMP_X[1] - RAMP_X[0]) / RAMP_STEPS;
                const dy = RAMP_RISE / RAMP_STEPS;
                let d = `M${RAMP_X[0]} ${GROUND}`;
                for (let i = 1; i <= RAMP_STEPS; i++) d += ` V${GROUND - dy * i} H${RAMP_X[0] + dx * i}`;
                return `${d} V${GROUND} Z`;
              })()}
              style={{ fill: 'var(--l-bg, #ffffff)' }}
            />
          </g>

          {/* 착륙한 뒤 내려오는 계단(문 오른쪽에서 아래로) */}
          <g ref={exitRampRef} opacity="0" stroke={INK} strokeWidth={LINE_W}>
            <path
              d={(() => {
                const dx = (EXIT_X[1] - EXIT_X[0]) / RAMP_STEPS;
                const dy = RAMP_RISE / RAMP_STEPS;
                let d = `M${EXIT_X[0]} ${GROUND} V${GROUND - RAMP_RISE}`;
                for (let i = 1; i <= RAMP_STEPS; i++) d += ` H${EXIT_X[0] + dx * i} V${GROUND - RAMP_RISE + dy * i}`;
                return `${d} Z`;
              })()}
              style={{ fill: 'var(--l-bg, #ffffff)' }}
            />
          </g>

          {/* 캐릭터: 몸과 팔과 얼굴. 다 그린 뒤에는 통째로 옆으로 걸어간다 */}
          <g ref={hopRef}>
          <g ref={charRef}>
            <g transform={`translate(${CX} ${CY}) scale(${S})`} stroke={INK} strokeWidth={LINE_W / S}>
              <path ref={footLineRef} d={`M${BODY_LEFT_X} 384 H${BODY_RIGHT_X}`} opacity="0" />
              <path ref={bodyFillRef} d={`${BODY_FWD} Z`} stroke="none" opacity="0" style={{ fill: 'var(--l-bg, #ffffff)' }} />
              {/* 팔 안쪽 채움: 몸·팔 선보다 뒤에 깔아서 선이 가려지지 않게 한다(어깨를 중심으로 팔과 같이 흔들린다) */}
              {ARM_FILL.map((d, k) => (
                <g
                  key={d}
                  ref={(el) => {
                    swingRefs.current[6 + k] = el;
                  }}
                >
                  <path
                    ref={(el) => {
                      armFillRefs.current[k] = el;
                    }}
                    d={d}
                    stroke="none"
                    opacity="0"
                    style={{ fill: 'var(--l-bg, #ffffff)' }}
                  />
                </g>
              ))}
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
                    {UNIFORM_CUFF[i] ? (
                      <path
                        ref={(el) => {
                          uniformCuffRefs.current[i] = el;
                        }}
                        d={UNIFORM_CUFF[i]}
                        opacity="0"
                      />
                    ) : null}
                  </g>
                ) : (
                  <g key={pc.d}>{path}</g>
                );
              })}
            </g>

            {/* 교복: 학교에서 나올 때만 입는다 */}
            <g ref={uniformRef} opacity="0" transform={`translate(${CX} ${CY}) scale(${S})`} stroke={INK} strokeWidth={LINE_W / S}>
              {UNIFORM_COLLAR.map((d) => (
                <path key={d} d={d} style={{ fill: 'var(--l-bg, #ffffff)' }} />
              ))}
              <path d={UNIFORM_TIE} style={{ fill: 'var(--l-bg, #ffffff)' }} />
              {UNIFORM_LINES.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>

            {/* 앞머리 속 채움: 윤곽을 그린 뒤 채워진다 */}
            <g ref={faceRef} opacity="0" transform={`translate(${CX} ${CY}) scale(${S})`}>
              <path d={HAIR} fill={INK} stroke="none" />
            </g>
          </g>
          </g>

          {/* 공: 손바닥보다 앞에 보이도록 캐릭터 뒤에 그린다(풍경과 같이 움직인다) */}
          <g ref={ballLayerRef}>
          <g ref={ballRef} opacity="0">
            <g ref={ballSpinRef}>
              <g transform={`scale(${BALL_K})`}>
                <mask id="ball-fill-mask" maskUnits="userSpaceOnUse" x="-400" y="-400" width="800" height="800">
                  <image href="/ball-fill.png" x="-400" y="-400" width="800" height="800" />
                </mask>
                <mask id="ball-line-mask" maskUnits="userSpaceOnUse" x="-400" y="-400" width="800" height="800">
                  <image href="/ball-line.png" x="-400" y="-400" width="800" height="800" />
                </mask>
                <rect x="-400" y="-400" width="800" height="800" mask="url(#ball-fill-mask)" style={{ fill: 'var(--l-bg, #ffffff)' }} />
                <rect x="-400" y="-400" width="800" height="800" mask="url(#ball-line-mask)" fill="currentColor" />
              </g>
            </g>
            <circle
              ref={ballHitRef}
              cx="0"
              cy="0"
              r={BALL_R * 1.7}
              fill="none"
              onPointerDown={onBallDown}
              onPointerMove={onBallMove}
              onPointerUp={onBallUp}
              onPointerCancel={onBallUp}
              style={{ pointerEvents: 'none', cursor: 'grab', touchAction: 'none' }}
            />
          </g>
          </g>

          {/* 몸을 그리는 동안 하는 말 */}
          <g fill={INK} stroke="none" fontSize="46" style={{ fontFamily: 'var(--font-hand)' }}>
            {SPEECH.map((sp, i) => (
              <text
                key={i}
                fontSize={sp.size}
                ref={(el) => {
                  speechRefs.current[i] = el;
                }}
                x={gx(330)}
                y={CY + 70 * S}
                opacity="0"
              >
                {i === GREETING_AT ? greeting : sp.text}
              </text>
            ))}
          </g>

          {/* 연필을 쥔 손 */}
          <g ref={handRef} opacity="0">
            <image className="hand-img" href="/hand-pen.png" x="0" y="0" width="1400" height="2600" />
          </g>
          {/* PC방: 나란히 놓인 모니터 두 대와 그 뒤로 보이는 나와 친구 */}
          <rect ref={pcCoverRef} x="-3000" y="200" width="8000" height="800" opacity="0" style={{ fill: 'var(--l-bg, #ffffff)' }} />
          <g ref={pcRef} opacity="0" stroke={INK} strokeWidth={LINE_W} style={{ fill: 'var(--l-bg, #ffffff)' }}>
            <path d={`M-3000 ${GROUND} H5000`} fill="none" />
            <path d="M330 600 H1270 M370 600 V714 M1230 600 V714" fill="none" />
            {/* 얼굴(모니터 뒤에서 위로 보인다): 왼쪽이 나, 오른쪽이 친구 */}
            {PC_X.map((cx, i) => (
              <g key={cx}>
                <ellipse cx={cx} cy={396} rx="50" ry="58" />
                <path d={`M${cx - 15} 392 L${cx - 14.8} 392 M${cx + 15} 392 L${cx + 15.2} 392`} fill="none" />
                <path d={`M${cx - 14} 412 Q${cx} 424 ${cx + 14} 412`} fill="none" />
                {i === 0 ? (
                  <path d={`M${cx - 48} 378 C${cx - 42} 336 ${cx + 30} 328 ${cx + 49} 372 C${cx + 20} 352 ${cx - 20} 358 ${cx - 48} 378 Z`} style={{ fill: 'currentColor' }} />
                ) : (
                  <path d={`M${cx - 4} 340 C${cx - 12} 318 ${cx + 14} 312 ${cx + 16} 328`} fill="none" />
                )}
              </g>
            ))}
            {/* 모니터와 화면 속 게임 */}
            {PC_X.map((cx, i) => (
              <g key={cx}>
                <rect x={cx - 95} y={430} width="190" height="130" rx="8" />
                <rect x={cx - 85} y={440} width="170" height="110" strokeWidth="2.5" />
                <path d={`M${cx - 12} 560 V592 M${cx - 42} 592 H${cx + 42}`} fill="none" />
                {i === 0 ? (
                  <g strokeWidth="2.5">
                    <path d={`M${cx} 504 L${cx - 16} 538 L${cx + 16} 538 Z`} />
                    <path d={`M${cx} 486 V470 M${cx - 40} 460 H${cx - 24} M${cx + 24} 466 H${cx + 40}`} fill="none" />
                    <rect x={cx - 52} y={452} width="9" height="9" style={{ fill: 'currentColor' }} />
                    <rect x={cx + 44} y={474} width="9" height="9" style={{ fill: 'currentColor' }} />
                  </g>
                ) : (
                  <g strokeWidth="2.5" fill="none">
                    <path d={`M${cx - 70} 470 H${cx + 20} V500 H${cx - 40} V530 H${cx + 70}`} />
                    <path d={`M${cx - 70} 520 H${cx - 54} M${cx + 40} 462 V490`} />
                    <circle cx={cx + 56} cy={492} r="9" style={{ fill: 'currentColor' }} />
                  </g>
                )}
              </g>
            ))}
          </g>

          {/* 화면 전환: 위쪽의 글은 남기고 아래 장면만 배경색으로 덮었다가 걷는다 */}
          <rect ref={coverRef} x="-3000" y="200" width="8000" height="800" opacity="0" style={{ fill: 'var(--l-bg, #ffffff)' }} />
        </svg>
        {/* 첫 화면의 서명과 소개 글을 그대로 겹쳐 둔다. 서명 선은 숨기고(장면 속 서명이 대신 그려진다) 글만 보인다. */}
        <div ref={capRef} className="pointer-events-none absolute inset-0">
          <div ref={heroRef} className="contents [&_svg]:opacity-0">
            <SignatureHero skip onDone={() => {}} className="absolute left-[4vw] top-[12vh] z-10 w-[min(78vw,420px)] md:top-1/2 md:w-[min(38vw,560px)] md:-translate-y-1/2" />
          </div>
        </div>
        {/* 처음 화면의 안내: 물방울이 사라진 오른쪽에서 스크롤하라고 알려 준다(스크롤을 시작하면 사라진다) */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-center md:inset-x-auto md:bottom-auto md:right-[17vw] md:top-1/2 md:-translate-y-1/2"
          style={{ color: 'var(--l-muted, #8a8780)' }}
        >
          <svg width="38" height="58" viewBox="0 0 30 46" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="2" width="26" height="42" rx="13" />
            <circle className="scroll-dot" cx="15" cy="13" r="2.6" fill="currentColor" stroke="none" />
          </svg>
          <p className="text-xl leading-relaxed tracking-wide md:text-3xl">
            <span className="block [@media(pointer:coarse)]:hidden">마우스를 아래로 스크롤해 주세요</span>
            <span className="hidden [@media(pointer:coarse)]:block">화면을 위로 밀어 올려 주세요</span>
            <span className="mt-2 block text-sm tracking-wider opacity-70 md:text-lg">그림이 그려지며 이야기가 시작됩니다</span>
          </p>
        </div>
      </div>
    </section>
  );
}
