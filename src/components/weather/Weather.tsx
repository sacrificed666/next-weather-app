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
    <div className="">
      <div className="">
        <img src={`${METEOCONS_BASE_URL}cloudy.svg`} alt={description} className="" />
      </div>
      <div className="">
        <img src={`${FLAGCDN_BASE_URL}${countryCode}.svg`} alt={country} className="" />
        <span className="">{name}</span>
      </div>
      <DataList>
        <DataItem icon={`${METEOCONS_BASE_URL}thermometer-celsius.svg`} alt="Current temperature" data={`${Math.round(temp)}°`} />
        <DataItem icon={`${METEOCONS_BASE_URL}humidity.svg`} alt="Current humidity" data={`${humidity} %`} />
        <DataItem icon={`${METEOCONS_BASE_URL}wind.svg`} alt="Current wind speed" data={`${Math.round(speed)} m/s`} />
      </DataList>
    </div>
  );
};

export default Weather;
