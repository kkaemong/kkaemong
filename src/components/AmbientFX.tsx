'use client';

import { useEffect, useRef } from 'react';

// 하얀 배경 위의 장식: 가루가 천천히 떨어진다.
const DUST_COUNT = 130;

interface Dust {
  x: number;
  y: number;
  r: number;
  v: number;
  sway: number;
  phase: number;
  a: number;
}

export default function AmbientFX({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    const dust: Dust[] = Array.from({ length: DUST_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: rnd(0.6, 2.2),
      v: rnd(10, 32),
      sway: rnd(6, 22),
      phase: Math.random() * Math.PI * 2,
      a: rnd(0.12, 0.5),
    }));

    const mouse = { x: -100, y: -100, seen: false };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.seen = true;
    };
    const onLeave = () => {
      mouse.seen = false;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    let raf = 0;
    let prev = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const t = now / 1000;
      if (!activeRef.current) return; // 첫 화면을 지나면 쉰다

      // 가루: 천천히 흔들리며 떨어지고, 커서 근처에서는 살짝 밀려난다
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#111';
      for (const d of dust) {
        d.y += d.v * dt;
        let x = d.x + Math.sin(t * 0.6 + d.phase) * d.sway;
        if (finePointer && mouse.seen) {
          const dx = x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 90 && dist > 0.1) x += (dx / dist) * (90 - dist) * 0.6;
        }
        if (d.y > H + 4) {
          d.y = -4;
          d.x = Math.random() * W;
        }
        ctx.globalAlpha = d.a;
        ctx.beginPath();
        ctx.arc(x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    if (reduced) {
      // 모션 줄이기: 가루는 멈춘 채 한 번만 그린다
      frame(performance.now());
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-[90] transition-opacity duration-700 print:hidden ${active ? 'opacity-100' : 'opacity-0'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
