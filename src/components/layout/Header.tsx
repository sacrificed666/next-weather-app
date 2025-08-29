import Search from "../search/Search";
import { METEOCONS_BASE_URL } from "@/constants/cdn";

const Header = () => {
  return (
    <header className="base sticky top-0 w-full border-b z-10">
      <div className="max-w-7xl w-full p-4 md:p-5 flex justify-center md:justify-between items-center">
        <div className="hidden md:flex justify-center items-center gap-1">
          <img src={`${METEOCONS_BASE_URL}partly-cloudy-day.svg`} alt="Weather App" className="size-8 md:size-10" />
          <span className="text-xl font-bold">Weather App</span>
        </div>
        <Search />
      </div>
    </header>
  );
};

export default Header;
