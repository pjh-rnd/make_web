// "/blog" 서브페이지용 콘텐츠 — moa-app(모바일 앱)의 Supabase policy_ai_summaries 테이블(사람이
// 직접 정책 원문을 읽고 쓴 요약, scripts/policyAiSummaries.js 참고)에서 실제 정책 10건을 골라
// 블로그 글 형태로 다듬어 옮겨온 것. 정책 데이터 자체가 자주 안 바뀌는 편이고, 이건 검색엔진에
// 색인될 "콘텐츠"라서 매 요청마다 Supabase를 다시 조회하기보다 이렇게 코드에 고정해두는 편이
// 안정적임(빌드 시점 정적 페이지로 만들기도 좋음). 새 글을 추가하고 싶으면 이 배열에 항목을
// 추가하면 됨 — slug는 URL(/blog/{slug})에 그대로 쓰이니 영문 소문자+하이픈으로.
export type BlogPost = {
  slug: string;
  title: string; // 검색 노출용 글 제목(정책명 그대로가 아니라 검색 의도에 맞게 다듬음)
  categoryLabel: string;
  orgName: string;
  publishedDate: string; // 'YYYY-MM-DD' — 글이 이 배열에 추가된 날짜
  startDate: string | null;
  deadlineDate: string | null;
  intro: string;
  target: string[];
  support: string[];
  applyMethod: string[];
  documents: string[];
  sourceLinks: { label: string; url: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'national-scholarship-work-study',
    title: '국가근로장학금 신청 방법과 자격 조건 (2026년 2학기)',
    categoryLabel: '교육',
    orgName: '한국장학재단',
    publishedDate: '2026-08-25',
    startDate: '2026-08-12',
    deadlineDate: '2026-09-09',
    intro: '대학생의 안정적인 학업여건 조성과 취업역량 제고를 위한 근로 장학금이에요. 교내·교외에서 일하면서 시급을 받는 방식이라 등록금이나 생활비 부담을 덜고 싶은 대학생에게 도움이 돼요.',
    target: [
      '대한민국 국적, 국내 대학 재학생',
      '직전학기 성적 70점(C학점) 이상 — 장애인·자립준비청년(구 보호종료아동)은 예외 가능',
      '학자금 지원구간 9구간 이하 — 학부모 실·폐업 등 긴급 경제위기가구, 봉사/취업연계유형 근로학생은 예외 가능',
    ],
    support: [
      '교내근로 시급 10,320원',
      '교외근로 시급 12,790원(장애대학생 봉사유형도 동일 적용)',
    ],
    applyMethod: [
      '학생신청: 2026.8.12(수) 9시 ~ 9.9(수) 18시',
      '서류제출·가구원 동의: 2026.8.12(수) ~ 9.16(수) 18시',
      '한국장학재단 누리집(www.kosaf.go.kr)·모바일 앱에서 신청(24시간 가능, 마감일 제외)',
      '문의: 한국장학재단 상담센터 1599-2290',
    ],
    documents: ['신청 2~3일 후 누리집·앱에서 제출 필요 서류 확인 후 온라인 제출'],
    sourceLinks: [{ label: '한국장학재단 신청 바로가기', url: 'https://www.kosaf.go.kr/' }],
  },
  {
    slug: 'national-employment-support-program',
    title: '국민취업지원제도, 청년 구직촉진수당 얼마나 받을 수 있을까',
    categoryLabel: '취업',
    orgName: '고용노동부 · 전국 고용센터',
    publishedDate: '2026-08-25',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro: "저소득 구직자·청년·중장년층 등 취업취약계층에게 취업지원서비스와 소득지원을 함께 주는 '한국형 실업부조' 제도예요. 전국 고용센터에서 상시로 신청받는 국가 사업이라 지역과 상관없이 신청할 수 있어요.",
    target: ['만 15~69세 저소득 구직자·청년·중장년층 등 취업취약계층'],
    support: [
      '공통: 심층상담, 직업훈련, 일자리정보 제공 등 취업지원서비스',
      'Ⅰ유형: 취업활동계획 이행 시 월 60~100만원(부양가족 1인당 10만원 추가), 6개월 지원',
      'Ⅱ유형: 취업활동비용 최대 35만원 지원',
      '취업성공수당: 중위소득 60% 이하 등 특정계층 최대 150만원',
    ],
    applyMethod: [
      '오프라인: 거주지 관할 고용센터 방문',
      '온라인: 고용24 홈페이지(work24.go.kr) - 취업지원 - 국민취업지원제도',
    ],
    documents: ['소득·재산·취업경험에 따라 참여요건(Ⅰ·Ⅱ유형)이 갈리므로 신청 전 고용센터 상담 권장'],
    sourceLinks: [{ label: '고용24에서 신청하기', url: 'https://www.work24.go.kr/cm/main.do' }],
  },
  {
    slug: 'jeju-1000-won-breakfast',
    title: "제주 대학생 '천원의 아침밥', 어느 학교에서 어떻게 먹을 수 있나",
    categoryLabel: '복지',
    orgName: '제주특별자치도',
    publishedDate: '2026-08-25',
    startDate: '2026-04-01',
    deadlineDate: '2026-12-31',
    intro: '고물가 시대에 대학생이 질 좋은 아침 식사를 저렴하게 먹을 수 있도록 학교에 비용을 지원하는 사업이에요. 제주대·제주한라대·제주관광대 재학생이면 학교 구내식당에서 단돈 천원에 아침을 먹을 수 있어요.',
    target: ['제주대·제주한라대·제주관광대 재학생'],
    support: ['도내 대학(제주대, 한라대, 관광대) 구내식당 이용 시 1천원에 아침 식사 가능'],
    applyMethod: [
      '대학별 운영기간·시간이 다름',
      '제주대: 월~토(일요일·공휴일 제외), 학기 중 7:30~9:20 / 방학 중 8:00~9:30',
      '한라대: 월~금(토·일·공휴일·방학 제외), 학기 중 8:00~9:30',
      '관광대: 월~목(금·토·일·공휴일·방학 제외), 학기 중 8:00~11:00',
      '학생 인증 후 키오스크 또는 수기대장으로 이용',
    ],
    documents: ['원문에 별도 명시 없음(학생증 등으로 재학 확인)'],
    sourceLinks: [{ label: '제주특별자치도 홈페이지', url: 'https://www.jeju.go.kr/index.htm' }],
  },
  {
    slug: 'busan-student-loan-interest-support',
    title: '부산 대학생 학자금 대출이자 지원, 신청 전 마감일부터 확인하세요',
    categoryLabel: '교육',
    orgName: '부산광역시 청년산학국 지산학협력과',
    publishedDate: '2026-08-25',
    startDate: '2026-07-06',
    deadlineDate: '2026-08-28',
    intro: '학자금대출 상환부담을 덜어주려고 부산시가 대학(원)생·졸업생의 이자만큼 원금을 대신 갚아주는 사업이에요. 부산시 공식 페이지 기준 마감일이 8월 28일로, 온통청년 원본 API에 적힌 8월 31일보다 3일 더 빠르니 신청 예정이라면 서둘러야 해요.',
    target: [
      '부산지역 소재 대학교 대학(원)생(재학·휴학 중)',
      '또는 부산지역 대학교 졸업 후 2년 이내 미취업 부산 거주 졸업생',
      '최대 2,000명',
    ],
    support: ['2025.7~2026.6 기간에 발생한 학자금대출 이자 금액만큼 원금 상환'],
    applyMethod: [
      '접수기간: ~2026.8.28(금) — 부산시 공식 안내 기준(온통청년 API 원문은 8.31로 나와 있으나 실제 공식 페이지·언론 보도와 확인한 정확한 마감일임)',
      '원문에 구체적 신청 방법이 별도로 안내돼 있지 않아 아래 관련 링크에서 확인이 필요해요',
    ],
    documents: ['원문에 별도 명시 없음'],
    sourceLinks: [
      { label: '부산청년플랫폼', url: 'https://young.busan.go.kr/index.nm?menuCd=49' },
      { label: '한국장학재단', url: 'https://www.kosaf.go.kr' },
    ],
  },
  {
    slug: 'gwangju-youth-rent-support',
    title: '청년월세지원 한눈에 정리 — 월 20만원, 최장 24개월',
    categoryLabel: '주거',
    orgName: '복지로 · 지자체 공통 사업',
    publishedDate: '2026-08-25',
    startDate: '2026-01-01',
    deadlineDate: '2026-12-31',
    intro: '고물가·고금리로 어려운 청년의 주거비 부담을 덜어주는 전국 단위 제도예요. 광주 기준으로 정리했지만 복지로를 통한 청년월세지원은 전국 지자체가 공통으로 운영하는 중앙부처 복지사업이라, 다른 지역에 살아도 같은 방식으로 신청할 수 있어요.',
    target: ['만 19~34세'],
    support: ['월 최대 20만원 임대료 지원(최장 24개월, 생애 1회, 임차보증금·관리비 제외)'],
    applyMethod: [
      '온라인: 복지로 홈페이지(또는 앱) [중앙부처 복지사업] 청년월세지원',
      '오프라인: 청년거주지(월세 임차지) 관할 행정복지센터 방문',
      '신청 접수: 매년 3~5월(2026년 3.30~5.29), 소득심사 3~8월, 선정지급 9월부터(5월분 소급)',
    ],
    documents: [
      '월세지원 신청(변경)서, 소득·재산 신고서, 임대차계약서(확정일자)·월세이체 증빙, 서약서',
      '입금통장사본, 청년 및 부모·배우자 가족관계증명서(상세)',
    ],
    sourceLinks: [{ label: '복지로에서 신청하기', url: 'https://www.bokjiro.go.kr/' }],
  },
  {
    slug: 'k-startup-awards',
    title: "'올해의 K-스타트업'(舊 도전! K-스타트업) 창업경진대회 소개",
    categoryLabel: '취업',
    orgName: '중소벤처기업부',
    publishedDate: '2026-08-25',
    startDate: '2026-03-27',
    deadlineDate: '2026-08-31',
    intro: '범부처가 함께 여는 창업경진대회로, 유망한 창업 아이템을 가진 창업자(팀)를 발굴해서 시상하는 사업이에요. 상금뿐 아니라 이후 정부지원사업으로 이어질 수 있어 창업 초기 청년에게 좋은 발판이 돼요.',
    target: ['원문에 별도 자격 제한 명시 없음', '유망 창업 아이템을 보유한 창업자(팀)'],
    support: ['시상: 대통령상, 국무총리상, 장관·청장상 및 상금', '정부지원사업 후속 연계'],
    applyMethod: [
      '접수기간: ~2026.8.31(월)',
      '원문에 구체적 신청 방법이 별도로 안내돼 있지 않아 아래 K-스타트업 링크에서 확인이 필요해요',
    ],
    documents: ['원문에 별도 명시 없음'],
    sourceLinks: [
      {
        label: 'K-스타트업 공고 바로가기',
        url: 'https://www.k-startup.go.kr/web/contents/bizpbanc-ongoing.do?pbancClssCd=PBC010&schStr=%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C&schM=view&pbancSn=176910',
      },
    ],
  },
  {
    slug: 'wonju-interview-suit-rental',
    title: '원주시 청년 면접 정장 무료 대여, 신청 방법 정리',
    categoryLabel: '취업',
    orgName: '강원특별자치도 원주시',
    publishedDate: '2026-08-25',
    startDate: '2026-02-02',
    deadlineDate: '2026-11-30',
    intro: '면접 일정이 잡혔는데 정장이 부담스러운 원주시 청년을 위한 사업이에요. 택배 수령·반납까지 지원돼서 방문이 어려워도 이용할 수 있어요.',
    target: ['신청일 현재 원주시에 1개월 이상 거주 중인 만 18~39세 청년 중 면접 일정이 잡힌 사람'],
    support: ['면접 정장 세트 무료 대여(3박 4일, 택배 수령·반납 포함)', '1인 연 최대 3회 지원'],
    applyMethod: [
      '신청기간: 2026.2.2(월)~11.30(월), 예산 소진 시 마감',
      '방문: 청년라운지 이스트(미래로 1, 2층) 또는 웨스트(서원대로 156, 평일 09:00~21:00, 토 10:00~18:00)',
      '온라인: 원주시 청년지원센터 홈페이지 > 프로그램 신청',
    ],
    documents: [
      '주민등록초본(신청일 기준 1개월 내 발급분), 신청서, 개인정보 수집·이용 동의서',
      '면접 일정 확인 증빙서류(면접공고, 1차 시험 합격 서류, 접수증 등)',
    ],
    sourceLinks: [
      { label: '원주시 프로그램 신청', url: 'https://www.wonju.go.kr/wjyouth/viewTnWjyouthProgrmU.do?progrmNo=52&key=5942' },
    ],
  },
  {
    slug: 'asan-young-rich-financial-counseling',
    title: "아산시 청년 재무상담 「영앤리치」, 1:1 재무 컨설팅 받는 법",
    categoryLabel: '교육',
    orgName: '아산시 일자리경제과',
    publishedDate: '2026-08-25',
    startDate: '2026-02-01',
    deadlineDate: '2026-11-30',
    intro: '청년의 실용적인 자산 형성과 건전한 소비 습관을 돕기 위해 전문가와 1:1로 재무를 진단하고 소득·지출 관리를 상담해주는 서비스예요.',
    target: ['아산시를 생활권으로 하는 만 18~39세 청년'],
    support: ['1:1 맞춤형 재무상담 컨설팅(1인당 최대 2회, 회당 90분)'],
    applyMethod: ['신청서 및 증빙서류 이메일 제출', '선착순 모집'],
    documents: ['신청서 1부', '등본, 초본, 학생증 사본, 재직 증명 자료 중 택1'],
    sourceLinks: [
      { label: '충남청년포털 공고 보기', url: 'https://youth.chungnam.go.kr/web/main/customSupp/M040-06/view?bizId=A20260402LC000000000003165' },
    ],
  },
  {
    slug: 'yeosu-book-purchase-support',
    title: '여수시 청년 도서구입비 지원, 책값 절반을 돌려받는 방법',
    categoryLabel: '복지',
    orgName: '여수시 문화관광체육국',
    publishedDate: '2026-08-25',
    startDate: '2026-02-01',
    deadlineDate: '2026-11-30',
    intro: '여수시 청년의 자기개발과 독서활동을 응원하면서 동시에 지역서점과 상생하려고 만든 사업이에요. 취업·창업·자격증 도서부터 교양·문학 도서까지 폭넓게 지원돼요.',
    target: ['도서대출회원증 소지한 만 18~45세 청년'],
    support: [
      '도서구입비 50% 지원(1인 최대 10만원)',
      '지원도서: 취업·창업·자격증 관련 도서, 교양·문학도서 등',
      '구입처: 여수시 지역서점 인증제 참여 서점',
    ],
    applyMethod: [
      '여수시립도서관 누리집(yslib.yeosu.go.kr) > 온라인서비스 > 청년도서구입비 지원 > 신청하기',
      '분할 신청 가능(횟수 제한 없음, 1인 최대 10만원 범위 내)',
    ],
    documents: ['원문에 별도 명시 없음'],
    sourceLinks: [{ label: '여수시립도서관 신청 바로가기', url: 'https://yslib.yeosu.go.kr/youth' }],
  },
  {
    slug: 'wonju-study-cafe-support',
    title: '원주시 스터디카페·독서실 이용료 지원, 취준생이라면 꼭 확인',
    categoryLabel: '취업',
    orgName: '강원특별자치도 원주시',
    publishedDate: '2026-08-25',
    startDate: '2026-02-02',
    deadlineDate: '2026-11-30',
    intro: '취업 준비 중인 원주시 청년의 스터디카페·독서실 비용 부담을 덜어주는 사업이에요. 이미 결제한 이용료를 실비로 돌려받는 방식이라 영수증을 잘 챙겨두는 게 중요해요.',
    target: [
      '신청일 현재 원주시에 1개월 이상 거주 중인 만 18~39세',
      '대학교 3학년 마친 휴학생, 대학교 4학년 재학생, 취업 준비 중인 일반 청년',
    ],
    support: ['2026년 결제한 관내 스터디카페·독서실 이용료, 1인 연 1회 최대 10만원(실비)'],
    applyMethod: [
      '신청기간: 2026.2.2(월)~11.30(월), 예산 소진 시 마감',
      '방문: 청년라운지 이스트 또는 웨스트',
      '온라인: 원주시 청년지원센터 홈페이지 > 프로그램 신청',
    ],
    documents: [
      '주민등록초본, 신청서, 개인정보 수집·이용 동의서',
      '지원 대상 증명 서류(택1, 미진학자는 미진학 사실 확인서)',
      '건강보험자격득실확인서, 사업자등록사실여부 증명서',
      '스터디카페·독서실 비용 증빙서류, 본인명의 통장사본',
    ],
    sourceLinks: [
      { label: '원주시 프로그램 신청', url: 'https://www.wonju.go.kr/wjyouth/viewTnWjyouthProgrmU.do?progrmNo=53&key=5942' },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
