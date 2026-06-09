"use client";

import { useState } from "react";

import { Search } from "lucide-react";

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

import { CitySearchResults } from "./city-search-results";

export const CitySearchDialog = () => {
  const isSearchOpen = useCityStore((state) => state.isSearchOpen);
  const city = useCityStore((state) => state.city);
  const setCity = useCityStore((state) => state.setCity);
  const closeSearch = useCityStore((state) => state.closeSearch);

  const [query, setQuery] = useState("");
  const { results, isLoading, error } = useCitySearch(query);

  const isDismissable = city !== null;
  const showNoResults =
    !isLoading && !error && query.trim().length >= 2 && results.length === 0;

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
        className="sm:max-w-lg"
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
          <DialogTitle className="text-base">Város keresése</DialogTitle>
          <DialogDescription className="text-[15px]">
            Keress rá egy városra az időjárás megtekintéséhez.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pl. Budapest"
            className="h-12 pl-10 text-base md:text-base focus-visible:border-blue-300 focus-visible:ring-1 focus-visible:ring-blue-300"
          />
        </div>

        <CitySearchResults
          results={results}
          isLoading={isLoading}
          error={error}
          showNoResults={showNoResults}
          onSelect={handleSelect}
        />
      </DialogContent>
    </Dialog>
  );
};
