'use client';

import { useEffect, useRef } from 'react';

// 흰 화면 위를 헤엄쳐 다니는 선 그림 인어.
// 몸은 머리를 따라가는 관절 사슬이고, 꼬리는 파도처럼 흔들리며, 머리카락은 뒤로 흩날린다.
// 마우스가 있으면 커서 주위를 맴돌고, 가만히 있으면 혼자 화면을 돌아다닌다.
const SEGMENTS = 26;
const SEG_LEN = 8;
const HAIR_STRANDS = 6;
const HAIR_LEN = 15;
const INK = '#111';
const BUBBLE_MAX = 90;

interface P {
  x: number;
  y: number;
}
interface Bubble {
  x: number;
  y: number;
  r: number;
  life: number;
  sway: number;
}

export default function Mermaid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let W = 0;
    let H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const scale = () => (W < 768 ? 0.8 : 1.15);

    // 몸: 0번이 머리
    const body: P[] = Array.from({ length: SEGMENTS }, (_, i) => ({ x: W * 0.5 - i * SEG_LEN, y: H * 0.7 }));
    const vel = { x: 0, y: 0 };
    // 머리카락 가닥
    const hair: P[][] = Array.from({ length: HAIR_STRANDS }, () => Array.from({ length: HAIR_LEN }, () => ({ x: body[0].x, y: body[0].y })));
    const bubbles: Bubble[] = [];

    const mouse = { x: W * 0.5, y: H * 0.5, last: -1e9, seen: false };
    const wander = { x: W * 0.5, y: H * 0.6, t: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.last = performance.now();
      mouse.seen = true;
    };
    if (finePointer) window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    let prev = performance.now();
    let bubbleT = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const t = now / 1000;
      const S = scale();

      // ----- 머리가 향할 곳 -----
      const follow = finePointer && mouse.seen && now - mouse.last < 4000;
      let tx: number;
      let ty: number;
      if (follow) {
        // 커서 주위를 천천히 맴돈다
        tx = mouse.x + Math.cos(t * 0.9) * 80 * S;
        ty = mouse.y + Math.sin(t * 1.3) * 46 * S;
      } else {
        wander.t -= dt;
        if (wander.t <= 0) {
          wander.x = rnd(W * 0.1, W * 0.9);
          wander.y = rnd(H * 0.2, H * 0.85);
          wander.t = rnd(3, 6);
        }
        tx = wander.x;
        ty = wander.y;
      }
      const head = body[0];
      const dx = tx - head.x;
      const dy = ty - head.y;
      const dist = Math.hypot(dx, dy) || 1;
      const maxSpeed = (follow ? 620 : 150) * S;
      const want = Math.min(maxSpeed, dist * (follow ? 2.6 : 0.8));
      vel.x += ((dx / dist) * want - vel.x) * Math.min(1, dt * 3.2);
      vel.y += ((dy / dist) * want - vel.y) * Math.min(1, dt * 3.2);
      head.x += vel.x * dt;
      head.y += vel.y * dt + Math.sin(t * 2.2) * 6 * dt;
      const speed = Math.hypot(vel.x, vel.y);

      // ----- 사슬이 머리를 따라간다 -----
      const seg = SEG_LEN * S;
      for (let i = 1; i < SEGMENTS; i++) {
        const a = body[i - 1];
        const b = body[i];
        const ddx = b.x - a.x;
        const ddy = b.y - a.y;
        const d = Math.hypot(ddx, ddy) || 1;
        b.x = a.x + (ddx / d) * seg;
        b.y = a.y + (ddy / d) * seg;
      }

      // 몸의 방향(머리 → 꼬리)과 법선
      const nx: number[] = [];
      const ny: number[] = [];
      for (let i = 0; i < SEGMENTS; i++) {
        const a = body[Math.max(0, i - 1)];
        const b = body[Math.min(SEGMENTS - 1, i + 1)];
        const ddx = a.x - b.x;
        const ddy = a.y - b.y;
        const d = Math.hypot(ddx, ddy) || 1;
        nx.push(-ddy / d);
        ny.push(ddx / d);
      }

      // 헤엄칠 때 꼬리가 파도처럼 흔들린다 (속도가 빠를수록 크게)
      const amp = (2 + Math.min(14, speed * 0.03)) * S;
      const pts: P[] = body.map((p, i) => {
        const k = i / (SEGMENTS - 1);
        const wave = Math.sin(t * 6.5 - i * 0.55) * amp * (0.15 + k * k * 1.6);
        return { x: p.x + nx[i] * wave, y: p.y + ny[i] * wave };
      });

      // 반쪽 폭: 어깨 → 허리 → 엉덩이 → 꼬리 끝으로 이어지는 인어의 실루엣
      const PROFILE: [number, number][] = [
        [2, 0],
        [4, 6],
        [6, 9],
        [9, 7],
        [13, 10.5],
        [17, 8],
        [SEGMENTS - 1, 2.2],
      ];
      const half = (i: number) => {
        for (let k = 1; k < PROFILE.length; k++) {
          if (i <= PROFILE[k][0]) {
            const [i0, w0] = PROFILE[k - 1];
            const [i1, w1] = PROFILE[k];
            return (w0 + ((w1 - w0) * (i - i0)) / (i1 - i0)) * S;
          }
        }
        return 2.2 * S;
      };

      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = INK;
      ctx.fillStyle = INK;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.9;

      // ----- 머리카락 -----
      ctx.lineWidth = 1.1;
      hair.forEach((strand, s) => {
        const side = (s - (HAIR_STRANDS - 1) / 2) * 3.2 * S;
        strand[0].x = pts[0].x + nx[0] * side;
        strand[0].y = pts[0].y + ny[0] * side;
        for (let i = 1; i < HAIR_LEN; i++) {
          const a = strand[i - 1];
          const b = strand[i];
          // 몸이 나아가는 반대쪽으로 늘어지고 살짝 일렁인다
          const sway = Math.sin(t * 3 + s + i * 0.6) * 1.6 * S;
          const ddx = b.x - a.x + nx[0] * sway * 0.1;
          const ddy = b.y - a.y + ny[0] * sway * 0.1;
          const d = Math.hypot(ddx, ddy) || 1;
          const L = (6 + s * 0.7) * S;
          b.x = a.x + (ddx / d) * L;
          b.y = a.y + (ddy / d) * L;
        }
        ctx.beginPath();
        ctx.moveTo(strand[0].x, strand[0].y);
        for (let i = 1; i < HAIR_LEN - 1; i++) {
          const mx = (strand[i].x + strand[i + 1].x) / 2;
          const my = (strand[i].y + strand[i + 1].y) / 2;
          ctx.quadraticCurveTo(strand[i].x, strand[i].y, mx, my);
        }
        ctx.stroke();
      });

      // ----- 몸 윤곽 (왼쪽 → 꼬리지느러미 → 오른쪽) -----
      ctx.lineWidth = 1.5;
      const L: P[] = [];
      const R: P[] = [];
      for (let i = 3; i < SEGMENTS; i++) {
        const w = half(i);
        L.push({ x: pts[i].x + nx[i] * w, y: pts[i].y + ny[i] * w });
        R.push({ x: pts[i].x - nx[i] * w, y: pts[i].y - ny[i] * w });
      }
      const tail = pts[SEGMENTS - 1];
      const tailPrev = pts[SEGMENTS - 3];
      let fx = tail.x - tailPrev.x;
      let fy = tail.y - tailPrev.y;
      const fl = Math.hypot(fx, fy) || 1;
      fx /= fl;
      fy /= fl;
      const fnx = -fy;
      const fny = fx;
      const flutter = Math.sin(t * 6.5 - SEGMENTS * 0.55) * 0.45;
      const finLen = 44 * S;
      const finW = 26 * S;

      const smooth = (arr: P[], reverse = false) => {
        const a = reverse ? [...arr].reverse() : arr;
        for (let i = 0; i < a.length - 1; i++) {
          const mx = (a[i].x + a[i + 1].x) / 2;
          const my = (a[i].y + a[i + 1].y) / 2;
          ctx.quadraticCurveTo(a[i].x, a[i].y, mx, my);
        }
        ctx.lineTo(a[a.length - 1].x, a[a.length - 1].y);
      };

      ctx.beginPath();
      ctx.moveTo(L[0].x, L[0].y);
      smooth(L);
      // 꼬리지느러미: 두 갈래 부채꼴
      const cx = Math.cos(flutter);
      const sx = Math.sin(flutter);
      const ax = fx * cx - fy * sx;
      const ay = fx * sx + fy * cx;
      const anx = -ay;
      const any = ax;
      const topTip = { x: tail.x + ax * finLen + anx * finW, y: tail.y + ay * finLen + any * finW };
      const botTip = { x: tail.x + ax * finLen - anx * finW, y: tail.y + ay * finLen - any * finW };
      const notch = { x: tail.x + ax * finLen * 0.55, y: tail.y + ay * finLen * 0.55 };
      ctx.quadraticCurveTo(tail.x + ax * finLen * 0.5 + anx * finW * 1.1, tail.y + ay * finLen * 0.5 + any * finW * 1.1, topTip.x, topTip.y);
      ctx.quadraticCurveTo(notch.x + anx * finW * 0.35, notch.y + any * finW * 0.35, notch.x, notch.y);
      ctx.quadraticCurveTo(notch.x - anx * finW * 0.35, notch.y - any * finW * 0.35, botTip.x, botTip.y);
      ctx.quadraticCurveTo(tail.x + ax * finLen * 0.5 - anx * finW * 1.1, tail.y + ay * finLen * 0.5 - any * finW * 1.1, R[R.length - 1].x, R[R.length - 1].y);
      smooth(R, true);
      ctx.closePath();
      ctx.stroke();

      // 꼬리 비늘 선
      ctx.lineWidth = 0.9;
      for (let i = 12; i < SEGMENTS - 2; i += 2) {
        const w = half(i) * 0.7;
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, w, Math.atan2(ny[i], nx[i]) - 0.9, Math.atan2(ny[i], nx[i]) + 0.9);
        ctx.stroke();
      }

      // ----- 머리와 얼굴 -----
      ctx.lineWidth = 1.5;
      const hr = 10.5 * S;
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, hr, 0, Math.PI * 2);
      ctx.stroke();
      // 눈: 나아가는 쪽(몸의 반대 방향)으로 살짝
      const dirx = -(nx[0] * 0) + (pts[0].x - pts[2].x);
      const diry = pts[0].y - pts[2].y;
      const dl = Math.hypot(dirx, diry) || 1;
      ctx.beginPath();
      ctx.arc(pts[0].x + (dirx / dl) * hr * 0.35 + nx[0] * hr * 0.25, pts[0].y + (diry / dl) * hr * 0.35 + ny[0] * hr * 0.25, 1.2 * S, 0, Math.PI * 2);
      ctx.fill();

      // 팔: 몸 양옆에서 살짝 흔들리는 짧은 선
      ctx.lineWidth = 1.2;
      for (const sgn of [1, -1]) {
        const base = pts[4];
        const wob = Math.sin(t * 5 + sgn) * 3 * S;
        ctx.beginPath();
        ctx.moveTo(base.x + nx[4] * half(4) * sgn, base.y + ny[4] * half(4) * sgn);
        ctx.quadraticCurveTo(
          base.x + nx[4] * (half(4) + 10 * S) * sgn + (dirx / dl) * -4 * S,
          base.y + ny[4] * (half(4) + 10 * S) * sgn + (diry / dl) * -4 * S,
          base.x + nx[4] * (half(4) + 12 * S) * sgn - (dirx / dl) * (10 * S + wob),
          base.y + ny[4] * (half(4) + 12 * S) * sgn - (diry / dl) * (10 * S + wob)
        );
        ctx.stroke();
      }

      // ----- 거품: 숨 쉴 때마다 여러 개가 올라오고, 헤엄칠수록 더 많이 생긴다 -----
      bubbleT += dt;
      const interval = speed > 80 ? 0.07 : 0.22;
      if (bubbleT > interval && bubbles.length < BUBBLE_MAX) {
        bubbleT = 0;
        const n = speed > 80 ? 2 : 1;
        for (let k = 0; k < n; k++) {
          bubbles.push({
            x: pts[0].x + (dirx / dl) * hr + rnd(-6, 6) * S,
            y: pts[0].y + (diry / dl) * hr + rnd(-6, 6) * S,
            r: rnd(1.4, 6.5) * S,
            life: rnd(2.6, 4.4),
            sway: rnd(0, 6),
          });
        }
      }
      ctx.lineWidth = 1;
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life -= dt;
        if (b.life <= 0) {
          bubbles.splice(i, 1);
          continue;
        }
        b.y -= (20 + b.r * 5) * dt;
        b.x += Math.sin(t * 2 + b.sway) * 12 * dt;
        ctx.globalAlpha = 0.6 * Math.min(1, b.life);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
        // 큰 거품에는 작은 하이라이트
        if (b.r > 3.2 * S) {
          ctx.beginPath();
          ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.22, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] print:hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
