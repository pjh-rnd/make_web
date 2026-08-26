// 글 중간에 넣는 삽화 — 처음엔 도형을 조합해서 직접 그린 SVG 캐릭터였는데(2026-08-25), 사용자가
// "그림이 좀 그렇다"고 피드백함. 이 환경엔 이미지 생성 도구가 없어서(ToolSearch로 확인함) 대신
// moa-app이 이미 카테고리 아이콘으로 쓰고 있는 이모지(CATEGORY_ICON, lib/colors.ts)를 크게
// 키워서 씀 — 이모지는 애플/구글이 이미 전문적으로 디자인해둔 거라 어설프게 나올 위험이 없고,
// 앱이랑 아이콘도 통일됨.
import { CATEGORY_COLOR, CATEGORY_ICON } from '@/lib/colors';

export const BLOG_CATEGORY_KEY: Record<string, string> = {
  교육: 'edu',
  취업: 'job',
  주거: 'housing',
  복지: 'welfare',
  자산: 'money',
  참여: 'participation',
};

export function CategoryIllustration({ categoryLabel }: { categoryLabel: string }) {
  const key = BLOG_CATEGORY_KEY[categoryLabel] ?? 'welfare';
  const color = CATEGORY_COLOR[key] ?? '#8B5FBF';
  const icon = CATEGORY_ICON[key] ?? '✨';

  return (
    <div className="my-8 flex justify-center">
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full text-6xl"
        style={{ backgroundColor: `${color}22` }}
      >
        {icon}
      </div>
    </div>
  );
}
