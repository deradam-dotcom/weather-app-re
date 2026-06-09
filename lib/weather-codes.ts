import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Sun,
  type LucideIcon,
} from "lucide-react";

export type WeatherInfo = {
  label: string;
  Icon: LucideIcon;
};

const WEATHER_CODES: Record<number, WeatherInfo> = {
  0: { label: "Tiszta idő", Icon: Sun },
  1: { label: "Túlnyomóan tiszta", Icon: CloudSun },
  2: { label: "Részben felhős", Icon: CloudSun },
  3: { label: "Borult", Icon: Cloud },
  45: { label: "Köd", Icon: CloudFog },
  48: { label: "Zúzmarás köd", Icon: CloudFog },
  51: { label: "Gyenge szitálás", Icon: CloudDrizzle },
  53: { label: "Szitálás", Icon: CloudDrizzle },
  55: { label: "Erős szitálás", Icon: CloudDrizzle },
  56: { label: "Ónos szitálás", Icon: CloudDrizzle },
  57: { label: "Erős ónos szitálás", Icon: CloudDrizzle },
  61: { label: "Gyenge eső", Icon: CloudRain },
  63: { label: "Eső", Icon: CloudRain },
  65: { label: "Erős eső", Icon: CloudRain },
  66: { label: "Ónos eső", Icon: CloudRain },
  67: { label: "Erős ónos eső", Icon: CloudRain },
  71: { label: "Gyenge havazás", Icon: CloudSnow },
  73: { label: "Havazás", Icon: CloudSnow },
  75: { label: "Erős havazás", Icon: CloudSnow },
  77: { label: "Hószállingózás", Icon: CloudSnow },
  80: { label: "Gyenge zápor", Icon: CloudRainWind },
  81: { label: "Zápor", Icon: CloudRainWind },
  82: { label: "Heves zápor", Icon: CloudRainWind },
  85: { label: "Hózápor", Icon: CloudSnow },
  86: { label: "Erős hózápor", Icon: CloudSnow },
  95: { label: "Zivatar", Icon: CloudLightning },
  96: { label: "Zivatar jégesővel", Icon: CloudLightning },
  99: { label: "Erős zivatar jégesővel", Icon: CloudLightning },
};

const FALLBACK_WEATHER: WeatherInfo = { label: "Ismeretlen", Icon: Cloud };

export const getWeatherInfo = (code: number): WeatherInfo =>
  WEATHER_CODES[code] ?? FALLBACK_WEATHER;
