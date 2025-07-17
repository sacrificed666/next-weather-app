"use client";

import Weather from "@/components/weather/Weather";
import ForecastList from "@/components/forecast/ForecastList";
import useWeather from "@/hooks/useWeather";
import useForecastList from "@/hooks/useForecastList";

const Page = () => {
  const { weatherData, weatherLoading, weatherError } = useWeather("Lviv");
  const { forecastDataList, forecastLoading, forecastError } = useForecastList("Lviv");

  return (
    <>
      {weatherData && <Weather weatherData={weatherData} />}
      {forecastDataList && <ForecastList forecastDataList={forecastDataList} />}
    </>
  );
};

export default Page;
