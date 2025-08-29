import { useState, useEffect } from "react";
import { ForecastDataList } from "@/types/forecast";

const useForecastList = (city: string) => {
  const [forecastDataList, setForecastData] = useState<ForecastDataList | null>(null);
  const [forecastLoading, setForecastLoading] = useState<boolean>(false);
  const [forecastError, setForecastError] = useState<string | null>(null);

  useEffect(() => {
    if (!city.trim()) return;

    const fetchForecast = async () => {
      setForecastLoading(true);
      setForecastError(null);

      try {
        const response = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch forecast data");
        }
        const data: ForecastDataList = await response.json();
        setForecastData(data);
      } catch (error: unknown) {
        setForecastError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setForecastLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  return { forecastDataList, forecastLoading, forecastError };
};

export default useForecastList;
