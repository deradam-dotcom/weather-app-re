import { getWeatherInfo } from "@/lib/weather-codes";

type WeatherIconProps = {
  code: number;
  className?: string;
  strokeWidth?: number;
};

export const WeatherIcon = ({
  code,
  className,
  strokeWidth = 1.5,
}: WeatherIconProps) => {
  const { Icon, label } = getWeatherInfo(code);
  return (
    <Icon
      className={className}
      strokeWidth={strokeWidth}
      role="img"
      aria-label={label}
    />
  );
};
