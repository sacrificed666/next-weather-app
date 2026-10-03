import Skeleton from "@/shared/ui/Skeleton/Skeleton";

import styles from "./ForecastSkeleton.module.scss";

const DETAIL_CARDS = ["air", "sun", "wind", "humidity", "feels", "pressure", "visibility", "precipitation", "clouds"];

const ForecastSkeleton = ({ label }: { label: string }) => (
  <output className={styles.grid} aria-label={label} aria-busy="true">
    <div className={`${styles.card} ${styles.current}`}>
      <Skeleton className={styles.title} />
      <div className={styles.hero}>
        <Skeleton className={styles.icon} />
        <div className={styles.lines}>
          <Skeleton className={styles.temperature} />
          <Skeleton className={styles.line} />
          <Skeleton className={styles.short} />
        </div>
      </div>
    </div>
    <div className={`${styles.card} ${styles.hourly}`}>
      <Skeleton className={styles.label} />
      <Skeleton className={styles.strip} />
    </div>
    <div className={`${styles.card} ${styles.daily}`}>
      <Skeleton className={styles.label} />
      {Array.from({ length: 7 }, (_, day) => (
        <Skeleton key={`day-${day + 1}`} className={styles.row} />
      ))}
    </div>
    <div className={styles.details}>
      {DETAIL_CARDS.map((card) => (
        <div key={card} className={`${styles.card} ${styles.detail}`}>
          <Skeleton className={styles.label} />
          <Skeleton className={styles.value} />
        </div>
      ))}
    </div>
  </output>
);

export default ForecastSkeleton;
