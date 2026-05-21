'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavProps {
  variant?: 'main' | 'unsedang';
}

const BRAND = process.env.NEXT_PUBLIC_BRAND ?? 'naread';
const IS_YMMEDIA = BRAND === 'ymmedia';

export default function Nav({ variant = 'main' }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isUnsedang = variant === 'unsedang';

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <Link href={isUnsedang ? '/' : '/'} className="logo-wrap">
        {isUnsedang || !IS_YMMEDIA ? (
          // 운세당 로고: 빨간 도장 인장 + "운세당 運勢堂"
          <>
            <svg className="logo-seal" viewBox="0 0 36 60" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="32" height="56" rx="4" fill="#A8324A" stroke="#8B2238" strokeWidth="1"/>
              <rect x="4" y="4" width="28" height="52" rx="3" fill="none" stroke="#F5F0E8" strokeWidth="0.6"/>
              <text x="18" y="25" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="13" fontWeight="500">運</text>
              <text x="18" y="46" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="13" fontWeight="500">勢</text>
            </svg>
            <span className="logo-text">운세당<span className="hanja">運勢堂</span></span>
          </>
        ) : (
          // 운세당(와이엠) 메인 페이지(/): YM미디어 로고
          <span className="logo-text-main">YM<span className="ampersand">미디어</span></span>
        )}
      </Link>

      <ul className="nav-menu">
        {isUnsedang ? (
          <>
            <li><Link href="/#about">운세당</Link></li>
            <li><Link href="/#axes">재물 8축</Link></li>
            <li><Link href="/order" className="nav-cta">사주 보기</Link></li>
          </>
        ) : (
          <>
            <li><Link href="/" className="nav-cta">운세당 ↗</Link></li>
          </>
        )}
      </ul>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 18px 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(180deg, rgba(10,10,18,0.7) 0%, rgba(10,10,18,0) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: padding 0.4s ease, background 0.4s ease;
        }
        .nav-scrolled {
          padding: 12px 64px;
          background: rgba(10, 10, 18, 0.92);
          border-bottom: 1px solid var(--border);
        }
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          text-decoration: none;
        }
        .logo-seal {
          width: 28px;
          height: 46px;
          filter: drop-shadow(0 0 10px rgba(168, 50, 74, 0.3));
        }
        .logo-text {
          font-family: var(--serif-kr);
          font-weight: 400;
          font-size: 22px;
          letter-spacing: 0.25em;
          color: var(--gold-light);
        }
        .logo-text .hanja {
          font-family: var(--serif-tc);
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 0.1em;
          color: var(--gold-deep);
          margin-left: 8px;
          vertical-align: 3px;
        }
        .logo-text-main {
          font-family: var(--serif-en);
          font-weight: 500;
          font-size: 26px;
          letter-spacing: 0.18em;
          color: var(--white-baekja);
        }
        .logo-text-main .ampersand {
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 0.2em;
          color: var(--gold);
          margin-left: 10px;
          vertical-align: 4px;
        }
        .nav-menu {
          display: flex;
          gap: 44px;
          list-style: none;
          align-items: center;
        }
        .nav-menu :global(a) {
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 15px;
          letter-spacing: 0.15em;
          transition: color 0.4s ease;
          position: relative;
        }
        .nav-menu :global(a:hover) {
          color: var(--gold-light);
        }
        .nav-menu :global(a.nav-cta) {
          padding: 10px 22px;
          border: 1px solid var(--border-strong);
          color: var(--gold-light);
          font-size: 13px;
          letter-spacing: 0.2em;
          transition: all 0.4s ease;
        }
        .nav-menu :global(a.nav-cta:hover) {
          background: var(--vermilion);
          border-color: var(--vermilion);
          color: var(--white-baekja);
        }
        @media (max-width: 768px) {
          .nav { padding: 14px 18px; }
          .nav-scrolled { padding: 10px 18px; }
          .nav-menu { gap: 14px; }
          .nav-menu :global(li):not(:last-child) { display: none; }
          .logo-text { font-size: 18px; letter-spacing: 0.2em; }
          .logo-text .hanja { font-size: 11px; margin-left: 6px; }
          .logo-seal { width: 22px; height: 36px; }
        }
      `}</style>
    </nav>
  );
}