import { conditionSky } from "@/features/forecast/model/conditions";
import { getForecast } from "@/features/forecast/model/getForecast";
import AirQualityCard from "@/features/forecast/ui/AirQualityCard/AirQualityCard";
import CloudCoverCard from "@/features/forecast/ui/CloudCoverCard/CloudCoverCard";
import CurrentConditions from "@/features/forecast/ui/CurrentConditions/CurrentConditions";
import DailyForecast from "@/features/forecast/ui/DailyForecast/DailyForecast";
import FeelsLikeCard from "@/features/forecast/ui/FeelsLikeCard/FeelsLikeCard";
import ForecastError from "@/features/forecast/ui/ForecastError/ForecastError";
import HourlyForecast from "@/features/forecast/ui/HourlyForecast/HourlyForecast";
import HumidityCard from "@/features/forecast/ui/HumidityCard/HumidityCard";
import PrecipitationCard from "@/features/forecast/ui/PrecipitationCard/PrecipitationCard";
import PressureCard from "@/features/forecast/ui/PressureCard/PressureCard";
import Sky from "@/features/forecast/ui/Sky/Sky";
import SunCard from "@/features/forecast/ui/SunCard/SunCard";
import VisibilityCard from "@/features/forecast/ui/VisibilityCard/VisibilityCard";
import WindCard from "@/features/forecast/ui/WindCard/WindCard";
import type { LocationQuery } from "@/features/places/model/location";
import { getLocalization } from "@/features/preferences/model/server";

import styles from "./Forecast.module.scss";

const Forecast = async ({ query }: { query: LocationQuery | null }) => {
  const { preferences, t, format } = await getLocalization();
  const result = query ? await getForecast(query, preferences.locale) : null;

  if (!result?.ok) return <ForecastError kind={result?.failure ?? "not-found"} t={t} />;

  const view = { forecast: result.forecast, t, format };

  return (
    <>
      <Sky sky={conditionSky(result.forecast.current.condition)} />
      <div className={styles.dashboard}>
        <CurrentConditions {...view} className={styles.current} />
        <HourlyForecast {...view} className={styles.hourly} />
        <DailyForecast {...view} className={styles.daily} />
        <div className={styles.details}>
          <AirQualityCard {...view} className={styles.wide} />
          <SunCard {...view} className={styles.wide} />
          <WindCard {...view} className={styles.wide} />
          <HumidityCard {...view} />
          <FeelsLikeCard {...view} />
          <PressureCard {...view} />
          <VisibilityCard {...view} />
          <PrecipitationCard {...view} />
          <CloudCoverCard {...view} />
        </div>
      </div>
    </>
  );
};

export default Forecast;
