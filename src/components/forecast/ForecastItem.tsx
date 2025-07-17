import DataList from "../data/DataList";
import DataItem from "../data/DataItem";
import { ForecastData } from "@/types/forecast";
import { METEOCONS_BASE_URL } from "@/constants/cdn";

const ForecastItem = ({ forecastData }: { forecastData: ForecastData }) => {
  const {
    dt,
    temp: { min, max },
    humidity,
    weather: [{ description }],
    speed,
  } = forecastData;

  const day = new Date(dt * 1000).toLocaleDateString("en-GB", { weekday: "long" });
  const date = new Date(dt * 1000).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" });

  return (
    <li className="p-4 flex flex-1 flex-col justify-center items-center border rounded">
      <span className="">{day}</span>
      <span className="">{date}</span>
      <img src={`${METEOCONS_BASE_URL}cloudy.svg`} alt={description} className="max-w-32" />
      <DataList>
        <DataItem icon={`${METEOCONS_BASE_URL}thermometer-celsius.svg`} alt={`Temperature on ${date}`} data={`${Math.round(max)}°/${Math.round(min)}°`} />
        <DataItem icon={`${METEOCONS_BASE_URL}humidity.svg`} alt={`Humidity on ${date}`} data={`${humidity} %`} />
        <DataItem icon={`${METEOCONS_BASE_URL}wind.svg`} alt={`Wind speed on ${date}`} data={`${Math.round(speed)} m/s`} />
      </DataList>
    </li>
  );
};

export default ForecastItem;
