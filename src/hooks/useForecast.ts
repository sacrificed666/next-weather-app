import { useState, useEffect } from "react";

const useForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState(null);

  useEffect(() => {}, []);

  return { forecastData, forecastLoading, forecastError };
};

export default useForecast;
