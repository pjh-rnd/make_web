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
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
