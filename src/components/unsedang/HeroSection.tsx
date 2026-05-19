'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SmokeCanvas from './SmokeCanvas';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const sleeve = document.querySelector('.sleeve-left') as HTMLElement | null;
    const censer = document.querySelector('.censer') as HTMLElement | null;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      cx += (mx - cx) * 0.05;
      cy += (my - cy) * 0.05;
      if (sleeve) sleeve.style.transform = `translate(${cx * 8}px, ${cy * 6}px)`;
      if (censer) censer.style.transform = `translateX(calc(-50% + ${cx * -12}px)) translateY(${cy * -8}px)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', onMove);
    loop();
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero">
      {/* 좌측 한복 소매 */}
      <svg className="sleeve-left" viewBox="0 0 380 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid slice">
        <defs>
          <linearGradient id="sleeveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1F3A5F" stopOpacity="0.95"/>
            <stop offset="40%" stopColor="#2E558A" stopOpacity="0.7"/>
            <stop offset="80%" stopColor="#1F3A5F" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#1F3A5F" stopOpacity="0"/>
          </linearGradient>
          <pattern id="silkPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.8" fill="#C9A864" opacity="0.4"/>
            <path d="M20 12 L24 20 L20 28 L16 20 Z" fill="none" stroke="#C9A864" strokeWidth="0.3" opacity="0.3"/>
          </pattern>
        </defs>
        <path d="M 0,0 L 280,0 Q 320,200 300,400 Q 280,550 260,700 Q 240,820 200,900 L 0,900 Z" fill="url(#sleeveGrad)"/>
        <path d="M 0,0 L 280,0 Q 320,200 300,400 Q 280,550 260,700 Q 240,820 200,900 L 0,900 Z" fill="url(#silkPattern)" opacity="0.6"/>
        <path d="M 280,0 Q 320,200 300,400 Q 280,550 260,700 Q 240,820 200,900" fill="none" stroke="#C9A864" strokeWidth="1.5" opacity="0.65"/>
        <path d="M 275,5 Q 315,200 295,400 Q 275,550 255,700 Q 235,820 195,900" fill="none" stroke="#C9A864" strokeWidth="0.5" opacity="0.35"/>
        <g transform="translate(240, 480)">
          <circle cx="0" cy="0" r="6" fill="#C9A864"/>
          <circle cx="0" cy="0" r="3" fill="#A8324A"/>
          <line x1="0" y1="6" x2="0" y2="120" stroke="#C9A864" strokeWidth="1.2"/>
          <line x1="-3" y1="60" x2="-3" y2="120" stroke="#C9A864" strokeWidth="0.6" opacity="0.7"/>
          <line x1="3" y1="60" x2="3" y2="120" stroke="#C9A864" strokeWidth="0.6" opacity="0.7"/>
          <g transform="translate(0, 120)">
            <line x1="0" y1="0" x2="-2" y2="32" stroke="#C9A864" strokeWidth="0.7"/>
            <line x1="0" y1="0" x2="0" y2="36" stroke="#C9A864" strokeWidth="0.7"/>
            <line x1="0" y1="0" x2="2" y2="32" stroke="#C9A864" strokeWidth="0.7"/>
            <line x1="0" y1="0" x2="-4" y2="28" stroke="#C9A864" strokeWidth="0.5" opacity="0.7"/>
            <line x1="0" y1="0" x2="4" y2="28" stroke="#C9A864" strokeWidth="0.5" opacity="0.7"/>
          </g>
        </g>
      </svg>

      {/* 향로 */}
      <svg className="censer" viewBox="0 0 110 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="censerBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5F0E8" stopOpacity="0.92"/>
            <stop offset="50%" stopColor="#D8D2C2" stopOpacity="0.85"/>
            <stop offset="100%" stopColor="#8B8472" stopOpacity="0.7"/>
          </linearGradient>
          <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB347" stopOpacity="1"/>
            <stop offset="60%" stopColor="#A8324A" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#A8324A" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="55" cy="86" rx="38" ry="3" fill="#3A2D2A" opacity="0.6"/>
        <line x1="28" y1="78" x2="24" y2="86" stroke="#8B8472" strokeWidth="2.5"/>
        <line x1="55" y1="80" x2="55" y2="88" stroke="#8B8472" strokeWidth="2.5"/>
        <line x1="82" y1="78" x2="86" y2="86" stroke="#8B8472" strokeWidth="2.5"/>
        <ellipse cx="55" cy="78" rx="36" ry="6" fill="#8B8472"/>
        <path d="M 19,76 Q 19,52 30,46 L 80,46 Q 91,52 91,76 Z" fill="url(#censerBody)"/>
        <ellipse cx="55" cy="46" rx="25" ry="3.5" fill="#3A2D2A"/>
        <ellipse cx="55" cy="46" rx="22" ry="2.5" fill="url(#emberGlow)" opacity="0.85"/>
        <path d="M 19,60 Q 12,60 12,68 Q 12,72 16,72" fill="none" stroke="#8B8472" strokeWidth="1.8"/>
        <path d="M 91,60 Q 98,60 98,68 Q 98,72 94,72" fill="none" stroke="#8B8472" strokeWidth="1.8"/>
        <line x1="30" y1="58" x2="80" y2="58" stroke="#C9A864" strokeWidth="0.6" opacity="0.65"/>
        <path d="M 38,62 Q 45,70 55,62 Q 65,70 72,62" fill="none" stroke="#C9A864" strokeWidth="0.6" opacity="0.55"/>
        <circle cx="42" cy="68" r="1" fill="#C9A864" opacity="0.6"/>
        <circle cx="55" cy="68" r="1" fill="#C9A864" opacity="0.6"/>
        <circle cx="68" cy="68" r="1" fill="#C9A864" opacity="0.6"/>
      </svg>

      {mounted && <SmokeCanvas />}

      {/* 12지 */}
      <div className="zodiac-mini">
        {[
          ['子','자(子) 쥐'],['丑','축(丑) 소'],['寅','인(寅) 호랑이'],
          ['卯','묘(卯) 토끼'],['辰','진(辰) 용'],['巳','사(巳) 뱀'],
          ['午','오(午) 말'],['未','미(未) 양'],['申','신(申) 원숭이'],
          ['酉','유(酉) 닭'],['戌','술(戌) 개'],['亥','해(亥) 돼지'],
        ].map(([ch, label]) => (
          <div key={ch} className="zodiac-item">
            <span className="zodiac-label">{label}</span>{ch}
          </div>
        ))}
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="hero-content">
        <div className="eyebrow">
          <span className="line"></span>
          <span className="text">運勢堂 · 사주 명리</span>
          <span className="line"></span>
        </div>

        <h1 className="title">
          당신의 <span className="accent">사주</span>가<br/>
          말합니다
        </h1>

        <div className="saju-grid">
          {[
            ['時 시주', '壬', '寅'],
            ['日 일주', '甲', '辰'],
            ['月 월주', '丙', '午'],
            ['年 연주', '丁', '卯'],
          ].map(([label, top, bottom], i) => (
            <div key={i} className="saju-pillar" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="saju-label">{label}</div>
              <div className="saju-char">{top}</div>
              <div className="saju-char bottom">{bottom}</div>
            </div>
          ))}
        </div>

        <p className="sub">
          팔자(八字)에 새겨진 재물의 길.<br/>
          당신이 태어난 그 순간, 하늘이 새긴 운명의 글자들을<br/>
          운세당이 풀어드립니다.
        </p>

        <div className="cta">
          <Link href="/unsedang/order" className="btn-primary">
            재물 풀이 시작 <span className="price">₩19,800</span>
          </Link>
          <Link href="#axes" className="btn-secondary">먼저 살펴보기</Link>
        </div>
      </div>

      <div className="silk-bottom"></div>

      <div className="scroll-hint">
        <div className="line"></div>
        <span>SCROLL</span>
      </div>

      <style jsx>{`
        .hero {
          position: relative; z-index: 10;
          min-height: 100vh;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 0 24px;
          overflow: hidden;
        }
        .sleeve-left {
          position: absolute; left: -100px; top: 0; bottom: 0;
          width: 380px; z-index: 4;
          opacity: 0;
          animation: sleeveIn 2s 0.5s ease-out forwards;
          pointer-events: none;
        }
        @keyframes sleeveIn { to { opacity: 0.85; } }
        .censer {
          position: absolute; top: 14%; left: 50%;
          transform: translateX(-50%);
          width: 110px; height: 90px; z-index: 6;
          opacity: 0;
          animation: censerIn 2s 0.8s ease-out forwards;
        }
        @keyframes censerIn { to { opacity: 1; } }
        .zodiac-mini {
          position: absolute; right: 60px; top: 50%;
          transform: translateY(-50%);
          width: 90px; height: 540px;
          z-index: 6; opacity: 0;
          animation: zodIn 1.5s 1.5s ease-out forwards;
          display: flex; flex-direction: column;
          justify-content: center; gap: 4px;
        }
        @keyframes zodIn { to { opacity: 1; } }
        .zodiac-item {
          width: 100%; height: 40px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; position: relative;
          transition: all 0.4s ease;
          font-family: var(--serif-tc); font-size: 18px; font-weight: 400;
          color: var(--text-tertiary);
          border: 1px solid transparent;
        }
        .zodiac-item:hover {
          color: var(--gold-light);
          border-color: var(--border-strong);
          transform: translateX(-8px) scale(1.1);
          background: linear-gradient(135deg, rgba(168, 50, 74, 0) 0%, rgba(168, 50, 74, 0.15) 100%);
        }
        .zodiac-label {
          position: absolute; right: 100%; top: 50%;
          transform: translateY(-50%); margin-right: 12px;
          font-family: var(--serif-kr); font-size: 11px;
          letter-spacing: 0.2em; color: var(--gold);
          opacity: 0; white-space: nowrap;
          transition: opacity 0.3s 0.1s;
        }
        .zodiac-item:hover .zodiac-label { opacity: 1; }

        .hero-content {
          position: relative; z-index: 10;
          text-align: center; max-width: 760px;
          padding-top: 80px;
        }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 18px;
          margin-bottom: 28px; opacity: 0;
          animation: fadeUp 1.2s 1s ease-out forwards;
        }
        .eyebrow .line { width: 36px; height: 1px; background: var(--gold); }
        .eyebrow .text {
          font-family: var(--serif-tc); font-weight: 300;
          font-size: 13px; letter-spacing: 0.4em; color: var(--gold);
        }
        .title {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 64px; line-height: 1.4;
          letter-spacing: 0.04em; margin-bottom: 36px;
          opacity: 0; animation: fadeUp 1.4s 1.3s ease-out forwards;
        }
        .title .accent {
          font-weight: 500;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
        }
        .saju-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 12px; max-width: 560px; margin: 0 auto 48px;
          opacity: 0; animation: fadeUp 1.4s 1.8s ease-out forwards;
        }
        .saju-pillar {
          display: flex; flex-direction: column; gap: 6px;
          padding: 12px 8px;
          background: linear-gradient(180deg, rgba(26, 22, 32, 0.6) 0%, rgba(20, 16, 31, 0.3) 100%);
          border: 1px solid var(--border);
          transition: all 0.6s ease;
        }
        .saju-pillar:hover {
          border-color: var(--border-strong);
          transform: translateY(-2px);
        }
        .saju-label {
          font-family: var(--serif-kr); font-size: 10px;
          letter-spacing: 0.3em; color: var(--text-tertiary);
          text-align: center;
        }
        .saju-char {
          font-family: var(--serif-tc); font-weight: 400;
          font-size: 32px; text-align: center;
          color: var(--gold-light); line-height: 1.2;
          text-shadow: 0 0 24px rgba(201, 168, 100, 0.4);
          animation: charGlow 4s ease-in-out infinite;
        }
        .saju-char.bottom {
          color: var(--celadon);
          text-shadow: 0 0 24px rgba(92, 138, 122, 0.35);
          font-size: 28px;
        }
        .sub {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 17px; color: var(--text-secondary);
          line-height: 2.1; letter-spacing: 0.06em;
          margin-bottom: 56px;
          opacity: 0; animation: fadeUp 1.4s 2.2s ease-out forwards;
        }
        .cta {
          display: flex; gap: 16px; justify-content: center;
          opacity: 0; animation: fadeUp 1.4s 2.5s ease-out forwards;
        }
        .btn-primary {
          padding: 18px 44px; background: var(--vermilion);
          color: var(--white-baekja);
          border: 1px solid var(--vermilion);
          font-family: var(--serif-kr); font-weight: 400;
          font-size: 15px; letter-spacing: 0.2em;
          cursor: pointer; text-decoration: none;
          transition: all 0.5s ease;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-primary .price {
          font-family: var(--serif-tc); font-size: 12px;
          letter-spacing: 0.1em; opacity: 0.85;
        }
        .btn-primary:hover {
          background: var(--gold); border-color: var(--gold);
          color: var(--bg-deep);
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(201, 168, 100, 0.25);
        }
        .btn-secondary {
          padding: 18px 44px; background: transparent;
          color: var(--gold-light);
          border: 1px solid var(--border-strong);
          font-family: var(--serif-kr); font-weight: 400;
          font-size: 15px; letter-spacing: 0.2em;
          cursor: pointer; text-decoration: none;
          transition: all 0.4s ease;
          display: inline-block;
        }
        .btn-secondary:hover {
          background: rgba(201, 168, 100, 0.08);
          border-color: var(--gold);
        }
        .silk-bottom {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 200px; z-index: 5; pointer-events: none;
          background: linear-gradient(180deg, transparent 0%, rgba(168, 50, 74, 0.04) 30%, rgba(168, 50, 74, 0.12) 60%, rgba(31, 58, 95, 0.18) 100%);
        }
        .scroll-hint {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%); z-index: 15;
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
          opacity: 0; animation: fadeUp 1.4s 3s ease-out forwards;
        }
        .scroll-hint .line {
          width: 1px; height: 40px;
          background: linear-gradient(180deg, var(--gold) 0%, transparent 100%);
          animation: scrollPulse 2.5s ease-in-out infinite;
        }
        .scroll-hint span {
          font-family: var(--serif-kr); font-size: 11px;
          letter-spacing: 0.4em; color: var(--text-tertiary);
        }
        @media (max-width: 768px) {
          .sleeve-left { display: none; }
          .zodiac-mini { display: none; }
          .censer { width: 80px; height: 64px; top: 18%; }
          .title { font-size: 38px; }
          .hero-content { padding-top: 100px; }
          .saju-char { font-size: 22px; }
          .saju-char.bottom { font-size: 20px; }
          .cta { flex-direction: column; width: 100%; max-width: 320px; margin: 0 auto; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
