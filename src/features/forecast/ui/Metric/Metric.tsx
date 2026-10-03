import type { ReactNode } from "react";

import styles from "./Metric.module.scss";

interface MetricProps {
  value: string;
  unit?: string;
  children?: ReactNode;
}

const Metric = ({ value, unit, children }: MetricProps) => (
  <div className={styles.metric}>
    <p className={styles.value}>
      {value}
      {unit && <span className={styles.unit}> {unit}</span>}
    </p>
    {children && <p className={styles.note}>{children}</p>}
  </div>
);

export default Metric;
