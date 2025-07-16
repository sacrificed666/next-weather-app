"use client";

import Weather from "@/components/weather/Weather";
import ForecastList from "@/components/forecast/ForecastList";
import useWeather from "@/hooks/useWeather";

const Page = () => {
  const { weatherData, weatherLoading, weatherError } = useWeather("Lviv");

  return (
    <>
      {weatherData && <Weather weatherData={weatherData} />}
      <ForecastList />
    </>
  );
};

export default Page;
