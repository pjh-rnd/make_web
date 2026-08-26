import type { Metadata } from 'next';
import Link from 'next/link';

import { CATEGORY_COLOR } from '@/lib/colors';
import { BLOG_POSTS } from '@/lib/blogPosts';

export const metadata: Metadata = {
  title: '블로그 — Fit Me',
  description: '청년정책 공고를 하나씩 정리해서 알려드리는 Fit Me 블로그.',
};

const CATEGORY_KEY: Record<string, string> = {
  교육: 'edu',
  취업: 'job',
  주거: 'housing',
  복지: 'welfare',
  자산: 'money',
  참여: 'participation',
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">블로그</h1>
      <p className="mt-2 text-ink-soft">실제 청년정책 공고를 하나씩 골라 신청 조건과 방법을 정리해드려요.</p>

      <ul className="mt-8 flex flex-col gap-4">
        {BLOG_POSTS.map((post) => {
          const catColor = CATEGORY_COLOR[CATEGORY_KEY[post.categoryLabel] ?? ''] ?? '#999';
          return (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex gap-4 rounded-2xl border border-line bg-paper-raise p-5 transition hover:shadow-md"
              >
                {/* 카드뉴스 썸네일 있는 글만 보여줌 — 없는 글은 기존처럼 텍스트만 */}
                {post.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element -- 목록용 작은 썸네일, 상세
                  // 페이지의 img 태그와 같은 이유로 next/image 생략
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="h-20 w-28 shrink-0 rounded-lg border border-line object-cover sm:h-24 sm:w-36"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <span
                    className="mb-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${catColor}22`, color: catColor }}
                  >
                    {post.categoryLabel}
                  </span>
                  <h2 className="text-lg font-bold text-ink">{post.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-mint">{post.hook}</p>
                  <p className="mt-2 text-xs text-ink-soft">{post.orgName}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
