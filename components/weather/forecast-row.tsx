import type { ReactNode } from "react";

type ForecastRowProps = {
  day: string;
  icon: ReactNode;
  precipitation: string;
  temperature: string;
};

export function ForecastRow({
  day,
  icon,
  precipitation,
  temperature,
}: ForecastRowProps) {
  return (
    <li className="flex items-center justify-between py-3.5 text-base text-fg">
      <span className="flex-1">{day}</span>
      <span className="flex flex-1 items-center justify-center gap-2">
        {icon}
        <span>{precipitation}</span>
      </span>
      <span className="flex-1 text-right">{temperature}</span>
    </li>
  );
}
