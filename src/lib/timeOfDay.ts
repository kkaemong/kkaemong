export type Period = 'dawn' | 'morning' | 'noon' | 'evening' | 'night';

export const PERIOD_LABEL: Record<Period, string> = {
  dawn: '새벽',
  morning: '아침',
  noon: '점심',
  evening: '저녁',
  night: '밤',
};

// 시간대별 오프닝 인삿말
export const GREETING: Record<Period, string> = {
  dawn: '안녕하세요.\n아직 세상이 잠든 새벽,\n조용히 찾아와 주셨네요.',
  morning: '안녕하세요.\n좋은 아침이에요.\n오늘의 첫 페이지를 이곳에서 열어 주셨네요.',
  noon: '안녕하세요.\n바쁜 한낮,\n잠시 쉬어 가는 길에 들러 주셨군요.',
  evening: '안녕하세요.\n하루가 노을처럼\n천천히 저물어 가는 시간이에요.',
  night: '안녕하세요.\n별이 뜬 밤,\n이곳까지 와 주셔서 고맙습니다.',
};

export function periodFromHour(hour: number): Period {
  if (hour >= 4 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 16) return 'noon';
  if (hour >= 16 && hour < 20) return 'evening';
  return 'night';
}

// ?time=dawn|morning|noon|evening|night 로 시간대를 강제로 미리 볼 수 있다
export function currentPeriod(): Period {
  const forced = new URLSearchParams(window.location.search).get('time');
  if (forced && forced in PERIOD_LABEL) return forced as Period;
  return periodFromHour(new Date().getHours());
}
