// "/blog" 서브페이지용 콘텐츠 — moa-app(모바일 앱)의 Supabase policy_ai_summaries 테이블(사람이
// 직접 정책 원문을 읽고 쓴 요약, scripts/policyAiSummaries.js 참고)에 있는 사실관계(자격조건/
// 지원내용/신청방법)를 바탕으로, 블로그 글답게 문단으로 풀어 쓰고 사람의 코멘트를 더한 것.
// 2026-08-25: 처음엔 원본 데이터의 bullet 목록을 거의 그대로 옮겼었는데(사용자 피드백으로
// "결국 앱에서 쓴 내용 그대로네"라는 지적을 받음), 문단형 글 + 캐치한 소제목 + **하이라이트**
// 강조로 다시 씀. 사실관계 자체(숫자/날짜/조건)는 원본과 똑같이 유지 — 표현만 사람이 쓴 것처럼
// 풀어썼고 지어낸 정보는 없음.
export type BlogPost = {
  slug: string;
  title: string; // 검색 노출용 글 제목(SEO)
  hook: string; // 글 목록/상세 상단에 크게 보여줄 한 줄 후킹 문구
  categoryLabel: string;
  orgName: string;
  publishedDate: string; // 'YYYY-MM-DD' — 글이 이 배열에 추가된 날짜
  startDate: string | null;
  deadlineDate: string | null;
  intro: string;
  // 문단형 본문. heading은 눈에 띄는 소제목("누가 지원할까?" 스타일), paragraphs 안의 텍스트에
  // **이렇게** 감싼 부분은 lib/richText.tsx의 Highlighted 컴포넌트가 노란 하이라이트로 렌더링함.
  sections: { heading: string; paragraphs: string[] }[];
  sourceLinks: { label: string; url: string }[];
  // 2026-08-26: 공고 담당자가 직접 만든 카드뉴스형 이미지(썸네일 + 인포그래픽)를 받은 글에만 채움.
  // thumbnail은 블로그 목록 카드 + 상세 페이지 상단에 쓰고, images는 아래 position에 맞춰 삽입됨.
  // 둘 다 없으면 기존처럼 lib/illustrations.tsx의 이모지 삽화(CategoryIllustration)로 대체됨.
  //
  // position이 { section, paragraph }면 그 문단 바로 "위"에 삽입됨(사용자 피드백: "사진 내용이랑
  // 같은 내용이 들어가있는 글 위에 사진을 넣어줘" — 섹션 뒤에 뭉텅이로 붙이지 말고, 실제로 그
  // 내용을 담고 있는 문단 바로 위에 정확히 붙일 것). position이 'end'면 마지막 섹션 뒤,
  // 공식 링크 박스 앞에 삽입됨(예: 전체 내용을 한눈에 정리한 최종 요약 카드).
  thumbnail?: string;
  images?: { src: string; alt: string; position: { section: number; paragraph: number } | 'end' }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'national-scholarship-work-study',
    title: '국가근로장학금 신청 방법과 자격 조건 (2026년 2학기)',
    hook: '학비도 벌고 스펙도 쌓고 — 일하면서 받는 장학금',
    categoryLabel: '교육',
    orgName: '한국장학재단',
    publishedDate: '2026-08-25',
    startDate: '2026-08-12',
    deadlineDate: '2026-09-09',
    intro:
      '대학생이라면 한 번쯤 들어봤을 근로장학금, 2026년 2학기 2차 모집이 시작됐어요. 그냥 알바보다 훨씬 나은 이유를 정리해봤어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '기본 조건은 딱 두 가지예요. 국내 대학에 재학 중인 대한민국 국적자여야 하고, **직전 학기 성적이 100점 만점에 70점(C학점) 이상**이어야 해요. 여기에 **학자금 지원구간이 9구간 이하**여야 신청할 수 있어요 — 소득 기준으로 대부분의 학생이 해당되는 구간이라고 보면 돼요.',
          '다만 예외도 있어요. 장애가 있거나 자립준비청년(옛 보호종료아동)이라면 성적 기준이 면제될 수 있고, 학부모의 실직·폐업 같은 급한 경제 위기를 겪고 있거나 봉사·취업연계형으로 신청하는 학생도 소득구간 제한 없이 지원 가능해요.',
        ],
      },
      {
        heading: '얼마나 받을 수 있어? 지원 혜택 총정리!',
        paragraphs: [
          '시급은 근로 형태에 따라 달라요. 학교 안에서 일하는 **교내근로는 시급 10,320원**, 학교 밖 기관에서 일하는 **교외근로는 시급 12,790원**이에요. 장애대학생이 봉사유형으로 참여하면 교외근로와 같은 시급이 적용돼요.',
          '단순히 용돈벌이를 넘어서, 이력서에 쓸 수 있는 실무 경험까지 챙길 수 있다는 게 근로장학금의 진짜 매력이에요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '학생 신청은 **2026년 8월 12일(수) 오전 9시부터 9월 9일(수) 오후 6시까지**예요. 주말·공휴일 상관없이 24시간 신청 가능하지만, 마감일 당일엔 안 되니 미리 해두는 게 안전해요.',
          '한국장학재단 누리집(www.kosaf.go.kr)이나 모바일 앱에서 본인이 직접 신청하고, 전자서명 수단 하나는 미리 준비해두는 게 좋아요. 신청 후 2~3일 뒤 제출 서류가 뜨는데, 이것도 **9월 16일(수)까지** 온라인으로 제출하면 끝이에요. 궁금한 점은 한국장학재단 상담센터(1599-2290)로 문의하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '당장 다음 학기 등록금이나 월세가 걱정되는 자취생, 알바 대신 커리어에 도움 되는 경험을 원하는 3~4학년, 성적은 자신 있는데 소득분위 때문에 국가장학금만으로는 부족했던 학생이라면 이 근로장학금이 딱이에요. 특히 학교 안에서 하는 교내근로는 통학 시간까지 아낄 수 있어서 은근히 시간 활용 면에서도 이득이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 직전 학기 성적 70점 이상인가요? ✅ 학자금 지원구간 9구간 이하인가요(또는 예외 대상인가요)? ✅ 전자서명 수단을 준비했나요? ✅ 9월 9일 전에 신청을 마칠 계획을 세웠나요? 이 네 가지만 체크하면 신청 준비 끝이에요.',
        ],
      },
    ],
    sourceLinks: [{ label: '한국장학재단 신청 바로가기', url: 'https://www.kosaf.go.kr/' }],
    thumbnail: '/blog/national-scholarship-work-study/thumbnail.png',
    // 2026-08-26: 세 번째 버전 — 사용자가 신청기간/신청방법(5단계)/최종정리 카드로 다시 제작해서
    // 교체함. 이전 두 버전(손그림 SVG, 첫 AI 카드뉴스에서 텍스트 깨짐)보다 훨씬 깔끔함.
    // 배치도 섹션 뒤 뭉텅이가 아니라, 실제로 그 내용을 말하는 문단 바로 위로 정확히 맞춤(사용자 피드백).
    images: [
      {
        src: '/blog/national-scholarship-work-study/info-period.png',
        alt: '국가근로장학금 2차 신청기간 (8.12 시작 ~ 9.9 마감)',
        position: { section: 2, paragraph: 0 }, // "학생 신청은 8/12~9/9예요" 문단 바로 위
      },
      {
        src: '/blog/national-scholarship-work-study/info-steps.png',
        alt: '국가근로장학금 신청 5단계: 재단 접속부터 서류 제출까지',
        position: { section: 2, paragraph: 1 }, // "한국장학재단 누리집에서 신청하고..." 문단 바로 위
      },
      {
        src: '/blog/national-scholarship-work-study/info-final-summary.png',
        alt: '국가근로장학금 지원자격·시급·신청기간·서류제출 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'national-employment-support-program',
    title: '국민취업지원제도, 청년 구직촉진수당 얼마나 받을 수 있을까',
    hook: '일도 못 구했고 돈도 급한데 — 나라가 두 가지 다 챙겨줘요',
    categoryLabel: '취업',
    orgName: '고용노동부 · 전국 고용센터',
    publishedDate: '2026-08-25',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      "'한국형 실업부조'라고 불리는 국민취업지원제도, 이름은 낯설어도 내용을 보면 꽤 실속 있는 제도예요. 취업 준비생이라면 꼭 알아둘 만해요.",
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '대상은 넓어요. **만 15세부터 69세까지**의 저소득 구직자, 청년, 중장년층 등 취업이 어려운 사람이라면 누구나 신청해볼 수 있어요. 다만 소득·재산·최근 취업 경험에 따라 받을 수 있는 유형(Ⅰ유형/Ⅱ유형)이 갈려요.',
        ],
      },
      {
        heading: '지원 혜택 총정리! 유형별로 이렇게 달라요',
        paragraphs: [
          '두 유형 다 공통으로 심층상담, 직업훈련, 일자리 정보 제공 같은 취업지원서비스를 받아요. 여기에 더해 **Ⅰ유형은 취업활동계획을 이행하면 월 60만원에서 100만원을 6개월간** 받을 수 있어요 — 18세 이하나 70세 이상, 중증장애인 같은 부양가족이 있으면 1인당 10만원씩 더 얹어줘요.',
          '**Ⅱ유형은 취업활동비용으로 최대 35만원**을 지원받고요, 여기에 중위소득 60% 이하인 사람 등 특정 계층이라면 취업에 성공했을 때 **최대 150만원의 취업성공수당**까지 별도로 받을 수 있어요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '오프라인으로는 거주지 관할 고용센터에 직접 방문하면 되고, 온라인이라면 고용24 홈페이지(work24.go.kr)에서 [취업지원] → [국민취업지원제도] 메뉴로 들어가 신청하면 돼요. 정해진 접수 기간 없이 **연중 상시로 신청**할 수 있다는 것도 장점이에요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '졸업은 했는데 아직 첫 직장을 못 구한 취준생, 이직을 준비하며 소득이 끊긴 청년, 아르바이트만 전전하다 제대로 된 커리어를 시작하고 싶은 사람이라면 눈여겨볼 만해요. 특히 부양가족이 있다면 Ⅰ유형에서 추가 수당까지 챙길 수 있으니 가족 구성도 한 번 확인해보세요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 15~69세인가요? ✅ 최근 취업 경험과 소득·재산 기준을 확인했나요(Ⅰ유형/Ⅱ유형 구분)? ✅ 부양가족이 있다면 증빙을 챙겼나요? ✅ 가까운 고용센터 위치를 알아뒀나요? 헷갈리면 방문 상담부터 받아보는 것도 방법이에요.',
        ],
      },
    ],
    sourceLinks: [{ label: '고용24에서 신청하기', url: 'https://www.work24.go.kr/cm/main.do' }],
    thumbnail: '/blog/national-employment-support-program/thumbnail.png',
    images: [
      {
        src: '/blog/national-employment-support-program/info-period.png',
        alt: '국민취업지원제도 신청기간 (연중 상시, 1.1~12.31)',
        position: { section: 0, paragraph: 0 }, // 대상 소개 문단 위 — 정해진 기간 없이 상시 신청 가능하다는 맥락
      },
      {
        src: '/blog/national-employment-support-program/info-steps.png',
        alt: '국민취업지원제도 신청 5단계: 유형 확인부터 수당 받기까지',
        position: { section: 2, paragraph: 0 }, // "고용24에서 신청하면 돼요" 문단 위
      },
      {
        src: '/blog/national-employment-support-program/info-final-summary.png',
        alt: '국민취업지원제도 대상·유형별 수당·신청방법 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'jeju-1000-won-breakfast',
    title: "제주 대학생 '천원의 아침밥', 어느 학교에서 어떻게 먹을 수 있나",
    hook: '커피 한 잔 값도 안 되는 돈으로 든든한 아침을',
    categoryLabel: '복지',
    orgName: '제주특별자치도',
    publishedDate: '2026-08-25',
    startDate: '2026-04-01',
    deadlineDate: '2026-12-31',
    intro:
      '아침 챙겨 먹기 힘든 대학생이라면 반가운 소식이에요. 제주 3개 대학 학생이라면 단돈 천원에 아침밥을 먹을 수 있어요.',
    sections: [
      {
        heading: '누가 이용할 수 있을까?',
        paragraphs: [
          '**제주대학교, 제주한라대학교, 제주관광대학교** 재학생이면 누구나 이용할 수 있어요. 따로 신청서를 내는 게 아니라, 학생증 등으로 본인 인증만 하면 바로 이용 가능한 방식이라 문턱이 낮아요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '도내 대학 구내식당에서 **단돈 1,000원에 아침 식사**를 해결할 수 있어요. 고물가 시대에 학생들의 아침 결식률을 낮추고 건강도 챙기자는 취지로, 시가 학교에 운영비를 지원하는 방식이에요.',
        ],
      },
      {
        heading: '이용 방법이 학교마다 조금씩 달라요',
        paragraphs: [
          '제주대는 월요일부터 토요일까지(일요일·공휴일 제외) 학기 중엔 오전 7시 30분~9시 20분, 방학 중엔 8시~9시 30분에 학생생활관 1호관·6호관 식당과 학교 내 지정 편의점에서 이용할 수 있어요.',
          '한라대는 월~금 학기 중 오전 8시~9시 30분, 관광대는 월~목 학기 중 오전 8시~11시에 각 학생식당에서 운영해요. 어디든 **학생 인증**만 하면 키오스크나 수기대장으로 바로 이용 가능해요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '아침엔 늘 시간이 없어서 굶고 등교하는 자취생, 편의점 삼각김밥으로 아침을 때우던 학생이라면 이 제도가 반가울 거예요. 천원으로 균형 잡힌 식사를 할 수 있으니 장기적으로 건강도, 지갑 사정도 챙길 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 제주대·한라대·관광대 재학생인가요? ✅ 학생증을 챙겼나요? ✅ 다니는 학교의 운영 요일·시간을 확인했나요? 이 세 가지만 확인하면 내일 아침부터 바로 이용할 수 있어요.',
        ],
      },
    ],
    sourceLinks: [{ label: '제주특별자치도 홈페이지', url: 'https://www.jeju.go.kr/index.htm' }],
    thumbnail: '/blog/jeju-1000-won-breakfast/thumbnail.png',
    // 2026-08-26: 신청기간/이용방법(5단계)/최종정리 카드로 교체 — 배치도 실제 내용을 말하는
    // 문단 바로 위로 맞춤(사용자 피드백: 섹션 뒤에 뭉텅이로 붙이지 말 것).
    images: [
      {
        src: '/blog/jeju-1000-won-breakfast/info-period.png',
        alt: '제주 천원의 아침밥 운영기간 (4.1 ~ 12.31)',
        position: { section: 0, paragraph: 0 }, // "제주대·한라대·관광대 재학생이면..." 문단 위
      },
      {
        src: '/blog/jeju-1000-won-breakfast/info-steps.png',
        alt: '제주 천원의 아침밥 이용방법 5단계: 재학생 확인부터 결제까지',
        position: { section: 2, paragraph: 0 }, // "제주대는 월~토..." 학교별 운영시간 문단 위
      },
      {
        src: '/blog/jeju-1000-won-breakfast/info-final-summary.png',
        alt: '제주 천원의 아침밥 대상·가격·운영기간·학교별 시간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'busan-student-loan-interest-support',
    title: '부산 대학생 학자금 대출이자 지원, 대상부터 신청방법까지',
    hook: '학자금 대출 이자, 낸 만큼 원금이 줄어들어요',
    categoryLabel: '교육',
    orgName: '부산광역시 청년산학국 지산학협력과',
    publishedDate: '2026-08-25',
    startDate: '2026-07-06',
    deadlineDate: '2026-08-28',
    intro:
      '학자금 대출 이자 갚느라 부담스러웠다면 주목하세요. 부산시가 대학(원)생과 졸업생의 이자 부담을 대신 갚아주는 사업이에요. 최대 2,000명까지 지원하니 대상이라면 서둘러 챙겨보세요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '크게 두 부류예요. **부산지역 소재 대학교에 재학 또는 휴학 중인 대학(원)생**이거나, **부산지역 대학교를 졸업한 지 2년 이내면서 아직 취업하지 못한 부산 거주 졸업생**이면 신청할 수 있어요.',
          '선착순은 아니지만 총 지원 인원이 **최대 2,000명**으로 정해져 있어서, 대상이라면 미루지 않는 게 좋아요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**2025년 7월부터 2026년 6월까지 발생한 학자금대출 이자 금액만큼**을 원금 상환으로 지원해줘요. 즉 이자 낸 만큼 원금이 그만큼 줄어드는 효과라고 보면 돼요.',
          '지원금은 따로 통장으로 들어오는 게 아니라, **12월 중 대출 원리금에서 바로 차감**되는 방식이에요. 별도로 환급을 신청하거나 기다릴 필요 없이 자동으로 반영돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청 기간은 **2026년 7월 6일부터 8월 28일까지**예요. **부산청년플랫폼에서 온라인으로만 신청**할 수 있어요.',
          '재학·휴학생은 **재학증명서나 휴학증명서**를, 졸업생은 **졸업증명서 등 3종 서류**를 함께 준비해서 신청 기간 안에 제출하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '학자금 대출 갚느라 매달 이자만으로도 부담됐던 부산 대학생·대학원생, 졸업했지만 아직 자리를 못 잡은 사회초년생이라면 꼭 확인해봐야 할 제도예요. 특히 이자 부담이 누적돼서 대출 자체가 부담스러워진 경우라면 원금이 줄어드는 효과를 체감할 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 부산지역 대학 재학·휴학 중이거나 졸업 2년 이내 미취업 부산 거주자인가요? ✅ 2025년 7월~2026년 6월 사이 발생한 대출이자가 있나요? ✅ 재학·휴학증명서(또는 졸업증명서 등 3종)를 준비했나요? ✅ 8월 28일 전까지 부산청년플랫폼에서 신청을 마칠 수 있나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '부산청년플랫폼', url: 'https://young.busan.go.kr/index.nm?menuCd=49' },
      { label: '한국장학재단', url: 'https://www.kosaf.go.kr' },
    ],
    thumbnail: '/blog/busan-student-loan-interest-support/thumbnail.png',
    images: [
      {
        src: '/blog/busan-student-loan-interest-support/info-period.png',
        alt: '부산 학자금 대출이자 지원 신청기간 (7.6 ~ 8.28)',
        position: { section: 2, paragraph: 0 }, // "신청 기간은 7월 6일부터 8월 28일까지예요" 문단 위
      },
      {
        src: '/blog/busan-student-loan-interest-support/info-steps.png',
        alt: '부산 학자금 대출이자 지원 신청 5단계: 자격 확인부터 원금 차감까지',
        position: { section: 2, paragraph: 1 }, // "재학·휴학생은 서류를..." 문단 위
      },
      {
        src: '/blog/busan-student-loan-interest-support/info-final-summary.png',
        alt: '부산 학자금 대출이자 지원 대상·지원내용·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'gwangju-youth-rent-support',
    title: '청년월세지원 한눈에 정리 — 월 20만원, 최장 24개월',
    hook: '매달 나가는 월세, 최대 20만원씩 24개월 지원받으세요',
    categoryLabel: '주거',
    orgName: '복지로 · 지자체 공통 사업',
    publishedDate: '2026-08-25',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '고물가·고금리로 힘든 요즘, 월세 부담을 덜어주는 전국 단위 제도가 있어요. 조건만 맞으면 꽤 오랫동안 도움받을 수 있는 제도라 자세히 정리해봤어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '기본 대상은 **만 19세에서 34세**까지의 청년이에요. 이 제도는 복지로를 통해 전국 지자체가 공통으로 운영하는 중앙부처 복지사업이라, 사는 곳과 상관없이 같은 방식으로 신청할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**월 최대 20만원**의 임대료를 **최장 24개월**까지 지원받을 수 있어요. 다만 평생 딱 한 번(생애 1회)만 받을 수 있고, 임차보증금이나 관리비는 지원 대상에서 빠진다는 점은 기억해두세요. 이미 주거급여를 받고 있다면 그 금액만큼 차감해서 지원돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '온라인은 복지로 홈페이지(또는 앱)에서 [중앙부처 복지사업] → 청년월세지원을 찾아 신청하면 되고, 오프라인은 실제 거주지(월세 임차지) 관할 행정복지센터를 방문하면 돼요.',
          '접수 시기가 정해져 있어요. **매년 3~5월에 신청**받고(2026년은 3월 30일~5월 29일이었어요), 3~8월에 소득 심사를 거쳐 9월부터 5월분까지 소급해서 지급하는 방식이에요. 다음 접수 시기를 놓치지 않도록 신청서, 소득·재산 신고서, 확정일자 찍힌 임대차계약서, 월세이체 증빙, 통장사본, 본인과 부모·배우자의 가족관계증명서(상세)를 미리 챙겨두면 좋아요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '월급의 상당 부분이 월세로 나가는 자취 청년, 독립은 했지만 아직 소득이 안정적이지 않은 사회초년생이라면 이 제도부터 챙겨보세요. 24개월이나 지원되니 한 번 받아두면 꽤 오랫동안 숨통이 트일 거예요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 19~34세인가요? ✅ 예전에 이 제도로 지원받은 적 없나요(생애 1회)? ✅ 확정일자 찍힌 임대차계약서가 있나요? ✅ 다음 접수 시기(보통 3~5월)를 캘린더에 표시해뒀나요? 접수 시기를 놓치면 1년을 더 기다려야 하니 미리 챙겨두세요.',
        ],
      },
    ],
    sourceLinks: [{ label: '복지로에서 신청하기', url: 'https://www.bokjiro.go.kr/' }],
    thumbnail: '/blog/gwangju-youth-rent-support/thumbnail.png',
    images: [
      {
        src: '/blog/gwangju-youth-rent-support/info-steps.png',
        alt: '청년월세지원 신청 5단계: 자격 확인부터 소급 지급까지',
        position: { section: 2, paragraph: 0 }, // "온라인은 복지로에서..." 문단 위
      },
      {
        src: '/blog/gwangju-youth-rent-support/info-period.png',
        alt: '청년월세지원 실제 접수 시기 (매년 3~5월, 놓치면 1년 대기)',
        position: { section: 2, paragraph: 1 }, // "접수 시기가 정해져 있어요. 매년 3~5월..." 문단 위
      },
      {
        src: '/blog/gwangju-youth-rent-support/info-final-summary.png',
        alt: '청년월세지원 대상·금액·기간·접수시기 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'k-startup-awards',
    title: "'올해의 K-스타트업'(舊 도전! K-스타트업) 창업경진대회 소개",
    hook: '아이디어 하나로 대통령상까지? 창업가라면 도전해볼 만해요',
    categoryLabel: '취업',
    orgName: '중소벤처기업부',
    publishedDate: '2026-08-25',
    startDate: '2026-03-27',
    deadlineDate: '2026-08-31',
    intro:
      '창업 아이템은 있는데 어디서부터 알려야 할지 막막하다면, 이 대회가 좋은 출발점이 될 수 있어요. 중소벤처기업부가 여는 범부처 창업경진대회를 소개할게요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '흥미로운 점은, 원문에 나이나 소득 같은 **별도의 자격 제한이 명시돼 있지 않다**는 거예요. 유망한 창업 아이템을 가진 창업자나 팀이라면 폭넓게 도전해볼 수 있는 대회로 보여요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '상금과 함께 **대통령상, 국무총리상, 장관·청장상** 같은 굵직한 상이 걸려있어요. 단순히 상 받고 끝나는 게 아니라 **정부지원사업으로 후속 연계**될 수 있다는 게 진짜 메리트예요 — 창업 초기 단계에서 이런 이력 하나는 다른 지원사업에 지원할 때도 든든한 스펙이 돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '접수 마감은 **2026년 8월 31일**이에요. 다만 아쉽게도 원문에 구체적인 신청 방법까지는 안내돼 있지 않았어요 — 관심 있다면 아래 K-스타트업 공식 링크에서 최신 공고문을 직접 확인해보는 걸 추천해요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '창업 아이템은 있는데 아직 이렇다 할 이력이 없는 예비 창업자, 이미 초기 창업은 했지만 다음 단계로 도약할 계기가 필요한 팀이라면 도전해볼 만해요. 수상 경력 하나가 다른 정부지원사업 심사에서 큰 힘이 되는 경우가 많아요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 창업 아이템을 한 장짜리 요약으로 설명할 수 있나요? ✅ 팀 구성이 정리돼 있나요? ✅ 8월 31일 마감 전에 K-스타트업 공식 공고문을 확인했나요? 준비가 됐다면 지금 바로 링크를 눌러 최신 공고를 확인해보세요.',
        ],
      },
    ],
    sourceLinks: [
      {
        label: 'K-스타트업 공고 바로가기',
        url: 'https://www.k-startup.go.kr/web/contents/bizpbanc-ongoing.do?pbancClssCd=PBC010&schStr=%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C&schM=view&pbancSn=176910',
      },
    ],
    thumbnail: '/blog/k-startup-awards/thumbnail.png',
    // 2026-08-26: 신청방법 카드는 예선리그/본선 등 원문에 없는 진행 절차 디테일을 담고 있고,
    // 우리 글은 "구체적인 신청 방법은 안내돼 있지 않다"고 써놨음 — 그 문장 바로 옆에 두면
    // 모순돼 보여서 이런 분이라면 섹션 앞으로 옮김(부산 학자금대출 글과 같은 처리).
    images: [
      {
        src: '/blog/k-startup-awards/info-period.png',
        alt: 'K-스타트업 2026 접수기간 (3.27 ~ 8.31)',
        position: { section: 2, paragraph: 0 }, // "접수 마감은 2026년 8월 31일이에요" 문단 위
      },
      {
        src: '/blog/k-startup-awards/info-steps.png',
        alt: 'K-스타트업 2026 신청방법 5단계: 자격 확인부터 본선·왕중왕전까지',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/k-startup-awards/info-final-summary.png',
        alt: 'K-스타트업 2026 지원자격·시상·상금·접수기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'wonju-interview-suit-rental',
    title: '원주시 청년 면접 정장 무료 대여, 신청 방법 정리',
    hook: '면접 잡혔는데 정장이 없다면? 원주시가 빌려드려요',
    categoryLabel: '취업',
    orgName: '강원특별자치도 원주시',
    publishedDate: '2026-08-25',
    startDate: '2026-02-02',
    deadlineDate: '2026-11-30',
    intro:
      '취업 준비하다 보면 면접 정장 하나 사기도 부담스러울 때가 있죠. 원주시는 그런 청년들을 위해 정장을 무료로 빌려주는 사업을 운영하고 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**원주시에 1개월 이상 거주 중인 만 18~39세 청년**이면서, **실제로 면접 일정이 잡혀 있는 사람**이 대상이에요. 미리 빌려두는 게 아니라 면접이 확정된 상태여야 한다는 점을 기억해두세요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '면접 정장 세트를 **3박 4일간 무료로 대여**해주는데, 택배로 받고 반납까지 가능해서 방문이 어려워도 이용할 수 있어요. **1인당 연간 최대 3회**까지 지원받을 수 있어서, 여러 곳에 면접을 보러 다니는 취준생에게 특히 유용해요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청 기간은 **2026년 2월 2일부터 11월 30일까지**인데, 예산이 소진되면 그 전에 조기 마감될 수 있으니 여유 있게 신청하는 게 좋아요.',
          '방문 신청은 청년라운지 이스트(미래로 1, 2층) 또는 웨스트(서원대로 156)에서 가능하고(평일 오전 9시~오후 9시, 토요일 오전 10시~오후 6시), 온라인은 원주시 청년지원센터 홈페이지에서 프로그램 신청 메뉴로 들어가면 돼요. 신청일 기준 1개월 이내 발급한 주민등록초본, 신청서, 개인정보 동의서, 면접 일정 증빙자료(면접공고·합격서류 등)를 챙겨가면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '면접은 잡혔는데 정장 살 돈까지는 부담스러운 취준생, 여러 회사에 동시에 지원해서 면접이 몰린 사람이라면 특히 유용해요. 연 3회까지 되니 한 벌 사는 것보다 훨씬 경제적이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 원주시에 1개월 이상 거주 중인가요? ✅ 실제로 잡힌 면접 일정이 있나요? ✅ 면접 증빙서류(면접공고·합격서류 등)를 챙겼나요? ✅ 3박 4일 대여 기간 안에 면접이 있는지 일정을 맞춰봤나요? 택배로도 받을 수 있으니 방문이 부담스러워도 걱정 마세요.',
        ],
      },
    ],
    sourceLinks: [
      { label: '원주시 프로그램 신청', url: 'https://www.wonju.go.kr/wjyouth/viewTnWjyouthProgrmU.do?progrmNo=52&key=5942' },
    ],
    thumbnail: '/blog/wonju-interview-suit-rental/thumbnail.png',
    images: [
      {
        src: '/blog/wonju-interview-suit-rental/info-period.png',
        alt: '원주 청년 면접정장 무료대여 신청기간 (2.2 ~ 11.30)',
        position: { section: 2, paragraph: 0 }, // "신청 기간은 2026년 2월 2일부터..." 문단 위
      },
      {
        src: '/blog/wonju-interview-suit-rental/info-steps.png',
        alt: '면접정장 대여 신청방법 5단계: 자격 확인부터 3박 4일 대여까지',
        position: { section: 2, paragraph: 1 }, // "방문 신청은 청년라운지에서..." 문단 위
      },
      {
        src: '/blog/wonju-interview-suit-rental/info-final-summary.png',
        alt: '면접정장 무료대여 대상·지원내용·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'asan-young-rich-financial-counseling',
    title: "아산시 청년 재무상담 「영앤리치」, 1:1 재무 컨설팅 받는 법",
    hook: '재테크 어디서부터 시작할지 모르겠다면, 전문가랑 1:1로 상담받아요',
    categoryLabel: '교육',
    orgName: '아산시 일자리경제과',
    publishedDate: '2026-08-25',
    startDate: '2026-02-01',
    deadlineDate: '2026-11-30',
    intro:
      "돈 관리, 막상 하려면 뭐부터 해야 할지 막막하죠. 아산시는 청년을 위한 무료 1:1 재무상담 서비스를 운영하고 있어요. 이름부터 '영앤리치'라 눈길이 가는 사업이에요.",
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**아산시를 생활권으로 하는 만 18~39세 청년**이면 신청할 수 있어요. 거주지가 아산이 아니어도 통학·통근처럼 생활권 기준으로 인정되니, 조건을 너무 좁게 생각하지 않아도 돼요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '전문가와 **1:1 맞춤형 재무상담**을 받을 수 있는데, **1인당 최대 2회, 회당 90분**씩 진행돼요. 단순히 저축 팁을 알려주는 수준이 아니라 소득·지출 관리부터 재무 진단까지 체계적으로 봐준다는 점이 좋아요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청서와 증빙서류(등본·초본·학생증 사본·재직증명 중 택1)를 이메일로 제출하면 되는데, **선착순 모집**이라 마음먹었다면 미루지 말고 바로 신청하는 걸 추천해요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '첫 월급을 받았는데 어떻게 굴려야 할지 막막한 사회초년생, 학자금 대출이랑 생활비 사이에서 저축 계획을 못 세우던 대학생이라면 딱이에요. 유튜브로 재테크 정보를 찾아보는 것보다 내 상황에 맞는 1:1 상담이 훨씬 실질적이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 아산시가 생활권(거주·통학·통근)인가요? ✅ 증빙서류(등본·초본·학생증·재직증명 중 하나)를 준비했나요? ✅ 상담받고 싶은 주제(저축, 지출관리 등)를 미리 정리해뒀나요? 선착순이니 마음먹었으면 바로 이메일부터 보내세요.',
        ],
      },
    ],
    sourceLinks: [
      { label: '충남청년포털 공고 보기', url: 'https://youth.chungnam.go.kr/web/main/customSupp/M040-06/view?bizId=A20260402LC000000000003165' },
    ],
    thumbnail: '/blog/asan-young-rich-financial-counseling/thumbnail.png',
    images: [
      {
        src: '/blog/asan-young-rich-financial-counseling/info-period.png',
        alt: '아산 청년 재무상담 영앤리치 신청기간 (2.1 ~ 11.30, 선착순)',
        position: { section: 0, paragraph: 0 },
      },
      {
        src: '/blog/asan-young-rich-financial-counseling/info-steps.png',
        alt: '영앤리치 신청방법 5단계: 자격 확인부터 1:1 상담까지',
        position: { section: 2, paragraph: 0 }, // "신청서와 증빙서류를 이메일로..." 문단 위
      },
      {
        src: '/blog/asan-young-rich-financial-counseling/info-final-summary.png',
        alt: '영앤리치 대상·상담내용·신청기간·증빙서류 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'yeosu-book-purchase-support',
    title: '여수시 청년 도서구입비 지원, 책값 절반을 돌려받는 방법',
    hook: '읽고 싶은 책, 절반 가격에 살 수 있어요',
    categoryLabel: '복지',
    orgName: '여수시 문화관광체육국',
    publishedDate: '2026-08-25',
    startDate: '2026-02-01',
    deadlineDate: '2026-11-30',
    intro:
      '자기계발서든 소설이든, 책값 부담 없이 마음껏 읽고 싶은 청년이라면 반가울 소식이에요. 여수시가 도서구입비의 절반을 지원해주는 사업을 운영하고 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**도서대출회원증을 갖고 있는 만 18~45세 청년**이면 신청할 수 있어요. 다른 청년정책보다 상한 연령이 45세로 넉넉한 편이라, 다른 정책에서 나이 때문에 아쉬웠던 분들도 눈여겨볼 만해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**도서구입비의 50%를, 1인당 최대 10만원까지** 지원받을 수 있어요. 취업·창업·자격증 관련 도서는 물론 교양·문학 도서까지 폭넓게 인정되고, 여수시 지역서점 인증제에 참여하는 서점에서 구입해야 지원 대상이 돼요 — 지역 서점을 살리자는 취지도 함께 담겨 있는 사업이에요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '여수시립도서관 누리집(yslib.yeosu.go.kr)에서 [온라인서비스] → [청년도서구입비 지원] → [신청하기]로 들어가면 돼요. **횟수 제한 없이 분할 신청도 가능**해서, 책 살 때마다 나눠서 신청해도 되고 최대 한도(10만원) 안에서 자유롭게 쓸 수 있어요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '자기계발서 사려다 가격 보고 망설였던 취준생, 소설 한 권 사는 것도 고민되는 자취 청년이라면 이 제도로 부담을 절반으로 줄일 수 있어요. 여러 번 나눠 신청할 수 있으니 한 번에 큰돈 안 들이고 조금씩 책을 늘려가도 돼요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 도서대출회원증이 있나요(없다면 여수시립도서관에서 먼저 만들면 돼요)? ✅ 여수시 지역서점 인증제 참여 서점인지 확인했나요? ✅ 영수증을 잘 챙겨뒀나요? 온라인 서점보다 지역서점을 이용해야 지원받을 수 있다는 점, 꼭 기억하세요.',
        ],
      },
    ],
    sourceLinks: [{ label: '여수시립도서관 신청 바로가기', url: 'https://yslib.yeosu.go.kr/youth' }],
    thumbnail: '/blog/yeosu-book-purchase-support/thumbnail.png',
    images: [
      {
        src: '/blog/yeosu-book-purchase-support/info-period.png',
        alt: '여수 청년 도서구입비 지원 신청기간 (2.1 ~ 11.30)',
        position: { section: 0, paragraph: 0 },
      },
      {
        src: '/blog/yeosu-book-purchase-support/info-steps.png',
        alt: '도서구입비 지원 신청방법 5단계: 회원증 발급부터 50% 지원까지',
        position: { section: 2, paragraph: 0 }, // "여수시립도서관 누리집에서..." 문단 위
      },
      {
        src: '/blog/yeosu-book-purchase-support/info-final-summary.png',
        alt: '여수 도서구입비 지원 대상·금액·인정도서·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'wonju-study-cafe-support',
    title: '원주시 스터디카페·독서실 이용료 지원, 취준생이라면 꼭 확인',
    hook: '이미 결제한 스터디카페비, 실비로 돌려받으세요',
    categoryLabel: '취업',
    orgName: '강원특별자치도 원주시',
    publishedDate: '2026-08-25',
    startDate: '2026-02-02',
    deadlineDate: '2026-11-30',
    intro:
      '취업 준비하며 스터디카페나 독서실에서 살다시피 하는 분들 많죠. 원주시는 이미 낸 이용료를 나중에 돌려주는 방식으로 취준생의 부담을 덜어주고 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**원주시에 1개월 이상 거주 중인 만 18~39세**로, **대학교 3학년을 마친 휴학생, 4학년 재학생, 또는 취업을 준비 중인 일반 청년**이면 신청할 수 있어요. 이미 취업 준비 단계에 들어선 청년을 타깃으로 한 사업이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**2026년에 결제한 관내 스터디카페·독서실 이용료**를 **1인당 연 1회, 최대 10만원까지 실비**로 돌려받을 수 있어요. 미리 신청하고 이용하는 게 아니라, **이미 낸 돈을 나중에 증빙하고 돌려받는 방식**이라 영수증이나 이용 내역을 꼭 챙겨둬야 해요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청 기간은 **2026년 2월 2일부터 11월 30일까지**이고, 예산 소진 시 조기 마감될 수 있어요. 방문은 청년라운지 이스트 또는 웨스트에서, 온라인은 원주시 청년지원센터 홈페이지에서 가능해요.',
          '주민등록초본, 신청서, 개인정보 동의서 외에도 지원 대상 증명 서류(재학·휴학증명 등), 건강보험자격득실확인서, 사업자등록사실여부 증명서, 결제 영수증 같은 이용 증빙서류와 본인 명의 통장사본까지 챙겨야 해서, 서류가 좀 많은 편이니 미리 준비해두는 게 좋아요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '매달 스터디카페 결제하면서 통장 잔고가 줄어드는 게 눈에 보이던 취준생이라면 이 제도를 놓치지 마세요. 이미 다니고 있는 곳이 있다면 영수증만 잘 챙기면 되니 지금 당장 서랍부터 뒤져보세요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 원주시에 1개월 이상 거주 중인가요? ✅ 대학 3학년 수료 휴학생·4학년 재학생·취준생 중 하나에 해당하나요? ✅ 2026년 결제 영수증이나 이용 내역을 보관해뒀나요? ✅ 예산 소진 전에 서둘러 신청할 계획인가요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '원주시 프로그램 신청', url: 'https://www.wonju.go.kr/wjyouth/viewTnWjyouthProgrmU.do?progrmNo=53&key=5942' },
    ],
    thumbnail: '/blog/wonju-study-cafe-support/thumbnail.png',
    images: [
      {
        src: '/blog/wonju-study-cafe-support/info-period.png',
        alt: '원주 스터디카페·독서실 이용료 지원 신청기간 (2.2 ~ 11.30)',
        position: { section: 2, paragraph: 0 }, // "신청 기간은 2026년 2월 2일부터..." 문단 위
      },
      {
        src: '/blog/wonju-study-cafe-support/info-steps.png',
        alt: '스터디카페 이용료 지원 신청방법: 서류 준비부터 실비 환급까지',
        position: { section: 2, paragraph: 1 }, // "주민등록초본, 신청서..." 서류 문단 위
      },
      {
        src: '/blog/wonju-study-cafe-support/info-final-summary.png',
        alt: '원주 스터디카페 이용료 지원 대상·금액·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'blue-lighthouse-donation-scholarship',
    title: '푸른등대 기부장학금 신청 조건과 지원금액 (2026년 2학기)',
    hook: '이름도 예쁜 이 장학금, 저소득층 우수 대학생이라면 놓치지 마세요',
    categoryLabel: '교육',
    orgName: '한국장학재단',
    publishedDate: '2026-08-25',
    startDate: '2026-08-26',
    deadlineDate: '2026-09-10',
    intro:
      "국가근로장학금 말고도 한국장학재단엔 또 다른 장학금이 있어요. 법인과 개인 기부금으로 운영되는 '푸른등대 기부장학금'인데, 생활비 명목이라 순수하게 학업에 쓸 수 있는 돈이에요.",
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '기본적으로 대한민국 국적의 국내 대학 재학생이면 신청할 수 있어요. 다만 이 장학금은 여러 기부자가 각자 조건을 걸고 기부하는 방식이라, **신청 자격이 기부자별로 조금씩 달라요** — 신청 전에 관심 있는 기부처의 사업계획서를 꼭 확인해보는 게 좋아요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '올해는 **총 1,060명을 선발해 22억 700만원**을 지원할 예정이에요. 1인당 받는 금액은 기부처에 따라 **생활비 장학금 150만원에서 400만원**까지 다양해요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청 기간은 **2026년 8월 26일(수) 오전 9시부터 9월 10일(목) 오후 6시까지**예요. 국가근로장학금처럼 한국장학재단 누리집이나 모바일 앱에서 신청하면 되고, 결과는 **10월 말쯤** 발표될 예정이니 여유를 갖고 기다리면 돼요. 문의는 마찬가지로 상담센터(1599-2290)로 하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '국가근로장학금 조건은 안 맞았지만 생활비가 급한 저소득층 대학생이라면 이것도 함께 살펴보세요. 기부처마다 조건이 달라서, 하나만 보고 포기하지 말고 여러 기부처의 사업계획서를 비교해보는 게 좋아요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 관심 있는 기부처의 사업계획서를 확인했나요? ✅ 9월 10일 전에 신청을 마칠 수 있나요? ✅ 10월 말 결과 발표까지 기다릴 준비가 됐나요? 여러 장학금에 동시에 지원해두는 것도 좋은 전략이에요.',
        ],
      },
    ],
    sourceLinks: [{ label: '한국장학재단 신청 바로가기', url: 'https://www.kosaf.go.kr/' }],
    thumbnail: '/blog/blue-lighthouse-donation-scholarship/thumbnail.png',
    images: [
      {
        src: '/blog/blue-lighthouse-donation-scholarship/info-period.png',
        alt: '푸른등대 기부장학금 신청기간 (8.26 ~ 9.10)',
        position: { section: 2, paragraph: 0 }, // "신청 기간은 2026년 8월 26일부터..." 문단 위
      },
      {
        src: '/blog/blue-lighthouse-donation-scholarship/info-steps.png',
        alt: '푸른등대 기부장학금 신청방법: 한국장학재단 접속부터 결과 발표까지',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/blue-lighthouse-donation-scholarship/info-final-summary.png',
        alt: '푸른등대 기부장학금 대상·금액·신청기간·결과발표 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'ai-certificate-support',
    title: '청년 AI 자격증 취득 지원사업 신청 방법 (충남)',
    hook: 'AI 자격증, 나라 지원받아서 따보는 건 어때요?',
    categoryLabel: '취업',
    orgName: '경제산업과',
    publishedDate: '2026-08-25',
    startDate: '2026-05-01',
    deadlineDate: '2026-11-30',
    intro:
      '요즘 취업 시장에서 AI 관련 스펙이 점점 중요해지고 있죠. 충남 지역 청년이라면 AI 자격증 취득 과정을 지원받을 수 있는 사업이 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 19세에서 39세**까지 신청 가능해요. 상·하반기 각 1회씩 열리는 자격증 취득 과정에 참여하는 방식이라, 신청 시기를 놓치지 않는 게 중요해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          'AI 자격증 취득 과정 프로그램을 지원받을 수 있어요. 취업·이직·자기개발에 실질적으로 도움 될 수 있게 설계된 프로그램이라, 관심 있는 청년이라면 눈여겨볼 만해요. 선정 인원은 **30명**으로, 신청 접수 후 **추첨을 통해 선정**돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '상·하반기 각 1회씩 열리는 교육 신청 기간에 홈페이지를 통해 접수하면 돼요. 신청서, 개인정보제공 동의서, 주민등록등본(또는 초본) 등을 준비해두면 좋아요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '이력서에 AI 관련 스펙을 하나쯤 채우고 싶은 취준생, 회사에서 AI 툴을 다뤄야 하는데 배울 곳이 마땅치 않았던 직장인이라면 관심 가져볼 만해요. 자격증 취득 비용까지 지원되니 부담 없이 도전할 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 19~39세인가요? ✅ 상반기 또는 하반기 모집 시기를 확인했나요? ✅ 어떤 AI 자격증을 목표로 할지 정했나요? 추첨제라 미리 알림을 걸어두고 신청 시기를 놓치지 않는 게 중요해요.',
        ],
      },
    ],
    sourceLinks: [
      { label: '계룡시 신청 바로가기', url: 'https://gyeryong.go.kr/kr/html/sub05/05100302.html' },
      { label: '충남청년포털 공고 보기', url: 'https://youth.chungnam.go.kr/web/main/customSupp/M030-02/view?bizId=A20260401LC000000000003077' },
    ],
    thumbnail: '/blog/ai-certificate-support/thumbnail.png',
    images: [
      {
        src: '/blog/ai-certificate-support/info-period.png',
        alt: '충남 청년 AI 자격증 취득 지원 신청기간 (5.1 ~ 11.30)',
        position: { section: 2, paragraph: 0 }, // "상·하반기 각 1회씩 열리는 교육 신청 기간에..." 문단 위
      },
      {
        src: '/blog/ai-certificate-support/info-steps.png',
        alt: '청년 AI 자격증 지원 신청방법: 대상 확인부터 교육 접수까지',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/ai-certificate-support/info-final-summary.png',
        alt: '충남 청년 AI 자격증 지원 대상·인원·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'wonju-ai-interview-practice',
    title: '원주시 AI 면접·역량검사 체험 지원, 무료로 연습하는 법',
    hook: '면접 앞두고 떨린다면, AI랑 미리 연습해보세요',
    categoryLabel: '교육',
    orgName: '강원특별자치도 원주시',
    publishedDate: '2026-08-25',
    startDate: '2026-03-03',
    deadlineDate: '2026-11-27',
    intro:
      '실전 면접 전에 연습할 곳이 마땅치 않아 막막했다면, 원주시의 AI 면접 체험 지원 사업을 살펴보세요. 실제 면접처럼 연습하고 결과까지 분석받을 수 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: ['**원주시에 1개월 이상 거주 중인 만 18~39세 구직 희망자**라면 신청할 수 있어요.'],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          'AI 솔루션(자기소개서+면접+취업정보) 프로그램 **연간 이용권**을 지원받아요. 실무면접, 임원면접, 인성면접까지 기업 맞춤형·자소서 기반으로 연습할 수 있고, **개인별 결과 분석과 녹화영상**까지 받을 수 있어서 스스로 부족한 점을 파악하기 좋아요. 이용권은 받은 날부터 **2026년 12월 31일까지** 계속 쓸 수 있어요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청 기간은 **2026년 3월 3일(화)부터 11월 27일(금) 오후 6시까지**예요. 방문은 청년라운지 이스트 또는 웨스트에서, 온라인은 원주시 청년지원센터 홈페이지의 네이버폼으로 제출하면 돼요.',
          '참고로 **평일 오후 4시 전에 신청하면 당일 이용권을 바로 받을 수 있고**, 노트북(또는 데스크탑), 마이크 있는 이어폰, 웹캠은 미리 준비해두는 게 좋아요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '면접만 보면 긴장해서 말이 꼬이는 사람, 혼자 연습하려니 피드백 받을 곳이 없던 취준생이라면 이 프로그램이 좋은 연습 상대가 되어줄 거예요. 녹화 영상으로 내 표정과 말투까지 객관적으로 볼 수 있는 게 진짜 도움 돼요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 원주시 1개월 이상 거주 중인가요? ✅ 웹캠·마이크 있는 이어폰·노트북(또는 데스크탑)을 준비했나요? ✅ 평일 오후 4시 전에 신청해서 당일 이용권을 받을 계획인가요? 이용권은 연말까지 쓸 수 있으니 시간 날 때마다 반복 연습해보세요.',
        ],
      },
    ],
    sourceLinks: [
      { label: '원주시 프로그램 신청', url: 'https://www.wonju.go.kr/wjyouth/viewTnWjyouthProgrmU.do?progrmNo=56&key=5942' },
    ],
    thumbnail: '/blog/wonju-ai-interview-practice/thumbnail.png',
    images: [
      {
        src: '/blog/wonju-ai-interview-practice/info-period.png',
        alt: 'AI 면접 체험 지원 신청기간 (3.3 ~ 11.27)',
        position: { section: 2, paragraph: 0 }, // "신청 기간은 2026년 3월 3일부터..." 문단 위
      },
      {
        src: '/blog/wonju-ai-interview-practice/info-steps.png',
        alt: 'AI 면접 체험 지원 신청방법: 청년라운지 방문 또는 네이버폼 접수',
        position: { section: 2, paragraph: 1 }, // "방문은 청년라운지에서..." 문단 위
      },
      {
        src: '/blog/wonju-ai-interview-practice/info-final-summary.png',
        alt: '원주 AI 면접 체험 지원 대상·지원내용·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'iksan-youth-rent-support',
    title: '익산형 청년월세 지원사업, 전국 제도와 뭐가 다를까',
    hook: '익산 사는 청년이라면, 월세 최대 12개월치를 지원받아요',
    categoryLabel: '주거',
    orgName: '전북특별자치도 익산시',
    publishedDate: '2026-08-25',
    startDate: '2026-04-15',
    deadlineDate: '2026-09-30',
    intro:
      '앞서 소개한 전국 단위 청년월세지원 말고도, 익산시가 자체적으로 운영하는 월세 지원 사업이 따로 있어요. 익산 거주 청년이라면 두 사업을 비교해보고 유리한 쪽으로 챙기면 좋아요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 19세에서 34세**까지의 청년이 대상이고, 소득 기준도 있어요. **청년 본인 가구는 중위소득 130% 이하, 부모님을 포함한 원가구는 중위소득 100% 이하**여야 해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**월 20만원 한도 내에서 최대 12개월치 임차료**를 지원받을 수 있어요. 월세가 20만원보다 적으면 실제 낸 만큼만 받는 방식이고, 이 지원은 **생애 딱 한 번만** 받을 수 있어요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요 — 온라인 신청은 안 돼요!',
        paragraphs: [
          '여기서 꼭 기억할 점 — **온라인 신청이 안 되고, 청년 본인이 직접 주소지 관할 읍·면·동 행정복지센터를 방문해서 신청**해야 해요. 익산형 청년월세지원 신청서, 소득·재산 신고서, 서약서, 본인 통장사본, 확정일자나 공인중개사 날인이 있는 임대차계약서, 최근 3개월 이내 월세이체 증빙서류까지 챙겨서 방문하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '앞서 소개한 전국 단위 청년월세지원 조건엔 살짝 안 맞았던 익산 청년이라면 이쪽도 확인해보세요. 두 제도의 소득 기준이 달라서, 하나가 안 되면 다른 하나는 될 수도 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 청년가구 중위소득 130% 이하(또는 원가구 중위소득 100% 이하)인가요? ✅ 온라인 신청이 안 된다는 걸 기억하고 있나요? ✅ 행정복지센터 방문 전에 서류(신청서·소득재산신고서·임대차계약서 등)를 다 챙겼나요? 서류가 빠지면 다시 방문해야 하니 목록을 출력해가는 걸 추천해요.',
        ],
      },
    ],
    sourceLinks: [
      { label: '익산시 청년의숲 바로가기', url: 'https://youthforest.iksan.go.kr/index.iksan' },
    ],
    thumbnail: '/blog/iksan-youth-rent-support/thumbnail.png',
    // 2026-09-23: 본문에 신청 "기간"을 직접 언급하는 문단이 없어서(자격/소득기준 얘기뿐), 국민취업
    // 지원제도 글과 같은 방식으로 info-period는 첫 문단(대상 소개) 위에 배치.
    images: [
      {
        src: '/blog/iksan-youth-rent-support/info-period.png',
        alt: '익산형 청년월세 지원 신청기간 (4.15 ~ 9.30)',
        position: { section: 0, paragraph: 0 },
      },
      {
        src: '/blog/iksan-youth-rent-support/info-steps.png',
        alt: '익산형 청년월세 지원 신청방법: 온라인 불가, 행정복지센터 방문 접수',
        position: { section: 2, paragraph: 0 }, // "온라인 신청이 안 되고..." 문단 위
      },
      {
        src: '/blog/iksan-youth-rent-support/info-final-summary.png',
        alt: '익산형 청년월세 지원 대상·금액·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'social-solidarity-economy-work-experience',
    title: '사회연대경제 청년일경험, 5개월 참여수당 정리',
    hook: '5개월 일하고 월 234만원? 진짜 실무 경험까지 챙겨요',
    categoryLabel: '취업',
    orgName: '행정안전부',
    publishedDate: '2026-08-25',
    startDate: '2026-06-01',
    deadlineDate: '2026-09-30',
    intro:
      '스펙 말고 진짜 경험이 필요한 청년이라면 관심 가질 만한 사업이에요. 사회적기업, 협동조합 같은 사회연대경제 조직에서 실제로 일하면서 돈도 받고 경력도 쌓을 수 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '기본적으로 **해당 자치단체 거주 만 19~34세 미취업자(4대보험 미가입자)**가 대상인데, 지자체 조례에 따라 **최대 39세까지** 확대되는 경우도 있어요. 다만 사업자등록이 있거나, 다른 취업지원사업에 참여 중이거나, 참여기업 사업주의 배우자·직계존비속·형제자매인 경우 등은 참여할 수 없으니 참고하세요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**주 40시간, 5개월간** 사회연대경제 조직에서 실제 업무를 경험하면서 **월 최대 234만원(세전)**을 받고, 4대 보험도 가입돼요. 여기에 **20시간 직무교육**과 참여기업 현직자의 **멘토링**까지 받을 수 있고, 근무 기간의 90% 이상 출석하면 수료 후 **정부 인증 이력확인서**까지 발급받을 수 있어요 — 이력서에 당당히 쓸 수 있는 경험이 되는 셈이에요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          "고용24(work24.go.kr) '정부지원 일자리 채용관'에서 신청하면 되는데, **자치단체별로 모집 기간이 다르니** 본인이 사는 지역의 운영기관에 자세한 일정을 문의해보는 게 정확해요.",
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '사회적기업이나 협동조합 같은 곳에서 일해보고 싶었지만 어떻게 들어가야 할지 몰랐던 청년, 스펙보다 진짜 실무 경험이 필요한 취준생이라면 이 사업이 좋은 입구가 될 수 있어요. 월급도 나쁘지 않고, 4대 보험까지 되니 일반 인턴십보다 조건이 좋은 편이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 4대보험 미가입 미취업자인가요? ✅ 사업자등록이나 다른 취업지원사업 참여 이력이 없나요? ✅ 거주 지역의 모집 기간을 확인했나요? 자치단체마다 시기가 다르니 고용24에서 내 지역 공고를 꼭 따로 검색해보세요.',
        ],
      },
    ],
    sourceLinks: [
      { label: '고용24에서 확인하기', url: 'https://www.work24.go.kr/wk/a/b/1700/themeEmpInfoSrchList.do' },
      { label: '행정안전부 공고', url: 'https://mois.go.kr/frt/bbs/type002/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000215&nttId=126775' },
    ],
    thumbnail: '/blog/social-solidarity-economy-work-experience/thumbnail.png',
    images: [
      {
        src: '/blog/social-solidarity-economy-work-experience/info-period.png',
        alt: '사회연대경제 청년일경험 신청기간 (6.1 ~ 9.30, 지역별 상이)',
        position: { section: 2, paragraph: 0 }, // "고용24에서 신청하면 되는데..." 문단 위
      },
      {
        src: '/blog/social-solidarity-economy-work-experience/info-steps.png',
        alt: '사회연대경제 청년일경험 신청방법 5단계: 자격 확인부터 이력확인서까지',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/social-solidarity-economy-work-experience/info-final-summary.png',
        alt: '사회연대경제 청년일경험 대상·참여수당·신청방법 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'youth-culture-facility-fee-support',
    title: '청년 문화시설 관람비 지원, 5만원 환급받는 법',
    hook: '영화 보고 전시 보러 간 돈, 5만원까지 돌려받아요',
    categoryLabel: '복지',
    orgName: '경제산업과',
    publishedDate: '2026-08-25',
    startDate: '2026-01-01',
    deadlineDate: '2026-11-30',
    intro:
      '문화생활 좀 즐기고 싶은데 지갑 사정이 걱정된다면, 이 지원사업을 챙겨보세요. 관람비를 나중에 지역상품권으로 돌려주는 방식이에요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 20세에서 29세**까지의 청년이면서, 신청일 기준 **청년문화예술패스 적용 대상자**여야 해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '전국 문화시설 관람비 **최대 5만원**을 **지역상품권으로 환급**받을 수 있어요. 영화관이든 전시회든 공연장이든, 문화생활에 쓴 돈을 나중에 돌려받는 개념이라 부담 없이 문화생활을 즐길 수 있어요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청서와 구비서류(주민등록등본 또는 초본, 본인이 사용한 카드 영수증 등)를 이메일이나 청년센터 방문으로 제출하면 돼요. 자격 요건을 모두 충족하면 **접수한 달의 다음 달에 지역상품권**으로 지급받을 수 있어요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '영화관이나 전시회 갈 때마다 지갑 사정을 걱정했던 20대라면 이 제도로 부담을 덜 수 있어요. 청년문화예술패스를 이미 갖고 있다면 추가로 준비할 것도 거의 없어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 20~29세이고 청년문화예술패스 대상자인가요? ✅ 문화시설 이용 영수증을 잘 챙겼나요? ✅ 신청서와 등본(초본)을 준비했나요? 영수증만 있으면 어렵지 않게 신청할 수 있어요.',
        ],
      },
    ],
    sourceLinks: [
      { label: '충남청년포털 공고 보기', url: 'https://youth.chungnam.go.kr/web/main/customSupp/M060-10/view?bizId=A20260401LC000000000003097' },
    ],
    thumbnail: '/blog/youth-culture-facility-fee-support/thumbnail.png',
    images: [
      {
        src: '/blog/youth-culture-facility-fee-support/info-period.png',
        alt: '청년 문화시설 관람비 지원 신청기간 (1.1 ~ 11.30)',
        position: { section: 2, paragraph: 0 }, // "신청서와 구비서류를..." 문단 위
      },
      {
        src: '/blog/youth-culture-facility-fee-support/info-steps.png',
        alt: '청년 문화시설 관람비 지원 신청방법 5단계: 자격 확인부터 상품권 지급까지',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/youth-culture-facility-fee-support/info-final-summary.png',
        alt: '청년 문화시설 관람비 지원 대상·환급금액·신청방법 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'gwangju-qa-bootcamp',
    title: '광주 콘텐츠 테크하이어 QA 과정, 8주 만에 실무자로',
    hook: '게임·IT 업계 QA 직무, 8주 만에 실무자로',
    categoryLabel: '교육',
    orgName: '전남광주통합특별시',
    publishedDate: '2026-08-25',
    startDate: '2026-08-14',
    deadlineDate: '2026-09-07',
    intro:
      'SW나 게임 업계의 QA(품질관리) 직무에 관심 있다면 눈여겨볼 교육과정이에요. 이론뿐 아니라 실무까지 다루는 8주 집중 과정이라 실전 감각을 키우기 좋아요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 18세에서 39세**까지의 청년 **20명**을 모집해요. 서류와 면접 심사를 거쳐 선발되는 방식이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '교육 기간은 **2026년 9월 21일부터 11월 19일까지 8주, 총 320시간**(4주 이론 + 4주 실습)이에요. QA 기초와 품질관리 체계부터 테스트 설계기법, Test Scenario·Case 작성, 결함관리, Jira·Confluence 같은 실무 툴, 서비스 운영과 VOC·CS까지 폭넓게 배우고, 마지막엔 **참여기업 실무과제**까지 수행해요 — 그냥 이론 수업이 아니라 진짜 현업 감각을 익힐 수 있는 커리큘럼이에요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '접수 마감은 **2026년 9월 7일(월)**이에요. GCC사관학교 홈페이지에서 교육생으로 접수하면 되고, 서류 심사(9월 9일)와 면접(9월 14일)을 거쳐 **9월 15일에 합격자가 발표**돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '게임이나 IT 서비스 회사에 관심 있는데 개발 말고 다른 진입로를 찾던 취준생이라면 QA 직무를 눈여겨보세요. 8주 만에 실무 툴(Jira, Confluence)까지 다뤄볼 수 있어서, 이수만 해도 이력서에 쓸 내용이 확 늘어나요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 18~39세인가요? ✅ 9월 21일~11월 19일 8주간 시간을 낼 수 있나요(주 5일, 하루 9시간)? ✅ 9월 7일 마감 전에 GCC사관학교 홈페이지에서 접수했나요? 서류·면접 심사가 있으니 지원 동기를 미리 정리해두면 좋아요.',
        ],
      },
    ],
    sourceLinks: [
      { label: 'GCC사관학교 접수 바로가기', url: 'https://gccaca.kr/board.es?mid=a10405000000&bid=0001&act=view&list_no=928' },
    ],
    thumbnail: '/blog/gwangju-qa-bootcamp/thumbnail.png',
    images: [
      {
        src: '/blog/gwangju-qa-bootcamp/info-period.png',
        alt: '광주 콘텐츠 테크하이어 QA 과정 접수기간 (8.14 ~ 9.7)',
        position: { section: 2, paragraph: 0 }, // "접수 마감은 2026년 9월 7일이에요" 문단 위
      },
      {
        src: '/blog/gwangju-qa-bootcamp/info-steps.png',
        alt: 'QA 과정 신청방법 5단계: 자격 확인부터 실무과제까지',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/gwangju-qa-bootcamp/info-final-summary.png',
        alt: '광주 콘텐츠 테크하이어 QA 과정 대상·커리큘럼·접수기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'seosan-college-student-part-time-job',
    title: '서산시 대학생 아르바이트 운영, 시청에서 일해보기',
    hook: '시청에서 일하면서 용돈도 벌고 행정 경험도 쌓아요',
    categoryLabel: '취업',
    orgName: '자치행정국',
    publishedDate: '2026-08-25',
    startDate: '2026-07-01',
    deadlineDate: '2026-08-31',
    intro:
      '방학 동안 의미 있는 아르바이트를 찾고 있다면, 서산시가 운영하는 대학생 아르바이트 프로그램을 살펴보세요. 시청 행정업무를 직접 체험할 수 있는 기회예요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: ['**만 19세 이상 대학생**이면 신청할 수 있고, 총 **20명**을 선발해요.'],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '단순 사무보조를 넘어 **직무교육과 실제 근무 기회**를 함께 제공받아요. 시정 업무를 가까이서 보고 배우면서, 봉사와 근로를 통해 건전한 가치관을 기르는 것도 이 사업의 취지예요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '접수는 **2026년 8월 31일까지**이고, 시가 내부 계획을 수립하고 모집공고를 게시한 뒤 신청자를 접수하는 방식이에요. 신청서, 개인정보 수집·이용 동의서, 주민등록초본, 재학(휴학) 증명서 등을 준비해두면 좋아요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '방학 동안 그냥 놀기는 아깝고, 그렇다고 아무 알바나 하기는 싫었던 대학생이라면 이 프로그램을 눈여겨보세요. 행정 직무에 관심 있다면 나중에 공공기관 취업을 준비할 때도 도움이 될 만한 경험이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 19세 이상 대학생인가요? ✅ 8월 31일 마감 전에 모집공고를 확인했나요? ✅ 신청서·개인정보동의서·주민등록초본·재학증명서를 준비했나요? 모집 인원이 20명으로 많지 않으니 공고가 뜨자마자 서두르는 게 좋아요.',
        ],
      },
    ],
    sourceLinks: [
      { label: '충남청년포털 공고 보기', url: 'https://youth.chungnam.go.kr/web/main/customSupp/M030-01/view?bizId=A20260401LC000000000003107' },
    ],
    thumbnail: '/blog/seosan-college-student-part-time-job/thumbnail.png',
    images: [
      {
        src: '/blog/seosan-college-student-part-time-job/info-period.png',
        alt: '서산시 대학생 아르바이트 접수기간 (7.1 ~ 8.31)',
        position: { section: 2, paragraph: 0 }, // "접수는 2026년 8월 31일까지이고..." 문단 위
      },
      {
        src: '/blog/seosan-college-student-part-time-job/info-steps.png',
        alt: '서산시 대학생 아르바이트 신청방법 5단계: 자격 확인부터 근무 시작까지',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/seosan-college-student-part-time-job/info-final-summary.png',
        alt: '서산시 대학생 아르바이트 대상·지원내용·접수기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'ulsan-u-fly-global-talent',
    title: '울산 국제개발협력 청년인재 육성(U-FLY), UN 기구 파견 프로그램',
    hook: 'UN 기구에서 일해보고 싶다면? 울산시가 파견 비용까지 다 대줘요',
    categoryLabel: '교육',
    orgName: '울산광역시',
    publishedDate: '2026-08-25',
    startDate: '2026-08-01',
    deadlineDate: '2026-08-31',
    intro:
      '국제기구에서 일하는 커리어를 꿈꿔본 적 있나요? 울산시가 운영하는 U-FLY 사업은 청년을 실제로 UN 산하 기구 등에 파견해서 실무 경험을 쌓게 해주는, 흔치 않은 기회예요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '울산시 청년 **단 4명**만 선발하는 소수 정예 프로그램이에요. 그만큼 경쟁이 치열할 수 있지만, 그만큼 얻는 것도 확실한 프로그램이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '선발되면 **UN FAO 등 국제기구나 울산국제개발협력센터**에서 **최대 11개월간** 파견 근무를 하게 돼요. 이 기간 동안 **급여, 주거비, 왕복항공료, 교육비**까지 지원받을 수 있어서, 순수하게 경험과 커리어에만 집중할 수 있어요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '아쉽게도 원문에 구체적인 신청 방법은 안내돼 있지 않아요. 사업기간이 **2026년 8월 31일까지**로 명시돼 있는 만큼, 관심 있다면 울산광역시 투자유치과 국제교류팀에 직접 문의해서 최신 모집 공고를 확인해보는 걸 추천해요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '국제개발협력이나 국제기구 커리어를 꿈꿔온 울산 청년이라면 이보다 좋은 기회는 흔치 않아요. 어학 실력에 자신 있고, 해외 근무 경험을 커리어 초반에 만들고 싶은 사람이라면 꼭 도전해볼 만해요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 국제개발협력이나 관련 분야에 관심과 역량이 있나요? ✅ 최대 11개월간 해외 파견이 가능한 상황인가요? ✅ 울산광역시 투자유치과 국제교류팀에 문의해서 최신 모집 일정을 확인했나요? 단 4명만 뽑는 만큼, 미리 준비할수록 유리해요.',
        ],
      },
    ],
    sourceLinks: [],
    thumbnail: '/blog/ulsan-u-fly-global-talent/thumbnail.png',
    images: [
      {
        src: '/blog/ulsan-u-fly-global-talent/info-period.png',
        alt: '울산 U-FLY 신청기간 (8.1 ~ 8.31)',
        position: { section: 2, paragraph: 0 }, // "사업기간이 2026년 8월 31일까지로 명시돼..." 문단 위
      },
      {
        src: '/blog/ulsan-u-fly-global-talent/info-steps.png',
        alt: '울산 U-FLY 신청방법 5단계: 대상 확인부터 국제기구 파견까지',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/ulsan-u-fly-global-talent/info-final-summary.png',
        alt: '울산 U-FLY 대상·파견기관·지원내용·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'gwangju-net-zero-living-lab-contest',
    title: '청년 넷제로 상상뜨락 리빙랩 아이디어 공모전, 상금 최대 120만원',
    hook: '탄소중립 아이디어 있다면? 최대 120만원 상금까지 노려보세요',
    categoryLabel: '참여',
    orgName: '전남광주통합특별시',
    publishedDate: '2026-08-25',
    startDate: '2026-09-01',
    deadlineDate: '2026-10-02',
    intro:
      '환경 문제에 관심 있고 아이디어도 있다면, 그냥 묵혀두지 말고 이 공모전에 도전해보세요. 광주시가 청년의 탄소중립 아이디어를 실제 정책 제안으로 발전시킬 수 있게 돕는 공모전이에요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 19세에서 39세**까지의 청년이면 참여할 수 있어요. 지역의 탄소중립 문제를 발굴하고 해결 아이디어를 제안하는 방식이라, 거창한 스펙보다는 문제의식과 아이디어가 중요해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '1차 서류 심사에서 선정된 **6개 팀**은 전문가 자문을 받으며 아이디어를 구체화할 기회를 얻어요 — 지역 문제의 원인 분석부터 탄소 감축량 같은 정량적 목표 수립, 관련 법규·조례 검토까지 실제 정책 제안 수준으로 다듬어주는 과정이에요. 최종 평가에서 뽑힌 우수팀 3팀에게는 **최대 120만원(대상 120만원, 최우수상 80만원, 우수상 50만원)**의 상금도 주어져요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**이메일(lsg2022@gcea.or.kr)로만 접수 가능**하고, 방문이나 우편 접수는 안 돼요. 붙임 서식을 작성해서 제출서류와 함께 기한 내에 이메일로 보내면 되고, 접수가 확인되면 이메일로 회신을 받아요. 서류 심사와 아이디어 선정은 **10월**, 최종 발표평가와 시상은 **11월**에 진행될 예정이에요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          "환경 문제에 관심 많고 평소 '이건 이렇게 바뀌면 좋겠다' 싶은 아이디어가 있던 청년이라면 딱이에요. 정책 제안 경험이 없어도 괜찮아요 — 선정되면 전문가가 붙어서 아이디어를 다듬어주니까요.",
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 19~39세인가요? ✅ 우리 동네의 탄소중립 관련 문제를 하나쯤 떠올려봤나요? ✅ 이메일(lsg2022@gcea.or.kr)로만 접수된다는 걸 기억하고 있나요? ✅ 붙임 서식을 미리 다운받아 작성해뒀나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '광주청년포털 공고 보기', url: 'https://youth.gwangju.go.kr/www/50?siteId=www&policyId=1439&url=%2Fwww%2Fpolicy%2FgjYgPolicyView' },
    ],
    thumbnail: '/blog/gwangju-net-zero-living-lab-contest/thumbnail.png',
    images: [
      {
        src: '/blog/gwangju-net-zero-living-lab-contest/info-period.png',
        alt: '청년 넷제로 리빙랩 공모전 접수기간 (9.1 ~ 10.2)',
        position: { section: 2, paragraph: 0 }, // "이메일로만 접수 가능하고..." 문단 위
      },
      {
        src: '/blog/gwangju-net-zero-living-lab-contest/info-steps.png',
        alt: '청년 넷제로 리빙랩 공모전 신청방법 5단계: 대상 확인부터 시상까지',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/gwangju-net-zero-living-lab-contest/info-final-summary.png',
        alt: '청년 넷제로 리빙랩 공모전 대상·상금·접수방법 한눈에 정리',
        position: 'end',
      },
    ],
  },
  // 2026-09-23: 여기부터 5건 추가 — moa-app Supabase policies 테이블에서 아직 블로그로 안 옮긴
  // 정책 중 마감이 임박하지 않은(9~11월) 것들로 골라서 작성. 카드뉴스 이미지는 없어서(사용자가
  // 만들어주기 전까지) images/thumbnail 필드 생략 — 이러면 기존처럼 이모지 삽화로 자동 대체됨.
  {
    slug: 'incheon-seohae-certificate-fee-support',
    title: '인천 서해구 청년 자격증 응시료 지원, 연 10만원까지 돌려받는 법',
    hook: '자격증 시험 본 영수증, 그냥 버리지 마세요',
    categoryLabel: '취업',
    orgName: '인천광역시 서해구 경제환경국 기업일자리정책과',
    publishedDate: '2026-09-23',
    startDate: '2026-02-01',
    deadlineDate: '2026-11-30',
    intro:
      '자격증 준비하면서 응시료가 부담됐다면 반가운 소식이에요. 인천 서해구가 청년들의 자격증 응시료를 연 최대 10만원까지 지원해줘요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 18~39세 인천 청년**이면 신청할 수 있어요. 다만 **건강보험 직장가입자나 개인사업자는 대상에서 제외**돼요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**1인 1회, 연 최대 10만원** 범위 안에서 실제로 본인이 부담한 응시료를 돌려받을 수 있어요. **국가기술자격증, 국가전문자격증, 국가공인민간자격, 한국사 및 어학시험**까지 폭넓게 인정돼요.',
          '이미 한국산업인력공단(Q-net)에서 국가기술자격 응시료 50%를 감면받았다면, 그 차액(실제로 결제한 금액)만큼 지원받을 수 있어요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청 기간은 **2026년 2월부터 11월까지**예요. **시험 결제 영수증, 응시 증빙서류, 본인 명의 통장사본, 사업자등록여부 사실증명, 건강보험자격득실확인서**를 챙겨서 신청하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '취업 준비하면서 자격증 여러 개를 동시에 준비하고 있는 인천 청년이라면 이 제도로 응시료 부담을 크게 줄일 수 있어요. 시험 볼 때마다 나가는 돈이 은근히 부담스러웠다면 꼭 챙겨보세요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 18~39세 인천 거주 청년인가요? ✅ 건강보험 직장가입자나 개인사업자가 아닌가요? ✅ 응시료 결제 영수증을 보관해뒀나요? ✅ 통장사본·사업자등록여부 사실증명·건강보험자격득실확인서까지 서류를 다 챙겼나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '인천청년정책 공고 보기', url: 'https://youth.incheon.go.kr/youthpolicy/youthPolicyInfoDetail.do?poly_seq=465' },
    ],
    thumbnail: '/blog/incheon-seohae-certificate-fee-support/thumbnail.png',
    images: [
      {
        src: '/blog/incheon-seohae-certificate-fee-support/info-period.png',
        alt: '인천 서해구 청년 자격증 응시료 지원 신청기간 (2.1 ~ 11.30)',
        position: { section: 2, paragraph: 0 }, // "신청 기간은 2026년 2월부터..." 문단 위
      },
      {
        src: '/blog/incheon-seohae-certificate-fee-support/info-steps.png',
        alt: '자격증 응시료 지원 대상·제외대상·지원금액·서류 한눈에 정리',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/incheon-seohae-certificate-fee-support/info-final-summary.png',
        alt: '인천 서해구 청년 자격증 응시료 지원 대상·금액·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'gwangju-newlywed-jeonse-interest-support',
    title: '광주 신혼부부 전세자금 대출이자 지원, 자녀 수에 따라 최대 1% 돌려받아요',
    hook: '전세자금 대출 이자, 자녀 있으면 더 많이 돌려받아요',
    categoryLabel: '주거',
    orgName: '전남광주통합특별시',
    publishedDate: '2026-09-23',
    startDate: '2026-01-05',
    deadlineDate: '2026-10-30',
    intro:
      '신혼부부라면 전세자금 대출 이자 부담을 광주시가 덜어주는 제도가 있어요. 자녀 수에 따라 지원 비율이 달라지니 확인해보세요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '「주택도시기금 신혼부부 전용 전세자금대출」을 새로 받았거나 연장한 신혼부부라면 신청할 수 있어요. **농협·우리·국민·신한·하나·iM·부산은행**에서 취급해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '납입한 대출이자의 일부를 지원받는데, **자녀가 없으면 0.5%, 1자녀면 0.7%, 2자녀 이상이면 1.0%**까지 지원 비율이 올라가요. 지원 한도는 실제로 은행에 낸 총 이자액 범위 안이고, **연 2회(상·하반기)** 개인별 계좌로 지급돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**광주아이키움플랫폼**에서 확인한 뒤 구비서류를 첨부해서 신청·청구하면 돼요. 접수 기간은 **2026년 1월 5일부터 10월 30일까지**예요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '전세자금 대출을 받은 광주 신혼부부라면, 특히 자녀가 있다면 지원 비율이 더 높아지니 꼭 챙겨보세요. 매달 나가는 이자 부담을 몰라서 못 받는 경우가 없게 미리 확인해두는 게 좋아요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 주택도시기금 신혼부부 전용 전세자금대출을 받았거나 연장했나요? ✅ 자녀 수를 확인했나요(지원 비율이 달라져요)? ✅ 취급은행에서 이자를 납입 중인가요? ✅ 광주아이키움플랫폼에서 구비서류를 확인했나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '광주아이키움플랫폼', url: 'https://www.xn--hc0by27bu6atul3dc6t.kr/main/rentSubsidy' },
    ],
    thumbnail: '/blog/gwangju-newlywed-jeonse-interest-support/thumbnail.png',
    images: [
      {
        src: '/blog/gwangju-newlywed-jeonse-interest-support/info-period.png',
        alt: '광주 신혼부부 전세자금 대출이자 지원 접수기간 (1.5 ~ 10.30)',
        position: { section: 2, paragraph: 0 }, // "광주아이키움플랫폼에서 확인한 뒤..." 문단 위
      },
      {
        src: '/blog/gwangju-newlywed-jeonse-interest-support/info-steps.png',
        alt: '신혼부부 전세자금 대출이자 지원 대상·취급은행·지원비율 한눈에 정리',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/gwangju-newlywed-jeonse-interest-support/info-final-summary.png',
        alt: '광주 신혼부부 전세자금 대출이자 지원 대상·비율·접수기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'pyeongtaek-youth-company-mentoring',
    title: '평택 청년-기업 이어드림 사업, 멘토링부터 취업 매칭까지',
    hook: '기업 현직자한테 직접 멘토링 받고, 잘하면 채용까지 이어져요',
    categoryLabel: '취업',
    orgName: '경기도 평택시 기획항만경제실',
    publishedDate: '2026-09-23',
    startDate: '2026-03-02',
    deadlineDate: '2026-10-31',
    intro:
      '취업 준비하는데 현직자 조언을 직접 들어보고 싶었다면, 평택시가 운영하는 이 프로그램을 살펴보세요. 멘토링에서 끝나지 않고 실제 채용까지 이어질 수 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '평택 관내에 거주하거나 활동 중인 **만 19~39세 구직 청년**이면 신청할 수 있어요. 관내 중소기업도 함께 참여하는 프로그램이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**취업멘토링 콘서트**에서는 기업 현직자가 취업 준비를 위한 멘토 특강과 그룹멘토링을 진행하고, **온라인 소규모 멘토링**은 현직자와 청년이 소규모 그룹으로 온라인에서 만나요. **청년·기업 만남의 장**에서는 직무교육을 수료한 청년과 구직 청년을 관내 중소기업과 실제로 취업 매칭까지 연결해줘요. 전체 **120명**(멘토링 100명, 취업 매칭 20명) 규모로 진행돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '취업멘토링 콘서트·온라인 소규모 멘토링은 모집 포스터의 QR코드로 접속해서 신청서를 제출하면 되고, 청년·기업 만남의 장은 모집 공고를 확인한 뒤 담당자 이메일로 신청서를 보내면 돼요. 신청 기간은 **2026년 3월 2일부터 10월 31일까지**예요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '이력서는 써놨는데 현직자 얘기를 직접 들어본 적 없는 평택 청년, 관내 중소기업 취업까지 염두에 두고 있는 구직자라면 눈여겨볼 만해요. 멘토링만 받고 끝나는 게 아니라 실제 채용으로 이어질 수 있다는 게 이 프로그램의 강점이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 평택 관내 거주 또는 활동 중인 만 19~39세인가요? ✅ 멘토링 콘서트·온라인 멘토링·만남의 장 중 어떤 프로그램에 참여할지 정했나요? ✅ 모집 포스터의 QR코드를 확인했나요? ✅ 10월 31일 전에 신청할 계획인가요?',
        ],
      },
    ],
    sourceLinks: [
      {
        label: '평택시 공고 보기',
        url: 'https://www.pyeongtaek.go.kr/pyeongtaek/board/post/view.do?mid=0401010000&bcIdx=41&idx=348905',
      },
    ],
    thumbnail: '/blog/pyeongtaek-youth-company-mentoring/thumbnail.png',
    images: [
      {
        src: '/blog/pyeongtaek-youth-company-mentoring/info-period.png',
        alt: '평택 청년-기업 이어드림 사업 신청기간 (3.2 ~ 10.31)',
        position: { section: 2, paragraph: 0 }, // "신청 기간은 2026년 3월 2일부터..." 문단 위
      },
      {
        src: '/blog/pyeongtaek-youth-company-mentoring/info-steps.png',
        alt: '청년-기업 이어드림 프로그램별 신청방법: 멘토링은 QR코드, 만남의 장은 이메일',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/pyeongtaek-youth-company-mentoring/info-final-summary.png',
        alt: '평택 청년-기업 이어드림 대상·프로그램·신청기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'buyeo-military-accident-insurance-support',
    title: '부여군 군복무 청년 상해보험, 사고 나면 최대 3천만원 보장',
    hook: '군 복무 중인 우리 동네 청년, 이미 보험 가입돼있어요',
    categoryLabel: '복지',
    orgName: '부여군 안전총괄과',
    publishedDate: '2026-09-23',
    startDate: '2026-03-01',
    deadlineDate: '2026-11-30',
    intro:
      '군 복무 중 혹시 모를 사고가 걱정된다면, 부여군이 이미 청년들을 위해 상해보험을 들어놨다는 사실을 알아두면 좋아요. 신청이 아니라 사고가 났을 때 청구하는 방식이라 미리 알아두는 게 중요해요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '부여군에서 **군 복무 중인 청년**이 대상이에요. 별도 신청 절차 없이 군이 대신 가입해주는 방식이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '군 복무 중 발생한 **상해사망 등 7개 항목**을 보장받는데, **최대 3,000만원**까지 보장돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '평소에 따로 신청할 건 없고, **상해가 발생했을 때 보험사(농협손해보험, 1644-9666)에 직접 청구**하면 돼요. 청구할 땐 보험 청구서와 증빙서류를 준비하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '부여군 출신으로 군 복무 중인 청년이나 그 가족이라면 미리 알아두면 좋은 정보예요. 평소엔 존재를 몰라도 상관없지만, 막상 사고가 났을 때 이 보험이 있다는 걸 모르면 그냥 넘어갈 수 있으니까요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 부여군 소속으로 군 복무 중인가요(또는 가족이 그런가요)? ✅ 상해가 발생하면 농협손해보험(1644-9666)에 연락해야 한다는 걸 기억해두셨나요? ✅ 청구할 때 필요한 보험 청구서·증빙서류가 뭔지 미리 확인해뒀나요?',
        ],
      },
    ],
    sourceLinks: [
      {
        label: '충남청년포털 공고 보기',
        url: 'https://youth.chungnam.go.kr/web/main/customSupp/M040-06/view?bizId=A20260401LC000000000003072',
      },
    ],
    thumbnail: '/blog/buyeo-military-accident-insurance-support/thumbnail.png',
    images: [
      {
        src: '/blog/buyeo-military-accident-insurance-support/info-period.png',
        alt: '부여군 군복무 청년 상해보험 운영기간 (3.1 ~ 11.30)',
        position: { section: 2, paragraph: 0 }, // "상해가 발생했을 때 보험사에 직접 청구..." 문단 위
      },
      {
        src: '/blog/buyeo-military-accident-insurance-support/info-steps.png',
        alt: '군복무 청년 상해보험 대상·가입방식·보장금액·보장범위 한눈에 정리',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/buyeo-military-accident-insurance-support/info-final-summary.png',
        alt: '부여군 군복무 청년 상해보험 대상·보장금액·청구처 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'gwangju-pregnant-housework-support',
    title: '광주 임신부 가사지원서비스, 청소·정리 비용 20만원까지 지원',
    hook: '몸이 무거운 요즘, 집안일은 지원받고 맡겨보세요',
    categoryLabel: '복지',
    orgName: '전남광주통합특별시',
    publishedDate: '2026-09-23',
    startDate: '2026-07-28',
    deadlineDate: '2026-09-30',
    intro:
      '임신 중에 청소나 정리정돈까지 챙기기 벅찼다면, 광주시가 가사서비스 비용을 지원해주는 사업이 있어요. 2026년 하반기 접수가 진행 중이에요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**임신부 본인**이 신청하는 게 기본이고, 부득이한 경우 **가족이 대리 신청**할 수도 있어요(이땐 가족관계증명서 등을 첨부해야 해요). 다만 **2026년 상반기에 이미 신청한 사람은 하반기에 다시 지원받을 수 없고**, 출산 후에는 이용할 수 없어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '임신부 거주지 내 **청소, 정리정돈 등 가사 지원이나 정리수납 서비스**를 이용할 수 있어요. **임신부 1인 기준 최대 20만원 한도** 안에서 지원되고, 초과되는 비용은 본인이 부담해요. 서비스를 먼저 이용하고 이용금액을 청구하는 방식이고, **전남광주통합특별시 자치구 내 주소지에서만** 인정돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '온라인시스템(jngji.kr)에 접속해서 **광주권역 거주자 → 임신부 가사지원서비스** 메뉴로 들어가 본인 인증과 개인정보 동의 후 신청서를 작성하고 구비서류를 첨부하면 돼요. 접수 기간은 **2026년 7월 28일부터 9월 30일까지**예요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '몸이 무거워지는 임신 후반기에 청소나 정리 하나하나가 버거웠던 광주 임신부라면 꼭 챙겨보세요. 가족이나 친인척이 대신 해주는 방식은 지원 대상이 아니니, 실제 서비스 업체를 이용해야 한다는 점도 기억해두세요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 2026년 상반기에 이미 이 사업을 신청한 적 없나요? ✅ 전남광주통합특별시 자치구 내 주소지인가요? ✅ 서비스 이용 후 영수증 등 청구 자료를 챙길 계획인가요? ✅ 9월 30일 전에 온라인(jngji.kr)으로 신청할 수 있나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '광주아이키움플랫폼 신청 바로가기', url: 'https://www.xn--hc0by27bu6atul3dc6t.kr/main/housework' },
    ],
    thumbnail: '/blog/gwangju-pregnant-housework-support/thumbnail.png',
    images: [
      {
        src: '/blog/gwangju-pregnant-housework-support/info-period.png',
        alt: '광주 임신부 가사지원서비스 접수기간 (7.28 ~ 9.30)',
        position: { section: 2, paragraph: 0 }, // "온라인시스템(jngji.kr)에 접속해서..." 문단 위
      },
      {
        src: '/blog/gwangju-pregnant-housework-support/info-steps.png',
        alt: '임신부 가사지원서비스 대상·지원내용·이용방식 한눈에 정리',
        position: { section: 3, paragraph: 0 },
      },
      {
        src: '/blog/gwangju-pregnant-housework-support/info-final-summary.png',
        alt: '광주 임신부 가사지원서비스 대상·금액·접수기간 한눈에 정리',
        position: 'end',
      },
    ],
  },
  {
    slug: 'seoul-youth-life-design-school',
    title: '서울시 청년인생설계학교, 5주 프로그램으로 나를 진단해보기',
    hook: '막막한 20대, 전문 진단 도구로 나를 알아가는 시간',
    categoryLabel: '교육',
    orgName: '서울특별시 청년정책담당관',
    publishedDate: '2026-09-23',
    startDate: '2026-09-07',
    deadlineDate: '2026-09-28',
    intro:
      '20대 특유의 막막함, 전문 진단 도구로 나를 이해하는 데서 실마리를 찾아보는 건 어때요. 서울시가 운영하는 5주짜리 무료 프로그램이에요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '신청일 기준 서울시에 주민등록이 돼 있는 **만 19~39세 청년**이면 신청할 수 있어요. 의무복무를 마친 제대군인은 최대 3년까지 지원 연령이 늘어나요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '총 5개 코스 중 하나를 골라 참여해요. **라이프 코스**(강점 진단, 자존감 향상), **커리어 코스**(적성에 맞는 일터 찾기), **리더십 코스**(소통·팀빌딩), **스케치 코스**(대학 비진학 청년 대상), **스타터 코스**(사회진입 전 예비청년 대상, 만 18~24세)로 나뉘고, 반별 10~20명씩 5주(스타터는 2주) 프로그램으로 진행돼요.',
          '국민기초생활수급권자, 차상위계층, 기준중위소득 100% 이하 가구 등 취약 청년은 반별 정원의 50% 이내에서 우선 선정돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '2026년 3기 모집 기간은 **9월 7일(월) 오전 10시부터 9월 28일(월) 오후 5시까지**이고, 선정자는 10월 2일에 발표돼요. 운영 기간은 10월 12일부터 11월 14일까지예요.',
          '**청년몽땅정보통**([교육문화] → [청년인생설계학교])에서 온라인으로 신청하면 되고, 선발은 무작위 전산추첨 또는 인터뷰 심사로 진행돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '미래가 막막하고 불안한데 어디서부터 손대야 할지 모르겠는 서울 청년, 지금 직장이나 인간관계에 회의감이 드는 청년이라면 참여해볼 만해요. 전문 진단 도구(태니지먼트, 버크만 시그니처 등)로 나를 객관적으로 들여다볼 기회예요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 서울시에 주민등록된 만 19~39세인가요? ✅ 5개 코스 중 어떤 게 나한테 맞는지 살펴봤나요? ✅ 9월 28일 전까지 청년몽땅정보통에서 신청할 수 있나요? ✅ 이번 3기를 놓쳐도 내년에 1기부터 다시 열리니 시기를 기억해두세요.',
        ],
      },
    ],
    sourceLinks: [
      { label: '청년몽땅정보통 공고 보기', url: 'https://youth.seoul.go.kr/youthConts.do?key=2310200020&sc_pbancSeCd=013&sc_bbsStngSn=2212200001&sc_bbsCtgrySn=2310200012&sc_qnaCtgryCd=&sc_faqCtgryCd=008' },
    ],
  },
  {
    slug: 'gwangju-namgu-photo-support',
    title: '광주 남구 구직청년 증명사진 촬영지원, 이력서 사진 무료로 찍기',
    hook: '이력서용 증명사진, 지정 사진관에서 무료로 찍어드려요',
    categoryLabel: '취업',
    orgName: '전남광주통합특별시 남구',
    publishedDate: '2026-09-23',
    startDate: '2026-07-27',
    deadlineDate: '2026-12-18',
    intro:
      '이력서에 쓸 증명사진 하나 찍는 것도 은근히 돈이 들죠. 광주 남구가 구직 청년들의 증명사진 촬영비를 아예 무료로 지원해줘요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '신청일 기준 **청년 구직자**로서, 본인이 **남구 주민이거나 남구 소재 대학교에 재학(휴학) 중**이면 신청할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '이력서·면접용 **증명사진을 1인당 연 1회 무료로 촬영**해줘요. 고운날사진관, 노블스튜디오, 더인스튜디오, 블루레코드, 연리지스튜디오 중 한 곳을 골라 이용하면 돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청 기간은 **2026년 7월 27일부터 12월 18일까지**(예산 소진 시 조기 종료)예요. 남구청 일자리정책과 청년정책팀에 방문하거나 이메일(iljari1234@korea.kr)로 신청하면 되고, 신청서·워크넷 구직등록확인증·주민등록초본(또는 재학증명서)을 챙기면 돼요. 승인 통보를 받으면 원하는 사진관에 직접 예약해서 촬영하면 되는데, **선정 안내일로부터 1개월 이내에 촬영하지 않으면 선정이 취소**되니 주의하세요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '이력서 낼 때마다 증명사진 값이 아까웠던 남구 청년 구직자라면 꼭 챙겨보세요. 별도 비용 없이 지정 사진관에서 바로 촬영할 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 남구 주민이거나 남구 소재 대학 재(휴)학생인가요? ✅ 워크넷 구직등록을 해뒀나요? ✅ 신청서·주민등록초본(또는 재학증명서)을 준비했나요? ✅ 승인 통보 후 1개월 안에 촬영 예약할 계획인가요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '광주 남구청 공고 보기', url: 'https://www.namgu.gwangju.kr/board.es?mid=a10604010000&bid=0001' },
    ],
  },
  {
    slug: 'cheongsong-newlywed-rent-support',
    title: '청송군 청년 신혼부부 월세지원, 최대 2년간 월 30만원',
    hook: '이미 낸 월세, 소득 구간별로 최대 월 30만원까지 돌려받아요',
    categoryLabel: '주거',
    orgName: '경상북도 청송군 기획감사실',
    publishedDate: '2026-09-23',
    startDate: '2026-01-14',
    deadlineDate: '2026-12-31',
    intro:
      '신혼부부의 월세 부담, 청송군이 소득 구간별로 최대 2년간 지원해줘요. 이미 낸 월세를 반기별로 돌려받는 방식이에요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 19~39세** 신혼부부(혼인신고일이 신청일 기준 5년 이내)로, 부부가 같이 전입신고 돼 있고, **경북도 내 임차보증금 5천만원 이하·월세 80만원 이하**인 주택에 거주하며 **연소득(부부합산) 6천만원 이하**인 무주택자면 신청할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '기납부한 월세에 대해 **연소득(부부합산) 구간별로 차등해서 최대 월 30만원을 2년간** 지원해줘요. 신청인 본인 계좌로 **반기별(6개월분)**씩 이체돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청 기간은 **2026년 1월 14일부터 12월 31일까지**이고, 최초 신청은 신청일 기준 과거 6개월분까지 소급해서 받아줘요. 월세 지원 신청서·서약서·신분증·통장사본과 함께 확정일자 찍힌 임대차계약서, 6개월분 월세 납입 증빙(이체영수증 등), 가족관계증명서, 소득금액증명 등을 챙겨서 신청하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '청송군에 신혼집을 마련한 부부라면 꼭 확인해보세요. 현금으로 낸 월세는 인정 안 되고 계좌 이체 기록만 인정된다는 점, 시·군을 옮겨 다닌 이력이 있으면 최초 신청이 제한될 수 있다는 점을 미리 챙겨두면 좋아요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 혼인신고일이 5년 이내인 만 19~39세 부부인가요? ✅ 임차보증금 5천만원 이하·월세 80만원 이하 주택에 거주하나요? ✅ 부부합산 연소득이 6천만원 이하인가요? ✅ 월세를 계좌이체로 납부한 증빙이 있나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '청송군청 홈페이지', url: 'http://www.gbhome.kr' },
    ],
  },
  {
    slug: 'jeju-talla-youth-package',
    title: '제주 탐라청년출발패키지, 전입만 해도 최대 20만원 축하장려금',
    hook: '제주로 이사왔다면, 그것만으로 돈을 받을 수 있어요',
    categoryLabel: '복지',
    orgName: '제주특별자치도',
    publishedDate: '2026-09-23',
    startDate: '2026-02-23',
    deadlineDate: '2026-12-31',
    intro:
      '제주로 막 전입한 청년이라면 놓치지 마세요. 그냥 전입신고만 해도 제주도가 축하장려금을 준다는 사실, 의외로 잘 모르는 사람이 많아요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**2026년 1월 1일 이후 제주도로 전입**했고, 전입일 기준 **1년 이내 제주도 주민등록 이력이 없는 만 19~39세 청년**이면 대상이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**일반형**(처음 제주로 전입)은 전입축하금 5만원, 주민등록 6개월 경과 시 5만원(총 10만원). **U턴형**(과거 5년 이상 제주에 살았고 최근 1년 안에는 제주 주민등록이 없었던 경우)은 각각 10만원씩(총 20만원)을 지급받아요. 전부 **탐나는전(제주 지역화폐) 모바일 충전**으로 받아요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**정부24에서 온라인 신청만 가능**해요(로그인 → \'탐라청년출발\' 검색). 1차 신청 시 2차 신청까지 함께 처리되고, 담당자가 행정정보공동이용으로 6개월 경과 여부를 직접 확인해줘서 따로 증빙자료를 낼 필요는 없어요. 신청 전에 본인 명의 **탐나는전 앱 설치 또는 카드 발급**은 미리 해둬야 해요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '최근에 제주로 이주했거나 이주를 고민 중인 청년이라면 알아두면 좋은 정보예요. 별다른 조건 없이 전입 사실만으로 받을 수 있는 돈이라, 신청 안 하면 그냥 놓치는 돈이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 2026년 1월 1일 이후 제주로 전입했나요? ✅ 전입일 기준 1년 이내 제주 주민등록 이력이 없나요? ✅ 탐나는전 앱을 설치했거나 카드를 발급받았나요? ✅ 정부24에서 \'탐라청년출발\'을 검색해봤나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '제주도청 공고문', url: 'https://www.jeju.go.kr/news/news/law/jeju2.htm#A_64526' },
    ],
  },
  {
    slug: 'jeju-working-youth-housing-support',
    title: '제주 일하는 청년 보금자리 지원, 회사가 주는 주거비 최대 80% 지원',
    hook: '회사에서 주는 기숙사·주거비, 제주도가 그 일부를 대신 내줘요',
    categoryLabel: '주거',
    orgName: '제주특별자치도청',
    publishedDate: '2026-09-23',
    startDate: '2026-01-20',
    deadlineDate: '2026-12-10',
    intro:
      '제주 중소기업에 다니는 청년이라면 회사가 지원하는 주거비 부담을 제주도가 대신 나눠 짊어져줘요. 회사가 신청하는 사업이라 재직 중이라면 회사에 알려주는 게 먼저예요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '제주에 소재하고 사업자등록을 한 **중소기업**(고용보험 피보험자 1인 이상) 중, 직원 숙소를 임차해주거나 급여에 주거지원비를 포함해서 지급하는 회사에 재직 중인 **만 15~39세 청년 근로자**(월급여 382만원 미만, 주거지원비 제외)가 대상이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '회사가 숙소를 직접 임차해서 제공하면(1유형) 주거지원비의 **60%**, 급여에 주거지원비를 포함해서 지급하면(2유형) **80%**를 지원받아요. 1년간 지원되고, 매분기 말월(3·6·9·12월)에 지급돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '회사가 **매월 1~10일**에 사업 참여를 신청하고, 선정 후 **3·6·9·12월 1~10일**에 지원금을 신청하는 구조예요. 제주특별자치도 일자리지원사업통합플랫폼에서 온라인으로 신청하거나, 이메일(ywh9698@korea.kr) 또는 제주시 신대로63 2층 205호를 방문해서 신청할 수 있어요. 신청 기간은 **2026년 1월 20일부터 12월 10일까지**예요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '제주 중소기업에서 일하며 회사 기숙사에 살거나 급여에 주거비가 포함돼 있는 청년이라면, 회사 담당자에게 이 제도를 알려주고 함께 신청을 챙겨보세요. 회사 입장에서도 부담이 줄어드는 만큼 신청 안 할 이유가 없어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 재직 중인 회사가 제주 소재 중소기업인가요? ✅ 회사가 숙소를 임차해주거나 급여에 주거지원비를 포함하고 있나요? ✅ 만 15~39세이고 월급여(주거지원비 제외)가 382만원 미만인가요? ✅ 회사 담당자에게 이 제도를 알려줬나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '제주 일자리지원사업통합플랫폼', url: 'https://www.jeju.go.kr/jejusupport/index.htm' },
    ],
  },
  {
    slug: 'incheon-housing-deposit-loan-interest-extension',
    title: '인천 청년 주택임차보증금 이자 지원, 대출 연장도 가능해요',
    hook: '전세대출 이자 지원 받고 있다면, 만기 전에 연장부터 챙기세요',
    categoryLabel: '주거',
    orgName: '인천광역시 청년정책담당관',
    publishedDate: '2026-09-23',
    startDate: '2025-04-09',
    deadlineDate: '2026-12-31',
    intro:
      '인천 청년주택임차보증금 이자 지원을 받고 있는데 계약 만기가 다가온다면, 놓치지 말고 연장부터 신청하세요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '기존에 **인천 청년주택임차보증금 이자 지원**을 받고 있는 사람 중, 인천에 주민등록이 된 **무주택 청년 세대주**로 본인·배우자·모든 자녀(19세 미만)가 무주택이면 연장을 신청할 수 있어요. 나이·소득 기준은 최초 대출 신청 당시 기준을 그대로 적용해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '최초 대출 추천 당시 공고문에 명시된 금리 그대로 이자 지원이 이어져요. 취급은행은 **NH농협은행 인천관내 영업점**(기존 대출 받은 곳)이고, **연장 기간은 최초 대출 만기일로부터 2년 이내(1회)**만 가능해요. 기존 임대차 계약을 연장하면서 보증금이 늘어나는 경우, 늘어난 금액에 대한 추가 대출은 안 돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청일로부터 10일 이내에 결과가 나오고, 인천청년포털 마이페이지에서 추천서를 발급받아 은행에 제출하면 돼요. **추천 유효기간은 기존 계약 종료일 1개월 전까지**이니 미리 챙겨야 해요. 은행 심사에서 떨어지면 이 사업을 1회 연장한 것으로 간주되고 이자 지원이 최초 대출 만기일에 끝나니 주의하세요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '인천 청년주택임차보증금 이자 지원을 이미 받고 있는데 계약 만기가 다가오는 청년이라면 미리미리 확인해두세요. 신청 시기를 놓치면 이자 지원이 그냥 끊겨버려요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 기존에 인천 청년주택임차보증금 이자 지원을 받고 있나요? ✅ 본인·배우자·자녀 모두 무주택인가요? ✅ 계약 종료일 1개월 전까지 신청할 계획인가요? ✅ 한국주택금융공사·NH농협은행 대출연장심사 기준을 확인했나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '인천청년정책 공고 보기', url: 'https://youth.incheon.go.kr/youthpolicy/youthPolicyInfoDetail.do?poly_seq=380' },
    ],
  },
  {
    slug: 'gwangju-jobseeker-certificate-support',
    title: '광주 구직청년 자격증 취득지원, 어학·자격증 시험 응시료 지원',
    hook: '한국사, 어학시험, 국가자격증 응시료까지 폭넓게 지원돼요',
    categoryLabel: '교육',
    orgName: '전남광주통합특별시',
    publishedDate: '2026-09-23',
    startDate: '2026-08-03',
    deadlineDate: '2026-12-31',
    intro:
      '구직 준비하며 자격증·어학시험 여러 개 보다 보면 응시료도 만만치 않죠. 광주시가 구직청년의 시험 응시료를 폭넓게 지원해줘요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '광주 구직청년이면 신청할 수 있어요(연령은 만 19~39세). **한국사 및 어학능력시험**(20종), **국가기술자격증**, **국가전문자격증**, **국가공인 민간자격증**까지 폭넓게 인정돼요 — 단, 자동차운전면허는 제외되고, 민간자격 중 \'등록\'으로만 구분된 자격증은 지원 대상이 아니에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '시험 단계별(필기·실기 등)로 합산해서 신청할 수 있는데, **한 번 지급 완료된 회차는 당해 연도에 추가 신청이나 소급 지원이 안 된다**는 점은 기억해두세요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '시험에 먼저 응시한 뒤, **전남광주통합특별시청년통합플랫폼**에서 접수하면 돼요. 주민등록표 초본, 건강보험 자격득실 확인서, 응시사실 증명서류(성적표 등), 결제영수증, 통장사본을 챙겨서 제출하면 자격심사와 중복지원 여부 조회를 거쳐 **다음 달 10일에 지원금이 지급**돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '취업 준비하며 여러 자격증·어학시험에 동시에 도전하고 있는 광주 청년이라면 시험 볼 때마다 이 제도를 활용해보세요. 영수증이나 수험표는 인정 안 되니, 시험 접수증 대신 응시확인서나 성적표를 꼭 챙겨야 해요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 지원 대상 시험(한국사·어학·국가자격증 등)에 해당하나요? ✅ 응시확인서나 성적표를 받아뒀나요(수험표는 인정 안 됨)? ✅ 결제영수증에 금액·일시·승인번호가 다 나와있나요? ✅ 전남광주통합특별시청년통합플랫폼에서 접수했나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '광주청년포털 공고 보기', url: 'https://youth.gwangju.go.kr/www/50?siteId=www&policyId=1408&url=%2Fwww%2Fpolicy%2FgjYgPolicyView' },
    ],
  },
  {
    slug: 'youth-housing-dream-savings-account',
    title: '청년주택드림청약통장, 청약도 되고 최대 4.5% 이자까지',
    hook: '무주택 청년이라면 일반 청약통장보다 이게 나아요',
    categoryLabel: '자산',
    orgName: '국토교통부',
    publishedDate: '2026-09-23',
    startDate: null,
    deadlineDate: null,
    intro:
      '청약통장을 아직 안 만들었거나 갈아탈 생각이라면, 청년이라면 일반 주택청약종합저축보다 이게 나을 수 있어요. 이자율도 높고, 나중에 당첨되면 대출까지 이어져요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 19~34세**, **연소득 5,000만원 이하**(직전년도 신고소득 기준)인 **무주택 청년**이면 가입할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**최대 연 4.5% 이자율**에 월 100만원까지 납입 가능하고, 기존 주택청약종합저축과 동일하게 **무주택세대주는 연 300만원 한도로 40%까지 소득공제**도 받을 수 있어요.',
          '청약에 당첨되면 **청년주택드림 대출**로 이어져요. 통장 가입 1년 이상, 1,000만원 이상 납입해두면 **분양가의 80%까지 대출**받을 수 있고, 금리는 **2.4~4.15%**(소득·만기에 따라 차등), 한도는 미혼 3억원·신혼 4억원 이내예요. 결혼하면 0.1%p, 첫째 출산하면 0.5%p, 다자녀면 0.2%p 금리가 더 내려가요(하한선 연 1.5%).',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '우리은행, KB국민은행, IBK기업은행, NH농협, 신한은행, 하나은행, iM뱅크, 부산은행, 경남은행 등 취급 은행 영업점에서 상시로 가입할 수 있어요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '아직 청약통장이 없는 무주택 청년, 일반 청약통장을 쓰고 있지만 이자율이 아쉬웠던 청년이라면 갈아타는 걸 고려해볼 만해요. 나중에 내 집 마련 계획이 있다면 대출 연계 혜택까지 챙길 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 19~34세이고 무주택자인가요? ✅ 연소득이 5,000만원 이하인가요? ✅ 기존 청약통장이 있다면 청년주택드림으로 전환 가능한지 은행에 확인해봤나요? ✅ 나중에 분양 당첨 시 대출 연계까지 고려하고 있나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '주택도시기금 청년주택드림청약통장', url: 'https://nhuf.molit.go.kr/FP/FP07/FP0701/FP07010301.jsp' },
    ],
  },
  {
    slug: 'iksan-train-fare-support',
    title: '익산시 열차운임비 지원, 정기승차권 절반을 돌려받아요',
    hook: 'KTX·SRT 정기권 타고 통근·통학한다면 절반은 익산시가 대신 내줘요',
    categoryLabel: '취업',
    orgName: '전북특별자치도 익산시',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '익산에 살면서 타지로 통근·통학하느라 기차 정기권을 쓰고 있다면, 그 비용의 절반을 익산시가 지역화폐로 돌려줘요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**익산시에 주민등록을 둔 근로자 또는 재학생**으로, 열차 정기승차권을 이용해 관외로 이동한다면 신청할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**코레일·SRT 일반·기간자유형 정기권 운임의 50%를 연간 200만원 한도**로 지역화폐(다이로움)로 지급받아요. 횟수 차감형인 정기권(N카드)이나 회수승차권은 대상이 아니에요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '정기승차권을 사용한 뒤 신청자 홈페이지에서 상시로 신청하면 돼요. 다이로움 지역화폐 미가입자는 \'착한페이\' 앱을 설치해서 익산다이로움을 신청하거나(카드 수령까지 2~3일), 하나·농협·전북은행·신협에 방문하면 즉시 발급받을 수 있어요. 정기권 캡처 화면, 주민등록초본, (근로자는) 재직증명서·고용보험이력내역서, (학생은) 재학증명서 등을 준비하면 돼요. **매월 10일 이전 신청하면 해당 월 말 전후로 지급**돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '익산에 살면서 다른 지역 직장이나 학교로 매일 기차 통근·통학하는 청년이라면 정기권 비용 부담을 절반으로 줄일 수 있어요. 매달 신청하지 않아도 이체 없이 다이로움 카드로 수령하는 구조라 한 번 세팅해두면 편해요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 익산시에 주민등록이 돼 있나요? ✅ 열차 정기승차권(기간자유형)을 이용 중인가요? ✅ 다이로움 지역화폐 카드를 발급받았나요? ✅ 정기권 캡처 화면과 재직·재학증명서를 준비했나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '익산시청 공고 보기', url: 'https://www.iksan.go.kr/reserve/board/post/list.do?boardUid=ff80808199e7462c0199eadd15600784&menuUid=ff8080819973cd47019974821f7403b8&programPostUid=ff80808199f0d11c0199f103608f01df' },
    ],
  },
  {
    slug: 'ulsan-youth-wellstay-support',
    title: '울산 청년 웰스테이 지원, 기숙사 임차료 80%까지',
    hook: '회사 기숙사에 산다면, 월세 80%를 시가 대신 내줘요',
    categoryLabel: '주거',
    orgName: '울산광역시',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '울산 중소기업에서 일하면서 회사 기숙사에 살고 있다면, 그 임차료의 상당 부분을 울산시가 대신 부담해주는 제도가 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**2024년 12월 31일 이전에 설립된 울산 관내 중소기업**(기숙사 제공 기업)에 **정규직으로 재직 중인 만 39세 이하 청년 근로자**(주민등록 이전 완료자)가 대상이에요. 기업이 사업주 명의로 기숙사를 임차해 제공하고 있어야 해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '사업주 명의로 임차한 기숙사의 **월세 80%를 9개월간** 지원받아요. **1인당 월 30만원 이내**, 기업당 최대 2명까지, 기업당 총 540만원 한도예요. 총 30개 중소기업이 대상이에요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '사업기간은 **2026년 1월부터 12월까지**이고, 수행기관인 **울산경제일자리진흥원** 홈페이지에서 관련 안내를 확인하고 신청하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '울산 중소기업 정규직으로 취업했는데 회사 기숙사 임차료가 부담됐던 청년이라면, 회사 인사담당자에게 이 제도를 알려주고 같이 신청해보세요. 기업 입장에서도 부담이 크게 줄어드는 제도예요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 2024년 12월 31일 이전 설립된 울산 중소기업에 정규직으로 재직 중인가요? ✅ 회사가 기숙사를 직접 임차해서 제공하나요? ✅ 만 39세 이하이고 주민등록 이전을 마쳤나요? ✅ 회사 담당자에게 이 제도를 안내했나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '울산경제일자리진흥원', url: 'https://www.ubpi.or.kr/main/' },
    ],
  },
  {
    slug: 'gwangju-startup-guarantee-support',
    title: '광주 청년창업특례보증, 최대 5천만원 이자 3%p 지원받고 대출',
    hook: '창업자금, 보증료 낮고 이자까지 3%p 깎아주는 특례보증으로',
    categoryLabel: '취업',
    orgName: '전남광주통합특별시',
    publishedDate: '2026-09-23',
    startDate: '2026-03-23',
    deadlineDate: '2026-12-31',
    intro:
      '광주에서 창업했거나 창업을 준비 중이라면, 광주신용보증재단의 청년 특례보증으로 은행 대출을 더 유리한 조건에 받을 수 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '광주광역시 소재 **청년 창업기업**이면 신청할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '업체당 **최대 5천만원**까지 보증받을 수 있고, **보증비율 100%**, 보증료율은 연 0.5%로 낮아요. 여기에 **이자 3%p를 1년간 지원**받아요. 상환은 1년 일시상환(최대 5년 연장 가능) 또는 5년 분할상환(1년 거치 4년 원금균등분할) 중 고를 수 있고, 광주은행·신한은행·우리은행·NH농협·KB국민·IBK기업·KEB하나은행에서 취급해요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**광주신용보증재단 앱 \'보증드림\'이나 은행 앱에서 비대면으로 신청**하면 되고, 법인은 영업점에 전화 후 방문 접수해야 해요. 신청서 제출 → 신용보증재단 심사 → 보증서 발급 → 은행 대출 순서로 진행돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '광주에서 창업했는데 대출 금리나 보증료 부담이 걱정됐던 청년 창업가라면 이 특례보증부터 알아보세요. 일반 대출보다 조건이 훨씬 유리해요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 광주광역시 소재 청년 창업기업인가요? ✅ 필요한 자금 규모가 5천만원 이내인가요? ✅ 보증드림 앱이나 취급은행 앱을 확인해봤나요? ✅ 사업자등록증 등 기본 서류를 준비했나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '광주신용보증재단', url: 'http://www.gjsinbo.or.kr' },
    ],
  },
  {
    slug: 'jeonju-wedding-public-hall',
    title: '웨딩 in 전주 공공예식장, 결혼식 장소를 무료로 빌려드려요',
    hook: '전주 유명 장소에서 결혼식, 최대 100만원 부대비용까지 지원',
    categoryLabel: '복지',
    orgName: '전북특별자치도 전주시',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '결혼 비용 때문에 예식장 고르기부터 부담스럽다면, 전주시가 지역 명소를 예식 공간으로 무료 개방해주는 제도를 살펴보세요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 18~39세** 결혼을 앞둔 예비부부라면 이용할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**노송광장, 덕진공원(열린광장), 한국전통문화전당, 팔복예술공장(이팝나무홀), JB문화공간, 전라감영, 평화의전당(잔디광장)** 등 7곳은 **무료**로 대관할 수 있고, 기전놀이전수관·문화공판장 작당(야외마당) 2곳은 유료예요. 여기에 **10쌍(예산 소진 시까지)**에 한해 **예식 1쌍당 최대 100만원까지 실비**로 의자·테이블, 음향·조명, 꽃장식 등 부대비용도 지원해줘요(예식 종료 후 증빙서류 확인 후 계좌 입금).',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**공유누리(www.eshare.go.kr)**에서 공유신청예약 → 자원분류(공공예식장·연회장) → 희망지역(전북특별자치도, 전주시)으로 검색해서 예약·신청하면 돼요. 지원신청서·동의서와 전주시 거주확인 서류(주민등록등본)를 준비하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '예식장 대관료가 부담스러워서 검소한 결혼식을 고민하던 전주 예비부부라면 딱이에요. 유명한 공공장소에서 무료로 식을 올리면서 부대비용까지 지원받을 수 있는 좋은 기회예요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 18~39세 예비부부인가요? ✅ 원하는 예식 장소가 무료 7곳에 포함되나요? ✅ 공유누리에서 예약 가능 일정을 확인했나요? ✅ 부대비용 지원(10쌍 한정)은 선착순이니 서둘러 신청할 계획인가요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '전주시 청년정책 홈페이지', url: 'https://www.jeonju.go.kr/youth/index.9is' },
    ],
  },
  {
    slug: 'jeonnam-youth-hope-job-support',
    title: '전남 청년 희망 일자리 지원사업, 1년간 월 230만원 보장',
    hook: '취업하면 회사도 나도 각각 200만원씩 인센티브까지 받아요',
    categoryLabel: '취업',
    orgName: '전남광주통합특별시 인구청년이민국 청년희망과',
    publishedDate: '2026-09-23',
    startDate: '2025-07-01',
    deadlineDate: '2027-12-31',
    intro:
      '전남형 청년 일자리 사업, 최저임금보다 넉넉한 급여를 1년간 보장해주고 거기에 고용유지 인센티브까지 얹어줘요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '고용 우선 지원이 필요한 **구직 취약 청년** 중심으로 모집·선정돼요(참여 기업은 지역 산업 기반 중소기업·사회적경제기업).',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**최저임금의 110% 수준인 월 230만원**(세전, 재정지원 92만원 + 기업 자부담 138만원)을 1년간 보장받아요. 고용을 유지하고 지역에 정착하면 **기업과 청년에게 각각 200만원씩, 총 400만원의 인센티브**도 지급돼요. 직장적응 온보딩 프로그램, 워크숍, 네트워킹 같은 커뮤니티 활동 지원도 받을 수 있어요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '청년은 **전남일자리통합정보망**(job.jeonnam.go.kr)에서 접수하면 돼요(참여 기업은 이메일로 별도 접수).',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '구직이 특히 어려운 취약 청년이라면 우선 선정 대상이니 꼭 확인해보세요. 급여뿐 아니라 정착 인센티브까지 챙길 수 있는 제도예요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 구직에 어려움을 겪고 있는 전남 청년인가요? ✅ 전남일자리통합정보망에서 참여 기업 목록을 확인했나요? ✅ 1년 이상 근무할 계획이 있나요(인센티브 조건)? ✅ 온보딩 프로그램 등 커뮤니티 활동에 참여할 의향이 있나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '전남일자리통합정보망', url: 'https://job.jeonnam.go.kr/www/58?division2=B&svc=detail&url=%2Fwww%2Fbizmap%2FlistView' },
    ],
  },
  {
    slug: 'gwangju-namgu-job-incentive',
    title: '광주 남구 청년 구직자 취업장려금, 취업 6개월 후 50만원',
    hook: '남구에서 취업 성공하고 6개월 버텼다면, 50만원을 받을 수 있어요',
    categoryLabel: '취업',
    orgName: '전남광주통합특별시 남구',
    publishedDate: '2026-09-23',
    startDate: '2026-02-19',
    deadlineDate: '2026-12-18',
    intro:
      '구직활동 끝에 취업에 성공했다면, 광주 남구가 그 노력에 취업장려금을 얹어줘요. 6개월 근속하면 신청할 수 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**2026년 2월 1일 기준 광주 남구에 주민등록**을 두고, 신청일 기준 **만 19~39세**이면서, 구직활동 후 **4대 보험 가입 사업장에서 주 40시간 이상 근로계약을 맺고 6개월 이상 근속**한 사람 중, **가구소득이 기준 중위소득 150% 이하**인 청년 근로자 30명이 대상이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**1인당 50만원(1인 1회)**을 신청월 말일에 지급받아요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '신청 기간은 **2026년 2월 2일부터 12월까지**(채용 후 6개월 경과된 시점, 예산 소진 시 조기종료)예요. 남구청 일자리정책과(6층)에 방문하거나 이메일(iljari1234@korea.kr)로 신청하면 되고, 취업장려금 지원신청서, 개인정보동의서, 참여적격확인서, 주민등록등·초본, 구직활동 확인서, 건강보험납입내역서, 4대보험 가입내역서, 근로계약서를 챙기면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '힘들게 구직활동 끝에 취업에 성공한 남구 청년이라면, 6개월 근속 시점에 잊지 말고 신청하세요. 취업 축하금처럼 챙길 수 있는 돈이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 2026년 2월 1일 기준 남구 주민인가요? ✅ 4대 보험 가입 사업장에서 주 40시간 이상, 6개월 이상 근무했나요? ✅ 가구소득이 기준 중위소득 150% 이하인가요? ✅ 구직활동 확인서 등 필요 서류를 다 챙겼나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '광주청년포털 공고 보기', url: 'https://youth.gwangju.go.kr/www/50?siteId=www&policyId=1282&url=%2Fwww%2Fpolicy%2FgjYgPolicyView' },
    ],
  },
  {
    slug: 'ulsan-youth-savings-account',
    title: '울산 청년내일저축계좌, 저축하면 정부가 최대 3배 얹어줘요',
    hook: '3년 모으면 원금의 몇 배가 되는 국가 매칭 적금',
    categoryLabel: '자산',
    orgName: '울산광역시',
    publishedDate: '2026-09-23',
    startDate: null,
    deadlineDate: null,
    intro:
      '저축하는 만큼 정부가 최대 3배까지 얹어주는 적금이 있다는 거, 알고 있었나요? 저소득 근로청년의 자산형성을 돕는 전국 단위 제도예요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**차상위 이하**(생계·주거·교육급여 수급가구 및 차상위가구)라면 **만 15~39세**, **차상위 초과**(개인 월소득 50만원 초과~250만원 이하, 가구소득 중위소득 100% 이하)라면 **만 19~34세** 근로청년이 대상이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**차상위 이하**는 본인이 매달 10만원을 저축하면 정부가 **1:3 비율로 월 30만원**을 매칭해줘요. **차상위 초과**는 본인 10만원에 정부가 **1:1로 월 10만원**을 매칭해줘요. **3년간 꾸준히 적립하면 만기에 공제액과 적립금 전액**을 받을 수 있고, 가입 기간 동안 금융교육·재무상담도 함께 받아요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '지속적인 근로와 자립역량교육 이수, 자금사용계획서 제출이 조건이에요. 자세한 신청 방법은 거주지 행정복지센터나 관련 공고를 확인하는 게 가장 정확해요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '매달 조금씩이라도 저축은 하고 싶은데 목돈 만들기가 막막했던 저소득 근로청년이라면 이만한 재테크가 없어요. 차상위 이하라면 원금의 4배까지 만들 수 있는 셈이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 소득 기준(차상위 이하/초과)에 해당하나요? ✅ 매달 10만원씩 3년간 꾸준히 저축할 수 있나요? ✅ 지속적으로 근로 중인가요? ✅ 자립역량교육 이수 계획을 세워뒀나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '울산시 청년정책 공고', url: 'https://www.ulsan.go.kr/s/ulsanyouth/bbs/view.do?bbsId=BBS_0000000000000316&mId=008001001000000000&dataId=56158' },
    ],
  },
  {
    slug: 'busan-youth-dodream-center',
    title: '부산 청년두드림센터, 1:1 취업 상담부터 스터디 공간까지',
    hook: '취업 준비, 혼자 하지 말고 전담 상담사랑 같이 해요',
    categoryLabel: '취업',
    orgName: '부산광역시 청년산학국 청년정책과',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '부산에서 취업 준비 중이라면, 혼자 끙끙대지 말고 청년두드림센터의 전담 상담 서비스를 이용해보세요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 18~39세** 부산 청년이면 이용할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '오픈공간, 학습공간, 대회의실, 스터디룸 등 취업 준비를 위한 **공간을 무료로 이용**할 수 있어요. **\'드리미케어\'**라는 전주기 맞춤형 취업 상담을 통해 구직 단계별 1:1 전담 매칭을 받을 수 있고, 입사지원서·자기소개서 지도와 실전 모의면접까지 진행해줘요. 분기별로 맞춤형 취업지원 프로그램도 운영돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**\'청년부산잡스\'** 홈페이지에서 상담을 예약하면, 대면 또는 유선으로 상담이 진행돼요. 예약 시 기초상담 질문지를 입력하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '이력서·자기소개서를 봐줄 사람이 없어서 답답했던 부산 취준생, 조용히 공부할 공간이 필요했던 청년이라면 활용해보세요. 상담부터 공간까지 한 번에 해결돼요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 18~39세 부산 청년인가요? ✅ 청년부산잡스 홈페이지에서 상담을 예약해봤나요? ✅ 어떤 공간(학습공간, 스터디룸 등)이 필요한지 정해뒀나요? ✅ 자기소개서나 모의면접 등 원하는 상담 주제를 정리해뒀나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '청년부산잡스', url: 'https://young.busan.go.kr/index.nm?menuCd=34' },
    ],
  },
  {
    slug: 'artist-activity-savings-account',
    title: '청년예술인 예술활동 적립계좌, 2년 모으면 최대 240만원 더',
    hook: '예술활동증명만 있다면, 적금에 정부지원금이 그대로 얹어져요',
    categoryLabel: '자산',
    orgName: '문화체육관광부',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '예술활동증명을 받은 청년 예술인이라면, 매달 적금 넣는 만큼 정부가 그대로 지원금을 얹어주는 제도가 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '「예술인복지법」상 **예술활동증명을 완료한 만 18~39세 예술인**(신청일 기준 유효자)이 대상이에요. 국내 거주 내국인·재외국민만 가능하고 외국인은 참여할 수 없어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**월 10만원씩 24개월간 적금을 넣으면, 저축한 금액만큼 정부지원금을 똑같이 지원**받아요(1인 최대 240만원). 만기에 일시로 지급받는 방식이고, 24개월 중 총 4회 예술활동 확인내역서를 제출해야 해요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**예술인경력정보시스템(kawfartist.kr)**에서 예술활동증명 유효 여부를 먼저 확인한 뒤, 공지된 신청기간 안에 온라인으로 적립계좌를 신청하면 돼요. 심사를 거쳐 승인되면 문자로 통보되고, 지정 기간 안에 협력 은행에서 비대면으로 적금 계좌를 개설하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '예술활동증명을 이미 받아뒀는데 목돈 마련이 막막했던 청년 예술인이라면 딱이에요. 매달 10만원씩 24개월 모으면 그대로 두 배가 되는 구조예요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 예술인경력정보시스템에서 예술활동증명이 유효한가요? ✅ 만 18~39세인가요? ✅ 매달 10만원씩 24개월간 납입할 여력이 있나요? ✅ 성희롱·성폭력 예방교육 수료증을 준비했나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '예술활동준비금·적립계좌', url: 'https://www.artloan.kr/notice/savingsAccount.do' },
    ],
  },
  {
    slug: 'cheongsong-local-talent-incentive',
    title: '청송군 지역인재채용 인센티브, 채용한 회사에 월급 절반 지원',
    hook: '청송에 사는 인재를 뽑으면, 회사가 월급의 절반을 지원받아요',
    categoryLabel: '취업',
    orgName: '경상북도 청송군 기획감사실',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '청송에 사는 청년이 지역 기업에 채용되면, 회사가 그 월급의 절반을 지원받을 수 있어요 — 즉 지역 인재를 뽑을 이유가 하나 더 생기는 거예요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**청송군 소재 상시근로자 3인 이상, 고용보험 가입** 업체가 신청 대상이에요(소비·향락업, 공공기관, 학교, 금융업, 언론, 근로자 공급업체 등은 제외). 채용되는 근로자는 **채용일로부터 1개월 전 기준 청송군에 주민등록**돼 있어야 해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**월 임금의 50%(최대 100만원)**를 업체당 최대 3명까지, **총 12개월(6개월분씩 2회)** 지원받아요(상시근로자 3~10인 미만이면 2명, 10인 이상이면 3명까지). 채용 후 **6개월 이상 고용을 유지**해야 해요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**신규 근로자를 채용한 달의 다음 달 15일까지** 청송군청 기획감사실 행복일자리팀(☎054-870-6454)에 직접 방문해서 신청하면 돼요. 참여 신청서, 사업자등록증 사본, 4대 사회보험 가입자 명부, 고용보험자격이력내역서, 근로계약서 등을 챙기면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '청송에 사는데 지역에서 일자리를 찾고 있는 청년이라면, 채용 담당자에게 이 제도를 알려주는 것도 방법이에요. 회사 입장에서 청송 거주자를 뽑을 유인이 커지는 제도라, 구직 시 경쟁력으로 활용할 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 청송군에 주민등록이 돼 있나요(채용 1개월 전 기준)? ✅ 지원 대상 업종이 아닌 회사인가요(소비·향락업 등 제외)? ✅ 정규직으로 채용됐거나 채용될 예정인가요? ✅ 회사가 이 제도를 알고 있나요(모른다면 알려주세요)?',
        ],
      },
    ],
    sourceLinks: [
      { label: '청송군청 홈페이지', url: 'https://www.cs.go.kr' },
    ],
  },
  {
    slug: 'pyeongtaek-employment-success-support',
    title: '평택청년 취업성공 지원사업, 자소서부터 면접까지 1:1 컨설팅',
    hook: '자기소개서 첨삭, 모의면접까지 온라인 1:1로 받아요',
    categoryLabel: '취업',
    orgName: '경기도 평택시 기획항만경제실',
    publishedDate: '2026-09-23',
    startDate: '2026-03-01',
    deadlineDate: '2026-11-30',
    intro:
      '자기소개서 첨삭이나 모의면접, 혼자 준비하기 막막했다면 평택시가 1:1 온라인 컨설팅으로 도와줘요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '평택시에 **거주하거나 활동 중인 만 19~39세** 청년이면 신청할 수 있어요. 총 **50명**(1기수 10명, 5기수 운영)을 모집해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**자기소개서 작성 및 면접 교육** 정기 프로그램(3기수), **자기소개서 심화특강**(작성법·첨삭, 1기수), **면접 심화특강**(스피치·면접전략, 모의면접·피드백, 1기수)으로 나뉘어 운영돼요. 모든 교육은 **1:1 온라인 컨설팅(2시간)**으로 진행돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '모집 포스터의 **QR코드**로 접속해서 신청서를 제출하면 돼요. 사업 기간은 **2026년 3월부터 11월까지**예요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '자기소개서를 써놨는데 누가 좀 봐줬으면 싶었던 평택 청년, 면접 앞두고 실전 연습이 필요한 구직자라면 신청해보세요. 1:1로 진행되니 내 상황에 맞는 피드백을 받을 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 평택시 거주 또는 활동 중인 만 19~39세인가요? ✅ 자기소개서 첨삭과 모의면접 중 필요한 걸 정했나요? ✅ 모집 포스터의 QR코드를 확인했나요? ✅ 온라인 컨설팅 진행 가능한 환경(PC·인터넷)이 있나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '평택시청 공고 보기', url: 'https://www.pyeongtaek.go.kr/pyeongtaek/board/post/view.do?mid=0401010000&bcIdx=41&idx=349793' },
    ],
  },
  {
    slug: 'jeju-shelter-exit-independence-allowance',
    title: '제주 청소년쉼터 퇴소 자립지원수당, 매달 50만원씩 최대 5년',
    hook: '쉼터를 나온 뒤에도, 제주도가 매달 자립을 응원해줘요',
    categoryLabel: '복지',
    orgName: '제주특별자치도',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '청소년쉼터를 퇴소했거나 자립지원관 사례관리를 받았던 청년이라면, 제주도가 매달 자립지원수당을 지급해주는 제도가 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**청소년쉼터 퇴소일 또는 청소년자립지원관 사례 종료일로부터 5년 이내**인 사람 중, **만 18세 이후 퇴소**했고, 퇴소일 기준 과거 3년 동안 쉼터 입소나 사례관리를 **2년 이상**(직전 6개월은 연속으로) 받은 경우가 대상이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**매월 50만원을 현금으로**(본인 명의 계좌) 지급받아요. **퇴소일로부터 최대 60개월(5년)**까지 지원되고요. 단, 보호종료아동 자립수당(아동복지법)이나 성폭력 피해자 보호시설 퇴소자립지원수당을 이미 받고 있다면 중복 지원은 안 돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '최종 퇴소한 쉼터(또는 자립지원관)의 추천을 받아 행정시에 신청하면, 지급 결정 후 쉼터·자립지원관의 사례관리가 이어지는 방식이에요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '청소년쉼터를 퇴소했지만 아직 경제적 기반이 불안정한 제주 청년이라면 꼭 확인해보세요. 최종 퇴소한 쉼터나 자립지원관에 먼저 문의하는 게 가장 빠른 방법이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 18세 이후 청소년쉼터를 퇴소했거나 자립지원관 사례관리가 종료됐나요? ✅ 퇴소일로부터 5년 이내인가요? ✅ 과거 3년 중 2년 이상(직전 6개월 연속) 보호받은 이력이 있나요? ✅ 다른 자립수당을 중복해서 받고 있지 않나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '제주청년드림 정책상세', url: 'https://jejuyouthdream.com/policy/detail/98' },
    ],
  },
  {
    slug: 'gwangju-work-experience-dream-20th',
    title: '광주청년 일경험드림 20기, 직접 일해보고 급여까지 받아요',
    hook: '자기주도형 5개월, 집중참여형 3개월 — 현장에서 진짜 경험 쌓기',
    categoryLabel: '취업',
    orgName: '전남광주통합특별시',
    publishedDate: '2026-09-23',
    startDate: '2026-08-01',
    deadlineDate: '2026-12-31',
    intro:
      '이론 말고 진짜 현장 경험이 필요한 광주 청년이라면, 실제 사업장에서 일하며 급여까지 받는 이 프로그램을 살펴보세요. 벌써 20기째 운영 중이에요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '지역 **미취업 청년**(만 19~39세)이면 신청할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**자기주도형**(5개월, 주 25시간, 월 131시간 — 직무 탐색과 자기계발 병행)과 **집중참여형**(3개월, 주 40시간, 월 209시간 — 심화 실무 경험) 중 원하는 트랙을 골라 참여해요(희망 사업장의 모집 트랙에 따라 지원 가능). 급여는 **2026년 광주광역시 생활임금(시급 13,303원)**이 적용돼요. 직무교육과 연계활동도 함께 지원받아요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**광주청년 일경험드림 사업 누리집**(gjyouthdream.com)에서 회원가입 후 면접신청서(자기소개서)를 작성해서 온라인으로 신청하면 돼요. 이후 \'드림만남의 날\'에 시청을 방문해 희망 사업장과 상담하고 현장면접을 거쳐 최종신청서를 제출하는 방식이에요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '스펙보다 진짜 실무 경험이 필요한 광주 미취업 청년이라면 눈여겨볼 만해요. 일하는 동안 급여도 받으면서 실제 직무 경험을 쌓을 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 광주 거주 미취업 청년(만 19~39세)인가요? ✅ 자기주도형·집중참여형 중 어떤 트랙이 맞는지 정했나요? ✅ gjyouthdream.com에서 회원가입하고 자기소개서를 준비했나요? ✅ \'드림만남의 날\' 현장면접에 참여할 수 있나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '광주청년 일경험드림 누리집', url: 'http://gjyouthdream.com' },
    ],
  },
  {
    slug: 'ulsan-teen-single-parent-support',
    title: '울산 청소년한부모 자립 지원, 양육비부터 검정고시까지',
    hook: '어린 나이에 부모가 된 한부모, 울산시가 자립을 지원해요',
    categoryLabel: '복지',
    orgName: '울산광역시',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '어린 나이에 홀로 아이를 키우는 부담은 훨씬 크죠. 울산시가 청소년한부모의 자립을 위해 양육비부터 학업까지 지원해줘요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**기준 중위소득 65% 이하**인 청소년 한부모 가구(모 또는 부의 나이가 **만 24세 이하**)가 대상이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**자녀 아동양육비 월 37만원**(영아 0~1세는 월 40만원), **자립촉진수당 월 10만원**, **검정고시학습비 연 154만원 이내**를 지원받아요. 총 37명(아동양육비 33명, 자립촉진 2명, 검정고시 지원 2명)이 대상이에요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '거주지 구·군을 통해 보조금이 교부되는 방식이에요. 자세한 신청 절차는 거주지 관할 구·군 담당 부서에 문의하는 게 가장 정확해요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '어린 나이에 홀로 아이를 키우며 학업까지 병행하려는 울산의 청소년한부모라면 꼭 확인해보세요. 양육비와 학업 지원을 동시에 받을 수 있는 흔치 않은 제도예요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 기준 중위소득 65% 이하인가요? ✅ 모 또는 부가 만 24세 이하인가요? ✅ 검정고시를 준비 중이라면 학습비 지원도 함께 알아봤나요? ✅ 거주지 구·군 담당 부서에 문의해봤나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '울산시 청년정책 공고', url: 'https://www.ulsan.go.kr/s/ulsanyouth/bbs/view.do?bbsId=BBS_0000000000000316&mId=008001001000000000&dataId=56194' },
    ],
  },
  {
    slug: 'ulsan-self-employed-childcare-support',
    title: '울산 자영업자 아이와 함께 행복업, 대체인력 인건비 지원',
    hook: '출산·육아로 가게 비우는 동안, 대체인력 인건비를 지원받아요',
    categoryLabel: '취업',
    orgName: '울산광역시',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '출산·육아 때문에 가게를 비워야 하는 소상공인이라면, 대체인력을 구하는 데 드는 비용을 울산시가 지원해줘요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '「소상공인기본법」상 **소상공인**으로, 거주지와 사업장 주소지가 **모두 울산광역시**이고, 사업신청일 기준 **만 2세 미만 자녀**가 있으며, 개업일로부터 **6개월 이상 영업 중**인 경우가 대상이에요(총 20개사, 직전 연도 매출액이 일정 기준을 넘으면 우선순위 적용).',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '출산·육아로 인한 공백을 메울 **대체인력의 인건비를 월 100만원씩 6개월간(총 600만원)** 지원받아요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**대체인력을 채용한 뒤 매 익월 1개월 단위로 청구**하는 방식이에요. 수행기관인 **울산경제일자리진흥원**을 통해 신청하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '출산을 앞두고 가게 운영을 어떻게 할지 고민 중인 울산 자영업자라면 미리 알아두세요. 대체인력을 구하는 부담을 크게 줄일 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 거주지와 사업장이 모두 울산인가요? ✅ 만 2세 미만 자녀가 있나요? ✅ 개업 후 6개월 이상 영업 중인가요? ✅ 대체인력 채용 계획을 세워뒀나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '울산경제일자리진흥원', url: 'https://www.ubpi.or.kr/main/' },
    ],
  },
  {
    slug: 'gwangju-startup-leap-package',
    title: '광주 창업도약패키지, 사업화 자금 최대 2억원 지원',
    hook: '도약기 창업기업이라면, 후속투자 유치까지 이어지는 지원',
    categoryLabel: '취업',
    orgName: '전남광주통합특별시',
    publishedDate: '2026-09-23',
    startDate: '2026-04-01',
    deadlineDate: '2027-01-01',
    intro:
      '유망한 창업 아이템이 있는데 다음 단계로 넘어갈 자금이 필요하다면, 이 사업화 지원 프로그램을 살펴보세요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '유망한 기술창업 아이템을 보유한 **도약기 창업기업**이면 신청할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**사업화 자금으로 평균 1.2억원(최대 2억원)**을 지원받아요(총사업비는 정부지원금 + 자기부담금, 소재지에 따라 부담 비율이 달라요). 후속투자 유치, 글로벌 시장 진출·확대 같은 공통 프로그램과 BM·기술 고도화, 마케팅·판로, 네트워킹 등 자율 프로그램도 함께 지원받아요. 협약 종료 후 최종 성과평가에서 \'우수\' 이상을 받으면 기술보증기금 보증 조건 충족 시 추천도 받을 수 있어요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**K-Startup 누리집에서 온라인으로 신청·접수**하면 돼요(실명인증·기업인증 필요). 요건검토(2월) → 서류평가(3월) → 발표평가(3~4월) → 최종 선정(4월) 순서로 진행돼요. 사업신청서, 사업계획서, 대표자 신분증·동의서, 사업자등록증명을 준비하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '이미 초기 창업 단계는 지났고 다음 단계로 도약할 자금이 필요한 광주 창업기업이라면 꼭 도전해보세요. 단순 자금 지원을 넘어 후속투자·글로벌 진출까지 이어지는 프로그램이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 유망한 기술창업 아이템을 갖춘 도약기 기업인가요? ✅ 사업계획서를 준비할 수 있나요? ✅ K-Startup 누리집에서 실명·기업 인증을 마쳤나요? ✅ 2~4월 평가 일정에 맞춰 준비할 수 있나요?',
        ],
      },
    ],
    sourceLinks: [],
  },
  {
    slug: 'mental-health-counseling-voucher',
    title: '정신건강 심리상담 바우처, 최대 8회 상담을 국가가 지원',
    hook: '우울·불안으로 힘들다면, 소득에 따라 상담료 대부분을 지원받아요',
    categoryLabel: '복지',
    orgName: '보건복지부',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '우울이나 불안으로 심리상담이 필요한데 비용이 부담됐다면, 전국민 마음투자 지원사업으로 상담료 대부분을 지원받을 수 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '나이·소득 기준은 없고, ①정신건강복지센터·대학교상담센터·청소년상담복지센터·Wee센터 등에서 상담이 필요하다고 인정받았거나, ②정신의료기관에서 우울·불안으로 상담이 필요하다는 소견을 받았거나, ③국가건강검진의 우울증 선별검사(PHQ-9)에서 10점 이상이 나왔거나, ④자립준비청년·보호연장아동이거나, ⑤재난피해자(5년 이내)인 경우 등이 대상이에요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '전문 심리상담 서비스를 **총 8회(1회 최소 50분)** 이용할 수 있는 바우처를 받아요(바우처 생성일로부터 120일간 사용, 연장 불가, 당해연도 1회만 신청 가능). 상담사 등급에 따라 1회당 8만원(1급) 또는 7만원(2급)인데, **본인부담률은 소득에 따라 0~50%**로 차등이에요(중위소득 70% 이하는 0%, 기초생활수급자·차상위·자립준비청년·법정한부모·재난피해자는 0%).',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '주민등록상 또는 실거주지 **읍·면·동 행정복지센터를 방문**하거나 **복지로 홈페이지**(로그인 → 서비스 신청 → 복지급여 신청 → 전국민 마음투자 지원사업)에서 온라인으로 신청하면 돼요. 사회보장급여 신청서, 이용자 준수사항 동의서, 그리고 해당하는 증빙서류(의뢰서, 진단서, 건강검진 결과통보서 등)를 준비하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '마음이 힘든데 상담료 때문에 미뤄왔던 사람이라면 꼭 확인해보세요. 나이·소득 제한이 없어서 생각보다 폭넓게 신청할 수 있고, 저소득층은 본인부담금 없이 받을 수도 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 우울·불안 등으로 상담이 필요한 상태인가요? ✅ 5가지 인정 기준 중 하나에 해당하나요(기관 의뢰, 진단서, 건강검진 결과 등)? ✅ 당해연도에 이 바우처를 아직 신청한 적 없나요? ✅ 행정복지센터 방문이나 복지로 온라인 신청 중 편한 방법을 정했나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '사회서비스 전자바우처', url: 'https://www.socialservice.or.kr' },
    ],
  },
  {
    slug: 'pyeongtaek-youth-center-swimpyo',
    title: '평택시 청년쉼표, 연습실부터 상담까지 청년 전용 공간',
    hook: '댄스·밴드 연습실, 스터디룸, 공유부엌까지 무료로 대관해요',
    categoryLabel: '복지',
    orgName: '경기도 평택시 기획항만경제실',
    publishedDate: '2026-09-23',
    startDate: '2026-01-02',
    deadlineDate: '2026-12-31',
    intro:
      '평택 청년이라면 누구나 쓸 수 있는 전용 공간, 청년쉼표를 소개해요. 연습실부터 상담까지 다 모여있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**평택시에 생활기반을 둔 만 19~39세 청년**이면 누구나 이용할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '약 843㎡(256평) 규모, 지하1층~지상3층 건물에 **댄스·밴드연습실 등 예술창작공간, 스터디룸, 공유부엌**을 대관할 수 있어요. 진로·취업·심리 상담과 취미·문화·여가·취업 역량강화 프로그램도 운영되고, 청년의 날·연말행사·동아리 활동도 지원해요. **평일 오전 10시~오후 10시, 토요일 오전 10시~오후 5시** 운영해요(일요일·공휴일·근로자의 날 휴무).',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '평택시 청년지원센터(평택1로 9번길 23) 홈페이지에서 공간 대관이나 프로그램 참여를 신청하면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '연습할 공간이 마땅치 않았던 평택 청년 아티스트, 조용히 공부할 곳이 필요했던 취준생이라면 활용해보세요. 진로·심리 상담까지 한 공간에서 다 되는 게 장점이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 평택시에 생활기반(거주·활동)을 두고 있나요? ✅ 필요한 공간(연습실, 스터디룸 등)을 정했나요? ✅ 평일·토요일 운영시간을 확인했나요? ✅ 진로·취업·심리 상담 중 관심 있는 프로그램이 있나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '평택시 청년지원센터', url: 'https://www.pyeongtaek.go.kr/ptyc/main.do' },
    ],
  },
  {
    slug: 'taean-social-service-worker-insurance',
    title: '태안 사회복무요원 보험, 신청 없이 이미 가입돼있어요',
    hook: '사회복무요원이라면, 다치거나 사고 나도 보험이 있다는 걸 기억하세요',
    categoryLabel: '복지',
    orgName: '태안군 안전관리과',
    publishedDate: '2026-09-23',
    startDate: '2026-01-17',
    deadlineDate: '2027-01-17',
    intro:
      '태안군에서 사회복무요원으로 복무 중이라면, 이미 공무상 사고를 대비한 보험에 가입돼있다는 사실을 알아두면 좋아요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**태안군 소속 사회복무요원**이면 자동으로 가입돼요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '**공무상 의료비·재해보상금 보험**과 **대인대물배상책임 보험**에 가입돼있어요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '별도 신청 절차 없이 **태안군 소속 사회복무요원이면 자동으로 가입**돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '태안군에서 사회복무 중인 청년이라면 몰라도 상관없지만, 막상 공무 중 사고가 생겼을 때 이 보험이 있다는 걸 알아두면 대처가 훨씬 수월해요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 태안군 소속 사회복무요원인가요? ✅ 공무 중 사고가 났을 때 보상 절차를 문의할 부서를 알고 있나요? ✅ 소속 기관에 자세한 보장 범위를 확인해봤나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '충남청년포털 공고 보기', url: 'https://youth.chungnam.go.kr/web/main/customSupp/M030-04/view?bizId=A20260401LC000000000003139' },
    ],
  },
  {
    slug: 'borderline-intelligence-youth-support',
    title: '경계선지능청년지원, 참여수당 20만원 받으며 자립 준비',
    hook: '법적 장애는 아니지만 어려움을 겪는 청년들을 위한 맞춤 지원',
    categoryLabel: '복지',
    orgName: '고용노동부',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '법적으로는 지적장애에 해당하지 않지만 일상에서 크고 작은 어려움을 겪는 \'경계선 지능\' 청년들을 위한 전국 단위 지원사업이 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 18~39세 경계선 지능 청년**이면 대상이에요. 공모를 통해 선정된 지자체·운영기관이 이 청년들을 발굴해서 지원해요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '참여자에게 **참여수당 20만원**을 지급하고, 지자체에는 1인당 **사업비 80만원**을 지원해서 상담, 기초소양, 구직기술 습득 등 맞춤형 프로그램을 운영해요. 프로그램이 끝나면 국민취업지원제도, 청년 일경험 지원사업 등으로 **연계 지원**까지 이어져요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**선정된 지자체·운영기관을 통해 신청**하면 돼요. 구체적인 사업 기간은 선정된 지자체·운영기관마다 다르니, 거주지 고용센터나 관련 기관에 문의하는 게 가장 정확해요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '그동안 기존 복지 제도의 사각지대에 있다고 느꼈던 경계선 지능 청년이나 그 가족이라면 꼭 확인해보세요. 상담부터 취업 연계까지 단계별로 지원받을 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 18~39세인가요? ✅ 거주 지역에 이 사업으로 선정된 지자체·운영기관이 있는지 확인했나요? ✅ 참여수당과 함께 어떤 프로그램(상담, 구직기술 등)을 받고 싶은지 생각해봤나요? ✅ 프로그램 종료 후 국민취업지원제도 등 연계 지원도 관심 있나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '고용노동부 정책 안내', url: 'https://www.moel.go.kr/policyitrd/policyItrdView.do?policy_itrd_sn=413' },
    ],
  },
  {
    slug: 'gwangju-startup-residence-facility',
    title: '광주 창업하여家, 창업기업 대표를 위한 저렴한 거주+업무 공간',
    hook: '월세 20만원 안팎으로 사무실 겸 주거 공간을 해결해요',
    categoryLabel: '취업',
    orgName: '전남광주통합특별시',
    publishedDate: '2026-09-23',
    startDate: '2026-03-01',
    deadlineDate: '2026-12-31',
    intro:
      '창업 초기, 사무실 구하랴 살 곳 구하랴 이중으로 돈이 들었다면 — 광주시가 업무와 주거를 한 번에 해결해주는 시설을 운영하고 있어요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**초기창업자 및 예비창업자**면 신청할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '광주 북구 저불로73번길에 있는 4층 다가구 주택(거주시설 2~3층 7호, 공용시설 2층 2호)을 저렴하게 빌려줘요. 호실별로 **보증금 약 420만원, 월 임대료 17만~20만원대**로 전용 53~60㎡ 규모예요. 입주 선정평가 순위에 따라 호실이 배분돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**우편 접수만 가능**해요(마감시간 내 도착분에 한함). 광주광역시 동구 동계천로 150(동명동) 『I-PLEX광주』 2층 202호로 서류를 보내면 돼요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '사무실과 살 곳을 따로 구하느라 이중으로 부담됐던 광주 초기·예비창업자라면 이 시설로 두 마리 토끼를 한 번에 잡을 수 있어요. 시세보다 훨씬 저렴한 임대료가 매력적이에요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 초기창업자 또는 예비창업자인가요? ✅ 원하는 호실 규모(53~60㎡)를 확인했나요? ✅ 우편으로 서류를 보낼 준비가 됐나요(마감시간 내 도착 필수)? ✅ 입주 선정평가 기준을 미리 확인했나요?',
        ],
      },
    ],
    sourceLinks: [],
  },
  {
    slug: 'dangjin-youth-growth-project',
    title: '당진 청년성장프로젝트, 미취업 청년을 위한 맞춤 프로그램',
    hook: '지역사회 기반 프로그램으로 취업 정책까지 연계해줘요',
    categoryLabel: '취업',
    orgName: '충청남도 당진시 지역경제과',
    publishedDate: '2026-09-23',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro:
      '당진에서 아직 자리를 못 잡은 청년이라면, 지역사회 기반의 맞춤형 프로그램과 취업 정책 연계까지 지원하는 이 사업을 살펴보세요.',
    sections: [
      {
        heading: '누가 지원할 수 있을까?',
        paragraphs: [
          '**만 15~34세** 미취업 청년이면 신청할 수 있어요.',
        ],
      },
      {
        heading: '지원 혜택 총정리!',
        paragraphs: [
          '지역사회 중심의 다양한 프로그램을 제공받고, **청년고용정책과 연계**돼요. 연간 최대 **500명** 규모로 운영돼요.',
        ],
      },
      {
        heading: '신청은 이렇게 하면 돼요',
        paragraphs: [
          '**온라인(구글폼)**으로 수시 신청할 수 있어요. 자세한 프로그램 일정은 당진시 홈페이지(narae.do)나 충남청년포털 공고를 확인하는 게 정확해요.',
        ],
      },
      {
        heading: '이런 분이라면 특히 주목하세요',
        paragraphs: [
          '아직 취업 방향을 못 정한 당진 청년, 지역 안에서 지원받을 수 있는 프로그램을 찾고 있는 청년이라면 확인해보세요. 수시 모집이라 생각날 때 바로 신청할 수 있어요.',
        ],
      },
      {
        heading: '신청 전 체크리스트 ✅',
        paragraphs: [
          '✅ 만 15~34세 미취업 청년인가요? ✅ 당진시 거주자인가요? ✅ 구글폼으로 신청할 준비가 됐나요? ✅ 어떤 프로그램에 관심 있는지 충남청년포털에서 확인해봤나요?',
        ],
      },
    ],
    sourceLinks: [
      { label: '충남청년포털 공고 보기', url: 'https://youth.chungnam.go.kr/web/main/customSupp/M030-02/view?bizId=A20260403LC000000000003175' },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
