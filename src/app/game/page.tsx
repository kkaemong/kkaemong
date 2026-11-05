import type { Metadata } from 'next';
import Link from 'next/link';
import ForceLight from '@/components/ForceLight';

// 게임 체험하기: 영상 → WebGL 체험판 → 정식판 다운로드 순서. 게임이 완성되면 아래 준비 중 자리를 채운다.
export const metadata: Metadata = {
  title: '게임 체험하기 · 진준영',
  description: '제가 만들고 싶은 방향의 게임을 영상, 체험판, 정식판으로 소개합니다.',
};

const SERIF = 'font-[family-name:var(--font-noto-serif)]';

// 손으로 쓴 듯한 글씨체: 이 화면의 모든 글씨(SERIF 지정 포함)를 바꾼다
const HAND_STYLE = { fontFamily: 'var(--font-hand)', ['--font-noto-serif' as string]: 'var(--font-hand)' } as React.CSSProperties;

function Slot({ no, title, desc, note }: { no: string; title: string; desc: string; note: string }) {
  return (
    <section className="mb-16">
      <p className="mb-3 text-xs font-medium tracking-[0.3em] text-[#8a8780]">{no}</p>
      <h2 className={`mb-3 border-b border-[#111]/15 pb-4 text-3xl font-light tracking-tight ${SERIF}`}>{title}</h2>
      <p className="mb-6 break-keep text-base leading-loose text-[#6b6862]">{desc}</p>
      <div className="flex aspect-[16/9] w-full items-center justify-center border border-dashed border-[#111]/25 bg-[#f4f2ee] text-sm tracking-[0.3em] text-[#8a8780]">
        {note}
      </div>
    </section>
  );
}

export default function GamePage() {
  return (
    <div className="min-h-screen bg-white text-[#111]" style={HAND_STYLE}>
      <ForceLight />
      <Link href="/" className="fixed left-5 top-5 z-30 rounded-full bg-[#1f1e1c] px-5 py-2.5 text-base text-white shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)] transition-colors hover:bg-[#e4572e] sm:left-8 sm:top-7">← 메인 페이지로</Link>
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-20 sm:pt-28">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-[#8a8780]">Game</p>
        <h1 className={`mb-6 text-5xl font-light leading-[1.15] tracking-tight sm:text-6xl ${SERIF}`}>게임 체험하기</h1>
        <p className="mb-16 max-w-2xl break-keep text-base leading-loose text-[#6b6862]">
          제가 만들고 싶은 방향의 게임을 소개하는 페이지입니다. 현재 제작 준비 중이며, 완성되면 아래 순서대로 채워집니다.
        </p>

        <Slot no="01" title="플레이 영상" desc="정식판의 가장 좋은 화질로 담은 짧은 영상입니다." note="영상 준비 중" />
        <Slot no="02" title="웹 체험판" desc="브라우저에서 바로 해 볼 수 있는 가벼운 체험판입니다. 누를 때만 불러옵니다." note="WebGL 체험판 준비 중" />
        <Slot no="03" title="정식판 다운로드" desc="그래픽을 최대로 올린 PC용 정식판입니다." note="다운로드 준비 중" />
      </main>
    </div>
  );
}
