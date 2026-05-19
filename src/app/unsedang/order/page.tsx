'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import { PRODUCT_JAEMUL, COMPANY } from '@/lib/constants';

export default function OrderPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', birthDate: '', birthTime: '', gender: '', phone: '',
    timeUnknown: false,
    agreeAll: false, agreeTerms: false, agreePrivacy: false, agreeRefund: false, agreeNature: false,
  });

  const handleAllAgree = (v: boolean) => {
    setForm(f => ({ ...f, agreeAll: v, agreeTerms: v, agreePrivacy: v, agreeRefund: v, agreeNature: v }));
  };

  const handleAgree = (key: 'agreeTerms' | 'agreePrivacy' | 'agreeRefund' | 'agreeNature', v: boolean) => {
    setForm(f => {
      const next = { ...f, [key]: v };
      next.agreeAll = next.agreeTerms && next.agreePrivacy && next.agreeRefund && next.agreeNature;
      return next;
    });
  };

  const canSubmit =
    form.name.trim() &&
    form.birthDate &&
    (form.timeUnknown || form.birthTime) &&
    form.gender &&
    form.phone.replace(/\D/g, '').length >= 10 &&
    form.agreeTerms && form.agreePrivacy && form.agreeRefund && form.agreeNature;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    router.push('/unsedang/order/confirm');
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
              <span className="text">財物 풀이 · 신청서</span>
              <span className="line"></span>
            </div>
            <h1 className="title">
              <span className="accent">사주 정보</span>를 알려주세요
            </h1>
            <p className="sub">
              운세당이 정확한 풀이를 위해 다음 정보가 필요합니다.<br/>
              입력하신 정보는 오직 사주 풀이에만 사용되며, 안전하게 보호됩니다.
            </p>
          </header>

          <div className="nature-notice">
            <div className="nature-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#C9A864" strokeWidth="1.5"/>
                <path d="M12 8 V13" stroke="#C9A864" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="0.8" fill="#C9A864"/>
              </svg>
            </div>
            <div>
              <strong>본 풀이는 참고용 정보입니다</strong>
              <p>운세당의 사주 풀이는 한국 전통 명리학에 기반한 참고용 정보이며, 의학적·법률적·재정적 조언을 대체하지 않습니다. 중요한 의사결정의 절대적인 근거로 삼아서는 안 됩니다.</p>
            </div>
          </div>

          <div className="order-layout">
            <form onSubmit={handleSubmit} className="form-col">
              <section className="form-sec">
                <h2>1 · 신청자 정보</h2>

                <div className="field">
                  <label>이름 <span className="req">*</span></label>
                  <input type="text" placeholder="홍길동" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>

                <div className="field">
                  <label>성별 <span className="req">*</span></label>
                  <div className="radio-row">
                    {['남자', '여자'].map(g => (
                      <label key={g} className={`radio ${form.gender === g ? "active" : ""}`}>
                        <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={() => setForm({ ...form, gender: g })} />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label>휴대전화 <span className="req">*</span></label>
                  <input type="tel" placeholder="010-1234-5678" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                  <p className="help">풀이 결과를 카카오톡으로 보내드릴 번호입니다.</p>
                </div>
              </section>

              <section className="form-sec">
                <h2>2 · 사주 정보</h2>

                <div className="field">
                  <label>생년월일 (양력) <span className="req">*</span></label>
                  <input type="date" value={form.birthDate} onChange={e => setForm({ ...form, birthDate: e.target.value })} required />
                </div>

                <div className="field">
                  <label>출생 시간 <span className="req">*</span></label>
                  <input type="time" value={form.birthTime} onChange={e => setForm({ ...form, birthTime: e.target.value })} disabled={form.timeUnknown} />
                  <label className="checkbox-sm">
                    <input type="checkbox" checked={form.timeUnknown} onChange={e => setForm({ ...form, timeUnknown: e.target.checked, birthTime: e.target.checked ? '12:00' : '' })} />
                    <span>출생 시간을 모름 (정오 기준으로 풀이)</span>
                  </label>
                  <p className="help">정확한 시주(時柱) 풀이를 위해 가능하면 정확한 시간을 알려주세요.</p>
                </div>
              </section>

              <div className="refund-notice">
                <h3>환불 안내 (반드시 확인)</h3>
                <ul>
                  <li><strong>가능</strong> — 풀이 결과 발송 전 / 회사 시스템 오류로 미수신 / 약속한 내용과 현저히 다른 풀이 제공 시</li>
                  <li><strong>제한</strong> — 풀이 결과가 카카오톡으로 정상 발송된 이후의 단순 변심 (디지털 콘텐츠 특성)</li>
                  <li><strong>재발송</strong> — 발송 후 30일 이내 무료 재발송 가능</li>
                </ul>
                <p className="refund-link">자세한 사항은 <Link href="/refund" target="_blank">환불정책 전문</Link>을 확인해 주세요.</p>
              </div>

              <section className="form-sec">
                <h2>3 · 약관 동의</h2>

                <label className="agree-all">
                  <input type="checkbox" checked={form.agreeAll} onChange={e => handleAllAgree(e.target.checked)} />
                  <span>전체 동의</span>
                </label>

                <ul className="agree-list">
                  <li>
                    <label>
                      <input type="checkbox" checked={form.agreeTerms} onChange={e => handleAgree('agreeTerms', e.target.checked)} />
                      <span>이용약관 동의 <em>(필수)</em></span>
                    </label>
                    <Link href="/terms" target="_blank">보기</Link>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" checked={form.agreePrivacy} onChange={e => handleAgree('agreePrivacy', e.target.checked)} />
                      <span>개인정보 수집 및 이용 동의 <em>(필수)</em></span>
                    </label>
                    <Link href="/privacy" target="_blank">보기</Link>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" checked={form.agreeRefund} onChange={e => handleAgree('agreeRefund', e.target.checked)} />
                      <span>환불정책 동의 — 디지털 콘텐츠 특성상 발송 후 환불 제한 <em>(필수)</em></span>
                    </label>
                    <Link href="/refund" target="_blank">보기</Link>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" checked={form.agreeNature} onChange={e => handleAgree('agreeNature', e.target.checked)} />
                      <span>본 풀이가 참고용 정보임을 이해하며, 중요한 의사결정의 절대적 근거로 사용하지 않을 것에 동의 <em>(필수)</em></span>
                    </label>
                  </li>
                </ul>
              </section>

              <button type="submit" className="submit-btn" disabled={!canSubmit}>
                {canSubmit ? `${PRODUCT_JAEMUL.priceLabel} 결제하기` : '모든 필수 항목을 입력해주세요'}
              </button>
            </form>

            <aside className="summary-col">
              <div className="summary-card">
                <h3>주문 요약</h3>

                <div className="product">
                  <div className="product-seal">
                    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="42" height="42" fill="#A8324A" rx="2"/>
                      <rect x="6" y="6" width="36" height="36" fill="none" stroke="#F5F0E8" strokeWidth="1"/>
                      <text x="24" y="20" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="11" fontWeight="500">財</text>
                      <text x="24" y="36" textAnchor="middle" fill="#F5F0E8" fontFamily="Noto Serif TC" fontSize="11" fontWeight="500">物</text>
                    </svg>
                  </div>
                  <div className="product-info">
                    <h4>{PRODUCT_JAEMUL.name}</h4>
                    <p className="product-hanja">{PRODUCT_JAEMUL.nameHanja}</p>
                    <p className="product-desc">{PRODUCT_JAEMUL.description}</p>
                  </div>
                </div>

                <div className="includes">
                  <h5>포함된 풀이</h5>
                  <ul>
                    {PRODUCT_JAEMUL.axes.map(a => (
                      <li key={a.code}><span className="dot"></span>{a.label}</li>
                    ))}
                  </ul>
                </div>

                <dl className="meta">
                  <div><dt>분량</dt><dd>{PRODUCT_JAEMUL.duration}</dd></div>
                  <div><dt>전달</dt><dd>카카오톡 알림톡</dd></div>
                  <div><dt>발송</dt><dd>결제 후 즉시 (최대 10분)</dd></div>
                  <div><dt>유효기간</dt><dd>발송 후 30일 (재발송 가능)</dd></div>
                </dl>

                <div className="total">
                  <span>총 결제 금액</span>
                  <span className="total-num">{PRODUCT_JAEMUL.priceLabel}</span>
                </div>

                <p className="payment-methods">결제 수단: 신용카드 · 체크카드 · 계좌이체 · 카카오페이 · 네이버페이 · 토스페이</p>
              </div>

              <div className="security">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2 L17 5 V10 Q17 15 10 18 Q3 15 3 10 V5 Z" fill="none" stroke="#C9A864" strokeWidth="1.2"/>
                  <path d="M7 10 L9 12 L13 8" fill="none" stroke="#C9A864" strokeWidth="1.4"/>
                </svg>
                <div>
                  <strong>안전한 결제</strong>
                  <p>토스페이먼츠 PG를 통해 모든 결제 정보가 암호화되어 처리됩니다.</p>
                </div>
              </div>

              <div className="help-links">
                <Link href="/faq" target="_blank">FAQ 자주 묻는 질문 →</Link>
                <Link href="/contact" target="_blank">고객센터 문의 →</Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .order { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; padding: 160px 32px 80px; }
        .order-head { text-align: center; margin-bottom: 40px; }
        .eyebrow { display: inline-flex; align-items: center; gap: 18px; margin-bottom: 24px; }
        .eyebrow .line { width: 36px; height: 1px; background: var(--gold); }
        .eyebrow .text { font-family: var(--serif-tc); font-weight: 300; font-size: 13px; letter-spacing: 0.4em; color: var(--gold); }
        .title { font-family: var(--serif-kr); font-weight: 300; font-size: 42px; letter-spacing: 0.04em; margin-bottom: 20px; }
        .title .accent { font-weight: 500; background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-deep) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .sub { font-family: var(--serif-kr); font-weight: 300; font-size: 15px; color: var(--text-secondary); line-height: 2; letter-spacing: 0.05em; }

        .nature-notice { max-width: 880px; margin: 0 auto 48px; padding: 24px 28px; background: linear-gradient(180deg, rgba(201, 168, 100, 0.08) 0%, rgba(201, 168, 100, 0.02) 100%); border: 1px solid var(--border-strong); border-left: 3px solid var(--gold); display: flex; gap: 16px; align-items: flex-start; }
        .nature-icon { flex-shrink: 0; width: 28px; height: 28px; margin-top: 2px; }
        .nature-icon svg { width: 100%; height: 100%; }
        .nature-notice strong { display: block; font-family: var(--serif-kr); font-weight: 500; font-size: 15px; color: var(--gold-light); letter-spacing: 0.05em; margin-bottom: 6px; }
        .nature-notice p { font-family: var(--serif-kr); font-weight: 300; font-size: 13px; color: var(--text-secondary); line-height: 1.9; letter-spacing: 0.02em; }

        .order-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: flex-start; }
        .form-col { display: flex; flex-direction: column; gap: 32px; }
        .form-sec { padding: 40px; background: linear-gradient(180deg, rgba(26,22,32,0.6) 0%, rgba(20,16,31,0.3) 100%); border: 1px solid var(--border); }
        .form-sec h2 { font-family: var(--serif-kr); font-weight: 500; font-size: 18px; color: var(--gold-light); letter-spacing: 0.15em; margin-bottom: 28px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }
        .field { margin-bottom: 24px; }
        .field:last-child { margin-bottom: 0; }
        .field label { display: block; font-family: var(--serif-kr); font-weight: 400; font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; letter-spacing: 0.05em; }
        .field .req { color: var(--vermilion-light); margin-left: 2px; }
        .field input[type="text"], .field input[type="tel"], .field input[type="date"], .field input[type="time"] { width: 100%; padding: 14px 16px; background: rgba(10, 10, 18, 0.6); border: 1px solid var(--border); color: var(--white-baekja); font-family: var(--sans); font-size: 15px; letter-spacing: 0.02em; transition: border 0.3s ease; color-scheme: dark; }
        .field input:focus { outline: none; border-color: var(--gold); }
        .field input:disabled { opacity: 0.4; cursor: not-allowed; }
        .field .help { margin-top: 8px; font-family: var(--serif-kr); font-weight: 300; font-size: 12px; color: var(--text-tertiary); letter-spacing: 0.03em; line-height: 1.6; }

        .radio-row { display: flex; gap: 12px; }
        .radio { flex: 1; display: flex; align-items: center; justify-content: center; padding: 14px; background: rgba(10, 10, 18, 0.6); border: 1px solid var(--border); cursor: pointer; transition: all 0.3s ease; }
        .radio input { display: none; }
        .radio span { font-family: var(--serif-kr); font-size: 15px; color: var(--text-secondary); }
        .radio.active { border-color: var(--gold); background: rgba(201, 168, 100, 0.08); }
        .radio.active span { color: var(--gold-light); }

        .checkbox-sm { margin-top: 10px; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .checkbox-sm input { width: 16px; height: 16px; accent-color: var(--gold); }
        .checkbox-sm span { font-family: var(--serif-kr); font-weight: 300; font-size: 13px; color: var(--text-secondary); letter-spacing: 0.02em; }

        .refund-notice { padding: 28px 32px; background: linear-gradient(180deg, rgba(168, 50, 74, 0.08) 0%, rgba(168, 50, 74, 0.02) 100%); border: 1px solid var(--border); border-left: 3px solid var(--vermilion); }
        .refund-notice h3 { font-family: var(--serif-kr); font-weight: 500; font-size: 15px; color: var(--vermilion-light); letter-spacing: 0.1em; margin-bottom: 16px; }
        .refund-notice ul { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .refund-notice li { font-family: var(--serif-kr); font-weight: 300; font-size: 13px; color: var(--text-secondary); line-height: 1.9; letter-spacing: 0.02em; padding-left: 18px; position: relative; }
        .refund-notice li::before { content: "◆"; position: absolute; left: 0; color: var(--vermilion-light); font-size: 8px; top: 7px; }
        .refund-notice li strong { color: var(--white-baekja); font-weight: 500; margin-right: 6px; }
        .refund-link { font-family: var(--serif-kr); font-weight: 300; font-size: 12px; color: var(--text-tertiary); letter-spacing: 0.03em; }
        .refund-link :global(a) { color: var(--gold-light); text-decoration: none; border-bottom: 1px solid var(--border); }

        .agree-all { display: flex; align-items: center; gap: 12px; padding: 16px; margin-bottom: 16px; background: rgba(201, 168, 100, 0.06); border: 1px solid var(--border-strong); cursor: pointer; }
        .agree-all input { width: 18px; height: 18px; accent-color: var(--gold); }
        .agree-all span { font-family: var(--serif-kr); font-weight: 500; font-size: 15px; color: var(--gold-light); letter-spacing: 0.05em; }

        .agree-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .agree-list li { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(10, 10, 18, 0.4); border: 1px solid var(--border); }
        .agree-list label { display: flex; align-items: flex-start; gap: 10px; margin: 0; cursor: pointer; flex: 1; }
        .agree-list input { width: 16px; height: 16px; accent-color: var(--gold); margin-top: 3px; flex-shrink: 0; }
        .agree-list span { font-family: var(--serif-kr); font-weight: 300; font-size: 13px; color: var(--text-secondary); margin-bottom: 0; line-height: 1.6; }
        .agree-list em { color: var(--vermilion-light); font-style: normal; font-size: 11px; margin-left: 4px; }
        .agree-list :global(a) { flex-shrink: 0; font-family: var(--serif-kr); font-weight: 300; font-size: 12px; color: var(--gold-deep); text-decoration: none; padding: 4px 10px; border: 1px solid var(--border); letter-spacing: 0.05em; margin-left: 12px; }
        .agree-list :global(a:hover) { color: var(--gold-light); border-color: var(--gold); }

        .submit-btn { padding: 22px; background: var(--vermilion); color: var(--white-baekja); border: 1px solid var(--vermilion); font-family: var(--serif-kr); font-weight: 500; font-size: 17px; letter-spacing: 0.2em; cursor: pointer; transition: all 0.5s ease; }
        .submit-btn:hover:not(:disabled) { background: var(--gold); border-color: var(--gold); color: var(--bg-deep); transform: translateY(-2px); box-shadow: 0 16px 40px rgba(201, 168, 100, 0.25); }
        .submit-btn:disabled { background: var(--bg-card); border-color: var(--border); color: var(--text-tertiary); cursor: not-allowed; font-size: 14px; letter-spacing: 0.1em; }

        .summary-col { position: sticky; top: 100px; }
        .summary-card { padding: 36px; background: linear-gradient(180deg, rgba(31, 58, 95, 0.12) 0%, rgba(20,16,31,0.5) 100%); border: 1px solid var(--border-strong); }
        .summary-card h3 { font-family: var(--serif-kr); font-weight: 500; font-size: 16px; color: var(--gold-light); letter-spacing: 0.2em; padding-bottom: 16px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
        .product { display: flex; gap: 16px; margin-bottom: 24px; }
        .product-seal { flex-shrink: 0; width: 48px; }
        .product-seal svg { width: 100%; height: auto; }
        .product-info h4 { font-family: var(--serif-kr); font-weight: 500; font-size: 18px; color: var(--white-baekja); letter-spacing: 0.05em; margin-bottom: 4px; }
        .product-hanja { font-family: var(--serif-tc); font-size: 12px; color: var(--gold-deep); letter-spacing: 0.1em; margin-bottom: 8px; }
        .product-desc { font-family: var(--serif-kr); font-weight: 300; font-size: 12px; color: var(--text-secondary); line-height: 1.7; }

        .includes { padding: 20px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 20px; }
        .includes h5 { font-family: var(--serif-kr); font-weight: 400; font-size: 12px; color: var(--text-tertiary); letter-spacing: 0.15em; margin-bottom: 12px; }
        .includes ul { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; }
        .includes li { display: flex; align-items: center; gap: 8px; font-family: var(--serif-kr); font-weight: 300; font-size: 13px; color: var(--text-secondary); }
        .includes .dot { width: 4px; height: 4px; background: var(--gold); border-radius: 50%; }

        .meta { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
        .meta > div { display: flex; justify-content: space-between; font-family: var(--serif-kr); font-weight: 300; font-size: 13px; }
        .meta dt { color: var(--text-tertiary); letter-spacing: 0.05em; }
        .meta dd { color: var(--white-baekja); }

        .total { display: flex; justify-content: space-between; align-items: baseline; padding: 12px 0; }
        .total span:first-child { font-family: var(--serif-kr); font-size: 14px; color: var(--gold-light); letter-spacing: 0.1em; }
        .total-num { font-family: var(--serif-en); font-weight: 500; font-size: 28px; background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .payment-methods { margin-top: 16px; font-family: var(--serif-kr); font-weight: 300; font-size: 11px; color: var(--text-tertiary); letter-spacing: 0.03em; line-height: 1.6; text-align: center; }

        .security { margin-top: 16px; padding: 16px; display: flex; gap: 12px; align-items: flex-start; background: rgba(201, 168, 100, 0.04); border: 1px solid var(--border); }
        .security svg { flex-shrink: 0; margin-top: 2px; }
        .security strong { display: block; font-family: var(--serif-kr); font-weight: 500; font-size: 13px; color: var(--gold-light); letter-spacing: 0.05em; margin-bottom: 4px; }
        .security p { font-family: var(--serif-kr); font-weight: 300; font-size: 11px; color: var(--text-tertiary); line-height: 1.7; }

        .help-links { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
        .help-links :global(a) { font-family: var(--serif-kr); font-weight: 300; font-size: 12px; color: var(--gold-deep); text-decoration: none; padding: 10px 14px; background: rgba(10, 10, 18, 0.4); border: 1px solid var(--border); letter-spacing: 0.03em; transition: all 0.3s ease; }
        .help-links :global(a:hover) { color: var(--gold-light); border-color: var(--gold); }

        @media (max-width: 968px) {
          .order { padding: 120px 20px 60px; }
          .title { font-size: 28px; }
          .order-layout { grid-template-columns: 1fr; }
          .summary-col { position: static; }
          .form-sec { padding: 28px 20px; }
          .summary-card { padding: 24px; }
          .includes ul { grid-template-columns: 1fr; }
          .nature-notice { padding: 20px; flex-direction: column; gap: 12px; }
        }
      `}</style>
    </>
  );
}
