'use client';

import { useState, useEffect } from 'react';
import styles from './SajuForm.module.css';

export interface SajuFormData {
  name: string;
  gender: 'male' | 'female';
  phone: string;
  calendarType: 'solar' | 'lunar';
  year: string;
  month: string;
  day: string;
  hour: string;
  unknownTime: boolean;
}

interface SajuFormProps {
  onSubmit: (data: SajuFormData) => void;
  loading?: boolean;
}

const STORAGE_KEY = 'unsedang_saju_profile';
const STORAGE_TTL = 6 * 30 * 24 * 60 * 60 * 1000; // 6개월

export default function SajuForm({ onSubmit, loading = false }: SajuFormProps) {
  const [form, setForm] = useState<SajuFormData>({
    name: '',
    gender: 'male',
    phone: '',
    calendarType: 'solar',
    year: '1990',
    month: '6',
    day: '15',
    hour: '12',
    unknownTime: false,
  });
  const [agreed, setAgreed] = useState(false);
  const [autofilled, setAutofilled] = useState(false);

  // 자동 채움
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (Date.now() - parsed.savedAt > STORAGE_TTL) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      setForm(parsed.data);
      setAutofilled(true);
    } catch {}
  }, []);

  const resetAutofill = () => {
    localStorage.removeItem(STORAGE_KEY);
    setForm({
      name: '',
      gender: 'male',
      phone: '',
      calendarType: 'solar',
      year: '1990',
      month: '6',
      day: '15',
      hour: '12',
      unknownTime: false,
    });
    setAutofilled(false);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return alert('이름을 입력해 주세요');
    if (!form.phone.trim()) return alert('휴대전화 번호를 입력해 주세요');
    if (!/^\d{3}-?\d{3,4}-?\d{4}$/.test(form.phone.replace(/\s/g, ''))) {
      return alert('휴대전화 번호 형식이 올바르지 않습니다');
    }
    if (!agreed) return alert('약관에 동의해 주세요');

    // localStorage 저장
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        data: form,
        savedAt: Date.now(),
      }));
    } catch {}

    onSubmit(form);
  };

  const years = Array.from({ length: 90 }, (_, i) => 2025 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const HOUR_BRANCH: { [k: number]: string } = {
    0:'자시 子', 1:'자시 子', 2:'축시 丑', 3:'축시 丑',
    4:'인시 寅', 5:'인시 寅', 6:'묘시 卯', 7:'묘시 卯',
    8:'진시 辰', 9:'진시 辰', 10:'사시 巳', 11:'사시 巳',
    12:'오시 午', 13:'오시 午', 14:'미시 未', 15:'미시 未',
    16:'신시 申', 17:'신시 申', 18:'유시 酉', 19:'유시 酉',
    20:'술시 戌', 21:'술시 戌', 22:'해시 亥', 23:'해시 亥'
  };

  return (
    <div className={styles.form}>
      {autofilled && (
        <div className={styles.autofillBanner}>
          <span>✨ 이전 정보가 자동으로 채워졌습니다</span>
          <button onClick={resetAutofill} className={styles.resetBtn}>초기화</button>
        </div>
      )}

      <div className={styles.field}>
        <label>이름</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="홍길동"
          maxLength={20}
        />
      </div>

      <div className={styles.field}>
        <label>성별</label>
        <div className={styles.optGroup}>
          <button
            type="button"
            className={`${styles.optBtn} ${form.gender === 'male' ? styles.active : ''}`}
            onClick={() => setForm({ ...form, gender: 'male' })}
          >
            남자
          </button>
          <button
            type="button"
            className={`${styles.optBtn} ${form.gender === 'female' ? styles.active : ''}`}
            onClick={() => setForm({ ...form, gender: 'female' })}
          >
            여자
          </button>
        </div>
      </div>

      <div className={styles.field}>
        <label>휴대전화</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="010-1234-5678"
          maxLength={13}
        />
      </div>

      <div className={styles.field}>
        <label>양력 / 음력</label>
        <div className={styles.optGroup}>
          <button
            type="button"
            className={`${styles.optBtn} ${form.calendarType === 'solar' ? styles.active : ''}`}
            onClick={() => setForm({ ...form, calendarType: 'solar' })}
          >
            양력
          </button>
          <button
            type="button"
            className={`${styles.optBtn} ${form.calendarType === 'lunar' ? styles.active : ''}`}
            onClick={() => setForm({ ...form, calendarType: 'lunar' })}
          >
            음력
          </button>
        </div>
      </div>

      <div className={styles.field}>
        <label>생년월일</label>
        <div className={styles.dateGroup}>
          <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
            {years.map((y) => <option key={y} value={y}>{y}년</option>)}
          </select>
          <select value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })}>
            {months.map((m) => <option key={m} value={m}>{m}월</option>)}
          </select>
          <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
            {days.map((d) => <option key={d} value={d}>{d}일</option>)}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label>태어난 시</label>
        <div className={styles.timeRow}>
          <select
            value={form.hour}
            onChange={(e) => setForm({ ...form, hour: e.target.value })}
            disabled={form.unknownTime}
          >
            {hours.map((h) => <option key={h} value={h}>{h}시 ({HOUR_BRANCH[h]})</option>)}
          </select>
          <button
            type="button"
            className={`${styles.optBtn} ${form.unknownTime ? styles.active : ''}`}
            onClick={() => setForm({ ...form, unknownTime: !form.unknownTime })}
          >
            모름
          </button>
        </div>
      </div>

      <div className={styles.agree}>
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>약관 및 개인정보 처리 동의</span>
        </label>
        <small>
          <a href="/unsedang/terms" target="_blank">이용약관</a>
          {' · '}
          <a href="/unsedang/privacy" target="_blank">개인정보처리방침</a>
          {' · '}
          <a href="/unsedang/refund" target="_blank">환불정책</a> 보기
        </small>
      </div>

      <button
        type="button"
        className={styles.submitBtn}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? '풀이를 빚는 중...' : '내 그릇 보기 (무료)'}
      </button>
    </div>
  );
}