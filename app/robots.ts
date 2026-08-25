import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/siteConfig';

// Next.js가 이 파일을 /robots.txt로 자동 노출해줌.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
