import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import HeroSection from '@/components/unsedang/HeroSection';
import { FUNNELS, SINGLE_PRODUCTS, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: '운세당 — 당신의 사주가 말합니다',
  description: `사주 명리에 기반한 재물 풀이. 팔자(八字)에 새겨진 8가지 재물의 길을 ${COMPANY.name}의 운세당이 풀어드립니다.`,
  keywords: ['사주', '운세', '재물 운세', '운세당', '사주 풀이', '명리학'],
};

const HANJA_NUMS = ['壹', '貳', '參', '肆', '伍', '陸', '柒', '捌'];

// J1만 라이브, 나머지는 곧 공개
const LIVE_FUNNELS = new Set(['J1']);

// J1 첫 상품 가격 라벨
const J1_PRICE_LABEL = `₩${SINGLE_PRODUCTS.J1.priceNonMember.toLocaleString()}`;

export default function UnsedangPage() {
  const funnelList = Object.values(FUNNELS);

  return (
    <>
      <Starfield density={8000} goldStars={10} />
      <Nav variant="unsedang" />

      <HeroSection />

      {/* 운세당 소개 */}
      <section id="about" className="about-sec">
        <div className="inner">
          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">運勢堂 · 운세당이란</span>
            <span className="line"></span>
          </div>
          <h2 className="sec-title">
            천 년의 명리학을<br/>
            <span className="accent">오늘의 당신에게</span>
          </h2>
          <p className="sec-desc">
            운세당은 한국 전통 사주 명리학에 기반하여, 당신이 태어난 연·월·일·시의 여덟 글자를 풀이합니다.<br/>
            추측이 아닌 만세력에 기반한 정확한 풀이.<br/>
            가벼운 자극이 아닌, 품격 있는 신탁(神託).
          </p>
        </div>
      </section>

      {/* 재물 8축 */}
      <section id="axes" className="axes">
        <div className="inner">
          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">財物 · 8 갈래</span>
            <span className="line"></span>
          </div>
          <h2 className="sec-title">
            재물의 <span className="accent">여덟 갈래</span>를 봅니다
          </h2>
          <p className="sec-desc-sm">
            한 사람의 재물 운명은 단순하지 않습니다. 그릇·누수·벌이·타이밍·체질·인연·노후·방어,<br/>
            이 여덟 가지 갈래를 두루 살펴야 비로소 온전한 길이 보입니다.
          </p>

          <div className="axes-grid">
            {funnelList.map((axis, i) => {
              const isLive = LIVE_FUNNELS.has(axis.code);
              return (
                <div key={axis.code} className={`axis-card ${isLive ? 'live' : 'coming'}`}>
                  <span className="axis-num">{HANJA_NUMS[i]}</span>
                  <h3 className="axis-label">{axis.label}</h3>
                  <p className="axis-desc">{axis.desc}</p>
                  <span className="axis-code">{axis.code}</span>
                  {!isLive && <span className="axis-soon">곧 공개</span>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — J1 그릇 풀이 우선 라이브 */}
      <section className="final-cta">
        <div className="inner">
          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">財物 · 그릇 풀이 · 시작</span>
            <span className="line"></span>
          </div>
          <h2 className="sec-title">
            먼저 당신의 <span className="accent">돈 그릇</span>을<br/>
            펼쳐 보겠습니다
          </h2>
          <p className="sec-desc">
            생년월일과 출생 시간을 알려주시면,<br/>
            운세당이 당신의 돈 그릇 풀이를 카카오톡으로 보내드립니다.
          </p>

          <div className="price-box">
            <div className="price-row">
              <span className="price-label">{SINGLE_PRODUCTS.J1.name}</span>
              <span className="price-num">{J1_PRICE_LABEL}</span>
            </div>
            <div className="price-row sm">
              <span>분량</span>
              <span>{SINGLE_PRODUCTS.J1.duration}</span>
            </div>
            <div className="price-row sm">
              <span>전달 방법</span>
              <span>카카오톡 알림톡</span>
            </div>
            <div className="price-row sm">
              <span>결제 수단</span>
              <span>신용카드 · 계좌이체 · 간편결제</span>
            </div>
          </div>

          <Link href="/order" className="btn-primary-big">
            돈 그릇 풀이 시작하기 ↗
          </Link>

          <p className="legal-link">
            결제 시 <Link href="/terms">이용약관</Link> · <Link href="/refund">환불정책</Link>에 동의한 것으로 간주됩니다.
          </p>
        </div>
      </section>

      <Footer />

      <style>{`
        .about-sec, .axes, .final-cta {
          position: relative; z-index: 10;
          padding: 120px 24px;
          text-align: center;
        }
        .inner { max-width: 1080px; margin: 0 auto; }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 18px;
          margin-bottom: 28px;
        }
        .eyebrow .line { width: 36px; height: 1px; background: var(--gold); }
        .eyebrow .text {
          font-family: var(--serif-tc); font-weight: 300;
          font-size: 13px; letter-spacing: 0.4em; color: var(--gold);
        }
        .sec-title {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 46px; line-height: 1.5;
          letter-spacing: 0.04em; margin-bottom: 32px;
        }
        .sec-title .accent {
          font-weight: 500;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
        }
        .sec-desc {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 17px; color: var(--text-secondary);
          line-height: 2.1; letter-spacing: 0.06em;
          max-width: 720px; margin: 0 auto;
        }
        .sec-desc-sm {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 15px; color: var(--text-secondary);
          line-height: 2; letter-spacing: 0.05em;
          max-width: 720px; margin: 0 auto 64px;
        }

        .axes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 64px;
        }
        .axis-card {
          position: relative;
          padding: 36px 24px;
          background: linear-gradient(180deg, rgba(26,22,32,0.7) 0%, rgba(20,16,31,0.3) 100%);
          border: 1px solid var(--border);
          text-align: center;
          transition: all 0.5s ease;
          overflow: hidden;
        }
        .axis-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(201, 168, 100, 0.1), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .axis-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(168, 50, 74, 0.12);
        }
        .axis-card:hover::before { opacity: 1; }
        .axis-card.live {
          border-color: var(--gold);
          box-shadow: 0 0 0 1px rgba(201, 168, 100, 0.3);
        }
        .axis-card.coming { opacity: 0.55; }
        .axis-num {
          display: block;
          font-family: var(--serif-tc); font-weight: 400;
          font-size: 32px; color: var(--vermilion-light);
          margin-bottom: 16px;
        }
        .axis-label {
          font-family: var(--serif-kr); font-weight: 500;
          font-size: 22px; letter-spacing: 0.1em;
          color: var(--gold-light); margin-bottom: 12px;
        }
        .axis-desc {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 13px; color: var(--text-secondary);
          line-height: 1.8; letter-spacing: 0.03em;
          margin-bottom: 16px;
          min-height: 46px;
        }
        .axis-code {
          font-family: var(--serif-en); font-style: italic;
          font-size: 11px; color: var(--gold-deep);
          letter-spacing: 0.2em;
        }
        .axis-soon {
          display: inline-block;
          margin-top: 12px;
          padding: 4px 10px;
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 11px; letter-spacing: 0.15em;
          color: var(--text-tertiary);
          border: 1px solid var(--border);
        }

        .final-cta {
          background: linear-gradient(180deg, transparent 0%, rgba(31, 58, 95, 0.12) 50%, transparent 100%);
          padding: 160px 24px;
        }
        .price-box {
          max-width: 480px;
          margin: 64px auto 48px;
          padding: 40px 48px;
          background: linear-gradient(180deg, rgba(26, 22, 32, 0.8) 0%, rgba(20, 16, 31, 0.5) 100%);
          border: 1px solid var(--border-strong);
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
        }
        .price-row:last-child { border-bottom: none; padding-bottom: 0; }
        .price-row:first-child {
          padding-top: 0;
          padding-bottom: 24px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-strong);
        }
        .price-label {
          font-family: var(--serif-kr); font-size: 18px;
          color: var(--gold-light); letter-spacing: 0.1em;
        }
        .price-num {
          font-family: var(--serif-en); font-weight: 500;
          font-size: 32px;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
          letter-spacing: 0.02em;
        }
        .price-row.sm {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 13px; color: var(--text-secondary);
          letter-spacing: 0.05em;
        }
        .price-row.sm span:last-child { color: var(--white-baekja); }
        .btn-primary-big {
          display: inline-block;
          padding: 22px 56px;
          background: var(--vermilion);
          color: var(--white-baekja);
          border: 1px solid var(--vermilion);
          font-family: var(--serif-kr); font-weight: 400;
          font-size: 17px; letter-spacing: 0.2em;
          text-decoration: none;
          transition: all 0.5s ease;
        }
        .btn-primary-big:hover {
          background: var(--gold); border-color: var(--gold);
          color: var(--bg-deep);
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(201, 168, 100, 0.3);
        }
        .legal-link {
          margin-top: 24px;
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 12px; color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }
        .legal-link :global(a) {
          color: var(--gold-deep);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
        }
        .legal-link :global(a:hover) { color: var(--gold-light); border-color: var(--gold); }

        @media (max-width: 968px) {
          .axes-grid { grid-template-columns: repeat(2, 1fr); }
          .sec-title { font-size: 32px; }
        }
        @media (max-width: 540px) {
          .axes-grid { grid-template-columns: 1fr; }
          .price-box { padding: 28px 24px; }
          .price-num { font-size: 26px; }
        }
      `}</style>
    </>
  );
}