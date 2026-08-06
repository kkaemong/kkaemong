'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Billboard,
  MeshReflectorMaterial,
  ContactShadows,
  Environment,
  Sparkles,
  Image as DreiImage,
  Html,
} from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData, type Project } from '@/data/portfolio';

const FLOOR_Y = -1.2;
const BOOTH_RADIUS = 4;

// ================= BRAND DOODLE PRIMITIVES =================
// Procedural geometry (no external models) echoing the site's hand-drawn
// pencil / star / heart decorations, now built as real 3D meshes.
function Pencil({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.8}>
      <group position={position} rotation={[0, 0, Math.PI / 5]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 1.6, 6]} />
          <meshStandardMaterial color="#EF4444" />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <coneGeometry args={[0.18, 0.35, 6]} />
          <meshStandardMaterial color="#FDE68A" />
        </mesh>
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.18, 6]} />
          <meshStandardMaterial color="#F472B6" />
        </mesh>
      </group>
    </Float>
  );
}

function Star({ position }: { position: [number, number, number] }) {
  const shape = React.useMemo(() => {
    const s = new THREE.Shape();
    const spikes = 5;
    const outerR = 0.55;
    const innerR = 0.24;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    return s;
  }, []);

  return (
    <Float speed={1.2} rotationIntensity={1.1} floatIntensity={1.1}>
      <mesh position={position}>
        <extrudeGeometry args={[shape, { depth: 0.18, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 }]} />
        <meshStandardMaterial color="#FBBF24" />
      </mesh>
    </Float>
  );
}

function Heart({ position }: { position: [number, number, number] }) {
  const shape = React.useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.35);
    s.bezierCurveTo(0, 0.55, -0.3, 0.65, -0.5, 0.45);
    s.bezierCurveTo(-0.75, 0.2, -0.55, -0.15, 0, -0.55);
    s.bezierCurveTo(0.55, -0.15, 0.75, 0.2, 0.5, 0.45);
    s.bezierCurveTo(0.3, 0.65, 0, 0.55, 0, 0.35);
    return s;
  }, []);

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh position={position} scale={0.7}>
        <extrudeGeometry args={[shape, { depth: 0.16, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 }]} />
        <meshStandardMaterial color="#F472B6" />
      </mesh>
    </Float>
  );
}

