'use client';

// 첫 화면 덩어리 안에 들어가는 그림들. 종이색 덩어리 위에 얇은 선으로 그린 조용한 그림이다.

const LINE_PROPS = { fill: 'none', stroke: 'currentColor', strokeWidth: 0.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

// 조이콘 하나: 스틱이 위, 방향 버튼 네 개가 아래
function Single() {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" {...LINE_PROPS}>
      <g transform="rotate(-12 24 24)">
        <rect x="14" y="3" width="20" height="42" rx="10" />
        <path d="M20 8h8" />
        <circle cx="24" cy="17" r="4.2" />
        <circle cx="24" cy="17" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="24" cy="29" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="24" cy="37" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="19.5" cy="33" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="28.5" cy="33" r="1.3" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

// 마우스 커서와 클릭 파동
function Cursor() {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" {...LINE_PROPS}>
      <path d="M14 8 L14 34 L20.5 28.5 L25 39 L29 37.2 L24.6 26.8 L33 26 Z" />
      <path d="M31 9 Q38 11 40 18" />
      <path d="M35 5 Q44 8 46 18" />
    </svg>
  );
}

// 게임: 조이콘 하나
export function GameArt() {
  return (
    <div className="h-full text-[#1c1b19]">
      <Single />
    </div>
  );
}

// 인터랙티브: 조이콘 한 쌍
export function InteractiveArt() {
  return (
    <div className="h-full text-[#1c1b19]">
      <Cursor />
    </div>
  );
}

// 심플: 종이 한 장 (읽는 용도의 정리본을 뜻한다)
function Paper() {
  return (
    <svg viewBox="0 0 40 48" className="h-full w-full" {...LINE_PROPS}>
      <g transform="rotate(5 20 24)">
        <rect x="5" y="3" width="30" height="42" rx="1.8" />
        <path d="M11 12h18M11 19h18M11 26h18M11 33h11" />
      </g>
    </svg>
  );
}

export function SimpleArt() {
  return (
    <div className="h-full text-[#1c1b19]">
      <Paper />
    </div>
  );
}
