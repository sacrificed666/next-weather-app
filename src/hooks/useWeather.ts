import { useState, useEffect } from "react";
import { WeatherData } from "@/types/weather";

const useWeather = (city: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    if (!city.trim()) return;

    const fetchWeather = async () => {
      setWeatherLoading(true);
      setWeatherError(null);

      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (error: unknown) {
        setWeatherError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weatherData, weatherLoading, weatherError };
};

export default useWeather;
