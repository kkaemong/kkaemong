'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, FileText, Sparkles, X, ArrowLeft, ArrowUp, ArrowDown, ArrowRight as ArrowRightIcon, ExternalLink } from 'lucide-react';
import { portfolioData, type Project } from '@/data/portfolio';
import ProjectModal from './ProjectModal';

interface InteractiveGameModeProps {
  onSwitchToStandard: () => void;
  onBackToLanding?: () => void;
}

interface Booth {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  projectData?: Project;
  customType?: 'ABOUT' | 'EXPERIENCE';
}

export default function InteractiveGameMode({ onSwitchToStandard, onBackToLanding }: InteractiveGameModeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { projects } = portfolioData;

  // Selected item for Retro Dialogue Box or Modal
  const [activeBooth, setActiveBooth] = useState<Booth | null>(null);
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);
  const [nearBooth, setNearBooth] = useState<Booth | null>(null);
  const nearBoothRef = useRef<Booth | null>(null);

  // Booth definitions
  const booths: Booth[] = [
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'Game Client Dev',
      icon: '👤',
      x: 180,
      y: 120,
      width: 140,
      height: 100,
      color: '#3B82F6',
      customType: 'ABOUT',
    },
    {
      id: 'gifted',
      title: 'GIFTED',
      subtitle: 'Unity 3D 캐주얼 게임',
      icon: '📦',
      x: 500,
      y: 120,
      width: 150,
      height: 100,
      color: '#6366F1',
      projectData: projects.find((p) => p.id === 'gifted'),
    },
    {
      id: 'zabonzooet',
      title: '자본주 E.T.',
      subtitle: 'Unity 2D 러너 (우수상)',
      icon: '🏃',
      x: 820,
      y: 120,
      width: 150,
      height: 100,
      color: '#EC4899',
      projectData: projects.find((p) => p.id === 'zabonzooet'),
    },
    {
      id: 'gaesorelay',
      title: '개소릴레이',
      subtitle: 'React 실시간 웹소켓',
      icon: '🐶',
      x: 240,
      y: 380,
      width: 150,
      height: 100,
      color: '#F59E0B',
      projectData: projects.find((p) => p.id === 'gaesorelay'),
    },
    {
      id: 'ssaiet',
      title: 'SSAIET',
      subtitle: 'Django · Vue 헬스케어',
      icon: '🥗',
      x: 760,
      y: 380,
      width: 150,
      height: 100,
      color: '#10B981',
      projectData: projects.find((p) => p.id === 'ssaiet'),
    },
    {
      id: 'experience',
      title: '경력 및 SSAFY',
      subtitle: 'Experience & Edu',
      icon: '🎓',
      x: 500,
      y: 430,
      width: 160,
      height: 100,
      color: '#8B5CF6',
      customType: 'EXPERIENCE',
    },
  ];

  // Game Engine State
  const playerRef = useRef({
    x: 500,
    y: 280,
    speed: 4.5,
    radius: 18,
    dir: 'S',
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});

  // Touch control handlers
  const handleTouchDir = (dir: string, active: boolean) => {
    if (dir === 'UP') keysRef.current['KeyW'] = active;
    if (dir === 'DOWN') keysRef.current['KeyS'] = active;
    if (dir === 'LEFT') keysRef.current['KeyA'] = active;
    if (dir === 'RIGHT') keysRef.current['KeyD'] = active;
  };

  // Main Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;

      // Space or E key to interact
      if ((e.code === 'Space' || e.code === 'KeyE') && nearBoothRef.current) {
        setActiveBooth(nearBoothRef.current);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Canvas render function
    const render = () => {
      const p = playerRef.current;
      const keys = keysRef.current;

      // Movement
      let dx = 0;
      let dy = 0;
      if (keys['KeyW'] || keys['ArrowUp']) { dy -= 1; p.dir = 'N'; }
      if (keys['KeyS'] || keys['ArrowDown']) { dy += 1; p.dir = 'S'; }
      if (keys['KeyA'] || keys['ArrowLeft']) { dx -= 1; p.dir = 'W'; }
      if (keys['KeyD'] || keys['ArrowRight']) { dx += 1; p.dir = 'E'; }

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      // Update position with boundaries
      p.x = Math.max(40, Math.min(960, p.x + dx * p.speed));
      p.y = Math.max(40, Math.min(560, p.y + dy * p.speed));

      // Check proximity to booths
      let closestBooth: Booth | null = null;
      let minDistance = 90;

      booths.forEach((b) => {
        const boothCenterX = b.x;
        const boothCenterY = b.y;
        const dist = Math.hypot(p.x - boothCenterX, p.y - boothCenterY);
        if (dist < minDistance) {
          closestBooth = b;
        }
      });

      if (nearBoothRef.current?.id !== closestBooth?.id) {
        nearBoothRef.current = closestBooth;
        setNearBooth(closestBooth);
      }

      // Clear Canvas
      ctx.fillStyle = '#0F172A'; // Slate 900
      ctx.fillRect(0, 0, 1000, 600);

      // Draw Grid Floor Pattern (Pixel Hall Floor)
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 1;
      for (let x = 0; x < 1000; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 600);
        ctx.stroke();
      }
      for (let y = 0; y < 600; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1000, y);
        ctx.stroke();
      }

      // Draw Outer Boundary Walls
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 6;
      ctx.strokeRect(10, 10, 980, 580);

      // Draw Booths
      booths.forEach((b) => {
        const isNear = closestBooth?.id === b.id;

        // Booth Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(b.x - b.width / 2 + 6, b.y - b.height / 2 + 8, b.width, b.height);

        // Booth Base Box
        ctx.fillStyle = isNear ? b.color : '#1E293B';
        ctx.strokeStyle = b.color;
        ctx.lineWidth = isNear ? 3 : 2;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(b.x - b.width / 2, b.y - b.height / 2, b.width, b.height, 12);
        } else {
          ctx.rect(b.x - b.width / 2, b.y - b.height / 2, b.width, b.height);
        }
        ctx.fill();
        ctx.stroke();

        // Booth Icon & Title
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.icon, b.x, b.y - 12);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(b.title, b.x, b.y + 14);

        ctx.fillStyle = isNear ? '#F8FAFC' : '#94A3B8';
        ctx.font = '11px sans-serif';
        ctx.fillText(b.subtitle, b.x, b.y + 30);

        // Interactive Glow indicator
        if (isNear) {
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 2;
          ctx.strokeRect(b.x - b.width / 2 - 4, b.y - b.height / 2 - 4, b.width + 8, b.height + 8);
        }
      });

      // Draw Player Character (Pixel Hero Avatar)
      // Glow under player
      ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.beginPath();
      ctx.arc(p.x, p.y + 10, p.radius + 6, 0, Math.PI * 2);
      ctx.fill();

      // Body Circle / Character Sprite
      ctx.fillStyle = '#4F46E5'; // Indigo 600
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#818CF8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Player Eyes / Direction indicator
      ctx.fillStyle = '#FFFFFF';
      let eyeX1 = p.x - 5;
      let eyeX2 = p.x + 5;
      let eyeY = p.y - 3;
      if (p.dir === 'N') eyeY = p.y - 8;
      if (p.dir === 'S') eyeY = p.y + 2;
      if (p.dir === 'W') { eyeX1 = p.x - 8; eyeX2 = p.x - 2; }
      if (p.dir === 'E') { eyeX1 = p.x + 2; eyeX2 = p.x + 8; }

      ctx.beginPath();
      ctx.arc(eyeX1, eyeY, 3, 0, Math.PI * 2);
      ctx.arc(eyeX2, eyeY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Proximity Action Speech Bubble above Player
      if (closestBooth) {
        ctx.fillStyle = '#F59E0B'; // Amber
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('[Space / E] 상세 정보 보기', p.x, p.y - 28);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-4 relative overflow-hidden select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Mode Control Panel */}
      <header className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 py-3 px-6 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md shadow-xl z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
            <Gamepad2 size={20} />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2">
              <span>🎮 2D RPG 전시장 모드</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-500/30">
                Interactive Engine
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              방향키/WASD로 움직여 부스에 접근하면 상세 정보를 확인할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-md cursor-pointer border border-slate-700 hover:border-slate-600"
            >
              <ArrowLeft size={14} className="text-cyan-400" />
              <span>🔙 첫 선택 화면</span>
            </button>
          )}

          <button
            onClick={onSwitchToStandard}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-md cursor-pointer border border-slate-700 hover:border-slate-600"
          >
            <FileText size={15} />
            <span>📄 바로 포트폴리오 보기</span>
          </button>
        </div>
      </header>

      {/* Main 2D Canvas Area */}
      <main className="w-full max-w-5xl my-4 flex-1 flex flex-col items-center justify-center relative">
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-900">
          
          <canvas
            ref={canvasRef}
            width={1000}
            height={600}
            className="w-full h-auto max-h-[70vh] object-contain block cursor-pointer"
            onClick={() => {
              if (nearBooth) setActiveBooth(nearBooth);
            }}
          />

          {/* Quick Click Hint Overlay on Booth Hover */}
          {nearBooth && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-amber-500/50 text-amber-300 px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce pointer-events-none">
              <span>💡 {nearBooth.title} 부스 감상 가능! 클릭하거나 [Space]를 누르세요.</span>
            </div>
          )}

        </div>

        {/* Mobile On-Screen Touch Controls */}
        <div className="md:hidden mt-4 flex items-center justify-between w-full max-w-md px-4">
          <div className="grid grid-cols-3 gap-2 w-36 h-36">
            <div />
            <button
              onMouseDown={() => handleTouchDir('UP', true)}
              onMouseUp={() => handleTouchDir('UP', false)}
              onTouchStart={() => handleTouchDir('UP', true)}
              onTouchEnd={() => handleTouchDir('UP', false)}
              className="bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 active:bg-indigo-600 active:text-white"
            >
              <ArrowUp size={20} />
            </button>
            <div />

            <button
              onMouseDown={() => handleTouchDir('LEFT', true)}
              onMouseUp={() => handleTouchDir('LEFT', false)}
              onTouchStart={() => handleTouchDir('LEFT', true)}
              onTouchEnd={() => handleTouchDir('LEFT', false)}
              className="bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 active:bg-indigo-600 active:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onMouseDown={() => handleTouchDir('DOWN', true)}
              onMouseUp={() => handleTouchDir('DOWN', false)}
              onTouchStart={() => handleTouchDir('DOWN', true)}
              onTouchEnd={() => handleTouchDir('DOWN', false)}
              className="bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 active:bg-indigo-600 active:text-white"
            >
              <ArrowDown size={20} />
            </button>
            <button
              onMouseDown={() => handleTouchDir('RIGHT', true)}
              onMouseUp={() => handleTouchDir('RIGHT', false)}
              onTouchStart={() => handleTouchDir('RIGHT', true)}
              onTouchEnd={() => handleTouchDir('RIGHT', false)}
              className="bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 active:bg-indigo-600 active:text-white"
            >
              <ArrowRightIcon size={20} />
            </button>
          </div>

          {nearBooth && (
            <button
              onClick={() => setActiveBooth(nearBooth)}
              className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl active:scale-95 transition-transform"
            >
              상세 보기 🔍
            </button>
          )}
        </div>
      </main>

      {/* Retro Dialogue Box Modal */}
      <AnimatePresence>
        {activeBooth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-slate-900 border-2 border-indigo-500 rounded-2xl p-6 shadow-2xl text-white relative"
            >
              <button
                onClick={() => setActiveBooth(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{activeBooth.icon}</span>
                <div>
                  <h3 className="text-2xl font-black text-white">{activeBooth.title}</h3>
                  <p className="text-xs text-indigo-400 font-bold">{activeBooth.subtitle}</p>
                </div>
              </div>

              {/* Booth Content */}
              {activeBooth.customType === 'ABOUT' && (
                <div className="space-y-3 text-sm text-slate-300">
                  <p>안녕하세요! <strong>게임 클라이언트 개발자 진준영</strong>입니다.</p>
                  <p>C# 및 Unity를 기반으로 가비지 컬렉션(GC) 최소화, 프레임 안정화, 물리/상태 머신(FSM) 아키텍처 설계를 전담해 왔습니다.</p>
                  <div className="p-3 bg-slate-800 rounded-xl text-xs space-y-1 font-mono">
                    <p>🎓 SSAFY (삼성청년SW아카데미) 수료 (2025.07 ~ 2026.06)</p>
                    <p>🏆 핀테크 트랙 우수상 수상 (자본주 E.T.)</p>
                  </div>
                </div>
              )}

              {activeBooth.customType === 'EXPERIENCE' && (
                <div className="space-y-3 text-sm text-slate-300">
                  <h4 className="font-bold text-amber-400">🎓 SSAFY 교육 및 경력사항</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="p-2.5 bg-slate-800 rounded-lg">
                      <strong className="text-white">SSAFY 13기 교육생 (2025.07 ~ 2026.06)</strong><br />
                      웹 & 알고리즘 트랙 및 2학기 게임/풀스택 프로젝트 전담 완료
                    </li>
                    <li className="p-2.5 bg-slate-800 rounded-lg">
                      <strong className="text-white">K-Shield Jr. 보안 분석가 과정 수료</strong><br />
                      취약점 실증 및 리포트 작성
                    </li>
                  </ul>
                </div>
              )}

              {activeBooth.projectData && (
                <div className="space-y-4 text-sm">
                  <p className="text-slate-300 leading-relaxed">
                    {activeBooth.projectData.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {activeBooth.projectData.tech.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-800 text-indigo-300 rounded-md text-xs font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedModalProject(activeBooth.projectData || null);
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg"
                    >
                      <span>기술 최적화 상세 모달 보기</span>
                      <ExternalLink size={14} />
                    </button>

                    {activeBooth.projectData.github && (
                      <a
                        href={activeBooth.projectData.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-400 hover:text-white underline"
                      >
                        GitHub 저장소
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={() => setActiveBooth(null)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                >
                  탐색 계속하기 (닫기)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal Triggered from Game Mode */}
      {selectedModalProject && (
        <ProjectModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
        />
      )}
    </div>
  );
}
