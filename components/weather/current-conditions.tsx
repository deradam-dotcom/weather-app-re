import { formatTemperature } from "@/lib/format";

type CurrentConditionsProps = {
  cityName: string;
  temperature: number;
  condition: string;
  onCityClick?: () => void;
};

export const CurrentConditions = ({
  cityName,
  temperature,
  condition,
  onCityClick,
}: CurrentConditionsProps) => {
  return (
    <section className="flex flex-col">
      <button
        type="button"
        onClick={onCityClick}
        className="w-fit cursor-pointer text-sm text-fg hover:underline"
      >
        {cityName}
      </button>
      <p className="mt-1 text-[48px] font-light text-fg">
        {formatTemperature(temperature)}
      </p>
      <p className="mt-2 text-[16px] text-fg">{condition}</p>
    </section>
  );
};
