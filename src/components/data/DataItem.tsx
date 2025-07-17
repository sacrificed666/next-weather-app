interface DataItemProps {
  icon: string;
  alt: string;
  data: string;
}

const DataItem = ({ icon, alt, data }: DataItemProps) => {
  return (
    <li className="flex justify-between items-center border-b">
      <img src={icon} alt={alt} className="size-8" />
      <span>{data}</span>
    </li>
  );
};

export default DataItem;
