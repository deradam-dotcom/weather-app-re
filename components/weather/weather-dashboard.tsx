"use client";

import { useEffect } from "react";

import { CitySearchDialog } from "@/components/city-search/city-search-dialog";
import {
  formatDayName,
  formatPrecipitation,
  formatTemperatureRange,
} from "@/lib/format";
import { getWeatherInfo } from "@/lib/weather-codes";
import { useWeather } from "@/hooks/use-weather";
import { useCityStore } from "@/store/use-city-store";

import { ApplicantFooter } from "./applicant-footer";
import { CurrentConditions } from "./current-conditions";
import { ForecastList } from "./forecast-list";
import {
  ChartSkeleton,
  CurrentConditionsSkeleton,
  ForecastListSkeleton,
  WeatherEmpty,
  WeatherError,
} from "./states";
import { TemperatureChart } from "./temperature-chart";
import { WeatherIcon } from "./weather-icon";

export const WeatherDashboard = () => {
  const city = useCityStore((state) => state.city);
  const hasHydrated = useCityStore((state) => state.hasHydrated);
  const openSearch = useCityStore((state) => state.openSearch);
  const { data, error, refetch } = useWeather(city);

  useEffect(() => {
    if (hasHydrated && !city) {
      openSearch();
    }
  }, [hasHydrated, city, openSearch]);

  const view = !hasHydrated
    ? "loading"
    : !city
      ? "empty"
      : error
        ? "error"
        : data
          ? "ready"
          : "loading";

  const forecastRows =
    data?.daily.map((day) => ({
      key: day.date,
      day: formatDayName(day.date),
      icon: <WeatherIcon code={day.weatherCode} className="size-5" />,
      precipitation: formatPrecipitation(day.precipitationProbability),
      temperature: formatTemperatureRange(day.temperatureMin, day.temperatureMax),
    })) ?? [];

  const chartData =
    data?.daily.map((day) => ({
      label: day.date,
      max: Math.round(day.temperatureMax),
    })) ?? [];

  return (
    <div className="min-h-dvh bg-linear-to-b from-sky-from to-sky-to text-fg">
      <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col px-8 py-12 md:px-10 md:py-16">
        <div className="grid flex-1 grid-cols-1 gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <div>
            {view === "loading" && <CurrentConditionsSkeleton />}
            {view === "empty" && <WeatherEmpty onChoose={openSearch} />}
            {view === "error" && <WeatherError onRetry={refetch} />}
            {view === "ready" && data && city && (
              <CurrentConditions
                cityName={city.name}
                temperature={String(Math.round(data.current.temperature))}
                condition={getWeatherInfo(data.current.weatherCode).label}
                onCityClick={openSearch}
              />
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-8">
            {view === "loading" && (
              <>
                <ForecastListSkeleton />
                <ChartSkeleton />
              </>
            )}
            {view === "ready" && data && (
              <>
                <ForecastList days={forecastRows} />
                <TemperatureChart data={chartData} />
              </>
            )}
          </div>
        </div>
        <ApplicantFooter name="Der Ádám" />
      </div>
      <CitySearchDialog />
    </div>
  );
};
