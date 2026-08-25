import { createClient } from '@supabase/supabase-js';

// moa-app(모바일 앱)이 쓰는 것과 완전히 같은 Supabase 프로젝트를 그대로 바라봄 — 데이터 파이프라인
// (scripts/syncYouthPolicies.js 등)이 앱 쪽에만 있고 여긴 읽기 전용이라, 여기서 별도로 동기화
// 스크립트를 다시 만들 필요가 없음. anon key만 씀(공개 클라이언트 키라 노출돼도 안전 — RLS로 보호됨).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