// ================= CENTER HUB =================
// The player's "home base": the original spinning doodle trio, plus a real
// HTML panel (Html-in-3D) so Korean text stays crisp — 3D vector text fonts
// don't ship Hangul glyphs, so this is the deliberate, readable choice.
function Hub({ onOpenResume }: { onOpenResume: () => void }) {
  const spinRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      <group ref={spinRef}>
        <Pencil position={[-1.1, 0.55, 0.1]} />
        <Star position={[1.0, 0.75, -0.3]} />
        <Heart position={[0.1, 0.3, 0.95]} />
      </group>

      <pointLight position={[0, 1.6, 0]} intensity={4} color="#93C5FD" distance={5} decay={2} />

      <Html position={[0, -0.45, 0]} center distanceFactor={7.5} occlude>
        <div className="pointer-events-none flex flex-col items-center text-center select-none" style={{ width: 220 }}>
          <p className="sketch-font font-extrabold text-slate-900 text-lg leading-none drop-shadow-sm">진준영</p>
          <p className="text-[10px] font-bold text-blue-600 tracking-wide mt-1">GAME CLIENT DEVELOPER</p>
          <button
            onClick={onOpenResume}
            className="pointer-events-auto mt-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold shadow-md hover:bg-blue-600 active:scale-95 transition-all cursor-pointer"
          >
            이력서 전체 보기
          </button>
          <div className="pointer-events-auto flex items-center gap-2.5 mt-2">
            <a
              href={`https://${portfolioData.contact.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-[9px] font-bold text-slate-500 hover:text-blue-600 bg-white/85 px-2 py-1 rounded-full border border-slate-200 shadow-xs transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.contact.blog}
              target="_blank"
              rel="noreferrer"
              className="text-[9px] font-bold text-slate-500 hover:text-blue-600 bg-white/85 px-2 py-1 rounded-full border border-slate-200 shadow-xs transition-colors"
            >
              Blog
            </a>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="text-[9px] font-bold text-slate-500 hover:text-blue-600 bg-white/85 px-2 py-1 rounded-full border border-slate-200 shadow-xs transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </Html>
    </group>
  );
}

// ================= SKILL CONSTELLATION =================
// A slowly-orbiting ring of small emissive gems above the hub, each labeled
// via a billboarded Html chip — a lightweight way to surface the tech stack
// without crowding the ground-level project booths.
function SkillOrbit({ skills }: { skills: string[] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.09;
  });
  const radius = 2.15;

  return (
    <group ref={ref} position={[0, 1.95, 0]}>
      {skills.map((name, i) => {
        const a = (i / skills.length) * Math.PI * 2;
        const x = Math.cos(a) * radius;
        const z = Math.sin(a) * radius;
        const y = Math.sin(a * 2.3) * 0.3;
        return (
          <group key={name} position={[x, y, z]}>
            <mesh>
              <icosahedronGeometry args={[0.1, 0]} />
              <meshStandardMaterial
                color="#4f46e5"
                emissive="#4f46e5"
                emissiveIntensity={0.55}
                roughness={0.25}
                metalness={0.55}
              />
            </mesh>
            <Html center distanceFactor={9} occlude>
              <span className="sketch-font pointer-events-none select-none whitespace-nowrap text-[9px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
                {name}
              </span>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// ================= PROJECT BOOTH =================
// A pedestal + real screenshot (textured plane via drei's Image) + Html
// title card. Billboarded so the artwork always faces the orbiting camera.
// Hover brightens the pedestal's emissive rim; click hands the project up
// to the parent, which reuses the existing 2D ProjectModal for full detail.
function ProjectBooth({
  project,
  angle,
  onSelect,
}: {
  project: Project;
  angle: number;
  onSelect: (project: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const x = Math.cos(angle) * BOOTH_RADIUS;
  const z = Math.sin(angle) * BOOTH_RADIUS;

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.damp(
        materialRef.current.emissiveIntensity,
        hovered ? 1 : 0.3,
        6,
        delta
      );
    }
  });

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
    <group position={[x, 0, z]}>
      {/* Pedestal */}
      <mesh
        position={[0, FLOOR_Y + 0.2, 0]}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
      >
        <cylinderGeometry args={[0.62, 0.74, 0.4, 28]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#1e293b"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Screenshot card, always facing the camera */}
      <Billboard position={[0, FLOOR_Y + 1.55, 0]} follow>
        <Float speed={1.3} rotationIntensity={0} floatIntensity={0.4}>
          <group scale={hovered ? 1.08 : 1} onPointerOver={handleOver} onPointerOut={handleOut} onClick={handleClick}>
            <mesh position={[0, 0, -0.03]}>
              <planeGeometry args={[1.66, 1.1]} />
              <meshStandardMaterial color={hovered ? '#3b82f6' : '#ffffff'} />
            </mesh>
            <DreiImage url={project.image ?? '/decorations/star.png'} scale={[1.5, 0.98]} radius={0.04} transparent />
          </group>
        </Float>
      </Billboard>

      <Html position={[0, FLOOR_Y + 0.75, 0]} center distanceFactor={7.5} occlude>
        <div
          onClick={() => onSelect(project)}
          className="pointer-events-auto cursor-pointer flex flex-col items-center text-center select-none transition-transform"
          style={{ width: 175, transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        >
          <p className="sketch-font font-extrabold text-slate-900 text-[13px] leading-tight whitespace-nowrap drop-shadow-sm">
            {project.title}
          </p>
          <p className="text-[9px] font-semibold text-blue-600 mt-0.5 whitespace-nowrap">{project.type}</p>
          {project.award && (
            <span className="mt-1 text-[9px] font-bold text-amber-600 whitespace-nowrap">🏆 {project.award}</span>
          )}
        </div>
      </Html>
    </group>
  );
}

// ================= REFLECTIVE FLOOR =================
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y, 0]}>
      <circleGeometry args={[9.5, 64]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={35}
        roughness={1}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#f2f0ea"
        metalness={0.3}
      />
    </mesh>
  );
}

interface GameScene3DProps {
  onSelectProject: (project: Project) => void;
  onOpenResume: () => void;
}

export default function GameScene3D({ onSelectProject, onOpenResume }: GameScene3DProps) {
  const { projects, skills } = portfolioData;
  const skillNames = [...skills.main, ...skills.sub, ...skills.exp].map((s) => s.name);

  return (
    <Canvas camera={{ position: [0, 3.4, 8.2], fov: 45 }} gl={{ antialias: true }} dpr={[1, 2]}>
      <color attach="background" args={['#FAF9F6']} />
      <fog attach="fog" args={['#FAF9F6', 12, 22]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#93C5FD" />
      <Environment preset="studio" background={false} />

      <Floor />
      <ContactShadows position={[0, FLOOR_Y + 0.005, 0]} opacity={0.4} scale={14} blur={2.6} far={4.5} color="#1e293b" />
      <Sparkles count={90} scale={10} size={2.2} speed={0.25} color="#93c5fd" position={[0, 1.5, 0]} />

      <Hub onOpenResume={onOpenResume} />
      <SkillOrbit skills={skillNames} />

      {projects.map((project, i) => (
        <ProjectBooth
          key={project.id}
          project={project as Project}
          angle={(i / projects.length) * Math.PI * 2 + Math.PI / 4}
          onSelect={onSelectProject}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={4.5}
        maxDistance={13}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2.15}
      />
    </Canvas>
  );
}
