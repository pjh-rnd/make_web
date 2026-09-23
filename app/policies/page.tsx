import type { Metadata } from 'next';

import { CATEGORY_COLOR, CATEGORY_ICON, CATEGORY_LABEL, ddayStyle } from '@/lib/colors';
import { computeDday, formatMonthDay } from '@/lib/deadlineUtils';
import { supabaseServer } from '@/lib/supabaseServer';

// 2026-09-23: 애드센스가 "콘텐츠 불충분/자동 생성 페이지" 사유로 거절함 — 원인은 이 원본 목록이
// 홈(/)에 그대로 있어서, 첫인상이 "API에서 긁어온 카드 나열"로 보였을 가능성이 큼(카드에 링크도
// 없고 텍스트도 한두 줄뿐). 그래서 이 목록 자체는 별도 페이지(/policies)로 옮기고, 홈은 실제
// 글(블로그)을 앞세우는 쪽으로 재구성함(app/page.tsx 참고).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: '전체 정책 모아보기 — Fit Me',
  description: '흩어진 청년정책 공고를 마감일 임박순으로 한곳에 모아봤어요.',
};

type PolicyRow = {
  id: string;
  category: string;
  title: string;
  meta: string;
  org_name: string | null;
  start_date: string | null;
  deadline_date: string | null;
};

async function getPolicies(): Promise<PolicyRow[]> {
  const { data, error } = await supabaseServer
    .from('policies')
    .select('id, category, title, meta, org_name, start_date, deadline_date')
    .order('deadline_date', { ascending: true, nullsFirst: false })
    .range(0, 1999);

  if (error) {
    console.error('[policies] 정책 목록 조회 실패:', error.message);
    return [];
  }
  return data ?? [];
}

export default async function PoliciesPage() {
  const policies = await getPolicies();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <section className="mb-10">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">전체 정책 모아보기</h1>
        <p className="mt-2 text-ink-soft">
          여기저기 흩어진 청년정책 공고를 한곳에 모아 마감일과 지원 조건을 보여드려요. 지금{' '}
          <strong className="text-mint">{policies.length}건</strong>의 공고를 모아뒀어요.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {policies.map((p) => {
          const dday = computeDday(p.start_date, p.deadline_date);
          const badge = ddayStyle(dday.phase);
          const catColor = CATEGORY_COLOR[p.category as keyof typeof CATEGORY_COLOR] ?? '#999';
          return (
            <article
              key={p.id}
              className="flex flex-col justify-between rounded-2xl border border-line bg-paper-raise p-5 shadow-sm transition hover:shadow-md"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${catColor}22`, color: catColor }}
                  >
                    {CATEGORY_ICON[p.category] ?? ''} {CATEGORY_LABEL[p.category] ?? p.category}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: badge.bg, color: badge.text }}
                  >
                    {dday.label}
                  </span>
                </div>
                <h2 className="line-clamp-2 text-base font-bold text-ink">{p.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">{p.meta}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
                <span>
                  {p.start_date && p.deadline_date
                    ? `${formatMonthDay(p.start_date)} ~ ${formatMonthDay(p.deadline_date)}`
                    : '상시모집'}
                </span>
                <span className="truncate pl-2">{p.org_name}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
