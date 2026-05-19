import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import { COMPANY } from '@/lib/constants';

export const metadata = {
  title: '결제 완료',
};

export default function CompletePage() {
  return (
    <>
      <Starfield density={10000} goldStars={8} />
      <Nav variant="unsedang" />

      <main className="complete">
        <div className="complete-inner">
          {/* 부적 펼침 */}
          <div className="talisman">
            <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="paperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F5F0E8" stopOpacity="0.95"/>
                  <stop offset="100%" stopColor="#D4C8A8" stopOpacity="0.85"/>
                </linearGradient>
              </defs>
              <rect x="20" y="20" width="160" height="240" fill="url(#paperGrad)" rx="2"/>
              <rect x="24" y="24" width="152" height="232" fill="none" stroke="#A8324A" strokeWidth="1.5"/>
              <rect x="28" y="28" width="144" height="224" fill="none" stroke="#A8324A" strokeWidth="0.5"/>

              {/* 부적 글자 */}
              <text x="100" y="80" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="38" fontWeight="700">敕</text>
              <text x="100" y="130" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="22" fontWeight="500">財</text>
              <text x="100" y="165" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="22" fontWeight="500">運</text>
              <text x="100" y="200" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="22" fontWeight="500">亨</text>
              <text x="100" y="235" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="22" fontWeight="500">通</text>

              {/* 도장 */}
              <g transform="translate(140, 220)">
                <rect x="-12" y="-12" width="24" height="24" fill="#A8324A"/>
                <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="10" fontWeight="700">運勢</text>
              </g>
            </svg>
          </div>

          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">財物 풀이 · 신청 완료</span>
            <span className="line"></span>
          </div>

          <h1 className="title">
            결제가 <span className="accent">완료</span>되었습니다
          </h1>

          <p className="sub">
            운세당이 당신의 사주를 정성껏 풀이하고 있습니다.<br/>
            <strong>10분 이내</strong>에 카카오톡 알림톡으로 결과를 보내드립니다.
          </p>

          <div className="info-box">
            <h3>안내 사항</h3>
            <ul>
              <li>주문 확인 메시지가 잠시 후 카카오톡으로 발송됩니다.</li>
              <li>풀이 결과는 신청 후 약 10분 이내에 도착합니다.</li>
              <li>30분 이상 미수신 시 고객센터({COMPANY.phone})로 연락 주세요.</li>
              <li>풀이 결과는 발송 후 30일간 재발송이 가능합니다.</li>
            </ul>
          </div>

          <div className="actions">
            <Link href="/unsedang" className="btn-secondary">운세당 홈으로</Link>
            <Link href="/" className="btn-primary">YM미디어 메인</Link>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .complete {
          position: relative; z-index: 10;
          max-width: 720px;
          margin: 0 auto;
          padding: 160px 32px 80px;
          text-align: center;
        }
        .talisman {
          width: 180px; margin: 0 auto 48px;
          animation: float 4s ease-in-out infinite;
          filter: drop-shadow(0 16px 40px rgba(168, 50, 74, 0.25));
        }
        .talisman svg { width: 100%; height: auto; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 18px;
          margin-bottom: 28px;
        }
        .eyebrow .line { width: 36px; height: 1px; background: var(--gold); }
        .eyebrow .text {
          font-family: var(--serif-tc); font-weight: 300;
          font-size: 13px; letter-spacing: 0.4em; color: var(--gold);
        }
        .title {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 42px; letter-spacing: 0.05em;
          margin-bottom: 24px;
        }
        .title .accent {
          font-weight: 500;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
        }
        .sub {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 16px; color: var(--text-secondary);
          line-height: 2; letter-spacing: 0.05em;
          margin-bottom: 48px;
        }
        .sub strong { color: var(--gold-light); font-weight: 500; }

        .info-box {
          padding: 32px 36px;
          background: linear-gradient(180deg, rgba(31, 58, 95, 0.12) 0%, rgba(20,16,31,0.4) 100%);
          border: 1px solid var(--border);
          border-left: 3px solid var(--gold);
          text-align: left;
          margin-bottom: 48px;
        }
        .info-box h3 {
          font-family: var(--serif-kr); font-weight: 500;
          font-size: 15px; color: var(--gold-light);
          letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .info-box ul {
          list-style: none;
          display: flex; flex-direction: column; gap: 10px;
        }
        .info-box li {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 13px; color: var(--text-secondary);
          line-height: 1.9;
          padding-left: 18px; position: relative;
        }
        .info-box li::before {
          content: '◆';
          position: absolute; left: 0;
          color: var(--gold-deep);
          font-size: 9px; top: 6px;
        }

        .actions {
          display: flex; gap: 16px; justify-content: center;
        }
        .btn-primary, .btn-secondary {
          padding: 16px 36px;
          font-family: var(--serif-kr); font-weight: 400;
          font-size: 14px; letter-spacing: 0.2em;
          text-decoration: none;
          transition: all 0.4s ease;
          display: inline-block;
        }
        .btn-primary {
          background: var(--vermilion);
          color: var(--white-baekja);
          border: 1px solid var(--vermilion);
        }
        .btn-primary:hover {
          background: var(--gold); border-color: var(--gold);
          color: var(--bg-deep);
          transform: translateY(-2px);
        }
        .btn-secondary {
          background: transparent;
          color: var(--gold-light);
          border: 1px solid var(--border-strong);
        }
        .btn-secondary:hover {
          background: rgba(201, 168, 100, 0.08);
          border-color: var(--gold);
        }
        @media (max-width: 540px) {
          .complete { padding: 120px 20px 60px; }
          .title { font-size: 28px; }
          .actions { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; }
        }
      `}</style>
    </>
  );
}
