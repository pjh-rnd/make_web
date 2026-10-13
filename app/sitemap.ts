import type { MetadataRoute } from 'next';

import { BLOG_POSTS } from '@/lib/blogPosts';
import { SITE_URL } from '@/lib/siteConfig';

// Next.js가 이 파일을 /sitemap.xml로 자동 노출해줌 — 구글 서치 콘솔에 이 주소를 제출하면 됨.
// 2026-10-13: /policies(정책 목록+상세) 자체를 없애기로 해서 그 URL들은 다시 뺌 — 블로그만 남김.
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
