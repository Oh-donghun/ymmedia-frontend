import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'YM미디어',
    template: '%s | YM미디어',
  },
  description: 'YM미디어는 콘텐츠로 사람의 운명을 읽습니다. 운세당 등 디지털 콘텐츠 브랜드를 운영합니다.',
  keywords: ['YM미디어', '와이엠미디어', '운세당', '사주', '재물 운세'],
  authors: [{ name: 'YM미디어' }],
  metadataBase: new URL('https://ymmedia.co.kr'),
  openGraph: {
    title: 'YM미디어',
    description: '콘텐츠로 사람의 운명을 읽습니다',
    url: 'https://ymmedia.co.kr',
    siteName: 'YM미디어',
    locale: 'ko_KR',
    type: 'website',
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
