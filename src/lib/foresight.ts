import { ForesightManager, type ForesightCallback, type ForesightElement } from 'js.foresight';
import { portfolioData, type Project } from '@/data/portfolio';

// ForesightJS: 마우스 궤적·키보드·스크롤로 "곧 누를 곳"을 미리 예측해서 클릭 전에 준비한다.
// 이 사이트에서는 세 군데에 쓴다.
//  1) 프로젝트 카드 → 상세 모달 코드와 그 안의 모든 이미지·영상을 미리 받는다
//  2) 상단 메뉴 → 이동할 섹션의 이미지를 미리 받는다
//  3) 모든 외부 링크 → 눌리기 전에 서버와 미리 연결해 둔다 (preconnect)
//  + 강아지는 커서가 "지금 있는 곳"이 아니라 "곧 갈 곳"으로 먼저 달려간다.

export interface IntentLog {
  name: string;
  kind: string;
  at: number;
  hit: string;
}

declare global {
  interface Window {
    __foresight?: { log: IntentLog[]; hoveredAt: Record<string, number> };
  }
}

let started = false;

export function initForesight() {
  if (typeof window === 'undefined') return null;
  const manager = ForesightManager.initialize({
    trajectoryPredictionTime: 160, // 더 먼 미래까지 예측해서 더 일찍 준비한다
    positionHistorySize: 8,
    enableMousePrediction: true,
    enableScrollPrediction: true,
    enableTabPrediction: true,
    tabOffset: 2,
    touchDeviceStrategy: 'viewport',
    defaultHitSlop: 28,
  });
  if (!started) {
    started = true;
    window.__foresight = { log: [], hoveredAt: {} };
    manager.addEventListener('callbackInvoked', (e) => {
      const name = e.state.name || e.element.tagName;
      window.__foresight?.log.push({ name, kind: 'invoked', at: Math.round(performance.now()), hit: e.hitType.kind });
    });
  }
  return manager;
}

/** 요소를 예측 대상으로 등록한다. 해제 함수를 돌려준다. */
export function onIntent(element: ForesightElement, name: string, callback: ForesightCallback, hitSlop?: number) {
  const manager = initForesight();
  if (!manager) return () => {};
  // 실제로 마우스가 올라온 시각도 기록해서, 예측이 얼마나 먼저였는지 비교할 수 있게 한다
  const onEnter = () => {
    const h = window.__foresight?.hoveredAt;
    if (h && h[name] === undefined) h[name] = Math.round(performance.now());
  };
  element.addEventListener('pointerenter', onEnter);
  const result = manager.register({ element, name, callback, hitSlop, reactivateAfter: 60_000 });
  return () => {
    element.removeEventListener('pointerenter', onEnter);
    result.unregister();
  };
}

// ---------- 미리 받아 두는 것들 ----------
const loadedImages = new Set<string>();
const loadedVideos = new Set<string>();
const connected = new Set<string>();

export function preloadImage(url: string | undefined) {
  if (!url || loadedImages.has(url)) return;
  loadedImages.add(url);
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
}

/** next/image 변환본(AVIF/WebP)을 미리 받는다 */
export function preloadOptimized(url: string | undefined, w = 1080) {
  if (!url || !url.startsWith('/')) return;
  preloadImage(`/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=80`);
}

export function preloadVideo(url: string | undefined) {
  if (!url || loadedVideos.has(url)) return;
  loadedVideos.add(url);
  const v = document.createElement('video');
  v.preload = 'metadata';
  v.src = url;
}

export function preconnect(href: string) {
  let origin: string;
  try {
    origin = new URL(href, window.location.href).origin;
  } catch {
    return;
  }
  if (origin === window.location.origin || connected.has(origin)) return;
  connected.add(origin);
  for (const rel of ['dns-prefetch', 'preconnect']) {
    const l = document.createElement('link');
    l.rel = rel;
    l.href = origin;
    if (rel === 'preconnect') l.crossOrigin = 'anonymous';
    document.head.appendChild(l);
  }
}

type Study = {
  imageUrl?: string;
  images?: { src: string }[];
  beforeImageUrl?: string;
  afterImageUrl?: string;
  articleUrl?: string;
};

/** 프로젝트 하나를 열기 위해 필요한 모든 것을 미리 준비한다 */
export function warmProject(project: Project) {
  import('@/components/ProjectModal');
  preloadOptimized(project.image, 1080);
  preloadVideo(project.video);
  if (project.github) preconnect(project.github);
  if (project.downloadUrl) preconnect(project.downloadUrl);
  for (const study of (project.troubleshooting ?? []) as Study[]) {
    preloadImage(study.imageUrl);
    preloadImage(study.beforeImageUrl);
    preloadImage(study.afterImageUrl);
    study.images?.forEach((i) => (/\.(mp4|webm|mov)(\?.*)?$/i.test(i.src) ? preloadVideo(i.src) : preloadImage(i.src)));
    if (study.articleUrl) preconnect(study.articleUrl);
  }
}

export function warmAllProjects() {
  (portfolioData.projects as Project[]).forEach(warmProject);
}

/** 페이지 안의 모든 외부 링크를 예측 대상으로 등록하고, 나중에 생기는 링크(모달 안 등)도 따라간다 */
export function watchExternalLinks() {
  if (typeof window === 'undefined') return () => {};
  const registered = new WeakMap<Element, () => void>();
  const scan = (root: ParentNode) => {
    root.querySelectorAll<HTMLAnchorElement>('a[href^="http"]').forEach((a) => {
      if (registered.has(a)) return;
      let host = '';
      try {
        host = new URL(a.href).host;
      } catch {
        return;
      }
      if (host === window.location.host) return;
      registered.set(a, onIntent(a, `link:${host}`, () => preconnect(a.href), 20));
    });
  };
  scan(document);
  const mo = new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && scan(n));
  });
  mo.observe(document.body, { childList: true, subtree: true });
  return () => mo.disconnect();
}

/** ?foresight=debug 로 열면 예측 궤적과 영역을 화면에 보여 주는 개발자 도구를 켠다 */
export async function maybeStartDevtools() {
  if (typeof window === 'undefined') return;
  if (new URLSearchParams(window.location.search).get('foresight') !== 'debug') return;
  const { ForesightDevtools } = await import('js.foresight-devtools');
  ForesightDevtools.initialize({});
}
