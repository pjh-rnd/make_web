import type { MetadataRoute } from 'next';

import { BLOG_POSTS } from '@/lib/blogPosts';
import { SITE_URL } from '@/lib/siteConfig';

// Next.js가 이 파일을 /sitemap.xml로 자동 노출해줌 — 구글 서치 콘솔에 이 주소를 제출하면 됨.
// 정책 홈 목록(517건)은 각 카드가 별도 URL(상세 페이지)이 아직 없어서 sitemap엔 안 넣음 —
// 정책 상세 페이지를 나중에 만들면 그때 policies 테이블을 읽어서 여기도 같이 채우면 됨.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.1 },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
