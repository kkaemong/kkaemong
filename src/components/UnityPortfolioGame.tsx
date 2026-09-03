'use client';

import React, { useEffect, useRef } from 'react';

export interface UnityPortfolioGameHandle {
  resume: () => void;
}

interface UnityPortfolioGameProps {
  // Plain object ref, not React's `ref` prop — `next/dynamic` wraps this
  // component in a plain function component that doesn't forward `ref`.
  apiRef: React.MutableRefObject<UnityPortfolioGameHandle | null>;
  onBoothReached: (boothId: string) => void;
  onReady?: () => void;
  onFailure?: () => void;
}

// Ready timeout generous enough for a first-visit cold load of an
// uncompressed WebGL build (see BuildWebGL.cs — compression is disabled
// to avoid needing special static-file headers) over a slow connection.
const READY_TIMEOUT_MS = 20000;

export default function UnityPortfolioGame({ apiRef, onBoothReached, onReady, onFailure }: UnityPortfolioGameProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    apiRef.current = {
      resume: () => {
        iframeRef.current?.contentWindow?.postMessage({ type: 'PORTFOLIO_RESUME_BOOTH' }, '*');
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef]);

  useEffect(() => {
    const timeout = window.setTimeout(() => onFailure?.(), READY_TIMEOUT_MS);

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === 'PORTFOLIO_GAME_READY') {
        window.clearTimeout(timeout);
        onReady?.();
      }
      if (event.data?.type === 'PORTFOLIO_BOOTH_REACHED' && typeof event.data.boothId === 'string') {
        onBoothReached(event.data.boothId);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBoothReached]);

  return (
    <iframe
      ref={iframeRef}
      src="/game-build/index.html"
      title="포트폴리오 게임 맵"
      className="absolute inset-0 w-full h-full border-0"
      allow="autoplay"
      onError={() => onFailure?.()}
    />
  );
}
