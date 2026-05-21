// 루트(/) 접속 시 /unsedang/로 자동 이동
// 정적 export는 redirect()가 작동하지 않으므로 meta refresh + JS 사용

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '운세당',
  description: '사주 명리 기반 운세 풀이 서비스',
  robots: { index: false, follow: false },
};

export default function RootRedirect() {
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