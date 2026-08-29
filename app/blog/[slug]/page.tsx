import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { BLOG_POSTS, getBlogPost } from '@/lib/blogPosts';
import { CalendarWidget } from '@/lib/CalendarWidget';
import { DeadlineBanner } from '@/lib/DeadlineBanner';
import { formatMonthDay } from '@/lib/deadlineUtils';
import { CategoryIllustration } from '@/lib/illustrations';
import { Highlighted } from '@/lib/richText';

// 2026-08-29: 마감 임박 배너(DeadlineBanner)가 매 요청 시가 아니라 "이 페이지가 마지막으로
// 생성된 시점"의 new Date()로 D-day를 계산해서, revalidate가 없으면 배포 안 하는 한 날짜가
// 계속 그대로 박제되는 문제가 있었음(사용자가 발견). 홈페이지(app/page.tsx)와 같은 값으로
// 맞춰서 1시간마다 재생성되게 함 — 이러면 아무도 안 건드려도 D-day가 매일 알아서 줄어듦.
export const revalidate = 3600;

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
    <div className="mx-auto max-w-5xl px-6 py-10 lg:grid lg:grid-cols-[1fr_300px] lg:items-start lg:gap-10">
    <article className="max-w-2xl">
      <Link href="/blog" className="text-sm text-mint hover:underline">
        ← 블로그 목록
      </Link>

      {/* 2026-08-27: "페이지에 사람들을 머무르게 할 장치" — 실제 D-day 기준으로 톤을 다르게
          보여주는 마감 임박 배너(lib/DeadlineBanner.tsx). 항상 "임박!"이라고 우기지 않도록
          마감이 한참 남은 글은 다른 임박 공고로 자연스럽게 유도하는 버전으로 대체됨. */}
      <DeadlineBanner startDate={post.startDate} deadlineDate={post.deadlineDate} />

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

      {/* 2026-08-26: 공고 담당자가 만든 카드뉴스 이미지가 있는 글은, 실제로 그 내용을 말하는
          문단 바로 위에 정확히 꽂아줌(post.images의 position: {section,paragraph}) — 사용자 피드백:
          "사진 두 장을 글 없이 붙여넣지 말고, 사진 내용이랑 같은 내용이 들어간 글 위에 넣어줘".
          이 필드가 있는 글은 이모지 삽화를 아예 안 씀(기존에 있던 플레이스홀더 그림을 빼기 위함).
          post.images가 아예 없는 글만 기존처럼 이모지 삽화로 대체(초반/중반 두 군데, 2026-08-25 결정). */}
      {(() => {
        const hasCustomImages = Boolean(post.images && post.images.length > 0);
        return post.sections.map((section, i) => (
          <Fragment key={i}>
            <section className="mt-10">
              <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{section.heading}</h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.paragraphs.map((p, j) => {
                  const inlineImages =
                    post.images?.filter(
                      (img) =>
                        img.position !== 'end' &&
                        img.position.section === i &&
                        img.position.paragraph === j,
                    ) ?? [];
                  return (
                    <Fragment key={j}>
                      {inlineImages.map((img) => (
                        // eslint-disable-next-line @next/next/no-img-element -- 위 썸네일과 동일한 이유
                        <img
                          key={img.src}
                          src={img.src}
                          alt={img.alt}
                          className="w-full rounded-xl border border-line"
                        />
                      ))}
                      <p className="text-base leading-relaxed text-ink-soft">
                        <Highlighted text={p} />
                      </p>
                    </Fragment>
                  );
                })}
              </div>
            </section>
            {!hasCustomImages && (i === 0 || i === 2) && (
              <CategoryIllustration categoryLabel={post.categoryLabel} />
            )}
          </Fragment>
        ));
      })()}

      {/* 전체 내용을 한눈에 정리한 최종 요약 카드 등 — 마지막 섹션 뒤, 공식 링크 박스 앞에 삽입 */}
      {post.images
        ?.filter((img) => img.position === 'end')
        .map((img) => (
          // eslint-disable-next-line @next/next/no-img-element -- 위 썸네일과 동일한 이유
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="mt-10 w-full rounded-xl border border-line"
          />
        ))}

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

      {/* 2026-08-27: 오른쪽 여백 캘린더 — 앱 캘린더 탭처럼 공고 시작일에 점만 찍어두고, 그 점이
          아니라 날짜 셀 전체를 눌러야 그날 시작하는 공고 목록이 펼쳐짐(lib/CalendarWidget.tsx).
          데스크톱(lg 이상)에서만 보이고 스크롤해도 같이 따라오게 sticky 처리. */}
      <aside className="mt-10 lg:mt-0 lg:sticky lg:top-10">
        <CalendarWidget />
      </aside>
    </div>
  );
}
