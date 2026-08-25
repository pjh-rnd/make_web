// 글 중간에 넣는 귀여운 삽화 — 외부 이미지 생성 도구 없이, 카테고리별로 손으로 그린 간단한
// SVG 캐릭터임(도형 몇 개 + 점 눈 + 웃는 입 조합). 이미지 파일을 따로 저장/호스팅할 필요 없이
// 코드에 그대로 들어있어서 가볍고, moa-app과 같은 카테고리 색(lib/colors.ts)을 그대로 씀.
import { CATEGORY_COLOR } from '@/lib/colors';

export const BLOG_CATEGORY_KEY: Record<string, string> = {
  교육: 'edu',
  취업: 'job',
  주거: 'housing',
  복지: 'welfare',
  자산: 'money',
  참여: 'participation',
};

function Face({ cx, cy, gap = 9 }: { cx: number; cy: number; gap?: number }) {
  // 어느 캐릭터에나 붙이는 공용 표정(점 눈 두 개 + 웃는 입) — 이것만 있어도 뭘 그리든 귀여워짐
  return (
    <g>
      <circle cx={cx - gap} cy={cy} r={2.6} fill="#16233F" />
      <circle cx={cx + gap} cy={cy} r={2.6} fill="#16233F" />
      <path
        d={`M ${cx - 7} ${cy + 7} Q ${cx} ${cy + 13} ${cx + 7} ${cy + 7}`}
        stroke="#16233F"
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

function HousingIllustration({ color, soft }: { color: string; soft: string }) {
  return (
    <svg viewBox="0 0 160 160" className="h-32 w-32">
      <circle cx="80" cy="80" r="76" fill={soft} />
      <path d="M40 85 L80 50 L120 85 V120 Q120 126 114 126 H46 Q40 126 40 120 Z" fill={color} />
      <rect x="70" y="98" width="20" height="28" rx="3" fill="#FFFFFF" />
      <path d="M35 88 L80 46 L125 88" stroke={color} strokeWidth={6} strokeLinecap="round" fill="none" />
      <Face cx={80} cy={76} gap={10} />
    </svg>
  );
}

function MoneyIllustration({ color, soft }: { color: string; soft: string }) {
  return (
    <svg viewBox="0 0 160 160" className="h-32 w-32">
      <circle cx="80" cy="80" r="76" fill={soft} />
      <ellipse cx="80" cy="92" rx="46" ry="34" fill={color} />
      <circle cx="122" cy="80" r="9" fill={color} />
      <path d="M40 92 Q28 92 28 104 Q28 112 38 110" fill={color} />
      <rect x="60" y="52" width="18" height="10" rx="5" fill={color} transform="rotate(-10 69 57)" />
      <ellipse cx="46" cy="118" rx="7" ry="10" fill={color} />
      <ellipse cx="114" cy="118" rx="7" ry="10" fill={color} />
      <Face cx={84} cy={88} gap={11} />
    </svg>
  );
}

function JobIllustration({ color, soft }: { color: string; soft: string }) {
  return (
    <svg viewBox="0 0 160 160" className="h-32 w-32">
      <circle cx="80" cy="80" r="76" fill={soft} />
      <path
        d="M64 58 Q64 46 80 46 Q96 46 96 58"
        stroke={color}
        strokeWidth={7}
        fill="none"
        strokeLinecap="round"
      />
      <rect x="34" y="58" width="92" height="66" rx="12" fill={color} />
      <rect x="60" y="80" width="40" height="14" rx="4" fill="#FFFFFF" />
      <Face cx={80} cy={94} gap={11} />
    </svg>
  );
}

function EduIllustration({ color, soft }: { color: string; soft: string }) {
  return (
    <svg viewBox="0 0 160 160" className="h-32 w-32">
      <circle cx="80" cy="80" r="76" fill={soft} />
      <circle cx="80" cy="94" r="34" fill="#FDE6C4" />
      <path d="M80 44 L138 68 L80 92 L22 68 Z" fill={color} />
      <path d="M46 76 V102 Q46 112 80 112 Q114 112 114 102 V76" stroke={color} strokeWidth={5} fill="none" />
      <line x1="138" y1="68" x2="138" y2="100" stroke={color} strokeWidth={4} strokeLinecap="round" />
      <circle cx="138" cy="104" r="4" fill={color} />
      <Face cx={80} cy={96} gap={10} />
    </svg>
  );
}

function WelfareIllustration({ color, soft }: { color: string; soft: string }) {
  return (
    <svg viewBox="0 0 160 160" className="h-32 w-32">
      <circle cx="80" cy="80" r="76" fill={soft} />
      <path
        d="M80 70 C74 56 50 56 50 78 C50 96 80 116 80 116 C80 116 110 96 110 78 C110 56 86 56 80 70 Z"
        fill={color}
      />
      <path
        d="M34 100 Q46 116 66 112"
        stroke={color}
        strokeWidth={7}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M126 100 Q114 116 94 112"
        stroke={color}
        strokeWidth={7}
        fill="none"
        strokeLinecap="round"
      />
      <Face cx={80} cy={88} gap={10} />
    </svg>
  );
}

function ParticipationIllustration({ color, soft }: { color: string; soft: string }) {
  return (
    <svg viewBox="0 0 160 160" className="h-32 w-32">
      <circle cx="80" cy="80" r="76" fill={soft} />
      <path d="M50 62 L96 46 V116 L50 100 Z" fill={color} />
      <path d="M50 62 L34 68 V94 L50 100 Z" fill={color} />
      <rect x="42" y="94" width="10" height="24" rx="4" fill={color} />
      <path d="M104 58 Q118 80 104 104" stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M114 50 Q134 80 114 112" stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" />
      <Face cx={68} cy={78} gap={9} />
    </svg>
  );
}

export function CategoryIllustration({ categoryLabel }: { categoryLabel: string }) {
  const key = BLOG_CATEGORY_KEY[categoryLabel] ?? 'welfare';
  const color = CATEGORY_COLOR[key] ?? '#8B5FBF';
  const soft = `${color}22`;
  const Illustration =
    {
      housing: HousingIllustration,
      money: MoneyIllustration,
      job: JobIllustration,
      edu: EduIllustration,
      welfare: WelfareIllustration,
      participation: ParticipationIllustration,
    }[key] ?? WelfareIllustration;

  return (
    <div className="my-8 flex justify-center">
      <Illustration color={color} soft={soft} />
    </div>
  );
}
