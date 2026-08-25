import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fit Me — 나에게 맞는 청년정책',
  description: '흩어진 청년정책 공고를 한곳에 모아 마감일과 지원 조건을 보여주는 서비스, Fit Me.',
  // Google Search Console 소유권 확인용 — 첫 번째는 make-web-eta.vercel.app 속성용(2026-08-25),
  // 두 번째는 실제 도메인 fitme.kr 연결 후 새로 등록한 속성용(같은 날, 커스텀 도메인 연결 직후).
  // 둘 다 남겨둠 — 두 속성 모두 계속 인증된 상태로 유지하려고.
  verification: {
    google: [
      'fGDM6Y-2wHIspt9KFeOaghgwWZlP8_E2Zzc5fCTw7Zw',
      'l71VzqVTzJz8ZCvqxJP3iT4IXVALcVFGL7H8vuMbQVk',
    ],
    // 애드센스 "사이트 연결" 확인용 메타태그. next/script의 beforeInteractive 스크립트는
    // Next.js가 __next_s 큐 방식으로 바꿔 넣어서(실제 <script src=...> 형태 그대로가 아님)
    // 구글의 사이트 확인 크롤러가 못 찾아 "사이트를 확인할 수 없습니다" 에러가 났음(2026-08-25) —
    // 이 메타태그는 순수 정적 HTML이라 그런 변형 없이 그대로 나가서 확실하게 인식됨.
    other: { 'google-adsense-account': 'ca-pub-9218935405137635' },
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* Google AdSense 사이트 연결 코드(2026-08-25 등록, publisher ID: pub-9218935405137635).
            next/script의 beforeInteractive는 App Router에서 루트 레이아웃에 한해 <head> 안에
            그대로 렌더링됨 — 애드센스가 요구하는 "모든 페이지의 <head>에 있어야 함" 조건을
            만족시키려고 이 전략을 씀(afterInteractive는 <body> 끝에 들어가서 요건과 안 맞음). */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9218935405137635"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <header className="border-b border-line bg-paper-raise">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold text-ink">
              Fit Me
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-ink-soft">
              <Link href="/" className="hover:text-ink">
                정책 모아보기
              </Link>
              <Link href="/blog" className="hover:text-ink">
                블로그
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line py-8 text-center text-xs text-ink-soft">
          <p>Fit Me · 정책 데이터는 온통청년 오픈API를 기반으로 정리됩니다.</p>
          <p className="mt-2 flex justify-center gap-4">
            <Link href="/about" className="hover:text-ink">
              소개
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              개인정보처리방침
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
