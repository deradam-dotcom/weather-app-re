import type { Metadata } from "next";

import { WeatherDashboard } from "@/components/weather/weather-dashboard";

export const metadata: Metadata = {
  title: "Időjárás",
  description: "Aktuális időjárás és 7 napos előrejelzés",
};

export default function Home() {
  return <WeatherDashboard />;
}
