import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';

export default function Home() {
  return (
    <>
      <Starfield density={10000} goldStars={6} />
      <Nav variant="main" />

      {/* HERO */}
      <section className="hero-main">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">YM MEDIA · 와이엠미디어</span>
            <span className="line"></span>
          </div>

          <h1 className="title">
            콘텐츠로 사람의<br/>
            <span className="accent">운명을 읽습니다</span>
          </h1>

          <p className="sub">
            YM미디어는 사주 명리, 운세, 라이프스타일 콘텐츠를<br/>
            전문적으로 다루는 디지털 미디어 회사입니다.<br/>
            우리는 사람의 삶에 깊이 있게 닿는 콘텐츠를 만듭니다.
          </p>

          <div className="cta">
            <Link href="/unsedang" className="btn-primary">운세당 바로가기</Link>
            <Link href="/about" className="btn-secondary">회사 소개</Link>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" className="brands">
        <div className="brands-inner">
          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">BRANDS · 운영 브랜드</span>
            <span className="line"></span>
          </div>

          <h2 className="section-title">
            YM미디어가 운영하는<br/>
            <span className="accent">디지털 콘텐츠 브랜드</span>
          </h2>

          <div className="brand-grid">
            <Link href="/unsedang" className="brand-card">
              <div className="brand-seal">
                <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="54" height="54" fill="#A8324A" rx="2"/>
                  <rect x="6" y="6" width="48" height="48" fill="none" stroke="#F5F0E8" strokeWidth="1.2"/>
                  <text x="30" y="25" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="15" fontWeight="500">運</text>
                  <text x="30" y="45" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="15" fontWeight="500">勢</text>
                </svg>
              </div>
              <div className="brand-info">
                <h3>운세당 <span className="hanja">運勢堂</span></h3>
                <p>사주 명리 기반의 운세·재물 풀이 서비스. 당신의 사주가 말하는 8가지 재물의 길.</p>
                <span className="brand-cta">바로 이동 →</span>
              </div>
            </Link>

            <div className="brand-card brand-card-placeholder">
              <div className="brand-seal-empty">
                <span>Coming<br/>Soon</span>
              </div>
              <div className="brand-info">
                <h3>다음 브랜드</h3>
                <p>YM미디어의 다음 콘텐츠 브랜드를 준비 중입니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .hero-main {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 24px;
        }
        .hero-content { max-width: 760px; padding-top: 80px; }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
        }
        .eyebrow .line {
          width: 36px;
          height: 1px;
          background: var(--gold);
        }
        .eyebrow .text {
          font-family: var(--serif-en);
          font-weight: 400;
          font-style: italic;
          font-size: 13px;
          letter-spacing: 0.3em;
          color: var(--gold);
        }
        .title {
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 60px;
          line-height: 1.4;
          letter-spacing: 0.04em;
          margin-bottom: 32px;
        }
        .title .accent {
          font-weight: 500;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .sub {
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 2.1;
          letter-spacing: 0.06em;
          margin-bottom: 56px;
        }
        .cta {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        .btn-primary {
          padding: 18px 44px;
          background: var(--vermilion);
          color: var(--white-baekja);
          border: 1px solid var(--vermilion);
          font-family: var(--serif-kr);
          font-weight: 400;
          font-size: 15px;
          letter-spacing: 0.2em;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.5s ease;
          display: inline-block;
        }
        .btn-primary:hover {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--bg-deep);
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(201, 168, 100, 0.25);
        }
        .btn-secondary {
          padding: 18px 44px;
          background: transparent;
          color: var(--gold-light);
          border: 1px solid var(--border-strong);
          font-family: var(--serif-kr);
          font-weight: 400;
          font-size: 15px;
          letter-spacing: 0.2em;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.4s ease;
          display: inline-block;
        }
        .btn-secondary:hover {
          background: rgba(201, 168, 100, 0.08);
          border-color: var(--gold);
        }

        .brands {
          position: relative;
          z-index: 10;
          padding: 160px 24px 80px;
        }
        .brands-inner {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        .section-title {
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 44px;
          line-height: 1.5;
          letter-spacing: 0.04em;
          margin: 24px 0 80px;
        }
        .section-title .accent {
          font-weight: 500;
          color: var(--gold-light);
        }

        .brand-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 32px;
          max-width: 900px;
          margin: 0 auto;
        }
        .brand-card {
          display: flex;
          gap: 24px;
          padding: 36px;
          background: linear-gradient(180deg, rgba(26,22,32,0.6) 0%, rgba(20,16,31,0.3) 100%);
          border: 1px solid var(--border);
          text-decoration: none;
          transition: all 0.5s ease;
          text-align: left;
          align-items: flex-start;
        }
        .brand-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(168, 50, 74, 0.15);
        }
        .brand-seal { flex-shrink: 0; width: 64px; }
        .brand-seal svg { width: 100%; height: auto; }
        .brand-seal-empty {
          flex-shrink: 0;
          width: 64px;
          height: 64px;
          border: 1px dashed var(--border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--serif-en);
          font-style: italic;
          font-size: 10px;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
          text-align: center;
          line-height: 1.4;
        }
        .brand-info h3 {
          font-family: var(--serif-kr);
          font-weight: 400;
          font-size: 24px;
          letter-spacing: 0.1em;
          color: var(--gold-light);
          margin-bottom: 12px;
        }
        .brand-info h3 .hanja {
          font-family: var(--serif-tc);
          font-size: 16px;
          color: var(--gold-deep);
          margin-left: 8px;
        }
        .brand-info p {
          font-family: var(--serif-kr);
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 14px;
          letter-spacing: 0.03em;
          margin-bottom: 20px;
        }
        .brand-cta {
          font-family: var(--serif-kr);
          font-size: 13px;
          color: var(--vermilion-light);
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
        }
        .brand-card:hover .brand-cta {
          color: var(--gold-light);
        }
        .brand-card-placeholder { opacity: 0.5; cursor: default; }
        .brand-card-placeholder:hover { transform: none; box-shadow: none; border-color: var(--border); }

        @media (max-width: 768px) {
          .title { font-size: 36px; }
          .section-title { font-size: 28px; }
          .cta { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; max-width: 320px; margin: 0 auto; }
          .brand-grid { grid-template-columns: 1fr; }
          .brand-card { padding: 24px; flex-direction: column; }
        }
      `}</style>
    </>
  );
}
