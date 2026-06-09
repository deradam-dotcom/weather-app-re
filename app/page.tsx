import type { Metadata } from "next";

import { WeatherDashboard } from "@/components/weather/weather-dashboard";

export const metadata: Metadata = {
  title: "Időjárás",
  description: "Aktuális időjárás és 7 napos előrejelzés",
};

const Home = () => <WeatherDashboard />;

export default Home;
