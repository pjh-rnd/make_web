// 2026-08-29: "광고처럼, 사용자에게 이런 공고도 있다고 보여줄 수 있는 창을 맨 위에" — 프로토타입.
// 지금 보고 있는 글 말고 다른 공고로 눈을 돌리게 하는 가로 스크롤 배너. DeadlineBanner(마감 임박
// 톤 조절)랑 CalendarWidget에 이은 세 번째 "머무르게 하는 장치"인데, 이건 정적 데이터만 있으면
// 되니까 서버 컴포넌트로 둠(클릭 이동 말곤 상호작용 없음).
import Link from 'next/link';

import { BLOG_POSTS } from '@/lib/blogPosts';
import { COLORS } from '@/lib/colors';
import { computeDday } from '@/lib/deadlineUtils';

const PHASE_RANK: Record<string, number> = { active: 0, before: 1, rolling: 2, closed: 3 };

export function OtherPoliciesBanner({ excludeSlug }: { excludeSlug: string }) {
  // 마감 임박(active) 순으로 앞세우고, 이미 마감된 건 아예 후보에서 뺌 — 지금 보고 있는 글은 제외.
  const candidates = BLOG_POSTS.filter((p) => p.slug !== excludeSlug)
    .map((post) => ({ post, dday: computeDday(post.startDate, post.deadlineDate) }))
    .filter(({ dday }) => dday.phase !== 'closed')
    .sort((a, b) => PHASE_RANK[a.dday.phase] - PHASE_RANK[b.dday.phase])
    .slice(0, 6);

  if (candidates.length === 0) return null;

  return (
    <div className="border-b border-line" style={{ backgroundColor: COLORS.paperRaise }}>
      <div className="mx-auto max-w-5xl px-6 py-3">
        <p className="text-[11px] font-bold" style={{ color: COLORS.inkSoft }}>
          📌 이런 공고도 놓치지 마세요
        </p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {candidates.map(({ post, dday }) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:opacity-80"
              style={{ borderColor: COLORS.line, color: COLORS.ink }}
            >
              <span className="max-w-[160px] truncate">{post.title}</span>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                style={{ backgroundColor: dday.phase === 'active' ? COLORS.coral : COLORS.mint }}
              >
                {dday.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
