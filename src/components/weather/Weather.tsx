"use client";

import { useState, useEffect } from "react";
import DataList from "../data/DataList";
import DataItem from "../data/DataItem";
import useIcon from "@/hooks/useIcon";
import { WeatherData } from "@/types/weather";
import { FLAGCDN_BASE_URL } from "@/constants/cdn";

const Weather = ({ weatherData }: { weatherData: WeatherData }) => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString("en-GB", { hour12: false }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const {
    weather: [{ description }],
    main: { temp, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = weatherData;

  return (
    <div className="base w-full p-4 md:p-5 flex-col border rounded-xl">
      <span className="font-bold">Today, {time}</span>
      <div className="w-full grid md:grid-cols-3">
        <div className="center">
          <img src={`${useIcon(description)}`} alt={description} fetchPriority="high" className="max-w-32 md:max-w-40" />
        </div>
        <div className="center gap-1">
          <img src={`${FLAGCDN_BASE_URL}${country.toLowerCase()}.svg`} alt={country} className="h-5 rounded" />
          <span className="text-xl font-bold">{name}</span>
        </div>
        <div className="center">
          <DataList>
            <DataItem icon="thermometer-celsius" alt="Current temperature" data={`${Math.round(temp)}°`} />
            <DataItem icon="humidity" alt="Current humidity" data={`${humidity} %`} />
            <DataItem icon="wind" alt="Current wind speed" data={`${Math.round(speed)} m/s`} />
          </DataList>
        </div>
      </div>
    </div>
  );
};

export default Weather;
