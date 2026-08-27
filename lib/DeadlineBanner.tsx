// 2026-08-27: "페이지에 사람들을 머무르게 할 장치" — 정책 상세 글 맨 위에 항상 붙는 마감 임박
// 배너. 요청은 "D-3! 이 정책 놓치면 손해" 같은 걸 원했지만, 실제 데이터를 보면 지금 당장 임박한
// 공고는 일부(예: 부산 학자금 D-1, K-스타트업 D-4)뿐이고 나머지는 몇 달씩 남았거나 상시모집이라,
// 전부 다 "임박!"이라고 우기면 금방 신뢰를 잃음(양치기 소년) — 그래서 실제 D-day 기준으로 톤을
// 다르게 나눔. computeDday(lib/deadlineUtils.ts)가 이미 앱에서 쓰던 phase 계산을 그대로 씀.
import Link from 'next/link';

import { COLORS } from '@/lib/colors';
import { computeDday } from '@/lib/deadlineUtils';

export function DeadlineBanner({
  startDate,
  deadlineDate,
}: {
  startDate: string | null;
  deadlineDate: string | null;
}) {
  const { label, phase } = computeDday(startDate, deadlineDate);

  if (phase === 'closed') {
    return (
      <Link
        href="/blog"
        className="mt-4 flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition hover:opacity-90"
        style={{ backgroundColor: COLORS.closedGraySoft, color: COLORS.closedGray }}
      >
        <span>이 공고는 마감됐어요. 지금 신청할 수 있는 다른 정책도 있어요</span>
        <span aria-hidden>→</span>
      </Link>
    );
  }

  if (phase === 'active') {
    const ddayNum = Number(label.replace(/[^0-9]/g, '')); // "마감 D-3" -> 3, "오늘 마감" -> NaN
    const isToday = label === '오늘 마감';

    if (isToday || (!Number.isNaN(ddayNum) && ddayNum <= 5)) {
      return (
        <div
          className="mt-4 rounded-xl px-4 py-3 text-sm font-bold text-white"
          style={{ backgroundColor: COLORS.coral }}
        >
          🔥 {isToday ? '오늘 마감! 놓치면 다음 기회는 없어요' : `${label}! 이 정책 놓치면 손해예요`}
        </div>
      );
    }

    if (!Number.isNaN(ddayNum) && ddayNum <= 20) {
      return (
        <div
          className="mt-4 rounded-xl px-4 py-3 text-sm font-bold text-white"
          style={{ backgroundColor: COLORS.amber }}
        >
          ⏰ {label}, 미루다 놓치기 전에 지금 챙겨두세요
        </div>
      );
    }

    // 마감이 한참 남은 공고 — 굳이 조급하게 안 만들고, 대신 다른 임박 공고로 자연스럽게 유도
    return (
      <Link
        href="/blog"
        className="mt-4 flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition hover:opacity-90"
        style={{ backgroundColor: COLORS.mintSoft, color: COLORS.mint }}
      >
        <span>{label} — 아직 여유있어요. 마감 임박한 다른 정책도 확인해보세요</span>
        <span aria-hidden>→</span>
      </Link>
    );
  }

  if (phase === 'before') {
    return (
      <div
        className="mt-4 rounded-xl px-4 py-3 text-sm font-bold"
        style={{ backgroundColor: COLORS.violetSoft, color: COLORS.violet }}
      >
        📅 {label} — 시작하면 바로 신청할 수 있게 미리 준비해두세요
      </div>
    );
  }

  // rolling(상시모집)
  return (
    <Link
      href="/blog"
      className="mt-4 flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition hover:opacity-90"
      style={{ backgroundColor: COLORS.amberSoft, color: COLORS.amber }}
    >
      <span>🔁 상시모집 중이라 오늘 아니어도 괜찮아요. 다른 정책도 둘러볼래요?</span>
      <span aria-hidden>→</span>
    </Link>
  );
}
