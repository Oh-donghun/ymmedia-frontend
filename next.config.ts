import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === '1';
console.log('[next.config] VERCEL env =', process.env.VERCEL, '| isVercel =', isVercel, '| basePath =', isVercel ? '(empty)' : '/unsedang');

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isVercel ? '' : '/unsedang',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
