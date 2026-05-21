import styles from './SealedCard.module.css';

interface SealedCardProps {
  title: string;
  sub: string;
}

export default function SealedCard({ title, sub }: SealedCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.lock}>🔒</div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.sub}>{sub}</p>
    </div>
  );
}