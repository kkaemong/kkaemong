'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { initForesight, maybeStartDevtools, watchExternalLinks } from '@/lib/foresight';
import TreatButton from './TreatButton';

// 장식(가루·강아지)은 첫 화면을 그린 뒤 브라우저가 한가할 때 불러온다.
// 별도 청크로 나뉘어 있어서 첫 로딩의 자바스크립트와 렌더링을 막지 않는다.
const AmbientFX = dynamic(() => import('./AmbientFX'), { ssr: false });
const Dog = dynamic(() => import('./Dog'), { ssr: false });

// 인터랙티브 요소(가루·강아지·간식 버튼)는 처음 시작하는 첫 화면에서만 보인다
const subscribeScroll = (cb: () => void) => {
  window.addEventListener('scroll', cb, { passive: true });
  window.addEventListener('resize', cb);
  return () => {
    window.removeEventListener('scroll', cb);
    window.removeEventListener('resize', cb);
  };
};
const getInHero = () => window.scrollY < window.innerHeight * 0.85;

export default function LazyFX() {
  const [ready, setReady] = useState(false);
  const inHero = useSyncExternalStore(subscribeScroll, getInHero, () => true);

  useEffect(() => {
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (idle) {
      idle(() => setReady(true), { timeout: 1500 });
      return;
    }
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    initForesight();
    const stop = watchExternalLinks();
    maybeStartDevtools();
    return stop;
  }, []);

  if (!ready) return null;
  return (
    <>
      <AmbientFX active={inHero} />
      <Dog active={inHero} />
      <TreatButton active={inHero} />
    </>
  );
}
