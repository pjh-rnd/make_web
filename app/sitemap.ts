import type { MetadataRoute } from 'next';

import { BLOG_POSTS } from '@/lib/blogPosts';
import { SITE_URL } from '@/lib/siteConfig';
import { supabaseServer } from '@/lib/supabaseServer';

// Next.js가 이 파일을 /sitemap.xml로 자동 노출해줌 — 구글 서치 콘솔에 이 주소를 제출하면 됨.
// 2026-10-13: 정책 상세 페이지(app/policies/[id]/page.tsx)가 생겨서 여기도 같이 채움 — 사람이
// 직접 쓴 요약(policy_ai_summaries)이 있는 건은 우선순위를 더 높게 줌(목록 페이지와 같은 기준으로
// 제목+기관 중복도 제거).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/policies`, changeFrequency: 'hourly', priority: 0.5 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.1 },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const policyPages: MetadataRoute.Sitemap = await getPolicyPages();

  return [...staticPages, ...blogPages, ...policyPages];
}

async function getPolicyPages(): Promise<MetadataRoute.Sitemap> {
  const { data: policies, error } = await supabaseServer
    .from('policies')
    .select('id, title, org_name')
    .range(0, 1999);
  if (error || !policies) {
    console.error('[sitemap] 정책 목록 조회 실패:', error?.message);
    return [];
  }

  const { data: summaries } = await supabaseServer.from('policy_ai_summaries').select('policy_id');
  const summarized = new Set((summaries ?? []).map((s) => s.policy_id));

  const seen = new Set<string>();
  const pages: MetadataRoute.Sitemap = [];
  for (const p of policies) {
    const key = `${p.title}|${p.org_name ?? ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    pages.push({
      url: `${SITE_URL}/policies/${p.id}`,
      changeFrequency: 'weekly',
      priority: summarized.has(p.id) ? 0.6 : 0.3,
    });
  }
  return pages;
}
