'use client';

import { useRouter } from 'next/navigation';
import StoryView from '@/components/StoryView';

export default function InteractivePage() {
  const router = useRouter();
  return <StoryView onBack={() => router.push('/')} />;
}
