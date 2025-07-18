"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Weather from "@/components/weather/Weather";
import ForecastList from "@/components/forecast/ForecastList";
import useWeather from "@/hooks/useWeather";
import useForecastList from "@/hooks/useForecastList";

const Page = () => {
  const city = useSelector((state: RootState) => state.city.value);

  const { weatherData, weatherLoading, weatherError } = useWeather(city);
  const { forecastDataList, forecastLoading, forecastError } = useForecastList(city);

  return (
    <>
      {weatherData && <Weather weatherData={weatherData} />}
      {forecastDataList && <ForecastList forecastDataList={forecastDataList} />}
    </>
  );
};

export default Page;
