// 섹션으로 이동한다. 가로 레이아웃은 'go-section' 이벤트를 받아 스크롤 위치를 직접 계산해서 처리하고,
// 처리하지 않으면(세로 레이아웃) 기본 scrollIntoView로 이동한다.
export function goSection(href: string) {
  const ev = new CustomEvent('go-section', { detail: href, cancelable: true });
  window.dispatchEvent(ev);
  if (!ev.defaultPrevented) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}
