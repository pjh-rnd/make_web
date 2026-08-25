import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BLOG_POSTS, getBlogPost } from '@/lib/blogPosts';
import { formatMonthDay } from '@/lib/deadlineUtils';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Fit Me 블로그`,
    description: post.intro,
  };
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-ink-soft">
            <span className="text-mint">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/blog" className="text-sm text-mint hover:underline">
        ← 블로그 목록
      </Link>

      <p className="mt-4 text-xs font-semibold text-mint">
        {post.categoryLabel} · {post.orgName}
      </p>
      <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{post.title}</h1>
      <p className="mt-2 text-xs text-ink-soft">
        {post.startDate && post.deadlineDate
          ? `신청기간 ${formatMonthDay(post.startDate)} ~ ${formatMonthDay(post.deadlineDate)}`
          : '상시모집'}
      </p>

      <p className="mt-6 text-base leading-relaxed text-ink">{post.intro}</p>

      <Section title="지원 대상" items={post.target} />
      <Section title="지원 내용" items={post.support} />
      <Section title="신청 방법" items={post.applyMethod} />
      <Section title="제출 서류" items={post.documents} />

      {post.sourceLinks.length > 0 && (
        <section className="mt-8 rounded-xl bg-mint-soft p-4">
          <h2 className="text-sm font-bold text-ink">공식 링크</h2>
          <ul className="mt-2 flex flex-col gap-1">
            {post.sourceLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mint underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-xs text-ink-soft">
        이 글은 온통청년 오픈API 원문을 사람이 직접 읽고 정리했어요. 정확한 최신 정보는 위 공식
        링크에서 다시 확인해주세요.
      </p>
    </article>
  );
}
