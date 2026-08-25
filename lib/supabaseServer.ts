import 'server-only';

import { createClient } from '@supabase/supabase-js';

// 이 파일은 Server Component/Route Handler에서만 import할 것 — 'use client' 파일에서 import하면
// 빌드가 막히도록 'server-only' 패키지를 맨 위에 둠. moa-app의 policies/policy_ai_summaries
// 테이블은 RLS가 "authenticated만 읽기 허용"이라(모바일 앱은 로그인 후에만 화면을 보여주는
// 구조라 그렇게 되어 있음), 로그인 없는 이 웹사이트에서 공개 정책 데이터를 보여주려면 RLS를
// 우회하는 service_role 키가 필요함. 이 키는 절대 클라이언트로 보내면 안 되므로(NEXT_PUBLIC_
// 접두사 없는 서버 전용 env 변수), Server Component가 서버에서 데이터를 미리 읽어 완성된 HTML만
// 브라우저로 내려주는 방식으로만 씀.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});
