import { useState, useEffect } from "react";
import { ForecastList } from "@/types/forecast";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast/daily";

const useForecast = (city: string) => {
  const [forecastData, setForecastData] = useState<ForecastList | null>(null);
  const [forecastLoading, setForecastLoading] = useState<boolean>(false);
  const [forecastError, setForecastError] = useState<string | null>(null);

  useEffect(() => {
    if (!city.trim()) return;

    const fetchForecast = async () => {
      setForecastLoading(true);
      setForecastError(null);

      try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&cnt=7&units=metric`);
        if (!response.ok) {
          throw new Error("Failed to fetch forecast data");
        }
        const data = await response.json();
        setForecastData(data);
      } catch (error: unknown) {
        setForecastError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setForecastLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  return { forecastData, forecastLoading, forecastError };
};

export default useForecast;
