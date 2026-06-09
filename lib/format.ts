const DAY_NAMES = [
  "Vasárnap",
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
];

export const formatDayName = (isoDate: string): string => {
  const date = new Date(`${isoDate}T00:00:00`);
  return DAY_NAMES[date.getDay()];
};

export const formatTemperature = (value: number): string =>
  `${Math.round(value)} °C`;

export const formatTemperatureRange = (min: number, max: number): string =>
  `${Math.round(min)} °C / ${Math.round(max)} °C`;

export const formatPrecipitation = (value: number): string =>
  `${Math.round(value)}%`;
