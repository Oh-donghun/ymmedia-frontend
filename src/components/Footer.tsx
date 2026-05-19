import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">YM<span>미디어</span></div>
          <p className="footer-tagline">콘텐츠로 사람의 운명을 읽습니다</p>
          <p className="footer-eng">YM MEDIA — Reading destiny through content</p>
        </div>

        <div className="footer-col">
          <h4>사업자 정보</h4>
          <dl>
            <div><dt>상호</dt><dd>{COMPANY.name} ({COMPANY.nameFull})</dd></div>
            <div><dt>대표자</dt><dd>{COMPANY.ceo}</dd></div>
            <div><dt>사업자등록번호</dt><dd>{COMPANY.bizNumber}</dd></div>
            <div><dt>통신판매업 신고</dt><dd>{COMPANY.ecommerceNumber}</dd></div>
            <div><dt>사업장 주소</dt><dd>{COMPANY.address}<br/>({COMPANY.addressDetail})</dd></div>
            <div><dt>고객센터</dt><dd>{COMPANY.phone}</dd></div>
            <div><dt>이메일</dt><dd><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd></div>
          </dl>
        </div>

        <div className="footer-col">
          <h4>이용 안내</h4>
          <ul>
            <li><Link href="/privacy">개인정보처리방침</Link></li>
            <li><Link href="/terms">이용약관</Link></li>
            <li><Link href="/refund">환불정책</Link></li>
            <li><Link href="/faq">자주 묻는 질문</Link></li>
            <li><Link href="/contact">고객 문의</Link></li>
          </ul>

          <h4 style={{ marginTop: '32px' }}>운영 브랜드</h4>
          <ul>
            <li><Link href="/unsedang">운세당 (運勢堂)</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 {COMPANY.name}. All rights reserved.</p>
          <p className="footer-notice">본 사이트의 모든 콘텐츠는 저작권법의 보호를 받으며, 무단 복제 및 배포를 금합니다.</p>
        </div>
      </div>

      <style>{`
        .footer { position: relative; z-index: 10; margin-top: 120px; padding: 80px 64px 0; background: linear-gradient(180deg, transparent 0%, rgba(20, 16, 31, 0.6) 100%); border-top: 1px solid var(--border); }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1.5fr 1fr; gap: 60px; padding-bottom: 60px; }
        .footer-brand .footer-logo { font-family: var(--serif-en); font-weight: 500; font-size: 28px; letter-spacing: 0.18em; color: var(--white-baekja); margin-bottom: 8px; }
        .footer-brand .footer-logo span { font-family: var(--serif-kr); font-weight: 300; font-size: 14px; letter-spacing: 0.2em; color: var(--gold); margin-left: 10px; vertical-align: 4px; }
        .footer-tagline { font-family: var(--serif-kr); font-weight: 300; font-size: 15px; color: var(--text-secondary); line-height: 1.8; letter-spacing: 0.05em; margin-bottom: 12px; }
        .footer-eng { font-family: var(--serif-en); font-style: italic; font-size: 13px; color: var(--text-tertiary); letter-spacing: 0.05em; }
        .footer-col h4 { font-family: var(--serif-kr); font-weight: 500; font-size: 14px; letter-spacing: 0.2em; color: var(--gold-light); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
        .footer-col dl { display: flex; flex-direction: column; gap: 12px; }
        .footer-col dl > div { display: grid; grid-template-columns: 110px 1fr; gap: 12px; font-size: 13px; line-height: 1.7; }
        .footer-col dt { color: var(--text-tertiary); font-weight: 400; letter-spacing: 0.05em; }
        .footer-col dd { color: var(--text-secondary); letter-spacing: 0.02em; }
        .footer-col dd a { color: var(--gold-light); text-decoration: none; }
        .footer-col dd a:hover { text-decoration: underline; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-col ul li a { color: var(--text-secondary); text-decoration: none; font-size: 14px; letter-spacing: 0.05em; transition: color 0.3s ease; font-family: var(--serif-kr); font-weight: 300; }
        .footer-col ul li a:hover { color: var(--gold-light); }

        .footer-bottom { border-top: 1px solid var(--border); padding: 24px 0 40px; }
        .footer-bottom-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-tertiary); letter-spacing: 0.05em; }
        .footer-notice { font-family: var(--serif-kr); font-weight: 300; max-width: 480px; text-align: right; line-height: 1.6; }

        @media (max-width: 968px) {
          .footer { padding: 60px 24px 0; }
          .footer-inner { grid-template-columns: 1fr; gap: 40px; }
          .footer-bottom-inner { flex-direction: column; gap: 12px; text-align: center; }
          .footer-notice { text-align: center; }
          .footer-col dl > div { grid-template-columns: 100px 1fr; }
        }
      `}</style>
    </footer>
  );
}
