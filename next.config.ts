import type { NextConfig } from "next";

// VERCEL 환경변수 대신 NEXT_PUBLIC_BRAND === 'ymmedia'로 분기
const isYmmedia = process.env.NEXT_PUBLIC_BRAND === 'ymmedia';
console.log('[next.config] BRAND =', process.env.NEXT_PUBLIC_BRAND, '| isYmmedia =', isYmmedia, '| basePath =', isYmmedia ? '(empty)' : '/unsedang');

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isYmmedia ? '' : '/unsedang',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
