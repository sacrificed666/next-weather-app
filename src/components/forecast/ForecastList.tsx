import ForecastItem from "./ForecastItem";
import { ForecastDataList } from "@/types/forecast";

const ForecastList = ({ forecastDataList }: { forecastDataList: ForecastDataList }) => {
  return (
    <ul className="w-full center flex-wrap gap-1">
      {forecastDataList.list.map((forecastData) => (
        <ForecastItem key={forecastData.dt} forecastData={forecastData} />
      ))}
    </ul>
  );
};

export default ForecastList;
