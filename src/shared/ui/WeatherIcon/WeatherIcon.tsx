interface WeatherIconProps {
  name: string;
  size: number;
  label?: string;
  loading?: "eager" | "lazy";
  priority?: boolean;
  className?: string;
}

const WeatherIcon = ({ name, size, label, loading = "lazy", priority = false, className }: WeatherIconProps) => (
  <img
    className={className}
    src={`/icons/weather/${name}.svg`}
    width={size}
    height={size}
    alt={label ?? ""}
    loading={priority ? "eager" : loading}
    fetchPriority={priority ? "high" : "auto"}
    decoding="async"
    draggable={false}
  />
);

export default WeatherIcon;
