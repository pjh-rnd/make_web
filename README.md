# Fit Me — 웹

Fit Me(청년정책 캘린더 앱, `../moa-app`)와 같은 Supabase 프로젝트를 읽기 전용으로 바라보는
공개 웹사이트. 로그인 없이 정책 목록(`/`)과 정책 블로그(`/blog`)를 보여주는 것이 목적.

## 로컬에서 실행

```
npm install
npm run dev
```

`http://localhost:3000` 접속.

## 아키텍처 메모

- `moa-app`의 `policies`/`policy_ai_summaries` 테이블은 RLS가 "로그인한(authenticated) 사용자만
  읽기 허용"으로 되어 있음(모바일 앱이 로그인 후에만 화면을 보여주는 구조라서). 이 웹사이트는
  로그인 없이 공개돼야 하므로, `lib/supabaseServer.ts`가 **service_role 키로 서버 컴포넌트에서만**
  데이터를 읽어와 완성된 HTML을 내려줌 — 이 키는 `.env.local`에 `NEXT_PUBLIC_` 접두사 없이
  저장돼 있어서 브라우저로는 절대 전송되지 않음.
- `lib/colors.ts`, `lib/deadlineUtils.ts`는 `moa-app`의 같은 이름 파일에서 값/로직을 그대로 복사해온
  것 — 두 프로젝트가 서로 import할 수 없는 별도 저장소라, 앱 쪽 파일이 바뀌면 여기도 수동으로
  맞춰줘야 함.
- `/blog`는 `lib/blogPosts.ts`에 고정된 데이터(정적 배열)를 씀 — `policy_ai_summaries`에서 사람이
  직접 쓴 요약 10건을 골라 옮겨온 것. 새 글을 추가하려면 이 배열에 항목을 추가하면 됨.

## 배포

Vercel에 이 폴더를 새 프로젝트로 연결하고, `.env.local`의 두 값(`NEXT_PUBLIC_SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`)을 Vercel 프로젝트 환경변수에 그대로 등록하면 됨.
`SUPABASE_SERVICE_ROLE_KEY`는 절대 `NEXT_PUBLIC_` 접두사를 붙이지 말 것.
