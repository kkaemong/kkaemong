'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Float } from '@react-three/drei';
import * as THREE from 'three';

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

function SpinningGroup() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={ref}>
      <Pencil position={[-1.6, 0.6, 0.2]} />
      <Star position={[1.5, 0.9, -0.4]} />
      <Heart position={[0.2, 0.3, 1.2]} />
    </group>
  );
}

export default function GameScene3D() {
  return (
    <Canvas
      camera={{ position: [3.2, 2.6, 4.2], fov: 42 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#FAF9F6']} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} castShadow={false} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#93C5FD" />

      <Grid
        position={[0, -0.6, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#CBD5E1"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#94A3B8"
        fadeDistance={14}
        infiniteGrid
      />

      <SpinningGroup />

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
