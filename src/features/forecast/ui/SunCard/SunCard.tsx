import Card from "@/shared/ui/Card/Card";
import WeatherIcon from "@/shared/ui/WeatherIcon/WeatherIcon";

import { daylightProgress } from "../../model/insights";
import type { ForecastViewProps } from "../props";

import styles from "./SunCard.module.scss";

const ARC = "M16 84C40 14 160 14 184 84";

const sunPosition = (share: number) => {
  const inverse = 1 - share;
  return {
    x: inverse ** 3 * 16 + 3 * inverse ** 2 * share * 40 + 3 * inverse * share ** 2 * 160 + share ** 3 * 184,
    y: inverse ** 3 * 84 + 3 * inverse ** 2 * share * 14 + 3 * inverse * share ** 2 * 14 + share ** 3 * 84,
  };
};

const SunCard = ({ forecast: { current, timezoneOffset, generatedAt }, t, format, className }: ForecastViewProps) => {
  const { sunrise, sunset } = current;

  if (sunrise === null || sunset === null) {
    return (
      <Card className={className} title={t("sun.title")} icon="sunrise">
        <p className={styles.note}>{t("sun.unavailable")}</p>
      </Card>
    );
  }

  const share = daylightProgress(generatedAt, sunrise, sunset);
  const sun = share === null ? null : sunPosition(share);

  return (
    <Card className={className} title={t("sun.title")} icon="sunrise">
      <svg className={styles.arc} viewBox="0 0 200 96" aria-hidden="true">
        <path className={styles.path} d={ARC} />
        {share !== null && <path className={styles.travelled} d={ARC} pathLength={1} strokeDasharray={`${share} 1`} />}
        <line className={styles.horizon} x1="4" y1="84" x2="196" y2="84" />
        {sun && <circle className={styles.sun} cx={sun.x.toFixed(2)} cy={sun.y.toFixed(2)} r="7" />}
      </svg>
      <div className={styles.times}>
        <div className={styles.time}>
          <WeatherIcon name="sunrise" size={40} />
          <dl>
            <dt>{t("sun.sunrise")}</dt>
            <dd>{format.time(sunrise, timezoneOffset)}</dd>
          </dl>
        </div>
        <div className={styles.time}>
          <WeatherIcon name="sunset" size={40} />
          <dl>
            <dt>{t("sun.sunset")}</dt>
            <dd>{format.time(sunset, timezoneOffset)}</dd>
          </dl>
        </div>
      </div>
      <p className={styles.note}>{t("sun.daylight", { duration: format.duration(sunset - sunrise) })}</p>
    </Card>
  );
};

export default SunCard;
