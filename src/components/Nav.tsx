'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavProps {
  variant?: 'main' | 'unsedang';
}

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
      <Link href={isUnsedang ? '/unsedang' : '/'} className="logo-wrap">
        {isUnsedang ? (
          <>
            <svg className="logo-seal" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="32" height="32" fill="#A8324A" rx="1"/>
              <rect x="4" y="4" width="28" height="28" fill="none" stroke="#F5F0E8" strokeWidth="0.8"/>
              <text x="18" y="15" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="9" fontWeight="500">運</text>
              <text x="18" y="27" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="9" fontWeight="500">勢</text>
            </svg>
            <span className="logo-text">운세당<span className="hanja">運勢堂</span></span>
          </>
        ) : (
          <span className="logo-text-main">YM<span className="ampersand">미디어</span></span>
        )}
      </Link>

      <ul className="nav-menu">
        {isUnsedang ? (
          <>
            <li><Link href="/unsedang#about">운세당</Link></li>
            <li><Link href="/unsedang#axes">재물 8축</Link></li>
            <li><Link href="/unsedang/order" className="nav-cta">사주 보기</Link></li>
          </>
        ) : (
          <>
            <li><Link href="/about">소개</Link></li>
            <li><Link href="/#brands">브랜드</Link></li>
            <li><Link href="/contact">연락처</Link></li>
            <li><Link href="/unsedang" className="nav-cta">운세당 ↗</Link></li>
          </>
        )}
      </ul>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 28px 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(180deg, rgba(10,10,18,0.7) 0%, rgba(10,10,18,0) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: padding 0.4s ease, background 0.4s ease;
        }
        .nav-scrolled {
          padding: 16px 64px;
          background: rgba(10, 10, 18, 0.92);
          border-bottom: 1px solid var(--border);
        }
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          text-decoration: none;
        }
        .logo-seal { width: 36px; height: 36px; }
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
          .nav { padding: 18px 24px; }
          .nav-scrolled { padding: 14px 24px; }
          .nav-menu { gap: 18px; }
          .nav-menu :global(li):not(:last-child) { display: none; }
        }
      `}</style>
    </nav>
  );
}
