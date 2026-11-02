// <라 리네아>(La Linea)처럼 바닥에 그은 선 하나에서 솟아오른 라인아트 캐릭터(초안).
// 바닥 선이 올라와 몸이 되고, 머리와 두 팔로 이어진다. 안경을 쓰고 팔을 활짝 벌린 모습이다.
// 선이 처음에 한 번 그려지는 효과가 있다(SMIL 애니메이션).
const DRAW = { pathLength: 1, strokeDasharray: 1 } as const;

function Draw({ d, begin = '0s', dur = '1.1s' }: { d: string; begin?: string; dur?: string }) {
  return (
    <path d={d} {...DRAW}>
      <animate attributeName="stroke-dashoffset" from="1" to="0" begin={begin} dur={dur} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1" />
    </path>
  );
}

export default function SoulCharacter({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 420" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" aria-label="나를 닮은 캐릭터">
      <g stroke="currentColor" strokeWidth="4">
        {/* 바닥 선과 몸: 바닥에서 올라와 머리로 이어진다 */}
        <Draw d="M0 384 H166" />
        <Draw d="M166 384 C174 336 178 284 172 232 C166 196 172 156 196 130 C214 110 262 104 288 128 C306 146 306 188 298 232" begin="0.3s" dur="1.6s" />
        <Draw d="M298 232 C292 280 292 340 300 384 H480" begin="1.6s" dur="1.2s" />

        {/* 왼팔: 어깨에서 활짝 벌린다 */}
        <Draw d="M180 214 C160 238 140 270 122 318" begin="1.4s" />
        <Draw d="M172 268 C160 292 146 312 136 330" begin="1.6s" />
        {/* 왼손 */}
        <Draw d="M122 318 C114 322 112 334 118 342 M126 322 L124 350 M134 328 L136 354 M142 332 L148 352 M136 330 C148 334 152 346 148 354 C140 358 128 356 124 350" begin="2.2s" dur="0.7s" />

        {/* 오른팔: 위로 벌려 올린다 */}
        <Draw d="M290 200 C324 214 356 236 384 268" begin="1.8s" />
        <Draw d="M298 258 C326 270 352 288 372 306" begin="2s" />
        {/* 오른손 */}
        <Draw d="M384 268 C394 262 404 266 408 276 M390 276 L410 300 M382 280 L396 304 M374 286 L380 308 M372 306 C376 316 388 316 396 304" begin="2.6s" dur="0.7s" />
      </g>

      {/* 얼굴: 안경, 눈, 웃는 입, 앞머리 한 줌 */}
      <g stroke="currentColor" strokeWidth="3.2">
        <circle cx="228" cy="152" r="13" />
        <circle cx="262" cy="150" r="13" />
        <path d="M241 151 L249 150" />
        <path d="M215 152 L200 146 M275 149 L290 144" strokeWidth="2.4" />
        <circle cx="230" cy="154" r="3.2" fill="currentColor" stroke="none" />
        <circle cx="264" cy="152" r="3.2" fill="currentColor" stroke="none" />
        <path d="M234 184 C244 194 262 194 272 182" strokeWidth="3" />
        <path d="M196 132 C206 108 252 98 286 124 C262 112 232 116 214 140 C206 142 200 138 196 132 Z" fill="currentColor" />
      </g>

      {/* 반짝임 */}
      <g stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.6">
        <path d="M76 120 L76 140 M66 130 L86 130" />
        <path d="M416 176 L416 190 M409 183 L423 183" />
      </g>
    </svg>
  );
}
