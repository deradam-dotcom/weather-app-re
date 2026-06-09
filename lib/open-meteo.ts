export type GeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
};

export type DailyForecast = {
  date: string;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  precipitationProbability: number;
};

export type ForecastData = {
  current: {
    temperature: number;
    weatherCode: number;
  };
  daily: DailyForecast[];
};

type RawGeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
};

type RawForecastResponse = {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
  };
};

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchGeocoding = async (
  name: string,
): Promise<GeocodingResult[]> => {
  const url = new URL(GEOCODING_URL);
  url.searchParams.set("name", name);
  url.searchParams.set("count", "100");
  url.searchParams.set("language", "hu");
  url.searchParams.set("format", "json");

  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) {
    throw new Error(`Geocoding request failed with status ${response.status}`);
  }

  const data: { results?: RawGeocodingResult[] } = await response.json();
  return (data.results ?? []).map((result) => ({
    id: result.id,
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    admin1: result.admin1,
    timezone: result.timezone,
  }));
};

export const fetchForecast = async (
  latitude: number,
  longitude: number,
): Promise<ForecastData> => {
  const url = new URL(FORECAST_URL);
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("current", "temperature_2m,weather_code");
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
  );

  const response = await fetch(url, { next: { revalidate: 600 } });
  if (!response.ok) {
    throw new Error(`Forecast request failed with status ${response.status}`);
  }

  const data: RawForecastResponse = await response.json();
  return {
    current: {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
    },
    daily: data.daily.time.map((date, index) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      temperatureMax: data.daily.temperature_2m_max[index],
      temperatureMin: data.daily.temperature_2m_min[index],
      precipitationProbability:
        data.daily.precipitation_probability_max[index] ?? 0,
    })),
  };
};
