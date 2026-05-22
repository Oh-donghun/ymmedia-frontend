'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BRAND_ID } from '@/lib/constants';
import Starfield from '@/components/Starfield';
import SajuForm, { SajuFormData } from '@/components/unsedang/SajuForm';
import BowlCard from '@/components/unsedang/BowlCard';
import SealedCard from '@/components/unsedang/SealedCard';
import styles from './page.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ymmedia-server-svwkzchhha-du.a.run.app';
const PRICE = 9900;
const LIST_PRICE = 14900;
const LIMIT_TOTAL = 100;

interface PreviewResult {
  bowl: string;
  bowlLabelKo: string;
  bowlLabelHanja: string;
  bowlMood: string;
  bowlMoodLabel: string;
  score: number;
  verse: string;
  intro: string;
  sajuSummary: {
    ilju: string;
    ohaeng: string;
    strength: string;
  };
}

export default function J1Page() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState<SajuFormData | null>(null);
  const [limitCount, setLimitCount] = useState(87);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLimit = async () => {
      try {
        const res = await fetch(`${API_URL}/api/limit/j1`);
        if (res.ok) {
          const data = await res.json();
          if (typeof data.count === 'number') setLimitCount(data.count);
        }
      } catch {}
    };
    fetchLimit();
    const interval = setInterval(fetchLimit, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePreview = async (data: SajuFormData) => {
    setLoading(true);
    setFormData(data);
    setUserName(data.name);

    try {
      const res = await fetch(`${API_URL}/api/saju/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ funnel: 'J1', ...data }),
      });

      if (!res.ok) throw new Error('preview failed');
      const result = await res.json();
      setPreview(result);
      setStep('result');

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      alert('사주를 풀어내는 중 문제가 생겼습니다. 다시 시도해 주세요.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!formData) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productCode: 'J1_SINGLE',
          brand: BRAND_ID,
          name: formData.name,
          phone: formData.phone,
          gender: formData.gender,
          birth: {
            year: parseInt(formData.year, 10),
            month: parseInt(formData.month, 10),
            day: parseInt(formData.day, 10),
            hour: formData.unknownTime ? null : parseInt(formData.hour, 10),
            calendar: formData.calendarType,
            isLeapMonth: false,
          },
          agreedTerms: true,
          agreedPrivacy: true,
        }),
      });

      if (!res.ok) throw new Error('order failed');
      const data = await res.json();

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
          customerName: formData.name.trim(),
          customerPhone: formData.phone.replace(/\D/g, ''),
        })
      );
      router.push('/order/confirm');
    } catch (err) {
      alert('결제 진입에 실패했습니다. 다시 시도해 주세요.');
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Starfield />

      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoKo}>운세당</span>
          <span className={styles.logoHanja}>運勢堂</span>
        </Link>
      </header>

      {step === 'form' && (
        <section className={styles.formSection}>
          <h1 className={styles.title}>
            당신은 평생
            <br />
            얼마짜리 그릇이십니까
          </h1>
          <p className={styles.subtitle}>
            운세당이 당신의 돈 그릇을 정성껏 풀이해 드립니다
          </p>

          <SajuForm onSubmit={handlePreview} loading={loading} />

          <div className={styles.belowForm}>
            <small>* 결과는 1분 이내 도착합니다</small>
            <small>* 어떤 정보도 외부에 공유되지 않습니다</small>
          </div>
        </section>
      )}

      {step === 'result' && preview && (
        <section className={styles.resultSection}>
          <h1 className={styles.resultTitle}>
            {userName}님의<br />돈 그릇 풀이
          </h1>

          <BowlCard
            bowl={preview.bowl}
            bowlLabelKo={preview.bowlLabelKo}
            bowlLabelHanja={preview.bowlLabelHanja}
            mood={preview.bowlMoodLabel}
            score={preview.score}
            verse={preview.verse}
            userName={userName}
          />

          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>당신의 사주</h3>
              <ul className={styles.sajuList}>
                <li>
                  <span className={styles.sajuKey}>일주</span>
                  <span className={styles.sajuVal}>{preview.sajuSummary.ilju}</span>
                </li>
                <li>
                  <span className={styles.sajuKey}>오행</span>
                  <span className={styles.sajuVal}>{preview.sajuSummary.ohaeng}</span>
                </li>
                <li>
                  <span className={styles.sajuKey}>강약</span>
                  <span className={styles.sajuVal}>{preview.sajuSummary.strength}</span>
                </li>
              </ul>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>
                당신의 그릇은 &ldquo;{preview.bowlLabelKo}&rdquo;입니다
              </h3>
              <p className={styles.intro}>{preview.intro}</p>
            </div>
          </div>

          <div className={styles.sealedSection}>
            <h2 className={styles.sealedTitle}>봉인된 다섯 풀이</h2>
            <div className={styles.sealedGrid}>
              <SealedCard title="그릇의 무늬" sub="당신만의 결" />
              <SealedCard title="그릇이 빚어진 자리" sub="사주의 근원" />
              <SealedCard title="그릇의 깊이" sub="다섯 단계 측정" />
              <SealedCard title="빛나는 시기" sub="다가오는 창" />
              <SealedCard title="운세당의 한마디" sub="평생의 서사" />
            </div>
          </div>

          <div className={styles.ctaSection}>
            <p className={styles.ctaIntro}>
              🌙 다섯 봉인을 풀고
              <br />
              전체 풀이를 받으세요
            </p>

            <div className={styles.priceBox}>
              <span className={styles.listPrice}>₩{LIST_PRICE.toLocaleString()}</span>
              <span className={styles.salePrice}>₩{PRICE.toLocaleString()}</span>
              <span className={styles.discount}>33% 할인</span>
            </div>

            <div className={styles.limitBox}>
              <div className={styles.limitCounter}>
                [ {limitCount}/{LIMIT_TOTAL} ]
              </div>
              <div className={styles.limitBar}>
                <div
                  className={styles.limitBarFill}
                  style={{ width: `${limitCount}%` }}
                />
              </div>
              <small>100명 한정 또는 ~2026.8.31</small>
            </div>

            <button
              className={styles.ctaButton}
              onClick={handleOrder}
              disabled={loading}
            >
              🔓 전체 풀이 결제하기
            </button>

            <div className={styles.assurance}>
              <small>* 만족 못 하시면 100% 환불</small>
              <small>* 9가지 결제 수단</small>
              <small>* 결과는 카카오톡으로 도착</small>
            </div>
          </div>
          <div className={styles.restartSection}>
            <button
              type="button"
              className={styles.restartBtn}
              onClick={() => { setStep('form'); setPreview(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              ↻ 다른 사주 다시 보기
            </button>
            <small className={styles.restartHint}>가족·친구·연인의 사주도 무료로 풀어보세요</small>
          </div>
        </section>
      )}
    </main>
  );
}