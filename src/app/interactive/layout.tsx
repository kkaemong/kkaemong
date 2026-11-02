// 손으로 쓴 듯한 글씨체: 이 화면의 모든 글씨(명조 지정 포함)를 바꾼다
const HAND_STYLE = { fontFamily: "var(--font-hand)", ["--font-noto-serif" as string]: "var(--font-hand)" } as React.CSSProperties;

export default function InteractiveLayout({ children }: { children: React.ReactNode }) {
  return <div style={HAND_STYLE}>{children}</div>;
}
