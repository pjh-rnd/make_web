import { CATEGORY_COLOR, CATEGORY_ICON, CATEGORY_LABEL, ddayStyle } from '@/lib/colors';
import { computeDday, formatMonthDay } from '@/lib/deadlineUtils';
import { supabaseServer } from '@/lib/supabaseServer';

// 홈페이지는 로그인 없이 누구나 보는 공개 페이지라, moa-app(모바일 앱)처럼 "찜한 것만" 보여주지
// 않고 전체 정책 목록을 마감 임박순으로 보여줌 — 웹은 검색엔진 유입/첫 방문자를 위한 창구라
// "이렇게나 많은 정책이 있구나"를 바로 보여주는 게 목적에 더 맞음.
export const revalidate = 3600; // 1시간마다 재생성(정책 데이터는 npm run sync-policies로만 바뀜)

type PolicyRow = {
  id: string;
  category: string;
  title: string;
  meta: string;
  org_name: string | null;
  start_date: string | null;
  deadline_date: string | null;
};

async function getPolicies(): Promise<PolicyRow[]> {
  const { data, error } = await supabaseServer
    .from('policies')
    .select('id, category, title, meta, org_name, start_date, deadline_date')
    .order('deadline_date', { ascending: true, nullsFirst: false })
    .range(0, 1999);

  if (error) {
    console.error('[home] 정책 목록 조회 실패:', error.message);
    return [];
  }
  return data ?? [];
}

export default async function Home() {
  const policies = await getPolicies();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <section className="mb-10">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">나에게 맞는 청년정책, 한눈에</h1>
        <p className="mt-2 text-ink-soft">
          여기저기 흩어진 청년정책 공고를 한곳에 모아 마감일과 지원 조건을 보여드려요. 지금{' '}
          <strong className="text-mint">{policies.length}건</strong>의 공고를 모아뒀어요.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {policies.map((p) => {
          const dday = computeDday(p.start_date, p.deadline_date);
          const badge = ddayStyle(dday.phase);
          const catColor = CATEGORY_COLOR[p.category as keyof typeof CATEGORY_COLOR] ?? '#999';
          return (
            <article
              key={p.id}
              className="flex flex-col justify-between rounded-2xl border border-line bg-paper-raise p-5 shadow-sm transition hover:shadow-md"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${catColor}22`, color: catColor }}
                  >
                    {CATEGORY_ICON[p.category] ?? ''} {CATEGORY_LABEL[p.category] ?? p.category}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: badge.bg, color: badge.text }}
                  >
                    {dday.label}
                  </span>
                </div>
                <h2 className="line-clamp-2 text-base font-bold text-ink">{p.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">{p.meta}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
                <span>
                  {p.start_date && p.deadline_date
                    ? `${formatMonthDay(p.start_date)} ~ ${formatMonthDay(p.deadline_date)}`
                    : '상시모집'}
                </span>
                <span className="truncate pl-2">{p.org_name}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
