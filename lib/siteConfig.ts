// 배포된 실제 도메인이 정해지면 .env.local(그리고 Vercel 프로젝트 환경변수)에
// NEXT_PUBLIC_SITE_URL을 채워 넣으면 sitemap.xml/robots.txt/메타데이터가 전부 그 주소를 씀.
// 아직 안 정해졌으니 로컬 개발 기준값으로 폴백해둠.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
