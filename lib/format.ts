const DAY_NAMES = [
  "Vasárnap",
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
];

export function formatDayName(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return DAY_NAMES[date.getDay()];
}

export function formatTemperature(value: number): string {
  return `${Math.round(value)} °C`;
}

export function formatTemperatureRange(min: number, max: number): string {
  return `${Math.round(min)} °C / ${Math.round(max)} °C`;
}

export function formatPrecipitation(value: number): string {
  return `${Math.round(value)}%`;
}
