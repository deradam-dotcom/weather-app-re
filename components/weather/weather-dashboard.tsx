"use client";

import { CloudRain } from "lucide-react";

import { ApplicantFooter } from "./applicant-footer";
import { CurrentConditions } from "./current-conditions";
import { ForecastList } from "./forecast-list";
import { TemperatureChart } from "./temperature-chart";

const placeholderDays = [
  { key: "1", day: "Hétfő", precipitation: "56%", temperature: "9 °C / 23 °C" },
  { key: "2", day: "Kedd", precipitation: "56%", temperature: "9 °C / 23 °C" },
  { key: "3", day: "Szerda", precipitation: "56%", temperature: "9 °C / 23 °C" },
  { key: "4", day: "Csütörtök", precipitation: "56%", temperature: "9 °C / 23 °C" },
  { key: "5", day: "Péntek", precipitation: "56%", temperature: "9 °C / 23 °C" },
  { key: "6", day: "Szombat", precipitation: "56%", temperature: "9 °C / 23 °C" },
  { key: "7", day: "Vasárnap", precipitation: "56%", temperature: "9 °C / 23 °C" },
];

const placeholderChart = [
  { label: "1", max: 23 },
  { label: "2", max: 21 },
  { label: "3", max: 24 },
  { label: "4", max: 22 },
  { label: "5", max: 20 },
  { label: "6", max: 23 },
  { label: "7", max: 25 },
];

export function WeatherDashboard() {
  const days = placeholderDays.map((day) => ({
    ...day,
    icon: <CloudRain className="size-5" strokeWidth={1.5} />,
  }));

  return (
    <div className="min-h-dvh bg-linear-to-b from-sky-from to-sky-to text-fg">
      <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col px-8 py-12 md:px-10 md:py-16">
        <div className="grid flex-1 grid-cols-1 gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <CurrentConditions
            cityName="Város neve"
            temperature="25"
            condition="Tiszta idő"
          />
          <div className="flex flex-col gap-8">
            <ForecastList days={days} />
            <TemperatureChart data={placeholderChart} />
          </div>
        </div>
        <ApplicantFooter name="Der Ádám" />
      </div>
    </div>
  );
}
