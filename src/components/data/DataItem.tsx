interface DataItemProps {
  icon: string;
  alt: string;
  data: string;
}

const DataItem = ({ icon, alt, data }: DataItemProps) => {
  return (
    <li className="">
      <img src={icon} alt={alt} className="" />
      <span>{data}</span>
    </li>
  );
};

export default DataItem;
