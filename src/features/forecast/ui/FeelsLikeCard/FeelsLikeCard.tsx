import Card from "@/shared/ui/Card/Card";

import { feelsLike } from "../../model/insights";
import Metric from "../Metric/Metric";
import type { ForecastViewProps } from "../props";

const FeelsLikeCard = ({ forecast: { current }, t, format, className }: ForecastViewProps) => (
  <Card className={className} title={t("feelsLike.title")} icon="thermometer">
    <Metric value={format.temperature(current.feelsLike)}>
      {t(`feelsLike.${feelsLike(current.temperature, current.feelsLike)}`)}
    </Metric>
  </Card>
);

export default FeelsLikeCard;
