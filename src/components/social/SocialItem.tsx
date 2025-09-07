interface SocialItemProps {
  link: string;
  icon: string;
  alt: string;
}

const SocialItem = ({ link, icon, alt }: SocialItemProps) => {
  return (
    <li className="base size-8 md:size-10 p-1 border rounded-xl cursor-pointer active:scale-90 transition-all">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={`/socials/${icon}.svg`} alt={alt} className="opacity-90" />
      </a>
    </li>
  );
};

export default SocialItem;
