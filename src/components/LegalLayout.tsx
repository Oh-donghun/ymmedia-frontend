import Nav from './Nav';
import Footer from './Footer';
import Starfield from './Starfield';

interface LegalLayoutProps {
  title: string;
  subtitle?: string;
  effectiveDate: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, subtitle, effectiveDate, children }: LegalLayoutProps) {
  return (
    <>
      <Starfield density={14000} goldStars={3} />
      <Nav variant="main" />

      <main className="legal">
        <div className="legal-header">
          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">YM MEDIA · 이용 안내</span>
            <span className="line"></span>
          </div>
          <h1 className="legal-title">{title}</h1>
          {subtitle && <p className="legal-subtitle">{subtitle}</p>}
          <p className="legal-date">시행일자 · {effectiveDate}</p>
        </div>

        <article className="legal-body">{children}</article>
      </main>

      <Footer />

      <style>{`
        .legal {
          position: relative;
          z-index: 10;
          max-width: 880px;
          margin: 0 auto;
          padding: 180px 32px 80px;
        }
        .legal-header {
          text-align: center;
          margin-bottom: 80px;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--border);
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }
        .eyebrow .line { width: 36px; height: 1px; background: var(--gold); }
        .eyebrow .text {
          font-family: var(--serif-en);
          font-style: italic;
          font-size: 13px;
          letter-spacing: 0.3em;
          color: var(--gold);
        }
        .legal-title {
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 44px;
          letter-spacing: 0.05em;
          color: var(--white-baekja);
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .legal-subtitle {
          font-family: var(--serif-kr);
          font-weight: 300;
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.8;
          letter-spacing: 0.05em;
          margin-bottom: 24px;
        }
        .legal-date {
          font-family: var(--serif-tc);
          font-size: 13px;
          color: var(--gold-deep);
          letter-spacing: 0.2em;
        }
        .legal-body {
          font-family: var(--sans);
          font-weight: 300;
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 2.1;
          letter-spacing: 0.02em;
        }
        .legal-body :global(h2) {
          font-family: var(--serif-kr);
          font-weight: 500;
          font-size: 22px;
          color: var(--gold-light);
          margin: 56px 0 20px;
          letter-spacing: 0.06em;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .legal-body :global(h2:first-child) { margin-top: 0; }
        .legal-body :global(h3) {
          font-family: var(--serif-kr);
          font-weight: 500;
          font-size: 17px;
          color: var(--white-baekja);
          margin: 36px 0 14px;
          letter-spacing: 0.04em;
        }
        .legal-body :global(p) { margin-bottom: 16px; }
        .legal-body :global(ul), .legal-body :global(ol) {
          margin: 12px 0 20px 4px;
          padding-left: 24px;
        }
        .legal-body :global(li) {
          margin-bottom: 8px;
          line-height: 1.9;
        }
        .legal-body :global(strong) {
          color: var(--gold-light);
          font-weight: 500;
        }
        .legal-body :global(table) {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 14px;
        }
        .legal-body :global(th), .legal-body :global(td) {
          padding: 14px 16px;
          border: 1px solid var(--border);
          text-align: left;
        }
        .legal-body :global(th) {
          background: rgba(201, 168, 100, 0.05);
          color: var(--gold-light);
          font-weight: 500;
          font-family: var(--serif-kr);
          letter-spacing: 0.05em;
        }
        .legal-body :global(.notice-box) {
          padding: 24px 28px;
          margin: 24px 0;
          background: linear-gradient(180deg, rgba(168, 50, 74, 0.08) 0%, rgba(168, 50, 74, 0.02) 100%);
          border-left: 3px solid var(--vermilion);
          border-radius: 0;
        }
        .legal-body :global(.notice-box.gold) {
          background: linear-gradient(180deg, rgba(201, 168, 100, 0.06) 0%, rgba(201, 168, 100, 0.02) 100%);
          border-left-color: var(--gold);
        }

        @media (max-width: 768px) {
          .legal { padding: 120px 24px 60px; }
          .legal-title { font-size: 30px; }
          .legal-body :global(h2) { font-size: 19px; }
          .legal-body :global(h3) { font-size: 16px; }
        }
      `}</style>
    </>
  );
}
