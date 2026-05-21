import type { Metadata } from 'next';
import './globals.css';

// 브랜드별 OG 분기
// - 운세당(나를읽다, readmelab.co.kr): 운세당 단독 표기, 나를읽다 일절 노출 없음
// - 운세당(와이엠, ymmedia.co.kr): YM미디어의 운세당 표기
const BRAND = process.env.NEXT_PUBLIC_BRAND ?? 'naread';
const IS_YMMEDIA = BRAND === 'ymmedia';

const SITE_NAME = IS_YMMEDIA ? 'YM미디어' : '운세당';
const SITE_URL = IS_YMMEDIA ? 'https://ymmedia.co.kr' : 'https://readmelab.co.kr';
const OG_TITLE = IS_YMMEDIA ? '운세당 — YM미디어' : '운세당 — 당신의 사주가 말합니다';
const OG_DESC = IS_YMMEDIA
  ? 'YM미디어의 사주 명리 풀이 브랜드. 운세당이 당신의 재물 운명을 풀어드립니다.'
  : '천 년의 명리학으로 풀어내는 당신의 재물 운명. 운세당이 답합니다.';

export const metadata: Metadata = {
  title: {
    default: OG_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: OG_DESC,
  keywords: ['운세당', '사주', '운세', '재물 운세', '사주 풀이', '명리학'],
  authors: [{ name: SITE_NAME }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: OG_TITLE,
    description: OG_DESC,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200;300;400;500;700&family=Noto+Serif+TC:wght@300;400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Pretendard:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}