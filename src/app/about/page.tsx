import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: '회사 소개',
  description: 'YM미디어는 사주 명리, 운세, 라이프스타일 디지털 콘텐츠를 만드는 미디어 회사입니다.',
};

export default function AboutPage() {
  return (
    <>
      <Starfield density={12000} goldStars={5} />
      <Nav variant="main" />

      <main className="about">
        <section className="about-hero">
          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">ABOUT US</span>
            <span className="line"></span>
          </div>
          <h1 className="title">
            콘텐츠로 사람의<br/>
            <span className="accent">운명을 읽습니다</span>
          </h1>
          <p className="sub">
            YM미디어는 사주 명리, 운세, 라이프스타일을 깊이 있게 다루는<br/>
            디지털 콘텐츠 미디어 회사입니다.
          </p>
        </section>

        <section className="philosophy">
          <h2>우리의 철학</h2>
          <div className="phil-grid">
            <div className="phil-item">
              <span className="phil-num">壹</span>
              <h3>품격</h3>
              <p>사주 명리는 수천 년의 깊이를 가진 학문입니다.<br/>가벼운 자극이 아닌, 품격 있는 풀이로 다가갑니다.</p>
            </div>
            <div className="phil-item">
              <span className="phil-num">貳</span>
              <h3>정확</h3>
              <p>전통 만세력에 기반한 정확한 사주 명식을 제공합니다.<br/>당신의 팔자를 한 글자도 틀리지 않게 풀어드립니다.</p>
            </div>
            <div className="phil-item">
              <span className="phil-num">參</span>
              <h3>신뢰</h3>
              <p>개인정보를 엄격히 보호하며, 결제와 환불 정책을<br/>법령에 따라 투명하게 운영합니다.</p>
            </div>
          </div>
        </section>

        <section className="company-info">
          <h2>회사 정보</h2>
          <dl className="info-list">
            <div><dt>상호</dt><dd>{COMPANY.name} ({COMPANY.nameFull})</dd></div>
            <div><dt>대표자</dt><dd>{COMPANY.ceo}</dd></div>
            <div><dt>사업자등록번호</dt><dd>{COMPANY.bizNumber}</dd></div>
            <div><dt>통신판매업 신고번호</dt><dd>{COMPANY.ecommerceNumber}</dd></div>
            <div><dt>사업장 소재지</dt><dd>{COMPANY.address}<br/>({COMPANY.addressDetail})</dd></div>
            <div><dt>업태 / 종목</dt><dd>정보통신업 / 미디어콘텐츠 창작업</dd></div>
            <div><dt>고객센터</dt><dd>{COMPANY.phone}</dd></div>
            <div><dt>이메일</dt><dd><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd></div>
            <div><dt>개업일</dt><dd>2024년 12월 18일</dd></div>
          </dl>
        </section>
      </main>

      <Footer />

      <style>{`
        .about {
          position: relative;
          z-index: 10;
          max-width: 980px;
          margin: 0 auto;
          padding: 180px 32px 80px;
        }
        .about-hero {
          text-align: center;
          margin-bottom: 120px;
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
        }

        .philosophy { margin-bottom: 120px; }
        .philosophy h2,
        .company-info h2 {
          font-family: var(--serif-kr);
          font-weight: 400;
          font-size: 32px;
          letter-spacing: 0.05em;
          color: var(--gold-light);
          text-align: center;
          margin-bottom: 60px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .phil-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .phil-item {
          padding: 40px 32px;
          background: linear-gradient(180deg, rgba(26,22,32,0.6) 0%, rgba(20,16,31,0.2) 100%);
          border: 1px solid var(--border);
          text-align: center;
          transition: all 0.5s ease;
        }
        .phil-item:hover {
          border-color: var(--border-strong);
          transform: translateY(-4px);
        }
        .phil-num {
          display: block;
          font-family: var(--serif-tc);
          font-size: 36px;
          color: var(--vermilion-light);
          margin-bottom: 16px;
          font-weight: 400;
        }
        .phil-item h3 {
          font-family: var(--serif-kr);
          font-weight: 500;
          font-size: 22px;
          color: var(--gold-light);
          margin-bottom: 16px;
          letter-spacing: 0.1em;
        }
        .phil-item p {
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.9;
          letter-spacing: 0.03em;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: linear-gradient(180deg, rgba(26,22,32,0.4) 0%, rgba(20,16,31,0.1) 100%);
          border: 1px solid var(--border);
        }
        .info-list > div {
          display: grid;
          grid-template-columns: 200px 1fr;
          padding: 20px 32px;
          border-bottom: 1px solid var(--border);
          font-size: 15px;
        }
        .info-list > div:last-child { border-bottom: none; }
        .info-list dt {
          font-family: var(--serif-kr);
          font-weight: 400;
          color: var(--gold-light);
          letter-spacing: 0.1em;
        }
        .info-list dd {
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .info-list dd a {
          color: var(--gold-light);
          text-decoration: none;
        }
        .info-list dd a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .about { padding: 120px 20px 60px; }
          .title { font-size: 32px; }
          .philosophy h2, .company-info h2 { font-size: 24px; }
          .phil-grid { grid-template-columns: 1fr; }
          .info-list > div { grid-template-columns: 1fr; gap: 6px; padding: 16px 20px; }
          .info-list dt { font-size: 13px; }
        }
      `}</style>
    </>
  );
}
