import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개 — Fit Me',
  description: 'Fit Me는 흩어진 청년정책 공고를 한곳에 모아 마감일과 지원 조건을 보여주는 서비스예요.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold text-ink">Fit Me 소개</h1>

      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-ink-soft">
        <p>
          Fit Me는 정부·지자체·공공기관이 각자 흩어진 곳에 올리는 청년정책 공고를 한곳에 모아,
          마감일과 지원 조건을 한눈에 보여드리는 서비스예요. 정책 하나하나를 사람이 직접 읽고
          정리해서, 원문만 봐서는 헷갈리는 신청 자격·방법·서류를 알기 쉽게 다듬어 전달해요.
        </p>
        <p>
          이 블로그는 그중 실제로 도움이 될 만한 정책을 골라 소개하는 공간이에요. 더 많은 정책을
          한눈에 비교하고 싶다면 홈 화면의 전체 목록도 함께 확인해보세요.
        </p>
        <p>
          현재 정책 데이터는 온통청년(youthcenter.go.kr) 오픈API를 기반으로 정리되며, 정확도를
          높이기 위해 원문을 직접 확인하는 과정을 거치고 있어요. 그럼에도 정보가 실제와 다를 수
          있으니, 신청 전에는 반드시 각 글에 안내된 공식 링크에서 최신 내용을 다시 확인해주세요.
        </p>
      </div>
    </div>
  );
}
