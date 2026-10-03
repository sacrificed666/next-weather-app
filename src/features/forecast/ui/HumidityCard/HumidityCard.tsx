import { dewPoint } from "@/shared/lib/units";
import Card from "@/shared/ui/Card/Card";

import Metric from "../Metric/Metric";
import type { ForecastViewProps } from "../props";

const HumidityCard = ({ forecast: { current }, t, format, className }: ForecastViewProps) => (
  <Card className={className} title={t("humidity.title")} icon="droplet">
    <Metric value={format.percent(current.humidity / 100)}>
      {t("humidity.dewPoint", { value: format.temperature(dewPoint(current.temperature, current.humidity)) })}
    </Metric>
  </Card>
);

export default HumidityCard;
