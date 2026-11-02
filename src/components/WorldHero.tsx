'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Hero from './Hero';
import { GREETING, currentPeriod, type Period } from '@/lib/timeOfDay';

type Weather = 'clear' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'storm';

const WEATHER_LINE: Record<Weather, string> = {
  clear: '하늘이 맑게 트인 날이네요.',
  cloudy: '구름이 낮게 깔린 하루네요.',
  fog: '안개가 자욱한 날이에요.',
  rain: '창밖에 비가 내리고 있어요.',
  snow: '눈이 소복이 내리는 날이네요.',
  storm: '천둥이 치는 날, 찾아와 주셨네요.',
};

// 날씨가 하늘·구름·입자에 주는 영향
const WEATHER_FX: Record<Weather, { gray: number; clouds: number; rain: number; snow: number; fog: number; storm: number }> = {
  clear: { gray: 0, clouds: 3, rain: 0, snow: 0, fog: 0, storm: 0 },
  cloudy: { gray: 0.45, clouds: 8, rain: 0, snow: 0, fog: 0, storm: 0 },
  fog: { gray: 0.5, clouds: 4, rain: 0, snow: 0, fog: 1, storm: 0 },
  rain: { gray: 0.6, clouds: 9, rain: 1, snow: 0, fog: 0.25, storm: 0 },
  snow: { gray: 0.45, clouds: 8, rain: 0, snow: 1, fog: 0.2, storm: 0 },
  storm: { gray: 0.75, clouds: 10, rain: 1, snow: 0, fog: 0.2, storm: 1 },
};

// 시간대별 팔레트: 하늘(위/아래), 산 4겹, 해·달, 구름, 별
const PALETTE: Record<Period, { top: string; bottom: string; hills: string[]; sun: string; sunPos: [number, number]; cloud: string; stars: number; moon: boolean }> = {
  dawn: { top: '#2f3468', bottom: '#f3a99a', hills: ['#7a6a98', '#5a5282', '#3f3a6a', '#2a2650'], sun: '#ffd7a8', sunPos: [0.25, 0.6], cloud: '#f2b8b8', stars: 0.5, moon: false },
  morning: { top: '#6fa8e8', bottom: '#fdeccb', hills: ['#b4c8d6', '#93b6a2', '#6f9a7e', '#4d7a5e'], sun: '#fff2c4', sunPos: [0.2, 0.3], cloud: '#ffffff', stars: 0, moon: false },
  noon: { top: '#3b8fe0', bottom: '#d2e9fb', hills: ['#a8d0b6', '#82b894', '#5fa076', '#3f8458'], sun: '#ffffff', sunPos: [0.65, 0.14], cloud: '#ffffff', stars: 0, moon: false },
  evening: { top: '#3a3566', bottom: '#ff9a5a', hills: ['#a8707f', '#7a4f6c', '#4f3358', '#321f40'], sun: '#ff7a3a', sunPos: [0.78, 0.55], cloud: '#ffae86', stars: 0.15, moon: false },
  night: { top: '#050816', bottom: '#1b2a4a', hills: ['#2a3b5e', '#1b2b48', '#101c34', '#0a1224'], sun: '#eaf0ff', sunPos: [0.7, 0.2], cloud: '#34466e', stars: 1, moon: true },
};

