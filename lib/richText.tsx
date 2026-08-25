import React from 'react';

// 본문 문단 안에 **이렇게** 감싼 부분을 노란 하이라이트로 렌더링해줌 — 진짜 마크다운 파서를 쓰기엔
// 우리가 쓰는 건 **강조** 하나뿐이라 정규식으로 충분함. 형광펜으로 그은 것처럼 보이게 배경색만 줌.
export function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <mark key={i} className="rounded bg-[#FDE68A] px-1 py-0.5 font-semibold text-ink">
              {part.slice(2, -2)}
            </mark>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}
