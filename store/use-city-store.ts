import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { GeocodingResult } from "@/lib/open-meteo";

export type City = Pick<
  GeocodingResult,
  "id" | "name" | "latitude" | "longitude" | "country" | "admin1" | "timezone"
>;

type CityStore = {
  city: City | null;
  isSearchOpen: boolean;
  hasHydrated: boolean;
  setCity: (city: City) => void;
  openSearch: () => void;
  closeSearch: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useCityStore = create<CityStore>()(
  persist(
    (set) => ({
      city: null,
      isSearchOpen: false,
      hasHydrated: false,
      setCity: (city) => set({ city, isSearchOpen: false }),
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "weather-app:city",
      partialize: (state) => ({ city: state.city }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
