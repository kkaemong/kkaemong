'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import StoryView from '@/components/StoryView';

export default function InteractivePage() {
  const router = useRouter();
  // 이야기는 스크롤로 진행되므로, 다른 화면에서 내려온 스크롤 위치가 남아 있으면 끝에서 거꾸로 시작한다: 항상 맨 위에서 시작(사이트 전체가 부드러운 스크롤이라 즉시 이동으로 지정)
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return <StoryView onBack={() => router.push('/')} />;
}
