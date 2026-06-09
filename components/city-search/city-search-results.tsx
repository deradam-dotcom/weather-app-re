import { MapPin } from "lucide-react";

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
  <div className="min-h-10 min-w-0">
    {isLoading && (
      <p className="flex items-center justify-center gap-2 text-base text-muted-foreground">
        <span
          className="size-[18px] shrink-0 animate-spin rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, var(--color-sky-from), var(--color-sky-to), var(--color-sky-from))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
          }}
        />
        Keresés...
      </p>
    )}
    {error && (
      <p className="text-center text-base text-destructive">
        Nem sikerült lefuttatni a keresést.
      </p>
    )}
    {showNoResults && (
      <p className="text-center text-base text-muted-foreground">Nincs találat.</p>
    )}
    {!isLoading && !error && results.length > 0 && (
      <ul className="flex max-h-72 flex-col overflow-y-auto">
        {results.map((result) => (
          <li key={result.id}>
            <button
              type="button"
              onClick={() => onSelect(result)}
              className="flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-2.5 text-left text-base hover:bg-muted"
            >
              <MapPin className="size-[18px] shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate font-medium">{result.name}</span>
              {formatLocation(result) && (
                <span className="min-w-0 truncate text-muted-foreground">
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
