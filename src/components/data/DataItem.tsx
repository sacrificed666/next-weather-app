import { METEOCONS_BASE_URL } from "@/constants/cdn";

interface DataItemProps {
  icon: string;
  alt: string;
  data: string;
}

const DataItem = ({ icon, alt, data }: DataItemProps) => {
  return (
    <li className="flex justify-between items-center border-b border-white/5">
      <img src={`${METEOCONS_BASE_URL}${icon}.svg`} alt={alt} className="size-8 md:size-10" />
      <span>{data}</span>
    </li>
  );
};

export default DataItem;
