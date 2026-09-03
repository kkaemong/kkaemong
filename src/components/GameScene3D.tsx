'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { Image as DreiImage, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData, type Project } from '@/data/portfolio';

// A horizontal row of real project screenshots on the site's usual sketchbook
// paper, each card tilting toward the cursor like it's being picked up off
// the desk. Card interactivity replaces the old whole-scene camera parallax —
// the pencil cursor (added in InteractiveGameMode) carries the "look, it
// follows you" feeling instead.
const ACCENTS = ['#3B82F6', '#F472B6', '#10B981', '#F59E0B'];

interface CardSpec {
  position: [number, number, number];
  rotationZ: number;
}

const CARD_LAYOUT: CardSpec[] = [
  { position: [-6.0, 0.3, 0], rotationZ: -0.05 },
  { position: [-3.0, -0.25, 0.15], rotationZ: 0.04 },
  { position: [0.0, 0.3, -0.1], rotationZ: -0.03 },
  { position: [3.0, -0.25, 0.15], rotationZ: 0.05 },
];
const CONTACT_CARD: CardSpec = { position: [6.0, 0.3, 0], rotationZ: -0.04 };

// ================= SKETCHBOOK BACKDROP =================
// The site's signature notebook-graph-paper pattern, wrapped around the
// scene as a skydome. Unlit so lighting doesn't wash it out.
function useNotebookGridTexture() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#faf9f6';
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = '#d7dce3';
      ctx.lineWidth = 3;
      const step = size / 8;
      for (let i = 0; i <= size; i += step) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(size, i);
        ctx.stroke();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 6);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function SketchbookBackdrop() {
  const texture = useNotebookGridTexture();
  return (
    <mesh>
      <sphereGeometry args={[26, 32, 32]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} fog toneMapped={false} />
    </mesh>
  );
}

// Grows a group from nothing into place on mount, eased — cards assemble
// into the row instead of popping in all at once.
function useEntranceScale(delay: number) {
  const ref = useRef<THREE.Group>(null);
  const startRef = useRef<number | null>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    if (startRef.current === null) startRef.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startRef.current - delay;
    const target = elapsed > 0 ? 1 : 0.0001;
    ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, target, 4.5, delta));
  });
  return ref;
}

// ================= PROJECT CARD =================
// Outer group carries the entrance scale + the resting desk-tilt (rotationZ).
// Inner group carries the *dynamic* tilt toward the cursor, computed from
// where over the card's own surface (UV) the pointer currently is — picked
// up off the page rather than a flat billboard.
function ProjectCard({
  project,
  spec,
  accent,
  delay,
  onSelect,
}: {
  project: Project;
  spec: CardSpec;
  accent: string;
  delay: number;
  onSelect: (project: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const entranceRef = useEntranceScale(delay);
  const tiltRef = useRef<THREE.Group>(null);
  const pointerOffset = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!tiltRef.current) return;
    const targetX = hovered ? -pointerOffset.current.y * 0.4 : 0;
    const targetY = hovered ? pointerOffset.current.x * 0.4 : 0;
    tiltRef.current.rotation.x = THREE.MathUtils.damp(tiltRef.current.rotation.x, targetX, 8, delta);
    tiltRef.current.rotation.y = THREE.MathUtils.damp(tiltRef.current.rotation.y, targetY, 8, delta);
  });

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (!e.uv) return;
    pointerOffset.current = { x: e.uv.x - 0.5, y: e.uv.y - 0.5 };
  };
  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onSelect(project);
  };

  return (
    <group ref={entranceRef} scale={0.0001} position={spec.position} rotation={[0, 0, spec.rotationZ]}>
      <group
        ref={tiltRef}
        scale={hovered ? 1.08 : 1}
        onPointerMove={handleMove}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
      >
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[2.1, 1.4]} />
          <meshStandardMaterial
            color={hovered ? accent : '#ffffff'}
            emissive={hovered ? accent : '#000000'}
            emissiveIntensity={hovered ? 0.25 : 0}
          />
        </mesh>
        <DreiImage url={project.image ?? '/decorations/star.png'} scale={[1.94, 1.24]} radius={0.05} transparent />
      </group>

      <Html position={[0, -0.98, 0]} center distanceFactor={7.5} occlude>
        <div className="pointer-events-none select-none text-center" style={{ width: 190 }}>
          <p className="sketch-font font-extrabold text-slate-900 text-sm leading-tight drop-shadow-sm">
            {project.title}
          </p>
          <p className="text-[10px] font-semibold mt-0.5" style={{ color: accent }}>
            {project.type}
          </p>
        </div>
      </Html>
    </group>
  );
}

