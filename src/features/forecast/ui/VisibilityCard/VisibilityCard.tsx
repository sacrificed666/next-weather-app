import Card from "@/shared/ui/Card/Card";

import { visibilityLevel } from "../../model/insights";
import Metric from "../Metric/Metric";
import type { ForecastViewProps } from "../props";

// Visibility in kilometres or miles with its level
const VisibilityCard = ({ forecast: { current }, t, format, className }: ForecastViewProps) => {
  if (current.visibility === null) return null;
  return (
    <Card compact className={className} title={t("visibility.title")} icon="eye">
      <Metric value={format.distance(current.visibility)}>
        {t(`visibility.${visibilityLevel(current.visibility)}`)}
      </Metric>
    </Card>
  );
};

export default VisibilityCard;
