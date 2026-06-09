import {
  formatDayName,
  formatPrecipitation,
  formatTemperatureRange,
} from "@/lib/format";
import type { ForecastData } from "@/lib/open-meteo";

import { ForecastList } from "./forecast-list";
import { TemperatureChart } from "./temperature-chart";
import { WeatherIcon } from "./weather-icon";

type ForecastSectionProps = {
  daily: ForecastData["daily"];
};

export const ForecastSection = ({ daily }: ForecastSectionProps) => {
  const rows = daily.map((day) => ({
    key: day.date,
    day: formatDayName(day.date),
    icon: <WeatherIcon code={day.weatherCode} className="size-5" />,
    precipitation: formatPrecipitation(day.precipitationProbability),
    temperature: formatTemperatureRange(day.temperatureMin, day.temperatureMax),
  }));

  const chartData = daily.map((day) => ({
    label: day.date,
    max: Math.round(day.temperatureMax),
  }));

  return (
    <>
      <ForecastList days={rows} />
      <TemperatureChart data={chartData} />
    </>
  );
};
