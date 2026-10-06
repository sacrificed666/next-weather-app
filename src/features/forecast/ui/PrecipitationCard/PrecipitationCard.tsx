import Card from "@/shared/ui/Card/Card";

import Metric from "../Metric/Metric";
import type { ForecastViewProps } from "../props";

// Precipitation of the last hour
const PrecipitationCard = ({ forecast: { current }, t, format, className }: ForecastViewProps) => (
  <Card compact className={className} title={t("precipitation.title")} icon="umbrella">
    <Metric value={format.precipitation(current.precipitation)}>{t("precipitation.lastHour")}</Metric>
  </Card>
);

export default PrecipitationCard;
