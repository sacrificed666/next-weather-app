import type { Translate } from "@/features/i18n/model/translate";
import type { Formatter } from "@/shared/lib/format";

import type { Forecast } from "../model/types";

export interface ForecastViewProps {
  forecast: Forecast;
  t: Translate;
  format: Formatter;
  className?: string;
}
