'use client';

import { useEffect } from 'react';

// 이 화면에서는 나이트 모드를 쓰지 않는다: 들어오면 라이트로 바꾸고, 떠날 때 원래 선택(저장값)으로 돌려놓는다.
export default function ForceLight() {
  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains('dark');
    root.classList.remove('dark');
    return () => {
      if (wasDark) root.classList.add('dark');
    };
  }, []);
  return null;
}
