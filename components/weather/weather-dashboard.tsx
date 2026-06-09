"use client";

import { useEffect } from "react";

import { CitySearchDialog } from "@/components/city-search/city-search-dialog";
import { useWeather } from "@/hooks/use-weather";
import { getWeatherInfo } from "@/lib/weather-codes";
import { useCityStore } from "@/store/use-city-store";

import { Footer } from "./footer";
import { CurrentConditions } from "./current-conditions";
import { ForecastSection } from "./forecast-section";
import {
  ChartSkeleton,
  CurrentConditionsSkeleton,
  ForecastListSkeleton,
  WeatherEmpty,
  WeatherError,
} from "./states";

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

  return (
    <div className="min-h-dvh bg-linear-to-b from-sky-from to-sky-to text-fg">
      <div className="mr-auto flex min-h-dvh w-fit flex-col px-8 pt-6 pb-0 md:mx-auto md:px-10 md:pt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[auto_578px] md:gap-16">
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
          <div className="flex flex-col gap-8">
            {view === "loading" && (
              <>
                <ForecastListSkeleton />
                <ChartSkeleton />
              </>
            )}
            {view === "ready" && data && <ForecastSection daily={data.daily} />}
          </div>
        </div>
        <Footer name="Der Ádám" />
      </div>
      <CitySearchDialog />
    </div>
  );
};
