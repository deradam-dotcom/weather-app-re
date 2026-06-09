import { Loader2, MapPin } from "lucide-react";

import type { GeocodingResult } from "@/lib/open-meteo";

const formatLocation = (result: GeocodingResult) =>
  [result.admin1, result.country].filter(Boolean).join(", ");

type CitySearchResultsProps = {
  results: GeocodingResult[];
  isLoading: boolean;
  error: boolean;
  showNoResults: boolean;
  onSelect: (result: GeocodingResult) => void;
};

export const CitySearchResults = ({
  results,
  isLoading,
  error,
  showNoResults,
  onSelect,
}: CitySearchResultsProps) => (
  <div className="min-h-10">
    {isLoading && (
      <p className="flex items-center gap-2 text-base text-muted-foreground">
        <Loader2 className="size-[18px] animate-spin" />
        Keresés...
      </p>
    )}
    {error && (
      <p className="text-base text-destructive">
        Nem sikerült lefuttatni a keresést.
      </p>
    )}
    {showNoResults && (
      <p className="text-base text-muted-foreground">Nincs találat.</p>
    )}
    {!isLoading && !error && results.length > 0 && (
      <ul className="flex flex-col">
        {results.map((result) => (
          <li key={result.id}>
            <button
              type="button"
              onClick={() => onSelect(result)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-2.5 text-left text-base hover:bg-muted"
            >
              <MapPin className="size-[18px] shrink-0 text-muted-foreground" />
              <span className="font-medium">{result.name}</span>
              {formatLocation(result) && (
                <span className="truncate text-muted-foreground">
                  {formatLocation(result)}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);
