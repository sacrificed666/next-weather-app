interface SocialItemProps {
  link: string;
  icon: string;
  alt: string;
}

const SocialItem = ({ link, icon, alt }: SocialItemProps) => {
  return (
    <li className="size-8 md:size-10 p-1 flex justify-center items-center border border-white/5 rounded-xl bg-white/5 backdrop-blur-md shadow-md cursor-pointer active:scale-90 transition-all">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={`/${icon}.svg`} alt={alt} className="opacity-90" />
      </a>
    </li>
  );
};

export default SocialItem;
