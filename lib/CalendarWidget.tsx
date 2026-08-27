'use client';

// 2026-08-27: "페이지에 사람들을 머무르게 할 장치" 두 번째 — 앱의 캘린더 탭처럼, 오른쪽 여백에
// 이번 달 달력을 두고 공고 시작일이 있는 날짜엔 점(칩) 표시만 해둠. 사용자 요청대로 칩 자체는
// 누를 수 없게(그냥 표시용) 하고, 날짜 셀 전체를 눌러야 그날 시작하는 공고 목록이 아래에 펼쳐짐.
import { useMemo, useState } from 'react';
import Link from 'next/link';

import { COLORS } from '@/lib/colors';
import { BLOG_POSTS } from '@/lib/blogPosts';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function toDateKey(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function CalendarWidget() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [selected, setSelected] = useState<string | null>(null);

  // 시작일 기준으로 공고를 날짜별로 묶어둠 — 달력에 점 찍을 날짜와, 클릭했을 때 보여줄 목록 둘 다 여기서 나옴
  const postsByDate = useMemo(() => {
    const map = new Map<string, typeof BLOG_POSTS>();
    for (const post of BLOG_POSTS) {
      if (!post.startDate) continue;
      const list = map.get(post.startDate) ?? [];
      list.push(post);
      map.set(post.startDate, list);
    }
    return map;
  }, []);

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay(); // 0=일요일

  const cells: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function goPrevMonth() {
    setSelected(null);
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function goNextMonth() {
    setSelected(null);
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const selectedPosts = selected ? (postsByDate.get(selected) ?? []) : [];

  return (
    <div className="rounded-2xl border border-line bg-paper-raise p-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          aria-label="이전 달"
          className="rounded-full px-2 py-1 text-sm text-ink-soft transition hover:bg-paper"
        >
          ←
        </button>
        <p className="text-sm font-bold text-ink">
          {viewYear}년 {viewMonth + 1}월
        </p>
        <button
          type="button"
          onClick={goNextMonth}
          aria-label="다음 달"
          className="rounded-full px-2 py-1 text-sm text-ink-soft transition hover:bg-paper"
        >
          →
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-ink-soft">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;
          const dateKey = toDateKey(viewYear, viewMonth, day);
          const hasPosts = postsByDate.has(dateKey);
          const isToday = dateKey === toDateKey(today.getFullYear(), today.getMonth(), today.getDate());
          const isSelected = dateKey === selected;

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => setSelected(isSelected ? null : dateKey)}
              className="flex aspect-square flex-col items-center justify-center rounded-lg text-xs font-semibold transition"
              style={{
                backgroundColor: isSelected ? COLORS.mint : isToday ? COLORS.mintSoft : 'transparent',
                color: isSelected ? '#FFFFFF' : COLORS.ink,
              }}
            >
              <span>{day}</span>
              {/* 공고 시작일 표시용 점 — 이 점 자체는 누를 수 있는 요소가 아니라 그냥 표시임(위 버튼이 눌림 대상) */}
              {hasPosts && (
                <span
                  aria-hidden
                  className="mt-0.5 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: isSelected ? '#FFFFFF' : COLORS.coral }}
                />
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-4 border-t border-line pt-3">
          <p className="text-xs font-semibold text-ink-soft">{selected} 시작하는 공고</p>
          {selectedPosts.length > 0 ? (
            <ul className="mt-2 flex flex-col gap-2">
              {selectedPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-mint hover:underline">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink-soft">이 날 시작하는 공고는 없어요.</p>
          )}
        </div>
      )}
    </div>
  );
}
