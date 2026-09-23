import Link from 'next/link';

import { BLOG_POSTS } from '@/lib/blogPosts';
import { CATEGORY_COLOR, CATEGORY_ICON, CATEGORY_LABEL, ddayStyle } from '@/lib/colors';
import { computeDday, formatMonthDay } from '@/lib/deadlineUtils';
import { supabaseServer } from '@/lib/supabaseServer';

// 2026-09-23: 애드센스 거절(콘텐츠 불충분/자동 생성 페이지) 대응 — 이전엔 홈이 API 원본 데이터를
// 카드로 나열만 한 목록(링크도 없고 한두 줄짜리 텍스트뿐)이라 첫인상이 "자동 생성 페이지"로
// 보였을 가능성이 큼. 그 목록 전체는 /policies로 옮기고, 홈은 실제 사람이 쓴 콘텐츠(블로그)를
// 앞세우는 구조로 재구성함 — 소개 문단도 두 문장에서 늘림.
export const revalidate = 3600;

type PolicyRow = {
  id: string;
  category: string;
  title: string;
  meta: string;
  org_name: string | null;
  start_date: string | null;
  deadline_date: string | null;
};

async function getUrgentPolicies(): Promise<PolicyRow[]> {
  const { data, error } = await supabaseServer
    .from('policies')
    .select('id, category, title, meta, org_name, start_date, deadline_date')
    .order('deadline_date', { ascending: true, nullsFirst: false })
    .range(0, 5);

  if (error) {
    console.error('[home] 정책 목록 조회 실패:', error.message);
    return [];
  }
  return data ?? [];
}

export default async function Home() {
  const urgentPolicies = await getUrgentPolicies();
  const recentPosts = [...BLOG_POSTS]
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    .slice(0, 9);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <section className="mb-12">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">나에게 맞는 청년정책, 한눈에</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
          국가, 지자체, 공공기관 여기저기 흩어져 있는 청년정책 공고를 Fit Me가 한곳에 모아드려요.
          장학금·주거비·취업지원부터 지역별 소소한 지원사업까지, 마감일과 지원 조건을 사람이 직접
          읽고 정리해서 알려드립니다. 아래 블로그에서 정책 하나하나를 자세히 소개하고, 신청 전
          체크리스트까지 같이 챙겨드려요.
        </p>
      </section>

      <section className="mb-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-ink">블로그에서 최근 올라온 글</h2>
          <Link href="/blog" className="text-sm font-semibold text-mint hover:underline">
            전체 글 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => {
            const catColor = CATEGORY_COLOR[
              (Object.entries(CATEGORY_LABEL).find(([, label]) => label === post.categoryLabel)?.[0] ??
                '') as keyof typeof CATEGORY_COLOR
            ] ?? '#999';
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col justify-between rounded-2xl border border-line bg-paper-raise p-5 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <span
                    className="mb-3 inline-block rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${catColor}22`, color: catColor }}
                  >
                    {post.categoryLabel}
                  </span>
                  <h3 className="line-clamp-2 text-base font-bold text-ink">{post.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold text-mint">{post.hook}</p>
                </div>
                <p className="mt-4 truncate text-xs text-ink-soft">{post.orgName}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-ink">지금 마감 임박한 정책</h2>
          <Link href="/policies" className="text-sm font-semibold text-mint hover:underline">
            전체 정책 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {urgentPolicies.map((p) => {
            const dday = computeDday(p.start_date, p.deadline_date);
            const badge = ddayStyle(dday.phase);
            const catColor = CATEGORY_COLOR[p.category as keyof typeof CATEGORY_COLOR] ?? '#999';
            return (
              <Link
                key={p.id}
                href="/policies"
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
                  <h3 className="line-clamp-2 text-base font-bold text-ink">{p.title}</h3>
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
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
