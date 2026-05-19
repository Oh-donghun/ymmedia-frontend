
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import { COMPANY } from '@/lib/constants';

const FAQS = [
  {
    cat: '주문·결제',
    q: '결제는 어떤 수단으로 가능한가요?',
    a: '신용카드, 체크카드, 계좌이체, 카카오페이, 네이버페이, 토스페이 등 토스페이먼츠에서 제공하는 모든 결제 수단을 이용하실 수 있습니다. 모든 결제는 토스페이먼츠 PG를 통해 안전하게 처리됩니다.'
  },
  {
    cat: '주문·결제',
    q: '결제 후 풀이 결과는 언제 받을 수 있나요?',
    a: '결제 완료 후 약 10분 이내에 신청 시 입력하신 휴대전화 번호로 카카오톡 알림톡이 발송됩니다. 30분 이상 미수신 시 고객센터(' + COMPANY.phone + ')로 연락 주시면 즉시 확인 후 재발송해 드립니다.'
  },
  {
    cat: '사주 정보',
    q: '출생 시간을 정확히 모르는데 풀이가 가능한가요?',
    a: '가능합니다. 출생 시간을 모르시는 경우 정오(12시)를 기준으로 풀이가 진행되며, 시주(時柱)를 제외한 연주·월주·일주 풀이는 정확하게 받으실 수 있습니다. 다만, 시주가 포함된 정확한 풀이를 원하시면 가족이나 출생증명서를 통해 시간을 확인해 주시기를 권장드립니다.'
  },
  {
    cat: '사주 정보',
    q: '음력 생일도 가능한가요?',
    a: '신청 시 양력 생년월일을 기준으로 입력해 주세요. 음력 생일만 알고 계신 경우, 음력→양력 변환 사이트(예: 한국천문연구원)를 통해 양력 날짜를 확인 후 입력하시면 됩니다. 만세력 변환은 회사가 직접 수행합니다.'
  },
  {
    cat: '환불·재발송',
    q: '결제 후 환불이 가능한가요?',
    a: '환불 가능 여부는 풀이 결과 발송 시점에 따라 달라집니다. 발송 전에는 100% 전액 환불이 가능하며, 발송 후에는 디지털 콘텐츠 특성상 단순 변심에 의한 환불은 제한됩니다. 다만 회사 귀책(시스템 오류로 미수신, 약속한 내용과 현저히 다른 풀이 등)의 경우 전액 환불 또는 재풀이가 가능합니다. 자세한 사항은 환불정책을 참고해 주세요.'
  },
  {
    cat: '환불·재발송',
    q: '풀이 결과를 분실했는데 다시 받을 수 있나요?',
    a: '풀이 결과 발송 후 30일 이내에는 무료로 재발송이 가능합니다. 이메일(' + COMPANY.email + ') 또는 고객센터로 신청하시면 본인 확인 후 처리됩니다. 30일이 지난 경우 개인정보 보호 정책에 따라 풀이 데이터가 파기되어 재발송이 불가합니다.'
  },
  {
    cat: '서비스 일반',
    q: '운세당의 풀이는 어디까지 신뢰할 수 있나요?',
    a: '운세당의 풀이는 한국 전통 명리학에 기반한 참고용 정보입니다. 의학적·법률적·재정적 조언을 대체하지 않으며, 중요한 의사결정의 절대적인 근거로 삼아서는 안 됩니다. 다만 회사는 정확한 만세력 기반으로 풀이를 진행하며, 명리학의 전통 이론에 충실하게 콘텐츠를 제공합니다.'
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <Starfield density={14000} goldStars={4} />
      <Nav variant="main" />

      <main className="faq">
        <header className="faq-head">
          <div className="eyebrow">
            <span className="line"></span>
            <span className="text">FAQ · 자주 묻는 질문</span>
            <span className="line"></span>
          </div>
          <h1 className="title">
            궁금하신 점을 <span className="accent">정리했습니다</span>
          </h1>
          <p className="sub">
            결제부터 풀이 수신, 환불까지 자주 받는 질문을 모았습니다.<br/>
            여기에 없는 문의는 고객센터로 연락 주세요.
          </p>
        </header>

        <ul className="faq-list">
          {FAQS.map((item, i) => (
            <li key={i} className={`faq-item ${openIdx === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span className="cat">{item.cat}</span>
                <span className="q-text">{item.q}</span>
                <span className="toggle">{openIdx === i ? "−" : "+"}</span>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="contact-box">
          <h2>다른 문의가 있으신가요?</h2>
          <p>FAQ에 없는 질문은 언제든 연락 주세요.</p>
          <div className="contact-actions">
            <a href={`mailto:${COMPANY.email}`} className="btn-secondary">이메일 문의</a>
            <Link href="/contact" className="btn-primary">고객센터 →</Link>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .faq { position: relative; z-index: 10; max-width: 880px; margin: 0 auto; padding: 160px 32px 80px; }
        .faq-head { text-align: center; margin-bottom: 64px; }
        .eyebrow { display: inline-flex; align-items: center; gap: 18px; margin-bottom: 28px; }
        .eyebrow .line { width: 36px; height: 1px; background: var(--gold); }
        .eyebrow .text { font-family: var(--serif-en); font-style: italic; font-size: 13px; letter-spacing: 0.3em; color: var(--gold); }
        .title { font-family: var(--serif-kr); font-weight: 300; font-size: 44px; letter-spacing: 0.04em; margin-bottom: 24px; }
        .title .accent { font-weight: 500; background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .sub { font-family: var(--serif-kr); font-weight: 300; font-size: 15px; color: var(--text-secondary); line-height: 2; letter-spacing: 0.05em; }

        .faq-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .faq-item { background: linear-gradient(180deg, rgba(26,22,32,0.4) 0%, rgba(20,16,31,0.15) 100%); border: 1px solid var(--border); transition: all 0.4s ease; }
        .faq-item.open { border-color: var(--border-strong); background: linear-gradient(180deg, rgba(26,22,32,0.7) 0%, rgba(31,58,95,0.1) 100%); }
        .faq-q { width: 100%; padding: 24px 28px; background: transparent; border: none; display: flex; align-items: center; gap: 20px; cursor: pointer; text-align: left; transition: all 0.3s ease; }
        .faq-q:hover { background: rgba(201, 168, 100, 0.04); }
        .cat { flex-shrink: 0; font-family: var(--serif-kr); font-weight: 400; font-size: 11px; color: var(--gold-deep); letter-spacing: 0.2em; padding: 4px 10px; border: 1px solid var(--border); }
        .q-text { flex: 1; font-family: var(--serif-kr); font-weight: 400; font-size: 16px; color: var(--white-baekja); letter-spacing: 0.03em; line-height: 1.6; }
        .toggle { flex-shrink: 0; font-family: var(--serif-en); font-weight: 300; font-size: 28px; color: var(--gold); width: 32px; text-align: center; transition: transform 0.4s ease; }
        .faq-item.open .toggle { color: var(--gold-light); }
        .faq-a { max-height: 0; overflow: hidden; transition: max-height 0.5s ease, padding 0.3s ease; }
        .faq-item.open .faq-a { max-height: 600px; padding: 0 28px 28px; }
        .faq-a p { font-family: var(--sans); font-weight: 300; font-size: 14px; color: var(--text-secondary); line-height: 2; letter-spacing: 0.02em; padding: 16px 0 0; border-top: 1px solid var(--border); white-space: pre-wrap; }

        .contact-box { margin-top: 80px; padding: 48px; background: linear-gradient(180deg, rgba(31, 58, 95, 0.15) 0%, rgba(20,16,31,0.3) 100%); border: 1px solid var(--border-strong); text-align: center; }
        .contact-box h2 { font-family: var(--serif-kr); font-weight: 400; font-size: 22px; color: var(--gold-light); letter-spacing: 0.08em; margin-bottom: 12px; }
        .contact-box p { font-family: var(--serif-kr); font-weight: 300; font-size: 14px; color: var(--text-secondary); line-height: 1.8; letter-spacing: 0.03em; margin-bottom: 28px; }
        .contact-actions { display: flex; gap: 12px; justify-content: center; }
        .contact-actions :global(.btn-primary), .contact-actions :global(.btn-secondary) { padding: 14px 32px; font-family: var(--serif-kr); font-weight: 400; font-size: 13px; letter-spacing: 0.2em; text-decoration: none; transition: all 0.4s ease; display: inline-block; }
        .contact-actions :global(.btn-primary) { background: var(--vermilion); color: var(--white-baekja); border: 1px solid var(--vermilion); }
        .contact-actions :global(.btn-primary:hover) { background: var(--gold); border-color: var(--gold); color: var(--bg-deep); transform: translateY(-2px); }
        .contact-actions :global(.btn-secondary) { background: transparent; color: var(--gold-light); border: 1px solid var(--border-strong); }
        .contact-actions :global(.btn-secondary:hover) { background: rgba(201, 168, 100, 0.08); border-color: var(--gold); }

        @media (max-width: 768px) {
          .faq { padding: 120px 20px 60px; }
          .title { font-size: 28px; }
          .faq-q { padding: 20px 18px; gap: 12px; flex-wrap: wrap; }
          .q-text { font-size: 14px; }
          .cat { font-size: 10px; padding: 3px 8px; }
          .faq-item.open .faq-a { padding: 0 18px 20px; }
          .contact-box { padding: 32px 24px; }
          .contact-actions { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
