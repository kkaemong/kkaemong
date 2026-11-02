import SoulCharacter from '@/components/SoulCharacter';

// 캐릭터 초안을 따로 보는 임시 화면. 마음에 들면 인터랙티브 첫 화면에 넣는다.
export default function CharacterPreview() {
  return (
    <main className="flex min-h-screen items-end justify-center bg-[#3f5a8a] text-white">
      <SoulCharacter className="w-[min(92vw,900px)]" />
    </main>
  );
}
