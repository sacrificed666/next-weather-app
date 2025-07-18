import DataList from "../data/DataList";
import DataItem from "../data/DataItem";
import { WeatherData } from "@/types/weather";
import { METEOCONS_BASE_URL, FLAGCDN_BASE_URL } from "@/constants/cdn";

const Weather = ({ weatherData }: { weatherData: WeatherData }) => {
  const {
    weather: [{ description }],
    main: { temp, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = weatherData;

  const countryCode = country.toLowerCase();

  return (
    <div className="w-full p-4 md:p-5 grid md:grid-cols-3 border border-white/5 rounded-xl bg-white/5 backdrop-blur-md shadow-md">
      <div className="flex justify-center items-center">
        <img src={`${METEOCONS_BASE_URL}cloudy.svg`} alt={description} className="max-w-32 md:max-w-40" />
      </div>
      <div className="flex justify-center items-center gap-1">
        <img src={`${FLAGCDN_BASE_URL}${countryCode}.svg`} alt={country} className="h-5 rounded" />
        <span className="text-xl font-bold">{name}</span>
      </div>
      <div className="flex justify-center items-center">
        <DataList>
          <DataItem icon={`${METEOCONS_BASE_URL}thermometer-celsius.svg`} alt="Current temperature" data={`${Math.round(temp)}°`} />
          <DataItem icon={`${METEOCONS_BASE_URL}humidity.svg`} alt="Current humidity" data={`${humidity} %`} />
          <DataItem icon={`${METEOCONS_BASE_URL}wind.svg`} alt="Current wind speed" data={`${Math.round(speed)} m/s`} />
        </DataList>
      </div>
    </div>
  );
};

export default Weather;
