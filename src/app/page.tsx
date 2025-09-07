"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Weather from "@/components/weather/Weather";
import ForecastList from "@/components/forecast/ForecastList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import useAPI from "@/hooks/useAPI";
import { WeatherData } from "@/types/weather";
import { ForecastDataList } from "@/types/forecast";

const Page = () => {
  const city = useSelector((state: RootState) => state.city.value);

  const { data: weatherData, loading: weatherLoading, error: weatherError } = useAPI<WeatherData>("weather", city);
  const { data: forecastDataList, loading: forecastLoading, error: forecastError } = useAPI<ForecastDataList>("forecast", city);

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
