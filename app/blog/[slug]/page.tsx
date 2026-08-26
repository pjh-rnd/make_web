import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { BLOG_POSTS, getBlogPost } from '@/lib/blogPosts';
import { formatMonthDay } from '@/lib/deadlineUtils';
import { CategoryIllustration } from '@/lib/illustrations';
import { Highlighted } from '@/lib/richText';

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

// 공고 원문 페이지를 실제로 캡처해서 보여줌 — 워드프레스가 무료로 제공하는 mshots 스크린샷
// 서비스(https://s.wordpress.com/mshots/v1/)를 씀. 직접 스크린샷 도구를 붙이는 것보다 훨씬
// 간단하고, 우리가 이미지 파일을 저장/관리할 필요도 없음(요청마다 그쪽 서버가 최신 캡처를 내려줌).
// 첫 요청 땐 "캡처 중" placeholder가 뜨고 몇 초~몇 분 뒤부터 실제 캡처로 바뀌는 편.
function screenshotUrl(pageUrl: string): string {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(pageUrl)}?w=1000&h=650`;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const primaryLink = post.sourceLinks[0];

  return (
    <article className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/blog" className="text-sm text-mint hover:underline">
        ← 블로그 목록
      </Link>

      <p className="mt-4 text-xs font-semibold text-mint">
        {post.categoryLabel} · {post.orgName}
      </p>
      <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{post.title}</h1>
      <p className="mt-3 text-lg font-semibold text-mint">{post.hook}</p>
      <p className="mt-2 text-xs text-ink-soft">
        {post.startDate && post.deadlineDate
          ? `신청기간 ${formatMonthDay(post.startDate)} ~ ${formatMonthDay(post.deadlineDate)}`
          : '상시모집'}
      </p>

      {post.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element -- 공고 담당자가 만든 카드뉴스형
        // 고정 이미지라, 아래 캡처 이미지와 같은 이유로 next/image 없이 간단하게 처리
        <img
          src={post.thumbnail}
          alt={`${post.title} 썸네일`}
          className="mt-6 w-full rounded-xl border border-line"
        />
      )}

      {primaryLink && (
        <a
          href={primaryLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block overflow-hidden rounded-xl border border-line bg-paper-raise"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- 외부 캡처 이미지라 next/image
              remotePatterns 설정보단 그냥 img 태그가 더 간단함(도메인 하나 때문에 설정 추가 X) */}
          <img
            src={screenshotUrl(primaryLink.url)}
            alt={`${post.orgName} 공식 공고 페이지 캡처`}
            className="w-full"
          />
          <p className="border-t border-line px-4 py-2 text-xs text-ink-soft">
            📸 공고 원문 페이지 캡처 · {primaryLink.label}
          </p>
        </a>
      )}

      <p className="mt-6 text-base leading-relaxed text-ink">
        <Highlighted text={post.intro} />
      </p>

      {post.sections.map((section, i) => {
        // 2026-08-26: 공고 담당자가 실제로 만든 카드뉴스 이미지를 받은 글은 그걸 해당 섹션 뒤에
        // 순서대로 꽂아줌(post.images). 이 필드가 있는 글은 이모지 삽화를 아예 안 씀(사용자 요청:
        // "기존에 있던 그림은 다 빼") — 이미지가 안 걸린 섹션 뒤라고 이모지로 채우지 않음.
        // post.images가 아예 없는 글만 기존처럼 이모지 삽화로 대체(초반/중반 두 군데, 2026-08-25 결정).
        const hasCustomImages = Boolean(post.images && post.images.length > 0);
        const sectionImages = post.images?.filter((img) => img.afterSection === i) ?? [];
        return (
          <Fragment key={i}>
            <section className="mt-10">
              <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{section.heading}</h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-base leading-relaxed text-ink-soft">
                    <Highlighted text={p} />
                  </p>
                ))}
              </div>
            </section>
            {sectionImages.length > 0
              ? sectionImages.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element -- 위 썸네일과 동일한 이유
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    className="my-8 w-full rounded-xl border border-line"
                  />
                ))
              : !hasCustomImages &&
                (i === 0 || i === 2) && <CategoryIllustration categoryLabel={post.categoryLabel} />}
          </Fragment>
        );
      })}

      {post.sourceLinks.length > 0 && (
        <section className="mt-10 rounded-xl bg-mint-soft p-4">
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
