"use client";

import { useEffect, useState } from "react";

import type { ForecastData } from "@/lib/open-meteo";
import type { City } from "@/store/use-city-store";

type UseWeatherResult = {
  data: ForecastData | null;
  isLoading: boolean;
  error: boolean;
  refetch: () => void;
};

export const useWeather = (city: City | null): UseWeatherResult => {
  const [result, setResult] = useState<{
    cityId: number;
    data: ForecastData;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!city) {
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      latitude: String(city.latitude),
      longitude: String(city.longitude),
    });

    const run = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(`/api/forecast?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Forecast request failed");
        }
        const data = (await response.json()) as ForecastData;
        setResult({ cityId: city.id, data });
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    run();
    return () => controller.abort();
  }, [city, reloadKey]);

  const refetch = () => setReloadKey((key) => key + 1);

  const data = city && result && result.cityId === city.id ? result.data : null;

  return {
    data,
    isLoading: city ? isLoading : false,
    error: city ? error : false,
    refetch,
  };
};
