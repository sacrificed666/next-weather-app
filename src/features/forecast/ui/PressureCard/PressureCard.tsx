import Card from "@/shared/ui/Card/Card";

import { PRESSURE_SCALE, pressureLevel, progress } from "../../model/insights";
import Metric from "../Metric/Metric";
import type { ForecastViewProps } from "../props";

import styles from "./PressureCard.module.scss";

const RADIUS = 46;

// Air pressure on a gauge with its level
const PressureCard = ({ forecast: { current }, t, format, className }: ForecastViewProps) => {
  const share = progress(current.pressure, PRESSURE_SCALE.min, PRESSURE_SCALE.max);
  const angle = Math.PI * (1 - share);
  const markerX = 60 + RADIUS * Math.cos(angle);
  const markerY = 56 - RADIUS * Math.sin(angle);

  return (
    <Card compact className={className} title={t("pressure.title")} icon="gauge">
      <div className={styles.pressure}>
        <Metric
          value={format.pressure(current.pressure)}
          unit={format.units === "imperial" ? t("pressure.inhg") : t("pressure.hpa")}
        >
          {t(`pressure.${pressureLevel(current.pressure)}`)}
        </Metric>
        <svg className={styles.gauge} viewBox="0 0 120 64" aria-hidden="true">
          <path className={styles.track} d="M14 56A46 46 0 0 1 106 56" pathLength={1} />
          <path className={styles.fill} d="M14 56A46 46 0 0 1 106 56" pathLength={1} strokeDasharray={`${share} 1`} />
          <circle className={styles.marker} cx={markerX.toFixed(2)} cy={markerY.toFixed(2)} r="5" />
        </svg>
      </div>
    </Card>
  );
};

export default PressureCard;
