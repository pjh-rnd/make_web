// moa-app(모바일 앱)의 constants/moa-colors.ts를 그대로 옮겨옴 — 앱이랑 색을 다르게 가져가면
// "같은 브랜드인데 색이 다르다"는 어색함이 생겨서, 값 자체를 복사해두고 앱 쪽 파일이 바뀌면
// 여기도 같이 맞춰줘야 함(자동 공유는 아님 — 별도 프로젝트라 import로 직접 참조는 불가능).
export const COLORS = {
  ink: '#16233F',
  inkSoft: '#4A5875',
  paper: '#F6F4EE',
  paperRaise: '#FFFFFF',
  line: '#E1DDD1',
  mint: '#2F9E7C',
  mintSoft: '#E3F3EC',
  amber: '#E8873A',
  amberSoft: '#FCEBDA',
  coral: '#D9564A',
  coralSoft: '#FBE6E3',
  sky: '#3B7DC4',
  skySoft: '#DCE9F7',
  violet: '#8B5FBF',
  violetSoft: '#EDE4F5',
  rose: '#C2508A',
  roseSoft: '#F6E1EC',
  paleGray: '#9C9C9C',
  paleGraySoft: '#EAEAEA',
  lime: '#5E8C34',
  limeSoft: '#E3F2CB',
  closedGray: '#8C8C8C',
  closedGraySoft: '#E2E2E2',
};

export const CATEGORY_COLOR: Record<string, string> = {
  housing: COLORS.mint,
  money: COLORS.amber,
  job: COLORS.coral,
  edu: COLORS.sky,
  welfare: COLORS.violet,
  participation: COLORS.rose,
};

export const CATEGORY_LABEL: Record<string, string> = {
  housing: '주거',
  money: '자산',
  job: '취업',
  edu: '교육',
  welfare: '복지',
  participation: '참여',
};

export const CATEGORY_ORDER = ['housing', 'money', 'job', 'edu', 'welfare', 'participation'];

export const CATEGORY_ICON: Record<string, string> = {
  housing: '🏠',
  money: '💰',
  job: '💼',
  edu: '📚',
  welfare: '🏥',
  participation: '🙋',
};

export function ddayStyle(phase: string) {
  if (phase === 'before') return { bg: COLORS.violetSoft, text: COLORS.violet };
  if (phase === 'active') return { bg: COLORS.limeSoft, text: COLORS.lime };
  if (phase === 'rolling') return { bg: COLORS.amberSoft, text: COLORS.amber };
  return { bg: COLORS.closedGraySoft, text: COLORS.closedGray };
}
