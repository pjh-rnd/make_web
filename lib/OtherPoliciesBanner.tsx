// 2026-08-29: "광고처럼, 사용자에게 이런 공고도 있다고 보여줄 수 있는 창을 맨 위에" — 프로토타입.
// 처음엔 가로 스크롤 칩 형태였는데, 사용자 피드백으로 세로로 더 크게 바꿈(카드 형태, 목록
// 페이지의 카드 스타일을 재사용). DeadlineBanner(마감 임박 톤 조절)랑 CalendarWidget에 이은
// 세 번째 "머무르게 하는 장치". 정적 데이터만 있으면 되니까 서버 컴포넌트로 둠.
import Link from 'next/link';

import { BLOG_POSTS } from '@/lib/blogPosts';
import { CATEGORY_COLOR } from '@/lib/colors';
import { COLORS } from '@/lib/colors';
import { computeDday } from '@/lib/deadlineUtils';

const CATEGORY_KEY: Record<string, string> = {
  교육: 'edu',
  취업: 'job',
  주거: 'housing',
  복지: 'welfare',
  자산: 'money',
  참여: 'participation',
};

const PHASE_RANK: Record<string, number> = { active: 0, before: 1, rolling: 2, closed: 3 };

// excludeSlug는 상세페이지에서만 넘겨줌(지금 보고 있는 글은 빼야 하니까) — 목록 페이지에선 안 넘김.
export function OtherPoliciesBanner({ excludeSlug, count = 3 }: { excludeSlug?: string; count?: number }) {
  // 랜덤 아님 — 마감 임박(active) 순으로 앞세우고, 이미 마감된 건 후보에서 뺌.
  const candidates = BLOG_POSTS.filter((p) => p.slug !== excludeSlug)
    .map((post) => ({ post, dday: computeDday(post.startDate, post.deadlineDate) }))
    .filter(({ dday }) => dday.phase !== 'closed')
    .sort((a, b) => PHASE_RANK[a.dday.phase] - PHASE_RANK[b.dday.phase])
    .slice(0, count);

  if (candidates.length === 0) return null;

  return (
    <div className="border-b border-line" style={{ backgroundColor: COLORS.paperRaise }}>
      <div className="mx-auto max-w-5xl px-6 py-6">
        <p className="text-sm font-bold" style={{ color: COLORS.ink }}>
          📌 이런 공고도 놓치지 마세요
        </p>
        <div className="mt-3 flex flex-col gap-3">
          {candidates.map(({ post, dday }) => {
            const catColor = CATEGORY_COLOR[CATEGORY_KEY[post.categoryLabel] ?? ''] ?? COLORS.paleGray;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center gap-4 rounded-2xl border p-4 transition hover:shadow-md"
                style={{ borderColor: COLORS.line, backgroundColor: COLORS.paper }}
              >
                {post.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element -- 다른 카드와 같은 이유
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="h-16 w-24 shrink-0 rounded-lg border object-cover sm:h-20 sm:w-32"
                    style={{ borderColor: COLORS.line }}
                  />
                ) : (
                  <div
                    className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border text-2xl sm:h-20 sm:w-32"
                    style={{ borderColor: COLORS.line, backgroundColor: COLORS.paperRaise }}
                  >
                    {post.categoryLabel === '주거' && '🏠'}
                    {post.categoryLabel === '자산' && '💰'}
                    {post.categoryLabel === '취업' && '💼'}
                    {post.categoryLabel === '교육' && '📚'}
                    {post.categoryLabel === '복지' && '🏥'}
                    {post.categoryLabel === '참여' && '🙋'}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                      style={{ backgroundColor: `${catColor}22`, color: catColor }}
                    >
                      {post.categoryLabel}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                      style={{ backgroundColor: dday.phase === 'active' ? COLORS.coral : COLORS.mint }}
                    >
                      {dday.label}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-base font-bold" style={{ color: COLORS.ink }}>
                    {post.title}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold" style={{ color: COLORS.mint }}>
                    {post.hook}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
