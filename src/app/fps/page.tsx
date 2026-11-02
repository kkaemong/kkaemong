import type { Metadata } from 'next';
import FpsGame from '@/components/fps/FpsGame';

export const metadata: Metadata = {
  title: '사격장 · 진준영',
};

// 인터랙티브 버전에 넣기 전, 따로 다듬어 보는 3D 미니 사격장
export default function FpsPage() {
  return <FpsGame />;
}
