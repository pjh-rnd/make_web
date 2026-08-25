import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 — Fit Me',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold text-ink">개인정보처리방침</h1>
      <p className="mt-2 text-xs text-ink-soft">시행일자: 2026년 8월 25일</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="mb-2 text-base font-bold text-ink">1. 수집하는 개인정보</h2>
          <p>
            Fit Me 웹사이트(이하 &quot;서비스&quot;)는 별도의 회원가입·로그인 기능이 없으며, 정책
            정보 열람을 위해 이용자로부터 이름·이메일 등 개인정보를 직접 수집하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-ink">2. 쿠키 및 방문 통계</h2>
          <p>
            서비스 이용 현황을 파악하기 위해 Google Analytics 등 방문 통계 도구를 사용할 수
            있으며, 이 경우 브라우저 쿠키를 통해 접속 기기 정보, 방문 페이지, 체류 시간 등이
            비식별 형태로 수집될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-ink">3. 광고 서비스(Google AdSense)</h2>
          <p>
            서비스는 Google AdSense를 통해 광고를 게재할 수 있습니다. Google을 비롯한 제3자
            광고업체는 쿠키를 사용해 이용자의 이전 방문 정보를 바탕으로 광고를 게재할 수
            있습니다. 이용자는{' '}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mint underline"
            >
              Google 광고 설정
            </a>
            에서 맞춤형 광고를 비활성화할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-ink">4. 게재하는 정책 정보의 출처</h2>
          <p>
            서비스에 게재된 청년정책 정보는 온통청년(youthcenter.go.kr) 오픈API 등 공공데이터를
            바탕으로 정리한 것이며, 실제 신청 전 각 정책의 공식 링크에서 최신 정보를 다시
            확인하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-ink">5. 개인정보처리방침의 변경</h2>
          <p>
            서비스 운영 방식(회원 기능 추가 등)이 바뀌면 이 방침도 그에 맞춰 개정될 수 있으며,
            개정 시 이 페이지를 통해 안내합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
