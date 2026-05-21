import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: '고객 문의',
  description: 'YM미디어 고객센터 및 문의 안내',
};

export default function ContactPage() {
  return (
    <>
      <Starfield density={14000} goldStars={4} />
      <Nav variant="main" />

      <main className="contact">
        <section className="contact-hero">
          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">CONTACT</span>
            <span className="line"></span>
          </div>
          <h1 className="title">
            고객 <span className="accent">문의</span>
          </h1>
          <p className="sub">
            궁금하신 점이나 도움이 필요하신 일이 있으시면 언제든 연락해 주세요.<br/>
            영업일 기준 1~3일 이내에 답변드립니다.
          </p>
        </section>

        <section className="contact-grid">
          <div className="contact-card">
            <div className="card-icon">
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="10" width="32" height="22" rx="2" fill="none" stroke="#C9A864" strokeWidth="1.2"/>
                <path d="M4 12 L20 23 L36 12" fill="none" stroke="#C9A864" strokeWidth="1.2"/>
              </svg>
            </div>
            <h3>이메일</h3>
            <p className="card-main">
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </p>
            <p className="card-desc">
              가장 빠른 답변을 받으실 수 있습니다.<br/>
              결제·환불·기술 문의 모두 가능합니다.
            </p>
          </div>

          <div className="contact-card">
            <div className="card-icon">
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8 L14 8 L17 16 L13 19 Q17 27 21 27 L24 23 L32 26 L32 32 Q32 33 31 33 Q15 33 7 17 Q7 8 8 8 Z" fill="none" stroke="#C9A864" strokeWidth="1.2"/>
              </svg>
            </div>
            <h3>전화</h3>
            <p className="card-main">
              <a href={`tel:${COMPANY.phone.replace(/-/g, '')}`}>{COMPANY.phone}</a>
            </p>
            <p className="card-desc">
              평일 오전 10시 ~ 오후 6시<br/>
              주말 및 공휴일 휴무
            </p>
          </div>

          <div className="contact-card">
            <div className="card-icon">
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4 Q10 4 10 16 Q10 24 20 36 Q30 24 30 16 Q30 4 20 4 Z" fill="none" stroke="#C9A864" strokeWidth="1.2"/>
                <circle cx="20" cy="16" r="4" fill="none" stroke="#C9A864" strokeWidth="1.2"/>
              </svg>
            </div>
            <h3>주소</h3>
            <p className="card-main address">
              {COMPANY.address}
            </p>
          </div>
        </section>

        <section className="contact-notice">
          <h2>안내 사항</h2>
          <ul>
            <li><strong>결제 관련 문의</strong> — 주문번호와 결제 수단을 함께 알려주시면 빠르게 처리됩니다.</li>
            <li><strong>환불 요청</strong> — 환불정책을 먼저 확인 후 이메일로 신청해 주세요.</li>
            <li><strong>풀이 결과 문의</strong> — 카카오톡 발송 후 24시간 내 미수신 시 즉시 재발송 가능합니다.</li>
            <li><strong>제휴 및 기타 문의</strong> — 이메일로 상세히 보내주시면 검토 후 연락드립니다.</li>
          </ul>
        </section>
      </main>

      <Footer />

      <style>{`
        .contact {
          position: relative;
          z-index: 10;
          max-width: 1040px;
          margin: 0 auto;
          padding: 180px 32px 80px;
        }
        .contact-hero {
          text-align: center;
          margin-bottom: 80px;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
        }
        .eyebrow .line { width: 36px; height: 1px; background: var(--gold); }
        .eyebrow .text {
          font-family: var(--serif-en);
          font-style: italic;
          font-size: 13px;
          letter-spacing: 0.3em;
          color: var(--gold);
        }
        .title {
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 54px;
          letter-spacing: 0.05em;
          margin-bottom: 28px;
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
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 2;
          letter-spacing: 0.05em;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }
        .contact-card {
          padding: 48px 32px;
          background: linear-gradient(180deg, rgba(26,22,32,0.6) 0%, rgba(20,16,31,0.2) 100%);
          border: 1px solid var(--border);
          text-align: center;
          transition: all 0.5s ease;
        }
        .contact-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(201, 168, 100, 0.1);
        }
        .card-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 24px;
        }
        .card-icon svg { width: 100%; height: 100%; }
        .contact-card h3 {
          font-family: var(--serif-kr);
          font-weight: 500;
          font-size: 18px;
          color: var(--gold-light);
          margin-bottom: 16px;
          letter-spacing: 0.15em;
        }
        .card-main {
          font-family: var(--serif-kr);
          font-size: 17px;
          color: var(--white-baekja);
          margin-bottom: 16px;
          letter-spacing: 0.03em;
          line-height: 1.6;
        }
        .card-main.address { font-size: 13px; line-height: 1.7; }
        .card-main a {
          color: var(--white-baekja);
          text-decoration: none;
          transition: color 0.3s;
        }
        .card-main a:hover { color: var(--gold-light); }
        .card-desc {
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 13px;
          color: var(--text-tertiary);
          line-height: 1.8;
          letter-spacing: 0.03em;
        }

        .contact-notice {
          padding: 40px 48px;
          background: linear-gradient(180deg, rgba(31, 58, 95, 0.15) 0%, rgba(31, 58, 95, 0.05) 100%);
          border: 1px solid var(--border);
          border-left: 3px solid var(--gold);
        }
        .contact-notice h2 {
          font-family: var(--serif-kr);
          font-weight: 500;
          font-size: 20px;
          color: var(--gold-light);
          margin-bottom: 24px;
          letter-spacing: 0.1em;
        }
        .contact-notice ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .contact-notice li {
          font-family: var(--sans);
          font-weight: 300;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.9;
          letter-spacing: 0.02em;
          padding-left: 18px;
          position: relative;
        }
        .contact-notice li::before {
          content: '◆';
          position: absolute;
          left: 0;
          color: var(--gold-deep);
          font-size: 9px;
          top: 7px;
        }
        .contact-notice strong {
          color: var(--gold-light);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .contact { padding: 120px 20px 60px; }
          .title { font-size: 32px; }
          .contact-grid { grid-template-columns: 1fr; }
          .contact-card { padding: 32px 24px; }
          .contact-notice { padding: 28px 24px; }
        }
      `}</style>
    </>
  );
}
