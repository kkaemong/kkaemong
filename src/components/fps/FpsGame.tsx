'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// 반동·퍼짐 등 손맛 수치. 나중에 "피드백 버튼"이 이 값을 실시간으로 바꾼다.
export const DEFAULT_TUNING = {
  fireInterval: 0.1, // 발사 간격(초) = 600RPM
  magSize: 30,
  reloadTime: 2,
  recoilV: 0.011, // 한 발당 위로 튀는 각도(rad)
  recoilH: 0.004, // 좌우 흔들림(rad)
  recoilBuildUp: 0.35, // 연사할수록 반동이 커지는 정도
  recoilRecover: 6, // 사격을 멈췄을 때 총구가 내려오는 속도
  spreadBase: 0.0015,
  spreadMove: 0.012,
  spreadAir: 0.03,
};
type Tuning = typeof DEFAULT_TUNING;

const EYE = 1.6;
const RADIUS = 0.35;
const GRAVITY = 24;
const JUMP = 7.6;
const WALK = 6;

type Box = { min: THREE.Vector3; max: THREE.Vector3 };
type Target = { mesh: THREE.Group; hp: number; respawnAt: number; flash: number };

export default function FpsGame() {
  const mountRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ammoRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const hitRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const reloadRef = useRef<HTMLDivElement>(null);
  const tuningRef = useRef<Tuning>({ ...DEFAULT_TUNING });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const tuning = tuningRef.current;

    // ===== 렌더러·씬 =====
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#bcd4e6');
    scene.fog = new THREE.Fog('#bcd4e6', 25, 70);
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.05, 120);
    camera.rotation.order = 'YXZ';
    scene.add(camera);

    scene.add(new THREE.HemisphereLight('#ffffff', '#8a9a7b', 1.5));
    const sun = new THREE.DirectionalLight('#fff4de', 1.4);
    sun.position.set(10, 20, 8);
    scene.add(sun);

    // ===== 월드 (로우폴리: 박스 조합) =====
    const boxes: Box[] = [];
    const solids: THREE.Mesh[] = [];
    const addBox = (x: number, y: number, z: number, w: number, h: number, d: number, color: string) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color, flatShading: true }));
      m.position.set(x, y + h / 2, z);
      scene.add(m);
      solids.push(m);
      boxes.push({ min: new THREE.Vector3(x - w / 2, y, z - d / 2), max: new THREE.Vector3(x + w / 2, y + h, z + d / 2) });
    };

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshLambertMaterial({ color: '#9fb08a' }));
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
    solids.push(floor);

    // 벽
    addBox(0, 0, -30, 60, 6, 1, '#6d7a8a');
    addBox(0, 0, 30, 60, 6, 1, '#6d7a8a');
    addBox(-30, 0, 0, 1, 6, 60, '#6d7a8a');
    addBox(30, 0, 0, 1, 6, 60, '#6d7a8a');
    // 엄폐물
    addBox(-5, 0, -6, 3, 1.2, 1, '#c9a46b');
    addBox(5, 0, -8, 3, 1.2, 1, '#c9a46b');
    addBox(0, 0, -13, 2, 2.2, 2, '#b98a54');
    addBox(-10, 0, -16, 4, 1.4, 1.2, '#c9a46b');
    addBox(10, 0, -18, 1.4, 2.6, 4, '#b98a54');
    addBox(-3, 0, -22, 5, 1, 1.2, '#c9a46b');

    // ===== 표적 =====
    const targets: Target[] = [];
    const targetMeshes: THREE.Object3D[] = [];
    const addTarget = (x: number, z: number) => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.3, 8), new THREE.MeshLambertMaterial({ color: '#d9534f', flatShading: true }));
      body.position.y = 0.65;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 6), new THREE.MeshLambertMaterial({ color: '#e8d6b0', flatShading: true }));
      head.position.y = 1.55;
      head.userData.head = true;
      g.add(body, head);
      g.position.set(x, 0, z);
      g.userData.target = true;
      body.userData.owner = g;
      head.userData.owner = g;
      scene.add(g);
      targets.push({ mesh: g, hp: 3, respawnAt: 0, flash: 0 });
      targetMeshes.push(body, head);
    };
    [[-8, -12], [-2, -10], [4, -14], [9, -12], [-12, -20], [-5, -26], [2, -24], [8, -22], [13, -27], [-14, -9]].forEach(([x, z]) => addTarget(x, z));

    // ===== 총 모델 =====
    const gun = new THREE.Group();
    const gunMat = new THREE.MeshLambertMaterial({ color: '#2b2e33', flatShading: true });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.55), gunMat);
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.25), gunMat);
    barrel.position.set(0, 0.03, -0.38);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.08), gunMat);
    grip.position.set(0, -0.12, 0.12);
    gun.add(body, barrel, grip);
    const GUN_REST = new THREE.Vector3(0.22, -0.2, -0.45);
    gun.position.copy(GUN_REST);
    camera.add(gun);
    const flash = new THREE.PointLight('#ffb347', 0, 6);
    flash.position.set(0.22, -0.15, -0.9);
    camera.add(flash);

    // ===== 오디오 (파일 없이 즉석 생성) =====
    let audio: AudioContext | null = null;
    const noiseBuf = () => {
      const len = Math.floor(audio!.sampleRate * 0.12);
      const b = audio!.createBuffer(1, len, audio!.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      return b;
    };
    const playShot = () => {
      if (!audio) return;
      const src = audio.createBufferSource();
      src.buffer = noiseBuf();
      const g = audio.createGain();
      g.gain.value = 0.35;
      src.connect(g).connect(audio.destination);
      src.start();
      const o = audio.createOscillator();
      const og = audio.createGain();
      o.frequency.setValueAtTime(140, audio.currentTime);
      o.frequency.exponentialRampToValueAtTime(40, audio.currentTime + 0.12);
      og.gain.setValueAtTime(0.4, audio.currentTime);
      og.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.14);
      o.connect(og).connect(audio.destination);
      o.start();
      o.stop(audio.currentTime + 0.15);
    };
    const blip = (freq: number, dur = 0.06, vol = 0.18) => {
      if (!audio) return;
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = 'square';
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + dur);
      o.connect(g).connect(audio.destination);
      o.start();
      o.stop(audio.currentTime + dur);
    };

    // ===== 상태 =====
    let yaw = 0;
    let pitch = 0;
    const recoil = { pitch: 0, yaw: 0 };
    const pos = new THREE.Vector3(0, 0, 8); // 발 위치
    let vy = 0;
    let onGround = true;
    const keys = new Set<string>();
    let locked = false;
    let mouseDown = false;
    let ammo = tuning.magSize;
    let reloadingUntil = 0;
    let lastShot = -10;
    let shotIndex = 0;
    let score = 0;
    let hitMarkerUntil = 0;
    let kick = 0; // 총 모델 뒤로 밀림
    let flashUntil = 0;
    let moveAmount = 0;
    const impacts: { m: THREE.Mesh; until: number }[] = [];
    const raycaster = new THREE.Raycaster();
    const clock = new THREE.Clock();

    const refreshHud = () => {
      if (ammoRef.current) ammoRef.current.textContent = `${ammo} / ∞`;
      if (scoreRef.current) scoreRef.current.textContent = `SCORE ${score}`;
    };
    refreshHud();

    // ===== 충돌 =====
    const blockedAt = (x: number, z: number, feet: number) => {
      for (const b of boxes) {
        if (feet < b.max.y - 0.3 && feet + EYE + 0.2 > b.min.y && x + RADIUS > b.min.x && x - RADIUS < b.max.x && z + RADIUS > b.min.z && z - RADIUS < b.max.z) return true;
      }
      return false;
    };
    const groundAt = (x: number, z: number, feet: number) => {
      let g = 0;
      for (const b of boxes) {
        if (b.max.y <= feet + 0.31 && x + RADIUS > b.min.x && x - RADIUS < b.max.x && z + RADIUS > b.min.z && z - RADIUS < b.max.z) g = Math.max(g, b.max.y);
      }
      return g;
    };

    // ===== 사격 =====
    const spreadNow = () => {
      const moving = Math.min(moveAmount / WALK, 1);
      return tuning.spreadBase + moving * tuning.spreadMove + (onGround ? 0 : tuning.spreadAir) + Math.min(shotIndex, 12) * 0.0007;
    };

    const spawnImpact = (p: THREE.Vector3, n: THREE.Vector3, color: string, now: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.07), new THREE.MeshBasicMaterial({ color }));
      m.position.copy(p).addScaledVector(n, 0.03);
      scene.add(m);
      impacts.push({ m, until: now + 0.35 });
      if (impacts.length > 40) {
        const old = impacts.shift()!;
        scene.remove(old.m);
      }
    };

    const fire = (now: number) => {
      ammo -= 1;
      shotIndex += 1;
      lastShot = now;
      playShot();

      // 퍼짐 적용한 방향으로 레이
      const s = spreadNow();
      const dir = new THREE.Vector3((Math.random() - 0.5) * 2 * s, (Math.random() - 0.5) * 2 * s, -1).normalize();
      raycaster.set(camera.getWorldPosition(new THREE.Vector3()), dir.applyQuaternion(camera.quaternion));
      raycaster.far = 100;
      const hits = raycaster.intersectObjects([...solids, ...targetMeshes], false);
      const h = hits[0];
      if (h) {
        const owner = h.object.userData.owner as THREE.Group | undefined;
        if (owner) {
          const t = targets.find((tt) => tt.mesh === owner)!;
          if (t.hp > 0) {
            const headshot = h.object.userData.head === true;
            t.hp -= headshot ? 3 : 1;
            t.flash = now + 0.08;
            hitMarkerUntil = now + 0.12;
            blip(headshot ? 1500 : 900, 0.07);
            if (t.hp <= 0) {
              t.respawnAt = now + 1.8;
              t.mesh.visible = false;
              score += headshot ? 2 : 1;
              refreshHud();
            }
          }
          spawnImpact(h.point, new THREE.Vector3(0, 0, 0), '#ff5d4d', now);
        } else {
          const n = h.face ? h.face.normal.clone().transformDirection(h.object.matrixWorld) : new THREE.Vector3();
          spawnImpact(h.point, n, '#f2e6c9', now);
        }
      }

      // 반동: 연사할수록 누적되어 더 크게 튄다
      const build = 1 + Math.min(shotIndex, 12) * tuning.recoilBuildUp * 0.25;
      recoil.pitch += tuning.recoilV * build;
      recoil.yaw += (Math.sin(shotIndex * 0.9) * 0.6 + (Math.random() - 0.5)) * tuning.recoilH;
      kick = 1;
      flashUntil = now + 0.04;
      refreshHud();
    };

    const startReload = (now: number) => {
      if (reloadingUntil > now || ammo === tuning.magSize) return;
      reloadingUntil = now + tuning.reloadTime;
      blip(300, 0.08, 0.2);
      if (reloadRef.current) reloadRef.current.style.opacity = '1';
    };

    // ===== 입력 =====
    const onLockChange = () => {
      locked = document.pointerLockElement === renderer.domElement;
      if (overlayRef.current) overlayRef.current.style.display = locked ? 'none' : 'flex';
      if (!locked) {
        keys.clear();
        mouseDown = false;
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!locked) return;
      yaw -= e.movementX * 0.0022;
      pitch = Math.max(-1.5, Math.min(1.5, pitch - e.movementY * 0.0022));
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') e.preventDefault();
      keys.add(e.code);
      if (e.code === 'KeyR' && locked) startReload(clock.elapsedTime);
    };
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.code);
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (!locked) return;
      mouseDown = true;
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) mouseDown = false;
    };
    const onClickCanvas = () => {
      if (!audio) audio = new AudioContext();
      if (audio.state === 'suspended') void audio.resume();
      if (!locked) void renderer.domElement.requestPointerLock();
    };
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };

    document.addEventListener('pointerlockchange', onLockChange);
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize);
    renderer.domElement.addEventListener('click', onClickCanvas);
    overlayRef.current?.addEventListener('click', onClickCanvas);
    const overlayEl = overlayRef.current;

    // ===== 루프 =====
    let raf = 0;
    const tmpMove = new THREE.Vector3();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      const now = clock.elapsedTime;

      // 이동
      tmpMove.set(0, 0, 0);
      if (keys.has('KeyW')) tmpMove.z -= 1;
      if (keys.has('KeyS')) tmpMove.z += 1;
      if (keys.has('KeyA')) tmpMove.x -= 1;
      if (keys.has('KeyD')) tmpMove.x += 1;
      if (tmpMove.lengthSq() > 0) tmpMove.normalize();
      const speed = WALK * (keys.has('ShiftLeft') ? 0.55 : 1);
      const sin = Math.sin(yaw);
      const cos = Math.cos(yaw);
      const vx = (tmpMove.x * cos + tmpMove.z * sin) * speed;
      const vz = (-tmpMove.x * sin + tmpMove.z * cos) * speed;
      moveAmount = Math.hypot(vx, vz);
      const nx = pos.x + vx * dt;
      if (!blockedAt(nx, pos.z, pos.y)) pos.x = nx;
      const nz = pos.z + vz * dt;
      if (!blockedAt(pos.x, nz, pos.y)) pos.z = nz;

      // 점프·중력
      if (onGround && keys.has('Space')) {
        vy = JUMP;
        onGround = false;
      }
      vy -= GRAVITY * dt;
      const ground = groundAt(pos.x, pos.z, pos.y);
      let ny = pos.y + vy * dt;
      if (ny <= ground) {
        ny = ground;
        vy = 0;
        onGround = true;
      } else {
        onGround = false;
      }
      pos.y = ny;

      // 사격·재장전
      if (reloadingUntil && now >= reloadingUntil) {
        reloadingUntil = 0;
        ammo = tuning.magSize;
        shotIndex = 0;
        if (reloadRef.current) reloadRef.current.style.opacity = '0';
        refreshHud();
      }
      if (mouseDown && locked && !reloadingUntil) {
        if (ammo <= 0) startReload(now);
        else if (now - lastShot >= tuning.fireInterval) fire(now);
      }
      if (now - lastShot > 0.35) shotIndex = 0;

      // 반동 회복 (사격 중엔 천천히, 멈추면 빠르게)
      const k = mouseDown && ammo > 0 ? tuning.recoilRecover * 0.25 : tuning.recoilRecover;
      const decay = 1 - Math.exp(-k * dt);
      recoil.pitch -= recoil.pitch * decay;
      recoil.yaw -= recoil.yaw * decay;
      kick = Math.max(0, kick - dt * 9);

      // 카메라·총
      camera.position.set(pos.x, pos.y + EYE, pos.z);
      camera.rotation.y = yaw + recoil.yaw;
      camera.rotation.x = Math.max(-1.55, Math.min(1.55, pitch + recoil.pitch));
      const bob = onGround ? Math.sin(now * 11) * 0.006 * Math.min(moveAmount / WALK, 1) : 0;
      const reloadDip = reloadingUntil ? 0.12 : 0;
      gun.position.set(GUN_REST.x, GUN_REST.y + bob - reloadDip, GUN_REST.z + kick * 0.07);
      gun.rotation.x = kick * 0.05 + (reloadingUntil ? 0.35 : 0);
      flash.intensity = now < flashUntil ? 4 : 0;

      // 표적·잔상
      for (const t of targets) {
        if (t.hp <= 0 && now >= t.respawnAt) {
          t.hp = 3;
          t.mesh.visible = true;
        }
        const color = now < t.flash ? '#ffffff' : '#d9534f';
        const bodyMesh = t.mesh.children[0] as THREE.Mesh;
        (bodyMesh.material as THREE.MeshLambertMaterial).color.set(color);
      }
      for (let i = impacts.length - 1; i >= 0; i--) {
        if (now >= impacts[i].until) {
          scene.remove(impacts[i].m);
          impacts.splice(i, 1);
        }
      }

      // HUD
      if (hitRef.current) hitRef.current.style.opacity = now < hitMarkerUntil ? '1' : '0';
      if (crossRef.current) {
        const gap = 6 + spreadNow() * 900 + recoil.pitch * 500;
        crossRef.current.style.setProperty('--gap', `${gap.toFixed(1)}px`);
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointerlockchange', onLockChange);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onClickCanvas);
      overlayEl?.removeEventListener('click', onClickCanvas);
      if (document.pointerLockElement === renderer.domElement) document.exitPointerLock();
      void audio?.close();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="relative h-screen w-screen select-none overflow-hidden bg-black text-white">
      <div ref={mountRef} className="absolute inset-0" />

      {/* 크로스헤어 (퍼짐·반동에 따라 벌어진다) */}
      <div ref={crossRef} className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0" style={{ ['--gap' as string]: '6px' }}>
        <span className="absolute h-[2px] w-[9px] bg-white/90" style={{ left: 'calc(var(--gap) * -1 - 9px)', top: -1 }} />
        <span className="absolute h-[2px] w-[9px] bg-white/90" style={{ left: 'var(--gap)', top: -1 }} />
        <span className="absolute h-[9px] w-[2px] bg-white/90" style={{ top: 'calc(var(--gap) * -1 - 9px)', left: -1 }} />
        <span className="absolute h-[9px] w-[2px] bg-white/90" style={{ top: 'var(--gap)', left: -1 }} />
        <div ref={hitRef} className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-75">
          <span className="absolute left-0 top-0 h-[2px] w-2 origin-left rotate-45 bg-red-500" />
          <span className="absolute right-0 top-0 h-[2px] w-2 origin-right -rotate-45 bg-red-500" />
          <span className="absolute bottom-0 left-0 h-[2px] w-2 origin-left -rotate-45 bg-red-500" />
          <span className="absolute bottom-0 right-0 h-[2px] w-2 origin-right rotate-45 bg-red-500" />
        </div>
      </div>

      {/* HUD */}
      <div ref={scoreRef} className="pointer-events-none absolute left-6 top-6 text-sm font-medium tracking-[0.3em]" />
      <div className="pointer-events-none absolute bottom-6 right-8 text-right">
        <div ref={reloadRef} className="mb-1 text-xs tracking-[0.4em] opacity-0 transition-opacity">RELOADING</div>
        <div ref={ammoRef} className="text-4xl font-light tabular-nums" />
      </div>

      {/* 시작 안내 */}
      <div ref={overlayRef} className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-6 bg-black/60 text-center backdrop-blur-sm">
        <p className="text-sm font-medium tracking-[0.5em] text-white/70">SHOOTING RANGE</p>
        <p className="text-3xl font-light tracking-wide">클릭해서 시작</p>
        <p className="text-sm leading-loose text-white/60">
          WASD 이동 · Space 점프 · Shift 걷기 · 클릭 사격(누르고 있으면 연사) · R 재장전 · Esc 나가기
        </p>
      </div>
    </div>
  );
}
