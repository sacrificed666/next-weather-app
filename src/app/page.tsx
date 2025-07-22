"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Weather from "@/components/weather/Weather";
import ForecastList from "@/components/forecast/ForecastList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import useWeather from "@/hooks/useWeather";
import useForecastList from "@/hooks/useForecastList";

const Page = () => {
  const city = useSelector((state: RootState) => state.city.value);

  const { weatherData, weatherLoading, weatherError } = useWeather(city);
  const { forecastDataList, forecastLoading, forecastError } = useForecastList(city);

  const isLoading = weatherLoading || forecastLoading;
  const isError = weatherError || forecastError;
  const isReady = !isLoading && !isError && weatherData && forecastDataList;

  return (
    <>
      {isLoading && <Loading />}

      {isError && <Error />}

      {isReady && (
        <>
          <Weather weatherData={weatherData} />
          <ForecastList forecastDataList={forecastDataList} />
        </>
      )}
    </>
  );
};

export default Page;
