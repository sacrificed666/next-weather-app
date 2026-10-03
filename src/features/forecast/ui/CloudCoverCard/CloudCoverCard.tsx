import Card from "@/shared/ui/Card/Card";

import { cloudLevel } from "../../model/insights";
import Metric from "../Metric/Metric";
import type { ForecastViewProps } from "../props";

const CloudCoverCard = ({ forecast: { current }, t, format, className }: ForecastViewProps) => (
  <Card className={className} title={t("clouds.title")} icon="cloud">
    <Metric value={format.percent(current.cloudiness / 100)}>{t(`clouds.${cloudLevel(current.cloudiness)}`)}</Metric>
  </Card>
);

export default CloudCoverCard;