const hexToRgb = (h: string): [number, number, number] => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a: string, b: string, t: number) => {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * t)},${Math.round(A[1] + (B[1] - A[1]) * t)},${Math.round(A[2] + (B[2] - A[2]) * t)})`;
};

function codeToWeather(code: number): Weather {
  if (code >= 95) return 'storm';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 1) return 'cloudy';
  return 'clear';
}

function forcedWeather(): Weather | null {
  const w = new URLSearchParams(window.location.search).get('weather');
  return w && w in WEATHER_FX ? (w as Weather) : null;
}

// 좁은 화면이 아니라 모션 줄이기 설정에서만 기존 히어로를 보여준다
const FALLBACK_QUERY = '(prefers-reduced-motion: reduce)';
const subscribeFallback = (cb: () => void) => {
  const mq = window.matchMedia(FALLBACK_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const getFallback = () => window.matchMedia(FALLBACK_QUERY).matches;
const subscribeNone = () => () => {};

export default function WorldHero() {
  const fallback = useSyncExternalStore(subscribeFallback, getFallback, () => true);
  if (fallback) return <Hero />;
  return <WorldInner />;
}

interface Drop {
  x: number;
  y: number;
  v: number;
  s: number;
}

function WorldInner() {
  const period = useSyncExternalStore(subscribeNone, (): Period => currentPeriod(), () => null);
  const [weather, setWeather] = useState<Weather>('clear');
  const [started, setStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const periodRef = useRef<Period | null>(null);
  const weatherRef = useRef<Weather>('clear');

  // 날씨 가져오기: 한국 시간대일 때 서울 기준. 실패하거나 다른 지역이면 시간대 연출만 보여준다.
  useEffect(() => {
    const forced = forcedWeather();
    if (forced) {
      const t = setTimeout(() => setWeather(forced), 0);
      return () => clearTimeout(t);
    }
    if (Intl.DateTimeFormat().resolvedOptions().timeZone !== 'Asia/Seoul') return;
    const ctrl = new AbortController();
    fetch('https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&current=weather_code', { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => setWeather(codeToWeather(d.current.weather_code)))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    periodRef.current = period;
    weatherRef.current = weather;
  }, [period, weather]);

  useEffect(() => {
    if (!period) return;
    const t = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(t);
  }, [period]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = section.clientWidth;
      H = section.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    // 입자와 구름은 한 번 만들어 두고, 날씨가 바뀌면 보이는 양만 서서히 조절한다
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const rain: Drop[] = Array.from({ length: 260 }, () => ({ x: Math.random(), y: Math.random(), v: rnd(0.9, 1.6), s: rnd(0.6, 1) }));
    const snow: Drop[] = Array.from({ length: 170 }, () => ({ x: Math.random(), y: Math.random(), v: rnd(0.05, 0.14), s: rnd(1.2, 3.4) }));
    const clouds = Array.from({ length: 10 }, (_, i) => ({ x: Math.random(), y: rnd(0.06, 0.38), s: rnd(0.7, 1.5), v: rnd(0.004, 0.012), i }));
    const stars = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random() * 0.55, r: rnd(0.4, 1.4), p: Math.random() * 6 }));

    const fx = { gray: 0, clouds: 3, rain: 0, snow: 0, fog: 0, storm: 0 };
    const mouse = { x: 0.5, y: 0.7, last: 0 };
    const stone = { x: 0.5, y: 0.8, vx: 0, vy: 0, face: 1, wx: 0.5, wy: 0.8, wt: 0 };
    let flash = 0;
    let flashT = 3;

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
      mouse.last = performance.now();
    };
    window.addEventListener('pointermove', onMove);

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(section);

    const hill = (i: number, mx: number, color: string) => {
      const base = H * (0.52 + i * 0.1);
      const amp = H * (0.045 + i * 0.012);
      const seed = i * 2.7 + 1;
      const ox = (mx - 0.5) * (i + 1) * -22;
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = -20; x <= W + 20; x += 12) {
        const sx = x + ox;
        ctx.lineTo(x, base + Math.sin(sx * 0.004 + seed) * amp + Math.sin(sx * 0.011 + seed * 2) * amp * 0.5);
      }
      ctx.lineTo(W + 20, H);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawStone = (x: number, y: number, s: number, hop: number, sx: number, sy: number, face: number, look: [number, number], w: Weather, t: number, night: boolean) => {
      // 그림자
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(x, y, 34 * s * (1 - hop * 0.012), 9 * s * (1 - hop * 0.012), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(x, y - hop * s);
      ctx.scale(sx * s, sy * s);
      // 몸
      const g = ctx.createRadialGradient(-10, -42, 6, 0, -30, 44);
      g.addColorStop(0, '#c4cad2');
      g.addColorStop(1, '#6a7480');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, -30, 36, 31, 0, 0, Math.PI * 2);
      ctx.fill();
      // 눈
      const ex = look[0] * 3;
      const ey = look[1] * 2;
      ctx.fillStyle = '#fff';
      for (const dx of [-11, 11]) {
        ctx.beginPath();
        ctx.ellipse(dx, -34, w === 'storm' ? 8 : 6.5, w === 'storm' ? 9 : 7.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#222';
      for (const dx of [-11, 11]) {
        ctx.beginPath();
        ctx.arc(dx + ex, -34 + ey, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      // 입
      ctx.strokeStyle = '#3a424b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -22, 6, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
      // 목도리 (눈 오는 날)
      if (w === 'snow') {
        ctx.fillStyle = '#e05a5a';
        ctx.fillRect(-26, -14, 52, 9);
      }
      // 돋보기
      ctx.save();
      ctx.translate(face * 34, -22);
      ctx.rotate(face * (0.5 + Math.sin(t * 3) * 0.06));
      ctx.strokeStyle = '#3a2f26';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 22);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -10, 13, 0, Math.PI * 2);
      ctx.fillStyle = night ? 'rgba(255,244,190,0.75)' : 'rgba(190,225,250,0.55)';
      ctx.fill();
      ctx.strokeStyle = '#3a2f26';
      ctx.lineWidth = 3.5;
      ctx.stroke();
      ctx.restore();
      // 우산 (비 오는 날)
      if (w === 'rain' || w === 'storm') {
        ctx.strokeStyle = '#3a2f26';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-face * 4, -60);
        ctx.lineTo(-face * 4, -84);
        ctx.stroke();
        ctx.fillStyle = '#4b6fd1';
        ctx.beginPath();
        ctx.arc(-face * 4, -84, 38, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    let raf = 0;
    let prev = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const p = periodRef.current;
      if (!p || !visible) return;
      const t = now / 1000;
      const pal = PALETTE[p];
      const tgt = WEATHER_FX[weatherRef.current];
      const k = 1 - Math.exp(-2 * dt);
      (Object.keys(fx) as (keyof typeof fx)[]).forEach((key) => {
        fx[key] += (tgt[key] - fx[key]) * k;
      });

      const night = p === 'night';
      const grayTone = night ? '#2a3040' : '#8a929c';
      const top = mix(pal.top, grayTone, fx.gray);
      const bottom = mix(pal.bottom, grayTone, fx.gray * 0.85);

      // 하늘
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.75);
      sky.addColorStop(0, top);
      sky.addColorStop(1, bottom);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // 별
      if (pal.stars > 0) {
        const a = pal.stars * (1 - fx.gray);
        stars.forEach((s) => {
          ctx.globalAlpha = a * (0.55 + 0.45 * Math.sin(t * 1.5 + s.p));
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      // 해/달과 빛
      const sunA = Math.max(0, 1 - fx.gray * 1.25);
      if (sunA > 0.02) {
        const sx = pal.sunPos[0] * W + (mouse.x - 0.5) * -18;
        const sy = pal.sunPos[1] * H;
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, H * 0.55);
        glow.addColorStop(0, pal.sun);
        glow.addColorStop(0.12, pal.sun);
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalAlpha = sunA * 0.5;
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = sunA;
        ctx.fillStyle = pal.sun;
        ctx.beginPath();
        ctx.arc(sx, sy, pal.moon ? 34 : 42, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 구름
      clouds.forEach((c) => {
        c.x += c.v * dt;
        if (c.x > 1.2) c.x = -0.2;
        const show = Math.min(1, Math.max(0, fx.clouds - c.i));
        if (show <= 0.01) return;
        const cx = c.x * W + (mouse.x - 0.5) * -12 * c.s;
        const cy = c.y * H;
        const r = 38 * c.s;
        ctx.globalAlpha = 0.85 * show;
        ctx.fillStyle = mix(pal.cloud, night ? '#1a2236' : '#6c747e', fx.gray * 0.9);
        for (const [dx, dy, rr] of [[0, 0, 1], [1.1, 0.15, 0.8], [-1.1, 0.2, 0.75], [0.4, -0.45, 0.7]] as const) {
          ctx.beginPath();
          ctx.ellipse(cx + dx * r, cy + dy * r, r * rr * 1.5, r * rr * 0.78, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });

      // 산 4겹
      const hillMix = fx.gray * 0.5;
      pal.hills.forEach((h, i) => hill(i, mouse.x, mix(h, grayTone, hillMix)));

      // 안개
      if (fx.fog > 0.02) {
        for (let i = 0; i < 3; i++) {
          const fy = H * (0.5 + i * 0.12);
          const fg = ctx.createLinearGradient(0, fy - 60, 0, fy + 60);
          fg.addColorStop(0, 'rgba(235,240,245,0)');
          fg.addColorStop(0.5, `rgba(235,240,245,${0.5 * fx.fog})`);
          fg.addColorStop(1, 'rgba(235,240,245,0)');
          ctx.fillStyle = fg;
          ctx.fillRect(((t * 8 * (i + 1)) % (W + 300)) - 300 + (i % 2) * 100, fy - 60, W + 300, 120);
          ctx.fillRect(((t * 8 * (i + 1)) % (W + 300)) - 2 * 300 - W + (i % 2) * 100, fy - 60, W + 300, 120);
        }
      }

      // 돌멩이: 마우스를 따라 땅 위를 걷는다. 가만히 있으면 혼자 돌아다닌다.
      const yMin = H * 0.74;
      const yMax = H * 0.93;
      const idle = now - mouse.last > 2500;
      if (idle) {
        stone.wt -= dt;
        if (stone.wt <= 0) {
          stone.wx = rnd(0.12, 0.88);
          stone.wy = rnd(0.2, 0.9);
          stone.wt = rnd(2, 4);
        }
      }
      const tx = (idle ? stone.wx : mouse.x) * W;
      const ty = yMin + (idle ? stone.wy : Math.min(1, Math.max(0, mouse.y))) * (yMax - yMin);
      const px = stone.x;
      const py = stone.y;
      // 스프링 추종
      const sk = 6;
      const sd = 2 * Math.sqrt(sk) * 0.9;
      stone.vx += ((tx - stone.x) * sk - stone.vx * sd) * dt;
      stone.vy += ((ty - stone.y) * sk - stone.vy * sd) * dt;
      stone.x += stone.vx * dt;
      stone.y += stone.vy * dt;
      const speed = Math.hypot(stone.x - px, stone.y - py) / Math.max(dt, 0.001);
      if (Math.abs(stone.vx) > 14) stone.face += ((stone.vx > 0 ? 1 : -1) - stone.face) * Math.min(1, dt * 10);
      const depth = (stone.y - yMin) / (yMax - yMin);
      const s = 0.85 + Math.min(1, Math.max(0, depth)) * 1.1;
      const moving = Math.min(1, speed / 220);
      const hop = moving > 0.12 ? Math.abs(Math.sin(t * 11)) * 22 * moving : Math.sin(t * 2) * 1.5;
      const stretch = Math.min(0.18, speed / 2600);
      const lookX = Math.max(-1, Math.min(1, (mouse.x * W - stone.x) / 300));
      const lookY = Math.max(-1, Math.min(1, (mouse.y * H - stone.y) / 300));
      drawStone(stone.x, stone.y, s, hop, (1 - stretch) * (0.85 + 0.15 * Math.abs(stone.face)), 1 + stretch, stone.face >= 0 ? 1 : -1, [lookX, lookY], weatherRef.current, t, night);

      // 비
      if (fx.rain > 0.02) {
        ctx.strokeStyle = `rgba(200,215,235,${0.55 * fx.rain})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const n = Math.floor(rain.length * fx.rain);
        for (let i = 0; i < n; i++) {
          const d = rain[i];
          d.y += d.v * dt * 1.1;
          d.x -= d.v * dt * 0.12;
          if (d.y > 1) {
            d.y = -0.05;
            d.x = Math.random() * 1.1;
          }
          const x = d.x * W;
          const y = d.y * H;
          ctx.moveTo(x, y);
          ctx.lineTo(x - 3 * d.s, y + 16 * d.s);
        }
        ctx.stroke();
      }
      // 눈
      if (fx.snow > 0.02) {
        ctx.fillStyle = `rgba(255,255,255,${0.9 * fx.snow})`;
        const n = Math.floor(snow.length * fx.snow);
        for (let i = 0; i < n; i++) {
          const d = snow[i];
          d.y += d.v * dt;
          if (d.y > 1) {
            d.y = -0.03;
            d.x = Math.random();
          }
          const x = d.x * W + Math.sin(t * 0.8 + i) * 18;
          ctx.beginPath();
          ctx.arc(x, d.y * H, d.s, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // 천둥
      if (fx.storm > 0.3) {
        flashT -= dt;
        if (flashT <= 0) {
          flash = 1;
          flashT = rnd(3, 7);
        }
      }
      if (flash > 0.01) {
        ctx.fillStyle = `rgba(255,255,255,${flash * 0.55})`;
        ctx.fillRect(0, 0, W, H);
        flash *= Math.pow(0.02, dt);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen min-h-[560px] overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label="시간과 날씨에 따라 달라지는 풍경" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black/25 via-black/5 to-transparent" />

      <AnimatePresence>
        {period && started && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            className="pointer-events-none absolute inset-x-0 top-[18%] z-10 px-6 text-center text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
          >
            <p className="mx-auto max-w-2xl whitespace-pre-line break-keep font-serif text-2xl font-medium leading-relaxed sm:text-4xl sm:leading-relaxed">{GREETING[period]}</p>
            <p className="mt-4 text-sm font-medium text-white/85 sm:text-base">{WEATHER_LINE[weather]}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
        SCROLL
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
