'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import { COMPANY, API_BASE_URL } from '@/lib/constants';

type Status = 'verifying' | 'success' | 'already' | 'fail';

function CompleteInner() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>('verifying');
  const [errorMsg, setErrorMsg] = useState('');
  const [orderInfo, setOrderInfo] = useState<{
    orderId?: string;
    amount?: number;
    productName?: string;
  }>({});

  useEffect(() => {
    // URL 쿼리에서 토스 응답 받음
    const paymentKey = params.get('paymentKey');
    const orderId = params.get('orderId');
    const amount = params.get('amount');
    const fail = params.get('fail');

    // 실패 흐름
    if (fail === '1' || params.get('code')) {
      setStatus('fail');
      setErrorMsg(params.get('message') || '결제가 취소되었거나 실패했습니다.');
      return;
    }

    // 필수 파라미터 누락
    if (!paymentKey || !orderId || !amount) {
      setStatus('fail');
      setErrorMsg('결제 정보가 없습니다. 다시 시도해주세요.');
      return;
    }

    // 백엔드에 결제 검증 요청
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/payment/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus('fail');
          setErrorMsg(data.message || '결제 검증에 실패했습니다.');
          return;
        }

        setOrderInfo({
          orderId: data.orderId,
          amount: data.amount,
          productName: data.productName,
        });

        // sessionStorage 정리
        sessionStorage.removeItem('unsedang_order');

        setStatus(data.alreadyPaid ? 'already' : 'success');
      } catch (err) {
        console.error(err);
        setStatus('fail');
        setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 확인해주세요.');
      }
    })();
  }, [params]);

  return (
    <>
      <Starfield density={10000} goldStars={status === 'success' ? 8 : 3} />
      <Nav variant="unsedang" />

      <main className="complete">
        <div className="complete-inner">

          {status === 'verifying' && (
            <div className="loading-state">
              <div className="dots"><span></span><span></span><span></span></div>
              <p>결제를 확인하고 있습니다...</p>
            </div>
          )}

          {(status === 'success' || status === 'already') && (
            <>
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
                  <text x="100" y="80" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="38" fontWeight="700">敕</text>
                  <text x="100" y="130" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="22" fontWeight="500">財</text>
                  <text x="100" y="165" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="22" fontWeight="500">運</text>
                  <text x="100" y="200" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="22" fontWeight="500">亨</text>
                  <text x="100" y="235" textAnchor="middle" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="22" fontWeight="500">通</text>
                  <g transform="translate(140, 220)">
                    <rect x="-12" y="-12" width="24" height="24" fill="#A8324A"/>
                    <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="10" fontWeight="700">運勢</text>
                  </g>
                </svg>
              </div>

              <div className="eyebrow">
                <span className="line"></span>
                <span className="text">{orderInfo.productName || '財物 풀이'} · 신청 완료</span>
                <span className="line"></span>
              </div>

              <h1 className="title">
                결제가 <span className="accent">완료</span>되었습니다
              </h1>

              <p className="sub">
                운세당이 당신의 사주를 정성껏 풀이하고 있습니다.<br/>
                <strong>10분 이내</strong>에 카카오톡 알림톡으로 결과를 보내드립니다.
              </p>

              <div className="order-summary">
                {orderInfo.orderId && <div><span>주문번호</span><span className="mono">{orderInfo.orderId}</span></div>}
                {orderInfo.productName && <div><span>상품</span><span>{orderInfo.productName}</span></div>}
                {orderInfo.amount && <div><span>결제 금액</span><span>₩{orderInfo.amount.toLocaleString()}</span></div>}
              </div>

              <div className="info-box">
                <h3>안내 사항</h3>
                <ul>
                  <li>풀이 결과는 신청 후 약 10분 이내에 도착합니다.</li>
                  <li>30분 이상 미수신 시 카카오톡 채널 <strong>@unsedang</strong>으로 문의 주세요.</li>
                  <li>풀이 결과는 발송 후 30일간 재발송이 가능합니다.</li>
                  {status === 'already' && <li><strong>이미 결제 완료된 주문입니다.</strong></li>}
                </ul>
              </div>

              <div className="actions">
                <Link href="/" className="btn-secondary">운세당 홈으로</Link>
              </div>
            </>
          )}

          {status === 'fail' && (
            <>
              <div className="fail-icon">
                <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#A8324A" strokeWidth="2"/>
                  <line x1="28" y1="28" x2="52" y2="52" stroke="#A8324A" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="52" y1="28" x2="28" y2="52" stroke="#A8324A" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>

              <h1 className="title">결제가 <span className="fail-accent">완료되지 않았습니다</span></h1>

              <p className="sub error">
                {errorMsg}
              </p>

              <p className="sub">
                결제가 실제로 진행되었다면 자동 취소됩니다.<br/>
                문제가 지속되면 고객센터({COMPANY.phone})로 연락 주세요.
              </p>

              <div className="actions">
                <Link href="/order" className="btn-primary">다시 신청하기</Link>
                <Link href="/" className="btn-secondary">운세당 홈으로</Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .complete { position: relative; z-index: 10; max-width: 720px; margin: 0 auto; padding: 100px 32px 60px; text-align: center; }

        .loading-state { padding: 120px 0; }
        .loading-state p { font-family: var(--serif-kr); font-weight: 300; font-size: 15px; color: var(--text-secondary); margin-top: 24px; letter-spacing: 0.05em; }

        .dots { display: inline-flex; gap: 8px; }
        .dots span { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); animation: dot 1.4s ease-in-out infinite; }
        .dots span:nth-child(2) { animation-delay: 0.2s; }
        .dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dot { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }

        .talisman { width: 160px; margin: 0 auto 36px; animation: float 4s ease-in-out infinite; filter: drop-shadow(0 16px 40px rgba(168, 50, 74, 0.25)); }
        .talisman svg { width: 100%; height: auto; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

        .fail-icon { width: 80px; margin: 40px auto 32px; filter: drop-shadow(0 0 20px rgba(168, 50, 74, 0.3)); }
        .fail-icon svg { width: 100%; height: auto; }

        .eyebrow { display: inline-flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .eyebrow .line { width: 28px; height: 1px; background: var(--gold); }
        .eyebrow .text { font-family: var(--serif-tc); font-weight: 300; font-size: 12px; letter-spacing: 0.3em; color: var(--gold); }
        .title { font-family: var(--serif-kr); font-weight: 300; font-size: 32px; letter-spacing: 0.05em; margin-bottom: 20px; }
        .title .accent { font-weight: 500; background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .title .fail-accent { font-weight: 500; color: var(--vermilion-light); }

        .sub { font-family: var(--serif-kr); font-weight: 300; font-size: 15px; color: var(--text-secondary); line-height: 1.9; letter-spacing: 0.04em; margin-bottom: 32px; }
        .sub strong { color: var(--gold-light); font-weight: 500; }
        .sub.error { color: var(--vermilion-light); }

        .order-summary {
          max-width: 460px;
          margin: 0 auto 32px;
          padding: 18px 22px;
          background: rgba(10, 10, 18, 0.4);
          border: 1px solid var(--border);
          display: flex; flex-direction: column; gap: 10px;
          text-align: left;
        }
        .order-summary > div { display: flex; justify-content: space-between; font-family: var(--serif-kr); font-weight: 300; font-size: 13px; color: var(--text-secondary); }
        .order-summary span:first-child { color: var(--text-tertiary); }
        .order-summary span:last-child { color: var(--white-baekja); }
        .order-summary .mono { font-family: var(--serif-en); font-size: 11px; letter-spacing: 0.03em; }

        .info-box {
          padding: 24px 28px;
          background: linear-gradient(180deg, rgba(31, 58, 95, 0.12) 0%, rgba(20,16,31,0.4) 100%);
          border: 1px solid var(--border); border-left: 3px solid var(--gold);
          text-align: left;
          margin-bottom: 32px;
        }
        .info-box h3 { font-family: var(--serif-kr); font-weight: 500; font-size: 13px; color: var(--gold-light); letter-spacing: 0.15em; margin-bottom: 12px; }
        .info-box ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .info-box li { font-family: var(--serif-kr); font-weight: 300; font-size: 12px; color: var(--text-secondary); line-height: 1.8; padding-left: 14px; position: relative; }
        .info-box li::before { content: '◆'; position: absolute; left: 0; color: var(--gold-deep); font-size: 8px; top: 6px; }
        .info-box strong { color: var(--gold-light); font-weight: 500; }

        .actions { display: flex; gap: 12px; justify-content: center; }
        .btn-primary, .btn-secondary {
          padding: 14px 28px;
          font-family: var(--serif-kr); font-weight: 400;
          font-size: 13px; letter-spacing: 0.15em;
          text-decoration: none;
          transition: all 0.4s ease;
          display: inline-block;
        }
        .btn-primary {
          background: var(--vermilion); color: var(--white-baekja);
          border: 1px solid var(--vermilion);
        }
        .btn-primary:hover {
          background: var(--gold); border-color: var(--gold); color: var(--bg-deep);
        }
        .btn-secondary {
          background: transparent; color: var(--gold-light);
          border: 1px solid var(--border-strong);
        }
        .btn-secondary:hover {
          background: rgba(201, 168, 100, 0.08); border-color: var(--gold);
        }

        @media (max-width: 540px) {
          .complete { padding: 90px 18px 40px; }
          .title { font-size: 24px; }
          .actions { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; }
        }
      `}</style>
    </>
  );
}

export default function CompletePage() {
  return (
    <Suspense fallback={<div style={{ padding: '120px', textAlign: 'center', color: '#C9A864' }}>Loading...</div>}>
      <CompleteInner />
    </Suspense>
  );
}