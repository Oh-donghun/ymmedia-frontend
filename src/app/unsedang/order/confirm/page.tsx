'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';

export default function ConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Toss 결제 위젯 실제 호출
    // 지금은 placeholder
    const t = setTimeout(() => {
      router.push('/unsedang/order/complete');
    }, 3500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <>
      <Starfield density={16000} goldStars={3} />
      <Nav variant="unsedang" />

      <main className="confirm">
        <div className="ritual-wrap">
          {/* 회전하는 사주 원반 */}
          <svg className="ritual-disc" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="discGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C9A864" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#C9A864" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="150" cy="150" r="140" fill="url(#discGlow)"/>
            <circle cx="150" cy="150" r="130" fill="none" stroke="#C9A864" strokeWidth="1" opacity="0.6"/>
            <circle cx="150" cy="150" r="100" fill="none" stroke="#C9A864" strokeWidth="0.5" opacity="0.4"/>
            <circle cx="150" cy="150" r="70" fill="none" stroke="#C9A864" strokeWidth="0.5" opacity="0.3"/>

            {/* 12지 한자 */}
            {['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'].map((c, i) => {
              const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
              const r = 115;
              const x = 150 + r * Math.cos(angle);
              const y = 150 + r * Math.sin(angle);
              return (
                <text
                  key={c}
                  x={x} y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#E4C988"
                  fontFamily="Noto Serif TC"
                  fontSize="16"
                  fontWeight="400"
                >{c}</text>
              );
            })}

            {/* 천간 (내부 원) */}
            {['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'].map((c, i) => {
              const angle = (i / 10) * 2 * Math.PI - Math.PI / 2;
              const r = 50;
              const x = 150 + r * Math.cos(angle);
              const y = 150 + r * Math.sin(angle);
              return (
                <text
                  key={c}
                  x={x} y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#C9A864"
                  fontFamily="Noto Serif TC"
                  fontSize="11"
                  fontWeight="400"
                  opacity="0.7"
                >{c}</text>
              );
            })}

            {/* 중앙 부적 */}
            <text x="150" y="155" textAnchor="middle" dominantBaseline="central" fill="#A8324A" fontFamily="Noto Serif TC" fontSize="32" fontWeight="700">運</text>
          </svg>

          <h1 className="title">결제를 진행하고 있습니다</h1>
          <p className="sub">잠시만 기다려 주세요. 토스페이먼츠로 안전하게 연결됩니다.</p>

          <div className="dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .confirm {
          position: relative; z-index: 10;
          min-height: 80vh;
          display: flex; align-items: center; justify-content: center;
          padding: 160px 24px 80px;
        }
        .ritual-wrap {
          text-align: center;
        }
        .ritual-disc {
          width: 280px; height: 280px;
          margin-bottom: 48px;
          animation: spin 30s linear infinite;
          filter: drop-shadow(0 0 40px rgba(201, 168, 100, 0.2));
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .title {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 32px; letter-spacing: 0.05em;
          color: var(--gold-light);
          margin-bottom: 16px;
        }
        .sub {
          font-family: var(--serif-kr); font-weight: 300;
          font-size: 15px; color: var(--text-secondary);
          line-height: 1.8; letter-spacing: 0.04em;
          margin-bottom: 32px;
        }
        .dots {
          display: inline-flex; gap: 8px;
        }
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
      `}</style>
    </>
  );
}
