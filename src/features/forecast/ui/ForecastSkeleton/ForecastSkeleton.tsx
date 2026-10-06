import Skeleton from "@/shared/ui/Skeleton/Skeleton";

import styles from "./ForecastSkeleton.module.scss";

const DETAIL_TILES = ["humidity", "feels", "pressure", "visibility", "precipitation", "clouds"];

// Placeholder in the shape of the dashboard while the forecast streams in
const ForecastSkeleton = ({ label }: { label: string }) => (
  <output className={styles.grid} aria-label={label} aria-busy="true">
    <div className={styles.main}>
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
      <div className={styles.details}>
        {DETAIL_TILES.map((tile) => (
          <div key={tile} className={`${styles.card} ${styles.tile}`}>
            <Skeleton className={styles.label} />
            <Skeleton className={styles.value} />
          </div>
        ))}
      </div>
    </div>
    <div className={styles.side}>
      <div className={`${styles.card} ${styles.daily}`}>
        <Skeleton className={styles.label} />
        {Array.from({ length: 5 }, (_, day) => (
          <Skeleton key={`day-${day + 1}`} className={styles.row} />
        ))}
      </div>
      <div className={`${styles.card} ${styles.air}`}>
        <Skeleton className={styles.label} />
        <Skeleton className={styles.block} />
      </div>
      <div className={`${styles.card} ${styles.wind}`}>
        <Skeleton className={styles.label} />
        <Skeleton className={styles.block} />
      </div>
    </div>
  </output>
);

export default ForecastSkeleton;
