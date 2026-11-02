'use client';

import { useEffect, useRef } from 'react';

// 선 그림 시츄. 마우스와 상관없이 화면 안을 혼자 자유롭게 돌아다니고, 가끔 앉아서 쉰다.
// 글씨를 가리지 않도록 글보다 뒤(화면 맨 뒤)에 그려진다.
const INK = '#111';
const MAX_PRINTS = 40;

interface Print {
  x: number;
  y: number;
  a: number;
  rot: number;
}

type Mode = 'walk' | 'stand' | 'sit';

export default function Dog({ active = true }: { active?: boolean }) {
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    const dog = { x: W * 0.3, y: H * 0.75, vx: 0, vy: 0, face: 1, phase: 0, sit: 0, wag: 0, hop: 0, stepDist: 0, side: 1 };
    const wander = { x: W * 0.5, y: H * 0.7 };
    let restLeft = 0;
    const prints: Print[] = [];
    let bubble: { text: string; t: number } | null = null;
    let mode: Mode = 'stand';

    // 상호작용: 간식(뼈다귀)과 쓰다듬기
    const bone = { x: 0, y: 0, on: false };
    const hearts: { x: number; y: number; a: number; s: number }[] = [];
    let eating = 0;
    const spawnHearts = (x: number, y: number, n: number) => {
      for (let i = 0; i < n; i++) hearts.push({ x: x + rnd(-26, 26), y: y + rnd(-10, 10), a: 1, s: rnd(0.7, 1.3) });
    };

    // 오프닝의 마지막 발자국 자리에서 강아지가 걸어 나온다 (그 전까지는 보이지 않는다)
    const w = window as unknown as { __dogStart?: { x: number; y: number }; __introDone?: boolean };
    if (w.__dogStart) {
      dog.x = w.__dogStart.x;
      dog.y = w.__dogStart.y;
      dog.face = -1;
    }
    let appearedAt = w.__introDone || !w.__dogStart ? performance.now() : -1;
    const onIntroDone = () => {
      appearedAt = performance.now();
      bubble = { text: '멍!', t: 1.6 };
    };
    window.addEventListener('intro-done', onIntroDone);

    // "간식 주기" 버튼: 뼈다귀가 떨어지고 강아지가 달려가서 먹는다
    const onTreat = () => {
      if (appearedAt < 0 || bone.on) return;
      bone.x = rnd(W * 0.15, W * 0.85);
      bone.y = rnd(H * 0.35, H * 0.85);
      bone.on = true;
      bubble = { text: '간식이다!', t: 1.4 };
      dog.hop = 1;
    };
    window.addEventListener('dog-treat', onTreat);

    // 강아지를 직접 누르면 쓰다듬기
    const onClick = (e: MouseEvent) => {
      if (appearedAt < 0) return;
      const target = e.target as Element | null;
      if (target?.closest?.('a, button, input, textarea, select, [role="button"]')) return;
      if (Math.abs(e.clientX - dog.x) < 85 && e.clientY > dog.y - 95 && e.clientY < dog.y + 50) {
        spawnHearts(dog.x + dog.face * 30, dog.y - 70, 5);
        dog.wag = 1.2;
        dog.hop = 1;
        bubble = { text: ['멍!', '헤헤', '좋아요!', '더 해줘요'][Math.floor(Math.random() * 4)], t: 1.4 };
      }
    };
    window.addEventListener('click', onClick);

    let raf = 0;
    let prev = performance.now();

    // 짧은 다리: 털에 가려져서 발끝만 보인다
    const paw = (hx: number, ph: number, stride: number, lift: number) => {
      const fx = hx + Math.sin(ph) * stride;
      const fy = 28 - Math.max(0, Math.cos(ph)) * lift;
      ctx.beginPath();
      ctx.ellipse(fx, fy, 5, 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
    };

    // 늘어진 옆구리 털: 물결치는 가장자리
    const skirt = (x0: number, x1: number, y: number, depth: number, t: number, sway: number) => {
      const n = 9;
      const pts: [number, number][] = [];
      for (let i = 0; i <= n; i++) {
        const k = i / n;
        const x = x0 + (x1 - x0) * k;
        const taper = Math.pow(Math.sin(Math.PI * k), 0.55);
        const wave = Math.sin(t * 5 + i * 1.4) * sway + (i % 2 === 0 ? 2.5 : -1);
        pts.push([x, y - 4 + (depth + wave) * taper]);
      }
      ctx.beginPath();
      ctx.moveTo(x0, y - 8);
      ctx.quadraticCurveTo(x0 - 3, y - 2, pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        const mx = (pts[i - 1][0] + pts[i][0]) / 2;
        const my = (pts[i - 1][1] + pts[i][1]) / 2 + (i % 2 === 0 ? 3 : -1);
        ctx.quadraticCurveTo(pts[i - 1][0], pts[i - 1][1] + 2, mx, my);
      }
      ctx.lineTo(x1, y - 4);
      ctx.quadraticCurveTo(x1 + 3, y - 4, x1, y - 8);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
    };

    // 복슬복슬한 둥근 얼굴 윤곽 (털이 삐죽 나온 물결 모양)
    const fluffyHead = (r: number) => {
      const n = 16;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a0 = ((i - 0.5) / n) * Math.PI * 2;
        const a1 = (i / n) * Math.PI * 2;
        const x1 = Math.cos(a1) * r;
        const y1 = Math.sin(a1) * r;
        if (i === 0) ctx.moveTo(x1, y1);
        else {
          const cx = Math.cos(a0) * (r + 5);
          const cy = Math.sin(a0) * (r + 5);
          ctx.quadraticCurveTo(cx, cy, x1, y1);
        }
      }
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
    };

    const drawDog = (t: number, speed: number) => {
      const S = W < 768 ? 1.05 : 1.45;
      const moving = mode === 'walk';
      const bob = moving ? Math.abs(Math.sin(dog.phase)) * -2.2 : mode === 'sit' ? 0 : Math.sin(t * 2) * 0.4;
      ctx.save();
      ctx.translate(dog.x, dog.y);
      ctx.scale(dog.face * S, S);
      ctx.strokeStyle = INK;
      ctx.fillStyle = INK;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // 그림자
      ctx.save();
      ctx.globalAlpha = 0.14;
      ctx.beginPath();
      ctx.ellipse(0, 31, 38, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.lineWidth = 1.5;

      const sit = dog.sit;
      ctx.translate(0, bob - sit * 3 - Math.sin(dog.hop * Math.PI) * 16);
      ctx.rotate(-sit * 0.28);

      // 꼬리: 등 위로 말려 올라간 풍성한 꼬리, 신나면 크게 흔든다
      const wagAmp = 0.1 + dog.wag * 0.4 + (moving ? 0.12 : 0.06);
      const wagA = Math.sin(t * (moving ? 13 : 8)) * wagAmp;
      ctx.save();
      ctx.translate(-27, -8);
      ctx.rotate(wagA);
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-9, -8, -7, -28, 8, -29);
      ctx.bezierCurveTo(20, -28, 22, -16, 15, -10);
      ctx.bezierCurveTo(11, -17, 6, -16, 4, -8);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 1;
      for (const [x1, y1, x2, y2] of [[5, -25, 3, -14], [10, -24, 9, -13], [14, -20, 13, -12]] as const) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo((x1 + x2) / 2 - 2, (y1 + y2) / 2, x2, y2);
        ctx.stroke();
      }
      ctx.restore();
      ctx.lineWidth = 1.5;

      // 발끝
      if (sit < 0.5) {
        const stride = Math.min(8, 3 + speed * 0.015);
        const lift = Math.min(5, 1.5 + speed * 0.01);
        const amp = moving ? stride : 0;
        paw(-20, dog.phase + Math.PI, amp, moving ? lift : 0);
        paw(-11, dog.phase, amp, moving ? lift : 0);
        paw(15, dog.phase, amp, moving ? lift : 0);
        paw(24, dog.phase + Math.PI, amp, moving ? lift : 0);
      }

      // 몸통: 길고 낮은 몸에 털이 풍성하다
      ctx.beginPath();
      ctx.ellipse(0, 1, 32, 16.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 1;
      for (const [bx, by] of [[-14, -13], [-3, -15], [9, -13]] as const) {
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.quadraticCurveTo(bx - 1, by + 3, bx - 3, by + 6);
        ctx.stroke();
      }
      ctx.lineWidth = 1.5;

      // 늘어진 옆구리 털
      skirt(-30, 29, 9, 14, t, moving ? 2 : 0.7);

      // ----- 머리: 크고 둥글게 -----
      const headBob = Math.sin(t * 2.4) * 0.6;
      ctx.save();
      ctx.translate(35, -15 + headBob);
      ctx.rotate(sit * 0.12);

      // 뒤쪽 귀털: 길게 늘어져 어깨까지 내려온다 (걸으면 출렁인다)
      ctx.save();
      ctx.translate(-9, -5);
      ctx.rotate(0.08 + Math.sin(t * 9) * (moving ? 0.13 : 0.03));
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.bezierCurveTo(-11, 1, -16, 18, -12, 38);
      ctx.lineTo(-7, 34);
      ctx.lineTo(-3, 40);
      ctx.lineTo(2, 34);
      ctx.bezierCurveTo(9, 22, 10, 8, 7, 0);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 1;
      for (const x of [-8, -3, 2]) {
        ctx.beginPath();
        ctx.moveTo(x * 0.6, 5);
        ctx.quadraticCurveTo(x - 4, 18, x - 3, 32);
        ctx.stroke();
      }
      ctx.restore();
      ctx.lineWidth = 1.5;

      // 복슬한 얼굴
      fluffyHead(16);

      // 윗머리 묶음과 리본
      ctx.beginPath();
      ctx.moveTo(-3, -17);
      ctx.bezierCurveTo(-5, -28, 5, -30, 4, -17);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -23);
      ctx.lineTo(-7, -27);
      ctx.lineTo(-6, -19);
      ctx.closePath();
      ctx.moveTo(0, -23);
      ctx.lineTo(7, -27);
      ctx.lineTo(6, -19);
      ctx.closePath();
      ctx.fillStyle = INK;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, -23, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      // 볼터치
      ctx.fillStyle = 'rgba(17,17,17,0.09)';
      ctx.beginPath();
      ctx.ellipse(-2, 7, 4.2, 2.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(13, 8, 4, 2.8, 0, 0, Math.PI * 2);
      ctx.fill();

      // 커다란 눈 (깜빡임 포함)
      const blink = (t % 4.2) > 4.05 ? 0.15 : 1;
      ctx.fillStyle = INK;
      for (const ex of [1, 12]) {
        ctx.beginPath();
        ctx.ellipse(ex, -3, 3.4, 3.8 * blink, 0, 0, Math.PI * 2);
        ctx.fill();
        if (blink > 0.5) {
          ctx.beginPath();
          ctx.arc(ex + 1.1, -4.6, 1.15, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
          ctx.fillStyle = INK;
        }
      }
      // 눈썹 쪽 털
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-3, -9);
      ctx.quadraticCurveTo(1, -12, 5, -9);
      ctx.moveTo(8, -9);
      ctx.quadraticCurveTo(12, -12, 16, -9);
      ctx.stroke();
      ctx.lineWidth = 1.5;

      // 납작한 주둥이와 코, 웃는 입
      ctx.beginPath();
      ctx.ellipse(8, 6.5, 6.5, 4.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(8, 4.2, 2.7, 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = INK;
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(4.4, 8.2);
      ctx.quadraticCurveTo(6.2, 10.4, 8, 8.2);
      ctx.quadraticCurveTo(9.8, 10.4, 11.6, 8.2);
      ctx.stroke();
      // 쉬고 있을 때는 혀를 쏙
      if (mode !== 'walk') {
        ctx.beginPath();
        ctx.ellipse(8, 11.4, 1.8, 2.4, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(17,17,17,0.18)';
        ctx.fill();
        ctx.stroke();
      }
      // 턱수염
      ctx.lineWidth = 1;
      for (const [x1, y1, x2, y2] of [[3, 11, 1, 19], [8, 13, 8, 21], [13, 11, 15, 18]] as const) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo((x1 + x2) / 2 - 2, (y1 + y2) / 2, x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      ctx.restore();
    };

    const drawBone = (b: { x: number; y: number }, t: number) => {
      ctx.save();
      ctx.translate(b.x, b.y + 22 + Math.sin(t * 3) * 1.5);
      ctx.rotate(-0.25);
      ctx.strokeStyle = INK;
      ctx.fillStyle = '#fff';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(-17, -4, 34, 8, 4);
      ctx.fill();
      ctx.stroke();
      for (const [cx, cy] of [[-20, -5], [-20, 5], [20, -5], [20, 5]] as const) {
        ctx.beginPath();
        ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.roundRect(-17, -3, 34, 6, 3);
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (x: number, y: number, size: number, a: number) => {
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(x, y);
      ctx.scale(size, size);
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.bezierCurveTo(-11, -3, -6, -12, 0, -6);
      ctx.bezierCurveTo(6, -12, 11, -3, 0, 5);
      ctx.fill();
      ctx.restore();
    };

    const drawPrint = (p: Print) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.a * 0.35;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, 3.4, 2.8, 0, 0, Math.PI * 2);
      ctx.stroke();
      for (const [dx, dy] of [[-4.2, -4.8], [-1.4, -6.4], [1.6, -6.4], [4.4, -4.8]] as const) {
        ctx.beginPath();
        ctx.arc(dx, dy, 1.1, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawBubble = (text: string, a: number) => {
      ctx.save();
      ctx.font = '600 13px Inter, system-ui, sans-serif';
      const bw = ctx.measureText(text).width + 22;
      const x = dog.x - bw / 2 + dog.face * 6;
      const y = dog.y - 118;
      ctx.globalAlpha = Math.min(1, a * 2);
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(x, y, bw, 28, 14);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(dog.x - 5 + dog.face * 6, y + 28);
      ctx.lineTo(dog.x + dog.face * 6, y + 36);
      ctx.lineTo(dog.x + 5 + dog.face * 6, y + 28);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = INK;
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x + 11, y + 14.5);
      ctx.restore();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const t = now / 1000;
      if (appearedAt < 0 || !activeRef.current) return; // 오프닝이 끝나기 전, 그리고 첫 화면을 지난 뒤에는 쉰다

      // ----- 어디로 갈지: 마우스와 상관없이 혼자 돌아다니다가 가끔 앉아서 쉰다 -----
      if (eating > 0) eating -= dt;
      if (bone.on) {
        restLeft = 0;
      } else if (restLeft > 0) {
        restLeft -= dt;
      } else if (Math.hypot(wander.x - dog.x, wander.y - dog.y) < 26) {
        restLeft = rnd(1.8, 4.5);
        wander.x = rnd(W * 0.06, W * 0.94);
        wander.y = rnd(H * 0.2, H * 0.9);
      }
      const goalX = bone.on ? bone.x : wander.x;
      const goalY = bone.on ? bone.y : wander.y;
      // 간식에 닿으면 맛있게 먹는다
      if (bone.on && Math.hypot(goalX - dog.x, goalY - dog.y) < 36) {
        bone.on = false;
        eating = 2.4;
        restLeft = 2.4;
        spawnHearts(dog.x + dog.face * 30, dog.y - 70, 7);
        dog.wag = 1.2;
        bubble = { text: '냠냠!', t: 1.8 };
      }
      const resting = restLeft > 0 || eating > 0;
      const dx = goalX - dog.x;
      const dy = goalY - dog.y;
      const dist = Math.hypot(dx, dy) || 1;
      const want = resting ? 0 : Math.min(bone.on ? 260 : 120, dist * (bone.on ? 2.2 : 1.4));
      const k = Math.min(1, dt * 3);
      dog.vx += ((dx / dist) * want - dog.vx) * k;
      dog.vy += ((dy / dist) * want - dog.vy) * k;
      dog.x += dog.vx * dt;
      dog.y += dog.vy * dt;
      const speed = Math.hypot(dog.vx, dog.vy);
      if (Math.abs(dog.vx) > 14) dog.face = dog.vx > 0 ? 1 : -1;

      // ----- 상태 -----
      if (speed > 26) mode = 'walk';
      else mode = resting ? 'sit' : 'stand';
      dog.sit += ((mode === 'sit' ? 1 : 0) - dog.sit) * Math.min(1, dt * 6);
      dog.wag = Math.max(0, dog.wag - dt * 0.8);
      dog.hop = Math.max(0, dog.hop - dt * 2);
      if (mode === 'walk') dog.phase += dt * (6 + speed * 0.018);

      // ----- 발자국 -----
      if (mode === 'walk') {
        dog.stepDist += speed * dt;
        if (dog.stepDist > 46) {
          dog.stepDist = 0;
          dog.side *= -1;
          const ang = Math.atan2(dog.vy, dog.vx) + Math.PI / 2;
          prints.push({ x: dog.x - dog.face * 4 + Math.cos(ang) * 5 * dog.side, y: dog.y + 28 + Math.sin(ang) * 5 * dog.side, a: 1, rot: ang });
          if (prints.length > MAX_PRINTS) prints.shift();
        }
      }
      for (let i = prints.length - 1; i >= 0; i--) {
        prints[i].a -= dt / 7;
        if (prints[i].a <= 0) prints.splice(i, 1);
      }

      // ----- 그리기 -----
      ctx.clearRect(0, 0, W, H);
      prints.forEach(drawPrint);
      if (bone.on) drawBone(bone, t);
      // 발자국 끝에서 스르륵 나타난다
      ctx.globalAlpha = Math.min(1, (now - appearedAt) / 500);
      drawDog(t, speed);
      ctx.globalAlpha = 1;
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.y -= 38 * dt;
        h.a -= dt * 0.7;
        if (h.a <= 0) {
          hearts.splice(i, 1);
          continue;
        }
        drawHeart(h.x, h.y, h.s, h.a);
      }
      if (bubble) {
        bubble.t -= dt;
        if (bubble.t <= 0) bubble = null;
        else drawBubble(bubble.text, bubble.t);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('intro-done', onIntroDone);
      window.removeEventListener('dog-treat', onTreat);
      window.removeEventListener('click', onClick);
    };
  }, []);

  // z-index를 음수로 두어 모든 글과 이미지 뒤에 그려진다 (글씨를 가리지 않는다)
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700 print:hidden ${active ? 'opacity-100' : 'opacity-0'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
