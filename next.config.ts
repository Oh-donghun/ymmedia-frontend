import type { NextConfig } from "next";

// ============================================================
// 정적 export 설정
// - 운세당(나를읽다): out/ 폴더 → readmelab.github.io/unsedang/ 복사
// - 운세당(와이엠): Vercel이 같은 빌드 결과를 ymmedia.co.kr/unsedang에 서빙
// basePath는 환경변수로 분기 가능 (Vercel은 path rewrite 가능하므로 빈 값도 허용)
// ============================================================

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '/unsedang',
  trailingSlash: true,
  images: {
    unoptimized: true, // 정적 export는 next/image 최적화 미지원
  },
  reactStrictMode: true,
};

export default nextConfig;