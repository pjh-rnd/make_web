import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CATEGORY_COLOR, CATEGORY_ICON, CATEGORY_LABEL, COLORS } from '@/lib/colors';
import { DeadlineBanner } from '@/lib/DeadlineBanner';
import { formatMonthDay } from '@/lib/deadlineUtils';
import { supabaseServer } from '@/lib/supabaseServer';

// 2026-10-13: 애드센스가 "가치 별로 없는 콘텐츠"로 재거절 — 핵심 원인 중 하나는 정책 518건이
// /policies 목록 카드로만 존재하고 개별 URL(클릭해서 들어갈 상세 페이지)이 아예 없었다는 점.
// moa-app Supabase의 policy_ai_summaries 테이블엔 이미 518건 중 509건(98%)에 대해 사람이
// 원문을 직접 읽고 쓴 요약·상세 내용이 있는데(모바일 앱 정책 상세 화면에서만 쓰던 데이터),
// 그걸 그대로 웹에도 노출시킴 — 새로 글을 쓰는 게 아니라 이미 있는 고유 콘텐츠를 꺼내놓는 것.
export const revalidate = 3600;

type PolicyRow = {
  id: string;
  category: string;
  title: string;
  meta: string;
  org_name: string | null;
  start_date: string | null;
  deadline_date: string | null;
  raw: Record<string, unknown> | null;
};

type SummaryRow = {
  summary_intro: string;
  summary_support: string;
  summary_apply: string;
  target_detail: string[];
  support_detail: string[];
  apply_method_detail: string[];
  documents_detail: string[];
};

async function getPolicy(id: string): Promise<PolicyRow | null> {
  const { data, error } = await supabaseServer
    .from('policies')
    .select('id, category, title, meta, org_name, start_date, deadline_date, raw')
    .eq('id', id)
    .maybeSingle();
  if (error) {
    console.error('[policy detail] 정책 조회 실패:', error.message);
    return null;
  }
  return data;
}

async function getSummary(id: string): Promise<SummaryRow | null> {
  const { data, error } = await supabaseServer
    .from('policy_ai_summaries')
    .select('summary_intro, summary_support, summary_apply, target_detail, support_detail, apply_method_detail, documents_detail')
    .eq('policy_id', id)
    .maybeSingle();
  if (error) {
    // 테이블 자체가 없거나 일시적 오류인 경우에도 페이지 전체를 죽이지 않고 raw 폴백으로 넘어감
    console.error('[policy detail] 요약 조회 실패:', error.message);
    return null;
  }
  return data;
}

function asText(v: unknown): string | null {
  return typeof v === 'string' && v.trim() ? v.trim() : null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const policy = await getPolicy(id);
  if (!policy) return {};
  return {
    title: `${policy.title} — Fit Me`,
    description: policy.meta || `${policy.org_name ?? ''} ${policy.title}`.trim(),
  };
}

export default async function PolicyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [policy, summary] = await Promise.all([getPolicy(id), getSummary(id)]);
  if (!policy) notFound();

  const raw = policy.raw ?? {};
  const catColor = CATEGORY_COLOR[policy.category as keyof typeof CATEGORY_COLOR] ?? COLORS.paleGray;
  const officialUrl = asText(raw.aplyUrlAddr) ?? asText(raw.refUrlAddr1) ?? null;

  // policy_ai_summaries가 있는 509건은 사람이 직접 쓴 내용을, 없는 나머지는 원문(raw) 필드를
  // 그대로 보여줌 — 어느 쪽이든 "지어내지 않는다"는 원칙은 동일하게 지킴.
  const targetItems = summary?.target_detail?.length ? summary.target_detail : null;
  const supportItems = summary?.support_detail?.length ? summary.support_detail : null;
  const applyItems = summary?.apply_method_detail?.length ? summary.apply_method_detail : null;
  const documentItems = summary?.documents_detail?.length ? summary.documents_detail : null;

  const rawTarget = asText(raw.addAplyQlfcCndCn);
  const rawSupport = asText(raw.plcySprtCn);
  const rawApply = asText(raw.plcyAplyMthdCn);
  const rawDocuments = asText(raw.sbmsnDcmntCn);

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/policies" className="text-sm text-mint hover:underline">
        ← 전체 정책 목록
      </Link>

      <DeadlineBanner startDate={policy.start_date} deadlineDate={policy.deadline_date} />

      <p className="mt-4 text-xs font-semibold" style={{ color: catColor }}>
        {CATEGORY_ICON[policy.category] ?? ''} {CATEGORY_LABEL[policy.category] ?? policy.category}
        {policy.org_name ? ` · ${policy.org_name}` : ''}
      </p>
      <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{policy.title}</h1>
      <p className="mt-2 text-xs text-ink-soft">
        {policy.start_date && policy.deadline_date
          ? `신청기간 ${formatMonthDay(policy.start_date)} ~ ${formatMonthDay(policy.deadline_date)}`
          : '상시모집'}
      </p>

      {summary ? (
        <section className="mt-6 rounded-2xl p-5" style={{ backgroundColor: COLORS.mintSoft }}>
          <h2 className="text-sm font-bold text-ink">정책 요약</h2>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-relaxed text-ink">
            <li>{summary.summary_intro}</li>
            <li>{summary.summary_support}</li>
            <li>{summary.summary_apply}</li>
          </ul>
        </section>
      ) : (
        <p className="mt-6 text-sm leading-relaxed text-ink-soft">{policy.meta}</p>
      )}

      <DetailSection heading="지원대상" items={targetItems} fallbackText={rawTarget} />
      <DetailSection heading="지원내용" items={supportItems} fallbackText={rawSupport} />
      <DetailSection heading="신청방법" items={applyItems} fallbackText={rawApply} />
      <DetailSection heading="준비서류" items={documentItems} fallbackText={rawDocuments} />

      {officialUrl && (
        <section className="mt-10 rounded-xl bg-mint-soft p-4">
          <h2 className="text-sm font-bold text-ink">공식 링크</h2>
          <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-mint underline">
            공식 신청 페이지 바로가기
          </a>
        </section>
      )}

      <p className="mt-10 text-xs text-ink-soft">
        이 내용은 온통청년 오픈API 원문을{summary ? ' 사람이 직접 읽고 정리했어요' : ' 그대로 보여드려요'}. 정확한 최신
        정보는 {officialUrl ? '위 공식 링크에서' : '원문 발행 기관에서'} 다시 확인해주세요.
      </p>
    </div>
  );
}

function DetailSection({
  heading,
  items,
  fallbackText,
}: {
  heading: string;
  items: string[] | null;
  fallbackText: string | null;
}) {
  if (!items && !fallbackText) return null;
  return (
    <section className="mt-8">
      <h2 className="text-base font-bold text-ink">{heading}</h2>
      {items ? (
        <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-relaxed text-ink-soft">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-mint">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-soft">{fallbackText}</p>
      )}
    </section>
  );
}
