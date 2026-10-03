import { icons, type IconName, type IconShape } from "./icons";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

const Icon = ({ name, size = 20, className }: IconProps) => {
  const { paths, filled = false }: IconShape = icons[name];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
};

export default Icon;
