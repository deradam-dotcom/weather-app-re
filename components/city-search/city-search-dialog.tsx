"use client";

import { useState } from "react";

import { Loader2, MapPin, Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCitySearch } from "@/hooks/use-city-search";
import type { GeocodingResult } from "@/lib/open-meteo";
import { useCityStore } from "@/store/use-city-store";

const formatLocation = (result: GeocodingResult) =>
  [result.admin1, result.country].filter(Boolean).join(", ");

export const CitySearchDialog = () => {
  const isSearchOpen = useCityStore((state) => state.isSearchOpen);
  const city = useCityStore((state) => state.city);
  const setCity = useCityStore((state) => state.setCity);
  const closeSearch = useCityStore((state) => state.closeSearch);

  const [query, setQuery] = useState("");
  const { results, isLoading, error } = useCitySearch(query);

  const isDismissable = city !== null;
  const trimmedQuery = query.trim();
  const showNoResults =
    !isLoading && !error && trimmedQuery.length >= 2 && results.length === 0;

  const handleSelect = (result: GeocodingResult) => {
    setCity({
      id: result.id,
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
      admin1: result.admin1,
      timezone: result.timezone,
    });
    setQuery("");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && isDismissable) {
      closeSearch();
      setQuery("");
    }
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={isDismissable}
        onEscapeKeyDown={(event) => {
          if (!isDismissable) {
            event.preventDefault();
          }
        }}
        onInteractOutside={(event) => {
          if (!isDismissable) {
            event.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Város keresése</DialogTitle>
          <DialogDescription>
            Keress rá egy városra az időjárás megtekintéséhez.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pl. Budapest"
            className="pl-8"
          />
        </div>

        <div className="min-h-10">
          {isLoading && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Keresés...
            </p>
          )}
          {error && (
            <p className="text-sm text-destructive">
              Nem sikerült lefuttatni a keresést.
            </p>
          )}
          {showNoResults && (
            <p className="text-sm text-muted-foreground">Nincs találat.</p>
          )}
          {!isLoading && !error && results.length > 0 && (
            <ul className="flex flex-col">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(result)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                  >
                    <MapPin className="size-4 shrink-0 text-muted-foreground" />
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
      </DialogContent>
    </Dialog>
  );
};
