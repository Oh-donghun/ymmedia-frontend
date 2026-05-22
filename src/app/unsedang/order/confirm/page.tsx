'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';

type OrderInfo = {
  orderId: string;
  brand: 'naread' | 'ymmedia';
  amount: number;
  productName: string;
  funnel: string;
  tossMode: 'test' | 'live';
  tossClientKey: string;
  customerName: string;
  customerPhone: string;
};

type PaymentInstance = Awaited<
  ReturnType<Awaited<ReturnType<typeof loadTossPayments>>['payment']>
>;

export default function ConfirmPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const paymentRef = useRef<PaymentInstance | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('unsedang_order');
    if (!stored) {
      setErrorMsg('주문 정보가 없습니다. 다시 신청해주세요.');
      setLoading(false);
      return;
    }

    let parsed: OrderInfo;
    try {
      parsed = JSON.parse(stored) as OrderInfo;
    } catch {
      setErrorMsg('주문 정보가 손상되었습니다. 다시 신청해주세요.');
      setLoading(false);
      return;
    }

    if (!parsed.tossClientKey) {
      setErrorMsg('결제 키가 설정되지 않았습니다. 다시 신청해주세요.');
      setLoading(false);
      return;
    }

    setOrder(parsed);

    (async () => {
      try {
        const tossPayments = await loadTossPayments(parsed.tossClientKey);
        paymentRef.current = tossPayments.payment({ customerKey: ANONYMOUS });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setErrorMsg('결제 모듈을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
        setLoading(false);
      }
    })();
  }, []);

  const handlePay = async () => {
    if (!paymentRef.current || !order || paying) return;
    setPaying(true);
    setErrorMsg('');

    try {
      const origin = window.location.origin;
      await paymentRef.current.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: order.amount },
        orderId: order.orderId,
        orderName: order.productName,
        successUrl: `${origin}/unsedang/order/complete/?brand=${order.brand}`,
        failUrl: `${origin}/unsedang/order/complete/?brand=${order.brand}&fail=1`,
        customerName: order.customerName,
        customerMobilePhone: order.customerPhone,
        card: { flowMode: 'DEFAULT' },
      });
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e?.code === 'USER_CANCEL') {
        setPaying(false);
        return;
      }
      console.error(err);
      setErrorMsg(e?.message || '결제 요청 중 오류가 발생했습니다.');
      setPaying(false);
    }
  };

  return (
    <>
      <Starfield density={14000} goldStars={3} />
      <Nav variant="unsedang" />

      <main className="confirm">
        <div className="confirm-inner">
          <header className="confirm-head">
            <div className="eyebrow">
              <span className="line"></span>
              <span className="text">財物 풀이 · 결제</span>
              <span className="line"></span>
            </div>
            <h1 className="title">
              <span className="accent">결제</span>를 진행해 주세요
            </h1>
            <p className="lead">
              아래 결제 버튼을 누르면 안전한 토스 결제창이 열립니다.<br />
              카드 · 카카오페이 · 토스페이 · 삼성페이 등 9가지 결제수단을 지원합니다.
            </p>
          </header>

          {errorMsg && (
            <div className="error-box">
              <p>⚠ {errorMsg}</p>
              <button onClick={() => router.push('/order')} className="retry">
                다시 신청하기
              </button>
            </div>
          )}

          {loading && !errorMsg && (
            <div className="loading">
              <div className="dots"><span></span><span></span><span></span></div>
              <p>결제 모듈을 준비 중입니다...</p>
            </div>
          )}

          {!loading && !errorMsg && order && (
            <>
              <section className="summary">
                <div className="summary-head">
                  <span className="badge">주문 내역</span>
                </div>
                <div className="summary-row">
                  <span className="k">상품</span>
                  <span className="v">{order.productName}</span>
                </div>
                <div className="summary-row">
                  <span className="k">주문자</span>
                  <span className="v">{order.customerName}</span>
                </div>
                <div className="summary-row">
                  <span className="k">연락처</span>
                  <span className="v mono">{order.customerPhone}</span>
                </div>
                <div className="summary-row">
                  <span className="k">주문번호</span>
                  <span className="v mono small">{order.orderId}</span>
                </div>
                <div className="divider"></div>
                <div className="summary-row total">
                  <span className="k">결제 금액</span>
                  <span className="v price">₩{order.amount.toLocaleString()}</span>
                </div>
              </section>

              <div className="notice">
                <span className="dot-gold"></span>
                <span>결제 완료 후 약 10분 이내 카카오톡 알림톡으로 풀이 결과가 도착합니다.</span>
              </div>

              <button
                onClick={handlePay}
                className="pay-btn"
                disabled={paying}
                aria-busy={paying}
              >
                {paying ? '결제창을 여는 중...' : `₩${order.amount.toLocaleString()} 결제하기`}
              </button>

              <p className="terms">
                결제 시 <a href="/terms" target="_blank" rel="noopener noreferrer">이용약관</a>
                {' · '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">개인정보처리방침</a>
                {' · '}
                <a href="/refund" target="_blank" rel="noopener noreferrer">환불정책</a>
                {' '}에 동의한 것으로 간주됩니다.
              </p>
            </>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .confirm {
          position: relative; z-index: 10;
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          padding: 100px 24px 60px;
          box-sizing: border-box;
          overflow-x: hidden;
        }
        .confirm * { box-sizing: border-box; }
        .confirm-inner { width: 100%; }
        .confirm-head { text-align: center; margin-bottom: 40px; }
        .eyebrow { display: inline-flex; align-items: center; gap: 14px; margin-bottom: 16px; }
        .eyebrow .line { width: 28px; height: 1px; background: var(--gold); }
        .eyebrow .text {
          font-family: var(--serif-tc); font-weight: 300;
          font-size: 12px; letter-spacing: 0.4em; color: var(--gold);
        }
        .title {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 30px; letter-spacing: 0.05em;
          margin: 0 0 16px;
        }
        .title .accent {
          font-weight: 500;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .lead {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 13px; line-height: 1.9;
          color: var(--text-secondary); letter-spacing: 0.03em;
          margin: 0;
        }

        .summary {
          background: linear-gradient(180deg, rgba(31, 58, 95, 0.12) 0%, rgba(20,16,31,0.55) 100%);
          border: 1px solid var(--border);
          border-left: 3px solid var(--gold);
          padding: 26px 28px;
          margin-bottom: 20px;
        }
        .summary-head { margin-bottom: 18px; }
        .badge {
          display: inline-block;
          font-family: var(--serif-kr); font-weight: 500;
          font-size: 11px; letter-spacing: 0.25em;
          color: var(--gold-light);
          padding: 4px 12px;
          border: 1px solid var(--gold-deep);
        }
        .summary-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 9px 0;
          font-family: var(--serif-kr);
        }
        .summary-row .k {
          font-weight: 300; font-size: 12px;
          color: var(--text-tertiary); letter-spacing: 0.1em;
        }
        .summary-row .v {
          font-weight: 400; font-size: 14px;
          color: var(--white-baekja); text-align: right;
        }
        .summary-row .mono {
          font-family: var(--serif-en);
          font-size: 12px; letter-spacing: 0.02em;
        }
        .summary-row .mono.small { font-size: 11px; color: var(--text-secondary); }
        .divider {
          height: 1px;
          background: var(--border);
          margin: 8px 0;
        }
        .summary-row.total .k {
          font-size: 13px; color: var(--gold-light);
          font-weight: 500; letter-spacing: 0.15em;
        }
        .summary-row.total .v.price {
          font-family: var(--serif-kr); font-weight: 500;
          font-size: 22px;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          letter-spacing: 0.02em;
        }

        .notice {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: rgba(201, 168, 100, 0.06);
          border: 1px solid rgba(201, 168, 100, 0.2);
          margin-bottom: 22px;
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 12px; line-height: 1.6;
          color: var(--text-secondary); letter-spacing: 0.02em;
        }
        .dot-gold {
          flex-shrink: 0;
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 8px rgba(201, 168, 100, 0.6);
        }

        .pay-btn {
          width: 100%;
          padding: 20px;
          background: var(--vermilion);
          color: var(--white-baekja);
          border: 1px solid var(--vermilion);
          font-family: var(--serif-kr); font-weight: 500;
          font-size: 16px; letter-spacing: 0.18em;
          cursor: pointer;
          transition: all 0.35s ease;
          position: relative;
        }
        .pay-btn:hover:not(:disabled) {
          background: var(--gold); border-color: var(--gold); color: var(--bg-deep);
          box-shadow: 0 8px 24px rgba(201, 168, 100, 0.25);
        }
        .pay-btn:disabled {
          opacity: 0.6; cursor: not-allowed;
        }

        .terms {
          margin-top: 18px;
          text-align: center;
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 11px; line-height: 1.8;
          color: var(--text-tertiary); letter-spacing: 0.02em;
        }
        .terms a {
          color: var(--text-secondary);
          text-decoration: underline;
          text-decoration-color: var(--border-strong);
          text-underline-offset: 2px;
          transition: color 0.2s;
        }
        .terms a:hover { color: var(--gold-light); }

        .loading { text-align: center; padding: 80px 0; }
        .loading p {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 14px; color: var(--text-secondary);
          margin-top: 20px; letter-spacing: 0.05em;
        }
        .dots { display: inline-flex; gap: 8px; }
        .dots span {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--gold);
          animation: dot 1.4s ease-in-out infinite;
        }
        .dots span:nth-child(2) { animation-delay: 0.2s; }
        .dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .error-box {
          padding: 28px;
          background: rgba(168, 50, 74, 0.12);
          border: 1px solid var(--vermilion);
          text-align: center;
        }
        .error-box p {
          font-family: var(--serif-kr); font-weight: 400;
          font-size: 15px; color: var(--vermilion-light);
          margin-bottom: 20px;
        }
        .retry {
          padding: 12px 28px;
          background: var(--vermilion);
          color: var(--white-baekja);
          border: 1px solid var(--vermilion);
          font-family: var(--serif-kr); font-size: 14px; letter-spacing: 0.1em;
          cursor: pointer;
        }
        .retry:hover { background: var(--gold); border-color: var(--gold); color: var(--bg-deep); }

        @media (max-width: 540px) {
          .confirm { padding: 90px 16px 40px; }
          .title { font-size: 24px; }
          .lead { font-size: 12px; }
          .summary { padding: 22px 20px; }
          .summary-row.total .v.price { font-size: 19px; }
          .pay-btn { padding: 17px; font-size: 15px; letter-spacing: 0.15em; }
        }
      `}</style>
    </>
  );
}