'use client';

import { useRef, useState } from 'react';
import styles from './BowlCard.module.css';

const R2_BASE = 'https://audio.readmelab.co.kr/unsedang/j1';

interface BowlCardProps {
  bowl: string;
  bowlLabelKo: string;
  bowlLabelHanja: string;
  mood: string;
  score: number;
  verse: string;
  userName: string;
}

export default function BowlCard({
  bowl,
  bowlLabelKo,
  bowlLabelHanja,
  mood,
  score,
  verse,
  userName,
}: BowlCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const gaugeFilled = Math.min(5, Math.max(1, Math.round(score / 20)));
  const gaugeStr = '●'.repeat(gaugeFilled) + '○'.repeat(5 - gaugeFilled);

  const handleSave = async () => {
    if (!cardRef.current || saving) return;
    setSaving(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const video = videoRef.current;
      const card = cardRef.current;

      let tempImg: HTMLImageElement | null = null;
      if (video) {
        tempImg = document.createElement('img');
        tempImg.src = `${R2_BASE}/${bowl}.webp`;
        tempImg.crossOrigin = 'anonymous';
        tempImg.className = styles.video;

        await new Promise<void>((resolve, reject) => {
          if (!tempImg) return reject();
          tempImg.onload = () => resolve();
          tempImg.onerror = () => reject();
          setTimeout(() => resolve(), 2000);
        });

        video.style.display = 'none';
        video.parentElement?.insertBefore(tempImg, video);
      }

      const canvas = await html2canvas(card, {
        backgroundColor: '#0a0612',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
      });

      if (video && tempImg) {
        tempImg.remove();
        video.style.display = '';
      }

      const link = document.createElement('a');
      link.download = `운세당_${bowlLabelKo}_${userName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setSavedMessage('✓ 이미지 저장됨');
      setTimeout(() => setSavedMessage(''), 2500);
    } catch (err) {
      console.error('save card error:', err);
      setSavedMessage('저장에 실패했습니다');
      setTimeout(() => setSavedMessage(''), 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = 'https://readmelab.co.kr/unsedang/j1/';
    const shareText = `운세당 — ${userName}님의 그릇은 ${bowlLabelKo} (${bowlLabelHanja}) · ${mood} ${score}점`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `운세당 — ${userName}님의 그릇`,
          text: shareText,
          url: shareUrl,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setSavedMessage('✓ 링크가 복사되었습니다');
      setTimeout(() => setSavedMessage(''), 2500);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} ref={cardRef}>
        <video
          ref={videoRef}
          className={styles.video}
          poster={`${R2_BASE}/${bowl}.webp`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        >
          <source src={`${R2_BASE}/${bowl}.mp4`} type="video/mp4" />
          <source src={`${R2_BASE}/${bowl}.webm`} type="video/webm" />
        </video>

        <div className={styles.gradTop} />
        <div className={styles.gradBottom} />

        <div className={styles.overlayTop}>
          <div className={styles.brand}>運勢堂</div>
          <div className={styles.divider}>一一一一一</div>
          <div className={styles.userName}>{userName}님의 그릇</div>
        </div>

        <div className={styles.overlayBottom}>
          <div className={styles.bowlName}>
            <span className={styles.bowlNameHanja}>{bowlLabelHanja}</span>
            <span className={styles.bowlNameSep}>·</span>
            <span className={styles.bowlNameKo}>{bowlLabelKo}</span>
          </div>
          <div className={styles.scoreLine}>
            <span className={styles.mood}>{mood}</span>
            <span className={styles.gauge}>{gaugeStr}</span>
            <span className={styles.score}>{score}점</span>
          </div>
          <div className={styles.verse}>&ldquo;{verse}&rdquo;</div>
          <div className={styles.watermark}>readmelab.co.kr/unsedang/j1</div>
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={handleSave} disabled={saving} className={styles.actionButton}>
          {saving ? '저장 중...' : '📷 이미지 저장'}
        </button>
        <button onClick={handleShare} className={styles.actionButton}>
          🔗 공유하기
        </button>
      </div>

      {savedMessage && <div className={styles.toast}>{savedMessage}</div>}
    </div>
  );
}