import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

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
  // Google Search Console 소유권 확인용(2026-08-25 등록). 도메인이 바뀌면 새로 발급받아 갱신해야 함.
  verification: { google: 'fGDM6Y-2wHIspt9KFeOaghgwWZlP8_E2Zzc5fCTw7Zw' },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
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
