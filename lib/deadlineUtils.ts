// moa-app(모바일 앱)의 lib/deadlineUtils.ts에서 D-day 계산 로직만 옮겨옴(포맷 함수만 필요해서
// isLongPeriodPolicy 등은 생략). 로직 자체는 그대로 복사 — 두 프로젝트가 서로 import할 수 없는
// 별도 저장소라 값 동기화가 필요하면 수동으로 맞춰야 함.
export type Phase = 'before' | 'active' | 'closed' | 'rolling';

function toMidnight(dateStr: string): Date {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

export function computeDday(
  startDate: string | null,
  deadlineDate: string | null
): { label: string; phase: Phase } {
  if (!startDate || !deadlineDate) {
    return { label: '상시모집', phase: 'rolling' };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = toMidnight(startDate);
  const deadline = toMidnight(deadlineDate);

  const thisYearEnd = new Date(today.getFullYear(), 11, 31);
  if (deadline > thisYearEnd) {
    return { label: '상시모집', phase: 'rolling' };
  }

  if (today < start) {
    const diffDays = daysBetween(start, today);
    return { label: diffDays === 0 ? '오늘 시작' : `시작 D-${diffDays}`, phase: 'before' };
  }

  if (today <= deadline) {
    const diffDays = daysBetween(deadline, today);
    return { label: diffDays === 0 ? '오늘 마감' : `마감 D-${diffDays}`, phase: 'active' };
  }

  return { label: '마감', phase: 'closed' };
}

export function formatMonthDay(dateStr: string): string {
  const [, m, d] = dateStr.split('-');
  return `${Number(m)}/${Number(d)}`;
}
