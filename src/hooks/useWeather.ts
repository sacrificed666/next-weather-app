import { useState, useEffect } from "react";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {}, []);

  return { weatherData, weatherLoading, weatherError };
};

export default useWeather;
