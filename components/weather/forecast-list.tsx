import type { ReactNode } from "react";

import { ForecastRow } from "./forecast-row";

type ForecastRowData = {
  key: string;
  day: string;
  icon: ReactNode;
  precipitation: string;
  temperature: string;
};

type ForecastListProps = {
  days: ForecastRowData[];
};

export const ForecastList = ({ days }: ForecastListProps) => {
  return (
    <section className="w-[314px] md:w-[578px]">
      <h2 className="text-[12px] text-fg-muted">7 napos előrejelzés</h2>
      <ul className="mt-4 flex flex-col">
        {days.map(({ key, ...row }) => (
          <ForecastRow key={key} {...row} />
        ))}
      </ul>
    </section>
  );
};
