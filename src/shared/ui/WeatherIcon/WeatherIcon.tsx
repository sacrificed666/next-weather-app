interface WeatherIconProps {
  name: string;
  size: number;
  label?: string;
  loading?: "eager" | "lazy";
  priority?: boolean;
  animated?: boolean;
  className?: string;
}

const iconPath = (name: string, animated: boolean) => `/icons/${animated ? "weather" : "weather-static"}/${name}.svg`;

const WeatherIcon = ({
  name,
  size,
  label,
  loading = "lazy",
  priority = false,
  animated = true,
  className,
}: WeatherIconProps) => {
  const image = (
    <img
      className={className}
      src={iconPath(name, animated)}
      width={size}
      height={size}
      alt={label ?? ""}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
    />
  );
  if (!animated) return image;
  return (
    <picture>
      <source srcSet={iconPath(name, false)} media="(prefers-reduced-motion: reduce)" />
      {image}
    </picture>
  );
};

export default WeatherIcon;
