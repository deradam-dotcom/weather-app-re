import type { ReactNode } from "react";

type ForecastRowProps = {
  day: string;
  icon: ReactNode;
  precipitation: string;
  temperature: string;
};

export const ForecastRow = ({
  day,
  icon,
  precipitation,
  temperature,
}: ForecastRowProps) => {
  return (
    <li className="flex items-center justify-between gap-2 py-3.5 text-base text-fg">
      <span className="min-w-0 flex-1 truncate">{day}</span>
      <span className="flex min-w-0 flex-1 items-center justify-center gap-2">
        {icon}
        <span>{precipitation}</span>
      </span>
      <span className="min-w-0 flex-1 whitespace-nowrap text-right">
        {temperature}
      </span>
    </li>
  );
};
