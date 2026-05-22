// 루트(/) 페이지
// - BRAND=ymmedia → YM미디어 메인 페이지 (page.ym-main.tsx) 표시 (토스 심사용)
// - BRAND=naread (기본) → 운세당으로 리다이렉트
import type { Metadata } from 'next';
import YmMain from './page.ym-main';

const BRAND = process.env.NEXT_PUBLIC_BRAND ?? 'naread';
const IS_YMMEDIA = BRAND === 'ymmedia';

export const metadata: Metadata = {
  title: IS_YMMEDIA ? 'YM미디어 — 콘텐츠로 사람의 운명을 읽습니다' : '운세당',
  description: IS_YMMEDIA
    ? 'YM미디어는 사주 명리, 운세, 라이프스타일 콘텐츠를 전문적으로 다루는 디지털 미디어 회사입니다.'
    : '사주 명리 기반 운세 풀이 서비스',
  robots: IS_YMMEDIA ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootPage() {
  if (IS_YMMEDIA) {
    return <YmMain />;
  }

  // 나를읽다: 운세당으로 자동 리다이렉트 (정적 export는 redirect() 미지원)
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/unsedang/" />
      <div
        style={{
          background: '#0a0a12',
          color: '#f5f0e8',
          fontFamily: 'sans-serif',
          padding: '80px 24px',
          textAlign: 'center',
          minHeight: '100vh',
        }}
      >
        <p>운세당으로 이동 중입니다...</p>
        <p style={{ marginTop: '12px' }}>
          <a href="/unsedang/" style={{ color: '#c9a864' }}>
            자동 이동되지 않으면 클릭하세요
          </a>
        </p>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace('/unsedang/');`,
          }}
        />
      </div>
    </>
  );
}
