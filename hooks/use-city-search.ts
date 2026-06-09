"use client";

import { useEffect, useState } from "react";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { GeocodingResult } from "@/lib/open-meteo";

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

type UseCitySearchResult = {
  results: GeocodingResult[];
  isLoading: boolean;
  error: boolean;
};

export const useCitySearch = (query: string): UseCitySearchResult => {
  const debouncedQuery = useDebouncedValue(query.trim(), DEBOUNCE_MS);
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      if (debouncedQuery.length < MIN_QUERY_LENGTH) {
        setResults([]);
        setError(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(false);
      try {
        const params = new URLSearchParams({ name: debouncedQuery });
        const response = await fetch(`/api/geocoding?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Geocoding request failed");
        }
        const data = (await response.json()) as { results: GeocodingResult[] };
        setResults(data.results);
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
  }, [debouncedQuery]);

  return { results, isLoading, error };
};
