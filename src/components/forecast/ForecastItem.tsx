import DataList from "../data/DataList";
import DataItem from "../data/DataItem";
import useIcon from "@/hooks/useIcon";
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
    <li className="p-4 md:p-5 flex flex-1 flex-col justify-center items-center border border-white/5 rounded-xl bg-white/5 backdrop-blur-md shadow-md">
      <span className="font-bold">{day}</span>
      <span className="text-white/50">{date}</span>
      <img src={`${useIcon(description)}`} alt={description} className="max-w-32 md:max-w-40" />
      <DataList>
        <DataItem icon={`${METEOCONS_BASE_URL}thermometer-celsius.svg`} alt={`Temperature on ${date}`} data={`${Math.round(max)}°/${Math.round(min)}°`} />
        <DataItem icon={`${METEOCONS_BASE_URL}humidity.svg`} alt={`Humidity on ${date}`} data={`${humidity} %`} />
        <DataItem icon={`${METEOCONS_BASE_URL}wind.svg`} alt={`Wind speed on ${date}`} data={`${Math.round(speed)} m/s`} />
      </DataList>
    </li>
  );
};

export default ForecastItem;
