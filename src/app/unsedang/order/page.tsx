'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import { SINGLE_PRODUCTS, FUNNELS, API_BASE_URL, BRAND_ID } from '@/lib/constants';

const PRODUCT = SINGLE_PRODUCTS.J1;
const FUNNEL = FUNNELS.J1;
const PRICE_LABEL = `₩${PRODUCT.priceNonMember.toLocaleString()}`;

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 80 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function OrderPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [autoFilled, setAutoFilled] = useState(false);

  // localStorage에서 이전 사주 정보 자동 로드 (6개월 유효)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('unsedang_saju_profile');
      if (!saved) return;
      const data = JSON.parse(saved);
      const savedAt = new Date(data.savedAt || 0).getTime();
      const now = Date.now();
      const days180 = 180 * 24 * 60 * 60 * 1000;
      if (now - savedAt > days180) {
        localStorage.removeItem('unsedang_saju_profile');
        return;
      }
      setForm((prev) => ({
        ...prev,
        name: data.name || prev.name,
        gender: data.gender || prev.gender,
        phone: data.phone || prev.phone,
        year: data.year || prev.year,
        month: data.month || prev.month,
        day: data.day || prev.day,
        hour: data.hour || prev.hour,
        timeUnknown: data.timeUnknown ?? prev.timeUnknown,
      }));
      setAutoFilled(true);
    } catch (err) {
      console.error('autofill failed', err);
    }
  }, []);

  const resetAutoFill = () => {
    if (!confirm('입력 정보를 모두 초기화하시겠습니까?')) return;
    localStorage.removeItem('unsedang_saju_profile');
    setForm({
      name: '', gender: '', phone: '',
      year: '1990', month: '6', day: '15', hour: '12',
      timeUnknown: false, agree: false,
    });
    setAutoFilled(false);
  };
  const [form, setForm] = useState({
    name: '',
    gender: '',
    phone: '',
    year: '1990',
    month: '6',
    day: '15',
    hour: '12',
    timeUnknown: false,
    agree: false,
  });

  const canSubmit =
    form.name.trim() &&
    form.gender &&
    form.phone.replace(/\D/g, '').length >= 10 &&
    form.year && form.month && form.day &&
    (form.timeUnknown || form.hour !== '') &&
    form.agree &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        productCode: PRODUCT.code,
        brand: BRAND_ID, // 'naread' or 'ymmedia'
        name: form.name.trim(),
        phone: form.phone.replace(/\D/g, ''),
        gender: form.gender === '남자' ? 'male' : 'female',
        birth: {
          year: Number(form.year),
          month: Number(form.month),
          day: Number(form.day),
          hour: form.timeUnknown ? null : Number(form.hour),
          minute: 0,
          calendar: 'solar',
          isLeapMonth: false,
        },
        agreedTerms: true,
        agreedPrivacy: true,
      };

      const res = await fetch(`${API_BASE_URL}/api/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || '주문 생성 실패');
        setSubmitting(false);
        return;
      }

      // sessionStorage에 주문 정보 저장 (confirm 페이지에서 토스 위젯 호출 시 사용)
      // 자동 채움용 사주 정보 영구 저장 (6개월 유효)
        try {
          localStorage.setItem('unsedang_saju_profile', JSON.stringify({
            name: form.name.trim(),
            gender: form.gender,
            phone: form.phone.replace(/\D/g, ''),
            year: form.year,
            month: form.month,
            day: form.day,
            hour: form.hour,
            timeUnknown: form.timeUnknown,
            savedAt: new Date().toISOString(),
          }));
        } catch (e) { console.error('localStorage save failed', e); }

        sessionStorage.setItem(
        'unsedang_order',
        JSON.stringify({
          orderId: data.orderId,
          brand: data.brand,
          amount: data.amount,
          productName: data.productName,
          funnel: data.funnel,
          tossMode: data.tossMode,
          tossClientKey: data.tossClientKey,
          customerName: form.name.trim(),
          customerPhone: form.phone.replace(/\D/g, ''),
        })
      );

      router.push('/unsedang/order/confirm');
    } catch (err) {
      console.error(err);
      setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setSubmitting(false);
    }
  };

  return (
    <>
      <Starfield density={14000} goldStars={4} />
      <Nav variant="unsedang" />

      <main className="order">
        <div className="order-inner">
          <header className="order-head">
            <div className="eyebrow">
              <span className="line"></span>
              <span className="text">{PRODUCT.name}</span>
              <span className="line"></span>
            </div>
            <h1 className="title">
              <span className="accent">사주 정보</span>를 알려주세요
            </h1>
          </header>

          <div className="order-layout">
            <form onSubmit={handleSubmit} className="form-col">
                {autoFilled && (
                  <div className="autofill-banner">
                    <span className="autofill-icon">✓</span>
                    <span className="autofill-text">이전 입력 정보가 자동 채움되었습니다</span>
                    <button type="button" onClick={resetAutoFill} className="autofill-reset">초기화</button>
                  </div>
                )}
              <div className="form-row">
                <div className="field half">
                  <label>이름 <span className="req">*</span></label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="field half">
                  <label>성별 <span className="req">*</span></label>
                  <div className="radio-row">
                    {['남자', '여자'].map(g => (
                      <label key={g} className={`radio ${form.gender === g ? "active" : ""}`}>
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={form.gender === g}
                          onChange={() => setForm({ ...form, gender: g })}
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="field">
                <label>휴대전화 <span className="req">*</span></label>
                <input
                  type="tel"
                  placeholder="01012345678"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
                <p className="help">풀이 결과를 카카오톡으로 보내드릴 번호입니다.</p>
              </div>

              <div className="field">
                <label>생년월일 (양력) <span className="req">*</span></label>
                <div className="select-row">
                  <select value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required>
                    <option value="">년</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}년</option>)}
                  </select>
                  <select value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} required>
                    <option value="">월</option>
                    {MONTHS.map(m => <option key={m} value={m}>{m}월</option>)}
                  </select>
                  <select value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} required>
                    <option value="">일</option>
                    {DAYS.map(d => <option key={d} value={d}>{d}일</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label>출생 시간 <span className="req">*</span></label>
                <div className="time-row">
                  <select
                    value={form.hour}
                    onChange={e => setForm({ ...form, hour: e.target.value })}
                    disabled={form.timeUnknown}
                    required={!form.timeUnknown}
                  >
                    <option value="">시간 선택</option>
                    {HOURS.map(h => <option key={h} value={h}>{h.toString().padStart(2, '0')}시</option>)}
                  </select>
                  <label className="checkbox-sm">
                    <input
                      type="checkbox"
                      checked={form.timeUnknown}
                      onChange={e => setForm({ ...form, timeUnknown: e.target.checked, hour: e.target.checked ? '12' : '' })}
                    />
                    <span>시간 모름</span>
                  </label>
                </div>
              </div>

              <label className="agree-line">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={e => setForm({ ...form, agree: e.target.checked })}
                />
                <span><strong>(필수)</strong> 약관 동의</span>
              </label>
              <p className="agree-links">
                <Link href="/terms" target="_blank" rel="noopener noreferrer">이용약관</Link>
                <span className="sep">·</span>
                <Link href="/privacy" target="_blank" rel="noopener noreferrer">개인정보처리방침</Link>
                <span className="sep">·</span>
                <Link href="/refund" target="_blank" rel="noopener noreferrer">환불정책</Link>
                <span className="sep">보기</span>
              </p>

              <p className="micro-notice">
                본 풀이는 명리학 기반 참고용 정보입니다. · 디지털 콘텐츠 특성상 발송 후 환불 제한 · 발송 후 30일 무료 재발송
              </p>

              {errorMsg && (
                <p className="error-msg">⚠ {errorMsg}</p>
              )}

              <button type="submit" className="submit-btn mobile-only" disabled={!canSubmit}>
                {submitting ? '주문 생성 중...' : (canSubmit ? `${PRICE_LABEL} 결제하기` : '모든 항목을 입력해주세요')}
              </button>
            </form>

            <aside className="summary-col">
              <div className="summary-card">
                <div className="product">
                  <div className="product-seal">
                    <svg viewBox="0 0 36 60" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="32" height="56" rx="4" fill="#A8324A" stroke="#8B2238" strokeWidth="1"/>
                      <rect x="4" y="4" width="28" height="52" rx="3" fill="none" stroke="#F5F0E8" strokeWidth="0.6"/>
                      <text x="18" y="25" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="13" fontWeight="500">運</text>
                      <text x="18" y="46" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="13" fontWeight="500">勢</text>
                    </svg>
                  </div>
                  <div className="product-info">
                    <h4>{PRODUCT.name}</h4>
                    <p className="product-desc">{FUNNEL.desc}</p>
                  </div>
                </div>

                <dl className="meta">
                  <div><dt>분량</dt><dd>{PRODUCT.duration}</dd></div>
                  <div><dt>전달</dt><dd>카카오톡 알림톡</dd></div>
                  <div><dt>발송</dt><dd>결제 후 즉시</dd></div>
                </dl>

                <div className="total">
                  <span>총 결제 금액</span>
                  <span className="total-num">{PRICE_LABEL}</span>
                </div>

                <button
                  type="button"
                  className="submit-btn desktop-only"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  {submitting ? '주문 생성 중...' : (canSubmit ? `${PRICE_LABEL} 결제하기` : '입력 완료 시 활성화')}
                </button>

                <p className="payment-methods">카드 · 계좌이체 · 카카오페이 · 네이버페이 · 토스페이</p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .order { position: relative; z-index: 10; max-width: 1080px; margin: 0 auto; padding: 100px 24px 60px; }
        .order-head { text-align: center; margin-bottom: 32px; }
        .eyebrow { display: inline-flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .eyebrow .line { width: 28px; height: 1px; background: var(--gold); }
        .eyebrow .text { font-family: var(--serif-tc); font-weight: 300; font-size: 12px; letter-spacing: 0.4em; color: var(--gold); }
        .title { font-family: var(--serif-kr); font-weight: 300; font-size: 28px; letter-spacing: 0.04em; margin: 0; }
        .title .accent { font-weight: 500; background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }

        .order-layout { display: grid; grid-template-columns: 1.3fr 1fr; gap: 28px; align-items: flex-start; }
        .form-col { display: flex; flex-direction: column; gap: 18px; padding: 28px; background: linear-gradient(180deg, rgba(26,22,32,0.6) 0%, rgba(20,16,31,0.3) 100%); border: 1px solid var(--border); }
        .autofill-banner { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: rgba(201, 168, 100, 0.08); border: 1px solid rgba(201, 168, 100, 0.3); font-family: var(--serif-kr); font-size: 12px; color: var(--gold-light); letter-spacing: 0.02em; margin-bottom: 4px; }
        .autofill-icon { flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%; background: var(--gold); color: var(--bg-deep); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }
        .autofill-text { flex: 1; font-weight: 300; }
        .autofill-reset { background: transparent; border: 1px solid var(--gold-deep); color: var(--gold-light); font-family: var(--serif-kr); font-size: 11px; padding: 4px 10px; cursor: pointer; letter-spacing: 0.05em; transition: all 0.2s; }
        .autofill-reset:hover { background: var(--gold); color: var(--bg-deep); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .field { display: flex; flex-direction: column; }
        .field label { font-family: var(--serif-kr); font-weight: 400; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; letter-spacing: 0.05em; }
        .field .req { color: var(--vermilion-light); margin-left: 2px; }
        .field input[type="text"], .field input[type="tel"] {
          width: 100%; box-sizing: border-box; padding: 11px 13px;
          background: rgba(10, 10, 18, 0.6); border: 1px solid var(--border);
          color: var(--white-baekja); font-family: var(--sans); font-size: 14px;
        }
        .field input:focus { outline: none; border-color: var(--gold); }
        .field .help { margin-top: 4px; font-family: var(--serif-kr); font-weight: 300; font-size: 11px; color: var(--text-tertiary); }

        .radio-row { display: flex; gap: 6px; }
        .radio { flex: 1; display: flex; align-items: center; justify-content: center; padding: 10px; background: rgba(10, 10, 18, 0.6); border: 1px solid var(--border); cursor: pointer; transition: all 0.3s ease; }
        .radio input { display: none; }
        .radio span { font-family: var(--serif-kr); font-size: 14px; color: var(--text-secondary); }
        .radio.active { border-color: var(--gold); background: rgba(201, 168, 100, 0.08); }
        .radio.active span { color: var(--gold-light); }

        .select-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        .time-row { display: flex; gap: 12px; align-items: center; }
        .time-row select { flex: 1; }
        .field select {
          width: 100%; box-sizing: border-box; padding: 11px 12px;
          background: rgba(10, 10, 18, 0.6); border: 1px solid var(--border);
          color: var(--white-baekja); font-family: var(--sans); font-size: 14px;
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23C9A864' d='M5 6L0 0h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 10px center; padding-right: 28px; cursor: pointer;
        }
        .field select:focus { outline: none; border-color: var(--gold); }
        .field select:disabled { opacity: 0.4; cursor: not-allowed; }

        .checkbox-sm { display: flex; align-items: center; gap: 6px; cursor: pointer; white-space: nowrap; }
        .checkbox-sm input { width: 14px; height: 14px; accent-color: var(--gold); }
        .checkbox-sm span { font-family: var(--serif-kr); font-weight: 300; font-size: 12px; color: var(--text-secondary); }

        .agree-line { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 16px; background: rgba(10, 10, 18, 0.45); border: 1px solid var(--border); cursor: pointer; transition: all 0.25s ease; user-select: none; }
        .agree-line:hover { border-color: var(--gold-deep); background: rgba(10, 10, 18, 0.6); }
        .agree-line input { width: 18px; height: 18px; accent-color: var(--gold); flex-shrink: 0; cursor: pointer; }
        .agree-line span { font-family: var(--serif-kr); font-weight: 400; font-size: 14px; color: var(--text-secondary); line-height: 1.5; }
        .agree-line strong { color: var(--vermilion-light); font-weight: 500; margin-right: 4px; }
        .agree-links { margin: 8px 0 0; text-align: center; font-family: var(--serif-kr); font-weight: 300; font-size: 11px; color: var(--text-tertiary); letter-spacing: 0.02em; }
        .agree-links :global(a) { color: var(--text-tertiary); text-decoration: underline; text-decoration-color: var(--border-strong); text-underline-offset: 2px; transition: color 0.2s; }
        .agree-links :global(a:hover) { color: var(--gold-light); }
        .agree-links .sep { margin: 0 6px; color: var(--text-tertiary); }

        .micro-notice { font-family: var(--serif-kr); font-weight: 300; font-size: 11px; color: var(--text-tertiary); line-height: 1.7; text-align: center; }

        .error-msg {
          padding: 10px 14px;
          background: rgba(168, 50, 74, 0.15);
          border: 1px solid var(--vermilion);
          color: var(--vermilion-light);
          font-family: var(--serif-kr); font-size: 13px;
          text-align: center;
        }

        .summary-col { position: sticky; top: 90px; }
        .summary-card { padding: 28px 24px; background: linear-gradient(180deg, rgba(31, 58, 95, 0.12) 0%, rgba(20,16,31,0.5) 100%); border: 1px solid var(--border-strong); }

        .product { display: flex; gap: 14px; margin-bottom: 22px; align-items: flex-start; }
        .product-seal { flex-shrink: 0; width: 36px; filter: drop-shadow(0 0 10px rgba(168, 50, 74, 0.3)); }
        .product-seal svg { width: 100%; height: auto; display: block; }
        .product-info h4 { font-family: var(--serif-kr); font-weight: 500; font-size: 17px; color: var(--white-baekja); margin: 0 0 4px; }
        .product-desc { font-family: var(--serif-kr); font-weight: 300; font-size: 12px; color: var(--text-secondary); line-height: 1.6; margin: 0; }

        .meta { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid var(--border); }
        .meta > div { display: flex; justify-content: space-between; font-family: var(--serif-kr); font-weight: 300; font-size: 12px; }
        .meta dt { color: var(--text-tertiary); letter-spacing: 0.05em; }
        .meta dd { color: var(--white-baekja); margin: 0; }

        .total { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 18px; }
        .total span:first-child { font-family: var(--serif-kr); font-size: 13px; color: var(--gold-light); letter-spacing: 0.1em; }
        .total-num { font-family: var(--serif-en); font-weight: 500; font-size: 26px; background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }

        .submit-btn {
          width: 100%; padding: 16px;
          background: var(--vermilion); color: var(--white-baekja);
          border: 1px solid var(--vermilion);
          font-family: var(--serif-kr); font-weight: 500; font-size: 15px; letter-spacing: 0.15em;
          cursor: pointer; transition: all 0.4s ease;
        }
        .submit-btn:hover:not(:disabled) { background: var(--gold); border-color: var(--gold); color: var(--bg-deep); }
        .submit-btn:disabled { background: var(--bg-card); border-color: var(--border); color: var(--text-tertiary); cursor: not-allowed; font-size: 13px; letter-spacing: 0.1em; }

        .payment-methods { margin-top: 12px; font-family: var(--serif-kr); font-weight: 300; font-size: 10px; color: var(--text-tertiary); letter-spacing: 0.03em; line-height: 1.6; text-align: center; }

        .mobile-only { display: none; }
        .desktop-only { display: block; }

        @media (max-width: 768px) {
          .order { padding: 90px 14px 40px; }
          .title { font-size: 22px; }
          .order-layout { grid-template-columns: 1fr; gap: 18px; }
          .summary-col { position: static; }
          .form-col { padding: 18px 14px; gap: 14px; }
          .summary-card { padding: 18px 16px; }
          .mobile-only { display: block; }
          .desktop-only { display: none; }
          .form-row { grid-template-columns: 1fr; gap: 14px; }
        }
      `}</style>
    </>
  );
}