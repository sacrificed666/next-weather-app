interface WeatherIconProps {
  name: string;
  size: number;
  label?: string;
  priority?: boolean;
  className?: string;
}

const WeatherIcon = ({ name, size, label, priority = false, className }: WeatherIconProps) => (
  <img
    className={className}
    src={`/icons/weather/${name}.svg`}
    width={size}
    height={size}
    alt={label ?? ""}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    decoding="async"
    draggable={false}
  />
);

export default WeatherIcon;