// Same tilt behavior as a project card, ending the row with an inviting CTA.
function ContactCard({ onOpenResume, delay }: { onOpenResume: () => void; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const entranceRef = useEntranceScale(delay);
  const tiltRef = useRef<THREE.Group>(null);
  const pointerOffset = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!tiltRef.current) return;
    const targetX = hovered ? -pointerOffset.current.y * 0.4 : 0;
    const targetY = hovered ? pointerOffset.current.x * 0.4 : 0;
    tiltRef.current.rotation.x = THREE.MathUtils.damp(tiltRef.current.rotation.x, targetX, 8, delta);
    tiltRef.current.rotation.y = THREE.MathUtils.damp(tiltRef.current.rotation.y, targetY, 8, delta);
  });

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (!e.uv) return;
    pointerOffset.current = { x: e.uv.x - 0.5, y: e.uv.y - 0.5 };
  };

  return (
    <group ref={entranceRef} scale={0.0001} position={CONTACT_CARD.position} rotation={[0, 0, CONTACT_CARD.rotationZ]}>
      <group
        ref={tiltRef}
        scale={hovered ? 1.08 : 1}
        onPointerMove={handleMove}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); onOpenResume(); }}
      >
        <mesh>
          <planeGeometry args={[1.7, 1.4]} />
          <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={hovered ? 0.5 : 0.3} />
        </mesh>
      </group>
      <Html center distanceFactor={7.5} occlude>
        <div className="pointer-events-none select-none text-center" style={{ width: 150 }}>
          <p className="sketch-font font-extrabold text-white text-base leading-tight">이력서 전체 보기</p>
          <p className="text-[10px] font-semibold text-white/80 mt-1">Let&apos;s Connect →</p>
        </div>
      </Html>
    </group>
  );
}

interface GameScene3DProps {
  onSelectProject: (project: Project) => void;
  onOpenResume: () => void;
}

export default function GameScene3D({ onSelectProject, onOpenResume }: GameScene3DProps) {
  const { projects, skills, contact } = portfolioData;
  const skillNames = [...skills.main, ...skills.sub].map((s) => s.name);

  return (
    <Canvas camera={{ position: [-1, 0, 14.5], fov: 44 }} gl={{ antialias: true }} dpr={[1, 2]}>
      <color attach="background" args={['#FAF9F6']} />
      <fog attach="fog" args={['#FAF9F6', 18, 32]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.0} />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#93C5FD" />

      <SketchbookBackdrop />
      <Sparkles count={70} scale={13} size={2} speed={0.25} color="#93c5fd" position={[0, 1, -1]} />

      <Html position={[-8.6, 0.3, 0]} center>
        <div className="pointer-events-none select-none text-center" style={{ width: 220 }}>
          <p className="sketch-font font-extrabold text-slate-900 text-4xl sm:text-5xl leading-none drop-shadow-sm">
            진준영
          </p>
          <p className="text-blue-600 font-bold text-xs tracking-[0.2em] mt-2.5">GAME CLIENT DEVELOPER</p>

          <div className="flex flex-wrap justify-center gap-1.5 mt-4">
            {skillNames.map((name) => (
              <span
                key={name}
                className="sketch-font text-[10px] font-bold text-slate-600 bg-white border border-slate-200 rounded-full px-2 py-1 shadow-xs"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="pointer-events-auto flex items-center justify-center gap-2.5 mt-4">
            <button
              onClick={onOpenResume}
              className="px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-bold shadow-md hover:bg-blue-600 active:scale-95 transition-all cursor-pointer"
            >
              이력서 전체 보기
            </button>
            <a
              href={`https://${contact.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold text-slate-500 hover:text-blue-600 bg-white px-2 py-1.5 rounded-full border border-slate-200 shadow-xs transition-colors"
            >
              GitHub
            </a>
            <a
              href={contact.blog}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold text-slate-500 hover:text-blue-600 bg-white px-2 py-1.5 rounded-full border border-slate-200 shadow-xs transition-colors"
            >
              Blog
            </a>
          </div>
        </div>
      </Html>

      {projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project as Project}
          spec={CARD_LAYOUT[i]}
          accent={ACCENTS[i % ACCENTS.length]}
          delay={0.3 + i * 0.15}
          onSelect={onSelectProject}
        />
      ))}
      <ContactCard onOpenResume={onOpenResume} delay={0.3 + projects.length * 0.15} />
    </Canvas>
  );
}
